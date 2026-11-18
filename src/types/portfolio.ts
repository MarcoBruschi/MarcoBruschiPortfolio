export interface ProjectVideo {
  title: string;
  year: string;
  watchUrl: string;
  embedUrl: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  role: string;
  period: string;
  featured?: boolean;
  repoUrl?: string;
  hideRepo?: boolean;
  liveUrl?: string;
  videoUrls?: { label: string; url: string }[];
  videos?: ProjectVideo[];
  stack: string[];
  description: string;
  highlights: string[];
  evolutionNote?: string;
}

export interface SkillCategory {
  title: string;
  skills: {
    name: string;
    level: string;
    detail: string;
  }[];
}

export interface Certification {
  title: string;
  hours: string;
}

export interface EducationData {
  institution: string;
  degree: string;
  period: string;
  expectedGraduation: string;
  location: string;
  keySubjects: string[];
  certificationHours: string;
  aluraCertUrl: string;
  certifications: Certification[];
}

export interface PersonalInfo {
  name: string;
  location: string;
  phone: string;
  email: string;
  linkedin: string;
  github: string;
  isGithubPro: boolean;
  age: number;
  roleObjective: string;
  languages: { language: string; proficiency: string }[];
  summary: string;
}
