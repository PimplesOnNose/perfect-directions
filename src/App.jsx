import React, { useState, useCallback, useEffect } from 'react';
import { STORY, CREDITS } from './data/story.js';
import StoryReader from './components/StoryReader.jsx';
import TitleScreen from './components/TitleScreen.jsx';
import CreditsFooter from './components/CreditsFooter.jsx';

export default function App() {
  const [started, setStarted] = useState(false);
  const [currentPage, setCurrentPage] = useState(0); // 0 = title, 1-8 = pages
  const totalPages = STORY.pages.length;

  const handleStart = useCallback(() => {
    setStarted(true);
    setCurrentPage(1);
  }, []);

  const goToPage = useCallback((page) => {
    setCurrentPage(() => Math.max(1, Math.min(page, totalPages)));
  }, [totalPages]);

  const nextPage = useCallback(() => {
    setCurrentPage(p => Math.min(p + 1, totalPages));
  }, [totalPages]);

  const prevPage = useCallback(() => {
    setCurrentPage(p => Math.max(p - 1, 1));
  }, []);

  const handleBackToTitle = useCallback(() => {
    setStarted(false);
    setCurrentPage(0);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (!started || currentPage === 0) return;
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextPage();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevPage();
      } else if (e.key === 'Escape') {
        handleBackToTitle();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [started, currentPage, nextPage, prevPage, handleBackToTitle]);

  return (
    <div className="min-h-screen flex flex-col basketball-texture">
      {!started ? (
        <TitleScreen onStart={handleStart} credits={CREDITS} />
      ) : (
        <StoryReader
          story={STORY}
          currentPage={currentPage}
          totalPages={totalPages}
          onNext={nextPage}
          onPrev={prevPage}
          onGoToPage={goToPage}
          onBackToTitle={handleBackToTitle}
        />
      )}
      <CreditsFooter credits={CREDITS} />
    </div>
  );
}
