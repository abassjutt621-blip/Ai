import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT || 3000);

// Increase JSON payload limit for base64 product images
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Shared server-side Gemini client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Helper to extract MIME type and pure base64 from data URI or raw base64
function parseImageData(dataUriOrBase64: string): { mimeType: string; data: string } {
  if (dataUriOrBase64.startsWith('data:')) {
    const match = dataUriOrBase64.match(/^data:([^;]+);base64,(.+)$/);
    if (match) {
      return { mimeType: match[1], data: match[2] };
    }
  }
  // Default fallback if plain base64
  return { mimeType: 'image/png', data: dataUriOrBase64 };
}

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    hasApiKey: !!process.env.GEMINI_API_KEY,
    time: new Date().toISOString(),
  });
});

// Photo analysis endpoint: inspects product photo and gives tailored cleanup tips
app.post('/api/analyze-photo', async (req, res) => {
  try {
    const { image } = req.body;
    if (!image) {
      return res.status(400).json({ error: 'Image is required for analysis' });
    }

    const { mimeType, data } = parseImageData(image);

    const prompt = `Analyze this product photograph for an e-commerce photo cleanup and background removal studio tool.
Examine:
1. What the product item is.
2. Background conditions (cluttered, noisy, color cast, uneven lighting).
3. Surface flaws (glare, reflections, dust specs, scratches, harsh shadows).
4. Top 3 tailored instructions a merchant/photographer would type to clean it up or change the background.

Return ONLY a valid JSON object matching this schema:
{
  "productName": "Short product name (e.g. Amber Glass Dropper Serum)",
  "category": "Cosmetics / Tech / Apparel / Jewelry / Footwear / Home / Food",
  "backgroundAssessment": "Brief note about current background",
  "surfaceFlaws": ["Dust/glare detected", "Uneven shadow on right"],
  "quickSuggestions": [
    {
      "label": "Action title (e.g. Pure White Amazon Catalog)",
      "prompt": "Detailed instruction to apply to the image (e.g. Remove background completely, place on crisp pure white background with subtle natural ground shadow)",
      "type": "background"
    },
    {
      "label": "Action title (e.g. Polish & Erase Glare)",
      "prompt": "Detailed instruction to apply to the image (e.g. Soften harsh specular highlights and reflections on glass surface, clean dust specs while keeping logo intact)",
      "type": "cleanup"
    },
    {
      "label": "Action title (e.g. Luxury Marble Studio)",
      "prompt": "Detailed instruction to apply to the image (e.g. Place product on an elegant polished white Carrara marble pedestal with soft warm studio lighting)",
      "type": "stage"
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: {
        parts: [
          { inlineData: { mimeType, data } },
          { text: prompt },
        ],
      },
      config: {
        responseMimeType: 'application/json',
      },
    });

    const text = response.text || '{}';
    const parsed = JSON.parse(text);
    return res.json({ ok: true, analysis: parsed });
  } catch (error: any) {
    console.error('Error analyzing photo:', error);
    return res.status(500).json({
      error: error.message || 'Failed to analyze product photo',
    });
  }
});

// Prompt enhancer endpoint: expands simple instructions into studio-grade photography prompts
app.post('/api/enhance-prompt', async (req, res) => {
  try {
    const { prompt, productType } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const systemInstruction = `You are an expert commercial product photographer and digital retoucher.
Your task is to take a user's rough instruction (e.g. "remove background", "make it look luxurious", "clean up the reflections")
and transform it into a precise, high-fidelity prompt for an AI image editing model (gemini-nano-banana-2.1).
The instruction must emphasize:
1. Retaining the exact original product, shape, branding, color fidelity, and logo without distortion.
2. Describing the exact background action (e.g. transparent cutout, pure #FFFFFF e-commerce studio, matte marble surface with soft contact shadow).
3. Surface cleanup details (e.g. eliminate glare streaks, dust, scuffs, feather edges).
Keep the enhanced prompt under 60 words, clear, direct, and imperative. Do NOT include markdown formatting or commentary. Return just the prompt string.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `User instruction: "${prompt}"${productType ? ` for product: "${productType}"` : ''}`,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const enhanced = response.text?.trim() || prompt;
    return res.json({ ok: true, enhancedPrompt: enhanced });
  } catch (error: any) {
    console.error('Error enhancing prompt:', error);
    return res.status(500).json({ error: error.message || 'Failed to enhance prompt' });
  }
});

// Image edit endpoint using Gemini Nano Banana 2.1 (with automatic fallback to Flash-Lite-Image if needed)
app.post('/api/edit-image', async (req, res) => {
  try {
    const { image, prompt, aspectRatio = '1:1', preferredModel } = req.body;
    if (!image) {
      return res.status(400).json({ error: 'Image is required' });
    }
    if (!prompt) {
      return res.status(400).json({ error: 'Editing instructions are required' });
    }

    const { mimeType, data } = parseImageData(image);

    // Primary model is gemini-nano-banana-2.1 as specified in feature block
    const targetModel = preferredModel || 'gemini-nano-banana-2.1';

    // Crafted studio instruction
    const studioInstruction = `Commercial Product Photography Retouching Request:
You are modifying the input product photo based on these instructions:
"${prompt}"

Critical guidelines:
1. Keep the main product, its exact geometry, label, typography, branding, materials, and colors intact.
2. Clean up any blemishes, dust, scratches, glare, or unwanted background artifacts as requested.
3. If requested to remove background, isolate the product with clean, crisp edges, realistic contact occlusion shadow on the ground surface, and zero fringe artifacts.
4. If requested to change background (podium, marble, studio, outdoor), realistically composite the product with matching lighting direction and reflections.
5. Deliver a razor-sharp, commercial catalog-ready final product photo.`;

    let generatedImageUri: string | null = null;
    let modelUsed = targetModel;
    let modelText = '';

    const executeGeneration = async (modelName: string) => {
      const config: any = {};
      if (aspectRatio) {
        config.imageConfig = { aspectRatio };
      }

      return await ai.models.generateContent({
        model: modelName,
        contents: {
          parts: [
            {
              inlineData: {
                mimeType,
                data,
              },
            },
            {
              text: studioInstruction,
            },
          ],
        },
        config,
      });
    };

    let result;
    try {
      result = await executeGeneration(targetModel);
    } catch (err: any) {
      console.warn(`Model ${targetModel} failed: ${err.message}. Trying fallback to gemini-3.1-flash-lite-image...`);
      if (targetModel !== 'gemini-3.1-flash-lite-image') {
        result = await executeGeneration('gemini-3.1-flash-lite-image');
        modelUsed = 'gemini-3.1-flash-lite-image';
      } else {
        throw err;
      }
    }

    // Extract image and text from candidates
    if (result.candidates && result.candidates.length > 0) {
      const parts = result.candidates[0].content?.parts || [];
      for (const part of parts) {
        if (part.inlineData && part.inlineData.data) {
          const outMime = part.inlineData.mimeType || 'image/png';
          generatedImageUri = `data:${outMime};base64,${part.inlineData.data}`;
        } else if (part.text) {
          modelText += part.text + ' ';
        }
      }
    }

    if (!generatedImageUri) {
      return res.status(500).json({
        error: 'The AI model completed the request but did not return an image part. Please try adjusting your prompt.',
        details: modelText.trim(),
      });
    }

    return res.json({
      ok: true,
      image: generatedImageUri,
      modelUsed,
      notes: modelText.trim() || undefined,
    });
  } catch (error: any) {
    console.error('Error editing image:', error);
    return res.status(500).json({
      error: error.message || 'Failed to process image edit',
    });
  }
});

// Setup Vite in dev mode or static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`PixelStudio Server listening on port ${PORT}`);
  });
}

startServer();
