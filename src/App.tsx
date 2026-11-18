import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { BackgroundSplatCanvas, SplatModelShape } from './components/BackgroundSplatCanvas';
import { SiteFrame } from './components/SiteFrame';
import { ChapterOrigin } from './components/ChapterOrigin';
import { ChapterFlagship } from './components/ChapterFlagship';
import { ChapterProjects } from './components/ChapterProjects';
import { ChapterMatrix } from './components/ChapterMatrix';
import { ChapterEducation } from './components/ChapterEducation';
import { ChapterDispatch } from './components/ChapterDispatch';

export const AppContent: React.FC = () => {
  const [activeShape, setActiveShape] = useState<SplatModelShape>('hyper-core');

  return (
    <div className="relative min-h-screen bg-[#06090e] text-slate-100 font-sans overflow-x-hidden">
      {/* WCAG Accessible Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-sky-500 focus:text-white focus:font-mono focus:text-xs focus:rounded-lg focus:font-bold focus:shadow-xl"
      >
        Pular para o conteúdo principal / Skip to content
      </a>

      {/* 3D Gaussian Surfels Scene (Permanently Locked to Surfels 3D & Light Blue Palette) */}
      <BackgroundSplatCanvas activeShape={activeShape} />

      {/* Contrast Protection Scrim to ensure crystal-clear text readability across all sections */}
      <div 
        className="fixed inset-0 pointer-events-none z-[1] bg-gradient-to-b from-[#06090e]/80 via-[#06090e]/65 to-[#06090e]/90"
        aria-hidden="true" 
      />

      {/* Fixed Clean Header Navigation with Language Toggle */}
      <SiteFrame />

      {/* Main Content Chapters */}
      <main id="main-content" className="relative z-10">
        <ChapterOrigin />
        <ChapterFlagship />
        <ChapterProjects onMorphShape={setActiveShape} />
        <ChapterMatrix />
        <ChapterEducation />
        <ChapterDispatch />
      </main>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;
