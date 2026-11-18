import { PersonalInfo, Project, SkillCategory, EducationData } from '../types/portfolio';

// =============================================================================
// PORTUGUÊS (PT-BR)
// =============================================================================
export const personalInfoPT: PersonalInfo = {
  name: "Marco Antônio Bruschi",
  location: "Curitiba – PR, Brasil",
  phone: "(66) 99281-4141",
  email: "mabruschi02@gmail.com",
  linkedin: "https://linkedin.com/in/marcoantoniobruschi",
  github: "https://github.com/MarcoBruschi",
  isGithubPro: true,
  age: 20,
  roleObjective: "Estágio em Engenharia de Software / Desenvolvimento Full Stack (Curitiba – PR ou Remoto)",
  languages: [
    { language: "Inglês", proficiency: "Fluente" },
    { language: "Português", proficiency: "Nativo" }
  ],
  summary: "Estudante de Engenharia de Software na PUCPR (4º período) com sólida base em lógica de programação, orientação a objetos e desenvolvimento web full stack. Experiência prática na construção de APIs RESTful seguras e integração de inteligência artificial (LLMs) utilizando Node.js, Express, React, Python, C#, MySQL e MongoDB. Domínio de padrões arquiteturais (MVC), boas práticas (Clean Code) e controle de acesso com JWT. Inglês fluente e facilidade comprovada de autoaprendizagem contínua. Em busca de oportunidade de estágio em Engenharia ou Desenvolvimento de Software."
};

