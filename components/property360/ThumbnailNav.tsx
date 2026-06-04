'use client';

import React from 'react';
import { SceneData } from '@/data/property-scenes';

interface ThumbnailNavProps {
  scenes: SceneData[];
  currentSceneId: string;
  onSceneChange: (sceneId: string) => void;
}

export const ThumbnailNav: React.FC<ThumbnailNavProps> = ({
  scenes,
  currentSceneId,
  onSceneChange,
}) => {
  return (
    <div className="w-full bg-slate-950/80 backdrop-blur-md border-t border-slate-800/80 p-4 select-none">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">
          Tour Scenes
        </h3>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
          {scenes.map((scene) => {
            const isActive = scene.id === currentSceneId;
            return (
              <button
                key={scene.id}
                onClick={() => onSceneChange(scene.id)}
                className={`flex-shrink-0 flex items-start gap-3 p-2.5 rounded-xl text-left transition-all duration-200 w-64 border focus:outline-none cursor-pointer group ${
                  isActive
                    ? 'bg-slate-900 border-cyan-500 shadow-[0_0_12px_rgba(6,182,212,0.15)]'
                    : 'bg-slate-900/40 border-slate-800/60 hover:bg-slate-900/70 hover:border-slate-700'
                }`}
              >
                {/* Thumbnail Image */}
                <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-slate-950 border border-slate-800">
                  <img
                    src={scene.image}
                    alt={scene.title}
                    className={`w-full h-full object-cover transition-transform duration-300 ${
                      isActive ? 'scale-105' : 'group-hover:scale-105'
                    }`}
                  />
                  {isActive && (
                    <div className="absolute inset-0 bg-cyan-500/10 flex items-center justify-center">
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-pulse"></span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h4
                    className={`font-semibold text-sm truncate transition-colors ${
                      isActive ? 'text-cyan-400' : 'text-slate-100 group-hover:text-white'
                    }`}
                  >
                    {scene.title}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-normal">
                    {scene.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ThumbnailNav;
