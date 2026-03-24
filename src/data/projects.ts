export interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  image: string;
  liveUrl?: string;
  videoUrl?: string;
  repoUrl: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "The Wild Oasis",
    description:
      "Luxury cabin booking app where guests explore mountain retreats, manage profiles, and make reservations. Features advanced calendar booking, secure authentication via NextAuth, and dynamic cabin browsing.",
    techStack: ["Next.js", "Supabase", "NextAuth.js", "Tailwind CSS", "date-fns"],
    image: "/img/the-wild-oasis.png",
    liveUrl: "https://the-wild-oasis-rho-coral.vercel.app",
    repoUrl: "https://github.com/AnkitDeshpande/the-wild-oasis",
  },
  {
    id: 2,
    title: "Fast React Pizza",
    description:
      "Modern, responsive pizza ordering web app emphasising clean architecture, fast performance, and real-world frontend best practices. Order pizzas with real-time cart management.",
    techStack: ["React 19", "Vite", "Redux Toolkit", "React Router", "Tailwind CSS"],
    image: "/img/fast-react-pizza.png",
    liveUrl: "https://fast-react-pizza-six-delta.vercel.app/",
    repoUrl: "https://github.com/AnkitDeshpande/fast-react-pizza",
  },
  {
    id: 3,
    title: "Book My Bus",
    description:
      "Bus Reservation System Portal: Simplifying travel! Search, select, and reserve bus tickets seamlessly. Your journey, made easy.",
    techStack: ["HTML", "CSS", "JavaScript", "Hibernate", "Spring Boot", "MySQL"],
    image: "/img/book-my-bus.png",
    liveUrl: "https://ankits-book-my-bus.netlify.app/",
    repoUrl: "https://github.com/AnkitDeshpande/Book-My-Bus",
  },
  {
    id: 4,
    title: "Wheel Estate: Car Rental System",
    description:
      "Car Rental System: User-friendly vehicle inventory management, reservations, secure payments, and flexible pricing.",
    techStack: ["Java", "Hibernate", "MySQL"],
    image: "/img/online-car-reservation-system.png",
    videoUrl:
      "https://drive.google.com/file/d/1P0MRMwtH_fcKRHDzxVMpeUG_jbhINd2I/view?usp=sharing",
    repoUrl: "https://github.com/AnkitDeshpande/Wheel-Estate",
  },
  {
    id: 5,
    title: "Retro Walk",
    description:
      "Online fashion platform selecting the best trendy items from a variety of brands. An individual project executed in 6 days.",
    techStack: ["HTML", "CSS", "JavaScript"],
    image: "/img/asos.jpg",
    liveUrl: "https://ankits-retro-walk.netlify.app/",
    repoUrl: "https://github.com/AnkitDeshpande/RetroWalk",
  },
  {
    id: 6,
    title: "Snake and Apple",
    description:
      "Engaging and addictive game bringing back the nostalgia of classic arcade games. Players control a snake that slithers, consuming apples to grow longer.",
    techStack: ["Java", "Swing UI"],
    image: "/img/snake-and-apples.png",
    repoUrl: "https://github.com/AnkitDeshpande/Snake-and-Apple",
  },
  {
    id: 7,
    title: "Fusion Wear",
    description:
      "E-commerce website for seamless online shopping with secure payment. Features user and admin authentication with session UUID.",
    techStack: ["HTML", "CSS", "JavaScript"],
    image: "/img/fusion-wear.png",
    liveUrl: "https://ankits-fusion-wear.netlify.app/",
    repoUrl: "https://github.com/AnkitDeshpande/Fusion-Wear/tree/main/html",
  },
  {
    id: 8,
    title: "E-Basket (eBay Clone)",
    description:
      "eBay-inspired platform featuring login/signup, price sorting, cart management, coupon discounts. A collaborative project by a team of 5, executed in 6 days.",
    techStack: ["HTML", "CSS", "JavaScript"],
    image: "/img/e-basket.png",
    liveUrl: "https://stellar-faloodeh-015224.netlify.app/",
    repoUrl: "https://github.com/Abhishek47619/E-Basket",
  },
  {
    id: 9,
    title: "SkyWay Finder: Flight Booking System",
    description:
      "Java-based flight booking solution. Console-based interface to search available flights, compare prices, and make reservations with feedback and ratings.",
    techStack: ["Java", "MySQL", "Hibernate"],
    image:
      "https://user-images.githubusercontent.com/115605876/246879151-abc5e708-acb8-4fdd-80dd-289cc1d41195.png",
    videoUrl:
      "https://drive.google.com/file/d/1rdKeaSh5QtqyK9Afdbee9NrSt29Xv0EH/view?usp=sharing",
    repoUrl: "https://github.com/AnkitDeshpande/SkyWay-Finder",
  },
];
