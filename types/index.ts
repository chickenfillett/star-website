export interface Particle {
  id: number;
  x: number;
  y: number;
  angle: number;
  distance: number;
  size: number;
  color: string;
  delay: number;
  shape: 'circle' | 'star' | 'diamond';
  rotation: number;
}
