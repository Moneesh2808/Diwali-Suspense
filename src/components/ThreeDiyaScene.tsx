import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface ThreeDiyaProps {
  intensity?: number;
  isHovered?: boolean;
}

const DiyaMesh: React.FC<ThreeDiyaProps> = ({ intensity = 1, isHovered = false }) => {
  const groupRef = useRef<THREE.Group>(null);
  const pointLightRef = useRef<THREE.PointLight>(null);
  const flameCoreRef = useRef<THREE.Mesh>(null);
  const flameOuterRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const flicker = Math.sin(t * 7.5) * 0.15 + Math.cos(t * 13.2) * 0.1;
    const currentIntensity = (1.8 + flicker) * intensity * (isHovered ? 1.4 : 1.0);

    if (pointLightRef.current) {
      pointLightRef.current.intensity = currentIntensity;
    }

    if (flameCoreRef.current && flameOuterRef.current) {
      const scaleY = 1 + flicker * 0.4 + (isHovered ? 0.2 : 0);
      flameCoreRef.current.scale.set(1, scaleY, 1);
      flameOuterRef.current.scale.set(1, scaleY, 1);
    }

    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.5) * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.7, 0]}>
      {/* Dynamic 3D Point Light for the Flame */}
      <pointLight
        ref={pointLightRef}
        position={[0, 1.3, 0]}
        color="#FFAA33"
        distance={8}
        decay={2}
      />

      {/* Flame Particles / Inner Cone */}
      <mesh ref={flameCoreRef} position={[0, 1.15, 0]}>
        <coneGeometry args={[0.15, 0.5, 16]} />
        <meshBasicMaterial color="#FFFFFF" />
      </mesh>

      {/* Flame Outer Glow Cone */}
      <mesh ref={flameOuterRef} position={[0, 1.12, 0]}>
        <coneGeometry args={[0.26, 0.65, 16]} />
        <meshStandardMaterial
          color="#FF6B1A"
          emissive="#FB8500"
          emissiveIntensity={1.8}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Crown Finial */}
      <mesh position={[0, 1.0, 0]}>
        <coneGeometry args={[0.12, 0.3, 16]} />
        <meshStandardMaterial color="#FFD166" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Agal - Top Oil Bowl */}
      <mesh position={[0, 0.72, 0]}>
        <sphereGeometry args={[0.82, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        <meshStandardMaterial
          color="#D4942A"
          metalness={0.9}
          roughness={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Golden Ghee Surface */}
      <mesh position={[0, 0.73, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.78, 32]} />
        <meshStandardMaterial
          color="#FFB703"
          emissive="#FB8500"
          emissiveIntensity={0.5}
          roughness={0.15}
        />
      </mesh>

      {/* Bowl Collar */}
      <mesh position={[0, 0.56, 0]}>
        <cylinderGeometry args={[0.35, 0.25, 0.18, 32]} />
        <meshStandardMaterial color="#E5A93C" metalness={0.92} roughness={0.18} />
      </mesh>

      {/* Kambam - Ornate Middle Stem with Decorative Bulbs */}
      <mesh position={[0, 0.38, 0]}>
        <sphereGeometry args={[0.32, 32, 16]} />
        <meshStandardMaterial color="#FFD700" metalness={0.95} roughness={0.15} />
      </mesh>

      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.18, 0.22, 0.45, 32]} />
        <meshStandardMaterial color="#C98A24" metalness={0.9} roughness={0.22} />
      </mesh>

      <mesh position={[0, -0.15, 0]}>
        <torusGeometry args={[0.34, 0.08, 16, 32]} />
        <meshStandardMaterial color="#FFD700" metalness={0.95} roughness={0.15} />
      </mesh>

      {/* Peedam - Stepped Pedestal Base */}
      <mesh position={[0, -0.32, 0]}>
        <cylinderGeometry args={[0.42, 0.65, 0.22, 32]} />
        <meshStandardMaterial color="#B37822" metalness={0.9} roughness={0.25} />
      </mesh>

      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.8, 1.15, 0.25, 32]} />
        <meshStandardMaterial color="#8A5A1C" metalness={0.88} roughness={0.28} />
      </mesh>
    </group>
  );
};

export const ThreeDiyaScene: React.FC<ThreeDiyaProps> = (props) => {
  return (
    <div className="w-full h-full min-h-[260px] pointer-events-none select-none">
      <Canvas
        camera={{ position: [0, 0.3, 3.2], fov: 42 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[3, 5, 4]} intensity={0.9} color="#FFF2A8" />
        <directionalLight position={[-3, 2, -2]} intensity={0.3} color="#FF7B90" />
        <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.2}>
          <DiyaMesh {...props} />
        </Float>
      </Canvas>
    </div>
  );
};
