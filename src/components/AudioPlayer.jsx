import React, { useRef, useState, useEffect, useCallback } from 'react';

export default function AudioPlayer({ src, label }) {
  const audioRef = useRef(null);
  const progressRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoaded = () => { setDuration(audio.duration); setLoading(false); };
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onEnded = () => { setPlaying(false); setCurrentTime(0); };
    const onError = () => { setLoading(false); setPlaying(false); };

    audio.addEventListener('loadedmetadata', onLoaded);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);

    return () => {
      audio.removeEventListener('loadedmetadata', onLoaded);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
    };
  }, [src]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  }, [playing]);

  const seek = useCallback((e) => {
    const rect = progressRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, x / rect.width));
    audioRef.current.currentTime = pct * duration;
  }, [duration]);

  const formatTime = (t) => {
    if (!t || !isFinite(t)) return '0:00';
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="mt-8 mb-4 max-w-md mx-auto">
      <audio ref={audioRef} src={src} preload="metadata" />

      <div className="bg-warriors-royal/30 rounded-2xl px-5 py-4 border border-white/10">
        {/* Label */}
        <p className="text-xs text-white/40 font-display mb-3 uppercase tracking-wider">
          🔊 {label}
        </p>

        <div className="flex items-center gap-4">
          {/* Play/pause button */}
          <button
            onClick={togglePlay}
            disabled={loading}
            className={`
              flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center
              bg-warriors-gold text-warriors-slate font-bold text-lg
              transition-all duration-200
              hover:scale-110 hover:shadow-gold
              active:scale-95
              disabled:opacity-40 disabled:cursor-not-allowed
              ${playing ? 'audio-pulse' : ''}
            `}
            aria-label={playing ? 'Pause narration' : 'Play narration'}
          >
            {playing ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          {/* Progress section */}
          <div className="flex-1 min-w-0">
            {/* Progress bar */}
            <div
              ref={progressRef}
              onClick={seek}
              className="h-2 bg-white/10 rounded-full cursor-pointer group relative overflow-hidden"
            >
              <div
                className="h-full bg-gradient-to-r from-warriors-gold to-warriors-gold/80 rounded-full transition-[width] duration-100 relative"
                style={{ width: `${progress}%` }}
              >
                {/* Glow dot at the edge */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-[0_0_8px_rgba(255,199,44,0.8)] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>

            {/* Time */}
            <div className="flex justify-between mt-1.5 text-[11px] text-white/30 font-mono">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
