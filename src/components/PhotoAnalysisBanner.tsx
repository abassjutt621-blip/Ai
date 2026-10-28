import React, { useState } from 'react';
import { Sparkles, AlertCircle, ArrowRight, CheckCircle2, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import { PhotoAnalysis } from '../types';

interface PhotoAnalysisBannerProps {
  analysis: PhotoAnalysis | null;
  isAnalyzing: boolean;
  onAnalyze: () => void;
  onApplyPrompt: (prompt: string) => void;
}

export const PhotoAnalysisBanner: React.FC<PhotoAnalysisBannerProps> = ({
  analysis,
  isAnalyzing,
  onAnalyze,
  onApplyPrompt,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  if (!analysis && !isAnalyzing) {
    return (
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-zinc-200">
              AI Photo Surface & Background Inspector
            </h4>
            <p className="text-[11px] text-zinc-400">
              Analyze this product photo to automatically spot glare, dust, and get tailored cleanup recommendations
            </p>
          </div>
        </div>
        <button
          onClick={onAnalyze}
          className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors shrink-0 cursor-pointer shadow-md shadow-indigo-600/20"
        >
          Scan Photo with AI
        </button>
      </div>
    );
  }

  if (isAnalyzing) {
    return (
      <div className="bg-indigo-950/30 border border-indigo-800/50 rounded-2xl p-3.5 flex items-center gap-3 animate-pulse">
        <Loader2 className="w-4 h-4 text-indigo-400 animate-spin shrink-0" />
        <span className="text-xs text-indigo-200">
          Scanning product geometry, specular reflections, dust, and background conditions...
        </span>
      </div>
    );
  }

  if (!analysis) return null;

  return (
    <div className="bg-zinc-900 border border-indigo-500/30 rounded-2xl p-4 shadow-lg shadow-indigo-500/5">
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
            <CheckCircle2 className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-bold text-white">
            Photo Inspection: {analysis.productName} ({analysis.category})
          </span>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-zinc-400 hover:text-zinc-200 p-1 cursor-pointer"
        >
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {isExpanded && (
        <div className="space-y-3 pt-2">
          {/* Detected notes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="bg-zinc-950 p-2.5 rounded-xl border border-zinc-800/80">
              <span className="text-[10px] uppercase font-bold text-zinc-500 block mb-0.5">
                Background Status
              </span>
              <p className="text-zinc-300 text-[11px]">{analysis.backgroundAssessment}</p>
            </div>
            <div className="bg-zinc-950 p-2.5 rounded-xl border border-zinc-800/80">
              <span className="text-[10px] uppercase font-bold text-amber-500 block mb-0.5 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> Surface Flaws Spotted
              </span>
              <p className="text-zinc-300 text-[11px]">
                {analysis.surfaceFlaws && analysis.surfaceFlaws.length > 0
                  ? analysis.surfaceFlaws.join(' • ')
                  : 'Minor lighting imperfections'}
              </p>
            </div>
          </div>

          {/* Quick Tailored Fix Actions */}
          {analysis.quickSuggestions && analysis.quickSuggestions.length > 0 && (
            <div>
              <span className="text-[11px] font-semibold text-zinc-400 block mb-1.5">
                Tailored 1-Click Instructions for This Photo:
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {analysis.quickSuggestions.map((sug, idx) => (
                  <button
                    key={idx}
                    onClick={() => onApplyPrompt(sug.prompt)}
                    className="p-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800/80 border border-zinc-800 hover:border-indigo-500/50 text-left transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-bold text-indigo-400 block mb-0.5">
                        {sug.label}
                      </span>
                      <p className="text-[11px] text-zinc-400 line-clamp-2">
                        {sug.prompt}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center gap-1 text-[10px] font-semibold text-zinc-300 group-hover:text-white">
                      <span>Apply Instruction</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
