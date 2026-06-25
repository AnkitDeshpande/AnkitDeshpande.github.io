import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";

const COLORS = {
  emerald: "#10b981",
  cyan: "#06b6d4",
  emeraldLight: "#34d399",
  emeraldDark: "#059669",
  white: "#ffffff",
};

function GalaxyParticles() {
  const ref = useRef<THREE.Points>(null!);
  const count = 6000;

  const [positions, colors, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const siz = new Float32Array(count);
    const c = new THREE.Color();

    for (let i = 0; i < count; i++) {
      const radius = 2 + Math.random() ** 2 * 18;
      const angle = Math.random() * Math.PI * 2;
      const spread = (Math.random() - 0.5) * 2 * (radius * 0.08);

      pos[i * 3] = Math.cos(angle) * radius + spread;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 1.5 * (1 - radius / 20);
      pos[i * 3 + 2] = Math.sin(angle) * radius + spread;

      const hue = 0.38 + Math.random() * 0.12;
      const sat = 0.4 + Math.random() * 0.5;
      const light = 0.3 + Math.random() * 0.6;
      c.setHSL(hue, sat, light);
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;

      siz[i] = 0.01 + Math.random() * 0.06 * (1 - radius / 22);
    }
    return [pos, col, siz];
  }, []);

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    g.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    return g;
  }, [positions, colors, sizes]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.elapsedTime * 0.008;
    ref.current.rotation.x = Math.sin(clock.elapsedTime * 0.005) * 0.03;
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.9}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

function CentralTorusKnot() {
  const groupRef = useRef<THREE.Group>(null!);
  const knotRef = useRef<THREE.Mesh>(null!);
  const glowRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    groupRef.current.rotation.x = Math.sin(t * 0.05) * 0.1;
    groupRef.current.rotation.y = t * 0.1;
    groupRef.current.position.y = Math.sin(t * 0.2) * 0.15;
    knotRef.current.rotation.x = t * 0.15;
    knotRef.current.rotation.z = t * 0.1;
    glowRef.current.rotation.x = -t * 0.08;
    glowRef.current.rotation.y = t * 0.12;
  });

  return (
    <group ref={groupRef}>
      <mesh ref={knotRef}>
        <torusKnotGeometry args={[0.8, 0.25, 200, 32]} />
        <meshPhysicalMaterial
          color={COLORS.emerald}
          metalness={0.95}
          roughness={0.05}
          emissive={COLORS.emerald}
          emissiveIntensity={0.6}
          transparent
          opacity={0.95}
        />
      </mesh>
      <mesh ref={glowRef}>
        <torusKnotGeometry args={[1.0, 0.015, 128, 16]} />
        <meshBasicMaterial color={COLORS.cyan} transparent opacity={0.5} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color={COLORS.white} />
      </mesh>
    </group>
  );
}

function GlowingRing({ radius = 1.6, color = COLORS.emerald, opacity = 0.15 }) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    ref.current.rotation.x = Math.sin(clock.elapsedTime * 0.1) * 0.1;
    ref.current.rotation.z = Math.cos(clock.elapsedTime * 0.08) * 0.05;
  });

  return (
    <mesh ref={ref} rotation={[Math.PI / 2.5, 0, 0]}>
      <ringGeometry args={[radius - 0.01, radius, 80]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} side={THREE.DoubleSide} depthWrite={false} />
    </mesh>
  );
}