export const projectsPT: Project[] = [
  {
    id: "mindagentics",
    title: "mindAgentics",
    tagline: "Ambiente Espacial de Desenvolvimento com IA & Canvas Infinito",
    role: "Arquiteto de Sistemas & Frontend",
    period: "2026",
    featured: true,
    repoUrl: "https://github.com/MarcoBruschi/mindAgentics",
    stack: [
      "Rust (Tokio, portable-pty, ConPTY)",
      "Tauri v2",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Jotai",
      "Graphify (Grafos de Conhecimento AST)"
    ],
    description: "Ambiente espacial bidimensional de alta performance onde engenheiros de software e múltiplos agentes autônomos de inteligência artificial colaboram em tempo real. Inclui emuladores de terminal nativos, conexões por cabos com simulação de física de catenária sobre Windows Named Pipes e grafos de conhecimento determinísticos de código.",
    highlights: [
      "Núcleo nativo em Rust com Tauri v2, integrando ConPTY e JobObjects do Windows para isolamento seguro de processos.",
      "Comunicação entre processos de baixa latência via Named Pipes (\\\\.\\pipe\\mindagentics-*).",
      "Canvas 2D infinito em React 19 com movimentação contínua (10% a 300%) e física gravitacional de 21 pontos por cabo.",
      "Motor Graphify para extração determinística da Árvore Sintática Abstrata (AST) do projeto em grafos navegáveis."
    ]
  },
  {
    id: "docguard",
    title: "Docguard",
    tagline: "Auditoria de Conformidade e Riscos Contratuais com IA",
    role: "Desenvolvedor Full Stack",
    period: "2026",
    repoUrl: "https://github.com/MarcoBruschi/docguard",
    stack: [
      "Node.js",
      "Express.js",
      "React.js",
      "MySQL",
      "Integração com LLMs",
      "Processamento de Arquivos PDF"
    ],
    description: "Plataforma corporativa desenvolvida para automação de análise jurídica preventiva. Extrai dados não estruturados de arquivos contratuais complexos em formato PDF e orquestra modelos de linguagem para identificar cláusulas de risco e inconformidades regulatórias.",
    highlights: [
      "Processamento resiliente de extração e higienização de arquivos PDF não estruturados.",
      "Modelagem relacional no MySQL assegurando trilha de auditoria, histórico e controle transacional de análises.",
      "Classificação automatizada de severidade de cláusulas gerando relatórios consolidados para tomada de decisão jurídica."
    ]
  },
  {
    id: "comuniavisa2",
    title: "ComuniAvisa 2",
    tagline: "Plataforma Desacoplada de Gestão de Avisos e Ocorrências",
    role: "Desenvolvedor Full Stack",
    period: "2026",
    repoUrl: "https://github.com/MarcoBruschi/comuniAvisa2",
    stack: [
      "Node.js",
      "Express.js",
      "React.js (SPA)",
      "MongoDB",
      "Mongoose",
      "Autenticação com JWT",
      "Bcrypt"
    ],
    description: "Arquitetura RESTful sem estado desacoplada construída com Express e Node.js conectada a uma aplicação em página única (SPA) em React. Implementa controle de acesso rigoroso através de tokens JWT, proteção de credenciais com Bcrypt e coleções NoSQL otimizadas no MongoDB.",
    highlights: [
      "Autenticação desacoplada via tokens JWT com criptografia de senhas via rounds de salt no Bcrypt.",
      "Modelagem flexível de esquemas dinâmicos no MongoDB via Mongoose com indexação para consultas rápidas.",
      "Tratamento centralizado de erros e proteção estrita de rotas privadas na API."
    ],
    evolutionNote: "O contraste entre ComuniAvisa 1 (monólito procedural em PHP + MySQL) e ComuniAvisa 2 (SPA React + API Node.js sem estado + JWT + MongoDB) evidencia uma jornada clara de maturidade técnica, migração de paradigmas e foco em segurança e desacoplamento."
  },
  {
    id: "bistecone-games",
    title: "Jogos para o Streamer Bistecone",
    tagline: "Dois jogos personalizados desenvolvidos e jogados ao vivo em transmissões",
    role: "Desenvolvedor de Jogos & Lógica de Gameplay",
    period: "2023 – 2024",
    hideRepo: true,
    videos: [
      {
        title: "Bistecone em busca do colchao",
        year: "2023",
        watchUrl: "https://www.youtube.com/watch?v=gElLihKQyHw&t=1760s&pp=ygUdYmlzdGVjb25lZSBlbSBidXNjYSBkbyB0aWdyYW8%3D",
        embedUrl: "https://www.youtube-nocookie.com/embed/gElLihKQyHw?start=1760&mute=1&autoplay=0"
      },
      {
        title: "Bistene em busca do tigrao",
        year: "2024",
        watchUrl: "https://www.youtube.com/watch?v=l_CwXTSpUmU&t=140s",
        embedUrl: "https://www.youtube-nocookie.com/embed/l_CwXTSpUmU?start=140&mute=1&autoplay=0"
      }
    ],
    stack: [
      "Lógica de Jogos",
      "Game Design",
      "Física 2D & Colisão",
      "Animação & Efeitos",
      "Engajamento em Tempo Real"
    ],
    description: "Criação e programação de dois jogos digitais interativos desenvolvidos sob medida para o streamer e criador de conteúdo Bistecone: 'Bistecone em busca do colchao' (2023) e 'Bistene em busca do tigrao' (2024). Ambos os projetos foram jogados e transmitidos ao vivo em lives para milhares de espectadores simultâneos.",
    highlights: [
      "Desenvolvimento completo da máquina de estados do jogo, física 2D, movimentação, hitboxes e progressão de fases.",
      "Jogados e validados ao vivo pelo streamer Bistecone com recepção positiva e grande engajamento da comunidade do chat.",
      "Game design e curva de dificuldade balanceados especificamente para o ritmo de entretenimento e reações em transmissões ao vivo."
    ]
  },
  {
    id: "comuniavisa1",
    title: "ComuniAvisa (v1)",
    tagline: "Plataforma Web Comunitária & Gestão de Alertas e Serviços Locais",
    role: "Desenvolvedor Web / Back-end & Modelagem de Dados",
    period: "2025",
    repoUrl: "https://github.com/MarcoBruschi/comuniAvisa",
    stack: [
      "PHP 7.4+",
      "MySQL / MariaDB",
      "JavaScript (Vanilla JS)",
      "Bootstrap 5",
      "HTML5 & CSS3",
      "Fetch API"
    ],
    description: "Plataforma desenvolvida para colaboração comunitária na PUCPR (2º período da disciplina de Desenvolvimento Web), permitindo aos usuários compartilhar alertas locais, serviços, workshops e monitorias.",
    highlights: [
      "Modelagem relacional normalizada com 6 tabelas no MySQL (usuario, alerta, monitoria, workshop, conteudo_educativo, servico).",
      "Autenticação e persistência de estado via controle de sessões em PHP nativo.",
      "Interface responsiva com Bootstrap consumindo endpoints PHP de forma assíncrona com fetch."
    ]
  },
  {
    id: "wisebot",
    title: "WiseBot",
    tagline: "Microsserviço de Automação & Bot Orientado a Eventos",
    role: "Desenvolvedor Back-end",
    period: "2025",
    repoUrl: "https://github.com/MarcoBruschi/WiseBot",
    stack: [
      "JavaScript",
      "Node.js",
      "APIs Assíncronas",
      "Arquitetura Dirigida a Eventos",
      "Webhooks"
    ],
    description: "Serviço autônomo baseado em eventos para despacho de mensagens e automação de fluxos operacionais, consumindo APIs externas com processamento assíncrono e tolerância a falhas.",
    highlights: [
      "Arquitetura dirigida a eventos e despacho assíncrono com tolerância a falhas.",
      "Integração resiliente com webhooks e endpoints de mensageria externa."
    ]
  }
];

