import React from 'react';
import { ExternalLink, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getPortfolioData } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from './Icons';

export const SiteFrame: React.FC = () => {
  const { lang, toggleLang } = useLanguage();
  const { personalInfo } = getPortfolioData(lang);

  const navLabels = {
    pt: {
      flagship: 'mindAgentics',
      projects: 'Projetos',
      stacks: 'Stacks',
      education: 'Formação',
      contact: 'Contato'
    },
    en: {
      flagship: 'mindAgentics',
      projects: 'Projects',
      stacks: 'Stacks',
      education: 'Education',
      contact: 'Contact'
    }
  }[lang];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 p-3 sm:p-5 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-end text-xs font-mono">
        {/* Right Nav Links with Language Switcher */}
        <nav className="pointer-events-auto flex items-center gap-2.5 sm:gap-3 bg-[#06090e]/85 border border-white/10 px-3 py-2 rounded-lg backdrop-blur-md shadow-xl text-slate-300">
          <div className="hidden md:flex items-center gap-4 text-xs font-medium">
            <a href="#mindagentics" className="hover:text-sky-300 transition-colors">
              {navLabels.flagship}
            </a>
            <a href="#projetos" className="hover:text-sky-300 transition-colors">
              {navLabels.projects}
            </a>
            <a href="#stacks" className="hover:text-sky-300 transition-colors">
              {navLabels.stacks}
            </a>
            <a href="#formacao" className="hover:text-sky-300 transition-colors">
              {navLabels.education}
            </a>
          </div>

          <div className="flex items-center gap-2 pl-0 md:pl-3 md:border-l md:border-white/10">
            {/* Language Toggle */}
            <button
              onClick={toggleLang}
              className="px-2 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 hover:text-sky-300 transition-all flex items-center gap-1.5 font-bold text-xs"
              title={lang === 'pt' ? 'Switch to English' : 'Mudar para Português'}
            >
              <Globe className="w-3.5 h-3.5 text-sky-400" />
              <span>{lang.toUpperCase()}</span>
            </button>

            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded text-slate-300 hover:text-slate-100 hover:bg-white/5 transition-colors"
              title="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded text-slate-300 hover:text-slate-100 hover:bg-white/5 transition-colors"
              title="LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href="#contato"
              className="ml-1 px-3 py-1.5 rounded bg-sky-400 hover:bg-sky-300 text-slate-950 font-bold transition-colors flex items-center gap-1 shadow-md"
            >
              <span>{navLabels.contact}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};
