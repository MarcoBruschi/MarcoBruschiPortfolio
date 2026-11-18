import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, Copy, Check, Send, ArrowUpRight, MapPin, Briefcase } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getPortfolioData } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from './Icons';

gsap.registerPlugin(ScrollTrigger);

export const ChapterDispatch: React.FC = () => {
  const { lang } = useLanguage();
  const { personalInfo } = getPortfolioData(lang);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: contentRef.current,
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
  }, []);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const whatsappClean = personalInfo.phone.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/55${whatsappClean}`;

  const t = {
    pt: {
      title: "Contato & Oportunidades",
      subtitle: "Disponível para posições de Estágio em Engenharia de Software e Desenvolvimento Full Stack (Curitiba – PR ou Remoto).",
      channelFast: "Canal Rápido",
      channelFastTitle: "WhatsApp & Telefone",
      fastDesc: "Contato direto para agendamento de entrevistas técnicas e alinhamentos de estágio.",
      copyBtn: "Copiar",
      copiedBtn: "Copiado",
      whatsappBtn: "Chamar no WhatsApp",
      channelEmail: "Comunicação Formal",
      channelEmailTitle: "E-mail Profissional",
      directStatus: "Direto",
      emailDesc: "Envio de propostas formais, documentação de vagas ou convites para processos seletivos.",
      sendEmailBtn: "Enviar E-mail",
      linkedinLabel: "Rede Profissional",
      githubLabel: "Código & Repositórios",
      bannerTitle: "Disponível para Início Imediato em Estágio // 2026",
      bannerDesc: "Engenharia de Software / Full Stack • Presencial ou Remoto",
      bannerLoc: "Curitiba – PR, Brasil",
      footerCredits: "© 2026 Marco Antônio Silva Bruschi • Curitiba – PR",
      footerDegree: "Engenharia de Software • PUCPR"
    },
    en: {
      title: "Contact & Opportunities",
      subtitle: "Available for Software Engineering and Full Stack Development Internships (Curitiba – PR or Remote).",
      channelFast: "Direct Line",
      channelFastTitle: "WhatsApp & Phone",
      fastDesc: "Direct contact for scheduling technical interviews and discussing internship roles.",
      copyBtn: "Copy",
      copiedBtn: "Copied",
      whatsappBtn: "Message on WhatsApp",
      channelEmail: "Formal Inquiries",
      channelEmailTitle: "Professional Email",
      directStatus: "Direct",
      emailDesc: "For formal job offers, recruitment documentation, or interview process invitations.",
      sendEmailBtn: "Send Email",
      linkedinLabel: "Professional Network",
      githubLabel: "Code & Repositories",
      bannerTitle: "Available for Immediate Start in Software Internship // 2026",
      bannerDesc: "Software Engineering / Full Stack • On-Site or Remote",
      bannerLoc: "Curitiba – PR, Brazil",
      footerCredits: "© 2026 Marco Antônio Silva Bruschi • Curitiba – PR, Brazil",
      footerDegree: "Software Engineering • PUCPR"
    }
  }[lang];

  return (
    <section id="contato" ref={sectionRef} className="min-h-screen relative flex flex-col justify-center px-4 sm:px-6 lg:px-12 py-24 z-10 scroll-mt-16">
      <div className="max-w-6xl mx-auto w-full">
        <div className="mb-10 text-center sm:text-left">
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold text-slate-100 tracking-tight">
            {t.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base font-sans text-slate-300 max-w-[65ch]">
            {t.subtitle}
          </p>
        </div>

        <div ref={contentRef} className="space-y-6">
          {/* Main 2x2 Contact Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* WhatsApp Card */}
            <div className="rounded-xl border border-white/10 bg-ink-900/80 backdrop-blur-md p-6 flex flex-col justify-between hover:border-sky-500/40 transition-all duration-300 shadow-xl group">
              <div>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 group-hover:bg-sky-500/20 transition-colors">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">{t.channelFast}</span>
                      <span className="text-sm font-bold text-slate-100 font-display">{t.channelFastTitle}</span>
                    </div>
                  </div>
                </div>
                <p className="font-mono text-base sm:text-lg font-bold text-slate-100 tracking-tight mb-2">
                  {personalInfo.phone}
                </p>
                <p className="text-xs font-sans text-slate-300 mb-6">
                  {t.fastDesc}
                </p>
              </div>

              <div className="flex items-center gap-2.5 font-mono text-xs pt-4 border-t border-white/5">
                <button
                  onClick={() => handleCopy(personalInfo.phone, 'phone')}
                  className="px-3.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 transition-colors flex items-center gap-1.5"
                  title="Copiar número"
                >
                  {copiedKey === 'phone' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-sky-400" />
                      <span>{t.copiedBtn}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-300" />
                      <span>{t.copyBtn}</span>
                    </>
                  )}
                </button>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-4 py-2 rounded-lg bg-sky-400 hover:bg-sky-300 text-slate-950 font-bold transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  <span>{t.whatsappBtn}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Email Card */}
            <div className="rounded-xl border border-white/10 bg-ink-900/80 backdrop-blur-md p-6 flex flex-col justify-between hover:border-sky-500/40 transition-all duration-300 shadow-xl group">
              <div>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 group-hover:bg-sky-500/20 transition-colors">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">{t.channelEmail}</span>
                      <span className="text-sm font-bold text-slate-100 font-display">{t.channelEmailTitle}</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-sky-400 font-semibold px-2 py-0.5 rounded bg-sky-500/10 border border-sky-500/20">{t.directStatus}</span>
                </div>
                <p className="font-mono text-base sm:text-lg font-bold text-slate-100 tracking-tight mb-2 break-all">
                  {personalInfo.email}
                </p>
                <p className="text-xs font-sans text-slate-300 mb-6">
                  {t.emailDesc}
                </p>
              </div>

              <div className="flex items-center gap-2.5 font-mono text-xs pt-4 border-t border-white/5">
                <button
                  onClick={() => handleCopy(personalInfo.email, 'email')}
                  className="px-3.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 transition-colors flex items-center gap-1.5"
                  title="Copiar e-mail"
                >
                  {copiedKey === 'email' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-sky-400" />
                      <span>{t.copiedBtn}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-300" />
                      <span>{t.copyBtn}</span>
                    </>
                  )}
                </button>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex-1 px-4 py-2 rounded-lg bg-sky-400 hover:bg-sky-300 text-slate-950 font-bold transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{t.sendEmailBtn}</span>
                </a>
              </div>
            </div>

            {/* LinkedIn Card */}
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-white/10 bg-ink-900/60 backdrop-blur-md p-5 hover:bg-ink-900 hover:border-sky-400/40 transition-all duration-300 flex items-center justify-between group shadow-lg"
            >
              <div className="flex items-center gap-3.5">
                <div className="p-2.5 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 group-hover:bg-sky-500/20 transition-colors">
                  <LinkedinIcon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">{t.linkedinLabel}</span>
                  <span className="text-sm font-mono font-bold text-slate-100 group-hover:text-sky-300 transition-colors">
                    linkedin.com/in/marcoantoniobruschi
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-sky-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* GitHub Card */}
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-white/10 bg-ink-900/60 backdrop-blur-md p-5 hover:bg-ink-900 hover:border-sky-400/40 transition-all duration-300 flex items-center justify-between group shadow-lg"
            >
              <div className="flex items-center gap-3.5">
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-slate-200 group-hover:bg-white/10 transition-colors">
                  <GithubIcon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">{t.githubLabel}</span>
                  <span className="text-sm font-mono font-bold text-slate-100 group-hover:text-sky-300 transition-colors">
                    github.com/MarcoBruschi
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-sky-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Availability Status Banner */}
          <div className="rounded-xl border border-white/10 bg-ink-900/40 backdrop-blur-md p-6 font-mono text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">
                <Briefcase className="w-4 h-4" />
              </div>
              <div>
                <span className="text-slate-200 font-semibold block text-sm">{t.bannerTitle}</span>
                <span className="text-slate-400 text-xs">{t.bannerDesc}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-slate-300 self-start sm:self-auto bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
              <MapPin className="w-3.5 h-3.5 text-sky-400" />
              <span>{t.bannerLoc}</span>
            </div>
          </div>
        </div>

        {/* Clean Footer */}
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <span>{t.footerCredits}</span>
          <span className="text-slate-400">{t.footerDegree}</span>
        </div>
      </div>
    </section>
  );
};