export const skillCategoriesPT: SkillCategory[] = [
  {
    title: "Linguagens de Programação",
    skills: [
      { name: "JavaScript (ES6+)", level: "", detail: "Promises, Async/Await, Event Loop, V8 runtime" },
      { name: "TypeScript", level: "", detail: "Tipagem estática estrita, interfaces genéricas e monorepos" },
      { name: "Python", level: "", detail: "POO, automação, scripts analíticos e orquestração de IA" },
      { name: "Rust", level: "", detail: "ConPTY, Tokio assíncrono, Named Pipes e Tauri v2" },
      { name: "C# (.NET)", level: "", detail: "Fundamentos orientados a objetos e back-end estruturado" },
      { name: "Java", level: "", detail: "POO, concorrência e estruturas de dados" },
      { name: "PHP", level: "", detail: "Desenvolvimento web procedural e modelagem relacional" },
      { name: "HTML5 & CSS3", level: "", detail: "Semântica, Flexbox, CSS Grid e layouts responsivos" }
    ]
  },
  {
    title: "Back-end & Arquitetura",
    skills: [
      { name: "Node.js & Express.js", level: "", detail: "Construção de APIs RESTful escaláveis, middlewares e roteamento" },
      { name: "Arquitetura MVC", level: "", detail: "Separação estrita de responsabilidades (Model, View, Controller)" },
      { name: "Autenticação Stateless (JWT)", level: "", detail: "Tokens JWT e proteção criptográfica de credenciais com Bcrypt" },
      { name: "Clean Code & Boas Práticas", level: "", detail: "Código modular, legível, desacoplado e orientado a manutenção" },
      { name: "Arquiteturas Event-Driven", level: "", detail: "Webhooks, despacho assíncrono e pipes IPC de baixa latência" }
    ]
  },
  {
    title: "Bancos de Dados & Persistência",
    skills: [
      { name: "MySQL (Relacional)", level: "", detail: "Modelagem normalizada, integridade referencial, transações ACID e prepared statements" },
      { name: "MongoDB (NoSQL)", level: "", detail: "Modelagem de documentos com Mongoose ORM e indexação de coleções" },
      { name: "PostgreSQL & Prisma", level: "", detail: "Schemas relacionais tipados e migrations estruturadas" }
    ]
  },
  {
    title: "Front-end & Interfaces",
    skills: [
      { name: "React.js & Next.js", level: "", detail: "React 19, componentes funcionais, hooks customizados e SPAs desacopladas" },
      { name: "Three.js & WebGL2", level: "", detail: "Gaussian Surfels, shaders GLSL customizados e computação visual 3D" },
      { name: "GSAP (GreenSock)", level: "", detail: "Animações fluidas, timelines coordenadas e ScrollTrigger" },
      { name: "Tailwind CSS", level: "", detail: "Design systems consistentes e interfaces responsivas" },
      { name: "Jotai", level: "", detail: "Gerenciamento de estado atômico reativo de baixa latência" }
    ]
  },
  {
    title: "Inteligência Artificial & Ferramentas",
    skills: [
      { name: "Integração de LLMs", level: "", detail: "Consumo de modelos de linguagem em fluxos de produto e automação" },
      { name: "Engenharia de Dados & Parsing", level: "", detail: "Extração, higienização e processamento resiliente de documentos PDF complexos" },
      { name: "Git, GitHub & DevOps", level: "", detail: "Controle de versão, branches, pull requests e Docker manifests" }
    ]
  }
];

