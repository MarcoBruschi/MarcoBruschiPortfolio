import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export type SplatModelShape = 'hyper-core' | 'helix' | 'torus-grid' | 'polyhedral' | 'hypercube';

interface BackgroundSplatCanvasProps {
  activeShape?: SplatModelShape;
}

// Octahedral normal encoding: packs a 3D unit normal into 2 floats [-1, 1]
function octEncode(x: number, y: number, z: number): [number, number] {
  const invL1 = 1.0 / (Math.abs(x) + Math.abs(y) + Math.abs(z) + 1e-6);
  let ox = x * invL1;
  let oy = y * invL1;
  const oz = z * invL1;
  if (oz < 0) {
    const rx = (1.0 - Math.abs(oy)) * (ox >= 0 ? 1 : -1);
    const ry = (1.0 - Math.abs(ox)) * (oy >= 0 ? 1 : -1);
    ox = rx;
    oy = ry;
  }
  return [ox, oy];
}

export const BackgroundSplatCanvas: React.FC<BackgroundSplatCanvasProps> = ({
  activeShape = 'hyper-core'
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const mainGroupRef = useRef<THREE.Group | null>(null);
  const animFrameRef = useRef<number>(0);

  const targetProgressRef = useRef<number>(0);
  const currentProgressRef = useRef<number>(0);

  const splatCount = 36000;

  // React to prop changes smoothly without recreating WebGL context
  useEffect(() => {
    if (!activeShape) return;
    const shapeMap: Record<string, number> = {
      'hyper-core': 0.0,
      'helix': 1.0,
      'torus-grid': 2.0,
      'polyhedral': 3.0,
      'hypercube': 4.0
    };
    if (shapeMap[activeShape] !== undefined) {
      targetProgressRef.current = shapeMap[activeShape];
    }
  }, [activeShape]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.1, 5.0);
    cameraRef.current = camera;

    // 2. High-performance WebGL2 Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    rendererRef.current = renderer;
    container.replaceChildren(renderer.domElement);

    // 3. Crisp Surfel Shader (No Blurry Bloom - Razor Sharp Micro-Discs with Normal Lighting)
    const planeGeometry = new THREE.PlaneGeometry(0.038, 0.038);
    const instancedGeo = new THREE.InstancedBufferGeometry();
    instancedGeo.index = planeGeometry.index;
    instancedGeo.attributes.position = planeGeometry.attributes.position;
    instancedGeo.attributes.uv = planeGeometry.attributes.uv;
    instancedGeo.instanceCount = splatCount;

    const customMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: true,
      depthTest: true,
      blending: THREE.NormalBlending,
      side: THREE.DoubleSide,
      uniforms: {
        uTime: { value: 0 },
        uMorphProgress: { value: 0 },
        uResolution: { value: new THREE.Vector2(width, height) }
      },
      vertexShader: `
        uniform float uTime;
        uniform float uMorphProgress;

        attribute vec3 aPos0;
        attribute vec3 aPos1;
        attribute vec3 aPos2;
        attribute vec3 aPos3;
        attribute vec3 aPos4;

        attribute vec4 aNorm01;
        attribute vec4 aNorm23;
        attribute vec2 aNorm4;

        attribute vec3 instanceColor;
        attribute float instanceScale;
        attribute float instancePhase;

        varying vec3 vNormal;
        varying vec3 vColor;
        varying vec2 vUv;
        varying vec3 vViewPosition;

        // Octahedral decode to 3D unit vector
        vec3 octDecode(vec2 f) {
          vec3 n = vec3(f.x, f.y, 1.0 - abs(f.x) - abs(f.y));
          float t = clamp(-n.z, 0.0, 1.0);
          n.x += n.x >= 0.0 ? -t : t;
          n.y += n.y >= 0.0 ? -t : t;
          return normalize(n);
        }

        void main() {
          vUv = uv;
          vColor = instanceColor;

          vec3 n0 = octDecode(aNorm01.xy);
          vec3 n1 = octDecode(aNorm01.zw);
          vec3 n2 = octDecode(aNorm23.xy);
          vec3 n3 = octDecode(aNorm23.zw);
          vec3 n4 = octDecode(aNorm4);

          // Continuous fluid morphing between 5 morphologies based on scroll progress (0.0 to 4.0)
          float t = clamp(uMorphProgress, 0.0, 4.0);
          float stage = min(floor(t), 3.0);
          float frac = clamp(t - stage, 0.0, 1.0);
          float sFrac = smoothstep(0.0, 1.0, frac);

          vec3 curPos;
          vec3 curNorm;

          if (stage < 1.0) {
            curPos = mix(aPos0, aPos1, sFrac);
            curNorm = normalize(mix(n0, n1, sFrac));
          } else if (stage < 2.0) {
            curPos = mix(aPos1, aPos2, sFrac);
            curNorm = normalize(mix(n1, n2, sFrac));
          } else if (stage < 3.0) {
            curPos = mix(aPos2, aPos3, sFrac);
            curNorm = normalize(mix(n2, n3, sFrac));
          } else {
            curPos = mix(aPos3, aPos4, sFrac);
            curNorm = normalize(mix(n3, n4, sFrac));
          }

          // Subtle organic quantum wave pulse
          float wave = sin(uTime * 1.6 + instancePhase * 6.2831) * 0.025;
          vec3 localVertex = position * instanceScale * (1.0 + wave);

          // Build orthonormal basis along surfel normal
          vec3 n = curNorm;
          vec3 up = abs(n.y) < 0.99 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0);
          vec3 right = normalize(cross(up, n));
          vec3 trueUp = cross(n, right);
          mat3 surfelBasis = mat3(right, trueUp, n);

          vec3 worldDisplaced = curPos + surfelBasis * localVertex;

          vec4 mvPosition = modelViewMatrix * vec4(worldDisplaced, 1.0);
          vViewPosition = -mvPosition.xyz;
          vNormal = normalize(normalMatrix * n);

          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vColor;
        varying vec2 vUv;
        varying vec3 vViewPosition;

        void main() {
          // Surfel disc coordinate [-1, 1]
          vec2 center = vUv * 2.0 - 1.0;
          float distSq = dot(center, center);

          // Strict boundary cutoff - eliminates blurry smeared haze
          if (distSq > 0.85) discard;

          // Crisp antialiased micro-edge for sharp silhouette
          float edge = 1.0 - smoothstep(0.75, 0.85, distSq);

          // Surface normal calculation
          vec3 N = normalize(vNormal);
          if (!gl_FrontFacing) N = -N;

          // Clean directional key light + fill
          vec3 lightDir = normalize(vec3(0.5, 0.8, 0.6));
          vec3 viewDir = normalize(vViewPosition);
          vec3 halfDir = normalize(lightDir + viewDir);

          float diff = max(dot(N, lightDir), 0.18);
          float rim = 1.0 - max(dot(N, viewDir), 0.0);
          float NdotH = max(dot(N, halfDir), 0.0);
          float spec = pow(NdotH, 36.0) * 0.95;

          // Metallic light blue tonal grade
          vec3 diffuseColor = vColor * (diff * 0.85 + 0.25);
          vec3 specularColor = vec3(0.85, 0.95, 1.0) * spec;
          vec3 rimGlow = vec3(0.22, 0.74, 0.98) * (pow(rim, 3.2) * 0.45);

          vec3 finalColor = diffuseColor + specularColor + rimGlow;

          gl_FragColor = vec4(finalColor, edge * 0.62);
        }
      `
    });
    materialRef.current = customMaterial;

    // 4. Generate 5 Distinct Intricate 3D Technical Morphologies
    const pos0 = new Float32Array(splatCount * 3);
    const norm0 = new Float32Array(splatCount * 3);
    const pos1 = new Float32Array(splatCount * 3);
    const norm1 = new Float32Array(splatCount * 3);
    const pos2 = new Float32Array(splatCount * 3);
    const norm2 = new Float32Array(splatCount * 3);
    const pos3 = new Float32Array(splatCount * 3);
    const norm3 = new Float32Array(splatCount * 3);
    const pos4 = new Float32Array(splatCount * 3);
    const norm4 = new Float32Array(splatCount * 3);

    const colors = new Float32Array(splatCount * 3);
    const scales = new Float32Array(splatCount);
    const phases = new Float32Array(splatCount);

    const colSkyPrimary = new THREE.Color('#38bdf8'); // Sky 400
    const colSkyBright = new THREE.Color('#7dd3fc');  // Sky 300
    const colCyanVibrant = new THREE.Color('#0ea5e9');// Sky 500
    const colIceWhite = new THREE.Color('#f0f9ff');   // Specular Ice

    // =========================================================================
    // --- Shape 0 (HERO): Stellated Quantum Icosahedron Core & Orbital Halo ---
    // (Requested: "mude o modelo 3d do hero para outro também")
    // =========================================================================
    const phi = (1 + Math.sqrt(5)) / 2;
    const baseIcoVerts = [
      new THREE.Vector3(-1,  phi, 0).normalize(),
      new THREE.Vector3( 1,  phi, 0).normalize(),
      new THREE.Vector3(-1, -phi, 0).normalize(),
      new THREE.Vector3( 1, -phi, 0).normalize(),
      new THREE.Vector3(0, -1,  phi).normalize(),
      new THREE.Vector3(0,  1,  phi).normalize(),
      new THREE.Vector3(0, -1, -phi).normalize(),
      new THREE.Vector3(0,  1, -phi).normalize(),
      new THREE.Vector3( phi, 0, -1).normalize(),
      new THREE.Vector3( phi, 0,  1).normalize(),
      new THREE.Vector3(-phi, 0, -1).normalize(),
      new THREE.Vector3(-phi, 0,  1).normalize()
    ];

    // Find the 30 triangular edges of the icosahedron
    const icoTriEdges: [THREE.Vector3, THREE.Vector3][] = [];
    for (let a = 0; a < 12; a++) {
      for (let b = a + 1; b < 12; b++) {
        if (baseIcoVerts[a].distanceTo(baseIcoVerts[b]) < 1.15) {
          icoTriEdges.push([baseIcoVerts[a], baseIcoVerts[b]]);
        }
      }
    }
    const triEdgeCount = icoTriEdges.length;

    // Core crystal splats (65%)
    const heroCrystalCount = Math.floor(splatCount * 0.65);
    for (let i = 0; i < heroCrystalCount; i++) {
      const edge = icoTriEdges[i % triEdgeCount];
      const t = Math.random();
      const interp = new THREE.Vector3().lerpVectors(edge[0], edge[1], t);
      
      // Stellated spikes: accentuate vertices
      const shellLayer = (i % 3 === 0) ? 0.95 : (i % 3 === 1) ? 1.45 : 1.85;
      const stellation = 1.0 + Math.pow(Math.abs(interp.dot(edge[0])), 4.0) * 0.45;
      const p = interp.normalize().multiplyScalar(shellLayer * stellation);
      
      p.x += (Math.random() - 0.5) * 0.05;
      p.y += (Math.random() - 0.5) * 0.05;
      p.z += (Math.random() - 0.5) * 0.05;

      pos0[i * 3 + 0] = p.x;
      pos0[i * 3 + 1] = p.y;
      pos0[i * 3 + 2] = p.z;

      const n = p.clone().normalize();
      norm0[i * 3 + 0] = n.x;
      norm0[i * 3 + 1] = n.y;
      norm0[i * 3 + 2] = n.z;

      const c = (i % 3 === 2) ? colIceWhite : (i % 3 === 1) ? colSkyBright : colSkyPrimary;
      colors[i * 3 + 0] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;

      scales[i] = 1.0 + Math.random() * 0.35;
      phases[i] = Math.random();
    }

    // Outer Dual Orbital Planetary Halos (35%)
    for (let i = heroCrystalCount; i < splatCount; i++) {
      const isSecondRing = i % 2 === 0;
      const angle = (i / (splatCount - heroCrystalCount)) * Math.PI * 4;
      const r = 2.15 + (Math.random() - 0.5) * 0.15;
      const v = new THREE.Vector3(Math.cos(angle) * r, (Math.random() - 0.5) * 0.08, Math.sin(angle) * r);
      
      // Inclined orbital planes
      if (isSecondRing) {
        v.applyAxisAngle(new THREE.Vector3(1, 0, 0), 0.65);
        v.applyAxisAngle(new THREE.Vector3(0, 0, 1), 0.55);
      } else {
        v.applyAxisAngle(new THREE.Vector3(1, 0, 0), -0.65);
        v.applyAxisAngle(new THREE.Vector3(0, 0, 1), -0.55);
      }

      pos0[i * 3 + 0] = v.x;
      pos0[i * 3 + 1] = v.y;
      pos0[i * 3 + 2] = v.z;

      const n = v.clone().normalize();
      norm0[i * 3 + 0] = n.x;
      norm0[i * 3 + 1] = n.y;
      norm0[i * 3 + 2] = n.z;

      const c = isSecondRing ? colCyanVibrant : colSkyBright;
      colors[i * 3 + 0] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;

      scales[i] = 0.95 + Math.random() * 0.3;
      phases[i] = angle;
    }

    // =========================================================================
    // --- Shape 1 (FLAGSHIP): DNA Double Helix with Base-Pair Rungs ---
    // (Requested: "em um momento de transicao do modelo3d adicione um formato de dna")
    // =========================================================================
    const dnaHelixRadius = 1.25;
    const dnaHeightSpan = 4.8;
    const dnaTurns = 3.6;
    const dnaStrandCount = Math.floor(splatCount * 0.38); // 38% per strand = 76% total backbones
    let dnaIdx = 0;

    // Strand 1 and Strand 2 (Helical Phosphate Backbones)
    for (let strand = 0; strand < 2; strand++) {
      for (let i = 0; i < dnaStrandCount && dnaIdx < splatCount; i++) {
        const t = i / dnaStrandCount;
        const y = (t - 0.5) * dnaHeightSpan;
        const angle = t * Math.PI * 2 * dnaTurns + (strand * Math.PI);
        
        // Small radial thickness
        const rThickness = (Math.random() - 0.5) * 0.08;
        const r = dnaHelixRadius + rThickness;
        const x = Math.cos(angle) * r;
        const z = Math.sin(angle) * r;

        pos1[dnaIdx * 3 + 0] = x;
        pos1[dnaIdx * 3 + 1] = y;
        pos1[dnaIdx * 3 + 2] = z;

        // Normal points outward from cylinder axis
        const n = new THREE.Vector3(x, 0.1, z).normalize();
        norm1[dnaIdx * 3 + 0] = n.x;
        norm1[dnaIdx * 3 + 1] = n.y;
        norm1[dnaIdx * 3 + 2] = n.z;
        dnaIdx++;
      }
    }

    // Connecting Base-Pair Rungs (Hydrogen Bonds / Degraus da Hélice)
    const numRungs = 42;
    const rungsRemaining = splatCount - dnaIdx;
    for (let i = 0; i < rungsRemaining && dnaIdx < splatCount; i++) {
      const rungIndex = i % numRungs;
      const rungT = rungIndex / (numRungs - 1);
      const y = (rungT - 0.5) * dnaHeightSpan;
      const angle = rungT * Math.PI * 2 * dnaTurns;

      // Interpolate linearly from Strand A to Strand B
      const uSegment = (Math.random() * 2.0 - 1.0); // [-1, 1]
      const spanR = uSegment * (dnaHelixRadius * 0.96);
      const x = Math.cos(angle) * spanR;
      const z = Math.sin(angle) * spanR;

      pos1[dnaIdx * 3 + 0] = x;
      pos1[dnaIdx * 3 + 1] = y + (Math.random() - 0.5) * 0.04;
      pos1[dnaIdx * 3 + 2] = z;

      // Normal perpendicular to rung
      norm1[dnaIdx * 3 + 0] = 0;
      norm1[dnaIdx * 3 + 1] = 1;
      norm1[dnaIdx * 3 + 2] = 0;
      dnaIdx++;
    }

    // =========================================================================
    // --- Shape 2 (PROJETOS): Continuous Volumetric Infinity Torus Knot ---
    // =========================================================================
    const knotP = 2;
    const knotQ = 3;
    const knotR = 1.48;
    const knotTube = 0.42;

    for (let i = 0; i < splatCount; i++) {
      const u = (i / splatCount) * Math.PI * 2 * knotP;
      const v = (i * 7.41) % (Math.PI * 2);

      const rKnot = knotR + 0.55 * Math.cos(knotQ * u / knotP);
      const cx = rKnot * Math.cos(u);
      const cy = 0.55 * Math.sin(knotQ * u / knotP);
      const cz = rKnot * Math.sin(u);

      const du = 0.001;
      const uNext = u + du;
      const rNext = knotR + 0.55 * Math.cos(knotQ * uNext / knotP);
      const tx = (rNext * Math.cos(uNext) - cx) / du;
      const ty = (0.55 * Math.sin(knotQ * uNext / knotP) - cy) / du;
      const tz = (rNext * Math.sin(uNext) - cz) / du;

      const T = new THREE.Vector3(tx, ty, tz).normalize();
      let upVec = new THREE.Vector3(0, 1, 0);
      if (Math.abs(T.y) > 0.92) upVec = new THREE.Vector3(1, 0, 0);
      const N = new THREE.Vector3().crossVectors(T, upVec).normalize();
      const B = new THREE.Vector3().crossVectors(T, N).normalize();

      const rad = knotTube * (0.85 + Math.random() * 0.3);
      const ox = (N.x * Math.cos(v) + B.x * Math.sin(v)) * rad;
      const oy = (N.y * Math.cos(v) + B.y * Math.sin(v)) * rad;
      const oz = (N.z * Math.cos(v) + B.z * Math.sin(v)) * rad;

      pos2[i * 3 + 0] = cx + ox;
      pos2[i * 3 + 1] = cy + oy;
      pos2[i * 3 + 2] = cz + oz;

      const normVec = new THREE.Vector3(ox, oy, oz).normalize();
      norm2[i * 3 + 0] = normVec.x;
      norm2[i * 3 + 1] = normVec.y;
      norm2[i * 3 + 2] = normVec.z;
    }

    // =========================================================================
    // --- Shape 3 (STACKS): Precision Astrolabe Multi-Axis Gyroscope ---
    // =========================================================================
    const gyroCoreSplats = Math.floor(splatCount * 0.42);
    for (let i = 0; i < gyroCoreSplats; i++) {
      const phiG = Math.acos(1 - 2 * (i + 0.5) / gyroCoreSplats);
      const thetaG = Math.PI * (1 + Math.sqrt(5)) * i;
      const r = 0.95 + (Math.sin(phiG * 6.0) * Math.cos(thetaG * 6.0)) * 0.04;
      
      const gx = Math.sin(phiG) * Math.cos(thetaG) * r;
      const gy = Math.sin(phiG) * Math.sin(thetaG) * r;
      const gz = Math.cos(phiG) * r;

      pos3[i * 3 + 0] = gx;
      pos3[i * 3 + 1] = gy;
      pos3[i * 3 + 2] = gz;

      norm3[i * 3 + 0] = gx / r;
      norm3[i * 3 + 1] = gy / r;
      norm3[i * 3 + 2] = gz / r;
    }

    const ringRemaining = splatCount - gyroCoreSplats;
    const perGyroRing = Math.floor(ringRemaining / 4);
    for (let ring = 0; ring < 4; ring++) {
      const rBase = 1.48 + ring * 0.32;
      const tiltX = (ring === 0) ? 0.0 : (ring === 1) ? 1.57 : (ring === 2) ? 0.78 : -0.78;
      const tiltY = (ring === 0) ? 0.0 : (ring === 1) ? 0.0 : (ring === 2) ? 0.78 : -0.78;
      const startIdx = gyroCoreSplats + ring * perGyroRing;
      const endIdx = (ring === 3) ? splatCount : startIdx + perGyroRing;

      for (let j = startIdx; j < endIdx; j++) {
        const angle = ((j - startIdx) / (endIdx - startIdx)) * Math.PI * 2;
        const r = rBase + (Math.random() - 0.5) * 0.1;
        const v = new THREE.Vector3(Math.cos(angle) * r, (Math.random() - 0.5) * 0.06, Math.sin(angle) * r);
        v.applyAxisAngle(new THREE.Vector3(1, 0, 0), tiltX);
        v.applyAxisAngle(new THREE.Vector3(0, 1, 0), tiltY);

        pos3[j * 3 + 0] = v.x;
        pos3[j * 3 + 1] = v.y;
        pos3[j * 3 + 2] = v.z;

        const n = v.clone().normalize();
        norm3[j * 3 + 0] = n.x;
        norm3[j * 3 + 1] = n.y;
        norm3[j * 3 + 2] = n.z;
      }
    }

    // =========================================================================
    // --- Shape 4 (CONTATO / END OF PAGE): Volumetric Geodesic Diamond Core ---
    // (Requested: Fix bug at the end of page - NO loose wireframe struts!)
    // =========================================================================
    for (let i = 0; i < splatCount; i++) {
      // Golden spiral distribution on concentric spherical shells
      const phiD = Math.acos(1 - 2 * (i + 0.5) / splatCount);
      const thetaD = Math.PI * (1 + Math.sqrt(5)) * i;
      
      // Multi-layer dense concentric crystalline shell
      const shellSelector = i % 4;
      const rBase = shellSelector === 0 ? 0.85 : shellSelector === 1 ? 1.25 : shellSelector === 2 ? 1.62 : 1.95;
      
      // Polyhedral geodesic faceting
      const facetWave = 1.0 + (Math.cos(phiD * 10.0) * Math.sin(thetaD * 10.0)) * 0.05;
      const r = rBase * facetWave;

      const dx = Math.sin(phiD) * Math.cos(thetaD) * r;
      const dy = Math.sin(phiD) * Math.sin(thetaD) * r;
      const dz = Math.cos(phiD) * r;

      pos4[i * 3 + 0] = dx;
      pos4[i * 3 + 1] = dy;
      pos4[i * 3 + 2] = dz;

      const n = new THREE.Vector3(dx, dy, dz).normalize();
      norm4[i * 3 + 0] = n.x;
      norm4[i * 3 + 1] = n.y;
      norm4[i * 3 + 2] = n.z;
    }

    // --- Pack Normals with Octahedral Encoding to Maximize GPU Precision & Compatibility ---
    const norm01 = new Float32Array(splatCount * 4);
    const norm23 = new Float32Array(splatCount * 4);
    const norm4Arr = new Float32Array(splatCount * 2);

    for (let i = 0; i < splatCount; i++) {
      const [e0x, e0y] = octEncode(norm0[i * 3 + 0], norm0[i * 3 + 1], norm0[i * 3 + 2]);
      const [e1x, e1y] = octEncode(norm1[i * 3 + 0], norm1[i * 3 + 1], norm1[i * 3 + 2]);
      const [e2x, e2y] = octEncode(norm2[i * 3 + 0], norm2[i * 3 + 1], norm2[i * 3 + 2]);
      const [e3x, e3y] = octEncode(norm3[i * 3 + 0], norm3[i * 3 + 1], norm3[i * 3 + 2]);
      const [e4x, e4y] = octEncode(norm4[i * 3 + 0], norm4[i * 3 + 1], norm4[i * 3 + 2]);

      norm01[i * 4 + 0] = e0x;
      norm01[i * 4 + 1] = e0y;
      norm01[i * 4 + 2] = e1x;
      norm01[i * 4 + 3] = e1y;

      norm23[i * 4 + 0] = e2x;
      norm23[i * 4 + 1] = e2y;
      norm23[i * 4 + 2] = e3x;
      norm23[i * 4 + 3] = e3y;

      norm4Arr[i * 2 + 0] = e4x;
      norm4Arr[i * 2 + 1] = e4y;
    }

    instancedGeo.setAttribute('aPos0', new THREE.InstancedBufferAttribute(pos0, 3));
    instancedGeo.setAttribute('aPos1', new THREE.InstancedBufferAttribute(pos1, 3));
    instancedGeo.setAttribute('aPos2', new THREE.InstancedBufferAttribute(pos2, 3));
    instancedGeo.setAttribute('aPos3', new THREE.InstancedBufferAttribute(pos3, 3));
    instancedGeo.setAttribute('aPos4', new THREE.InstancedBufferAttribute(pos4, 3));

    instancedGeo.setAttribute('aNorm01', new THREE.InstancedBufferAttribute(norm01, 4));
    instancedGeo.setAttribute('aNorm23', new THREE.InstancedBufferAttribute(norm23, 4));
    instancedGeo.setAttribute('aNorm4', new THREE.InstancedBufferAttribute(norm4Arr, 2));

    instancedGeo.setAttribute('instanceColor', new THREE.InstancedBufferAttribute(colors, 3));
    instancedGeo.setAttribute('instanceScale', new THREE.InstancedBufferAttribute(scales, 1));
    instancedGeo.setAttribute('instancePhase', new THREE.InstancedBufferAttribute(phases, 1));

    const mainGroup = new THREE.Group();
    const mesh = new THREE.Mesh(instancedGeo, customMaterial);
    mesh.frustumCulled = false;
    mainGroup.add(mesh);
    scene.add(mainGroup);
    mainGroupRef.current = mainGroup;

    // 5. Scroll Interaction: Continuously drive uMorphProgress along the entire page
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const rawProgress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
      
      // Map 0 -> 1 scroll to 0 -> 4 morphology stages
      targetProgressRef.current = rawProgress * 4.0;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // 6. Responsive Resize
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      customMaterial.uniforms.uResolution.value.set(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 7. 60 FPS Render Loop (Autonomous Smooth Rotation & Scroll-driven Morphing)
    let clock = new THREE.Clock();
    let isRunning = true;

    const animate = () => {
      if (!isRunning) return;
      animFrameRef.current = requestAnimationFrame(animate);

      clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Smooth progress lerp
      currentProgressRef.current += (targetProgressRef.current - currentProgressRef.current) * 0.065;
      customMaterial.uniforms.uMorphProgress.value = currentProgressRef.current;
      customMaterial.uniforms.uTime.value = elapsedTime;

      // Autonomous dynamic rotation (no mouse deflection)
      if (mainGroupRef.current) {
        mainGroupRef.current.rotation.y = elapsedTime * 0.20;
        mainGroupRef.current.rotation.x = Math.sin(elapsedTime * 0.28) * 0.12;
        mainGroupRef.current.rotation.z = Math.cos(elapsedTime * 0.20) * 0.05;
      }

      renderer.render(scene, camera);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isRunning = false;
        cancelAnimationFrame(animFrameRef.current);
      } else {
        if (!isRunning) {
          isRunning = true;
          clock.getDelta(); // flush delta to avoid leap
          animate();
        }
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    animate();

    // Cleanup
    return () => {
      isRunning = false;
      cancelAnimationFrame(animFrameRef.current);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      instancedGeo.dispose();
      planeGeometry.dispose();
      customMaterial.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
};
