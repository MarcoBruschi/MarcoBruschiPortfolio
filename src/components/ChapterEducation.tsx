import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Award, ExternalLink, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getPortfolioData } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export const ChapterEducation: React.FC = () => {
  const { lang } = useLanguage();
  const { educationData } = getPortfolioData(lang);
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current, {
        scrollTrigger: {
          trigger: cardsRef.current,
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

  const t = {
    pt: {
      title: "Formação & Certificações",
      subtitle: "Base conceitual sólida na PUCPR aliada a mais de 230 horas de especializações técnicas auditadas.",
      gradBadge: "GRADUAÇÃO UNIVERSITÁRIA",
      expectedGrad: "Previsão de Conclusão:",
      subjectsTitle: "Disciplinas-Chave Curriculares:",
      statusText: "Status: Matrícula Ativa (4º Período)",
      campusText: "Câmpus Presencial Curitiba",
      tracksBadge: "FORMAÇÃO CONTÍNUA COMPROVADA",
      auditedSuffix: "AUDITADAS",
      tracksTitle: "Trilhas Oficiais Alura",
      tracksSubtitle: "Certificados com validação pública oficial e carga horária discriminada.",
      verifyBtn: "Verificar Certificado Oficial Alura (230h+)"
    },
    en: {
      title: "Education & Certifications",
      subtitle: "Strong academic foundations at PUCPR paired with over 230 hours of verified technical coursework.",
      gradBadge: "UNIVERSITY DEGREE",
      expectedGrad: "Expected Graduation:",
      subjectsTitle: "Key Curricular Subjects:",
      statusText: "Status: Active Student (4th Term)",
      campusText: "On-Campus Curitiba",
      tracksBadge: "VERIFIED CONTINUOUS LEARNING",
      auditedSuffix: "VERIFIED",
      tracksTitle: "Official Alura Career Tracks",
      tracksSubtitle: "Publicly verified credentials with audited course hours.",
      verifyBtn: "Verify Official Alura Credential (230h+)"
    }
  }[lang];

  return (
    <section id="formacao" ref={sectionRef} className="min-h-screen relative flex flex-col justify-center px-4 sm:px-6 lg:px-12 py-24 z-10 scroll-mt-16">
      <div className="max-w-6xl mx-auto w-full">
        <div className="mb-10 text-center sm:text-left">
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-slate-100 tracking-tight">
            {t.title}
          </h2>
          <p className="mt-2 text-sm sm:text-base font-sans text-slate-300 max-w-[65ch]">
            {t.subtitle}
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* PUCPR */}
          <div className="lg:col-span-6 rounded-xl border border-white/10 bg-ink-900/80 backdrop-blur-md p-6 sm:p-8 flex flex-col justify-between hover:border-sky-500/30 transition-all duration-300 shadow-xl">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono">
                <span className="text-slate-300">{t.gradBadge}</span>
                <span className="px-2.5 py-0.5 rounded bg-white/5 border border-white/10 text-sky-400 font-semibold">
                  {educationData.period}
                </span>
              </div>

              <h3 className="mt-4 font-display text-2xl font-bold text-slate-100 tracking-tight flex items-center gap-2.5">
                <GraduationCap className="w-6 h-6 text-sky-400 shrink-0" />
                <span>{educationData.degree}</span>
              </h3>
              <p className="text-xs font-mono text-sky-400 font-medium mt-1">
                {educationData.institution}
              </p>
              <p className="text-xs font-mono text-slate-400 mt-1">
                {educationData.location} • {t.expectedGrad} {educationData.expectedGraduation}
              </p>

              <div className="mt-6">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                  {t.subjectsTitle}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-slate-200">
                  {educationData.keySubjects.map((sub, i) => (
                    <div key={i} className="py-1.5 flex items-center gap-2 border-b border-white/5">
                      <span className="h-1.5 w-1.5 rounded-full bg-sky-400 shrink-0" />
                      <span>{sub}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-300">
              <span>{t.statusText}</span>
              <span className="text-sky-400 font-semibold">{t.campusText}</span>
            </div>
          </div>

          {/* Alura Audited Track */}
          <div className="lg:col-span-6 rounded-xl border border-white/10 bg-ink-900/80 backdrop-blur-md p-6 sm:p-8 flex flex-col justify-between hover:border-sky-500/30 transition-all duration-300 shadow-xl">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono">
                <span className="text-slate-300">{t.tracksBadge}</span>
                <span className="px-2.5 py-0.5 rounded bg-sky-500/10 border border-sky-500/30 text-sky-300 font-semibold">
                  {educationData.certificationHours} {t.auditedSuffix}
                </span>
              </div>

              <h3 className="mt-4 font-display text-2xl font-bold text-slate-100 tracking-tight flex items-center gap-2.5">
                <Award className="w-6 h-6 text-sky-400 shrink-0" />
                <span>{t.tracksTitle}</span>
              </h3>
              <p className="text-xs font-mono text-slate-300 mt-1">
                {t.tracksSubtitle}
              </p>

              <div className="mt-6 space-y-2 font-mono text-xs">
                {educationData.certifications.map((cert, i) => (
                  <div
                    key={i}
                    className="py-2 flex items-center justify-between gap-2 border-b border-white/5"
                  >
                    <div className="flex items-center gap-2 text-slate-200">
                      <CheckCircle className="w-4 h-4 text-sky-400 shrink-0" />
                      <span>{cert.title}</span>
                    </div>
                    <span className="text-sky-400 font-bold shrink-0">{cert.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10">
              <a
                href={educationData.aluraCertUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-lg bg-sky-400 hover:bg-sky-300 text-slate-950 text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <span>{t.verifyBtn}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