export const educationDataPT: EducationData = {
  institution: "Pontifícia Universidade Católica do Paraná (PUCPR)",
  degree: "Bacharelado em Engenharia de Software",
  period: "2025 – 2028 (4º Período)",
  expectedGraduation: "Dezembro/2028",
  location: "Câmpus Curitiba – PR, Brasil",
  keySubjects: [
    "Programação Orientada a Objetos (POO)",
    "Design de Software & Padrões Arquiteturais",
    "Desenvolvimento Web Full Stack",
    "Arquitetura de Banco de Dados Relacional e NoSQL",
    "Segurança da Informação & Criptografia",
    "Qualidade e Testes de Software",
    "Engenharia de Requisitos"
  ],
  certificationHours: "230h+",
  aluraCertUrl: "https://cursos.alura.com.br/user/mabruschi02/fullCertificate/7eee1002aa1bc01a3bdac2261dee3f70",
  certifications: [
    { title: "Formação HTML5, CSS3 e Layouts Responsivos Mobile-First", hours: "51h" },
    { title: "Formação JavaScript com Foco no Back-End & Node.js", hours: "42h" },
    { title: "Formação Python com Orientação a Objetos & Consumo de APIs", hours: "22h" },
    { title: "React: Desenvolvimento com JavaScript e Componentes JSX", hours: "20h" },
    { title: "C#: Fundamentos e Programação Orientada a Objetos", hours: "16h" }
  ]
};

// =============================================================================
// ENGLISH (EN)
// =============================================================================
export const personalInfoEN: PersonalInfo = {
  name: "Marco Antônio Bruschi",
  location: "Curitiba – PR, Brazil",
  phone: "(66) 99281-4141",
  email: "mabruschi02@gmail.com",
  linkedin: "https://linkedin.com/in/marcoantoniobruschi",
  github: "https://github.com/MarcoBruschi",
  isGithubPro: true,
  age: 20,
  roleObjective: "Software Engineering / Full Stack Development Internship (Curitiba – PR or Remote)",
  languages: [
    { language: "English", proficiency: "Fluent" },
    { language: "Portuguese", proficiency: "Native" }
  ],
  summary: "Software Engineering student at PUCPR (4th semester) with a solid foundation in programming logic, object-oriented programming, and full-stack web development. Hands-on experience building secure RESTful APIs and integrating artificial intelligence (LLMs) using Node.js, Express, React, Python, C#, MySQL, and MongoDB. Proficient in architectural patterns (MVC), best practices (Clean Code), and access control with JWT. Fluent in English with a proven ability for continuous self-learning. Seeking an internship opportunity in Software Engineering or Software Development."
};

