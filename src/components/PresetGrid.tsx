import React, { useState } from 'react';
import {
  Scissors,
  Sun,
  Layers,
  Palette,
  Sparkles,
  Eraser,
  Sliders,
  Lightbulb,
  Disc,
  Gem,
  TreePine,
  Moon,
  Waves,
  ShoppingBag,
  Store,
  Camera,
  ArrowRight,
} from 'lucide-react';
import { EDIT_PRESETS, PRESET_CATEGORIES, Preset } from '../data/presets';

interface PresetGridProps {
  onSelectPreset: (preset: Preset) => void;
  onApplyPresetDirectly: (preset: Preset) => void;
  isProcessing: boolean;
}

export const PresetGrid: React.FC<PresetGridProps> = ({
  onSelectPreset,
  onApplyPresetDirectly,
  isProcessing,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredPresets =
    activeCategory === 'all'
      ? EDIT_PRESETS
      : EDIT_PRESETS.filter((p) => p.category === activeCategory);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Scissors':
        return <Scissors className="w-4 h-4 text-amber-400" />;
      case 'Sun':
        return <Sun className="w-4 h-4 text-amber-400" />;
      case 'Layers':
        return <Layers className="w-4 h-4 text-indigo-400" />;
      case 'Palette':
        return <Palette className="w-4 h-4 text-rose-400" />;
      case 'Sparkles':
        return <Sparkles className="w-4 h-4 text-amber-400" />;
      case 'Eraser':
        return <Eraser className="w-4 h-4 text-rose-400" />;
      case 'Sliders':
        return <Sliders className="w-4 h-4 text-emerald-400" />;
      case 'Lightbulb':
        return <Lightbulb className="w-4 h-4 text-amber-400" />;
      case 'Disc':
        return <Disc className="w-4 h-4 text-cyan-400" />;
      case 'Gem':
        return <Gem className="w-4 h-4 text-purple-400" />;
      case 'TreePine':
        return <TreePine className="w-4 h-4 text-emerald-400" />;
      case 'Moon':
        return <Moon className="w-4 h-4 text-blue-400" />;
      case 'Waves':
        return <Waves className="w-4 h-4 text-rose-400" />;
      case 'ShoppingBag':
        return <ShoppingBag className="w-4 h-4 text-amber-400" />;
      case 'Store':
        return <Store className="w-4 h-4 text-emerald-400" />;
      case 'Camera':
        return <Camera className="w-4 h-4 text-indigo-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-amber-400" />;
    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="text-base font-bold text-white tracking-tight">
            1-Click Studio Presets
          </h3>
          <p className="text-xs text-zinc-400">
            Engineered prompts for background isolation, flaw cleanup, and aesthetic backdrops
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {PRESET_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-amber-500 text-zinc-950 font-bold'
                  : 'bg-zinc-950 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Presets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {filteredPresets.map((preset) => (
          <div
            key={preset.id}
            className="group relative rounded-2xl bg-zinc-950 border border-zinc-800/80 hover:border-amber-500/50 p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-amber-500/5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="w-8 h-8 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
                  {getIcon(preset.icon)}
                </div>
                {preset.badge && (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
                    {preset.badge}
                  </span>
                )}
              </div>

              <h4 className="font-semibold text-zinc-200 text-xs mb-1 group-hover:text-amber-400 transition-colors">
                {preset.name}
              </h4>
              <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed">
                {preset.description}
              </p>
            </div>

            <div className="mt-3 pt-3 border-t border-zinc-900 flex items-center gap-2">
              <button
                type="button"
                onClick={() => onSelectPreset(preset)}
                className="flex-1 py-1.5 px-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-[11px] font-medium transition-colors cursor-pointer text-center"
                title="Edit instruction prompt"
              >
                Insert Prompt
              </button>
              <button
                type="button"
                onClick={() => onApplyPresetDirectly(preset)}
                disabled={isProcessing}
                className="py-1.5 px-2.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[11px] font-bold transition-colors cursor-pointer flex items-center gap-1 disabled:opacity-40"
                title="Run preset immediately"
              >
                <span>Run</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
