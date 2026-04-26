'use client';

import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  ContactShadows,
  Environment,
  OrbitControls,
  PerspectiveCamera,
  useGLTF,
} from '@react-three/drei';
import * as THREE from 'three';

interface CarViewerProps {
  modelPath: string;
  color?: string;
  autoRotate?: boolean;
}

interface CarModelProps {
  modelPath: string;
  color: string;
  autoRotate: boolean;
}

function CarModel({ modelPath, color, autoRotate }: CarModelProps) {
  const { scene } = useGLTF(modelPath);
  const group = useRef<THREE.Group>(null);

  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);

    clone.traverse((child) => {
      if (child instanceof THREE.Mesh && child.name === 'body') {
        if (child.material instanceof THREE.MeshStandardMaterial) {
          child.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color(color),
            metalness: 0.6,
            roughness: 0.2,
          });
        }
      }
    });

    return clone;
  }, [scene, color]);

  useFrame(() => {
    if (group.current && autoRotate) {
      group.current.rotation.y += 0.002;
    }
  });

  return <primitive ref={group} object={clonedScene} scale={1.5} position={[0, -0.8, 0]} />;
}

export default function CarViewer3D({
  modelPath,
  color = '#ffffff',
  autoRotate = false,
}: CarViewerProps) {
  return (
    <div className="h-[60vh] w-full overflow-hidden rounded-xl bg-gradient-to-b from-gray-100 to-white shadow-2xl">
      <Canvas shadows camera={{ position: [3, 1.5, 5], fov: 50 }}>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[3, 1.5, 5]} />
          <OrbitControls
            enablePan={false}
            minDistance={3}
            maxDistance={8}
            maxPolarAngle={Math.PI / 2.2}
            enableDamping
            dampingFactor={0.05}
          />
          <Environment preset="sunset" />
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 10, 5]} intensity={1} castShadow />
          <CarModel modelPath={modelPath} color={color} autoRotate={autoRotate} />
          <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={2.4} />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload('/models/byd-seal/seal.glb');