export const projectsEN: Project[] = [
  {
    id: "mindagentics",
    title: "mindAgentics",
    tagline: "Spatial AI Development Workspace & Infinite Agent Canvas",
    role: "Core Systems & Frontend Architect",
    period: "2026",
    featured: true,
    repoUrl: "https://github.com/MarcoBruschi/mindAgentics",
    stack: [
      "Rust (Tokio, portable-pty, ConPTY)",
      "Tauri v2",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Jotai",
      "Graphify (AST Knowledge Graphs)"
    ],
    description: "High-performance two-dimensional spatial workspace where software engineers and multiple autonomous AI agents collaborate in real time. Features native terminal emulators, cable connections with catenary curve physics simulation over Windows Named Pipes, and deterministic code knowledge graphs.",
    highlights: [
      "Native Rust core with Tauri v2, integrating Windows ConPTY and JobObjects for secure OS-level process isolation.",
      "Low-latency inter-process communication via Windows Named Pipes (\\\\.\\pipe\\mindagentics-*).",
      "Infinite 2D canvas in React 19 with continuous zoom/pan (10% to 300%) and 21-point catenary cable physics at 60 FPS.",
      "Graphify engine for deterministic Abstract Syntax Tree (AST) extraction into navigable force-directed graphs."
    ]
  },
  {
    id: "docguard",
    title: "Docguard",
    tagline: "AI-Powered Contract Compliance & Legal Risk Auditing",
    role: "Full Stack Developer",
    period: "2026",
    repoUrl: "https://github.com/MarcoBruschi/docguard",
    stack: [
      "Node.js",
      "Express.js",
      "React.js",
      "MySQL",
      "LLM Integration",
      "Unstructured PDF Parsing"
    ],
    description: "Enterprise platform designed for automated preventive legal analysis. Extracts unstructured data from complex contractual PDF documents and orchestrates large language models to detect risk clauses and regulatory non-compliance.",
    highlights: [
      "Resilient ingestion pipeline for unstructured PDF parsing and sanitization.",
      "Relational modeling in MySQL ensuring full audit trails, revision history, and transactional consistency.",
      "Automated clause severity scoring generating consolidated executive reports for legal decision-making."
    ]
  },
  {
    id: "comuniavisa2",
    title: "ComuniAvisa 2",
    tagline: "Decoupled Community Alert & Incident Management Platform",
    role: "Full Stack Developer",
    period: "2026",
    repoUrl: "https://github.com/MarcoBruschi/comuniAvisa2",
    stack: [
      "Node.js",
      "Express.js",
      "React.js (SPA)",
      "MongoDB",
      "Mongoose",
      "JWT Authentication",
      "Bcrypt"
    ],
    description: "Decoupled stateless RESTful architecture built with Node.js and Express connected to a modern React Single Page Application. Enforces strict access control via JWT tokens, credential hashing with Bcrypt, and optimized NoSQL collections in MongoDB.",
    highlights: [
      "Stateless decoupled authentication via JWT tokens with salted password encryption using Bcrypt.",
      "Dynamic schema modeling in MongoDB via Mongoose with collection indexes for fast queries.",
      "Centralized error handling and strict protection of private API routes."
    ],
    evolutionNote: "The contrast between ComuniAvisa 1 (procedural PHP + MySQL monolith) and ComuniAvisa 2 (React SPA + stateless Node.js API + JWT + MongoDB) demonstrates a clear trajectory of architectural maturity, paradigm evolution, and emphasis on security."
  },
  {
    id: "bistecone-games",
    title: "Games for Streamer Bistecone",
    tagline: "Two custom digital games developed and played live on stream",
    role: "Game Developer & Gameplay Logic Programmer",
    period: "2023 – 2024",
    hideRepo: true,
    videos: [
      {
        title: "Bistecone em busca do colchao",
        year: "2023",
        watchUrl: "https://www.youtube.com/watch?v=gElLihKQyHw&t=1760s&pp=ygUdYmlzdGVjb25lZSBlbSBidXNjYSBkbyB0aWdyYW8%3D",
        embedUrl: "https://www.youtube-nocookie.com/embed/gElLihKQyHw?start=1760&mute=1&autoplay=0"
      },
      {
        title: "Bistene em busca do tigrao",
        year: "2024",
        watchUrl: "https://www.youtube.com/watch?v=l_CwXTSpUmU&t=140s",
        embedUrl: "https://www.youtube-nocookie.com/embed/l_CwXTSpUmU?start=140&mute=1&autoplay=0"
      }
    ],
    stack: [
      "Game Logic",
      "Game Design",
      "2D Physics & Collisions",
      "Animation & VFX",
      "Real-Time Interaction"
    ],
    description: "Creation and programming of two custom interactive digital games built specifically for streamer and content creator Bistecone: 'Bistecone em busca do colchao' (2023) and 'Bistene em busca do tigrao' (2024). Both titles were played and broadcast live to thousands of concurrent viewers.",
    highlights: [
      "End-to-end development of game state machines, 2D physics, player movement, hitboxes, and stage progression.",
      "Played and tested live on stream by Bistecone with high retention and lively audience engagement.",
      "Custom level design and difficulty pacing tailored for live stream reactions and entertainment."
    ]
  },
  {
    id: "comuniavisa1",
    title: "ComuniAvisa (v1)",
    tagline: "Community Web Platform for Local Notices & Services",
    role: "Web & Back-end Developer / Data Modeling",
    period: "2025",
    repoUrl: "https://github.com/MarcoBruschi/comuniAvisa",
    stack: [
      "PHP 7.4+",
      "MySQL / MariaDB",
      "JavaScript (Vanilla JS)",
      "Bootstrap 5",
      "HTML5 & CSS3",
      "Fetch API"
    ],
    description: "Platform developed for community collaboration at PUCPR (2nd semester Web Development course), enabling users to publish local alerts, academic tutoring, services, and workshops.",
    highlights: [
      "Normalized relational database with 6 tables in MySQL.",
      "Authentication and session persistence via native PHP session state.",
      "Responsive UI built with Bootstrap consuming PHP endpoints asynchronously with fetch."
    ]
  },
  {
    id: "wisebot",
    title: "WiseBot",
    tagline: "Event-Driven Automation Microservice & Bot",
    role: "Back-end Developer",
    period: "2025",
    repoUrl: "https://github.com/MarcoBruschi/WiseBot",
    stack: [
      "JavaScript",
      "Node.js",
      "Asynchronous APIs",
      "Event-Driven Architecture",
      "Webhooks"
    ],
    description: "Autonomous event-driven background service for operational message dispatch and workflow automation, communicating with third-party APIs with fault tolerance.",
    highlights: [
      "Event-driven architecture with resilient asynchronous job dispatch.",
      "Webhook and external messaging integration with automated retry routines."
    ]
  }
];

