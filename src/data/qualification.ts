export interface QualificationEntry {
  id: number;
  title: string;
  organization: string;
  period: string;
  side: "left" | "right";
}

export const workEntries: QualificationEntry[] = [
  {
    id: 1,
    title: "Software Development Engineer",
    organization: "ZET – Credit Card App",
    period: "Feb 2026 – Present",
    side: "left",
  },
  {
    id: 2,
    title: "Software Engineer",
    organization: "Agile Soft Systems",
    period: "Dec 2023 – Aug 2025",
    side: "right",
  },
  {
    id: 3,
    title: "Assessment Assistant",
    organization: "Masai School",
    period: "Oct 2023 – Apr 2024",
    side: "left",
  },
  {
    id: 4,
    title: "Full Stack Web Developer",
    organization: "Masai School",
    period: "Oct 2022 – Oct 2023",
    side: "right",
  },
];

export const educationEntries: QualificationEntry[] = [
  {
    id: 1,
    title: "Bachelor of Vocation in Software Development",
    organization: "MIT, Aurangabad",
    period: "2018 – 2021",
    side: "left",
  },
  {
    id: 2,
    title: "Diploma (Information Technology)",
    organization: "GPC, Hingoli",
    period: "2014 – 2017",
    side: "right",
  },
  {
    id: 3,
    title: "Matriculation (Class X)",
    organization: "Mula Public School, Sonai",
    period: "2003 – 2014",
    side: "left",
  },
];