function OrbitingShape({ radius, color, speed, phase, geometry }: {
  radius: number; color: string; speed: number; phase: number; geometry: THREE.BufferGeometry;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  const angle = useRef(phase);

  useFrame(() => {
    angle.current += 0.004 * speed;
    const a = angle.current;
    ref.current.position.x = Math.cos(a) * radius;
    ref.current.position.z = Math.sin(a) * radius;
    ref.current.position.y = Math.sin(a * 0.6 + phase) * 0.5;
    ref.current.rotation.x += 0.008 * speed;
    ref.current.rotation.y += 0.015 * speed;
  });

  return (
    <mesh ref={ref} geometry={geometry}>
      <meshPhysicalMaterial
        color={color}
        metalness={0.6}
        roughness={0.2}
        transparent
        opacity={0.85}
        emissive={color}
        emissiveIntensity={0.3}
      />
    </mesh>
  );
}

function OrbitLines() {
  const groupRef = useRef<THREE.Group>(null!);
  const radii = [2.2, 3.0, 3.6, 2.6];

  const points = useMemo(() => {
    return radii.map((radius) => {
      const pts: [number, number, number][] = [];
      for (let i = 0; i <= 64; i++) {
        const theta = (i / 64) * Math.PI * 2;
        pts.push([
          Math.cos(theta) * radius,
          Math.sin(theta * 0.6) * 0.5,
          Math.sin(theta) * radius,
        ]);
      }
      return pts;
    });
  }, []);

  useFrame(({ clock }) => {
    groupRef.current.rotation.y = clock.elapsedTime * 0.02;
  });

  return (
    <group ref={groupRef}>
      {points.map((pts, i) => (
        <Line
          key={i}
          points={pts}
          color={COLORS.cyan}
          transparent
          opacity={0.06 + i * 0.01}
          lineWidth={1}
        />
      ))}
    </group>
  );
}

function ConnectionLines() {
  const ref = useRef<THREE.LineSegments>(null!);

  const geo = useMemo(() => {
    const radii = [2.2, 3.0, 3.6, 2.6];
    const positions: number[] = [];
    for (const r of radii) {
      for (let i = 0; i < 8; i++) {
        const theta = (i / 8) * Math.PI * 2;
        const x = Math.cos(theta) * r;
        const z = Math.sin(theta) * r;
        positions.push(0, 0, 0, x, Math.sin(theta * 0.6) * 0.5, z);
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return g;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.elapsedTime * 0.02;
  });

  return (
    <lineSegments ref={ref} geometry={geo}>
      <lineBasicMaterial color={COLORS.emerald} transparent opacity={0.04} />
    </lineSegments>
  );
}

function ShootingStars() {
  const count = 3;
  const ref = useRef<THREE.Points>(null!);
  const data = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const speeds: number[] = [];
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30;
      speeds.push(0.1 + Math.random() * 0.2);
    }
    return { pos, speeds };
  }, []);

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(data.pos, 3));
    return g;
  }, [data]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    const attr = ref.current.geometry.attributes.position;
    const p = attr.array as Float32Array;
    for (let i = 0; i < count; i++) {
      p[i * 3] += delta * data.speeds[i] * 2;
      p[i * 3 + 1] += delta * data.speeds[i] * 1.5;
      p[i * 3 + 2] += delta * data.speeds[i] * 0.5;
      if (p[i * 3] > 15) {
        p[i * 3] = -15;
        p[i * 3 + 1] = (Math.random() - 0.5) * 20;
        p[i * 3 + 2] = (Math.random() - 0.5) * 30;
      }
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial size={0.15} color={COLORS.white} transparent opacity={0.3} blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
}

const icosahedronGeo = new THREE.IcosahedronGeometry(0.3);
const octahedronGeo = new THREE.OctahedronGeometry(0.25);
const dodecahedronGeo = new THREE.DodecahedronGeometry(0.22);
const tetrahedronGeo = new THREE.TetrahedronGeometry(0.35);
const sphereGeo = new THREE.SphereGeometry(0.2, 8, 8);
const boxGeo = new THREE.BoxGeometry(0.3, 0.3, 0.3);

export default function ThreeScene({ activeSection = "home" }: { activeSection?: string }) {
  const sceneRef = useRef<THREE.Group>(null!);
  const { mouse } = useThree();

  const sectionColors: Record<string, string> = {
    home: COLORS.emerald,
    about: "#8b5cf6",
    skills: "#06b6d4",
    github: "#38bdf8",
    leetcode: "#facc15",
    qualification: "#10b981",
    projects: "#f472b6",
    contact: "#10b981",
  };

  const accentColor = sectionColors[activeSection] || COLORS.emerald;

  useFrame(() => {
    if (!sceneRef.current) return;
    const p = 0.03;
    sceneRef.current.rotation.x = mouse.y * p;
    sceneRef.current.rotation.y = mouse.x * p;
  });

  return (
    <group ref={sceneRef}>
      <ambientLight intensity={0.2} />
      <directionalLight position={[3, 5, 5]} intensity={0.8} color={COLORS.emerald} />
      <directionalLight position={[-3, -5, -5]} intensity={0.4} color={COLORS.cyan} />
      <pointLight position={[0, 0, 0]} intensity={1.5} color={accentColor} distance={12} decay={1.5} />

      <GalaxyParticles />
      <ShootingStars />
      <OrbitLines />
      <ConnectionLines />

      <CentralTorusKnot />

      <GlowingRing radius={1.5} color={accentColor} opacity={0.12} />
      <GlowingRing radius={2.0} color={COLORS.cyan} opacity={0.08} />
      <GlowingRing radius={2.8} color={COLORS.emeraldLight} opacity={0.05} />

      <OrbitingShape radius={2.2} color="#06b6d4" speed={0.8} phase={0} geometry={icosahedronGeo} />
      <OrbitingShape radius={3.0} color="#34d399" speed={1.2} phase={2} geometry={octahedronGeo} />
      <OrbitingShape radius={3.6} color="#10b981" speed={0.6} phase={4} geometry={dodecahedronGeo} />
      <OrbitingShape radius={2.6} color="#059669" speed={1.0} phase={6} geometry={tetrahedronGeo} />
      <OrbitingShape radius={4.0} color="#06b6d4" speed={0.5} phase={1} geometry={sphereGeo} />
      <OrbitingShape radius={3.4} color="#34d399" speed={0.9} phase={3} geometry={boxGeo} />
    </group>
  );
}
