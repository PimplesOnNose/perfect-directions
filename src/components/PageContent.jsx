import React from 'react';

export default function PageContent({ text }) {
  return (
    <div className="font-comic text-lg md:text-xl text-white/85 leading-relaxed max-w-2xl mx-auto text-center px-2">
      <p className="whitespace-pre-line">{text}</p>
    </div>
  );
}
