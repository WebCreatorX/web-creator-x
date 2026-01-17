export interface Layer {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  content?: string;
}

export interface CanvasState {
  scale: number;
  dx: number;
  dy: number;
}
