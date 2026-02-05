import React from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { BottleLiquid } from './BottleLiquid';

interface PerfumeBottleProps {
  isHovered: boolean;
}

export const PerfumeBottle = React.forwardRef<THREE.Group, PerfumeBottleProps>(
  ({ isHovered }, ref) => {
    useFrame((state, delta) => {
      if (ref && 'current' in ref && ref.current) {
        const targetScale = isHovered ? 1.1 : 1.0;
        const currentScale = ref.current.scale.x;
        const newScale = THREE.MathUtils.lerp(currentScale, targetScale, delta * 4);
        ref.current.scale.setScalar(newScale);
      }
    });

    return (
      <group ref={ref} rotation={[0, -Math.PI / 4, 0]}>
        {/* Bottle Body */}
        <RoundedBox 
          args={[2.5, 3.2, 1.2]} 
          radius={0.15} 
          smoothness={8} 
          position={[0, 0, 0]} 
          castShadow
          receiveShadow
        >
          <MeshTransmissionMaterial 
            backside={true}
            samples={16} 
            thickness={0.5} 
            chromaticAberration={0.06} 
            anisotropy={0.1} 
            distortion={0.1} 
            distortionScale={0.1} 
            temporalDistortion={0} 
            clearcoat={1} 
            attenuationDistance={0.5} 
            attenuationColor="#ffffff" 
            color="#ffffff"
            roughness={0}
          />
        </RoundedBox>

        <BottleLiquid />
        
        {/* Neck */}
        <mesh position={[0, 1.7, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 0.5]} />
          <meshStandardMaterial color="#D4AF37" roughness={0.4} metalness={0.8} />
        </mesh>

        {/* Cap */}
        <mesh position={[0, 2.05, 0]}>
          <cylinderGeometry args={[0.35, 0.35, 0.4]} />
          <meshStandardMaterial color="#D4AF37" roughness={0.6} metalness={0.6} />
        </mesh>
      </group>
    );
  }
);

PerfumeBottle.displayName = 'PerfumeBottle';

export default PerfumeBottle;
