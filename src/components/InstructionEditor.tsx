import React, { useState } from 'react';
import { Sparkles, Wand2, ArrowUpRight, Loader2, Ratio, Check, RefreshCw } from 'lucide-react';
import { AspectRatioType } from '../types';

interface InstructionEditorProps {
  prompt: string;
  onPromptChange: (newPrompt: string) => void;
  onSubmit: (prompt: string, aspectRatio: AspectRatioType) => void;
  isProcessing: boolean;
  aspectRatio: AspectRatioType;
  onAspectRatioChange: (ratio: AspectRatioType) => void;
  selectedModel: string;
}

const QUICK_INSTRUCTION_PILLS = [
  'Remove background completely to transparent cutout',
  'Pure Amazon / Shopify studio white background with soft contact shadow',
  'Clean up harsh glare streaks and specular hot spots on the surface',
  'Erase dust specks, scuffs, and fingerprint smudges while keeping label razor sharp',
  'Place product on sleek circular marble podium with morning sunlight',
  'Warm Scandinavian oak wood table with soft bokeh background',
  'Matte obsidian black stone surface with subtle rim light',
];

export const InstructionEditor: React.FC<InstructionEditorProps> = ({
  prompt,
  onPromptChange,
  onSubmit,
  isProcessing,
  aspectRatio,
  onAspectRatioChange,
  selectedModel,
}) => {
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [enhancedSuccess, setEnhancedSuccess] = useState(false);

  // Call server to expand/refine user prompt with gemini-3.8-flash
  const handleEnhanceWithAI = async () => {
    if (!prompt.trim() || isEnhancing) return;
    setIsEnhancing(true);
    try {
      const res = await fetch('/api/enhance-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (data.ok && data.enhancedPrompt) {
        onPromptChange(data.enhancedPrompt);
        setEnhancedSuccess(true);
        setTimeout(() => setEnhancedSuccess(false), 3000);
      }
    } catch (err) {
      console.error('Failed to enhance prompt:', err);
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      if (prompt.trim() && !isProcessing) {
        onSubmit(prompt, aspectRatio);
      }
    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 shadow-xl relative overflow-hidden">
      {/* Background soft ambient gradient */}
      <div className="absolute top-0 right-0 w-80 h-40 bg-gradient-to-bl from-amber-500/10 via-rose-500/5 to-transparent pointer-events-none" />

      {/* Header bar of prompt box */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Wand2 className="w-3.5 h-3.5" />
          </div>
          <label htmlFor="prompt-input" className="text-sm font-bold text-white tracking-tight">
            Typing Instructions
          </label>
          <span className="text-[11px] text-zinc-400">
            (Describe what to remove, clean, or add)
          </span>
        </div>

        {/* Aspect Ratio Selector */}
        <div className="flex items-center gap-1 bg-zinc-950 px-2 py-1 rounded-xl border border-zinc-800 text-xs">
          <Ratio className="w-3.5 h-3.5 text-zinc-400" />
          <span className="text-zinc-500 mr-1">Ratio:</span>
          {(['1:1', '4:3', '3:4', '16:9'] as AspectRatioType[]).map((r) => (
            <button
              key={r}
              onClick={() => onAspectRatioChange(r)}
              className={`px-2 py-0.5 rounded-md font-mono text-[11px] transition-colors cursor-pointer ${
                aspectRatio === r
                  ? 'bg-amber-500/20 text-amber-400 font-bold border border-amber-500/30'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Main Textarea */}
      <div className="relative mb-3">
        <textarea
          id="prompt-input"
          value={prompt}
          onChange={(e) => onPromptChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g. Remove the background and place on pure studio white with soft shadow; erase the glare reflection on the glass..."
          rows={3}
          className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/20 rounded-2xl p-4 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none transition-all resize-none shadow-inner leading-relaxed"
        />

        {/* Refine with AI Button floating at bottom right */}
        <div className="absolute right-3 bottom-3 flex items-center gap-2">
          {enhancedSuccess && (
            <span className="text-[11px] font-medium text-emerald-400 flex items-center gap-1 animate-in fade-in">
              <Check className="w-3 h-3" /> Refined!
            </span>
          )}
          <button
            type="button"
            onClick={handleEnhanceWithAI}
            disabled={!prompt.trim() || isEnhancing || isProcessing}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-amber-400 border border-amber-500/30 hover:border-amber-500/60 transition-all text-xs font-semibold cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-md"
            title="Refine instructions with AI commercial photography retoucher"
          >
            {isEnhancing ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Refining...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Refine with AI</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Quick Instruction Pills */}
      <div className="mb-4">
        <div className="text-[11px] font-medium text-zinc-400 mb-2 flex items-center justify-between">
          <span>Quick suggestion chips (click to insert):</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {QUICK_INSTRUCTION_PILLS.map((pill, i) => (
            <button
              key={i}
              type="button"
              onClick={() => onPromptChange(pill)}
              className="px-2.5 py-1 rounded-lg bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white text-xs transition-colors text-left cursor-pointer flex items-center gap-1"
            >
              <span>{pill}</span>
              <ArrowUpRight className="w-3 h-3 text-zinc-500 shrink-0" />
            </button>
          ))}
        </div>
      </div>

      {/* Primary Action Button Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-zinc-800/80">
        <div className="text-xs text-zinc-400 flex items-center gap-1.5">
          <span className="hidden sm:inline">Engine:</span>
          <span className="font-mono text-zinc-300 font-medium">{selectedModel}</span>
          <span className="text-zinc-600 hidden sm:inline">•</span>
          <span className="hidden sm:inline">Press <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 text-[10px] font-mono">⌘+Enter</kbd> to run</span>
        </div>

        <button
          type="button"
          onClick={() => onSubmit(prompt, aspectRatio)}
          disabled={!prompt.trim() || isProcessing}
          className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 hover:from-amber-400 hover:via-rose-400 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-rose-500/20 hover:shadow-rose-500/30 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
        >
          {isProcessing ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin text-white" />
              <span>Retouching in Progress...</span>
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              <span>Execute Photo Retouch</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
