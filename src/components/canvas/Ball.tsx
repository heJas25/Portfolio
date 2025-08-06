import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Decal,
  Float,
  OrbitControls,
  Preload,
  useTexture,
} from "@react-three/drei";
import { Texture, Color } from "three";
import * as THREE from "three";

interface BallProps {
  imgUrl: string;
}

interface BallCanvasProps {
  icon: string;
}

const Ball: React.FC<BallProps> = (props) => {
  const [decal] = useTexture([props.imgUrl]) as [Texture];
  const meshRef = useRef<THREE.Mesh>(null);

  // Cyberpunk color animation using exact CSS colors
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      
      // Using exact colors from your CSS variables
      const primary = new Color().setHSL(315/360, 1, 0.65); // --primary: 315 100% 65%
      const secondary = new Color().setHSL(270/360, 0.85, 0.70); // --secondary: 270 85% 70%
      const accent = new Color().setHSL(180/360, 1, 0.70); // --accent: 180 100% 70%
      const neonGreen = new Color().setHSL(100/360, 1, 0.60); // --neon-green: 120 100% 60%
      const neonOrange = new Color().setHSL(30/360, 1, 0.60); // --neon-orange: 30 100% 60%
      const cyberBlue = new Color().setHSL(200/360, 1, 0.65); // --cyber-blue: 200 100% 65%
      
      // Create smooth color transitions
      const colorCycle = (time * 0.1) % 6; // Cycle through 6 colors
      let finalColor;
      
      if (colorCycle < 1) {
        finalColor = primary.clone().lerp(secondary, colorCycle);
      } else if (colorCycle < 2) {
        finalColor = secondary.clone().lerp(accent, colorCycle - 1);
      } else if (colorCycle < 3) {
        finalColor = accent.clone().lerp(cyberBlue, colorCycle - 2);
      } else if (colorCycle < 4) {
        finalColor = cyberBlue.clone().lerp(neonGreen, colorCycle - 3);
      } else if (colorCycle < 5) {
        finalColor = neonGreen.clone().lerp(neonOrange, colorCycle - 4);
      } else {
        finalColor = neonOrange.clone().lerp(primary, colorCycle - 5);
      }
      
      // Strong emissive for glow effect
      const emissiveIntensity = 0.5 + Math.sin(time * 2) * 0.2; // Subtle pulsing glow
      
      (meshRef.current.material as THREE.MeshStandardMaterial).color = finalColor;
      (meshRef.current.material as THREE.MeshStandardMaterial).emissive = finalColor.clone().multiplyScalar(emissiveIntensity);
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={1.5} floatIntensity={3}>
      <ambientLight intensity={0.2} />
      <directionalLight position={[0, 0, 0.05]} intensity={1.2} />
      {/* Multiple colored lights for dramatic effect */}
      <pointLight position={[10, 10, 10]} intensity={2} color="#ff0080" />
      <pointLight position={[-10, -10, -10]} intensity={1.5} color="#00ffff" />
      <pointLight position={[0, 10, -10]} intensity={1.8} color="#8000ff" />
      <pointLight position={[10, -10, 0]} intensity={1.6} color="#00ff80" />
      <mesh ref={meshRef} castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color='#ff0080'
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
          emissive='#ff0080'
          emissiveIntensity={0.4}
          metalness={0.7}
          roughness={0.3}
          transparent={false}
          opacity={1.0}
        />
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          scale={0.8}
          map={decal}
        />
      </mesh>
    </Float>
  );
};

const BallCanvas: React.FC<BallCanvasProps> = ({ icon }) => {
  return (
    <Canvas
      frameloop='demand'
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={null}>
        <OrbitControls enableZoom={false} />
        <Ball imgUrl={icon} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default BallCanvas;