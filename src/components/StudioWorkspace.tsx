import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Columns,
  Eye,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  RotateCcw,
  Sliders,
  Check,
  Layers,
  Sparkles,
} from 'lucide-react';
import { ViewMode, CanvasBgType } from '../types';

interface StudioWorkspaceProps {
  originalImage: string;
  currentImage: string;
  isProcessing: boolean;
  onOpenExport: () => void;
  statusMessage?: string;
  hasEditedVersion: boolean;
}

export const StudioWorkspace: React.FC<StudioWorkspaceProps> = ({
  originalImage,
  currentImage,
  isProcessing,
  onOpenExport,
  statusMessage,
  hasEditedVersion,
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>('split');
  const [sliderPos, setSliderPos] = useState<number>(50); // percentage 0-100
  const [isDraggingSlider, setIsDraggingSlider] = useState<boolean>(false);
  const [canvasBg, setCanvasBg] = useState<CanvasBgType>('checker');
  const [customBgColor, setCustomBgColor] = useState<string>('#FFFFFF');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isHoldingOriginal, setIsHoldingOriginal] = useState<boolean>(false);
  const [hasDropShadow, setHasDropShadow] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse / Touch handler for Before/After split slider
  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPos(percentage);
  }, []);

  const handleMouseDown = () => setIsDraggingSlider(true);
  const handleTouchStart = () => setIsDraggingSlider(true);

  useEffect(() => {
    const handleMouseUp = () => setIsDraggingSlider(false);
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingSlider) handleMove(e.clientX);
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (isDraggingSlider && e.touches[0]) handleMove(e.touches[0].clientX);
    };

    if (isDraggingSlider) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDraggingSlider, handleMove]);

  // Canvas background styles
  const getCanvasBgClass = () => {
    switch (canvasBg) {
      case 'white':
        return 'bg-white';
      case 'gray':
        return 'bg-zinc-100';
      case 'dark':
        return 'bg-zinc-950';
      case 'custom':
        return '';
      case 'checker':
      default:
        return 'bg-[linear-gradient(45deg,#1f2128_25%,transparent_25%),linear-gradient(-45deg,#1f2128_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#1f2128_75%),linear-gradient(-45deg,transparent_75%,#1f2128_75%)] bg-[size:24px_24px] bg-[#14151a]';
    }
  };

  const activeImage = isHoldingOriginal || viewMode === 'original-only' ? originalImage : currentImage;

  return (
    <div
      className={`flex flex-col bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 ${
        isFullscreen ? 'fixed inset-4 z-50 rounded-2xl' : 'relative'
      }`}
    >
      {/* Workspace Top Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 bg-zinc-950 border-b border-zinc-800 text-xs">
        {/* View Mode Switcher */}
        <div className="flex items-center gap-1 bg-zinc-900 p-0.5 rounded-xl border border-zinc-800">
          <button
            onClick={() => setViewMode('split')}
            disabled={!hasEditedVersion}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
              viewMode === 'split' && hasEditedVersion
                ? 'bg-amber-500 text-zinc-950 font-semibold'
                : 'text-zinc-400 hover:text-zinc-200 disabled:opacity-40 disabled:cursor-not-allowed'
            }`}
            title="Split Before/After slider"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Split Slider</span>
          </button>
          <button
            onClick={() => setViewMode('side-by-side')}
            disabled={!hasEditedVersion}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
              viewMode === 'side-by-side' && hasEditedVersion
                ? 'bg-amber-500 text-zinc-950 font-semibold'
                : 'text-zinc-400 hover:text-zinc-200 disabled:opacity-40 disabled:cursor-not-allowed'
            }`}
            title="Side by side comparison"
          >
            <Columns className="w-3.5 h-3.5" />
            <span>Side-by-Side</span>
          </button>
          <button
            onClick={() => setViewMode('result-only')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
              viewMode === 'result-only'
                ? 'bg-amber-500 text-zinc-950 font-semibold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
            title="View current result"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Result</span>
          </button>
        </div>

        {/* Hold to Compare Original */}
        {hasEditedVersion && (
          <button
            onMouseDown={() => setIsHoldingOriginal(true)}
            onMouseUp={() => setIsHoldingOriginal(false)}
            onTouchStart={() => setIsHoldingOriginal(true)}
            onTouchEnd={() => setIsHoldingOriginal(false)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 select-none cursor-pointer text-xs font-medium active:bg-amber-500/20 active:text-amber-400"
            title="Press and hold to quickly reveal original photo"
          >
            <Eye className="w-3.5 h-3.5 text-amber-400" />
            <span>Hold to Compare Original</span>
          </button>
        )}

        {/* Canvas Backdrop color selector */}
        <div className="flex items-center gap-1.5 bg-zinc-900 px-2 py-1 rounded-xl border border-zinc-800">
          <span className="text-[11px] text-zinc-400 hidden sm:inline">Backdrop:</span>
          <button
            onClick={() => setCanvasBg('checker')}
            className={`w-5 h-5 rounded-md border flex items-center justify-center cursor-pointer transition-all ${
              canvasBg === 'checker' ? 'border-amber-400 ring-1 ring-amber-400' : 'border-zinc-700'
            } bg-[linear-gradient(45deg,#444_25%,transparent_25%),linear-gradient(-45deg,#444_25%,transparent_25%)] bg-[size:6px_6px] bg-[#222]`}
            title="Transparent Checkerboard"
          >
            {canvasBg === 'checker' && <Check className="w-3 h-3 text-white" />}
          </button>
          <button
            onClick={() => setCanvasBg('white')}
            className={`w-5 h-5 rounded-md border bg-white flex items-center justify-center cursor-pointer transition-all ${
              canvasBg === 'white' ? 'border-amber-400 ring-1 ring-amber-400' : 'border-zinc-700'
            }`}
            title="Amazon Pure White (#FFFFFF)"
          >
            {canvasBg === 'white' && <Check className="w-3 h-3 text-zinc-900" />}
          </button>
          <button
            onClick={() => setCanvasBg('gray')}
            className={`w-5 h-5 rounded-md border bg-zinc-200 flex items-center justify-center cursor-pointer transition-all ${
              canvasBg === 'gray' ? 'border-amber-400 ring-1 ring-amber-400' : 'border-zinc-700'
            }`}
            title="Neutral Studio Grey"
          >
            {canvasBg === 'gray' && <Check className="w-3 h-3 text-zinc-900" />}
          </button>
          <button
            onClick={() => setCanvasBg('dark')}
            className={`w-5 h-5 rounded-md border bg-zinc-950 flex items-center justify-center cursor-pointer transition-all ${
              canvasBg === 'dark' ? 'border-amber-400 ring-1 ring-amber-400' : 'border-zinc-700'
            }`}
            title="Dark Obsidian"
          >
            {canvasBg === 'dark' && <Check className="w-3 h-3 text-white" />}
          </button>

          {/* Soft Shadow toggle */}
          <button
            onClick={() => setHasDropShadow(!hasDropShadow)}
            className={`ml-1 flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
              hasDropShadow
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
            title="Render realistic soft ground contact shadow"
          >
            <Layers className="w-3 h-3" />
            <span className="hidden md:inline">Ground Shadow</span>
          </button>
        </div>

        {/* Zoom & Fullscreen Controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setZoomLevel((z) => Math.max(0.75, +(z - 0.25).toFixed(2)))}
            className="p-1 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors cursor-pointer"
            title="Zoom out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-[11px] font-mono text-zinc-400 w-10 text-center">
            {Math.round(zoomLevel * 100)}%
          </span>
          <button
            onClick={() => setZoomLevel((z) => Math.min(2.5, +(z + 0.25).toFixed(2)))}
            className="p-1 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors cursor-pointer"
            title="Zoom in"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          {zoomLevel !== 1 && (
            <button
              onClick={() => setZoomLevel(1)}
              className="p-1 rounded-lg text-amber-400 hover:bg-zinc-800 transition-colors cursor-pointer"
              title="Reset Zoom"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1 ml-1 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors cursor-pointer"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Main Canvas Viewport */}
      <div
        className={`relative flex-1 flex items-center justify-center p-4 min-h-[420px] md:min-h-[540px] overflow-hidden select-none transition-colors ${getCanvasBgClass()}`}
        style={canvasBg === 'custom' ? { backgroundColor: customBgColor } : undefined}
      >
        {/* Processing Spinner Overlay */}
        {isProcessing && (
          <div className="absolute inset-0 z-40 bg-zinc-950/75 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-300">
            <div className="relative mb-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-500 animate-spin flex items-center justify-center opacity-75 blur-md" />
              <div className="absolute inset-0 w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-700 flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-amber-400 animate-pulse" />
              </div>
            </div>
            <h4 className="text-lg font-bold text-white mb-1">
              Refining Product Photograph...
            </h4>
            <p className="text-xs text-zinc-400 max-w-sm">
              {statusMessage || 'Preserving product geometry, isolating edges, and polishing surfaces...'}
            </p>
          </div>
        )}

        {/* View mode: SPLIT SLIDER */}
        {viewMode === 'split' && hasEditedVersion && (
          <div
            ref={containerRef}
            className="relative w-full max-w-2xl aspect-square max-h-[75vh] rounded-2xl overflow-hidden shadow-2xl border border-zinc-800/80 cursor-ew-resize"
            style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center' }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            {/* Background Layer: AI Result (After) */}
            <img
              src={currentImage}
              alt="Cleaned product after"
              className={`absolute inset-0 w-full h-full object-contain pointer-events-none ${
                hasDropShadow ? 'filter drop-shadow(0 20px 25px rgba(0,0,0,0.4))' : ''
              }`}
            />

            {/* Foreground Layer: Original (Before) - Clipped by sliderPos */}
            <div
              className="absolute inset-0 overflow-hidden pointer-events-none"
              style={{ width: `${sliderPos}%` }}
            >
              <img
                src={originalImage}
                alt="Original product before"
                className="absolute inset-0 w-full h-full object-contain max-w-none"
                style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}
              />
            </div>

            {/* Vertical Divider Line & Handle */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.8)] pointer-events-none"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-zinc-950 font-bold flex items-center justify-center shadow-xl border-2 border-amber-500 text-xs">
                ⬌
              </div>
            </div>

            {/* Badges for Split Slider */}
            <div className="absolute bottom-3 left-3 px-2 py-1 rounded-md bg-black/70 backdrop-blur-md text-[10px] font-semibold text-zinc-300 border border-white/10 pointer-events-none">
              BEFORE (ORIGINAL)
            </div>
            <div className="absolute bottom-3 right-3 px-2 py-1 rounded-md bg-amber-500/90 backdrop-blur-md text-[10px] font-semibold text-zinc-950 border border-amber-400 pointer-events-none">
              AFTER (AI RETOUCHED)
            </div>
          </div>
        )}

        {/* View mode: SIDE BY SIDE */}
        {viewMode === 'side-by-side' && hasEditedVersion && (
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl"
            style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center' }}
          >
            {/* Original Card */}
            <div className="flex flex-col bg-zinc-950/60 rounded-2xl border border-zinc-800 p-2">
              <div className="relative aspect-square rounded-xl overflow-hidden flex items-center justify-center">
                <img
                  src={originalImage}
                  alt="Original"
                  className="w-full h-full object-contain"
                />
                <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/75 text-[10px] font-semibold text-zinc-300">
                  Original Photo
                </span>
              </div>
            </div>

            {/* Retouched Card */}
            <div className="flex flex-col bg-zinc-950/60 rounded-2xl border border-amber-500/40 p-2 shadow-lg shadow-amber-500/5">
              <div className="relative aspect-square rounded-xl overflow-hidden flex items-center justify-center">
                <img
                  src={currentImage}
                  alt="AI Retouched"
                  className={`w-full h-full object-contain ${
                    hasDropShadow ? 'filter drop-shadow(0 20px 25px rgba(0,0,0,0.4))' : ''
                  }`}
                />
                <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-amber-500 text-[10px] font-bold text-zinc-950">
                  AI Retouched
                </span>
              </div>
            </div>
          </div>
        )}

        {/* View mode: SINGLE IMAGE (Result or Original or default when no edit yet) */}
        {(viewMode === 'result-only' || viewMode === 'original-only' || !hasEditedVersion) && (
          <div
            className="relative w-full max-w-2xl aspect-square max-h-[75vh] flex items-center justify-center"
            style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center' }}
          >
            <img
              src={activeImage}
              alt="Active Product View"
              className={`max-w-full max-h-full object-contain rounded-xl transition-all duration-300 ${
                hasDropShadow && activeImage !== originalImage
                  ? 'filter drop-shadow(0 25px 30px rgba(0,0,0,0.45))'
                  : ''
              }`}
            />
            <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-zinc-950/80 backdrop-blur-md text-[11px] font-medium text-zinc-300 border border-zinc-800 pointer-events-none">
              {isHoldingOriginal || viewMode === 'original-only'
                ? 'Original Photo'
                : hasEditedVersion
                ? 'AI Studio Retouched'
                : 'Raw Product Photo'}
            </div>
          </div>
        )}
      </div>

      {/* Workspace Footer Action Bar */}
      <div className="px-4 py-3 bg-zinc-950 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="text-zinc-400 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>
            {hasEditedVersion
              ? 'Retouch complete. Drag slider or switch backdrop to inspect edges.'
              : 'Ready. Type instructions or pick a 1-click preset below.'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {hasEditedVersion && (
            <button
              onClick={onOpenExport}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-zinc-950 font-bold shadow-lg shadow-amber-500/20 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>Export High-Res Image</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
