import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const C = {
  emerald: "#10b981",
  cyan: "#06b6d4",
  emL: "#34d399",
  emD: "#059669",
  white: "#ffffff",
  purple: "#8b5cf6",
  blue: "#38bdf8",
  yellow: "#facc15",
  pink: "#f472b6",
};

const SECTION_COLORS: Record<string, string> = {
  home: C.emerald,
  about: C.purple,
  skills: C.cyan,
  github: C.blue,
  leetcode: C.yellow,
  qualification: C.emerald,
  projects: C.pink,
  contact: C.emerald,
};

function CameraRig({ progress, speed }: { progress: number; speed: number }) {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3(0, 0, 6));
  const fovTarget = useRef(60);

  useFrame(() => {
    const t = progress;
    target.current.set(
      Math.sin(t * Math.PI * 0.8) * 0.8,
      -t * 0.6,
      6 - t * 1.5,
    );
    camera.position.lerp(target.current, 0.04);

    if (camera instanceof THREE.PerspectiveCamera) {
      fovTarget.current = 60 + speed * 8;
      camera.fov += (fovTarget.current - camera.fov) * 0.05;
      camera.updateProjectionMatrix();
    }

    camera.lookAt(0, -t * 0.2, 0);
  });

  return null;
}

function GalaxyParticles({ speed }: { speed: number }) {
  const ref = useRef<THREE.Points>(null!);
  const count = 8000;

  const [positions, colors, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const siz = new Float32Array(count);
    const c = new THREE.Color();

    for (let i = 0; i < count; i++) {
      const radius = 1.5 + Math.random() ** 2 * 20;
      const angle = Math.random() * Math.PI * 2;
      const spread = (Math.random() - 0.5) * radius * 0.15;

      pos[i * 3] = Math.cos(angle) * radius + spread;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 2 * (1 - radius / 22);
      pos[i * 3 + 2] = Math.sin(angle) * radius + spread;

      const hue = 0.38 + Math.random() * 0.14;
      c.setHSL(hue, 0.5 + Math.random() * 0.5, 0.2 + Math.random() * 0.7);
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;

      siz[i] = 0.008 + Math.random() * 0.05 * (1 - radius / 22);
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
    const rotSpeed = 0.006 + speed * 0.01;
    ref.current.rotation.y = clock.elapsedTime * rotSpeed;
    ref.current.rotation.x = Math.sin(clock.elapsedTime * 0.004) * 0.03;
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.85}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

function CentralTorus({ accentColor }: { accentColor: string }) {
  const gRef = useRef<THREE.Group>(null!);
  const kRef = useRef<THREE.Mesh>(null!);
  const wRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    gRef.current.rotation.x = Math.sin(t * 0.04) * 0.08;
    gRef.current.rotation.y = t * 0.08;
    gRef.current.position.y = Math.sin(t * 0.15) * 0.12;
    kRef.current.rotation.x = t * 0.12;
    kRef.current.rotation.z = t * 0.08;
    wRef.current.rotation.x = -t * 0.06;
    wRef.current.rotation.y = t * 0.1;
  });

  return (
    <group ref={gRef}>
      <mesh ref={kRef}>
        <torusKnotGeometry args={[0.7, 0.2, 200, 32]} />
        <meshPhysicalMaterial
          color={accentColor}
          metalness={0.95}
          roughness={0.05}
          emissive={accentColor}
          emissiveIntensity={0.8}
          transparent
          opacity={0.9}
        />
      </mesh>
      <mesh ref={wRef}>
        <torusKnotGeometry args={[0.9, 0.01, 128, 16]} />
        <meshBasicMaterial color={C.cyan} transparent opacity={0.4} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color={C.white} />
      </mesh>
    </group>
  );
}

function GlowRing({ r = 1.4, color = C.emerald, op = 0.12, tilt = 0 }: {
  r?: number; color?: string; op?: number; tilt?: number;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    ref.current.rotation.x += Math.sin(clock.elapsedTime * 0.05) * 0.0005;
    ref.current.rotation.z += Math.cos(clock.elapsedTime * 0.04) * 0.0005;
  });

  return (
    <mesh ref={ref} rotation={[Math.PI / 2.5 + tilt, 0, tilt]}>
      <ringGeometry args={[r - 0.005, r, 80]} />
      <meshBasicMaterial color={color} transparent opacity={op} side={THREE.DoubleSide} depthWrite={false} />
    </mesh>
  );
}

