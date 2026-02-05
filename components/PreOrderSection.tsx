import React, { useState, Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame, useLoader, createPortal } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Float, MeshTransmissionMaterial, RoundedBox } from '@react-three/drei';
import { Star, Leaf, Truck, Sparkles } from 'lucide-react';
import * as THREE from 'three';

// Generative SVG Logo
const svgLogo = `
<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
<g>
<path d="M 444.50 806.97 C434.13,804.79 431.49,803.86 412.63,795.83 C396.80,789.08 394.85,787.79 382.50,775.89 C377.55,771.12 368.88,763.74 363.23,759.48 C346.47,746.87 334.77,732.35 329.86,718.10 C326.71,708.94 327.39,706.88 334.00,705.50 C340.63,704.13 353.51,699.26 358.79,696.13 C361.71,694.41 364.33,693.00 364.62,693.00 C364.91,693.00 368.38,691.11 372.33,688.79 C388.95,679.04 397.38,675.53 409.00,673.49 C413.67,672.67 419.08,672.29 421.00,672.64 C425.65,673.48 433.11,677.28 440.63,682.64 C451.01,690.03 458.65,691.56 470.00,688.49 C484.63,684.54 497.97,685.94 511.71,692.86 C527.55,700.83 530.92,704.18 554.61,735.50 C560.84,743.72 572.96,762.99 573.66,765.78 C575.06,771.36 559.79,785.77 543.64,794.11 C524.73,803.87 510.03,807.26 495.74,805.15 C491.46,804.52 487.78,804.49 485.74,805.08 C480.58,806.57 463.08,809.01 458.07,808.93 C455.56,808.89 449.45,808.01 444.50,806.97 ZM 548.46 652.92 C537.89,651.68 517.43,643.45 509.03,637.06 C496.30,627.36 484.89,619.01 482.97,617.98 C481.22,617.05 479.44,617.06 474.86,618.03 C463.51,620.44 450.36,617.56 443.66,611.20 C437.35,605.21 434.60,597.78 433.37,583.50 C432.67,575.34 436.68,558.41 440.50,553.41 C443.77,549.12 452.04,543.64 457.54,542.11 C466.45,539.64 479.65,542.20 484.87,547.42 C488.01,550.56 487.19,552.43 481.52,555.10 C475.60,557.88 470.73,562.43 471.23,564.72 C471.45,565.70 472.26,566.31 473.06,566.08 C473.85,565.85 477.77,565.47 481.76,565.22 C493.54,564.50 498.77,567.95 516.50,588.07 C518.70,590.57 521.82,594.39 523.44,596.56 C534.27,611.08 544.73,620.10 556.01,624.66 C572.16,631.18 584.15,627.16 586.79,614.33 C587.37,611.54 587.67,595.80 587.51,577.00 C587.15,533.09 588.97,513.98 596.51,482.50 C597.83,477.00 599.84,467.70 600.99,461.84 C607.03,430.85 617.51,406.30 631.73,389.79 C633.80,387.39 637.08,383.46 639.00,381.06 C655.68,360.30 662.36,353.63 672.17,347.90 C688.62,338.29 719.36,326.47 737.50,322.78 C751.71,319.88 779.32,319.69 790.00,322.41 C804.90,326.19 810.27,329.58 812.09,336.32 C814.67,345.92 810.79,347.56 783.50,348.37 C758.50,349.12 741.32,351.84 721.00,358.26 C699.67,365.01 685.21,375.44 674.81,391.60 C671.41,396.88 663.00,413.62 663.00,415.10 C663.00,415.72 664.45,414.82 666.22,413.09 C680.98,398.65 705.35,391.34 727.98,394.56 C746.44,397.19 774.31,404.07 777.24,406.72 C779.55,408.81 779.44,412.88 777.00,416.00 C775.92,417.38 775.03,419.45 775.02,420.62 C775.01,421.78 774.09,423.88 772.98,425.29 C769.71,429.45 764.99,430.45 751.00,429.95 C721.97,428.91 707.01,429.45 698.54,431.85 C683.21,436.20 673.52,443.12 662.94,457.30 C648.69,476.39 639.07,503.90 636.99,531.50 C636.45,538.65 635.55,549.45 634.98,555.50 C634.42,561.55 633.52,574.15 632.99,583.50 C631.60,607.74 630.57,612.97 625.01,623.98 C613.71,646.37 585.07,657.20 548.46,652.92 ZM 396.50 408.92 C383.21,406.74 370.15,403.95 364.00,401.97 C353.02,398.45 330.17,386.78 316.50,377.72 C296.54,364.49 294.51,363.02 264.84,340.37 C256.39,333.91 242.00,318.71 242.00,316.23 C242.00,314.59 252.22,307.34 256.50,305.94 C258.70,305.22 263.42,304.65 267.00,304.68 C273.48,304.73 274.49,305.04 287.66,311.07 C291.27,312.73 297.21,314.77 300.86,315.62 C321.06,320.28 344.04,327.19 355.50,332.03 C374.20,339.93 385.33,342.58 414.00,345.97 C434.95,348.45 449.35,350.45 465.50,353.12 C492.98,357.65 495.46,359.02 507.79,376.47 C510.25,379.95 511.57,385.83 510.29,387.57 C509.85,388.16 506.45,390.96 502.71,393.80 C493.70,400.66 489.57,401.81 460.50,405.50 C454.45,406.27 447.16,407.35 444.31,407.91 C436.81,409.38 403.55,410.08 396.50,408.92 ZM 574.50 326.66 C570.16,325.24 564.40,321.82 557.57,316.61 C555.18,314.78 543.28,308.27 531.12,302.13 C506.68,289.78 495.79,283.48 473.50,268.73 C453.39,255.43 439.92,248.12 425.49,242.68 C394.85,231.14 372.47,228.47 337.08,232.14 C316.49,234.28 306.79,233.44 293.50,228.37 C287.62,226.13 268.03,212.75 268.07,211.00 C268.11,209.47 277.52,201.21 283.30,197.64 C285.06,196.55 289.97,193.96 294.20,191.87 C301.21,188.42 306.48,186.70 327.50,181.00 C334.82,179.02 350.73,176.71 351.94,177.46 C352.32,177.70 358.37,177.46 365.37,176.93 C377.03,176.05 379.28,176.18 392.30,178.47 C400.11,179.85 408.30,181.46 410.50,182.05 C412.70,182.64 416.30,183.52 418.50,184.00 C426.02,185.65 436.50,189.14 444.00,192.51 C448.12,194.36 455.60,197.65 460.62,199.82 C471.97,204.74 478.51,208.92 487.63,217.10 C491.55,220.62 500.69,227.32 507.95,232.00 C523.41,241.97 536.69,251.77 543.00,257.86 C545.47,260.25 549.30,263.39 551.50,264.84 C553.70,266.29 555.72,267.71 556.00,268.00 C558.25,270.32 564.78,274.33 570.55,276.95 C577.35,280.03 582.99,284.33 583.01,286.44 C583.02,287.02 584.57,289.01 586.47,290.85 C595.82,299.93 597.59,315.84 590.17,324.14 C586.93,327.77 580.86,328.74 574.50,326.66 Z" fill="rgba(0,0,0,1)"/>
</g>
</svg>
`.trim();

