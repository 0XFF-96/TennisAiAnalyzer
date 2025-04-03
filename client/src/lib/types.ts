import { type TennisAnalysis } from "@shared/schema";

// Export types specific to client
export type AnalysisStatus = 'idle' | 'uploading' | 'processing' | 'analyzing' | 'complete' | 'error';

export type FileProgress = {
  fileName: string;
  progress: number;
  size: number;
  totalSize: number;
};

export type PoseKeypointsProps = {
  keypoints: {
    position: {
      x: number;
      y: number;
    };
    part: string;
    score: number;
  }[];
  connections: string[][];
};

export interface PerformanceScoresProps {
  preparationScore: number;
  swingPathScore: number;
  bodyPositionScore: number;
  followThroughScore: number;
  overallScore: number;
}

export type HistoryFilterOptions = {
  shotType: string;
  timeRange: string;
};

export type TennisAnalysisWithPreview = TennisAnalysis & {
  previewUrl?: string;
};
