export type Language = 'pt' | 'en';

export interface Project {
  title: string;
  tagline: { pt: string; en: string };
  role: { pt: string; en: string };
  year: string;
  tech: string[];
  link: string;
  github: string;
  desc: { pt: string; en: string };
  highlights: { pt: string[]; en: string[] };
}

export interface SkillItem {
  name: string | { pt: string; en: string };
  description?: { pt: string; en: string };
  highlight?: boolean;
}

export interface SkillCategory {
  category: { pt: string; en: string };
  items: SkillItem[];
}

export const skillsData: SkillCategory[] = [
  {
    category: {
      pt: 'Back-end & Arquitetura de APIs',
      en: 'Back-end & API Architecture',
    },
    items: [
      { name: 'Node.js', highlight: true },
      { name: 'Express.js', highlight: true },
      { name: 'RESTful APIs', highlight: true },
      { 
        name: { pt: 'Arquitetura MVC', en: 'MVC Architecture' }, 
        description: { pt: 'Separação clara de responsabilidades', en: 'Clear separation of concerns' }, 
        highlight: true 
      },
      { 
        name: { pt: 'Autenticação JWT', en: 'JWT Authentication' }, 
        description: { pt: 'Tokens stateless para segurança escalável', en: 'Stateless tokens for scalable security' }, 
        highlight: true 
      },
      { 
        name: 'Bcrypt', 
        description: { pt: 'Hashing seguro de credenciais', en: 'Secure credential hashing' }, 
        highlight: true 
      },
      { 
        name: { pt: 'POO (Programação Orientada a Objetos)', en: 'OOP (Object-Oriented Programming)' }, 
        highlight: true 
      },
      { 
        name: { pt: 'Promises & Async/Await', en: 'Promises & Async/Await' }, 
        highlight: true 
      },
    ],
  },
  {
    category: {
      pt: 'Linguagens de Programação',
      en: 'Programming Languages',
    },
    items: [
      { name: 'JavaScript (ES6+)', highlight: true },
      { name: 'TypeScript', description: { pt: 'Tipagem estática e segurança em escala', en: 'Static typing and scale safety' }, highlight: true },
      { name: 'Python', description: { pt: 'Automação, POO e IA', en: 'Automation, OOP & AI' }, highlight: true },
      { name: 'Java', highlight: true },
      { name: 'C#', description: { pt: '.NET e POO robusta', en: '.NET and robust OOP' } },
      { name: 'PHP', description: { pt: 'Aplicações web e serviços dinâmicos', en: 'Web applications and dynamic services' } },
      { name: 'HTML5 & CSS3', highlight: true },
    ],
  },
  {
    category: {
      pt: 'Inteligência Artificial & Práticas Modernas',
      en: 'Artificial Intelligence & Modern Practices',
    },
    items: [
      { 
        name: { pt: 'Integração com LLMs / IA Generativa', en: 'LLM Integration & Generative AI' }, 
        description: { pt: 'Gemini Flash Vision, OpenAI e agentes', en: 'Gemini Flash Vision, OpenAI and agents' }, 
        highlight: true 
      },
      { 
        name: { pt: 'PDF Parsing & Higienização', en: 'PDF Parsing & Sanitization' }, 
        description: { pt: 'Extração e estruturação de documentos', en: 'Document extraction and sanitization' }, 
        highlight: true 
      },
      { 
        name: 'Git & GitHub', 
        description: { pt: 'Controle de versão, branches e PRs', en: 'Version control, branches and PRs' }, 
        highlight: true 
      },
      { 
        name: { pt: 'Clean Code & Boas Práticas', en: 'Clean Code & Best Practices' }, 
        description: { pt: 'Código legível, modular e de fácil manutenção', en: 'Maintainable, modular and readable code' }, 
        highlight: true 
      },
    ],
  },
  {
    category: {
      pt: 'Bancos de Dados & Persistência',
      en: 'Databases & Persistence',
    },
    items: [
      { 
        name: { pt: 'MySQL (Relacional)', en: 'MySQL (Relational)' }, 
        description: { pt: 'Modelagem, transações e queries parametrizadas', en: 'Modeling, transactions and parameterized queries' }, 
        highlight: true 
      },
      { 
        name: { pt: 'MongoDB (NoSQL)', en: 'MongoDB (NoSQL)' }, 
        description: { pt: 'Documentos dinâmicos e Mongoose ORM', en: 'Dynamic documents and Mongoose ORM' }, 
        highlight: true 
      },
    ],
  },
  {
    category: {
      pt: 'Front-end & Interfaces',
      en: 'Front-end & User Interfaces',
    },
    items: [
      { 
        name: 'React.js & JSX', 
        description: { pt: 'Componentes reativos e estado gerenciado', en: 'Reactive components and managed state' }, 
        highlight: true 
      },
      { 
        name: { pt: 'Consumo Assíncrono de APIs', en: 'Asynchronous API Consumption' }, 
        description: { pt: 'Fetch, Axios e tratamento de respostas', en: 'Fetch, Axios and response handling' }, 
        highlight: true 
      },
      { 
        name: { pt: 'UI Responsiva & Flexbox/Grid', en: 'Responsive UI & Flexbox/Grid' }, 
        highlight: true 
      },
      { 
        name: 'Bootstrap 5 & Tailwind CSS', 
        highlight: true 
      },
    ],
  },
];

