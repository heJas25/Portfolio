import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const FloatingObject = ({ position, color }: { position: [number, number, number], color: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.3;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[1, 1, 1]} />
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.8}
          distort={0.3}
          speed={2}
          roughness={0}
        />
      </mesh>
    </Float>
  );
};

const HolographicSphere = () => {
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere args={[2, 32, 32]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#ff69b4"
          transparent
          opacity={0.3}
          distort={0.5}
          speed={3}
          wireframe
        />
      </Sphere>
    </Float>
  );
};

export const Scene3D = () => {
  return (
    <div className="absolute inset-0 z-10">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#ff69b4" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#40e0d0" />
        
        <HolographicSphere />
        
        <FloatingObject position={[-3, 2, 0]} color="#8a2be2" />
        <FloatingObject position={[3, -2, 0]} color="#40e0d0" />
        <FloatingObject position={[0, 3, -2]} color="#ff69b4" />
        <FloatingObject position={[-2, -3, 2]} color="#00ff7f" />
        
        <OrbitControls 
          enableZoom={false} 
          autoRotate 
          autoRotateSpeed={0.5}
          enablePan={false}
          maxPolarAngle={Math.PI * 0.75}
          minPolarAngle={Math.PI * 0.25}
        />
      </Canvas>
    </div>
  );
};