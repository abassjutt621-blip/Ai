// High quality product photography samples rendered as SVG Data URIs
// These provide immediate testable images without needing external network fetches

export interface SampleProduct {
  id: string;
  name: string;
  category: string;
  subtitle: string;
  dataUri: string;
  recommendedPrompts: {
    label: string;
    prompt: string;
  }[];
}

// 1. Skincare Dropper Bottle
const serumSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
  <defs>
    <!-- Background Gradient (cluttered/warm room) -->
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#e8ded1" />
      <stop offset="50%" stop-color="#dfd0be" />
      <stop offset="100%" stop-color="#cbb8a0" />
    </linearGradient>
    <radialGradient id="tableLight" cx="50%" cy="80%" r="60%">
      <stop offset="0%" stop-color="#fdfbf7" stop-opacity="0.8" />
      <stop offset="100%" stop-color="#beab94" stop-opacity="0" />
    </radialGradient>
    <!-- Shadow -->
    <radialGradient id="contactShadow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="rgba(30, 20, 10, 0.45)" />
      <stop offset="60%" stop-color="rgba(40, 25, 15, 0.15)" />
      <stop offset="100%" stop-color="rgba(40, 25, 15, 0)" />
    </radialGradient>
    <!-- Glass Bottle Amber Gradient -->
    <linearGradient id="amberGlass" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#4a220b" />
      <stop offset="25%" stop-color="#8a4714" />
      <stop offset="45%" stop-color="#c66f24" />
      <stop offset="55%" stop-color="#e38c35" />
      <stop offset="75%" stop-color="#934d16" />
      <stop offset="100%" stop-color="#3c1a06" />
    </linearGradient>
    <!-- Glare reflection -->
    <linearGradient id="glareHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="rgba(255,255,255,0)" />
      <stop offset="35%" stop-color="rgba(255,255,255,0.75)" />
      <stop offset="45%" stop-color="rgba(255,255,255,0.9)" />
      <stop offset="60%" stop-color="rgba(255,255,255,0.1)" />
      <stop offset="100%" stop-color="rgba(255,255,255,0)" />
    </linearGradient>
    <!-- Dropper Pipette Bulb -->
    <linearGradient id="dropperBulb" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#1a1a1a" />
      <stop offset="40%" stop-color="#383838" />
      <stop offset="60%" stop-color="#4a4a4a" />
      <stop offset="100%" stop-color="#111111" />
    </linearGradient>
    <!-- Gold Metallic Collar -->
    <linearGradient id="goldCollar" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#8a6c38" />
      <stop offset="30%" stop-color="#e8ca7a" />
      <stop offset="50%" stop-color="#fff4c2" />
      <stop offset="70%" stop-color="#dfbb67" />
      <stop offset="100%" stop-color="#6e5021" />
    </linearGradient>
  </defs>

  <!-- Background Canvas -->
  <rect width="800" height="800" fill="url(#bgGrad)" />
  <ellipse cx="400" cy="720" rx="360" ry="80" fill="url(#tableLight)" />

  <!-- Natural Contact Shadow on Table -->
  <ellipse cx="400" cy="690" rx="160" ry="24" fill="url(#contactShadow)" />
  <ellipse cx="400" cy="685" rx="110" ry="14" fill="rgba(30,15,5,0.3)" />

  <!-- Bottle Body -->
  <g id="dropper-bottle">
    <!-- Main glass cylinder -->
    <rect x="290" y="360" width="220" height="320" rx="36" fill="url(#amberGlass)" />
    
    <!-- Bottle Shoulder curve -->
    <path d="M 330,360 L 360,310 L 440,310 L 470,360 Z" fill="url(#amberGlass)" />
    
    <!-- Glass Thickness / Base Rim -->
    <rect x="300" y="650" width="200" height="26" rx="12" fill="rgba(25, 10, 4, 0.6)" />
    <ellipse cx="400" cy="670" rx="90" ry="8" fill="rgba(255, 160, 60, 0.3)" />

    <!-- Label -->
    <rect x="305" y="410" width="190" height="210" rx="6" fill="#fbfaf7" filter="drop-shadow(0 2px 5px rgba(0,0,0,0.15))" />
    <text x="400" y="445" font-family="'Helvetica Neue', Arial, sans-serif" font-size="11" font-weight="600" letter-spacing="3" fill="#7d7365" text-anchor="middle">BOTANICAL LABS</text>
    <text x="400" y="485" font-family="'Helvetica Neue', Arial, sans-serif" font-size="20" font-weight="700" letter-spacing="1" fill="#1a1918" text-anchor="middle">LUMINOUS</text>
    <text x="400" y="508" font-family="'Helvetica Neue', Arial, sans-serif" font-size="14" font-style="italic" fill="#524d45" text-anchor="middle">Niacinamide + C Serum</text>
    <line x1="340" y1="525" x2="460" y2="525" stroke="#d5cebe" stroke-width="1" />
    <text x="400" y="548" font-family="'Helvetica Neue', Arial, sans-serif" font-size="10" letter-spacing="1.5" fill="#8c8273" text-anchor="middle">30 ML / 1.0 FL OZ</text>
    <rect x="385" y="565" width="30" height="18" rx="3" fill="#e8ca7a" opacity="0.4" />
    <text x="400" y="578" font-family="'Helvetica Neue', Arial, sans-serif" font-size="8" font-weight="700" fill="#4a3a16" text-anchor="middle">10%</text>

    <!-- Glass Specular Glare / Reflection Streak (Simulated photo artifact) -->
    <rect x="315" y="370" width="24" height="290" rx="10" fill="url(#glareHighlight)" opacity="0.85" />
    <rect x="460" y="380" width="8" height="270" rx="4" fill="url(#glareHighlight)" opacity="0.4" />

    <!-- Gold Collar / Screw Top -->
    <rect x="350" y="270" width="100" height="42" rx="4" fill="url(#goldCollar)" />
    <!-- Collar Ribbing lines -->
    <line x1="358" y1="272" x2="358" y2="310" stroke="#ffd982" stroke-width="1.5" opacity="0.8" />
    <line x1="375" y1="272" x2="375" y2="310" stroke="#ffd982" stroke-width="1.5" opacity="0.8" />
    <line x1="395" y1="272" x2="395" y2="310" stroke="#ffd982" stroke-width="1.5" opacity="0.8" />
    <line x1="425" y1="272" x2="425" y2="310" stroke="#8a6c38" stroke-width="1.5" opacity="0.6" />

    <!-- Rubber Squeeze Pipette Bulb -->
    <path d="M 368,270 C 368,230 375,170 400,170 C 425,170 432,230 432,270 Z" fill="url(#dropperBulb)" />
    <!-- Bulb highlight -->
    <path d="M 380,260 C 380,230 385,185 400,185" stroke="rgba(255,255,255,0.4)" stroke-width="4" stroke-linecap="round" fill="none" />
  </g>