export const projectsData: Project[] = [
  {
    title: 'PRISM',
    tagline: {
      pt: 'Transformador Espacial 3D com Raciocínio Multimodal',
      en: '3D Spatial Architecture Transformer with Multimodal Reasoning',
    },
    role: {
      pt: 'Desenvolvedor Full Stack',
      en: 'Full Stack Developer',
    },
    year: '2026',
    tech: ['TypeScript', 'Gemini 2.5 Flash Vision', 'Three.js', 'WebGL', 'Next.js', 'React.js', 'Prisma', 'PostgreSQL', 'Redis'],
    link: 'https://prism-six-eta.vercel.app/',
    github: 'https://github.com/MarcoBruschi/3d-diagram-transformer',
    desc: {
      pt: 'Plataforma de ponta que converte diagramas de arquitetura 2D desenhados à mão, arquivos Draw.io, Mermaid ou manifests Docker em gêmeos digitais 3D interativos a 60 FPS com raciocínio espacial e feixes de telemetria.',
      en: 'Cutting-edge platform that turns flat 2D hand-drawn architectures, Draw.io diagrams, Mermaid files or Docker manifests into interactive 60 FPS 3D digital twins using Gemini spatial reasoning and telemetry beams.',
    },
    highlights: {
      pt: [
        'Interpretação visual de arquiteturas com Google Gemini 2.5 Flash Vision',
        'Renderização cinemática em Three.js/WebGL2 a 60 FPS',
        'Mapeamento de topologias de microsserviços em malhas volumétricas',
      ],
      en: [
        'Visual architectural parsing via Google Gemini 2.5 Flash Vision',
        'Cinematic Three.js/WebGL2 rendering at 60 FPS',
        'Volumetric mesh mapping for microservice cloud topologies',
      ],
    },
  },
  {
    title: 'Docguard',
    tagline: {
      pt: 'Auditoria de Conformidade e Riscos Contratuais com IA',
      en: 'AI-Powered Contract Compliance & Legal Risk Auditing',
    },
    role: {
      pt: 'Desenvolvedor Full Stack',
      en: 'Full Stack Developer',
    },
    year: '2026',
    tech: ['Node.js', 'Express.js', 'React.js', 'MySQL', 'LLM Integration', 'PDF Parsing'],
    link: 'https://github.com/MarcoBruschi/docguard',
    github: 'https://github.com/MarcoBruschi/docguard',
    desc: {
      pt: 'Solução corporativa para automação de análise jurídica preventiva. Extrai dados não estruturados de arquivos contratuais em PDF e emprega modelos de linguagem para identificar cláusulas abusivas e inconformidades regulatórias.',
      en: 'Enterprise solution for automated proactive legal analysis. Extracts unstructured text from contractual PDFs and harnesses LLMs to detect critical liability clauses and compliance flaws.',
    },
    highlights: {
      pt: [
        'Pipeline resiliente de parsing e higienização de arquivos PDF complexos',
        'Modelagem relacional MySQL para auditoria, histórico e controle transacional',
        'Detecção inteligente de cláusulas de risco gerando relatórios consolidados',
      ],
      en: [
        'Resilient PDF parsing and text sanitization pipeline for raw documents',
        'Relational MySQL model ensuring audit trails and transactional safety',
        'AI clause risk classification producing standardized audit reports',
      ],
    },
  },
  {
    title: 'ComuniAvisa2',
    tagline: {
      pt: 'Plataforma Desacoplada de Gestão de Avisos e Ocorrências',
      en: 'Decoupled Community Notice & Incident Management System',
    },
    role: {
      pt: 'Desenvolvedor Full Stack',
      en: 'Full Stack Developer',
    },
    year: '2026',
    tech: ['Node.js', 'Express.js', 'React.js', 'MongoDB', 'JWT Auth', 'Bcrypt'],
    link: 'https://github.com/MarcoBruschi/comuniAvisa2',
    github: 'https://github.com/MarcoBruschi/comuniAvisa2',
    desc: {
      pt: 'Arquitetura RESTful stateless moderna construída com Express e Node.js conectada a um SPA React. Garante controle de acesso robusto através de tokens JWT e criptografia de senhas via Bcrypt, com banco NoSQL MongoDB otimizado.',
      en: 'Modern stateless RESTful architecture built with Express and Node.js connected to a React SPA. Implements secure role-based JWT authentication, bcrypt hash protection, and indexed MongoDB collections for fast reads.',
    },
    highlights: {
      pt: [
        'Autenticação stateless com JWT e hashing seguro com Bcrypt',
        'Estruturação de esquemas flexíveis com Mongoose em MongoDB indexado',
        'Consumo de API otimizado com rotas protegidas e tratamento de erros centralizado',
      ],
      en: [
        'Stateless JWT authentication and bcrypt password protection',
        'Flexible document schemas with indexed Mongoose collections',
        'Protected REST routes with unified error handling and React client integration',
      ],
    },
  },
  {
    title: 'WiseBot',
    tagline: {
      pt: 'Orquestração de Automação & Bot Service',
      en: 'Automation Orchestration & Bot Service',
    },
    role: {
      pt: 'Desenvolvedor Back-end',
      en: 'Back-end Developer',
    },
    year: '2025',
    tech: ['JavaScript', 'Node.js', 'APIs Assíncronas', 'Event-Driven'],
    link: 'https://github.com/MarcoBruschi/WiseBot',
    github: 'https://github.com/MarcoBruschi/WiseBot',
    desc: {
      pt: 'Serviço autônomo baseado em eventos para despacho de mensagens e automação de fluxos operacionais, consumindo APIs externas com processamento assíncrono e tolerância a falhas.',
      en: 'Event-driven automated service for message dispatching and operational workflows, consuming third-party APIs with asynchronous processing and fault tolerance.',
    },
    highlights: {
      pt: [
        'Arquitetura dirigida a eventos e execução assíncrona robusta',
        'Consumo e integração com endpoints de comunicação externa',
      ],
      en: [
        'Event-driven architecture with robust asynchronous task handling',
        'Integration and consumption of third-party communications endpoints',
      ],
    },
  },
  {
    title: 'Gerenciador de Usuários',
    tagline: {
      pt: 'API RESTful Segura com Queries Parametrizadas & MySQL',
      en: 'Secure RESTful CRUD API with Parameterized Queries & MySQL',
    },
    role: {
      pt: 'Desenvolvedor Back-end',
      en: 'Back-end Developer',
    },
    year: '2025',
    tech: ['Node.js', 'Express.js', 'MySQL'],
    link: 'https://github.com/MarcoBruschi/Gerenciador-de-usuarios',
    github: 'https://github.com/MarcoBruschi/Gerenciador-de-usuarios',
    desc: {
      pt: 'Aplicação exemplar de arquitetura MVC para gerenciamento e persistência de dados de usuários, com validação de payload, queries parametrizadas contra injeção SQL e respostas HTTP padronizadas.',
      en: 'Exemplary MVC architecture for user entity persistence, featuring payload validation, SQL injection prevention through parameterized queries, and standardized HTTP responses.',
    },
    highlights: {
      pt: [
        'Implementação rigorosa de padrões RESTful e códigos de status HTTP',
        'Queries parametrizadas garantindo segurança relacional no MySQL',
      ],
      en: [
        'Strict RESTful standard adherence and HTTP status hygiene',
        'Parameterized SQL queries preventing injection vulnerabilities',
      ],
    },
  },
];

