"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function FutureScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const root = mount;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7));
    renderer.setClearColor(0x000000, 0);
    root.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const particleCount = 620;
    const positions = new Float32Array(particleCount * 3);
    const basePositions = new Float32Array(particleCount * 3);
    const phases = new Float32Array(particleCount);
    const speeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const radius = 1.4 + Math.random() * 5.1;
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 4.8;

      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = height + Math.sin(angle * 2) * 0.35;
      positions[i * 3 + 2] = Math.sin(angle) * radius * 0.55;
      basePositions[i * 3] = positions[i * 3];
      basePositions[i * 3 + 1] = positions[i * 3 + 1];
      basePositions[i * 3 + 2] = positions[i * 3 + 2];
      phases[i] = Math.random() * Math.PI * 2;
      speeds[i] = 0.08 + Math.random() * 0.2;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const particles = new THREE.Points(
      geometry,
      new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.018,
        transparent: true,
        opacity: 0.42,
        depthWrite: false,
      }),
    );
    group.add(particles);

    let frame = 0;
    let animationId = 0;

    function resize() {
      const width = root.clientWidth;
      const height = root.clientHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
    }

    function animate() {
      frame += 0.0008;
      const position = geometry.attributes.position as THREE.BufferAttribute;
      const array = position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const offset = i * 3;
        const phase = phases[i] + frame * speeds[i] * 2.4;
        const breathe = 1 + Math.sin(phase) * 0.008;
        array[offset] = basePositions[offset] * breathe;
        array[offset + 1] =
          basePositions[offset + 1] + Math.sin(phase * 1.17) * 0.035;
        array[offset + 2] =
          basePositions[offset + 2] + Math.cos(phase * 0.9) * 0.045;
      }
      position.needsUpdate = true;

      group.rotation.y = frame * 0.1;
      group.rotation.x = Math.sin(frame * 0.32) * 0.012;
      group.scale.setScalar(1 + Math.sin(frame * 1.1) * 0.004);
      particles.rotation.z = Math.sin(frame * 0.25) * 0.008;
      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    }

    resize();
    animate();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      geometry.dispose();
      particles.material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mountRef} className="pointer-events-none absolute inset-0" />;
}