</svg>
`;

// 2. Wireless Over-Ear Studio Headphones
const headphonesSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
  <defs>
    <linearGradient id="bgH" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2a2e39" />
      <stop offset="100%" stop-color="#181a20" />
    </linearGradient>
    <linearGradient id="metalBand" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#2c3038" />
      <stop offset="30%" stop-color="#606675" />
      <stop offset="50%" stop-color="#8a92a3" />
      <stop offset="70%" stop-color="#555a66" />
      <stop offset="100%" stop-color="#1e2025" />
    </linearGradient>
    <linearGradient id="matteCup" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2b2d33" />
      <stop offset="60%" stop-color="#1d1e22" />
      <stop offset="100%" stop-color="#121316" />
    </linearGradient>
    <linearGradient id="cushionGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#18191c" />
      <stop offset="50%" stop-color="#2a2c32" />
      <stop offset="100%" stop-color="#141518" />
    </linearGradient>
  </defs>

  <rect width="800" height="800" fill="url(#bgH)" />
  <!-- Shadow on floor -->
  <ellipse cx="400" cy="710" rx="200" ry="30" fill="rgba(0,0,0,0.6)" />

  <g id="headphones">
    <!-- Top Headband Arch -->
    <path d="M 230,420 C 210,190 590,190 570,420" fill="none" stroke="url(#metalBand)" stroke-width="48" stroke-linecap="round" />
    <!-- Padded Headband Cushion -->
    <path d="M 270,330 C 290,230 510,230 530,330" fill="none" stroke="#16171a" stroke-width="36" stroke-linecap="round" />
    <!-- Stitching dashes -->
    <path d="M 275,325 C 295,235 505,235 525,325" fill="none" stroke="#3d4048" stroke-width="2" stroke-dasharray="6,8" />

    <!-- Left Ear Cup Assembly -->
    <g transform="translate(160, 360)">
      <!-- Cushion -->
      <rect x="70" y="40" width="40" height="180" rx="20" fill="url(#cushionGrad)" />
      <!-- Outer Ear Shell -->
      <ellipse cx="60" cy="130" rx="55" ry="85" fill="url(#matteCup)" stroke="#3a3d45" stroke-width="3" />
      <!-- Swivel Ring -->
      <ellipse cx="60" cy="130" rx="35" ry="55" fill="#141517" stroke="#484d57" stroke-width="2" />
      <!-- Logo Accent -->
      <circle cx="60" cy="130" r="16" fill="#00e5ff" opacity="0.8" />
      <path d="M 54,124 L 66,130 L 54,136 Z" fill="#0e1014" />
      <!-- Glare highlight -->
      <path d="M 30,90 Q 50,75 80,85" stroke="rgba(255,255,255,0.4)" stroke-width="4" stroke-linecap="round" fill="none" />
    </g>

    <!-- Right Ear Cup Assembly -->
    <g transform="translate(500, 360)">
      <!-- Cushion -->
      <rect x="30" y="40" width="40" height="180" rx="20" fill="url(#cushionGrad)" />
      <!-- Outer Ear Shell -->
      <ellipse cx="80" cy="130" rx="55" ry="85" fill="url(#matteCup)" stroke="#3a3d45" stroke-width="3" />
      <!-- Swivel Ring -->
      <ellipse cx="80" cy="130" rx="35" ry="55" fill="#141517" stroke="#484d57" stroke-width="2" />
      <!-- Logo Accent -->
      <circle cx="80" cy="130" r="16" fill="#00e5ff" opacity="0.8" />
      <!-- Highlight -->
      <path d="M 90,90 Q 70,75 40,85" stroke="rgba(255,255,255,0.3)" stroke-width="4" stroke-linecap="round" fill="none" />
    </g>
  </g>
</svg>
`;

