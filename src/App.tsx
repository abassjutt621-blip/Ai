import React, { useState } from 'react';
import { Header } from './components/Header';
import { ImageUploadDropzone } from './components/ImageUploadDropzone';
import { StudioWorkspace } from './components/StudioWorkspace';
import { InstructionEditor } from './components/InstructionEditor';
import { PresetGrid } from './components/PresetGrid';
import { HistoryStack } from './components/HistoryStack';
import { PhotoAnalysisBanner } from './components/PhotoAnalysisBanner';
import { ExportModal } from './components/ExportModal';
import { SamplePickerModal } from './components/SamplePickerModal';
import { TipsModal } from './components/TipsModal';
import { SampleProduct } from './data/sampleProducts';
import { Preset } from './data/presets';
import { EditHistoryItem, PhotoAnalysis, AspectRatioType } from './types';
import { AlertCircle, X, Sparkles } from 'lucide-react';

export default function App() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [currentSample, setCurrentSample] = useState<SampleProduct | null>(null);

  const [prompt, setPrompt] = useState<string>('');
  const [aspectRatio, setAspectRatio] = useState<AspectRatioType>('1:1');
  const [selectedModel, setSelectedModel] = useState<string>('gemini-nano-banana-2.1');

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  // History version stack
  const [history, setHistory] = useState<EditHistoryItem[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);

  // Photo analysis
  const [analysis, setAnalysis] = useState<PhotoAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  // Modals
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);
  const [isSamplePickerOpen, setIsSamplePickerOpen] = useState<boolean>(false);
  const [isTipsOpen, setIsTipsOpen] = useState<boolean>(false);

  // When an image is uploaded or a sample is picked
  const handleImageSelected = (dataUri: string, sampleInfo?: SampleProduct) => {
    setOriginalImage(dataUri);
    setCurrentImage(dataUri);
    setCurrentSample(sampleInfo || null);
    setError(null);
    setAnalysis(null);

    const initialItem: EditHistoryItem = {
      id: 'original',
      timestamp: Date.now(),
      imageUrl: dataUri,
      prompt: 'Original Upload',
      label: 'Original Photo',
      aspectRatio: '1:1',
    };
    setHistory([initialItem]);
    setHistoryIndex(0);

    if (sampleInfo && sampleInfo.recommendedPrompts.length > 0) {
      setPrompt(sampleInfo.recommendedPrompts[0].prompt);
    } else {
      setPrompt('Remove the background completely and place on pure studio white (#FFFFFF) with a delicate soft contact shadow.');
    }
  };

  // Perform AI photo retouching using server-side Gemini API
  const handleExecuteEdit = async (instructionPrompt: string, ratio: AspectRatioType) => {
    if (!instructionPrompt.trim() || !originalImage || isProcessing) return;

    setIsProcessing(true);
    setStatusMessage('Isolating product, removing background, and cleaning surface details...');
    setError(null);

    try {
      const response = await fetch('/api/edit-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: originalImage,
          prompt: instructionPrompt,
          aspectRatio: ratio,
          preferredModel: selectedModel,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.ok || !data.image) {
        throw new Error(data.error || 'Failed to edit photo. Please try refining your instruction.');
      }

      const newImageUrl = data.image;
      setCurrentImage(newImageUrl);

      // Create history entry
      const newItem: EditHistoryItem = {
        id: `v-${Date.now()}`,
        timestamp: Date.now(),
        imageUrl: newImageUrl,
        prompt: instructionPrompt,
        label: instructionPrompt.slice(0, 32) + (instructionPrompt.length > 32 ? '...' : ''),
        modelUsed: data.modelUsed,
        aspectRatio: ratio,
      };

      setHistory((prev) => [...prev, newItem]);
      setHistoryIndex(history.length);
    } catch (err: any) {
      console.error('Error applying edit:', err);
      setError(err.message || 'An unexpected error occurred while retouching the image.');
    } finally {
      setIsProcessing(false);
      setStatusMessage('');
    }
  };

  // Preset clicked -> insert prompt or run
  const handleSelectPreset = (preset: Preset) => {
    setPrompt(preset.prompt);
  };

  const handleApplyPresetDirectly = (preset: Preset) => {
    setPrompt(preset.prompt);
    handleExecuteEdit(preset.prompt, aspectRatio);
  };

  // Scan & analyze photo with gemini-3.8-flash
  const handleAnalyzePhoto = async () => {
    if (!originalImage || isAnalyzing) return;
    setIsAnalyzing(true);
    setError(null);
    try {
      const res = await fetch('/api/analyze-photo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: originalImage }),
      });
      const data = await res.json();
      if (data.ok && data.analysis) {
        setAnalysis(data.analysis);
      } else {
        throw new Error(data.error || 'Failed to analyze photo');
      }
    } catch (err: any) {
      console.error('Analysis error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // History version selection
  const handleSelectHistoryVersion = (index: number) => {
    if (index >= 0 && index < history.length) {
      setHistoryIndex(index);
      setCurrentImage(history[index].imageUrl);
      if (history[index].prompt && history[index].prompt !== 'Original Upload') {
        setPrompt(history[index].prompt);
      }
    }
  };

  const handleClearHistory = () => {
    if (originalImage) {
      setCurrentImage(originalImage);
      setHistoryIndex(0);
      setHistory([history[0]]);
    }
  };

  const handleReset = () => {
    setOriginalImage(null);
    setCurrentImage(null);
    setCurrentSample(null);
    setHistory([]);
    setHistoryIndex(0);
    setAnalysis(null);
    setError(null);
    setPrompt('');
  };

  const hasEditedVersion = history.length > 1;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-amber-500 selection:text-zinc-950">
      {/* Header */}
      <Header
        hasImage={!!originalImage}
        onReset={handleReset}
        onOpenSampleModal={() => setIsSamplePickerOpen(true)}
        selectedModel={selectedModel}
        onSelectModel={setSelectedModel}
        onOpenTips={() => setIsTipsOpen(true)}
      />

      {/* Main Body */}
      <main className="flex-1 pb-16">
        {!originalImage ? (
          /* Step 1: Upload Dropzone & Sample Catalog */
          <ImageUploadDropzone onImageSelected={handleImageSelected} />
        ) : (
          /* Step 2: Interactive Studio Workspace */
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 space-y-6">
            {/* Error Banner */}
            {error && (
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-start justify-between gap-3 text-rose-300 text-xs animate-in fade-in">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{error}</span>
                </div>
                <button
                  onClick={() => setError(null)}
                  className="text-rose-400 hover:text-rose-200 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Smart Photo Flaw Inspector Banner */}
            <PhotoAnalysisBanner
              analysis={analysis}
              isAnalyzing={isAnalyzing}
              onAnalyze={handleAnalyzePhoto}
              onApplyPrompt={(suggestedPrompt) => {
                setPrompt(suggestedPrompt);
                handleExecuteEdit(suggestedPrompt, aspectRatio);
              }}
            />

            {/* Visual Canvas with Split Slider & View Options */}
            <StudioWorkspace
              originalImage={originalImage}
              currentImage={currentImage || originalImage}
              isProcessing={isProcessing}
              onOpenExport={() => setIsExportOpen(true)}
              statusMessage={statusMessage}
              hasEditedVersion={hasEditedVersion}
            />

            {/* Natural Language Instruction Editor */}
            <InstructionEditor
              prompt={prompt}
              onPromptChange={setPrompt}
              onSubmit={handleExecuteEdit}
              isProcessing={isProcessing}
              aspectRatio={aspectRatio}
              onAspectRatioChange={setAspectRatio}
              selectedModel={selectedModel}
            />

            {/* Version History Stack */}
            <HistoryStack
              history={history}
              currentIndex={historyIndex}
              onSelectVersion={handleSelectHistoryVersion}
              onClearHistory={handleClearHistory}
            />

            {/* 1-Click Studio Presets Grid */}
            <PresetGrid
              onSelectPreset={handleSelectPreset}
              onApplyPresetDirectly={handleApplyPresetDirectly}
              isProcessing={isProcessing}
            />
          </div>
        )}
      </main>

      {/* Modals */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        imageUrl={currentImage || originalImage || ''}
        productName={currentSample ? currentSample.name : 'product-photo'}
      />

      <SamplePickerModal
        isOpen={isSamplePickerOpen}
        onClose={() => setIsSamplePickerOpen(false)}
        onSelectSample={(sample) => handleImageSelected(sample.dataUri, sample)}
        currentSampleId={currentSample?.id}
      />

      <TipsModal
        isOpen={isTipsOpen}
        onClose={() => setIsTipsOpen(false)}
        onUsePrompt={(newPrompt) => {
          setPrompt(newPrompt);
          if (originalImage) {
            handleExecuteEdit(newPrompt, aspectRatio);
          }
        }}
      />
    </div>
  );
}
