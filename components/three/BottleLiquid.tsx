import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import type { Shader } from 'three';
import * as THREE from 'three';

interface BottleLiquidProps {
  // Extensible for future props
}

export const BottleLiquid: React.FC<BottleLiquidProps> = () => {
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const uniforms = useRef({ uTime: { value: 0 } });

  useFrame((state) => {
    uniforms.current.uTime.value = state.clock.getElapsedTime();
  });

  const onBeforeCompile = useMemo(() => (shader: Shader) => {
    shader.uniforms.uTime = uniforms.current.uTime;
    shader.vertexShader = `
      uniform float uTime;
      ${shader.vertexShader}
    `;
    shader.vertexShader = shader.vertexShader.replace(
      '#include <begin_vertex>',
      `
      #include <begin_vertex>
      float surfaceThreshold = 1.35;
      if (position.y > surfaceThreshold) {
         float waveSpeed = 1.5;
         float waveFreq = 2.0;
         float waveAmp = 0.04;
         float wave = sin(position.x * waveFreq + uTime * waveSpeed) * waveAmp + 
                      cos(position.z * waveFreq * 0.8 + uTime * waveSpeed * 0.7) * waveAmp;
         transformed.y += wave;
      }
      `
    );
  }, []);

  return (
    <RoundedBox args={[2.3, 2.95, 1.0]} radius={0.12} smoothness={8} position={[0, 0, 0]}>
      <meshPhysicalMaterial 
        ref={materialRef}
        color="#9b4f1d" 
        transparent 
        opacity={0.6} 
        roughness={0.2} 
        metalness={0.1}
        onBeforeCompile={onBeforeCompile}
      />
    </RoundedBox>
  );
};

export default BottleLiquid;
