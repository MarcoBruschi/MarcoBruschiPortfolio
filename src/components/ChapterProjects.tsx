import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Terminal, ArrowUpRight, FileCheck, Layers, Bot, GitBranch, Gamepad2, Play } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getPortfolioData } from '../data/portfolioData';
import { GithubIcon } from './Icons';

gsap.registerPlugin(ScrollTrigger);

interface ChapterProjectsProps {
  onMorphShape?: (shape: 'hyper-core' | 'helix' | 'torus-grid') => void;
}

const getProjectIcon = (id: string) => {
  if (id === 'bistecone-games') return <Gamepad2 className="w-3.5 h-3.5 text-amber-400" />;
  if (id === 'docguard') return <FileCheck className="w-3.5 h-3.5 text-sky-400" />;
  if (id === 'comuniavisa2') return <Layers className="w-3.5 h-3.5 text-sky-400" />;
  if (id === 'comuniavisa1') return <GitBranch className="w-3.5 h-3.5 text-sky-400" />;
  if (id === 'wisebot') return <Bot className="w-3.5 h-3.5 text-sky-400" />;
  return <Terminal className="w-3.5 h-3.5 text-sky-400" />;
};

export const ChapterProjects: React.FC<ChapterProjectsProps> = ({ onMorphShape }) => {
  const { lang } = useLanguage();
  const { projects } = getPortfolioData(lang);

  // Only curated projects (mindAgentics is featured as Flagship)
  const curatedProjects = projects.filter((p) => p.id !== 'mindagentics');
  const [selectedId, setSelectedId] = useState<string>(curatedProjects[0].id);

  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const activeProj = curatedProjects.find((p) => p.id === selectedId) || curatedProjects[0];

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
  }, [selectedId, lang]);

  const handleSelect = (projId: string) => {
    setSelectedId(projId);
    if (onMorphShape) {
      if (projId === 'docguard') onMorphShape('helix');
      else if (projId.includes('comuni')) onMorphShape('torus-grid');
      else onMorphShape('hyper-core');
    }
  };

  const t = {
    pt: {
      title: 'Projetos & Aplicações',
      subtitle: 'Aplicações corporativas, arquiteturas desacopladas e migração de paradigmas de back-end.',
      roleLabel: 'Papel',
      highlightsTitle: 'Destaques Técnicos & Implementação:',
      evolutionTitle: 'Nota de Evolução Arquitetural:',
      stackTitle: 'Stack Tecnológica',
      githubRepoBtn: 'Repositório no GitHub',
      videoSectionTitle: 'Transmissões ao Vivo & Gameplays (Vídeos sem Som)',
      watchOnYoutube: 'Assistir no YouTube'
    },
    en: {
      title: 'Projects & Applications',
      subtitle: 'Enterprise applications, decoupled architectures, and back-end paradigm evolution.',
      roleLabel: 'Role',
      highlightsTitle: 'Technical Highlights & Implementation:',
      evolutionTitle: 'Architectural Evolution Note:',
      stackTitle: 'Technology Stack',
      githubRepoBtn: 'GitHub Repository',
      videoSectionTitle: 'Live Stream Broadcasts & Gameplay (Muted Previews)',
      watchOnYoutube: 'Watch on YouTube'
    }
  }[lang];

  return (
    <section id="projetos" ref={sectionRef} className="min-h-screen relative flex flex-col justify-center px-4 sm:px-6 lg:px-12 py-24 z-10 scroll-mt-16">
      <div className="max-w-6xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 text-center sm:text-left">
          <div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-slate-100 tracking-tight">
              {t.title}
            </h2>
            <p className="mt-2 text-sm sm:text-base font-sans text-slate-300">
              {t.subtitle}
            </p>
          </div>
        </div>

        {/* Project Selector Ribbon */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-3 mb-6 font-mono text-xs no-scrollbar">
          {curatedProjects.map((p) => {
            const isSelected = p.id === selectedId;
            return (
              <button
                key={p.id}
                onClick={() => handleSelect(p.id)}
                className={`px-4 py-2.5 rounded-lg whitespace-nowrap transition-all flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-sky-400 text-slate-950 font-bold border-sky-400 shadow-md'
                    : 'bg-ink-900/80 text-slate-300 border-white/10 hover:border-sky-400/40 hover:text-white'
                }`}
              >
                {getProjectIcon(p.id)}
                <span>{p.title}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Project Card */}
        <div ref={cardRef} className="rounded-xl border border-white/15 bg-ink-900/85 backdrop-blur-md p-6 sm:p-10 shadow-2xl transition-all">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">
                  {activeProj.period}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {t.roleLabel}: <strong className="text-slate-200">{activeProj.role}</strong>
                </span>
              </div>

              <h3 className="mt-3 font-display text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
                {activeProj.title}
              </h3>
              <p className="text-xs font-mono text-sky-400 font-medium mt-1">
                {activeProj.tagline}
              </p>

              <p className="mt-4 text-sm sm:text-base text-slate-200 leading-relaxed font-sans max-w-xl">
                {activeProj.description}
              </p>

              {/* Engineering Highlights */}
              <div className="mt-6">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-sky-400" />
                  <span>{t.highlightsTitle}</span>
                </h4>
                <ul className="space-y-2 text-xs font-mono text-slate-200">
                  {activeProj.highlights.map((hl, i) => (
                    <li key={i} className="flex items-start gap-2 max-w-xl">
                      <span className="text-sky-400 mt-0.5">›</span>
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Architectural Evolution Note */}
              {activeProj.evolutionNote && (
                <div className="mt-6 p-4 rounded-lg bg-sky-500/10 border border-sky-500/25 text-xs font-mono text-slate-200 max-w-xl">
                  <strong className="text-sky-300 block mb-1">
                    {t.evolutionTitle}
                  </strong>
                  {activeProj.evolutionNote}
                </div>
              )}
            </div>

            {/* Sidebar with Stacks and Link */}
            <div className="lg:w-72 shrink-0 pt-6 lg:pt-0 lg:pl-8 lg:border-l lg:border-white/10 flex flex-col justify-between">
              <div>
                <span className="text-slate-400 text-xs font-mono uppercase tracking-wider block mb-2.5">
                  {t.stackTitle}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeProj.stack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono text-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Only show GitHub repository button if NOT hidden for this project */}
              {!activeProj.hideRepo && activeProj.repoUrl && (
                <div className="mt-8">
                  <a
                    href={activeProj.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-sky-400/40 text-slate-200 hover:text-white transition-all flex items-center justify-center gap-2 font-mono text-xs shadow-md"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>{t.githubRepoBtn}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Embedded Muted Video Previews (e.g. Bistecone Games) */}
          {activeProj.videos && activeProj.videos.length > 0 && (
            <div className="mt-8 pt-6 border-t border-white/10">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 mb-4 flex items-center gap-2">
                <Play className="w-4 h-4 text-red-400 fill-red-400" />
                <span>{t.videoSectionTitle}</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeProj.videos.map((vid, idx) => (
                  <div key={idx} className="rounded-xl border border-white/10 bg-ink-950/80 p-3 space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono pb-1 border-b border-white/5">
                      <span className="font-bold text-slate-100">{vid.title}</span>
                      <span className="px-2 py-0.5 rounded bg-sky-500/10 border border-sky-500/20 text-sky-400 font-semibold">{vid.year}</span>
                    </div>

                    <div className="relative aspect-video rounded-lg overflow-hidden border border-white/10 bg-black">
                      <iframe
                        src={vid.embedUrl}
                        title={vid.title}
                        loading="lazy"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      />
                    </div>

                    <a
                      href={vid.watchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-mono text-slate-400 hover:text-sky-300 flex items-center gap-1 transition-colors pt-1"
                    >
                      <span>{t.watchOnYoutube} ↗</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
