import React from 'react';

export default function NavigationControls({ currentPage, totalPages, onPrev, onNext, onGoToPage }) {
  const isFirst = currentPage <= 1;
  const isLast = currentPage >= totalPages;

  return (
    <nav className="sticky bottom-0 z-30 bg-warriors-slate/95 backdrop-blur-md border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Previous */}
        <button
          onClick={onPrev}
          disabled={isFirst}
          className={`
            flex items-center gap-2 px-5 py-2.5 rounded-full font-display font-600 text-sm
            transition-all duration-200
            ${isFirst
              ? 'bg-white/5 text-white/20 cursor-not-allowed'
              : 'bg-white/10 text-white hover:bg-warriors-royal hover:text-white hover:shadow-hoops active:scale-95'
            }
          `}
        >
          <span className="text-lg">←</span>
          <span className="hidden sm:inline">Previous</span>
        </button>

        {/* Page dots */}
        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => {
            const page = i + 1;
            const isActive = page === currentPage;
            return (
              <button
                key={page}
                onClick={() => onGoToPage(page)}
                className={`
                  rounded-full transition-all duration-300
                  ${isActive
                    ? 'w-8 h-3 bg-warriors-gold shadow-gold'
                    : 'w-3 h-3 bg-white/20 hover:bg-white/40'
                  }
                `}
                aria-label={`Go to page ${page}`}
              />
            );
          })}
        </div>

        {/* Next */}
        <button
          onClick={isLast ? () => onGoToPage(1) : onNext}
          className={`
            flex items-center gap-2 px-5 py-2.5 rounded-full font-display font-600 text-sm
            transition-all duration-200
            ${isLast
              ? 'bg-warriors-gold text-warriors-slate shadow-gold hover:scale-105 active:scale-95'
              : 'bg-warriors-royal text-white hover:bg-warriors-royal/80 hover:shadow-hoops active:scale-95'
            }
          `}
        >
          <span className="hidden sm:inline">{isLast ? 'Read Again' : 'Next'}</span>
          <span className="text-lg">{isLast ? '🔄' : '→'}</span>
        </button>
      </div>
    </nav>
  );
}
