'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function WebGLBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // SCENE SETUP
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.002);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x050505, 1);
    mountRef.current.appendChild(renderer.domElement);

    // ARCHITECTURAL NODES (PRISM Concept)
    const geometry = new THREE.BufferGeometry();
    const particlesCount = window.innerWidth < 768 ? 300 : 800;
    const posArray = new Float32Array(particlesCount * 3);
    const velocityArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 100;
      velocityArray[i] = (Math.random() - 0.5) * 0.02; // Slow drift
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const material = new THREE.PointsMaterial({
      size: 0.15,
      color: 0x888888,
      transparent: true,
      opacity: 0.8,
    });

    const particlesMesh = new THREE.Points(geometry, material);
    scene.add(particlesMesh);

    // MOUSE INTERACTION
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const onDocumentMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - windowHalfX) * 0.05;
      mouseY = (event.clientY - windowHalfY) * 0.05;
    };

    document.addEventListener('mousemove', onDocumentMouseMove);

    // ANIMATION LOOP
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      targetX = mouseX * 0.001;
      targetY = mouseY * 0.001;

      particlesMesh.rotation.y += 0.0005;
      particlesMesh.rotation.x += 0.0002;

      // Mouse parallax
      camera.position.x += (mouseX * 0.05 - camera.position.x) * 0.05;
      camera.position.y += (-mouseY * 0.05 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // RESIZE HANDLER
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    // CLEANUP (Anti-Memory Leak)
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', onDocumentMouseMove);
      cancelAnimationFrame(animationFrameId);
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none opacity-40"
      aria-hidden="true"
    />
  );
}
