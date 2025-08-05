import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

// Programming language data with neo-pastel colors and real logos
const programmingLanguages = [
  { 
    name: 'JavaScript', 
    color: '#FFE5B4',
    position: [-6, 0, 0], 
    size: 1.0,
    logoUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgdmlld0JveD0iMCAwIDI1NiAyNTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiBmaWxsPSIjRjdERjFFIi8+CjxwYXRoIGQ9Ik0yMTYuOTUgMTYzLjRjLTAuOCAxNC40LTYuNCAyNi4zLTE5LjEgMzEuNy0xMC4yIDQuNS0yMS4zIDMuMS0zMC42LTMuNi0xLjItMC44LTIuMy0xLjctMy40LTIuNi02LjQtNS4yLTEzLjQtOS4yLTIxLjItMTEuOC05LjEtMy4xLTE4LjYtNC4yLTI4LTMuMi05LjcgMS4yLTE5IDQuNi0yNy4zIDEwLjYtOC4zIDYtMTQuNyAxNC41LTE4LjIgMjQuM2MtMS4yIDMuMi0yLjEgNi41LTIuNSA5LjltODAuNC02NC4zYzMuOS0yMC43IDIyLjctMzQuNiA0My45LTMyLjMgMjEuMiAyLjMgMzcuNiAyMC4yIDM4LjEgNDEuOWMwLjUgMjEuNy0xNS4yIDQwLjYtMzYuOCA0Mi45LTIxLjYgMi4zLTQxLjYtMTIuOC00Ni44LTM0LjMtNS4yLTIxLjUgMS45LTQ0LjYgMjEuNi01Ni4ybTI1IDE4LjVjMCAyLjEtMS43IDMuOC0zLjggMy44cy0zLjgtMS43LTMuOC0zLjggMS43LTMuOCAzLjgtMy44IDMuOCAxLjcgMy44IDMuOCIgZmlsbD0iIzJBMkEyQSIvPgo8L3N2Zz4='
  },
  { 
    name: 'TypeScript', 
    color: '#E5D4FF',
    position: [-4.5, 0, 0], 
    size: 1.0,
    logoUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgdmlld0JveD0iMCAwIDI1NiAyNTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiBmaWxsPSIjMzE3OEM2Ii8+CjxwYXRoIGQ9Ik0xNDguNCA5MC44aDI3LjJ2MTQuNGgtNDEuNlY3Ni40aDQxLjZ2MTQuNGgtMjcuMnYyMC44aDI3LjJ2MTQuNGgtNDEuNlYxMDVoNDEuNnYtMTQuMmgtMjcuMlY5MC44em04MC44IDUzLjZ2LTE0LjRoLTI3LjJ2LTIwLjhoMjcuMlY5NC44aC00MS42djE0LjRoMjcuMnYyMC44aC0yNy4ydjE0LjRoNDEuNnoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0xMDguOCAxNDAuOGgtMTQuNFY5MC44aC00MS42djE0LjRoMjcuMnYzNS42SDY2LjRWMTA1SDk0LjR2MzUuOEg4MEwxMDguOCAxNDAuOHoiIGZpbGw9IndoaXRlIi8+Cjx0ZXh0IHg9IjEyOCIgeT0iMTgwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iNjQiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+VFM8L3RleHQ+Cjwvc3ZnPgo='
  },
  { 
    name: 'React', 
    color: '#B4E5FF',
    position: [-2, 0, 0], 
    size: 1.0,
    logoUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgdmlld0JveD0iMCAwIDI1NiAyNTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjEyOCIgY3k9IjEyOCIgcj0iMjAiIGZpbGw9IiM2MURBRkIiLz4KPGVsbGlwc2UgY3g9IjEyOCIgY3k9IjEyOCIgcng9IjgwIiByeT0iMzAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzYxREFGQiIgc3Ryb2tlLXdpZHRoPSI0Ii8+CjxlbGxpcHNlIGN4PSIxMjgiIGN5PSIxMjgiIHJ4PSI4MCIgcnk9IjMwIiBmaWxsPSJub25lIiBzdHJva2U9IiM2MURBRkIiIHN0cm9rZS13aWR0aD0iNCIgdHJhbnNmb3JtPSJyb3RhdGUoNjAgMTI4IDEyOCkiLz4KPGVsbGlwc2UgY3g9IjEyOCIgY3k9IjEyOCIgcng9IjgwIiByeT0iMzAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzYxREFGQiIgc3Ryb2tlLXdpZHRoPSI0IiB0cmFuc2Zvcm09InJvdGF0ZSgxMjAgMTI4IDEyOCkiLz4KPC9zdmc+'
  },
  { 
    name: 'Python', 
    color: '#D4FFB4',
    position: [0, 0, 0], 
    size: 1.0,
    logoUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgdmlld0JveD0iMCAwIDI1NiAyNTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xMjggMGMzNS40IDAgNjQgMjguNiA2NCA2NHYzMmMwIDM1LjQtMjguNiA2NC02NCA2NEg2NGMtMzUuNCAwLTY0LTI4LjYtNjQtNjR2LTMyQzAgMjguNiAyOC42IDAgNjQgMGg2NGxtMCA5NmMxNy43IDAgMzItMTQuMyAzMi0zMlMxNDUuNyAzMiAxMjggMzJzLTMyIDE0LjMtMzIgMzIgMTQuMyAzMiAzMiAzMiIgZmlsbD0iIzM3NzZBQiIvPgo8cGF0aCBkPSJNMTI4IDI1NmMtMzUuNCAwLTY0LTI4LjYtNjQtNjR2LTMyYzAtMzUuNCAyOC42LTY0IDY0LTY0aDY0YzM1LjQgMCA2NCAyOC42IDY0IDY0djMyYzAgMzUuNC0yOC42IDY0LTY0IDY0aC02NGwwLTk2Yy0xNy43IDAtMzIgMTQuMy0zMiAzMnMxNC4zIDMyIDMyIDMyIDMyLTE0LjMgMzItMzItMTQuMy0zMi0zMi0zMiIgZmlsbD0iI0ZGRDQzQiIvPgo8L3N2Zz4='
  },
  { 
    name: 'Node.js', 
    color: '#FFCCE5',
    position: [2, 0, 0], 
    size: 1.0,
    logoUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgdmlld0JveD0iMCAwIDI1NiAyNTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xMjggMGw0OCAyOHY1NmwtNDggMjgtNDgtMjhWMjhsMjghMTYgMjAtMTJMMTI4IDB6bTQwIDIwMGwtNDAgMjQtNDAtMjQgNDAtMjR6bTQwLTEwMGwyNCAzOC00OCAyOGgtNDhsLTQ4LTI4IDI0LTM4IDQ4IDI4aDEybDI0LTE0IDI0IDE0aDEybDQ4LTI4IiBmaWxsPSIjMzM5OTMzIi8+Cjwvc3ZnPgo='
  },
  { 
    name: 'CSS', 
    color: '#FFE0CC',
    position: [4, 0, 0], 
    size: 1.0,
    logoUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgdmlld0JveD0iMCAwIDI1NiAyNTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0yNTYgMjU2SDBMMzIgMGgxOTJsMzIgMjU2em0tNTYtNTZsLTcyLTIwLTcyIDIwTDQ0IDQ0aDE2OGwxMiAxNTZaIiBmaWxsPSIjMTU3MkI2Ii8+CjxwYXRoIGQ9Im0xMjggMTgwIDM2LTEwIDgtMTAwSDEyOHYtMjBoNjhsLTEyIDE1MC00NCAyMFYxODBaIiBmaWxsPSIjMzNBOURDIi8+CjxwYXRoIGQ9Im0xMjggMTgwLTM2LTEwLTgtMTAwaDM2VjUwSDUybDEyIDE1MCA0NCAyMFYxODBaIiBmaWxsPSIjZmZmIi8+Cjwvc3ZnPgo='
  },
  { 
    name: 'HTML', 
    color: '#CCFFFF',
    position: [6, 0, 0], 
    size: 1.0,
    logoUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgdmlld0JveD0iMCAwIDI1NiAyNTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0yNTYgMjU2SDBMMzIgMGgxOTJsMzIgMjU2em0tNTYtNTZsLTcyLTIwLTcyIDIwTDQ0IDQ0aDE2OGwxMiAxNTZaIiBmaWxsPSIjRTM0RjI2Ii8+CjxwYXRoIGQ9Im0xMjggMTgwIDM2LTEwIDgtMTAwSDEyOHYtMjBoNjhsLTEyIDE1MC00NCAyMFYxODBaIiBmaWxsPSIjRUY2NTJBIi8+CjxwYXRoIGQ9Im0xMjggMTgwLTM2LTEwLTgtMTAwaDM2VjUwSDUybDEyIDE1MCA0NCAyMFYxODBaIiBmaWxsPSIjZmZmIi8+Cjwvc3ZnPgo='
  }
];

