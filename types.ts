export enum ToolType {
  BRUSH = 'BRUSH',
  ERASER = 'ERASER'
}

export enum BrushStyle {
  PENCIL = 'PENCIL',
  MARKER = 'MARKER',
  SPRAY = 'SPRAY',
  NEON = 'NEON',
  WATERCOLOR = 'WATERCOLOR'
}

export interface Point {
  x: number;
  y: number;
}

export interface DrawingAction {
  tool: ToolType;
  color: string;
  size: number;
  points: Point[];
}

export interface InspirationResponse {
  prompt: string;
}