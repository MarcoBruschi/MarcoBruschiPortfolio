'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import WebGLBackground from './WebGLBackground';
import { Language, projectsData, skillsData, siteContent } from '@/data/content';

// Clean Minimal SVGs (No underlines, no decorations)
const ArrowUpRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
);
const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
);
const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);
const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.15-.38 6.5-1.4 6.5-7.17A5.02 5.02 0 0 0 19 5.5a4.9 4.9 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a11.5 11.5 0 0 0-6 0C7.1 2 6 2 6 2a4.9 4.9 0 0 0-.1 3.2A5.02 5.02 0 0 0 4 8.5c0 5.8 3.35 6.8 6.5 7.1A4.8 4.8 0 0 0 9 18v4"/><path d="m9 18-3 1-2-2-1-1"/></svg>
);
const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
);
const ExternalLinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
);
const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
);

gsap.registerPlugin(ScrollTrigger);

export default function Portfolio() {
  const [lang, setLang] = useState<Language>('pt');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const t = siteContent[lang];

  useEffect(() => {
    // Ensure all sections are visible immediately so nothing fails to load
    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.fromTo('.reveal-hero', 
        { y: 35, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: 'power3.out', delay: 0.1 }
      );

      gsap.fromTo('.reveal-fade',
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: 'power2.out', delay: 0.4 }
      );

      // Refresh ScrollTrigger so calculations are accurate
      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Smooth scroll handler for tabs
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div ref={containerRef} className="relative min-h-screen text-[#fafafa] selection:bg-white selection:text-black">
      <WebGLBackground />
      
      {/* Skip to main content for accessibility */}
      <a 
        href="#main" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:font-mono focus:text-xs"
      >
        {lang === 'pt' ? 'Pular para o conteúdo principal' : 'Skip to main content'}
      </a>

      {/* TOP NAVIGATION & TABS */}
      <header className="fixed top-0 left-0 w-full z-40 backdrop-blur-md bg-[#050505]/85 border-b border-[#1f1f1f]">
        <div className="container mx-auto px-6 md:px-12 lg:px-24 h-16 flex items-center justify-between">
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-mono text-sm tracking-wider uppercase font-semibold flex items-center gap-2 group"
          >
            <span className="w-2 h-2 bg-[#00f0ff] group-hover:scale-125 transition-transform duration-300"></span>
            Marco Bruschi 
          </a>

          <div className="flex items-center gap-3 sm:gap-6">
            {/* Desktop Navigation Tabs */}
            <nav className="hidden md:flex items-center gap-6 font-mono text-xs text-muted uppercase tracking-wider">
              <a 
                href="#skills" 
                onClick={(e) => scrollToSection(e, 'skills')}
                className="hover:text-white transition-colors duration-200"
              >
                {t.nav.specs}
              </a>
              <a 
                href="#projects" 
                onClick={(e) => scrollToSection(e, 'projects')}
                className="hover:text-white transition-colors duration-200"
              >
                {t.nav.deployments}
              </a>
              <a 
                href="#academic" 
                onClick={(e) => scrollToSection(e, 'academic')}
                className="hover:text-white transition-colors duration-200"
              >
                {t.nav.academic}
              </a>
              <a 
                href="#contact" 
                onClick={(e) => scrollToSection(e, 'contact')}
                className="hover:text-white transition-colors duration-200"
              >
                {t.nav.contact}
              </a>
            </nav>

            {/* Language Switcher */}
            <div className="flex items-center border border-border p-0.5 font-mono text-xs bg-black/40">
              <button 
                type="button"
                onClick={() => setLang('pt')}
                aria-label="Mudar para Português"
                className={`px-2.5 py-1 transition-all duration-200 ${
                  lang === 'pt' 
                    ? 'bg-white text-black font-bold' 
                    : 'text-muted hover:text-white'
                }`}
              >
                PT
              </button>
              <button 
                type="button"
                onClick={() => setLang('en')}
                aria-label="Switch to English"
                className={`px-2.5 py-1 transition-all duration-200 ${
                  lang === 'en' 
                    ? 'bg-white text-black font-bold' 
                    : 'text-muted hover:text-white'
                }`}
              >
                EN
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-muted hover:text-white font-mono text-xs border border-border"
              aria-label="Menu"
            >
              {mobileMenuOpen ? '✕' : 'MENU'}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#1f1f1f] bg-[#050505] px-6 py-4 flex flex-col gap-3 font-mono text-xs uppercase tracking-wider">
            <a 
              href="#skills" 
              onClick={(e) => scrollToSection(e, 'skills')} 
              className="py-2 text-[#cccccc] hover:text-white border-b border-[#141414]"
            >
              {t.nav.specs}
            </a>
            <a 
              href="#projects" 
              onClick={(e) => scrollToSection(e, 'projects')} 
              className="py-2 text-[#cccccc] hover:text-white border-b border-[#141414]"
            >
              {t.nav.deployments}
            </a>
            <a 
              href="#academic" 
              onClick={(e) => scrollToSection(e, 'academic')} 
              className="py-2 text-[#cccccc] hover:text-white border-b border-[#141414]"
            >
              {t.nav.academic}
            </a>
            <a 
              href="#contact" 
              onClick={(e) => scrollToSection(e, 'contact')} 
              className="py-2 text-[#00f0ff] hover:text-white font-semibold"
            >
              {t.nav.contact}
            </a>
          </div>
        )}
      </header>

      <main id="main" className="container mx-auto px-6 md:px-12 lg:px-24 pt-16">
        
        {/* HERO SECTION */}
        <section className="min-h-[90vh] flex flex-col justify-center py-16">
          <div className="flex flex-wrap items-center gap-3 mb-6 reveal-hero">
            <span className="inline-flex items-center gap-2 text-xs font-mono border border-border bg-[#0e0e0e] px-3 py-1.5 text-[#00f0ff]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-pulse"></span>
              {t.hero.badge}
            </span>
            <span className="text-xs font-mono text-muted border border-border px-3 py-1.5">
              {t.hero.location}
            </span>
            <span className="text-xs font-mono text-muted border border-border px-3 py-1.5 hidden sm:inline-block">
              {t.hero.githubStatus}
            </span>
          </div>

          <div className="overflow-hidden mb-2">
            <h1 className="reveal-hero text-fluid-hero font-medium tracking-tight uppercase leading-none">
              Marco
            </h1>
          </div>
          <div className="overflow-hidden mb-8">
            <h1 className="reveal-hero text-fluid-hero font-medium tracking-tight uppercase leading-none flex items-center gap-4">
              Bruschi 
              <span className="hidden md:inline-block h-1 w-24 bg-[#00f0ff] mt-3"></span>
            </h1>
          </div>
          
          <div className="max-w-3xl reveal-fade">
            <p className="text-lg md:text-xl text-muted font-mono mb-4">
              [ {t.hero.subtitle} ]
            </p>
            <p className="text-fluid-body text-[#d0d0d0] leading-relaxed mb-10 max-w-2xl font-normal">
              {t.hero.pitch}
            </p>
            
            <div className="flex flex-wrap gap-4 items-center">
              <a 
                href="#contact" 
                onClick={(e) => scrollToSection(e, 'contact')}
                className="px-6 py-3.5 border border-border bg-white text-black hover:bg-transparent hover:text-white hover:border-[#00f0ff] transition-all duration-300 font-mono text-xs uppercase tracking-widest font-semibold"
              >
                {t.hero.ctaPrimary}
              </a>
              <a 
                href="#projects" 
                onClick={(e) => scrollToSection(e, 'projects')}
                className="px-6 py-3.5 border border-border bg-[#0e0e0e] text-[#d0d0d0] hover:text-[#00f0ff] hover:border-border transition-colors duration-300 font-mono text-xs uppercase tracking-widest"
              >
                {t.hero.ctaSecondary}
              </a>
              <a 
                href="https://github.com/MarcoBruschi" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3.5 border border-border text-muted hover:text-white hover:border-muted transition-colors duration-300 inline-flex items-center gap-2 font-mono text-xs"
                title="GitHub @MarcoBruschi"
              >
                <GithubIcon />
                <span className="hidden sm:inline">GitHub</span>
              </a>
            </div>
          </div>
        </section>

        {/* SECTION 01: SKILLS */}
        <section id="skills" className="py-24 border-t border-[#1f1f1f] scroll-mt-20">
          <div className="mb-12">
            <h2 className="text-xs font-mono uppercase tracking-widest text-[#00f0ff] mb-2">
              {t.specs.tag}
            </h2>
            <p className="text-sm font-mono text-muted uppercase tracking-wider">
              {t.specs.subtag}
            </p>
          </div>

          {/* Grouped Skills Grid without badges / underlines */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {skillsData.map((cat, idx) => (
              <div 
                key={idx} 
                className={`border border-[#1f1f1f] bg-[#0a0a0a]/60 p-6 md:p-8 flex flex-col justify-between ${
                  idx === 0 ? 'lg:col-span-7' : idx === 1 ? 'lg:col-span-5' : 'lg:col-span-4'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between border-b border-[#1f1f1f] pb-3 mb-6">
                    <h3 className="font-mono text-xs uppercase tracking-wider text-[#fafafa] font-semibold flex items-center gap-2">
                      <span className="text-[#00f0ff]">/</span>
                      {cat.category[lang]}
                    </h3>
                    <span className="text-[10px] font-mono text-muted">0{idx + 1}</span>
                  </div>

                  <ul className="space-y-3">
                    {cat.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex flex-col gap-0.5">
                        <span className="text-sm text-white font-medium">
                          {item.name}
                        </span>
                        {item.description && (
                          <span className="text-xs text-muted font-mono">
                            {item.description[lang]}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 02: PROJECTS */}
        <section id="projects" className="py-24 border-t border-[#1f1f1f] scroll-mt-20">
          <div className="mb-14">
            <h2 className="text-xs font-mono uppercase tracking-widest text-[#00f0ff] mb-2">
              {t.deployments.tag}
            </h2>
            <p className="text-sm font-mono text-muted uppercase tracking-wider">
              {t.deployments.subtag}
            </p>
          </div>

          {/* Projects List without underlines */}
          <div className="flex flex-col border-t border-[#1f1f1f]">
            {projectsData.map((project, idx) => (
              <div 
                key={idx} 
                className="group border-b border-[#1f1f1f] py-10 px-4 md:px-6 hover:bg-[#0c0c0c] transition-colors duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Title & Category */}
                  <div className="lg:col-span-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-mono text-[#00f0ff]">0{idx + 1}</span>
                      <h3 className="text-2xl md:text-3xl font-medium tracking-tight text-white group-hover:text-[#00f0ff] transition-colors duration-300">
                        {project.title}
                      </h3>
                    </div>
                    <p className="text-xs font-mono text-muted mb-4">
                      {project.tagline[lang]}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {project.tech.map((tech, tIdx) => (
                        <span 
                          key={tIdx} 
                          className="text-[11px] font-mono border border-[#222222] bg-[#141414] text-[#a0a0a0] px-2 py-0.5"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Role & Year */}
                  <div className="lg:col-span-2 text-xs font-mono text-muted space-y-1">
                    <p className="text-white">{project.role[lang]}</p>
                    <p className="text-muted">{project.year}</p>
                  </div>

                  {/* Description & Engineering Highlights */}
                  <div className="lg:col-span-4 space-y-4">
                    <p className="text-sm text-[#cccccc] leading-relaxed">
                      {project.desc[lang]}
                    </p>
                    {project.highlights && (
                      <div className="space-y-1.5 pt-2 border-t border-[#1a1a1a]">
                        <span className="text-[11px] font-mono text-muted block mb-1">
                          {t.deployments.highlightsLabel}
                        </span>
                        {project.highlights[lang].map((highlight, hIdx) => (
                          <div key={hIdx} className="flex items-start gap-2 text-xs text-[#a5a5a5]">
                            <span className="text-[#00f0ff] mt-0.5">•</span>
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Actions / Links */}
                  <div className="lg:col-span-2 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end lg:items-end">
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-mono text-xs px-3.5 py-2 border border-border bg-[#111111] hover:bg-white hover:text-black transition-colors duration-200"
                    >
                      <GithubIcon />
                      <span>{t.deployments.viewCode}</span>
                    </a>
                    {project.link && project.link !== project.github && (
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-xs text-[#00f0ff] hover:text-white transition-colors duration-200"
                      >
                        <ExternalLinkIcon />
                        <span>{t.deployments.accessLive}</span>
                      </a>
                    )}
                  </div>

                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 03: ACADEMIC & CERTIFICATIONS */}
        <section id="academic" className="py-24 border-t border-[#1f1f1f] scroll-mt-20">
          <div className="mb-12">
            <h2 className="text-xs font-mono uppercase tracking-widest text-[#00f0ff] mb-2">
              {t.academic.tag}
            </h2>
            <p className="text-sm font-mono text-muted uppercase tracking-wider">
              {t.academic.subtag}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* University */}
            <div className="border border-[#1f1f1f] bg-[#0a0a0a]/60 p-8 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-[#00f0ff] uppercase tracking-wider block mb-2">
                  {lang === 'pt' ? 'Ensino Superior' : 'Higher Education'}
                </span>
                <h3 className="text-xl md:text-2xl font-medium text-white mb-2">
                  {t.academic.university.name}
                </h3>
                <p className="font-mono text-sm text-[#00f0ff] mb-3">
                  {t.academic.university.degree}
                </p>
                <p className="text-xs font-mono text-muted mb-6 border-b border-[#1f1f1f] pb-3">
                  {t.academic.university.period}
                </p>
                <p className="text-xs text-[#b0b0b0] leading-relaxed font-sans">
                  {t.academic.university.disciplines}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#1f1f1f]">
                <h4 className="text-xs font-mono text-muted uppercase tracking-wider mb-2">
                  {t.academic.languages.title}
                </h4>
                <p className="text-xs text-[#d0d0d0] font-mono">{t.academic.languages.en}</p>
                <p className="text-xs text-[#a0a0a0] font-mono">{t.academic.languages.pt}</p>
              </div>
            </div>

            {/* Certifications */}
            <div className="border border-[#1f1f1f] bg-[#0a0a0a]/60 p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-[#1f1f1f] pb-3 mb-6">
                  <span className="text-xs font-mono text-[#00f0ff] uppercase tracking-wider">
                    {t.academic.certifications.title}
                  </span>
                  <span className="text-[10px] font-mono text-muted">230H+</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {t.academic.certifications.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-[#cccccc]">
                      <span className="text-[#00f0ff] mt-0.5"><CheckIcon /></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a 
                href="https://cursos.alura.com.br/user/mabruschi02/fullCertificate/7eee1002aa1bc01a3bdac2261dee3f70" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 border border-border bg-[#111111] hover:bg-white hover:text-black transition-colors duration-300 py-3 font-mono text-xs uppercase tracking-wider"
              >
                <span>{t.academic.certifications.verifyBtn}</span>
                <ExternalLinkIcon />
              </a>
            </div>
          </div>
        </section>

        {/* SECTION 04: CONTACT (Fixed visibility and loading) */}
        <section id="contact" className="py-28 border-t border-[#1f1f1f] min-h-[60vh] flex flex-col justify-center scroll-mt-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <h2 className="text-xs font-mono uppercase tracking-widest text-[#00f0ff] mb-2">
                {t.contact.tag}
              </h2>
              <p className="text-sm font-mono text-muted uppercase tracking-wider">{t.contact.subtag}</p>
            </div>
            
            <div className="md:col-span-8">
              <h3 className="text-fluid-h2 font-medium tracking-tight mb-4 text-white">
                {t.contact.heading}
              </h3>
              <p className="text-fluid-body text-muted mb-12 max-w-xl">
                {t.contact.subheading}
              </p>
              
              {/* Direct channels links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs uppercase tracking-wider">
                <a 
                  href={`mailto:${t.contact.email}`} 
                  className="flex items-center gap-3 p-4 border border-[#1f1f1f] bg-[#0c0c0c] hover:bg-[#141414] hover:border-[#00f0ff] transition-all duration-300 text-white"
                >
                  <MailIcon />
                  <span className="truncate">{t.contact.email}</span>
                </a>

                <a 
                  href="https://wa.me/5566992814141" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 border border-[#1f1f1f] bg-[#0c0c0c] hover:bg-[#141414] hover:border-[#00f0ff] transition-all duration-300 text-white"
                >
                  <PhoneIcon />
                  <span>(66) 99281-4141</span>
                </a>

                <a 
                  href="https://linkedin.com/in/marcoantoniobruschi" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-3 p-4 border border-[#1f1f1f] bg-[#0c0c0c] hover:bg-[#141414] hover:border-[#00f0ff] transition-all duration-300 text-white"
                >
                  <LinkedinIcon />
                  <span>LinkedIn</span>
                  <ArrowUpRightIcon />
                </a>

                <a 
                  href="https://github.com/MarcoBruschi" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-3 p-4 border border-[#1f1f1f] bg-[#0c0c0c] hover:bg-[#141414] hover:border-[#00f0ff] transition-all duration-300 text-white"
                >
                  <GithubIcon />
                  <span>GitHub @MarcoBruschi</span>
                  <ArrowUpRightIcon />
                </a>

                
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER - Cleaned (Removed the right-side tech badges as circled by user) */}
      <footer className="py-8 border-t border-[#1f1f1f] text-center text-xs font-mono text-muted bg-[#050505]">
        <div className="container mx-auto px-6 flex items-center justify-center">
          <p>{t.contact.footer.replace('{year}', new Date().getFullYear().toString())}</p>
        </div>
      </footer>
    </div>
  );
}