// 3. Luxury Chronograph Stainless Steel Watch
const watchSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
  <defs>
    <radialGradient id="watchDial" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#0e1726" />
      <stop offset="70%" stop-color="#070c14" />
      <stop offset="100%" stop-color="#020408" />
    </radialGradient>
    <linearGradient id="steelBezel" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f0f2f5" />
      <stop offset="25%" stop-color="#9aa0a6" />
      <stop offset="50%" stop-color="#ffffff" />
      <stop offset="75%" stop-color="#7a8088" />
      <stop offset="100%" stop-color="#d0d5dd" />
    </linearGradient>
    <linearGradient id="bracelet" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#7a828e" />
      <stop offset="30%" stop-color="#bcc4ce" />
      <stop offset="50%" stop-color="#ffffff" />
      <stop offset="70%" stop-color="#a4adb8" />
      <stop offset="100%" stop-color="#5a616b" />
    </linearGradient>
  </defs>

  <rect width="800" height="800" fill="#f4efe6" />
  <ellipse cx="400" cy="710" rx="150" ry="22" fill="rgba(60,50,40,0.25)" />

  <!-- Top Bracelet Link -->
  <path d="M 330,80 L 470,80 L 450,260 L 350,260 Z" fill="url(#bracelet)" />
  <!-- Bottom Bracelet Link -->
  <path d="M 350,540 L 450,540 L 470,720 L 330,720 Z" fill="url(#bracelet)" />

  <!-- Watch Case Outer Steel -->
  <circle cx="400" cy="400" r="180" fill="url(#steelBezel)" filter="drop-shadow(0 15px 25px rgba(0,0,0,0.3))" />
  <!-- Inner Fluted Bezel Ring -->
  <circle cx="400" cy="400" r="162" fill="#1b212d" stroke="url(#steelBezel)" stroke-width="4" />

  <!-- Deep Blue Sunburst Dial -->
  <circle cx="400" cy="400" r="150" fill="url(#watchDial)" />

  <!-- Subdials -->
  <circle cx="340" cy="400" r="34" fill="#070c14" stroke="#414d61" stroke-width="1.5" />
  <circle cx="460" cy="400" r="34" fill="#070c14" stroke="#414d61" stroke-width="1.5" />
  <circle cx="400" cy="460" r="34" fill="#070c14" stroke="#414d61" stroke-width="1.5" />

  <!-- Hour Markers -->
  <rect x="397" y="260" width="6" height="24" fill="#e8eaed" rx="2" />
  <rect x="397" y="516" width="6" height="24" fill="#e8eaed" rx="2" />
  <rect x="260" y="397" width="24" height="6" fill="#e8eaed" rx="2" />
  <rect x="516" y="397" width="24" height="6" fill="#e8eaed" rx="2" />

  <!-- Watch Hands -->
  <line x1="400" y1="400" x2="350" y2="330" stroke="#ffffff" stroke-width="6" stroke-linecap="round" />
  <line x1="400" y1="400" x2="470" y2="350" stroke="#ffffff" stroke-width="4" stroke-linecap="round" />
  <line x1="400" y1="420" x2="400" y2="290" stroke="#e63946" stroke-width="2" />
  <circle cx="400" cy="400" r="7" fill="#e63946" />

  <!-- Watch Brand Text -->
  <text x="400" y="340" font-family="'Helvetica Neue', Arial, sans-serif" font-size="12" font-weight="700" letter-spacing="4" fill="#ffffff" text-anchor="middle">CHRONO LUX</text>
  <text x="400" y="356" font-family="'Helvetica Neue', Arial, sans-serif" font-size="8" letter-spacing="2" fill="#8a99ad" text-anchor="middle">GENÈVE</text>

  <!-- Crown Button on Side -->
  <rect x="580" y="380" width="22" height="40" rx="4" fill="url(#steelBezel)" />
  <rect x="572" y="340" width="16" height="26" rx="3" fill="url(#steelBezel)" />
  <rect x="572" y="434" width="16" height="26" rx="3" fill="url(#steelBezel)" />

  <!-- Sapphire Crystal Reflection / Glare -->
  <path d="M 280,320 C 340,270 460,270 520,320" stroke="rgba(255,255,255,0.4)" stroke-width="12" stroke-linecap="round" fill="none" opacity="0.6" />