function SaturnRing({ radius, color }: { radius: number; color: string }) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    ref.current.rotation.z = Math.sin(clock.elapsedTime * 0.02) * 0.1;
  });

  return (
    <mesh ref={ref} rotation={[Math.PI / 3, 0, 0]}>
      <ringGeometry args={[radius, radius + 0.3, 80]} />
      <meshBasicMaterial color={color} transparent opacity={0.06} side={THREE.DoubleSide} depthWrite={false} />
    </mesh>
  );
}

function Orbiter({ r, color, speed, phase, geo }: {
  r: number; color: string; speed: number; phase: number; geo: THREE.BufferGeometry;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  const angle = useRef(phase);

  useFrame(() => {
    angle.current += 0.003 * speed;
    const a = angle.current;
    ref.current.position.x = Math.cos(a) * r;
    ref.current.position.z = Math.sin(a) * r;
    ref.current.position.y = Math.sin(a * 0.6 + phase) * 0.4;
    ref.current.rotation.x += 0.007 * speed;
    ref.current.rotation.y += 0.012 * speed;
  });

  return (
    <mesh ref={ref} geometry={geo}>
      <meshPhysicalMaterial
        color={color}
        metalness={0.5}
        roughness={0.2}
        transparent
        opacity={0.8}
        emissive={color}
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

function SectionTableau({ section, accent }: { section: string; accent: string }) {
  const gRef = useRef<THREE.Group>(null!);

  const sPositions: Record<string, [number, number, number]> = {
    home: [0, 0, 0],
    about: [0.5, -0.8, -1],
    skills: [0.2, -1.5, -2],
    github: [-0.3, -2.2, -2.5],
    leetcode: [0.4, -2.8, -3],
    qualification: [-0.2, -3.5, -3],
    projects: [0.3, -4.2, -4],
    contact: [-0.1, -4.8, -4],
  };

  const pos = sPositions[section] || [0, 0, 0];

  useFrame(() => {
    if (!gRef.current) return;
    gRef.current.position.x += (pos[0] - gRef.current.position.x) * 0.03;
    gRef.current.position.y += (pos[1] - gRef.current.position.y) * 0.03;
    gRef.current.position.z += (pos[2] - gRef.current.position.z) * 0.03;
  });

  const dotGeo = useMemo(() => {
    const posArr: number[] = [];
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      posArr.push(
        Math.cos(a) * 0.8,
        Math.sin(a * 2) * 0.4,
        Math.sin(a) * 0.8,
      );
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(posArr, 3));
    return g;
  }, []);

  const ringGeo = useMemo(() => {
    const posArr: number[] = [];
    for (let i = 0; i <= 32; i++) {
      const a = (i / 32) * Math.PI * 2;
      posArr.push(Math.cos(a) * 0.6, 0, Math.sin(a) * 0.6);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(posArr, 3));
    return g;
  }, []);

  return (
    <group ref={gRef}>
      <mesh>
        <sphereGeometry args={[0.12, 12, 12]} />
        <meshBasicMaterial color={accent} transparent opacity={0.3} />
      </mesh>
      <points geometry={dotGeo}>
        <pointsMaterial size={0.025} color={accent} transparent opacity={0.25} blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>
      <lineSegments geometry={ringGeo}>
        <lineBasicMaterial color={accent} transparent opacity={0.08} />
      </lineSegments>
    </group>
  );
}

function GridFloor({ progress }: { progress: number }) {
  const ref = useRef<THREE.Group>(null!);

  const gridSize = 30;
  const divisions = 30;

  const gridGeo = useMemo(() => {
    const vertices: number[] = [];
    const half = gridSize / 2;
    const step = gridSize / divisions;

    for (let i = 0; i <= divisions; i++) {
      const p = -half + i * step;
      vertices.push(-half, 0, p, half, 0, p);
      vertices.push(p, 0, -half, p, 0, half);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
    return geo;
  }, []);

  useFrame(() => {
    if (!ref.current) return;
    ref.current.position.y = -2.5 - progress * 1.5;
  });

  return (
    <group ref={ref}>
      <lineSegments geometry={gridGeo}>
        <lineBasicMaterial color={C.emerald} transparent opacity={0.06} />
      </lineSegments>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[gridSize, gridSize]} />
        <meshBasicMaterial color="#0f172a" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

function SpeedWarp({ speed }: { speed: number }) {
  const ref = useRef<THREE.Points>(null!);
  const count = 200;

  const { positions } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = -3 - Math.random() * 10;
    }
    return { positions: pos };
  }, []);

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, [positions]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    const attr = ref.current.geometry.attributes.position;
    const p = attr.array as Float32Array;
    for (let i = 0; i < count; i++) {
      p[i * 3 + 1] -= delta * speed * 5;
      if (p[i * 3 + 1] < -8) {
        p[i * 3] = (Math.random() - 0.5) * 20;
        p[i * 3 + 1] = 8;
        p[i * 3 + 2] = -3 - Math.random() * 10;
      }
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial size={0.03} color={C.cyan} transparent opacity={0.15 * Math.min(speed, 1)} blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
}

const ico = new THREE.IcosahedronGeometry(0.25);
const oct = new THREE.OctahedronGeometry(0.2);
const dod = new THREE.DodecahedronGeometry(0.18);
const tet = new THREE.TetrahedronGeometry(0.3);
const sph = new THREE.SphereGeometry(0.16, 8, 8);
const box = new THREE.BoxGeometry(0.25, 0.25, 0.25);

export default function ThreeScene({
  activeSection = "home",
  scrollProgress = 0,
  scrollSpeed = 0,
  isDark = true,
}: {
  activeSection?: string;
  scrollProgress?: number;
  scrollSpeed?: number;
  isDark?: boolean;
}) {
  const sceneRef = useRef<THREE.Group>(null!);
  const { mouse } = useThree();
  const accent = SECTION_COLORS[activeSection] || C.emerald;
  const fogColor = isDark ? "#0f172a" : "#f1f5f9";

  useFrame(() => {
    if (!sceneRef.current) return;
    const p = 0.03 * (1 + scrollSpeed * 0.3);
    sceneRef.current.rotation.x = mouse.y * p;
    sceneRef.current.rotation.y = mouse.x * p;
  });

  return (
    <>
      <fog attach="fog" args={[fogColor, 8 + scrollProgress * 5, 25]} />

      <CameraRig progress={scrollProgress} speed={scrollSpeed} />

      <group ref={sceneRef}>
        <ambientLight intensity={0.15} />
        <directionalLight position={[3, 5, 5]} intensity={0.6} color={C.emerald} />
        <directionalLight position={[-3, -5, -5]} intensity={0.3} color={C.cyan} />
        <pointLight position={[0, 0, 0]} intensity={1.2} color={accent} distance={10} decay={1.5} />

        <GalaxyParticles speed={scrollSpeed} />
        <SpeedWarp speed={scrollSpeed} />
        <GridFloor progress={scrollProgress} />

        <CentralTorus accentColor={accent} />

        <GlowRing r={1.3} color={accent} op={0.15} />
        <GlowRing r={1.8} color={C.cyan} op={0.08} />
        <GlowRing r={2.5} color={C.emL} op={0.04} />

        <SaturnRing radius={2.0} color={accent} />
        <SaturnRing radius={3.2} color={C.cyan} />

        <Orbiter r={2.0} color="#06b6d4" speed={0.7} phase={0} geo={ico} />
        <Orbiter r={2.7} color={C.emL} speed={1.1} phase={2} geo={oct} />
        <Orbiter r={3.3} color={C.emerald} speed={0.5} phase={4} geo={dod} />
        <Orbiter r={2.4} color={C.emD} speed={0.9} phase={6} geo={tet} />
        <Orbiter r={3.8} color="#06b6d4" speed={0.4} phase={1} geo={sph} />
        <Orbiter r={3.1} color={C.emL} speed={0.8} phase={3} geo={box} />

        <SectionTableau section={activeSection} accent={accent} />
      </group>
    </>
  );
}
