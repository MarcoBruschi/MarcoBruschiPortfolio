import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Cpu, Layers, GitBranch, Shield } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getPortfolioData } from '../data/portfolioData';
import { GithubIcon } from './Icons';

gsap.registerPlugin(ScrollTrigger);

export const ChapterFlagship: React.FC = () => {
  const { lang } = useLanguage();
  const { projects } = getPortfolioData(lang);
  const flagship = projects.find((p) => p.id === 'mindagentics') || projects[0];

  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [lang]);

  const t = {
    pt: {
      tagline: 'Ambiente Espacial de Desenvolvimento com IA & Canvas Infinito',
      githubBtn: 'Ver no GitHub',
      pillar1Title: '1. Núcleo Nativo em Rust (Tauri v2)',
      pillar1Desc: 'Integração direta com ConPTY e JobObjects do Windows para gerenciamento de pseudoterminais e isolamento seguro de processos em nível de sistema operacional.',
      pillar2Title: '2. IPC de Baixa Latência (Named Pipes)',
      pillar2Desc: 'Comunicação inter-processos instantânea através de Windows Named Pipes (\\\\.\\pipe\\mindagentics-*) conectando terminais nativos e agentes de IA sem overhead de rede.',
      pillar3Title: '3. Canvas 2D Infinito em React 19',
      pillar3Desc: 'Viewport infinito com movimentação e zoom contínuo de 10% a 300% e motor físico de cabos gravitacionais com 21 pontos por curva de catenária renderizados a 60 FPS.',
      pillar4Title: '4. Motor Graphify (Grafos de Conhecimento AST)',
      pillar4Desc: 'Extração determinística da Árvore Sintática Abstrata (AST) do repositório, convertendo hierarquias de código complexas em grafos navegáveis.',
      roleLabel: 'Papel',
      stackLabel: 'Tecnologias'
    },
    en: {
      tagline: 'Spatial AI Development Workspace & Infinite Agent Canvas',
      githubBtn: 'View on GitHub',
      pillar1Title: '1. Native Rust Core (Tauri v2)',
      pillar1Desc: 'Direct integration with Windows ConPTY and JobObjects for native pseudoterminal management and secure OS-level process isolation.',
      pillar2Title: '2. Low-Latency IPC (Named Pipes)',
      pillar2Desc: 'Instant inter-process communication via Windows Named Pipes (\\\\.\\pipe\\mindagentics-*) linking native terminals and AI agents without network overhead.',
      pillar3Title: '3. Infinite 2D Canvas in React 19',
      pillar3Desc: 'Infinite viewport with continuous pan and zoom from 10% to 300% and a 21-point catenary curve gravitational cable physics engine rendered at 60 FPS.',
      pillar4Title: '4. Graphify Engine (AST Knowledge Graphs)',
      pillar4Desc: 'Deterministic extraction of repository Abstract Syntax Trees (AST), converting complex code structures into navigable force-directed graphs.',
      roleLabel: 'Role',
      stackLabel: 'Stack'
    }
  }[lang];

  return (
    <section id="mindagentics" ref={sectionRef} className="min-h-screen relative flex flex-col justify-center px-4 sm:px-6 lg:px-12 py-24 z-10 scroll-mt-16">
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-slate-100 tracking-tight">
              mindAgentics
            </h2>
            <p className="mt-2 text-sm sm:text-base font-mono text-sky-400">
              {t.tagline}
            </p>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <a
              href={flagship.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-lg bg-sky-400 hover:bg-sky-300 text-slate-950 font-bold transition-all flex items-center gap-2 shadow-md"
            >
              <GithubIcon className="w-4 h-4" />
              <span>{t.githubBtn}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Flat Architectural Layout (Light Blue Accents) */}
        <div ref={cardRef} className="rounded-xl border border-sky-500/30 bg-ink-900/85 backdrop-blur-md p-6 sm:p-10 shadow-2xl">
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-sans max-w-2xl">
            {flagship.description}
          </p>

          {/* 4 Pillars of Engineering */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 font-mono text-xs">
            <div className="pl-4 border-l-2 border-sky-400">
              <div className="flex items-center gap-2 text-sky-300 mb-1.5 font-bold text-xs uppercase tracking-wider">
                <Shield className="w-4 h-4 text-sky-400" />
                <span>{t.pillar1Title}</span>
              </div>
              <p className="text-slate-300 leading-relaxed font-sans text-xs">
                {t.pillar1Desc}
              </p>
            </div>

            <div className="pl-4 border-l-2 border-sky-400">
              <div className="flex items-center gap-2 text-sky-300 mb-1.5 font-bold text-xs uppercase tracking-wider">
                <GitBranch className="w-4 h-4 text-sky-400" />
                <span>{t.pillar2Title}</span>
              </div>
              <p className="text-slate-300 leading-relaxed font-sans text-xs">
                {t.pillar2Desc}
              </p>
            </div>

            <div className="pl-4 border-l-2 border-sky-400">
              <div className="flex items-center gap-2 text-sky-300 mb-1.5 font-bold text-xs uppercase tracking-wider">
                <Layers className="w-4 h-4 text-sky-400" />
                <span>{t.pillar3Title}</span>
              </div>
              <p className="text-slate-300 leading-relaxed font-sans text-xs">
                {t.pillar3Desc}
              </p>
            </div>

            <div className="pl-4 border-l-2 border-sky-400">
              <div className="flex items-center gap-2 text-sky-300 mb-1.5 font-bold text-xs uppercase tracking-wider">
                <Cpu className="w-4 h-4 text-sky-400" />
                <span>{t.pillar4Title}</span>
              </div>
              <p className="text-slate-300 leading-relaxed font-sans text-xs">
                {t.pillar4Desc}
              </p>
            </div>
          </div>

          {/* Stack Badges Bar */}
          <div className="mt-10 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-slate-400 text-xs uppercase">{t.stackLabel}:</span>
              {flagship.stack.map((tech, i) => (
                <span key={i} className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-slate-200 text-xs">
                  {tech}
                </span>
              ))}
            </div>

            <span className="text-slate-400 text-xs">{t.roleLabel}: {flagship.role} ({flagship.period})</span>
          </div>
        </div>
      </div>
    </section>
  );
};
