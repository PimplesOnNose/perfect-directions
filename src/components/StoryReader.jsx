import React, { useRef, useEffect } from 'react';
import PageContent from './PageContent.jsx';
import AudioPlayer from './AudioPlayer.jsx';
import NavigationControls from './NavigationControls.jsx';
import PageProgress from './PageProgress.jsx';

export default function StoryReader({
  story,
  currentPage,
  totalPages,
  onNext,
  onPrev,
  onGoToPage,
  onBackToTitle,
}) {
  const page = story.pages[currentPage - 1];
  const illustrationPath = `${import.meta.env.BASE_URL}images/page${page.page}.png`;
  const audioPath = `${import.meta.env.BASE_URL}audio/page${page.page}.mp3`;

  // Scroll to top on page change
  const topRef = useRef(null);
  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [currentPage]);

  return (
    <div className="flex-1 flex flex-col">
      <div ref={topRef} />

      {/* Top bar */}
      <header className="sticky top-0 z-30 bg-warriors-slate/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={onBackToTitle}
            className="text-white/40 hover:text-warriors-gold transition-colors font-display text-sm flex items-center gap-1.5"
          >
            <span>←</span>
            <span className="hidden sm:inline">Home</span>
          </button>

          <h2 className="font-display text-sm sm:text-base text-white/60 font-500 truncate max-w-[50%]">
            <span className="text-warriors-gold">{page.page}.</span>{' '}
            {page.title}
          </h2>

          <div className="text-white/30 text-sm font-display">
            {currentPage} / {totalPages}
          </div>
        </div>
      </header>

      {/* Progress bar */}
      <PageProgress current={currentPage} total={totalPages} onGoToPage={onGoToPage} />

      {/* Main content */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-6 md:py-10">
        <div className="page-slide-in" key={currentPage}>
          {/* Illustration */}
          <div className="mb-8">
            <div className="illustration-frame">
              <img
                src={illustrationPath}
                alt={page.caption}
                className="w-full h-auto block"
                loading={currentPage <= 2 ? 'eager' : 'lazy'}
              />
            </div>
            {/* Caption */}
            <p className="mt-3 text-center text-white/40 text-sm font-comic italic">
              {page.caption}
            </p>
          </div>

          {/* Page title */}
          <h2 className="font-display text-3xl md:text-4xl font-700 text-center mb-6">
            <span className="text-warriors-gold neon-text">{page.title}</span>
          </h2>

          {/* Story text */}
          <PageContent text={page.text} />

          {/* Audio player */}
          <AudioPlayer
            key={`audio-${currentPage}`}
            src={audioPath}
            label={`Listen to "${page.title}"`}
          />
        </div>
      </main>

      {/* Navigation */}
      <NavigationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPrev={onPrev}
        onNext={onNext}
        onGoToPage={onGoToPage}
      />
    </div>
  );
}
