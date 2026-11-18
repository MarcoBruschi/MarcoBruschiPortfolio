import React, { useState } from 'react';
import { Terminal, Server, Database, Layout, Sparkles, Layers } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getPortfolioData } from '../data/portfolioData';

const getCategoryIcon = (title: string) => {
  if (title.includes('Linguagens') || title.includes('Programming')) return <Terminal className="w-5 h-5 text-sky-400" />;
  if (title.includes('Back-end')) return <Server className="w-5 h-5 text-sky-400" />;
  if (title.includes('Bancos') || title.includes('Databases')) return <Database className="w-5 h-5 text-sky-400" />;
  if (title.includes('Front-end')) return <Layout className="w-5 h-5 text-sky-400" />;
  if (title.includes('Inteligência') || title.includes('Artificial')) return <Sparkles className="w-5 h-5 text-sky-400" />;
  return <Layers className="w-5 h-5 text-sky-400" />;
};

export const ChapterMatrix: React.FC = () => {
  const { lang } = useLanguage();
  const { skillCategories } = getPortfolioData(lang);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filterOptions = {
    pt: [
      { id: 'all', label: 'Todas as Categorias', count: 24 },
      { id: 'Linguagens', label: 'Linguagens', count: 8 },
      { id: 'Back-end', label: 'Back-end', count: 5 },
      { id: 'Bancos', label: 'Bancos de Dados', count: 3 },
      { id: 'Front-end', label: 'Front-end', count: 5 },
      { id: 'Inteligência', label: 'IA & DevOps', count: 3 }
    ],
    en: [
      { id: 'all', label: 'All Categories', count: 24 },
      { id: 'Programming', label: 'Languages', count: 8 },
      { id: 'Back-end', label: 'Back-end', count: 5 },
      { id: 'Databases', label: 'Databases', count: 3 },
      { id: 'Front-end', label: 'Front-end', count: 5 },
      { id: 'Artificial', label: 'AI & DevOps', count: 3 }
    ]
  }[lang];

  const filteredCategories = selectedFilter === 'all'
    ? skillCategories
    : skillCategories.filter((cat) => cat.title.toLowerCase().includes(selectedFilter.toLowerCase()));

  const t = {
    pt: {
      title: 'Tecnologias & Stacks',
      subtitle: 'Ecossistema de linguagens de programação, arquitetura de back-end, bancos de dados relacionais/NoSQL e interfaces modernas.',
      competenciesLabel: 'competências estruturadas'
    },
    en: {
      title: 'Technologies & Stacks',
      subtitle: 'Ecosystem of programming languages, back-end architecture, relational/NoSQL databases, and modern interfaces.',
      competenciesLabel: 'structured competencies'
    }
  }[lang];

  return (
    <section id="stacks" className="min-h-screen relative flex flex-col justify-center px-4 sm:px-6 lg:px-12 py-24 z-10 scroll-mt-16">
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <div className="mb-8 text-center sm:text-left">
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-slate-100 tracking-tight">
            {t.title}
          </h2>
          <p className="mt-2 text-sm sm:text-base font-sans text-slate-300 max-w-[65ch]">
            {t.subtitle}
          </p>
        </div>

        {/* Interactive Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 font-mono text-xs no-scrollbar">
          {filterOptions.map((opt) => {
            const isActive = selectedFilter === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setSelectedFilter(opt.id)}
                className={`px-3.5 py-2 rounded-lg whitespace-nowrap transition-all flex items-center gap-2 border ${
                  isActive
                    ? 'bg-sky-400 text-slate-950 font-bold border-sky-400 shadow-md'
                    : 'bg-ink-900/80 text-slate-300 border-white/10 hover:border-sky-400/40 hover:text-white'
                }`}
              >
                <span>{opt.label}</span>
                <span className={`px-1.5 py-0.2 rounded text-[11px] ${
                  isActive ? 'bg-slate-950/20 text-slate-950 font-bold' : 'bg-white/10 text-slate-400'
                }`}>
                  {opt.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Categories Grid */}
        <div className="space-y-6">
          {filteredCategories.map((cat, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-white/10 bg-ink-900/85 backdrop-blur-md p-6 hover:border-sky-500/40 transition-all duration-300 shadow-xl"
            >
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-sky-500/10 border border-sky-500/20">
                    {getCategoryIcon(cat.title)}
                  </div>
                  <div>
                    <h3 className="font-display text-lg sm:text-xl font-bold text-slate-100 tracking-tight">
                      {cat.title}
                    </h3>
                    <span className="text-xs font-mono text-slate-400">
                      {cat.skills.length} {t.competenciesLabel}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 font-mono text-xs">
                {cat.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className="py-2.5 flex items-start gap-2.5 border-b border-white/5 hover:border-sky-500/20 transition-colors"
                  >
                    <span className="text-sky-400 font-bold mt-0.5">›</span>
                    <div>
                      <span className="text-slate-100 font-bold block text-xs">
                        {skill.name}
                      </span>
                      <span className="text-slate-300 text-xs font-sans mt-0.5 block leading-relaxed">
                        {skill.detail}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
