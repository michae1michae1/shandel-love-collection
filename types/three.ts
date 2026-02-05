import type { Shader } from 'three';
import type * as THREE from 'three';

export interface BottleLiquidProps {
  // Currently no props needed, but interface exists for future extensibility
}

export interface BottleStickerProps {
  parentRef: React.RefObject<THREE.Group>;
}

export interface PerfumeBottleProps {
  isHovered: boolean;
}

export interface BottleSceneProps {
  isHovered: boolean;
}

export type ShaderCompileCallback = (shader: Shader) => void;
