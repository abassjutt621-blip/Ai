import React from 'react';
import { History, ArrowRight, RotateCcw, Clock } from 'lucide-react';
import { EditHistoryItem } from '../types';

interface HistoryStackProps {
  history: EditHistoryItem[];
  currentIndex: number;
  onSelectVersion: (index: number) => void;
  onClearHistory: () => void;
}

export const HistoryStack: React.FC<HistoryStackProps> = ({
  history,
  currentIndex,
  onSelectVersion,
  onClearHistory,
}) => {
  if (history.length <= 1) return null;

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-4 shadow-xl">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-amber-400" />
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">
            Edit Version Stack ({history.length} versions)
          </h4>
        </div>
        <button
          onClick={onClearHistory}
          className="text-[11px] text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
        >
          Reset to Original
        </button>
      </div>

      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
        {history.map((item, idx) => {
          const isActive = idx === currentIndex;
          return (
            <div
              key={item.id}
              onClick={() => onSelectVersion(idx)}
              className={`group flex items-center gap-2.5 p-2 rounded-2xl border transition-all cursor-pointer shrink-0 ${
                isActive
                  ? 'bg-amber-500/10 border-amber-500/80 shadow-md shadow-amber-500/10'
                  : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
              }`}
            >
              {/* Thumbnail */}
              <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 shrink-0">
                <img
                  src={item.imageUrl}
                  alt={item.label}
                  className="w-full h-full object-cover"
                />
                {isActive && (
                  <div className="absolute inset-0 bg-amber-500/20 ring-2 ring-amber-400 ring-inset" />
                )}
              </div>

              {/* Version Info */}
              <div className="pr-2 max-w-[140px]">
                <div className="flex items-center gap-1 mb-0.5">
                  <span
                    className={`text-[10px] font-bold uppercase ${
                      isActive ? 'text-amber-400' : 'text-zinc-400'
                    }`}
                  >
                    {idx === 0 ? 'Original' : `V${idx}`}
                  </span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  )}
                </div>
                <p className="text-[11px] text-zinc-300 font-medium line-clamp-1">
                  {item.label}
                </p>
                <span className="text-[9px] text-zinc-500 font-mono">
                  {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
