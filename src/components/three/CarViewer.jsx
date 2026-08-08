import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Environment } from "@react-three/drei";
import { CarModel } from "@/components/three/CarModel";

/**
 * Self-contained 3D scene. Deliberately constrained OrbitControls —
 * no panning, limited vertical orbit, capped zoom — so the interaction
 * feels like "inspecting a product," not "flying a spaceship."
 *
 * Camera/light/shadow distances are tuned for the real Ferrari glTF's
 * actual meter-scale footprint (~4.5m long, ~1.2m tall, ~2.3m wide,
 * base sitting at y=0) — noticeably bigger than the old procedural
 * placeholder's toy-scale proportions.
 */
export function CarViewer({ color }) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [6, 2.1, 6], fov: 32 }}
      gl={{ antialias: true }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[7, 9, 4]}
          intensity={1.8}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        <directionalLight position={[-7, 4, -5]} intensity={0.35} />

        <CarModel color={color} />

        <ContactShadows
          position={[0, 0, 0]}
          opacity={0.6}
          scale={16}
          blur={2}
          far={4}
        />

        <Environment preset="city" />

        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={4.5}
          maxDistance={12}
          minPolarAngle={Math.PI / 5}
          maxPolarAngle={Math.PI / 2.1}
          autoRotate={false}
          target={[0, 0.6, 0]}
        />
      </Suspense>
    </Canvas>
  );
}
