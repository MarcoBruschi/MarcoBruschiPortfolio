import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowDown, ArrowUpRight, Code, Award, Mail, Layers } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getPortfolioData } from '../data/portfolioData';

export const ChapterOrigin: React.FC = () => {
  const { lang } = useLanguage();
  const { personalInfo, educationData } = getPortfolioData(lang);

  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(titleRef.current, {
        y: 25,
        opacity: 0,
        duration: 0.8
      })
      .from(summaryRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.65
      }, '-=0.4')
      .from(metricsRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.6
      }, '-=0.4')
      .from(actionsRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.6
      }, '-=0.4');
    }, containerRef);

    return () => ctx.revert();
  }, [lang]);

  const t = {
    pt: {
      role: 'Engenharia de Software • Desenvolvimento Full Stack & APIs RESTful',
      academicTitle: 'Formação Acadêmica',
      academicDegree: 'PUCPR — Eng. Software',
      academicPeriod: '4º Período • Curitiba – PR',
      certTitle: 'Especialização Contínua',
      certHours: '230h+ Auditadas',
      certSubtitle: '5 Formações Oficiais Alura',
      langTitle: 'Idiomas',
      langFluent: 'Inglês Fluente',
      langNative: 'Português Nativo',
      ctaFlagship: 'Ver Flagship: mindAgentics',
      ctaProjects: 'Explorar Projetos',
      ctaStacks: 'Stacks Técnicas',
      ctaAlura: 'Certificado Alura (230h+) ↗',
      ctaContact: 'Contato Direto →',
      scrollPrompt: 'ROLE PARA NAVEGAR PELAS ARQUITETURAS & PROJETOS'
    },
    en: {
      role: 'Software Engineering • Full Stack Development & RESTful APIs',
      academicTitle: 'Academic Education',
      academicDegree: 'PUCPR — Software Engineering',
      academicPeriod: '4th Term • Curitiba – PR, Brazil',
      certTitle: 'Continuous Training',
      certHours: '230h+ Verified',
      certSubtitle: '5 Official Alura Tracks',
      langTitle: 'Languages',
      langFluent: 'Fluent English',
      langNative: 'Native Portuguese',
      ctaFlagship: 'Featured Flagship: mindAgentics',
      ctaProjects: 'Explore Projects',
      ctaStacks: 'Technical Stacks',
      ctaAlura: 'Alura Certificate (230h+) ↗',
      ctaContact: 'Direct Contact →',
      scrollPrompt: 'SCROLL TO EXPLORE ARCHITECTURES & PROJECTS'
    }
  }[lang];

  return (
    <section
      ref={containerRef}
      className="min-h-screen relative flex flex-col justify-center px-6 sm:px-12 lg:px-20 xl:px-24 pt-28 pb-16 z-10 w-full"
    >
      <div className="w-full">
        {/* Hero Title Section (Full width horizontal, name: Marco Antônio Bruschi) */}
        <div ref={titleRef} className="space-y-3">
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-white leading-[0.96] drop-shadow-md">
            Marco Antônio Bruschi
          </h1>

          <p className="text-base sm:text-xl md:text-2xl font-mono text-slate-100 font-semibold tracking-tight">
            {t.role}
          </p>
        </div>

        {/* Narrative & Executive Brief with high-contrast protective backdrop */}
        <div ref={summaryRef} className="mt-8 max-w-2xl">
          <div className="p-6 sm:p-7 rounded-xl border border-white/10 bg-[#0a0f18]/90 backdrop-blur-md shadow-2xl">
            <p className="text-base sm:text-lg text-slate-100 leading-relaxed font-sans font-normal max-w-[62ch]">
              {personalInfo.summary}
            </p>
          </div>
        </div>

        {/* Three Academic & Professional Metric Slabs (Languages updated: "Escrita Técnica & Conversação" removed) */}
        <div
          ref={metricsRef}
          className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs max-w-4xl"
        >
          <div className="p-4 rounded-xl border border-white/10 bg-[#0a0f18]/85 backdrop-blur-md shadow-xl">
            <span className="block text-slate-400 text-xs uppercase tracking-wider mb-1">{t.academicTitle}</span>
            <span className="text-white font-bold text-xs block">{t.academicDegree}</span>
            <span className="text-slate-300 text-xs">{t.academicPeriod}</span>
          </div>

          <div className="p-4 rounded-xl border border-white/10 bg-[#0a0f18]/85 backdrop-blur-md shadow-xl">
            <span className="block text-slate-400 text-xs uppercase tracking-wider mb-1">{t.certTitle}</span>
            <span className="text-sky-400 font-bold text-xs block">{t.certHours}</span>
            <span className="text-slate-300 text-xs">{t.certSubtitle}</span>
          </div>

          <div className="p-4 rounded-xl border border-white/10 bg-[#0a0f18]/85 backdrop-blur-md shadow-xl">
            <span className="block text-slate-400 text-xs uppercase tracking-wider mb-1">{t.langTitle}</span>
            <span className="text-emerald-400 font-bold text-xs block">{t.langFluent}</span>
            <span className="text-slate-300 text-xs">{t.langNative}</span>
          </div>
        </div>

        {/* Action Triggers */}
        <div
          ref={actionsRef}
          className="mt-8 flex flex-wrap items-center gap-3 text-xs sm:text-sm font-medium pt-6 border-t border-white/10"
        >
          <a
            href="#mindagentics"
            className="px-5 py-3 rounded-lg bg-sky-400 hover:bg-sky-300 text-slate-950 font-bold transition-all active:translate-y-0.5 flex items-center gap-2 shadow-md"
          >
            <span>{t.ctaFlagship}</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>

          <a
            href="#projetos"
            className="px-5 py-3 rounded-lg bg-[#0a0f18]/90 hover:bg-ink-850 text-slate-100 border border-white/10 hover:border-sky-400/50 transition-all active:translate-y-0.5 flex items-center gap-2 backdrop-blur-md shadow-md"
          >
            <Code className="w-4 h-4 text-sky-400" />
            <span>{t.ctaProjects}</span>
          </a>

          <a
            href="#stacks"
            className="px-5 py-3 rounded-lg bg-[#0a0f18]/90 hover:bg-ink-850 text-slate-100 border border-white/10 hover:border-sky-400/50 transition-all active:translate-y-0.5 flex items-center gap-2 backdrop-blur-md shadow-md"
          >
            <Layers className="w-4 h-4 text-sky-400" />
            <span>{t.ctaStacks}</span>
          </a>

          <a
            href={educationData.aluraCertUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-3 rounded-lg bg-[#0a0f18]/80 hover:bg-ink-850 text-slate-200 hover:text-sky-300 border border-white/10 hover:border-sky-400/40 transition-all flex items-center gap-2 font-mono text-xs shadow-md"
            title="Verificar Certificado Alura"
          >
            <Award className="w-3.5 h-3.5 text-sky-400" />
            <span>{t.ctaAlura}</span>
          </a>

          <a
            href="#contato"
            className="px-4 py-3 rounded-lg text-slate-200 hover:text-sky-300 transition-colors font-mono text-xs flex items-center gap-1.5"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>{t.ctaContact}</span>
          </a>
        </div>

        {/* Scroll Prompt */}
        <div className="mt-10 flex items-center gap-2.5 text-xs font-mono text-slate-400">
          <ArrowDown className="w-3.5 h-3.5 text-sky-400" />
          <span>{t.scrollPrompt}</span>
        </div>
      </div>
    </section>
  );
};
