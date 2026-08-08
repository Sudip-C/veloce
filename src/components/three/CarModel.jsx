import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

const MODEL_URL = "/models/ferrari.glb";

/**
 * Real glTF model (Draco-compressed, ~1.6MB) — a Ferrari 458 Italia,
 * originally modeled by Sketchfab user "vicent091036" and redistributed
 * under three.js's official examples (see credit rendered near the
 * viewer in CarShowcase / Configurator — required by the source license).
 *
 * The model ships with named mesh nodes (body, rim_fl/fr/rl/rr, glass,
 * trim, ...) which is what makes the live color-swap possible: we only
 * recolor the "body" mesh's material, not the whole model.
 */
export function CarModel({ color = "#d4ff3f" }) {
  const group = useRef(null);
  const { scene } = useGLTF(MODEL_URL);

  // Clone the scene graph per-instance so two viewers on screen at once
  // (Home showcase + Configurator) don't share — and fight over — the
  // same cached materials. Also clone the body material specifically,
  // since that's the one we mutate.
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.name === "body" && child.material) {
          child.material = child.material.clone();
        }
      }
    });
    return clone;
  }, [scene]);

  const bodyMaterial = useMemo(() => {
    let found = null;
    clonedScene.traverse((child) => {
      if (child.isMesh && child.name === "body") found = child.material;
    });
    return found;
  }, [clonedScene]);

  useEffect(() => {
    if (!bodyMaterial) return;
    bodyMaterial.color.set(color);
    bodyMaterial.metalness = 0.9;
    bodyMaterial.roughness = 0.2;
  }, [bodyMaterial, color]);

  // Gentle idle rotation so the car reads as "alive" even before the
  // user touches OrbitControls.
  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.15;
    }
  });

  // Model sits with its base at y=0 already (verified via bounding-box
  // inspection); no vertical offset needed.
  return (
    <group ref={group}>
      <primitive object={clonedScene} />
    </group>
  );
}

useGLTF.preload(MODEL_URL);
