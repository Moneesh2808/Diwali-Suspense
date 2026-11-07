export type SceneState = 'LANDING' | 'FIREWORKS' | 'DIWALI_MESSAGE' | 'KISS_SURPRISE';

export interface FireworkParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  size: number;
  decay: number;
  flicker: boolean;
  trail: { x: number; y: number; alpha: number }[];
  gravity?: number;
  drag?: number;
}

export interface FireworkRocket {
  x: number;
  y: number;
  targetY: number;
  vx: number;
  vy: number;
  color: string;
  secondaryColor?: string;
  trail: { x: number; y: number }[];
  isExploded: boolean;
  type: 'peony' | 'willow' | 'heart' | 'ring' | 'chrysanthemum' | 'kiss';
  sparkleCount: number;
}

export interface FloatingSpark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  maxAlpha: number;
  color: string;
  shape: 'circle' | 'heart';
  life: number;
  maxLife: number;
  rotation: number;
  vRot: number;
}