export const skillCategoriesEN: SkillCategory[] = [
  {
    title: "Programming Languages",
    skills: [
      { name: "JavaScript (ES6+)", level: "", detail: "Promises, Async/Await, Event Loop, V8 runtime" },
      { name: "TypeScript", level: "", detail: "Strict static typing, generic interfaces, and monorepos" },
      { name: "Python", level: "", detail: "OOP, automation, analytical scripting, and AI orchestration" },
      { name: "Rust", level: "", detail: "ConPTY, asynchronous Tokio, Named Pipes, and Tauri v2" },
      { name: "C# (.NET)", level: "", detail: "Object-oriented fundamentals and structured back-ends" },
      { name: "Java", level: "", detail: "OOP, concurrency patterns, and core data structures" },
      { name: "PHP", level: "", detail: "Procedural web development and relational database querying" },
      { name: "HTML5 & CSS3", level: "", detail: "Semantic markup, Flexbox, CSS Grid, and responsive design" }
    ]
  },
  {
    title: "Back-end & Architecture",
    skills: [
      { name: "Node.js & Express.js", level: "", detail: "Building scalable RESTful APIs, custom middlewares, and routing" },
      { name: "MVC Architecture", level: "", detail: "Strict separation of concerns (Model, View, Controller)" },
      { name: "Stateless Authentication (JWT)", level: "", detail: "Cryptographic credential protection with Bcrypt and JWT access tokens" },
      { name: "Clean Code & Best Practices", level: "", detail: "Modular, readable, decoupled code built for maintainability" },
      { name: "Event-Driven Architectures", level: "", detail: "Webhooks, asynchronous dispatch, and low-latency IPC pipes" }
    ]
  },
  {
    title: "Databases & Storage",
    skills: [
      { name: "MySQL (Relational)", level: "", detail: "Normalized modeling, referential integrity, ACID transactions, and prepared statements" },
      { name: "MongoDB (NoSQL)", level: "", detail: "Document modeling with Mongoose ORM and collection indexing" },
      { name: "PostgreSQL & Prisma", level: "", detail: "Typed relational schemas and structured database migrations" }
    ]
  },
  {
    title: "Front-end & Interfaces",
    skills: [
      { name: "React.js & Next.js", level: "", detail: "React 19, functional components, custom hooks, and decoupled SPAs" },
      { name: "Three.js & WebGL2", level: "", detail: "Gaussian Surfels, custom GLSL shaders, and 3D visual computing" },
      { name: "GSAP (GreenSock)", level: "", detail: "Fluid animations, coordinated timelines, and ScrollTrigger" },
      { name: "Tailwind CSS", level: "", detail: "Consistent design systems and responsive component layouts" },
      { name: "Jotai", level: "", detail: "Low-latency atomic reactive state management" }
    ]
  },
  {
    title: "Artificial Intelligence & Tools",
    skills: [
      { name: "LLM Integration", level: "", detail: "Orchestrating frontier AI models into production applications" },
      { name: "Data Engineering & Parsing", level: "", detail: "Resilient extraction and sanitization of complex PDF documents" },
      { name: "Git, GitHub & DevOps", level: "", detail: "Version control, branching workflows, pull requests, and Docker manifests" }
    ]
  }
];

