import React, { useRef, useState, useEffect } from 'react';
import { Upload, Sparkles, Wand2, Scissors, ArrowRight, ShieldCheck, ImagePlus } from 'lucide-react';
import { SAMPLE_PRODUCTS, SampleProduct } from '../data/sampleProducts';

interface ImageUploadDropzoneProps {
  onImageSelected: (dataUri: string, sampleInfo?: SampleProduct) => void;
}

export const ImageUploadDropzone: React.FC<ImageUploadDropzoneProps> = ({ onImageSelected }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle global paste event for quick workflow
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.startsWith('image/')) {
          const blob = items[i].getAsFile();
          if (blob) {
            processFile(blob);
            break;
          }
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, []);

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG, JPG, WEBP, or SVG).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        onImageSelected(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
      {/* Hero Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          Natural Language Product Retouching Engine
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
          Clean Up & Remove Backgrounds{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-400 to-indigo-400">
            Just by Typing
          </span>
        </h2>
        <p className="text-sm md:text-base text-zinc-400 leading-relaxed">
          Drop any raw product photo. Type instructions like &ldquo;remove background&rdquo;, &ldquo;clean up glare&rdquo;, or &ldquo;place on white marble podium with morning sunlight&rdquo; to transform your catalog.
        </p>
      </div>

      {/* Main Drag & Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative group rounded-3xl p-8 md:p-14 text-center border-2 border-dashed transition-all duration-300 cursor-pointer overflow-hidden ${
          isDragging
            ? 'border-amber-400 bg-amber-500/10 scale-[1.01]'
            : 'border-zinc-800 hover:border-zinc-700 bg-zinc-900/40 hover:bg-zinc-900/70'
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />

        {/* Ambient background glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-rose-500/5 pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700/60 flex items-center justify-center text-amber-400 mb-5 shadow-2xl group-hover:scale-105 group-hover:border-amber-400/50 transition-all duration-300">
            <Upload className="w-10 h-10" />
          </div>

          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
            Upload or Drag & Drop Product Photo
          </h3>
          <p className="text-sm text-zinc-400 max-w-md mb-6">
            PNG, JPG, WEBP up to 25MB • Or press <kbd className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700 text-xs font-mono">Ctrl+V</kbd> / <kbd className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700 text-xs font-mono">⌘V</kbd> to paste directly from your clipboard
          </p>

          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-white font-medium text-sm shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/30 transition-shadow">
            <ImagePlus className="w-4 h-4" />
            Select Image From Device
          </div>

          {/* Feature Highlights Pill Row */}
          <div className="mt-8 pt-8 border-t border-zinc-800/80 flex flex-wrap items-center justify-center gap-4 text-xs text-zinc-400">
            <div className="flex items-center gap-1.5">
              <Scissors className="w-3.5 h-3.5 text-amber-400" />
              <span>Instant Background Cutout</span>
            </div>
            <span className="text-zinc-700">•</span>
            <div className="flex items-center gap-1.5">
              <Wand2 className="w-3.5 h-3.5 text-rose-400" />
              <span>Specular Glare & Dust Polish</span>
            </div>
            <span className="text-zinc-700">•</span>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% Brand Geometry Preserved</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sample Products Section */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">
              Or test immediately with a sample product
            </h4>
            <p className="text-xs text-zinc-500">
              Click any photo to start practicing background removal and lighting cleanup
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SAMPLE_PRODUCTS.map((sample) => (
            <div
              key={sample.id}
              onClick={() => onImageSelected(sample.dataUri, sample)}
              className="group relative rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-amber-500/50 p-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/10 cursor-pointer flex flex-col"
            >
              <div className="relative aspect-square rounded-xl overflow-hidden bg-zinc-950 mb-3 border border-zinc-800/50">
                <img
                  src={sample.dataUri}
                  alt={sample.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-white bg-amber-500/90 px-2 py-1 rounded-md">
                    Use This Sample <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-medium uppercase tracking-wider text-amber-400/90">
                    {sample.category}
                  </span>
                  <h5 className="font-semibold text-zinc-200 text-xs mt-0.5 line-clamp-1 group-hover:text-white">
                    {sample.name}
                  </h5>
                </div>
                <p className="text-[11px] text-zinc-500 line-clamp-2 mt-1">
                  {sample.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