</svg>
`;

// 4. Artisan Ceramic Mug with Wooden Coaster
const ceramicMugSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
  <defs>
    <linearGradient id="warmBg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#eae6df" />
      <stop offset="100%" stop-color="#d4cbbf" />
    </linearGradient>
    <linearGradient id="ceramicBody" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#4e5d59" />
      <stop offset="35%" stop-color="#697b76" />
      <stop offset="60%" stop-color="#8ba19b" />
      <stop offset="85%" stop-color="#5d6f6a" />
      <stop offset="100%" stop-color="#3b4844" />
    </linearGradient>
    <linearGradient id="woodCoaster" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#734726" />
      <stop offset="50%" stop-color="#a86e3f" />
      <stop offset="100%" stop-color="#5e391e" />
    </linearGradient>
  </defs>

  <rect width="800" height="800" fill="url(#warmBg)" />
  <!-- Shadow -->
  <ellipse cx="400" cy="690" rx="200" ry="28" fill="rgba(40,30,20,0.25)" />

  <!-- Wooden Coaster -->
  <ellipse cx="400" cy="670" rx="190" ry="25" fill="url(#woodCoaster)" />
  <ellipse cx="400" cy="663" rx="180" ry="20" fill="#915e34" />

  <!-- Mug Handle -->
  <path d="M 480,380 C 600,380 610,540 480,550" fill="none" stroke="url(#ceramicBody)" stroke-width="36" stroke-linecap="round" />
  <path d="M 480,380 C 585,380 595,540 480,550" fill="none" stroke="#2b3633" stroke-width="12" stroke-linecap="round" opacity="0.3" />

  <!-- Mug Body -->
  <path d="M 270,300 L 290,640 C 290,660 510,660 510,640 L 530,300 Z" fill="url(#ceramicBody)" />
  
  <!-- Mug Rim Top Opening -->
  <ellipse cx="400" cy="300" rx="130" ry="32" fill="#2d3835" />
  <ellipse cx="400" cy="305" rx="116" ry="26" fill="#1b120c" />
  <!-- Coffee Liquid -->
  <ellipse cx="400" cy="315" rx="110" ry="22" fill="#2c1a0e" />
  <ellipse cx="380" cy="312" rx="30" ry="6" fill="#4d2f1b" opacity="0.8" />

  <!-- Glaze Speckles -->
  <circle cx="340" cy="420" r="3" fill="#cfdbd5" opacity="0.6" />
  <circle cx="390" cy="460" r="2.5" fill="#cfdbd5" opacity="0.7" />
  <circle cx="440" cy="520" r="3" fill="#cfdbd5" opacity="0.5" />
  <circle cx="330" cy="560" r="2" fill="#cfdbd5" opacity="0.6" />
  <circle cx="470" cy="430" r="3" fill="#cfdbd5" opacity="0.4" />

  <!-- Specular Light Reflection -->
  <path d="M 320,340 L 330,620" stroke="rgba(255,255,255,0.4)" stroke-width="18" stroke-linecap="round" opacity="0.5" />
</svg>
`;

function toBase64DataUri(svg: string): string {
  // Convert UTF-8 SVG string to Base64 data URI
  const utf8Bytes = new TextEncoder().encode(svg.trim());
  let binary = '';
  const len = utf8Bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(utf8Bytes[i]);
  }
  return `data:image/svg+xml;base64,${btoa(binary)}`;
}

