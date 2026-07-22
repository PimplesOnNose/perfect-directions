import React from 'react';

export default function CreditsFooter({ credits }) {
  return (
    <footer className="py-6 text-center border-t border-white/5 bg-warriors-slate/50">
      <p className="text-xs text-white/25 font-comic mb-2">
        Made with ❤️ for kids who love stories and basketball
      </p>
      <div className="flex items-center justify-center gap-4 flex-wrap">
        {credits.map((c, i) => (
          <a
            key={c.name}
            href={c.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-white/30 hover:text-warriors-gold transition-colors font-display"
          >
            {c.name}
          </a>
        ))}
      </div>
    </footer>
  );
}
