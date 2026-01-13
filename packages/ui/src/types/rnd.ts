export interface Layer {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string; //색상
  content?: string; //내부 글자
}

export interface CanvasState {
  scale: number;
  dx: number;
  dy: number;
}
