import React from 'react';
import { Sparkles, Image as ImageIcon, HelpCircle, RotateCcw, Cpu } from 'lucide-react';

interface HeaderProps {
  hasImage: boolean;
  onReset: () => void;
  onOpenSampleModal: () => void;
  selectedModel: string;
  onSelectModel: (model: string) => void;
  onOpenTips: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  hasImage,
  onReset,
  onOpenSampleModal,
  selectedModel,
  onSelectModel,
  onOpenTips,
}) => {
  return (
    <header className="sticky top-0 z-30 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md px-4 lg:px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-rose-500/20 ring-1 ring-white/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-base md:text-lg tracking-tight text-white">
                PixelStudio <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-rose-400">AI</span>
              </h1>
              <span className="hidden sm:inline-flex items-center text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Studio Retoucher
              </span>
            </div>
            <p className="text-xs text-zinc-400 hidden sm:block">
              Background removal & product cleanup by typing instructions
            </p>
          </div>
        </div>

        {/* Model selector & Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Model Badge / Selector */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs">
            <Cpu className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-zinc-400 hidden md:inline">Engine:</span>
            <select
              value={selectedModel}
              onChange={(e) => onSelectModel(e.target.value)}
              className="bg-transparent text-zinc-200 font-medium focus:outline-none cursor-pointer text-xs"
              title="Select AI image editing engine"
            >
              <option value="gemini-nano-banana-2.1" className="bg-zinc-900 text-zinc-200">
                Gemini Nano Banana 2.1 (High Quality)
              </option>
              <option value="gemini-3.1-flash-lite-image" className="bg-zinc-900 text-zinc-200">
                Gemini Flash-Lite Image (Fast)
              </option>
            </select>
          </div>

          {/* Sample Products Button */}
          <button
            onClick={onOpenSampleModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition-colors text-xs font-medium cursor-pointer"
            title="Browse sample product photos"
          >
            <ImageIcon className="w-3.5 h-3.5 text-zinc-400" />
            <span className="hidden sm:inline">Try Samples</span>
          </button>

          {/* Reset / New Product */}
          {hasImage && (
            <button
              onClick={onReset}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition-colors text-xs font-medium cursor-pointer"
              title="Upload a new photo"
            >
              <RotateCcw className="w-3.5 h-3.5 text-zinc-400" />
              <span className="hidden sm:inline">New Photo</span>
            </button>
          )}

          {/* Tips / Help */}
          <button
            onClick={onOpenTips}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 transition-colors cursor-pointer"
            title="Instruction prompting tips"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
