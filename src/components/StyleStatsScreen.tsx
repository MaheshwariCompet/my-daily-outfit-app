import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ChevronRight, Download } from 'lucide-react';
import { ClothingItem } from '../types/wardrobe';

interface StyleStatsScreenProps {
  clothes: ClothingItem[];
  ootdCount: number;
}

export const StyleStatsScreen: React.FC<StyleStatsScreenProps> = ({ clothes, ootdCount }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'Item' | 'Outfit' | 'Purchase'>('Item');
  const [showShareModal, setShowShareModal] = useState(false);

  const totalItems = clothes.length;
  const totalValue = clothes.reduce((sum, item) => sum + (item.price || 0), 0);
  const totalWears = clothes.reduce((sum, item) => sum + (item.timesWorn || 0), 0);

  const topsCount = clothes.filter((c) => c.category === 'Tops').length;
  const bottomsCount = clothes.filter((c) => c.category === 'Bottoms').length;
  const outerCount = clothes.filter((c) => c.category === 'Outerwear').length;
  const shoesCount = clothes.filter((c) => c.category === 'Shoes').length;

  const topsPercent = totalItems > 0 ? Math.round((topsCount / totalItems) * 100) : 0;
  const bottomsPercent = totalItems > 0 ? Math.round((bottomsCount / totalItems) * 100) : 0;
  const outerPercent = totalItems > 0 ? Math.round((outerCount / totalItems) * 100) : 0;
  const shoesPercent = totalItems > 0 ? Math.round((shoesCount / totalItems) * 100) : 0;

  const rankedByCPW = [...clothes]
    .map((item) => {
      const wears = Math.max(item.timesWorn, 1);
      const cpw = item.price / wears;
      return { ...item, cpw: Number(cpw.toFixed(2)) };
    })
    .sort((a, b) => a.cpw - b.cpw);

  return (
    <div className="max-w-2xl mx-auto py-4 px-4 sm:px-6 space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/closet')}
          className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container-low"
        >
          <X className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold text-on-surface">Style stats</h1>
        <div className="w-10" />
      </div>

      {/* Counters */}
      <div className="grid grid-cols-3 gap-3 bg-surface-container-lowest p-5 rounded-2xl border border-surface-container shadow-sm text-center">
        <div>
          <span className="text-xs font-semibold text-secondary block">Item</span>
          <span className="text-2xl font-black text-primary">{totalItems}</span>
        </div>
        <div>
          <span className="text-xs font-semibold text-secondary block">Total Wears</span>
          <span className="text-2xl font-black text-primary">{totalWears}</span>
        </div>
        <div>
          <span className="text-xs font-semibold text-secondary block">OOTD Logged</span>
          <span className="text-2xl font-black text-primary">{ootdCount}</span>
        </div>
      </div>

      {/* Category Proportions */}
      <div className="bg-surface-container-lowest p-5 rounded-2xl border border-surface-container shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-bold text-sm text-on-surface">Category Distribution</span>
          <span className="text-xs text-secondary font-semibold">{totalItems} items entered</span>
        </div>

        {totalItems === 0 ? (
          <p className="text-xs text-secondary py-4 text-center">
            Upload clothes to view your personal category breakdown.
          </p>
        ) : (
          <div className="flex items-center justify-around gap-4 pt-1">
            <div className="relative w-28 h-28 shrink-0">
              <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                <path
                  className="text-surface-container"
                  strokeWidth="4"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-[#4a6fa5]"
                  strokeDasharray={`${outerPercent}, 100`}
                  strokeWidth="4"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-[#10b981]"
                  strokeDasharray={`${topsPercent}, 100`}
                  strokeDashoffset={`-${outerPercent}`}
                  strokeWidth="4"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
            </div>

            <div className="space-y-1.5 text-xs font-semibold text-secondary">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#4a6fa5]" />
                <span>Outerwears: {outerPercent}% ({outerCount})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#10b981]" />
                <span>Tops: {topsPercent}% ({topsCount})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#f59e0b]" />
                <span>Pants: {bottomsPercent}% ({bottomsCount})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#8b5cf6]" />
                <span>Shoes: {shoesPercent}% ({shoesCount})</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex border-b border-surface-container">
        {(['Item', 'Outfit', 'Purchase'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-center text-xs font-bold transition-all border-b-2 ${
              activeTab === tab
                ? 'border-on-surface text-on-surface'
                : 'border-transparent text-secondary hover:text-on-surface'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Utilization Stats */}
      <div className="space-y-3">
        <span className="text-xs font-semibold text-secondary uppercase tracking-wider block">
          Utilization Stats
        </span>

        <div className="bg-surface-container-lowest rounded-2xl border border-surface-container divide-y divide-surface-container overflow-hidden">
          <div
            onClick={() => setShowShareModal(true)}
            className="p-4 flex items-center justify-between hover:bg-surface-container-low transition-colors cursor-pointer group"
          >
            <div>
              <span className="text-sm font-bold text-on-surface block group-hover:text-primary transition-colors">
                Cost per wear
              </span>
              <span className="text-xs text-secondary">Ranked by actual value delivered</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                View Ranking
              </span>
              <ChevronRight className="w-4 h-4 text-secondary group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          <div className="p-4 flex items-center justify-between">
            <div>
              <span className="text-sm font-bold text-on-surface block">Closet Total Value</span>
              <span className="text-xs text-secondary">Sum of purchased prices</span>
            </div>
            <span className="text-base font-extrabold text-on-surface">${totalValue.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 bg-black/90 flex flex-col justify-between p-4 sm:p-6 animate-fadeIn">
          <div className="flex justify-end">
            <button
              onClick={() => setShowShareModal(false)}
              className="text-white hover:opacity-75 p-2 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full mx-auto shadow-2xl text-center space-y-5 text-black">
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Cost per Wear</span>
              <h2 className="text-xl font-black text-slate-900 mt-1">Ranked by Cost per Wear</h2>
            </div>

            {rankedByCPW.length === 0 ? (
              <p className="text-xs text-slate-400 py-6">No clothes available to rank yet.</p>
            ) : (
              <div className="space-y-4 pt-2">
                {rankedByCPW.slice(0, 3).map((item, index) => (
                  <div key={item.id} className="flex items-center justify-between gap-3 text-left">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold shrink-0">
                        {index + 1}
                      </span>
                      <img src={item.imageUrl} alt={item.title} className="w-12 h-14 rounded-lg object-cover bg-slate-100" />
                      <div>
                        <span className="text-xs font-bold text-slate-900 block truncate max-w-[120px]">{item.title}</span>
                        <span className="text-[10px] text-slate-400">{item.timesWorn} times worn</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-sm font-black text-rose-500">${item.cpw.toFixed(2)}</span>
                      <span className="text-[10px] text-slate-400 block">${item.price.toFixed(2)} total</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-400 font-medium">
              Digital closet <span className="font-serif italic font-bold text-slate-800">MyDailyFit</span>
              <span className="block mt-0.5">Real-time analysis as of {new Date().toLocaleDateString()}</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 max-w-sm w-full mx-auto">
            <button
              onClick={() => alert('Report saved to device.')}
              className="p-3.5 rounded-2xl border border-white/20 text-white hover:bg-white/10"
            >
              <Download className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: 'My Wardrobe Stats', text: 'My real Cost Per Wear report.' });
                } else {
                  alert('Share link copied!');
                }
              }}
              className="flex-1 py-3.5 rounded-2xl border border-white/30 text-white font-bold text-xs hover:bg-white/10"
            >
              Share
            </button>
          </div>
        </div>
      )}
    </div>
  );
};