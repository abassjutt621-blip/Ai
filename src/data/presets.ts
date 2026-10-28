export interface Preset {
  id: string;
  name: string;
  category: 'background' | 'cleanup' | 'backdrop' | 'ecommerce';
  icon: string;
  badge?: string;
  prompt: string;
  description: string;
}

export const PRESET_CATEGORIES = [
  { id: 'all', label: 'All Presets' },
  { id: 'background', label: '✂️ Remove Background' },
  { id: 'cleanup', label: '✨ Clean Up & Retouch' },
  { id: 'backdrop', label: '🏛️ Studio Stages' },
  { id: 'ecommerce', label: '🛍️ E-Commerce Standards' },
] as const;

export const EDIT_PRESETS: Preset[] = [
  // 1. Background removal & Isolation
  {
    id: 'bg-transparent',
    name: 'Transparent Cutout',
    category: 'background',
    icon: 'Scissors',
    badge: 'Popular',
    prompt: 'Remove the background entirely. Perfectly isolate the main product with sharp, clean outer edges, zero halo or fringing artifacts, ready for transparent overlay.',
    description: 'Crisp subject isolation without background elements',
  },
  {
    id: 'bg-pure-white',
    name: 'Pure Studio White',
    category: 'background',
    icon: 'Sun',
    badge: 'Amazon / Shopify',
    prompt: 'Remove background completely and place the product on a 100% pure white background (#FFFFFF) with an ultra-soft, realistic ground contact shadow directly beneath it.',
    description: 'Clean e-commerce standard pure white with subtle grounding shadow',
  },
  {
    id: 'bg-floating-shadow',
    name: 'Floating Elevation Shadow',
    category: 'background',
    icon: 'Layers',
    prompt: 'Isolate the product and suspend it slightly elevated against a clean off-white studio backdrop with a smooth, diffused drop shadow cast below.',
    description: 'Modern suspended look with depth and spatial separation',
  },
  {
    id: 'bg-studio-gradient',
    name: 'Soft Studio Cyclorama',
    category: 'background',
    icon: 'Palette',
    prompt: 'Replace the background with a seamless professional photographer cyclorama wall gradient in neutral warm grey, with soft vignette falloff.',
    description: 'Classic photographer infinite infinity curve backdrop',
  },

  // 2. Clean up & Retouching
  {
    id: 'clean-glare',
    name: 'Remove Harsh Glare',
    category: 'cleanup',
    icon: 'Sparkles',
    badge: 'Retouch',
    prompt: 'Clean up harsh specular glare, hot spots, and blown-out light streaks across the product surface. Soften reflections while preserving all brand labels, typography, and logo details.',
    description: 'Diffuses reflective hot spots on glass, chrome, and plastic',
  },
  {
    id: 'clean-dust-scratches',
    name: 'Erase Dust & Imperfections',
    category: 'cleanup',
    icon: 'Eraser',
    badge: 'Fix',
    prompt: 'Meticulously remove all visible dust particles, lint, fingerprint smudges, hairline scratches, and blemishes from the product body, rendering a pristine mint condition finish.',
    description: 'Polishes product surfaces to look brand new and factory-sealed',
  },
  {
    id: 'clean-color-cast',
    name: 'Neutralize Color Cast & Tint',
    category: 'cleanup',
    icon: 'Sliders',
    prompt: 'Correct uneven yellowish or greenish room lighting color cast. Calibrate true-to-life neutral color balance and crisp white highlights across the product.',
    description: 'Removes muddy indoor ambient tint for accurate product colors',
  },
  {
    id: 'clean-studio-softbox',
    name: 'Dual Softbox Studio Lighting',
    category: 'cleanup',
    icon: 'Lightbulb',
    prompt: 'Relight the product using professional twin 45-degree softbox studio lights, giving soft wraparound illumination and gentle gradient contours.',
    description: 'Flattering balanced lighting without harsh harsh shadows',
  },

  // 3. Studio Stages & Backdrops
  {
    id: 'stage-podium',
    name: 'Minimalist Cylinder Podium',
    category: 'backdrop',
    icon: 'Disc',
    badge: 'Trending',
    prompt: 'Place the product centered on a smooth architectural matte white cylindrical pedestal podium with subtle directional soft lighting and realistic contact occlusion.',
    description: 'Architectural pedestal display popular in modern cosmetics and tech',
  },
  {
    id: 'stage-carrara-marble',
    name: 'Italian Carrara Marble',
    category: 'backdrop',
    icon: 'Gem',
    badge: 'Luxury',
    prompt: 'Place this product on an elegant polished white Carrara marble countertop featuring subtle grey veining, with soft morning window light from the left.',
    description: 'High-end luxury aesthetic for jewelry, perfumes, and skincare',
  },
  {
    id: 'stage-oak-wood',
    name: 'Scandinavian Warm Oak',
    category: 'backdrop',
    icon: 'TreePine',
    prompt: 'Set the product on a natural blonde oak wood table with delicate grain texture, accompanied by soft warm sunlight and gentle out-of-focus background warmth.',
    description: 'Organic, cozy Scandinavian aesthetic for artisan and lifestyle goods',
  },
  {
    id: 'stage-dark-obsidian',
    name: 'Obsidian Matte Black',
    category: 'backdrop',
    icon: 'Moon',
    prompt: 'Place the product on a sleek matte black slate surface with dark moody studio atmosphere and subtle metallic blue rim lighting.',
    description: 'Dramatic high-contrast premium look for tech, gaming, and spirits',
  },
  {
    id: 'stage-draped-silk',
    name: 'Draped Silk Fabric',
    category: 'backdrop',
    icon: 'Waves',
    prompt: 'Rest the product amidst soft organic folds of champagne satin silk fabric with gentle lustrous folds and diffused romantic lighting.',
    description: 'Sensual luxurious fabric backdrop for fashion and beauty items',
  },

  // 4. E-Commerce Standards
  {
    id: 'ecom-amazon',
    name: 'Amazon Marketplace Spec',
    category: 'ecommerce',
    icon: 'ShoppingBag',
    badge: 'A+ Content',
    prompt: 'Strict Amazon main image standard: Product fills 85% of frame, crisp pure white RGB(255,255,255) background, natural ground contact shadow, razor-sharp edges.',
    description: 'Compliant with Amazon, Walmart, and eBay main listing requirements',
  },
  {
    id: 'ecom-shopify-hero',
    name: 'Shopify Storefront Hero',
    category: 'ecommerce',
    icon: 'Store',
    prompt: 'Create a high-impact Shopify product hero image: clean modern studio backdrop with subtle tonal depth, perfectly centered product with vibrant true colors.',
    description: 'Optimized for high-converting direct-to-consumer store pages',
  },
  {
    id: 'ecom-instagram-aesthetic',
    name: 'Editorial Lifestyle Mood',
    category: 'ecommerce',
    icon: 'Camera',
    prompt: 'Transform into a curated Instagram editorial aesthetic: warm muted tones, soft natural sidelight through a sheer linen curtain, minimal props softly blurred.',
    description: 'Social-first lifestyle aesthetic for Instagram, Pinterest, and ads',
  },
];