const TechPlanets = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const orbsRef = useRef([]);
  const spritesRef = useRef([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(50, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 8);
    cameraRef.current = camera;

    // Renderer setup with transparency
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;

    mountRef.current.appendChild(renderer.domElement);

    // Soft ambient lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);
    
    // Directional light for depth
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Create texture loader
    const textureLoader = new THREE.TextureLoader();

    // Create noise texture for orbs
    const createNoiseTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const context = canvas.getContext('2d');
      
      const imageData = context.createImageData(512, 512);
      const data = imageData.data;
      
      for (let i = 0; i < data.length; i += 4) {
        const noise = Math.random() * 100 + 155;
        data[i] = noise;     // red
        data[i + 1] = noise; // green
        data[i + 2] = noise; // blue
        data[i + 3] = 50;    // alpha
      }
      
      context.putImageData(imageData, 0, 0);
      return new THREE.CanvasTexture(canvas);
    };

    const noiseTexture = createNoiseTexture();

    // Create orbs in a horizontal line
    programmingLanguages.forEach((language, index) => {
      // Main orb with texture
      const geometry = new THREE.SphereGeometry(language.size, 64, 64);
      
      // Create custom material with texture and transparency
      const material = new THREE.MeshPhongMaterial({
        color: language.color,
        shininess: 100,
        transparent: true,
        opacity: 0.85,
        map: noiseTexture,
        emissive: language.color,
        emissiveIntensity: 0.1
      });
      
      const orb = new THREE.Mesh(geometry, material);
      orb.position.set(...language.position);
      orb.userData = {
        originalPosition: [...language.position],
        index: index,
        language: language
      };
      
      scene.add(orb);
      orbsRef.current.push(orb);

      // Create logo sprite
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = 256;
      canvas.height = 256;
      
      // Clear canvas with transparent background
      context.clearRect(0, 0, 256, 256);
      
      // Create simple logo representation
      context.fillStyle = '#2D1B69';
      context.font = 'bold 48px Arial, sans-serif';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      
      // Draw different logos based on language
      switch(language.name) {
        case 'JavaScript':
          context.fillText('JS', 128, 128);
          break;
        case 'TypeScript':
          context.fillStyle = '#3178C6';
          context.fillText('TS', 128, 128);
          break;
        case 'React':
          context.fillStyle = '#61DAFB';
          context.beginPath();
          context.arc(128, 128, 40, 0, Math.PI * 2);
          context.stroke();
          context.strokeStyle = '#61DAFB';
          context.lineWidth = 4;
          context.beginPath();
          context.ellipse(128, 128, 60, 20, 0, 0, Math.PI * 2);
          context.stroke();
          context.beginPath();
          context.ellipse(128, 128, 60, 20, Math.PI * 2/3, 0, Math.PI * 2);
          context.stroke();
          context.beginPath();
          context.ellipse(128, 128, 60, 20, Math.PI * 4/3, 0, Math.PI * 2);
          context.stroke();
          break;
        case 'Python':
          context.fillStyle = '#3776AB';
          context.fillText('Py', 128, 128);
          break;
        case 'Node.js':
          context.fillStyle = '#339933';
          context.fillText('⬢', 128, 128);
          break;
        case 'CSS':
          context.fillStyle = '#1572B6';
          context.fillText('CSS', 128, 128);
          break;
        case 'HTML':
          context.fillStyle = '#E34F26';
          context.fillText('HTML', 128, 100);
          context.font = 'bold 24px Arial, sans-serif';
          context.fillText('5', 128, 150);
          break;
      }
      
      const texture = new THREE.CanvasTexture(canvas);
      const spriteMaterial = new THREE.SpriteMaterial({ 
        map: texture,
        transparent: true,
        alphaTest: 0.1
      });
      
      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.position.set(language.position[0], language.position[1], language.position[2] + 0.1);
      sprite.scale.set(1.2, 1.2, 1);
      scene.add(sprite);
      spritesRef.current.push(sprite);

      // Add subtle glow ring
      const ringGeometry = new THREE.RingGeometry(language.size * 1.1, language.size * 1.15, 32);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: language.color,
        transparent: true,
        opacity: 0.2,
        side: THREE.DoubleSide
      });
      
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.position.copy(orb.position);
      ring.rotation.x = Math.PI / 2;
      scene.add(ring);
    });

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationY = 0;
    let currentRotationY = 0;

    const handleMouseMove = (event) => {
      const rect = mountRef.current.getBoundingClientRect();
      mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      
      // Subtle rotation based on mouse position
      targetRotationY = mouseX * 0.1;
    };

    const handleWheel = (event) => {
      camera.position.z += event.deltaY * 0.01;
      camera.position.z = Math.max(5, Math.min(12, camera.position.z));
    };

    mountRef.current.addEventListener('mousemove', handleMouseMove);
    mountRef.current.addEventListener('wheel', handleWheel);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      const time = Date.now() * 0.001;
      
      // Smooth rotation interpolation
      currentRotationY += (targetRotationY - currentRotationY) * 0.02;
      scene.rotation.y = currentRotationY;
      
      // Update orbs with subtle floating motion
      orbsRef.current.forEach((orb, index) => {
        // Gentle rotation
        orb.rotation.y += 0.005;
        orb.rotation.x += 0.003;
        
        // Subtle floating
        orb.position.y = orb.userData.originalPosition[1] + Math.sin(time + index * 0.5) * 0.1;
        
        // Breathing effect
        const breathe = 1 + Math.sin(time * 2 + index * 0.3) * 0.05;
        orb.scale.setScalar(breathe);
      });
      
      // Update sprites to stay with orbs
      spritesRef.current.forEach((sprite, index) => {
        const orb = orbsRef.current[index];
        if (orb) {
          sprite.position.copy(orb.position);
          sprite.position.z += 0.1;
        }
      });
      
      renderer.render(scene, camera);
    };

    animate();
    setIsLoaded(true);

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return;
      
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      mountRef.current?.removeEventListener('mousemove', handleMouseMove);
      mountRef.current?.removeEventListener('wheel', handleWheel);
      window.removeEventListener('resize', handleResize);
      
      orbsRef.current.forEach(orb => {
        orb.geometry.dispose();
        orb.material.dispose();
      });
      
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-96 rounded-3xl overflow-hidden shadow-2xl shadow-purple-200/30 border border-purple-100/50">
      <div 
        ref={mountRef} 
        className="w-full h-full cursor-grab active:cursor-grabbing"
        style={{ 
          transition: 'opacity 1s ease-in-out',
          opacity: isLoaded ? 1 : 0
        }} 
      />
      
      {/* Elegant info overlay */}
      <div className="absolute bottom-6 left-6 text-purple-600/80 text-sm font-light">
        <p className="flex items-center space-x-2">
          <span className="text-pink-400">✨</span>
          <span>My Technical Skills</span>
        </p>
      </div>
      
      {/* Skills legend */}
      <div className="absolute top-6 right-6 bg-white/80 backdrop-blur-md rounded-2xl p-4 text-purple-800 text-xs font-medium max-w-xs border border-white/50">
        <h3 className="text-purple-600 font-semibold mb-3 flex items-center">
          <span className="mr-2">💫</span>
          Tech Stack
        </h3>
        <div className="space-y-1">
          {programmingLanguages.map((lang) => (
            <div key={lang.name} className="flex items-center space-x-3 p-2 rounded-lg bg-white/50 hover:bg-white/80 transition-all duration-300">
              <div 
                className="w-3 h-3 rounded-full shadow-sm border border-white/50" 
                style={{ backgroundColor: lang.color }}
              ></div>
              <span className="text-xs font-medium">{lang.name}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Loading screen */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-50/90 to-pink-50/90 backdrop-blur-sm">
          <div className="text-center">
            <div className="text-purple-400 font-light text-xl mb-4 animate-pulse">
              ✨ Loading skills...
            </div>
            <div className="flex space-x-1 justify-center">
              <div className="w-2 h-2 bg-purple-300 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-pink-300 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-blue-300 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TechPlanets;