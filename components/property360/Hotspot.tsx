'use client';

import React from 'react';

interface HotspotProps {
  label: string;
  onClick: () => void;
  style?: React.CSSProperties;
}

export const Hotspot: React.FC<HotspotProps> = ({ label, onClick, style }) => {
  return (
    <div
      className="absolute z-10 group select-none pointer-events-auto"
      style={style}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        className="relative flex items-center justify-center w-8 h-8 rounded-full bg-cyan-500/80 hover:bg-cyan-400 border-2 border-white cursor-pointer transition-transform duration-200 hover:scale-110 active:scale-95 shadow-[0_0_12px_rgba(6,182,212,0.8)] focus:outline-none"
        title={label}
        aria-label={`Go to ${label}`}
      >
        {/* Pulsing Outer Ring */}
        <span className="absolute inline-flex h-full w-full rounded-full animate-ping bg-cyan-400 opacity-75"></span>
        
        {/* Inner Circle Dot */}
        <span className="relative rounded-full h-3 w-3 bg-white"></span>
      </button>

      {/* Tooltip */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-all duration-200 origin-top bg-slate-950/90 text-white text-xs px-2.5 py-1.5 rounded-md whitespace-nowrap shadow-lg border border-slate-800/80 pointer-events-none z-20">
        <div className="font-semibold tracking-wide">{label}</div>
        {/* Tooltip Arrow */}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-950 rotate-45 border-l border-t border-slate-800/80"></div>
      </div>
    </div>
  );
};

export default Hotspot;
