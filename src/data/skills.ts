export interface Skill {
  name: string;
  percentage: number;
}

export interface SkillGroup {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  skills: Skill[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    title: "Frontend Developer",
    subtitle: "More than 6 months",
    icon: "Code2",
    skills: [
      { name: "HTML", percentage: 90 },
      { name: "CSS", percentage: 90 },
      { name: "JavaScript", percentage: 75 },
    ],
  },
  {
    id: "backend",
    title: "Backend Developer",
    subtitle: "More than 6 months",
    icon: "Server",
    skills: [
      { name: "Java", percentage: 90 },
      { name: "Spring Boot", percentage: 90 },
      { name: "MySQL", percentage: 90 },
      { name: "Hibernate", percentage: 80 },
    ],
  },
  {
    id: "soft",
    title: "Soft Skills",
    subtitle: "",
    icon: "Users",
    skills: [
      { name: "Communication", percentage: 95 },
      { name: "Team Collaboration", percentage: 85 },
    ],
  },
  {
    id: "additional",
    title: "Additional Courses",
    subtitle: "More than 6 months",
    icon: "BookOpen",
    skills: [
      { name: "DSA (Data Structures & Algorithms)", percentage: 80 },
      { name: "Git & GitHub", percentage: 70 },
    ],
  },
];

export const techStackRow1 = [
  { src: "/assets/svgs/html-5-svgrepo-com.svg", alt: "HTML5" },
  { src: "/assets/svgs/css-3-svgrepo-com.svg", alt: "CSS3" },
  { src: "/assets/svgs/javascript-svgrepo-com.svg", alt: "JavaScript" },
  { src: "/assets/svgs/java-svgrepo-com.svg", alt: "Java" },
  { src: "/assets/svgs/dsa.png", alt: "DSA" },
  { src: "/assets/svgs/hibernate-svgrepo-com.svg", alt: "Hibernate" },
];

export const techStackRow2 = [
  { src: "/assets/svgs/mysql-logo-svgrepo-com.svg", alt: "MySQL" },
  { src: "/assets/svgs/spring-svgrepo-com.svg", alt: "Spring" },
  { src: "/assets/svgs/aws-svgrepo-com.svg", alt: "AWS" },
  { src: "/assets/svgs/docker-svgrepo-com.svg", alt: "Docker" },
  { src: "/assets/svgs/git-svgrepo-com.svg", alt: "Git" },
  { src: "/assets/svgs/github-svgrepo-com.svg", alt: "GitHub" },
];

export const techStackRow3 = [
  { src: "/assets/svgs/jira-svgrepo-com.svg", alt: "Jira" },
  { src: "/assets/svgs/swagger-svgrepo-com.svg", alt: "Swagger" },
  { src: "/assets/svgs/postman-icon-svgrepo-com.svg", alt: "Postman" },
  { src: "/assets/svgs/rest-api.png", alt: "REST API" },
  { src: "/assets/svgs/gitlab-svgrepo-com.svg", alt: "GitLab" },
];