export const SAMPLE_PRODUCTS: SampleProduct[] = [
  {
    id: 'serum-dropper',
    name: 'Amber Glass Niacinamide Serum',
    category: 'Beauty & Skincare',
    subtitle: 'Cosmetic bottle with harsh table reflection and specular glare',
    dataUri: toBase64DataUri(serumSvg),
    recommendedPrompts: [
      {
        label: 'Remove BG → Pure White Catalog',
        prompt: 'Remove the cluttered background completely. Place the bottle on a crisp pure white studio background (#FFFFFF) with a delicate soft contact shadow directly underneath.',
      },
      {
        label: 'Clean Glare & Polish Glass',
        prompt: 'Clean up the harsh vertical glare reflection on the glass bottle surface, soften the highlight while keeping the label text and gold collar razor sharp.',
      },
      {
        label: 'Luxury White Marble Podium',
        prompt: 'Remove the background and place this amber serum bottle on an elevated circular Carrara marble podium with gentle morning sunlight streaming from the left.',
      },
      {
        label: 'Aesthetic Botanical Backdrop',
        prompt: 'Place the product on a natural stone slab with softly blurred eucalyptus leaves and warm dappled sunlight in the background.',
      },
    ],
  },
  {
    id: 'studio-headphones',
    name: 'Wireless Studio Noise-Cancelling Headphones',
    category: 'Consumer Electronics',
    subtitle: 'Over-ear headphones on dark slate background',
    dataUri: toBase64DataUri(headphonesSvg),
    recommendedPrompts: [
      {
        label: 'Transparent Cutout (Isolated)',
        prompt: 'Remove the dark background completely. Isolate the headphones with razor sharp edges and zero halo artifacts, ready for transparent PNG export.',
      },
      {
        label: 'Clean Scuffs & Surface Dust',
        prompt: 'Clean up all dust specks, finger smudges, and minor surface scratches on the matte ear cups, restoring a pristine factory-fresh matte finish.',
      },
      {
        label: 'Minimalist Floating Tech Stage',
        prompt: 'Set the headphones floating above a sleek architectural concrete pedestal with soft studio rim lighting highlighting the metallic curves.',
      },
      {
        label: 'Vibrant Cyberpunk Studio',
        prompt: 'Place the headphones in a modern studio setup with subtle neon cyan and magenta edge highlights on a reflective glossy black acrylic surface.',
      },
    ],
  },
  {
    id: 'chrono-watch',
    name: 'Chronograph Stainless Steel Luxury Watch',
    category: 'Jewelry & Watches',
    subtitle: 'High-reflection watch with crystal glare and tabletop shadows',
    dataUri: toBase64DataUri(watchSvg),
    recommendedPrompts: [
      {
        label: 'Commercial Catalog White',
        prompt: 'Remove the beige background and place the luxury watch on a clean pure white background with an ultra-soft ground shadow, e-commerce ready.',
      },
      {
        label: 'Eliminate Crystal Lens Glare',
        prompt: 'Remove the curved glare streak across the sapphire crystal glass so the deep blue sunburst dial and watch hands are completely clear and legible.',
      },
      {
        label: 'Dark Obsidian Velvet Elegance',
        prompt: 'Place the watch resting elegantly on a textured black obsidian stone slab with a hint of dark velvet cloth and warm directional spotlighting.',
      },
      {
        label: 'Polish Stainless Steel Links',
        prompt: 'Enhance the brushed and polished metal textures of the watch case and bracelet, removing fingerprint smudges and sharpening the bevel edges.',
      },
    ],
  },
  {
    id: 'ceramic-mug',
    name: 'Handcrafted Ceramic Artisan Coffee Mug',
    category: 'Home & Kitchen',
    subtitle: 'Earth-toned ceramic tumbler on wooden coaster with uneven lighting',
    dataUri: toBase64DataUri(ceramicMugSvg),
    recommendedPrompts: [
      {
        label: 'Pure Amazon White',
        prompt: 'Remove background and isolate the ceramic mug and wooden coaster onto a pure white background with realistic contact shadows.',
      },
      {
        label: 'Warm Sunlit Breakfast Table',
        prompt: 'Place the ceramic mug on a rustic blonde oak breakfast table with morning sunlight beams through window blinds creating warm linear shadows.',
      },
      {
        label: 'Smooth Ceramic Glaze',
        prompt: 'Clean up surface blemishes and soften harsh rim reflections while preserving the organic speckled artisanal ceramic texture.',
      },
      {
        label: 'Minimalist Scandinavian Kitchen',
        prompt: 'Place the mug in a bright, airy Scandinavian minimalist kitchen setting with soft neutral tones and subtle marble countertop.',
      },
    ],
  },
];
