import React, { useRef, useMemo } from 'react';
import { useFrame, createPortal } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { PerfumeBottle } from './PerfumeBottle';
import { BottleSticker } from './BottleSticker';

interface BottleSceneProps {
  isHovered: boolean;
}

export const BottleScene: React.FC<BottleSceneProps> = ({ isHovered }) => {
  const bottleRef = useRef<THREE.Group>(null);
  const stickerScene = useMemo(() => new THREE.Scene(), []);

  useFrame(({ gl, scene, camera }) => {
    gl.autoClear = true;
    gl.render(scene, camera);
    
    gl.autoClear = false;
    gl.render(stickerScene, camera);
    
    gl.autoClear = true;
  }, 2);

  return (
    <>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <PerfumeBottle ref={bottleRef} isHovered={isHovered} />
      </Float>
      
      {createPortal(
        <BottleSticker parentRef={bottleRef} />, 
        stickerScene
      )}
    </>
  );
};

export default BottleScene;
