import React, { useState } from 'react';

export default function TitleScreen({ onStart }) {
  const [hovering, setHovering] = useState(false);

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-warriors-royal/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-warriors-gold/8 blur-3xl" />
        {/* Floating basketballs */}
        <div className="absolute top-[15%] left-[10%] text-4xl opacity-20 animate-floaty" style={{ animationDelay: '0s' }}>🏀</div>
        <div className="absolute top-[25%] right-[15%] text-3xl opacity-15 animate-floaty" style={{ animationDelay: '0.8s' }}>🏀</div>
        <div className="absolute bottom-[20%] left-[20%] text-5xl opacity-10 animate-floaty" style={{ animationDelay: '1.5s' }}>🏀</div>
        <div className="absolute top-[60%] right-[10%] text-2xl opacity-15 animate-floaty" style={{ animationDelay: '0.4s' }}>⭐</div>
        <div className="absolute top-[40%] left-[5%] text-2xl opacity-10 animate-floaty" style={{ animationDelay: '1.2s' }}>⭐</div>
      </div>

      {/* Title card */}
      <div className="relative z-10 text-center max-w-2xl">
        {/* Basketball icon */}
        <div className="text-7xl mb-6 animate-bounceIn">🏀</div>

        {/* Main title */}
        <h1 className="font-display text-6xl md:text-7xl font-800 text-white mb-3 leading-tight tracking-tight">
          Perfect{' '}
          <span className="text-warriors-gold neon-text">Directions</span>
        </h1>

        {/* Subtitle */}
        <p className="font-display text-xl md:text-2xl text-warriors-gold/80 font-500 mb-2">
          How Sean Saved Steph's Night in Las Vegas
        </p>

        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-3 my-8">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-warriors-gold/40" />
          <div className="text-xl opacity-60">🏀</div>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-warriors-gold/40" />
        </div>

        {/* Story blurb */}
        <p className="font-comic text-lg text-white/70 max-w-md mx-auto mb-10 leading-relaxed">
          A story about a kid, a basketball star, and one perfect set of directions through the bright lights of Las Vegas.
        </p>

        {/* Start button */}
        <button
          onClick={onStart}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          className={`
            relative inline-flex items-center gap-3
            px-10 py-4 rounded-full
            bg-warriors-gold text-warriors-slate
            font-display text-xl font-700
            shadow-gold
            transition-all duration-300
            hover:scale-105 hover:shadow-[0_12px_36px_-6px_rgba(255,199,44,0.7)]
            active:scale-95
            ${hovering ? 'animate-pulseGlow' : ''}
          `}
        >
          <span>Read the Story</span>
          <span className="text-2xl transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </button>

        {/* Page count hint */}
        <p className="mt-6 text-sm text-white/30 font-comic">
          8 pages · ~2 minutes · Audio narration included
        </p>
      </div>
    </div>
  );
}
