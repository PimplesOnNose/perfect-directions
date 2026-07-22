import React from 'react';

export default function PageProgress({ current, total, onGoToPage }) {
  return (
    <div className="w-full h-1 bg-white/5 relative">
      <div
        className="h-full bg-gradient-to-r from-warriors-royal to-warriors-gold transition-[width] duration-500 ease-out"
        style={{ width: `${(current / total) * 100}%` }}
      />
    </div>
  );
}
