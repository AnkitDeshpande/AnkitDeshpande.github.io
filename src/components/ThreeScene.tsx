import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const NUM_PARTICLES = 2500;

function Particles({ scrollSpeed }: { scrollSpeed: number }) {
  const ref = useRef<THREE.Points>(null!);
  const { positions, colors, sizes } = useMemo(() => {
    const pos = new Float32Array(NUM_PARTICLES * 3);
    const col = new Float32Array(NUM_PARTICLES * 3);
    const siz = new Float32Array(NUM_PARTICLES);
    const c = new THREE.Color();

    for (let i = 0; i < NUM_PARTICLES; i++) {
      const r = 4 + Math.random() * 12;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.cos(phi) * 0.6;
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);

      c.setHSL(0.42 + Math.random() * 0.06, 0.7, 0.3 + Math.random() * 0.5);
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
      siz[i] = 0.015 + Math.random() * 0.04;
    }
    return { positions: pos, colors: col, sizes: siz };
  }, []);

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    g.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    return g;
  }, [positions, colors, sizes]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.015 + scrollSpeed * 0.3;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.008) * 0.05 + scrollSpeed * 0.1;
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial
        size={0.04}
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

function CentralShape() {
  const ref = useRef<THREE.Mesh>(null!);
  const wireRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    ref.current.rotation.x = t * 0.08;
    ref.current.rotation.y = t * 0.12;
    ref.current.position.y = Math.sin(t * 0.25) * 0.2;
    wireRef.current.rotation.x = -t * 0.1;
    wireRef.current.rotation.y = t * 0.15;
    wireRef.current.position.y = Math.sin(t * 0.25 + 0.5) * 0.2;
  });

  return (
    <group>
      <mesh ref={ref}>
        <torusKnotGeometry args={[1.0, 0.3, 180, 24]} />
        <meshPhysicalMaterial
          color="#10b981"
          metalness={0.95}
          roughness={0.05}
          emissive="#10b981"
          emissiveIntensity={0.4}
          transparent
          opacity={0.9}
        />
      </mesh>
      <mesh ref={wireRef}>
        <torusKnotGeometry args={[1.3, 0.04, 80, 16]} />
        <meshBasicMaterial color="#34d399" wireframe transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

function OrbitingShape({
  radius,
  color,
  speed,
  phase,
  geometry,
}: {
  radius: number;
  color: string;
  speed: number;
  phase: number;
  geometry: THREE.BufferGeometry;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  const angleRef = useRef(phase);

  useFrame(() => {
    angleRef.current += 0.005 * speed;
    const a = angleRef.current;
    ref.current.position.x = Math.cos(a) * radius;
    ref.current.position.z = Math.sin(a) * radius;
    ref.current.position.y = Math.sin(a * 0.7 + phase) * 0.4;
    ref.current.rotation.x += 0.01 * speed;
    ref.current.rotation.y += 0.02 * speed;
  });

  return (
    <mesh ref={ref} geometry={geometry}>
      <meshPhysicalMaterial
        color={color}
        metalness={0.4}
        roughness={0.3}
        transparent
        opacity={0.7}
        emissive={color}
        emissiveIntensity={0.15}
      />
    </mesh>
  );
}

function OrbitalRings() {
  const ref = useRef<THREE.Group>(null!);

  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.03;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.05;
  });

  const rings = useMemo(() => {
    const data: { radius: number; color: string; opacity: number }[] = [
      { radius: 1.8, color: "#10b981", opacity: 0.08 },
      { radius: 2.8, color: "#34d399", opacity: 0.06 },
      { radius: 3.8, color: "#06b6d4", opacity: 0.04 },
    ];
    return data;
  }, []);

  return (
    <group ref={ref}>
      {rings.map((ring, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, i * 0.5]}>
          <ringGeometry args={[ring.radius - 0.01, ring.radius, 64]} />
          <meshBasicMaterial color={ring.color} transparent opacity={ring.opacity} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
}

function FloatingDots() {
  const count = 80;
  const ref = useRef<THREE.Points>(null!);
  const { positions } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.6 + Math.random() * 0.8;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.cos(phi);
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    return { positions: pos };
  }, []);

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, [positions]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.05;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.03) * 0.1;
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial size={0.03} color="#10b981" transparent opacity={0.6} blending={THREE.AdditiveBlending} sizeAttenuation depthWrite={false} />
    </points>
  );
}

const icosahedronGeo = new THREE.IcosahedronGeometry(0.35);
const octahedronGeo = new THREE.OctahedronGeometry(0.3);
const dodecahedronGeo = new THREE.DodecahedronGeometry(0.25);
const tetrahedronGeo = new THREE.TetrahedronGeometry(0.4);

export default function ThreeScene({ scrollSpeed = 0 }: { scrollSpeed: number }) {
  const sceneRef = useRef<THREE.Group>(null!);
  const { mouse } = useThree();

  useFrame(() => {
    if (!sceneRef.current) return;
    sceneRef.current.rotation.x = (mouse.y * Math.PI) / 20;
    sceneRef.current.rotation.y = (mouse.x * Math.PI) / 20;
  });

  return (
    <group ref={sceneRef}>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#10b981" />
      <directionalLight position={[-5, -5, -5]} intensity={0.5} color="#06b6d4" />
      <pointLight position={[0, 0, 0]} intensity={0.8} color="#10b981" distance={10} />

      <Particles scrollSpeed={scrollSpeed} />
      <OrbitalRings />
      <CentralShape />
      <FloatingDots />

      <OrbitingShape radius={2.2} color="#06b6d4" speed={0.8} phase={0} geometry={icosahedronGeo} />
      <OrbitingShape radius={3.0} color="#34d399" speed={1.2} phase={2} geometry={octahedronGeo} />
      <OrbitingShape radius={3.6} color="#10b981" speed={0.6} phase={4} geometry={dodecahedronGeo} />
      <OrbitingShape radius={2.6} color="#059669" speed={1.0} phase={6} geometry={tetrahedronGeo} />
    </group>
  );
}
