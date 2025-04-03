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

// New types for detailed stroke analysis
export type ActionStage = 'preparation' | 'backswing' | 'contact' | 'follow_through';

export interface StageScore {
  name: ActionStage;
  label: string;
  score: number;
  maxScore: number;
}

export interface StrokeObservation {
  text: string;
  type: "positive" | "warning" | "negative";
}

export interface PhaseAnalysis {
  stageName: ActionStage;
  stageLabel: string;
  score: number;
  observations: StrokeObservation[];
  improvementSuggestion?: string;
}

export interface DetailedAnalysis {
  stageScores: StageScore[];
  phaseAnalyses: Record<ActionStage, PhaseAnalysis>;
  activeStage: ActionStage;
}