export const siteContent = {
  pt: {
    nav: {
      specs: 'Competências',
      deployments: 'Projetos',
      academic: 'Formação',
      contact: 'Contato',
    },
    hero: {
      badge: 'Disponível para Estágio em Engenharia de Software',
      location: 'Curitiba – PR, Brasil',
      subtitle: 'Estudante de Engenharia de Software (PUCPR) • Desenvolvedor Full Stack',
      pitch:
        'Construo arquiteturas back-end resilientes, APIs RESTful seguras e plataformas com integração avançada de Inteligência Artificial. Foco rigoroso em Clean Code, modelagem relacional/NoSQL e padrões arquiteturais.',
      ctaPrimary: 'Iniciar Contato',
      ctaSecondary: 'Ver Projetos ↓',
      githubStatus: 'GitHub Pro • 18 anos',
    },
    specs: {
      tag: '01 // COMPETÊNCIAS TÉCNICAS',
      subtag: 'STACKS E ARQUITETURAS',
    },
    deployments: {
      tag: '02 // PROJETOS',
      subtag: 'PROJETOS PESSOAIS',
      viewCode: 'Código no GitHub',
      accessLive: 'Acessar Projeto',
      highlightsLabel: 'Pontos de Destaque:',
    },
    academic: {
      tag: '03 // FORMAÇÃO',
      subtag: 'PUCPR & 230H+ ALURA',
      university: {
        name: 'Pontifícia Universidade Católica do Paraná (PUCPR)',
        degree: 'Bacharelado em Engenharia de Software',
        period: '4º Período • 2025 – 2028 (Previsão: Dez/2028)',
        disciplines:
          'Disciplinas-chave: Programação Orientada a Objetos, Design de Software, Desenvolvimento Web, Arquitetura de Banco de Dados, Segurança da Informação, Qualidade de Software, Engenharia de Requisitos.',
      },
      certifications: {
        title: 'Certificações Alura (230h+ Comprovadas)',
        verifyBtn: 'Ver Certificado Oficial Alura',
        items: [
          'Formação JavaScript com Foco no Back-End & Node.js (42h)',
          'Formação HTML5, CSS3 e Layouts Responsivos Mobile-First (51h)',
          'Formação Python com Orientação a Objetos & Consumo de APIs (22h)',
          'React: Desenvolvimento com JavaScript e Componentes JSX (20h)',
          'C#: Fundamentos e Programação Orientada a Objetos (16h)',
        ],
      },
      languages: {
        title: 'Idiomas',
        en: 'Inglês: Fluente (conversação, leitura e escrita técnica)',
        pt: 'Português: Nativo',
      },
    },
    contact: {
      tag: '04 // CONTATO',
      subtag: 'DIRECT CHANNELS',
      heading: 'Vamos construir software robusto juntos.',
      subheading:
        'Aberto para oportunidades de estágio em Engenharia de Software ou Desenvolvimento Full Stack.',
      copySuccess: 'Copiado para a área de transferência!',
      phone: '(66) 99281-4141',
      email: 'mabruschi02@gmail.com',
      footer: '© {year} Marco Antônio Silva Bruschi. Curitiba – PR, Brasil.',
    },
  },
  en: {
    nav: {
      specs: 'Skills',
      deployments: 'Projects',
      academic: 'Education',
      contact: 'Contact',
    },
    hero: {
      badge: 'Available for Software Engineering Internships',
      location: 'Curitiba – PR, Brazil',
      subtitle: 'Software Engineering Student (PUCPR) • Full Stack Developer',
      pitch:
        'Building resilient back-end architectures, secure RESTful APIs, and cutting-edge platforms with Artificial Intelligence integration. Grounded in Clean Code, relational/NoSQL modeling, and architectural patterns.',
      ctaPrimary: 'Initiate Contact',
      ctaSecondary: 'View Projects ↓',
      githubStatus: 'GitHub Pro • 18 years old',
    },
    specs: {
      tag: '01 // TECHNICAL SKILLS',
      subtag: 'STACKS & ARCHITECTURES',
    },
    deployments: {
      tag: '02 // PROJECTS',
      subtag: 'PERSONAL PROJECTS',
      viewCode: 'GitHub Source',
      accessLive: 'Live Demo',
      highlightsLabel: 'Key Engineering Highlights:',
    },
    academic: {
      tag: '03 // EDUCATION',
      subtag: 'PUCPR & 230H+ ALURA',
      university: {
        name: 'Pontifícia Universidade Católica do Paraná (PUCPR)',
        degree: 'Bachelor of Science in Software Engineering',
        period: '4th Semester • 2025 – 2028 (Expected: Dec/2028)',
        disciplines:
          'Key coursework: Object-Oriented Programming, Software Design, Web Development, Database Architecture, Information Security, Software Quality, Requirements Engineering.',
      },
      certifications: {
        title: 'Alura Career Tracks (230h+ Verified)',
        verifyBtn: 'Verify Official Alura Credential',
        items: [
          'JavaScript for Back-End & Node.js Career Track (42h)',
          'HTML5, CSS3 and Mobile-First Responsive Layouts (51h)',
          'Python with Object-Oriented Programming & API Consumption (22h)',
          'React: Component Architecture & JSX Development (20h)',
          'C#: Fundamentals and Object-Oriented Programming (16h)',
        ],
      },
      languages: {
        title: 'Languages',
        en: 'English: Fluent (technical writing, conversational, reading)',
        pt: 'Portuguese: Native',
      },
    },
    contact: {
      tag: '04 // CONTACT',
      subtag: 'DIRECT CHANNELS',
      heading: "Let's build resilient systems together.",
      subheading:
        'Open for internship opportunities in Software Engineering or Full Stack Development.',
      copySuccess: 'Copied to clipboard!',
      phone: '+55 (66) 99281-4141',
      email: 'mabruschi02@gmail.com',
      footer: '© {year} Marco Antônio Silva Bruschi. Curitiba – PR, Brazil.',
    },
  },
};
