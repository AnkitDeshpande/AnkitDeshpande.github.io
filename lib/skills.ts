export interface SkillEvidence {
  type: "project" | "certification" | "open-source" | "article" | "talk" | "mentorship";
  title: string;
  url?: string;
  description?: string;
}

export interface Skill {
  name: string;
  category: "Language" | "Framework" | "Database" | "Infrastructure" | "Tooling" | "Practice";
  proficiency: "Learning" | "Intermediate" | "Advanced" | "Expert";
  years: number;
  evidence: SkillEvidence[];
  description?: string;
}

export const skills: Skill[] = [
  {
    name: "Java",
    category: "Language",
    proficiency: "Advanced",
    years: 4,
    description: "Core Java, concurrency, streams, JVM tuning, memory management",
    evidence: [
      { type: "project", title: "Book My Bus: 10k+ daily transactions", url: "/projects/book-my-bus", description: "High-throughput backend with Spring Boot 3, virtual threads" },
      { type: "project", title: "Wheel Estate: Rental management system", url: "/projects/wheel-estate", description: "Multi-module Spring Boot app with complex domain logic" },
      { type: "project", title: "SkyWay Finder: Flight booking system", url: "/projects/skyway-finder", description: "Desktop app with Swing + Hibernate" },
    ],
  },
  {
    name: "Spring Boot",
    category: "Framework",
    proficiency: "Advanced",
    years: 3,
    description: "Spring Boot 2/3, Spring Security, Data JPA, Cloud, Testing",
    evidence: [
      { type: "project", title: "Book My Bus", url: "/projects/book-my-bus", description: "Microservices-ready modular monolith with 4 services" },
      { type: "project", title: "Fusion Wear: E-commerce with Spring Security", url: "/projects/fusion-wear", description: "Dual auth (user/admin), method-level security, JWT + sessions" },
      { type: "talk", title: "Scaling Spring Boot on AWS", url: "https://youtube.com/@ankitdeshpande", description: "Internal tech talk on EC2, RDS, ElastiCache tuning" },
    ],
  },
  {
    name: "TypeScript",
    category: "Language",
    proficiency: "Advanced",
    years: 3,
    description: "Strict mode, generics, conditional types, inference, React patterns",
    evidence: [
      { type: "project", title: "Book My Bus Frontend", url: "/projects/book-my-bus", description: "React 18 + TypeScript + React Query + strict config" },
      { type: "project", title: "E-Basket Marketplace", url: "/projects/e-basket", description: "Type-safe API layer with Zod schemas" },
    ],
  },
  {
    name: "React",
    category: "Framework",
    proficiency: "Advanced",
    years: 3,
    description: "Hooks, Suspense, Server Components, React Query, Performance",
    evidence: [
      { type: "project", title: "Book My Bus Frontend", url: "/projects/book-my-bus", description: "Real-time seat maps, optimistic updates, cache invalidation" },
      { type: "project", title: "This Portfolio", url: "/", description: "Next.js 15 App Router, Framer Motion, Tailwind v4" },
    ],
  },
  {
    name: "PostgreSQL",
    category: "Database",
    proficiency: "Advanced",
    years: 3,
    description: "Schema design, indexing, query optimization, partitioning, replication",
    evidence: [
      { type: "project", title: "Book My Bus: PostgreSQL on RDS", url: "/projects/book-my-bus", description: "Read replicas, connection pooling, advisory locks" },
      { type: "project", title: "Wheel Estate: Complex relational model", url: "/projects/wheel-estate", description: "Vehicle hierarchy, pricing rules, booking constraints" },
    ],
  },
  {
    name: "Redis",
    category: "Database",
    proficiency: "Advanced",
    years: 2,
    description: "Caching, distributed locks, pub/sub, streams, clustering",
    evidence: [
      { type: "project", title: "Book My Bus: Seat locking & caching", url: "/projects/book-my-bus", description: "Distributed locks with Redisson, cache-aside with TTL" },
      { type: "project", title: "E-Basket: Real-time bidding", url: "/projects/e-basket", description: "Sorted sets for leaderboards, pub/sub for notifications" },
      { type: "certification", title: "Redis University RU101", url: "https://university.redis.com", description: "Core concepts, data structures, patterns" },
    ],
  },
  {
    name: "MySQL",
    category: "Database",
    proficiency: "Advanced",
    years: 4,
    description: "InnoDB internals, query optimization, replication, GTID, backup",
    evidence: [
      { type: "project", title: "Fusion Wear: MySQL 8", url: "/projects/fusion-wear", description: "CTEs, window functions, JSON columns for product attributes" },
      { type: "project", title: "Wheel Estate: MySQL", url: "/projects/wheel-estate", description: "Transaction isolation tuning for booking conflicts" },
    ],
  },
  {
    name: "AWS",
    category: "Infrastructure",
    proficiency: "Advanced",
    years: 2,
    description: "EC2, RDS, ElastiCache, S3, CloudFront, IAM, VPC, CloudWatch",
    evidence: [
      { type: "project", title: "Book My Bus: Production on AWS", url: "/projects/book-my-bus", description: "Multi-AZ RDS, ElastiCache cluster, ALB, ASG" },
      { type: "project", title: "Portfolio: Hosted on Vercel + AWS S3", url: "/", description: "Edge functions, image optimization, CDN" },
      { type: "certification", title: "AWS Cloud Practitioner", url: "https://aws.amazon.com/certification", description: "Core services, security, billing" },
    ],
  },
  {
    name: "Docker",
    category: "Infrastructure",
    proficiency: "Advanced",
    years: 3,
    description: "Multi-stage builds, compose, networking, volumes, security",
    evidence: [
      { type: "project", title: "Book My Bus: Containerized microservices", url: "/projects/book-my-bus", description: "Distroless images, health checks, resource limits" },
      { type: "project", title: "E-Basket: Docker Compose dev env", url: "/projects/e-basket", description: "Hot reload, shared volumes, service dependencies" },
    ],
  },
  {
    name: "Kubernetes",
    category: "Infrastructure",
    proficiency: "Intermediate",
    years: 1,
    description: "Deployments, Services, Ingress, ConfigMaps, Secrets, HPA",
    evidence: [
      { type: "project", title: "Book My Bus: K8s migration (WIP)", url: "/projects/book-my-bus", description: "Helm charts, ArgoCD, Prometheus Operator" },
      { type: "certification", title: "CKA Preparation", url: "https://training.linuxfoundation.org", description: "Cluster admin, troubleshooting, security" },
    ],
  },
  {
    name: "Git & CI/CD",
    category: "Tooling",
    proficiency: "Expert",
    years: 5,
    description: "Git workflows, GitHub Actions, GitLab CI, trunk-based development",
    evidence: [
      { type: "project", title: "All Projects: GitHub Actions pipelines", description: "Matrix builds, dependency caching, security scanning, deploy" },
    ],
  },
  {
    name: "Observability",
    category: "Practice",
    proficiency: "Advanced",
    years: 2,
    description: "Prometheus, Grafana, OpenTelemetry, distributed tracing, alerting",
    evidence: [
      { type: "project", title: "Book My Bus: Full observability stack", url: "/projects/book-my-bus", description: "RED metrics, exemplars, correlation IDs, SLO dashboards" },
    ],
  },
  {
    name: "System Design",
    category: "Practice",
    proficiency: "Advanced",
    years: 3,
    description: "Scalability, reliability, consistency, domain modeling, trade-offs",
    evidence: [
      { type: "project", title: "Book My Bus: Architecture", url: "/projects/book-my-bus", description: "Modular monolith → microservices migration path" },
      { type: "project", title: "E-Basket: Real-time auction system", url: "/projects/e-basket", description: "Event-driven, eventual consistency, idempotency" },
      { type: "talk", title: "System Design Interview Patterns", url: "https://youtube.com/@ankitdeshpande", description: "Load balancer, cache, queue, database scaling" },
    ],
  },
  {
    name: "Testing",
    category: "Practice",
    proficiency: "Advanced",
    years: 3,
    description: "Unit, integration, contract, e2e, property-based, mutation testing",
    evidence: [
      { type: "project", title: "Book My Bus: Test pyramid", url: "/projects/book-my-bus", description: "JUnit 5, Testcontainers, MockMvc, RestAssured, Playwright" },
    ],
  },
  {
    name: "API Design",
    category: "Practice",
    proficiency: "Advanced",
    years: 3,
    description: "REST, GraphQL, gRPC, OpenAPI, versioning, backwards compatibility",
    evidence: [
      { type: "project", title: "Book My Bus: API contracts", url: "/projects/book-my-bus", description: "OpenAPI 3.1, semantic versioning, deprecation policy" },
      { type: "project", title: "E-Basket: Real-time + REST hybrid", url: "/projects/e-basket", description: "Socket.io events + REST for mutations" },
    ],
  },
];

export function getSkillsByCategory(): Record<string, Skill[]> {
  return skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);
}

export function getSkillCategories(): string[] {
  return [...new Set(skills.map((s) => s.category))].sort();
}

export function getSkill(name: string): Skill | undefined {
  return skills.find((s) => s.name.toLowerCase() === name.toLowerCase());
}