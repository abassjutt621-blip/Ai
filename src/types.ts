export interface EditHistoryItem {
  id: string;
  timestamp: number;
  imageUrl: string;
  prompt: string;
  label: string;
  modelUsed?: string;
  aspectRatio: string;
}

export interface PhotoAnalysis {
  productName: string;
  category: string;
  backgroundAssessment: string;
  surfaceFlaws: string[];
  quickSuggestions: {
    label: string;
    prompt: string;
    type: 'background' | 'cleanup' | 'stage';
  }[];
}

export type ViewMode = 'split' | 'side-by-side' | 'result-only' | 'original-only';
export type CanvasBgType = 'checker' | 'white' | 'gray' | 'dark' | 'custom';
export type AspectRatioType = '1:1' | '3:4' | '4:3' | '16:9';
