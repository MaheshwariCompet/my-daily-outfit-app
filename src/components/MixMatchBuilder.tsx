import React, { useState } from 'react';
import { Sparkles, Shuffle, Check } from 'lucide-react';
import { ClothingItem } from '../types/wardrobe';

interface MixMatchBuilderProps {
  anchorItem: ClothingItem;
  bottomOptions: ClothingItem[];
}

export const MixMatchBuilder: React.FC<MixMatchBuilderProps> = ({
  anchorItem,
  bottomOptions,
}) => {
  const [candidateList, setCandidateList] = useState<ClothingItem[]>(bottomOptions);
  const [selectedCanvasBottomId, setSelectedCanvasBottomId] = useState<string>(
    bottomOptions[0]?.id || ''
  );

  const handleShuffleCanvasBottoms = () => {
    const shuffled = [...bottomOptions].sort(() => 0.5 - Math.random());
    setCandidateList(shuffled);
    if (shuffled.length > 0) {
      setSelectedCanvasBottomId(shuffled[0].id);
    }
  };

  const currentCandidates = candidateList.length > 0 ? candidateList.slice(0, 3) : bottomOptions.slice(0, 3);

  return (
    <section className="bg-surface-container-lowest p-6 sm:p-8 rounded-2xl border border-surface-container shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-primary-container/10 flex items-center justify-center text-primary">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-on-surface">Mix & Match Canvas</h2>
            <p className="text-xs text-secondary">Test how 1 versatile anchor top anchors your bottom rotation</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-xs font-semibold">
            Versatility: {bottomOptions.length} Pairs Validated
          </span>
          <button
            onClick={handleShuffleCanvasBottoms}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-surface-container-low hover:bg-surface-container text-xs font-bold text-primary transition-colors"
          >
            <Shuffle className="w-3.5 h-3.5" />
            Shuffle Canvas Options
          </button>
        </div>
      </div>

      <div className="relative bg-surface rounded-2xl p-6 border border-surface-container overflow-hidden">
        <div className="max-w-xs mx-auto text-center space-y-2">
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm bg-surface-container-lowest group">
            <img
              src={anchorItem.imageUrl}
              alt={anchorItem.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-white/90 text-[10px] font-bold uppercase text-primary tracking-wider shadow-sm">
              Anchor Piece
            </span>
          </div>
          <div>
            <h3 className="font-bold text-sm text-on-surface">{anchorItem.title}</h3>
            <p className="text-xs text-secondary">Worn {anchorItem.timesWorn} times • High Versatility</p>
          </div>
        </div>

        <div className="relative w-full h-14 my-1 pointer-events-none">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 48" fill="none">
            <path d="M200 0 V16" stroke="#4a6fa5" strokeWidth="2" strokeDasharray="3 3" strokeLinecap="round" />
            <path d="M200 16 C200 32 100 24 100 48" stroke="#4a6fa5" strokeWidth="2" strokeLinecap="round" />
            <path d="M200 16 C200 32 300 24 300 48" stroke="#4a6fa5" strokeWidth="2" strokeLinecap="round" />
            <circle cx="200" cy="16" r="4" fill="#4a6fa5" />
          </svg>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {currentCandidates.map((bottom, index) => {
            const isSelected = bottom.id === selectedCanvasBottomId;
            return (
              <div
                key={bottom.id}
                onClick={() => setSelectedCanvasBottomId(bottom.id)}
                className={`p-3 rounded-xl cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-surface-container-lowest ring-2 ring-primary shadow-md scale-[1.02]'
                    : 'bg-surface-container-lowest/70 hover:bg-surface-container-lowest hover:shadow-sm'
                }`}
              >
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-surface-container mb-2">
                  <img
                    src={bottom.imageUrl}
                    alt={bottom.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-white/90 text-[10px] font-bold text-primary">
                    Option {String.fromCharCode(65 + index)}
                  </span>
                  {isSelected && (
                    <span className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center shadow">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-on-surface truncate">{bottom.title}</h4>
                  <p className="text-[11px] text-secondary truncate">{bottom.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};