export interface Position {
  id: string;
  title: string;
  description: string;
  location: string;
  salary: number;
}

export interface AnalysisResult {
  positionId: string;
  score: number;
  insights: string[];
}

export type PositionList = Position[];