import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Sphere } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// Programming language data with colors
const programmingLanguages = [
  { 
    name: 'JavaScript', 
    color: '#F7DF1E', 
    position: [0, 0, 0], 
    size: 1.2,
    logo: 'JS'
  },
  { 
    name: 'TypeScript', 
    color: '#3178C6', 
    position: [3, 1, -2], 
    size: 1.0,
    logo: 'TS'
  },
  { 
    name: 'React', 
    color: '#61DAFB', 
    position: [-3, -1, 1], 
    size: 1.1,
    logo: 'React'
  },
  { 
    name: 'Python', 
    color: '#3776AB', 
    position: [2, -2, 2], 
    size: 0.9,
    logo: 'PY'
  },
  { 
    name: 'Node.js', 
    color: '#339933', 
    position: [-2, 2, -1], 
    size: 0.8,
    logo: 'Node'
  },
  { 
    name: 'CSS', 
    color: '#1572B6', 
    position: [1, 3, 0], 
    size: 0.7,
    logo: 'CSS'
  },
  { 
    name: 'HTML', 
    color: '#E34F26', 
    position: [-1, -3, -2], 
    size: 0.6,
    logo: 'HTML'
  }
];

// Individual rotating planet component
const TechPlanet = ({ language, index }: { language: any, index: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const textRef = useRef<any>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Rotate the planet
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.x += 0.005;
      
      // Floating motion
      meshRef.current.position.y = language.position[1] + Math.sin(state.clock.elapsedTime + index) * 0.3;
    }
    
    if (textRef.current) {
      // Keep text facing camera
      textRef.current.lookAt(state.camera.position);
    }
  });

  return (
    <group position={language.position}>
      <Sphere
        ref={meshRef}
        args={[language.size, 32, 32]}
      >
        <meshStandardMaterial 
          color={language.color}
          roughness={0.1}
          metalness={0.8}
          emissive={language.color}
          emissiveIntensity={0.2}
        />
      </Sphere>
      
      {/* Logo text on planet */}
      <Text
        ref={textRef}
        position={[0, 0, language.size + 0.1]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
        // font="/fonts/JetBrainsMono-Bold.woff"
      >
        {language.logo}
      </Text>
      
      {/* Glow effect */}
      <Sphere args={[language.size * 1.1, 32, 32]}>
        <meshBasicMaterial 
          color={language.color}
          transparent
          opacity={0.1}
        />
      </Sphere>
    </group>
  );
};

// Main component
export const TechPlanets = () => {
  return (
    <motion.div 
      className="h-96 w-full relative rounded-lg overflow-hidden cyber-border"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)' }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff00ff" />
        
        {/* Render all tech planets */}
        {programmingLanguages.map((language, index) => (
          <TechPlanet key={language.name} language={language} index={index} />
        ))}
        
        {/* Controls */}
        <OrbitControls 
          enableZoom={true}
          enablePan={false}
          maxDistance={15}
          minDistance={5}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
      
      {/* Overlay info */}
      <div className="absolute bottom-4 left-4 text-white/80 text-sm font-mono">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          viewport={{ once: true }}
        >
          🌍 Interactive Tech Universe - Drag to explore!
        </motion.p>
      </div>
    </motion.div>
  );
};
