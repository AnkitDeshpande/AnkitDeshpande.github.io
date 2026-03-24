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
      { name: "TypeScript", percentage: 70 },
      { name: "React", percentage: 70 },
      { name: "Redux", percentage: 65 },
    ],
  },
  {
    id: "backend",
    title: "Backend Developer",
    subtitle: "More than 2 years",
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
    subtitle: "More than 2 years",
    icon: "BookOpen",
    skills: [
      { name: "DSA (Data Structures & Algorithms)", percentage: 80 },
      { name: "Git & GitHub", percentage: 70 },
    ],
  },
];

// Backend
export const techStackRow1 = [
  { src: "/assets/svgs/java-svgrepo-com.svg", alt: "Java" },
  { src: "/assets/svgs/spring-svgrepo-com.svg", alt: "Spring Boot" },
  { src: "/assets/svgs/hibernate-svgrepo-com.svg", alt: "Hibernate" },
  { src: "/assets/svgs/mysql-logo-svgrepo-com.svg", alt: "MySQL" },
  { src: "/assets/svgs/rest-api.png", alt: "REST API" },
  { src: "/assets/svgs/dsa.png", alt: "DSA" },
];

// AWS
export const techStackRow2 = [
  { src: "/assets/svgs/aws-svgrepo-com.svg", alt: "AWS" },
  { src: "/assets/svgs/awslambda.svg", alt: "Lambda" },
  { src: "/assets/svgs/amazons3.svg", alt: "S3" },
  { src: "/assets/svgs/amazonsqs.svg", alt: "SQS" },
  { src: "/assets/svgs/awssecretsmanager.svg", alt: "Secrets Manager" },
];

// Azure
export const techStackRow3 = [
  { src: "/assets/svgs/microsoftazure.svg", alt: "Azure" },
  { src: "/assets/svgs/azurefunctions.svg", alt: "Azure Functions" },
  { src: "/assets/svgs/azure-service-bus.svg", alt: "Service Bus" },
  { src: "/assets/svgs/azure-queue.svg", alt: "Azure Queue" },
  { src: "/assets/svgs/azure-key-vault.svg", alt: "Key Vault" },
  { src: "/assets/svgs/azure-blob-storage.svg", alt: "Blob Storage" },
];

// Frontend
export const techStackRow4 = [
  { src: "/assets/svgs/html-5-svgrepo-com.svg", alt: "HTML5" },
  { src: "/assets/svgs/css-3-svgrepo-com.svg", alt: "CSS3" },
  { src: "/assets/svgs/javascript-svgrepo-com.svg", alt: "JavaScript" },
  { src: "/assets/svgs/typescript.svg", alt: "TypeScript" },
  { src: "/assets/svgs/react.svg", alt: "React" },
  { src: "/assets/svgs/redux.svg", alt: "Redux" },
];

// Tools
export const techStackRow5 = [
  { src: "/assets/svgs/docker-svgrepo-com.svg", alt: "Docker" },
  { src: "/assets/svgs/git-svgrepo-com.svg", alt: "Git" },
  { src: "/assets/svgs/github-svgrepo-com.svg", alt: "GitHub" },
  { src: "/assets/svgs/gitlab-svgrepo-com.svg", alt: "GitLab" },
  { src: "/assets/svgs/jira-svgrepo-com.svg", alt: "Jira" },
  { src: "/assets/svgs/swagger-svgrepo-com.svg", alt: "Swagger" },
  { src: "/assets/svgs/postman-icon-svgrepo-com.svg", alt: "Postman" },
];
