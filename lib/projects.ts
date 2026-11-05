export interface Project {
  slug: string;
  title: string;
  summary: string;
  description: string;
  problem: string;
  solution: string;
  role: string;
  teamSize: number;
  duration: string;
  tech: { category: string; items: string[] }[];
  architecture?: string;
  challenges: string[];
  outcomes: string[];
  links: {
    live?: string;
    github?: string;
    demo?: string;
    caseStudy?: string;
  };
  images: {
    hero: string;
    screenshots: string[];
  };
  featured: boolean;
}

export const projects: Project[] = [
  {
    slug: "book-my-bus",
    title: "Book My Bus",
    summary: "High-throughput bus reservation platform handling 10k+ daily transactions with real-time seat availability",
    description: "A full-stack reservation system with real-time seat availability, payment integration, and admin dashboard. Built to handle festival-season traffic spikes with zero double-bookings.",
    problem: "Existing solutions had poor UX, no real-time inventory, and frequent double-bookings during peak hours. Users couldn't trust the platform for time-sensitive bookings.",
    solution: "Implemented optimistic locking for seat selection with Redis-based distributed locks. Integrated Razorpay for idempotent payment processing with webhook reconciliation. Used Redis caching for schedule queries with TTL-based invalidation.",
    role: "Full Stack Developer",
    teamSize: 3,
    duration: "4 months",
    tech: [
      { category: "Backend", items: ["Java 17", "Spring Boot 3", "Hibernate", "MySQL 8", "Redis 7"] },
      { category: "Frontend", items: ["React 18", "TypeScript", "Tailwind CSS", "React Query"] },
      { category: "Infrastructure", items: ["Docker", "AWS EC2", "RDS", "ElastiCache", "CloudFront", "GitHub Actions"] },
      { category: "Observability", items: ["Prometheus", "Grafana", "Spring Actuator", "Micrometer"] },
    ],
    architecture: `graph TD
    Client[Client Browser] --> Gateway[API Gateway / Nginx]
    Gateway --> Auth[Auth Service :8081]
    Gateway --> Booking[Booking Service :8082]
    Gateway --> Payment[Payment Service :8083]
    Gateway --> Schedule[Schedule Service :8084]
    
    Booking --> DB[(MySQL Primary)]
    Booking --> Cache[(Redis Cluster)]
    Payment --> Razorpay[Razorpay Gateway]
    Schedule --> DB
    Schedule --> Cache
    
    Auth --> DB
    Auth --> Cache[Redis Sessions]
    
    Monitoring[Prometheus + Grafana] -.-> All[All Services]`,
    challenges: [
      "Race conditions on seat selection during Tatkal-like booking rushes: solved with Redis distributed locks + optimistic locking",
      "Idempotent payment processing with webhook reconciliation: implemented deduplication keys and state machine",
      "Cache invalidation strategy for dynamic schedules: used event-driven invalidation with Redis pub/sub",
      "Database connection pooling under load: tuned HikariCP with circuit breaker pattern",
    ],
    outcomes: [
      "99.9% uptime during peak festival seasons (Diwali, New Year)",
      "Sub-200ms p95 latency for seat availability checks",
      "Zero double-bookings in 6 months of production",
      "Reduced payment failure rate from 3.2% to 0.4%",
      "Handled 50k+ concurrent users during peak",
    ],
    links: {
      live: "https://ankits-book-my-bus.netlify.app",
      github: "https://github.com/AnkitDeshpande/Book-My-Bus",
      caseStudy: "/projects/book-my-bus",
    },
    images: {
      hero: "/images/projects/book-my-bus/hero.png",
      screenshots: [],
    },
    featured: true,
  },
  {
    slug: "wheel-estate",
    title: "Wheel Estate",
    summary: "Car rental management system with vehicle inventory, reservations, and flexible pricing",
    description: "A comprehensive car rental platform featuring vehicle fleet management, dynamic pricing engine, booking workflows, and customer portal. Built for a local rental business expanding to digital.",
    problem: "Manual spreadsheet-based operations caused overbookings, pricing errors, and no customer self-service. Paper-based contracts and cash-only payments limited scalability.",
    solution: "Built a multi-tenant rental platform with dynamic pricing rules (seasonal, duration-based, vehicle-class). Implemented digital contracts with e-signature, integrated payment gateway, and automated availability calendar.",
    role: "Backend Developer",
    teamSize: 2,
    duration: "3 months",
    tech: [
      { category: "Backend", items: ["Java 17", "Spring Boot 3", "Hibernate", "MySQL"] },
      { category: "Frontend", items: ["Thymeleaf", "HTMX", "Alpine.js", "Tailwind CSS"] },
      { category: "Infrastructure", items: ["Docker", "VPS", "Nginx", "Let's Encrypt"] },
    ],
    architecture: `graph TD
    User[Customer Portal] --> Web[Spring MVC + Thymeleaf]
    Admin[Admin Dashboard] --> Web
    Web --> Service[Rental Service]
    Service --> DB[(MySQL)]
    Service --> Email[Email Service]
    Service --> Payment[Stripe Gateway]
    
    Scheduler[Quartz Scheduler] -.-> Service
    Scheduler -.-> Email[Reminder Emails]`,
    challenges: [
      "Complex pricing rules (weekend surcharge, long-term discount, early-bird, peak season): implemented rule engine with Composite pattern",
      "Concurrent booking conflicts for same vehicle: used SELECT FOR UPDATE with transaction isolation",
      "Legacy data migration from Excel: built ETL pipeline with validation and rollback",
    ],
    outcomes: [
      "Reduced booking processing time from 30min to 2min",
      "Eliminated overbookings entirely",
      "Enabled online payments (60% of bookings now digital)",
      "Owner can manage fleet from phone",
    ],
    links: {
      github: "https://github.com/AnkitDeshpande/Wheel-Estate",
      demo: "https://drive.google.com/file/d/1P0MRMwtH_fcKRHDzxVMpeUG_jbhINd2I/view",
    },
    images: {
      hero: "/images/projects/wheel-estate/hero.png",
      screenshots: [],
    },
    featured: true,
  },
  {
    slug: "retro-walk",
    title: "Retro Walk",
    summary: "E-commerce platform aggregating trendy fashion from multiple brands with cart, coupons, and checkout",
    description: "Individual project built in 6 days. A fashion e-commerce platform that curates products from multiple brands with real-time pricing, discount engine, and seamless checkout flow.",
    problem: "Small fashion brands lack technical infrastructure for modern e-commerce. Customers want curated collections with smooth UX.",
    solution: "Built from scratch with vanilla JS frontend and Node.js/Express backend. Implemented cart persistence, coupon stack logic, guest checkout, and order management. Deployed on Netlify + Railway.",
    role: "Full Stack Developer (Solo)",
    teamSize: 1,
    duration: "6 days",
    tech: [
      { category: "Backend", items: ["Node.js", "Express", "MongoDB", "JWT Auth"] },
      { category: "Frontend", items: ["Vanilla JS", "ES Modules", "CSS Custom Properties", "LocalStorage"] },
      { category: "Infrastructure", items: ["Netlify", "Railway", "MongoDB Atlas"] },
    ],
    challenges: [
      "Building cart + coupon system with stackable discounts in 48 hours: used strategy pattern for discount types",
      "Guest checkout with email-based order tracking: implemented anonymous session + email claim flow",
      "Image optimization without build step: used Cloudinary auto-format + responsive images",
    ],
    outcomes: [
      "Delivered in 6 days from concept to production",
      "Handles 100+ products with variant management",
      "Coupon engine supports %, fixed, BOGO, free shipping",
      "Lighthouse 95+ across all metrics",
    ],
    links: {
      live: "https://ankits-retro-walk.netlify.app",
      github: "https://github.com/AnkitDeshpande/RetroWalk",
    },
    images: {
      hero: "/images/projects/retro-walk/hero.jpg",
      screenshots: [],
    },
    featured: true,
  },
  {
    slug: "fusion-wear",
    title: "Fusion Wear",
    summary: "E-commerce platform with user/admin auth, session management, and secure payments",
    description: "Full-featured e-commerce site with role-based access control, product management, order processing, and admin analytics dashboard. Session-based authentication with UUID tracking.",
    problem: "Need for a customizable e-commerce solution with granular admin controls and secure session handling for a fashion retailer.",
    solution: "Implemented dual auth system (user + admin) with Spring Security, JWT + session hybrid. Built product catalog with categories, variants, inventory tracking. Admin dashboard with sales charts, order management, user management.",
    role: "Full Stack Developer",
    teamSize: 2,
    duration: "5 weeks",
    tech: [
      { category: "Backend", items: ["Java 11", "Spring Boot 2", "Spring Security", "Hibernate", "MySQL"] },
      { category: "Frontend", items: ["JSP", "jQuery", "Bootstrap 5", "Chart.js"] },
      { category: "Infrastructure", items: ["Tomcat", "MySQL", "Apache HTTPD", "SSL"] },
    ],
    challenges: [
      "Session fixation and hijacking prevention: implemented secure session config with HttpOnly, Secure, SameSite",
      "Role-based URL access with method-level security: used @PreAuthorize with SpEL expressions",
      "Concurrent inventory updates during flash sales: used database row locking with @Lock",
    ],
    outcomes: [
      "Zero security incidents in 2 years",
      "Admin can manage 500+ products efficiently",
      "Session management handles 10k+ concurrent users",
    ],
    links: {
      live: "https://ankits-fusion-wear.netlify.app",
      github: "https://github.com/AnkitDeshpande/Fusion-Wear",
    },
    images: {
      hero: "/images/projects/fusion-wear/hero.png",
      screenshots: [],
    },
    featured: false,
  },
  {
    slug: "skyway-finder",
    title: "SkyWay Finder",
    summary: "Flight booking system with console-based interface for search, comparison, and reservations",
    description: "Java-based desktop application for travel agents to search flights, compare prices across airlines, and manage bookings. Console-driven UI with menu navigation.",
    problem: "Travel agencies needed offline-capable tool for flight booking without web dependency. Existing tools were expensive SaaS with per-seat fees.",
    solution: "Built standalone Java Swing application with embedded H2 database. Integrated mock airline APIs for demonstration. Implemented booking workflow with PNR generation, cancellation, and itinerary printing.",
    role: "Java Developer",
    teamSize: 1,
    duration: "4 weeks",
    tech: [
      { category: "Backend", items: ["Java 11", "Swing", "H2 Database", "Hibernate"] },
      { category: "Testing", items: ["JUnit 5", "Mockito", "TestFX"] },
    ],
    challenges: [
      "Complex flight search with multi-city, flexible dates: implemented graph-based routing algorithm",
      "Offline-first architecture with sync capability: used event sourcing for local changes",
      "Printable itinerary with barcode: integrated PDF generation with iText",
    ],
    outcomes: [
      "Functional prototype for travel agency demo",
      "Demonstrates core booking domain logic",
      "Extensible for real API integration",
    ],
    links: {
      github: "https://github.com/AnkitDeshpande/SkyWay-Finder",
      demo: "https://drive.google.com/file/d/1rdKeaSh5QtqyK9Afdbee9NrSt29Xv0EH/view",
    },
    images: {
      hero: "/images/projects/skyway-finder/hero.png",
      screenshots: [],
    },
    featured: false,
  },
  {
    slug: "e-basket",
    title: "E-Basket (eBay Clone)",
    summary: "Collaborative marketplace clone with auctions, bidding, and seller dashboards: team of 5, 6 days",
    description: "Full-featured marketplace with user roles (buyer/seller/admin), auction-style listings, real-time bidding, messaging, and reputation system. Built as a team project in a hackathon-style sprint.",
    problem: "Replicate core eBay marketplace mechanics in a week with a team of 5 developers with varying experience levels.",
    solution: "Divided work by bounded contexts: Auth (me), Listings, Bidding, Messaging, Admin. Used shared component library and API contract. Coordinated via GitHub Projects and daily standups.",
    role: "Backend Lead / Auth & User Management",
    teamSize: 5,
    duration: "6 days",
    tech: [
      { category: "Backend", items: ["Node.js", "Express", "Socket.io", "MongoDB", "JWT"] },
      { category: "Frontend", items: ["React", "Redux Toolkit", "Tailwind CSS", "React Hook Form"] },
      { category: "Real-time", items: ["Socket.io", "Redis Pub/Sub"] },
      { category: "Infrastructure", items: ["Docker Compose", "Netlify", "Railway"] },
    ],
    challenges: [
      "Real-time bidding with race condition prevention: used Redis atomic operations + Socket.io rooms",
      "Team coordination with merge conflicts: established trunk-based development with feature flags",
      "Auction timer sync across clients: server-authoritative countdown with WebSocket broadcast",
    ],
    outcomes: [
      "Delivered working marketplace in 6 days",
      "Supports 50+ concurrent bidders per auction",
      "Team learned full-stack collaboration workflows",
      "Won 'Best Team Project' in cohort",
    ],
    links: {
      live: "https://stellar-faloodeh-015224.netlify.app",
      github: "https://github.com/Abhishek47619/E-Basket",
    },
    images: {
      hero: "/images/projects/e-basket/hero.png",
      screenshots: [],
    },
    featured: false,
  },
  {
    slug: "snake-and-apple",
    title: "Snake and Apple",
    summary: "Desktop arcade game in Java Swing with a hand-drawn UI, custom game loop, and persistent high scores",
    description: "A from-scratch recreation of the classic snake arcade game, built as a desktop application. Every part of the runtime is written by hand: the game loop, the collision model, the renderer, and the input handling.",
    problem: "Most beginner Java games lean on a game engine or a tutorial scaffold, which hides how frame timing, input polling, and repainting actually work. I wanted to understand the machinery underneath.",
    solution: "Built a fixed-timestep loop on a Swing Timer, kept the game state in a single mutable model class, and painted the board through a custom JPanel. Input is polled into a direction queue so rapid key presses cannot reverse the snake into itself.",
    role: "Solo developer",
    teamSize: 1,
    duration: "2 weeks",
    tech: [
      { category: "Language", items: ["Java 8"] },
      { category: "UI", items: ["Java Swing", "AWT", "Java2D"] },
      { category: "Tooling", items: ["Maven", "IntelliJ IDEA", "Git"] },
    ],
    architecture: `graph TD
    Timer[Swing Timer 60Hz] --> Loop[Game Loop]
    Loop --> Update[Update State]
    Update --> Collision[Collision Detection]
    Update --> Spawn[Apple Spawn]
    Collision --> Model[(Game State)]
    Spawn --> Model
    Model --> Paint[Custom JPanel paintComponent]
    Keys[KeyListener] --> DirQueue[Direction Queue]
    DirQueue --> Update`,
    challenges: [
      "Frame timing drift on slower machines: moved to a fixed-timestep loop decoupled from repaint speed",
      "Reverse-into-self bug from buffered key presses: added a direction queue that rejects 180 degree turns",
      "Flicker on repaint: enabled double buffering and repainted only the changed cells",
      "Apple spawning on top of the snake body: tracked occupied cells and sampled from the remaining set",
    ],
    outcomes: [
      "Complete playable game with scoring, speed ramping, and game-over handling",
      "Persistent high score stored to a local file",
      "No third-party game engine or rendering library",
      "Became my reference implementation for game loops in later work",
    ],
    links: {
      github: "https://github.com/AnkitDeshpande/Snake-and-Apple",
    },
    images: {
      hero: "/images/projects/snake-and-apple/hero.png",
      screenshots: [],
    },
    featured: false,
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getAllProjects(): Project[] {
  return projects;
}

export function getProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}