const LOGO_URL = `data:image/svg+xml;base64,${typeof window !== 'undefined' ? window.btoa(svgLogo) : ''}`;

const Liquid = () => {
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const uniforms = useRef({ uTime: { value: 0 } });

  useFrame((state) => {
    uniforms.current.uTime.value = state.clock.getElapsedTime();
  });

  const onBeforeCompile = useMemo(() => (shader: any) => {
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

// Isolated Sticker Component
// This component renders into a separate scene but manually syncs its position to the parent.
const Sticker = ({ parentRef }: { parentRef: React.RefObject<THREE.Group> }) => {
  const texture = useLoader(THREE.TextureLoader, LOGO_URL);
  texture.anisotropy = 16;
  const group = useRef<THREE.Group>(null);

  // PRIORITY 1: Ensure this runs AFTER the bottle animation (Priority 0) but BEFORE the render loop (Priority 2)
  // We use direct Matrix Copying to avoid decomposition errors or drift, preventing the "tilting" artifact.
  useFrame(() => {
    if (parentRef.current && group.current) {
      // Force update the parent's world matrix to ensure we get the latest animation state
      parentRef.current.updateWorldMatrix(true, false);
      
      // DIRECT MATRIX COPY:
      // Instead of decomposing position/rotation/scale, we copy the entire matrix.
      // This is faster and eliminates floating point errors that cause the sticker to "tilt" 
      // or drift during rapid scaling.
      group.current.matrix.copy(parentRef.current.matrixWorld);
    }
  }, 1);
  
  // matrixAutoUpdate={false} is critical here. It prevents Three.js from overwriting 
  // our manual matrix copy with calculations from local position/rotation/scale.
  return (
    <group ref={group} matrixAutoUpdate={false}>
      {/* 
        Increased Z offset to 0.65 to provide a safer physical margin. 
        Bottle surface is approx at Z=0.6.
      */}
      <group position={[0, 0, 0.65]}>
        <mesh>
          <circleGeometry args={[0.85, 64]} />
          <meshBasicMaterial 
              color="#F5F5DC" 
              side={THREE.FrontSide}
              depthWrite={false} 
              polygonOffset
              polygonOffsetFactor={-4} // High priority to force it visually in front
          />
        </mesh>
        <mesh position={[0, 0, 0.001]}>
          <planeGeometry args={[1.3, 1.3]} />
          <meshBasicMaterial 
              map={texture} 
              transparent 
              opacity={0.95} 
              side={THREE.FrontSide}
              depthWrite={false}
              toneMapped={false} 
              polygonOffset
              polygonOffsetFactor={-5} // Even higher priority for the text/logo
          />
        </mesh>
      </group>
    </group>
  );
};

const PerfumeBottle = React.forwardRef<THREE.Group, { isHovered: boolean }>(({ isHovered }, ref) => {
  // Priority 0 (Default): Animation runs first
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
      {/* Bottle Body - Reduced height from 3.5 to 3.2 */}
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

      <Liquid />
      
      {/* Neck - Lowered to match new bottle height (1.7) */}
      <mesh position={[0, 1.7, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.5]} />
        <meshStandardMaterial color="#D4AF37" roughness={0.4} metalness={0.8} />
      </mesh>

      {/* Cap - Lowered to match new bottle height (2.05) */}
      <mesh position={[0, 2.05, 0]}>
        <cylinderGeometry args={[0.35, 0.35, 0.4]} />
        <meshStandardMaterial color="#D4AF37" roughness={0.6} metalness={0.6} />
      </mesh>
    </group>
  );
});

// Scene Composer Component
const Scene = ({ isHovered }: { isHovered: boolean }) => {
    const bottleRef = useRef<THREE.Group>(null);
    const stickerScene = useMemo(() => new THREE.Scene(), []);

    // STRICT RENDER PIPELINE - PRIORITY 2
    // Must run last, after animation (0) and sticker sync (1).
    useFrame(({ gl, scene, camera }) => {
        // 1. Clear the screen for the new frame
        gl.autoClear = true;
        gl.render(scene, camera);
        
        // 2. Disable autoClear so the next render adds to the existing buffer
        gl.autoClear = false;
        
        // 3. Render the isolated sticker scene
        // We do NOT clear depth here. This ensures that if the bottle rotates and the sticker
        // is physically behind the bottle, the depth test will fail and the sticker will be hidden.
        gl.render(stickerScene, camera);
        
        // 4. Reset autoClear for safety for the next frame or other render passes
        gl.autoClear = true;
    }, 2);

    return (
        <>
            <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                {/* Main Scene: Bottle */}
                <PerfumeBottle ref={bottleRef} isHovered={isHovered} />
            </Float>
            
            {/* Overlay Scene: Sticker (Portaled) */}
            {createPortal(
                <Sticker parentRef={bottleRef} />, 
                stickerScene
            )}
        </>
    );
}

const PreOrderSection: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="py-12 lg:py-24 px-4 md:px-12 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-24 min-h-[90svh]">
      <div 
        className="relative w-[85%] md:w-[70%] lg:w-1/2 h-[350px] lg:h-[700px] order-1 lg:order-1 outline-none focus:outline-none"
        style={{ WebkitTapHighlightColor: 'transparent' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute inset-0 z-10">
          <Canvas shadows camera={{ position: [0, 0, 10], fov: 40 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
              <pointLight position={[-10, -10, -10]} intensity={0.5} />
              <pointLight position={[0, 0, 5]} intensity={0.5} color="#FFD700" />
              
              <Scene isHovered={isHovered} />
              
              <ContactShadows position={[0, -3.5, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
              <Environment preset="city" />
              <OrbitControls 
                enableZoom={false} 
                enablePan={false}
                minPolarAngle={Math.PI / 3}
                maxPolarAngle={Math.PI / 1.5}
              />
            </Suspense>
          </Canvas>
        </div>
      </div>

      <div className="w-full lg:w-1/2 order-2 lg:order-2 space-y-6 lg:space-y-8">
        <div className="space-y-3 lg:space-y-4">
          <div className="flex items-center space-x-2">
            <div className="flex text-rose-300">
              {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
            </div>
            <span className="text-white/40 text-xs font-medium uppercase tracking-widest">5-Star User Rating!</span>
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-serif text-white tracking-tight leading-tight italic">
            Love “Le Nouveau” <br />
            <span className="not-italic opacity-80 text-3xl lg:text-5xl">
              Eau De Parfum
            </span>{" "}
            <span className="text-sm lg:text-lg italic opacity-70 block lg:inline mt-1 lg:mt-0">
              50ml 1.7oz
            </span>
          </h2>
          
          <div className="flex items-baseline space-x-3 lg:space-x-4">
            <span className="text-3xl lg:text-4xl font-light text-rose-100">$185.00</span>
            <span className="text-white/30 line-through text-base lg:text-lg font-light">$220.00</span>
            <span className="bg-rose-900/40 text-rose-200 text-[9px] lg:text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest">Early Access</span>
          </div>
        </div>

        <div className="space-y-4 text-white/70 font-light leading-relaxed text-sm lg:text-base">
            <p>
            Housed in French glass and crowned with carved travertine stone. This fragrance is a natural and organic blend of bright citrus and sun-kissed bergamot melting into a velvety sweetness of maple and vanilla.
            </p>
            <p className="hidden sm:block">
            Soft whispers of lavender and rose drift through each breath, wrapping you in warmth of serenity.
            </p>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-3 gap-2 sm:gap-6 py-4 lg:py-6 border-y border-white/10">
          <div className="flex flex-col items-center sm:items-start space-y-1 sm:space-y-2">
            <Leaf className="w-4 h-4 sm:w-5 sm:h-5 text-rose-200" />
            <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-white/80 font-bold text-center sm:text-left">Organic</span>
            <span className="text-[10px] text-white/40 text-center sm:text-left">Natural Ingredients</span>
          </div>
          <div className="flex flex-col items-center sm:items-start space-y-1 sm:space-y-2">
            <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-rose-200" />
            <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-white/80 font-bold text-center sm:text-left">Priority</span>
            <span className="text-[10px] text-white/40 text-center sm:text-left">Fast Delivery</span>
          </div>
          <div className="flex flex-col items-center sm:items-start space-y-1 sm:space-y-2">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-rose-200" />
            <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-white/80 font-bold text-center sm:text-left">EXCLUSIVE</span>
            <span className="text-[10px] text-white/40 text-center sm:text-left">Limited pre-orders</span>
          </div>
        </div>

        <div className="space-y-4">
          <button 
            className="w-full py-4 lg:py-5 bg-white text-black font-bold uppercase tracking-[0.2em] text-xs hover:bg-rose-100 transition-all rounded-full shadow-2xl shadow-white/5 active:scale-95"
            onClick={() => window.open('https://your-shopify-store.myshopify.com/cart/add?id=YOUR_VARIANT_ID&quantity=1', '_blank')}
          >
            Pre-Order Now — $185
          </button>
          <p className="text-center text-[9px] lg:text-[10px] text-white/30 uppercase tracking-[0.2em]">
            Secure checkout powered by <span className="text-white/60 font-bold">Shopify</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PreOrderSection;