import React from 'react';
import { X, ArrowRight, Check } from 'lucide-react';
import { SAMPLE_PRODUCTS, SampleProduct } from '../data/sampleProducts';

interface SamplePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSample: (sample: SampleProduct) => void;
  currentSampleId?: string;
}

export const SamplePickerModal: React.FC<SamplePickerModalProps> = ({
  isOpen,
  onClose,
  onSelectSample,
  currentSampleId,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-3xl bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <h3 className="text-xl font-bold text-white tracking-tight">
            Sample Product Photography Studio
          </h3>
          <p className="text-xs text-zinc-400 mt-1">
            Pick a sample photo to immediately practice background isolation, surface polish, and lighting adjustments.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SAMPLE_PRODUCTS.map((sample) => {
            const isSelected = sample.id === currentSampleId;
            return (
              <div
                key={sample.id}
                onClick={() => {
                  onSelectSample(sample);
                  onClose();
                }}
                className={`group rounded-2xl bg-zinc-950 border p-4 transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-amber-400 ring-1 ring-amber-400/50 bg-amber-500/5'
                    : 'border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/60'
                }`}
              >
                <div>
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-zinc-900 mb-3 border border-zinc-800/60">
                    <img
                      src={sample.dataUri}
                      alt={sample.name}
                      className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                    />
                    {isSelected && (
                      <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-amber-500 text-zinc-950 text-[10px] font-bold flex items-center gap-1 shadow-md">
                        <Check className="w-3 h-3" /> Active
                      </span>
                    )}
                  </div>

                  <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400">
                    {sample.category}
                  </span>
                  <h4 className="font-semibold text-zinc-100 text-sm mt-0.5 group-hover:text-amber-400 transition-colors">
                    {sample.name}
                  </h4>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    {sample.subtitle}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-zinc-900 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-zinc-500">
                    {sample.recommendedPrompts.length} tailored prompts
                  </span>
                  <span className="font-semibold text-amber-400 group-hover:text-amber-300 flex items-center gap-1">
                    Load Photo <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
