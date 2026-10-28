import React from 'react';
import { X, Sparkles, Scissors, Wand2, Lightbulb, ShoppingBag } from 'lucide-react';

interface TipsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUsePrompt: (prompt: string) => void;
}

export const TipsModal: React.FC<TipsModalProps> = ({ isOpen, onClose, onUsePrompt }) => {
  if (!isOpen) return null;

  const tipCards = [
    {
      icon: Scissors,
      title: 'Background Isolation & Cutout',
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      tips: [
        'Always specify whether you want a transparent cutout or a specific studio color.',
        'Mention "clean crisp edges with realistic ground contact shadow" to avoid flat floating looks.',
      ],
      samplePrompt: 'Remove background completely, isolate product with sharp outer edges and delicate soft contact shadow.',
    },
    {
      icon: Wand2,
      title: 'Cleaning Glare, Dust & Reflections',
      color: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
      tips: [
        'For shiny glass and metal: specify "soften specular highlights and eliminate hot spots".',
        'State "preserve label typography and brand logos without distortion" to keep text crisp.',
      ],
      samplePrompt: 'Clean up harsh vertical light glare across the surface, erase dust specks, keep logo typography crisp.',
    },
    {
      icon: Lightbulb,
      title: 'Studio Staging & Material Pedestals',
      color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
      tips: [
        'Name real architectural materials: Carrara marble, matte concrete, blonde oak, obsidian stone.',
        'Specify lighting mood: soft morning sunlight, directional twin softbox, moody rim light.',
      ],
      samplePrompt: 'Place on circular white architectural podium with soft warm studio lighting and neutral grey cyclorama.',
    },
    {
      icon: ShoppingBag,
      title: 'Amazon & Shopify E-Commerce Specs',
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      tips: [
        'Use the keyword "pure white RGB(255,255,255)" for Amazon A+ catalog compliance.',
        'Set aspect ratio to 1:1 (Square) for Shopify storefronts and Instagram feeds.',
      ],
      samplePrompt: 'E-commerce marketplace spec: Pure white background (#FFFFFF), product centered, natural soft drop shadow.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <h3 className="text-xl font-bold text-white tracking-tight">
            How to Type the Best Instructions
          </h3>
        </div>
        <p className="text-xs text-zinc-400 mb-6">
          The Gemini Nano Banana 2.1 engine understands natural studio photography terminology. Use these proven prompt patterns to get commercial-grade results.
        </p>

        <div className="space-y-4">
          {tipCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <div key={i} className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-7 h-7 rounded-lg border flex items-center justify-center ${card.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-zinc-100">{card.title}</h4>
                </div>

                <ul className="text-xs text-zinc-400 space-y-1 mb-3 pl-4 list-disc">
                  {card.tips.map((tip, idx) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ul>

                <div className="flex items-center justify-between gap-3 pt-2 border-t border-zinc-900 bg-zinc-900/40 -mx-4 -mb-4 p-3 rounded-b-2xl">
                  <code className="text-[11px] font-mono text-zinc-300 line-clamp-1">
                    &ldquo;{card.samplePrompt}&rdquo;
                  </code>
                  <button
                    onClick={() => {
                      onUsePrompt(card.samplePrompt);
                      onClose();
                    }}
                    className="px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 font-semibold text-xs border border-amber-500/20 transition-colors shrink-0 cursor-pointer"
                  >
                    Use This
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
