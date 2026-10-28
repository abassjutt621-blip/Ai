import React, { useState } from 'react';
import { X, Download, Copy, Check, FileImage, ShieldCheck, Sparkles } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  productName?: string;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  productName = 'product-retouched',
}) => {
  const [format, setFormat] = useState<'png' | 'jpeg'>('png');
  const [bgChoice, setBgChoice] = useState<'transparent' | 'white' | 'gray' | 'dark' | 'custom'>('transparent');
  const [customColor, setCustomColor] = useState<string>('#FFFFFF');
  const [targetSize, setTargetSize] = useState<number>(0); // 0 = original, 2000, 1080, 800
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);

  if (!isOpen) return null;

  // Process image using HTML5 Canvas for exact background fill & sizing
  const processImageToBlob = async (
    targetFormat: 'image/png' | 'image/jpeg',
    quality = 0.95
  ): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        let outWidth = img.naturalWidth || 1000;
        let outHeight = img.naturalHeight || 1000;

        if (targetSize > 0) {
          const aspect = outWidth / outHeight;
          if (aspect >= 1) {
            outWidth = targetSize;
            outHeight = Math.round(targetSize / aspect);
          } else {
            outHeight = targetSize;
            outWidth = Math.round(targetSize * aspect);
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = outWidth;
        canvas.height = outHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas 2D context not available'));
          return;
        }

        // Fill background if not transparent or if JPEG
        if (targetFormat === 'image/jpeg' || bgChoice !== 'transparent') {
          let fillColor = '#FFFFFF';
          if (bgChoice === 'white') fillColor = '#FFFFFF';
          else if (bgChoice === 'gray') fillColor = '#F4F4F6';
          else if (bgChoice === 'dark') fillColor = '#0F172A';
          else if (bgChoice === 'custom') fillColor = customColor;
          else if (targetFormat === 'image/jpeg') fillColor = '#FFFFFF';

          ctx.fillStyle = fillColor;
          ctx.fillRect(0, 0, outWidth, outHeight);
        }

        // Draw the image
        ctx.drawImage(img, 0, 0, outWidth, outHeight);

        canvas.toBlob(
          (blob) => {
            if (blob) resolve(blob);
            else reject(new Error('Failed to create image blob'));
          },
          targetFormat,
          quality
        );
      };
      img.onerror = () => reject(new Error('Failed to load image for export'));
      img.src = imageUrl;
    });
  };

  const handleDownload = async () => {
    try {
      setIsExporting(true);
      const mime = format === 'png' ? 'image/png' : 'image/jpeg';
      const blob = await processImageToBlob(mime);
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      const safeName = productName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      link.download = `${safeName}-${format === 'png' ? 'cutout' : 'clean'}.${format}`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download failed:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopyToClipboard = async () => {
    try {
      setIsExporting(true);
      const blob = await processImageToBlob('image/png');
      await navigator.clipboard.write([
        new ClipboardItem({
          'image/png': blob,
        }),
      ]);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    } catch (err) {
      console.error('Copy to clipboard failed:', err);
      alert('Could not copy image directly to clipboard in this browser. Please use Download button.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-zinc-950 font-bold shadow-lg shadow-amber-500/20">
            <FileImage className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Export Product Photo
            </h3>
            <p className="text-xs text-zinc-400">
              High-resolution export optimized for Shopify, Amazon, or print
            </p>
          </div>
        </div>

        {/* Preview Thumbnail */}
        <div className="flex items-center gap-4 p-3 bg-zinc-950 rounded-2xl border border-zinc-800 mb-6">
          <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 shrink-0 flex items-center justify-center">
            <img src={imageUrl} alt="Export preview" className="w-full h-full object-contain" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-zinc-200">{productName}</h4>
            <p className="text-[11px] text-zinc-500 mt-0.5">
              Ready with AI background removal and surface cleanup applied
            </p>
            <div className="inline-flex items-center gap-1.5 mt-2 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-semibold">
              <ShieldCheck className="w-3 h-3" /> Commercial Ready
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="space-y-4 text-xs">
          {/* Format selection */}
          <div>
            <label className="font-semibold text-zinc-300 block mb-1.5">
              File Format
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setFormat('png')}
                className={`py-2 px-3 rounded-xl border text-center transition-all cursor-pointer ${
                  format === 'png'
                    ? 'bg-amber-500/10 border-amber-500 text-amber-400 font-bold'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <div className="font-bold">PNG</div>
                <div className="text-[10px] opacity-75">Lossless • Transparent support</div>
              </button>
              <button
                type="button"
                onClick={() => {
                  setFormat('jpeg');
                  if (bgChoice === 'transparent') setBgChoice('white');
                }}
                className={`py-2 px-3 rounded-xl border text-center transition-all cursor-pointer ${
                  format === 'jpeg'
                    ? 'bg-amber-500/10 border-amber-500 text-amber-400 font-bold'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <div className="font-bold">JPEG</div>
                <div className="text-[10px] opacity-75">Web optimized • Solid background</div>
              </button>
            </div>
          </div>

          {/* Background choice */}
          <div>
            <label className="font-semibold text-zinc-300 block mb-1.5">
              Background Fill
            </label>
            <div className="grid grid-cols-4 gap-2">
              <button
                type="button"
                disabled={format === 'jpeg'}
                onClick={() => setBgChoice('transparent')}
                className={`py-2 px-2 rounded-xl border text-center transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed ${
                  bgChoice === 'transparent' && format === 'png'
                    ? 'bg-amber-500/10 border-amber-500 text-amber-400 font-bold'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Transparent
              </button>
              <button
                type="button"
                onClick={() => setBgChoice('white')}
                className={`py-2 px-2 rounded-xl border text-center transition-all cursor-pointer ${
                  bgChoice === 'white'
                    ? 'bg-amber-500/10 border-amber-500 text-amber-400 font-bold'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Pure White
              </button>
              <button
                type="button"
                onClick={() => setBgChoice('gray')}
                className={`py-2 px-2 rounded-xl border text-center transition-all cursor-pointer ${
                  bgChoice === 'gray'
                    ? 'bg-amber-500/10 border-amber-500 text-amber-400 font-bold'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Studio Grey
              </button>
              <button
                type="button"
                onClick={() => setBgChoice('dark')}
                className={`py-2 px-2 rounded-xl border text-center transition-all cursor-pointer ${
                  bgChoice === 'dark'
                    ? 'bg-amber-500/10 border-amber-500 text-amber-400 font-bold'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Matte Dark
              </button>
            </div>
          </div>

          {/* Resolution Presets */}
          <div>
            <label className="font-semibold text-zinc-300 block mb-1.5">
              Resolution Spec
            </label>
            <div className="grid grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setTargetSize(0)}
                className={`py-2 px-1 rounded-xl border text-center transition-all cursor-pointer ${
                  targetSize === 0
                    ? 'bg-amber-500/10 border-amber-500 text-amber-400 font-bold'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Original
              </button>
              <button
                type="button"
                onClick={() => setTargetSize(2000)}
                className={`py-2 px-1 rounded-xl border text-center transition-all cursor-pointer ${
                  targetSize === 2000
                    ? 'bg-amber-500/10 border-amber-500 text-amber-400 font-bold'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                2000px (Amazon)
              </button>
              <button
                type="button"
                onClick={() => setTargetSize(1080)}
                className={`py-2 px-1 rounded-xl border text-center transition-all cursor-pointer ${
                  targetSize === 1080
                    ? 'bg-amber-500/10 border-amber-500 text-amber-400 font-bold'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                1080px (Shopify)
              </button>
              <button
                type="button"
                onClick={() => setTargetSize(800)}
                className={`py-2 px-1 rounded-xl border text-center transition-all cursor-pointer ${
                  targetSize === 800
                    ? 'bg-amber-500/10 border-amber-500 text-amber-400 font-bold'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                800px (Web)
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 pt-5 border-t border-zinc-800 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={handleCopyToClipboard}
            disabled={isExporting}
            className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold text-xs transition-colors cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
          >
            {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{isCopied ? 'Copied to Clipboard!' : 'Copy Image'}</span>
          </button>

          <button
            type="button"
            onClick={handleDownload}
            disabled={isExporting}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-zinc-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>Download {format.toUpperCase()}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