export const educationDataEN: EducationData = {
  institution: "Pontifical Catholic University of Paraná (PUCPR)",
  degree: "Bachelor of Science in Software Engineering",
  period: "2025 – 2028 (4th Term)",
  expectedGraduation: "December / 2028",
  location: "Curitiba – PR, Brazil",
  keySubjects: [
    "Object-Oriented Programming (OOP)",
    "Software Design & Architectural Patterns",
    "Full Stack Web Development",
    "Relational & NoSQL Database Architecture",
    "Information Security & Cryptography",
    "Software Quality & Testing",
    "Requirements Engineering"
  ],
  certificationHours: "230h+",
  aluraCertUrl: "https://cursos.alura.com.br/user/mabruschi02/fullCertificate/7eee1002aa1bc01a3bdac2261dee3f70",
  certifications: [
    { title: "HTML5, CSS3 & Responsive Mobile-First Layouts Track", hours: "51h" },
    { title: "JavaScript for Back-End & Node.js Track", hours: "42h" },
    { title: "Object-Oriented Python & API Consumption Track", hours: "22h" },
    { title: "React: Component Architecture & JavaScript", hours: "20h" },
    { title: "C#: Fundamentals & Object-Oriented Programming", hours: "16h" }
  ]
};

// =============================================================================
// HELPER GETTER & BACKWARD COMPATIBLE EXPORTS
// =============================================================================
export const getPortfolioData = (lang: 'pt' | 'en' = 'pt') => {
  if (lang === 'en') {
    return {
      personalInfo: personalInfoEN,
      projects: projectsEN,
      skillCategories: skillCategoriesEN,
      educationData: educationDataEN
    };
  }
  return {
    personalInfo: personalInfoPT,
    projects: projectsPT,
    skillCategories: skillCategoriesPT,
    educationData: educationDataPT
  };
};

export const personalInfo = personalInfoPT;
export const projects = projectsPT;
export const skillCategories = skillCategoriesPT;
export const educationData = educationDataPT;
