import React, { useState } from 'react';
import { Heart, Search, EyeOff, Layers, Sparkles, Trash2 } from 'lucide-react';
import { ClothingItem } from '../types/wardrobe';

interface ClosetSectionProps {
  items: ClothingItem[];
  onToggleFavorite: (id: string) => void;
  onOpenUploadModal: () => void;
  onDeleteItem?: (id: string) => void;
  onCycleStatus?: (id: string) => void;
}

export const ClosetSection: React.FC<ClosetSectionProps> = ({
  items,
  onToggleFavorite,
  onOpenUploadModal,
  onDeleteItem,
  onCycleStatus,
}) => {
  const [stressFreeMode, setStressFreeMode] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showBanner, setShowBanner] = useState(true);

  const filteredItems = items.filter((item) => {
    if (stressFreeMode && item.isBulkyOrStored) return false;
    if (selectedCategory !== 'All' && item.category !== selectedCategory) return false;
    if (searchQuery.trim() && !item.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const categories = ['All', 'Tops', 'Bottoms', 'Outerwear', 'Shoes'];
  const bulkyCount = items.filter((item) => item.isBulkyOrStored).length;

  return (
    <div className="space-y-6">
      <div className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-container shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-on-surface">My Capsule Closet</h2>
            <p className="text-xs sm:text-sm text-secondary">
              Keep only what feels great. {filteredItems.length} of {items.length} items shown.
            </p>
          </div>

          <div className="bg-surface-container-low p-1 rounded-full flex items-center border border-surface-container">
            <button
              onClick={() => setStressFreeMode(true)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                stressFreeMode
                  ? 'bg-surface-container-lowest text-primary shadow-sm'
                  : 'text-secondary hover:text-on-surface'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              Stress-Free Mode
            </button>
            <button
              onClick={() => setStressFreeMode(false)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                !stressFreeMode
                  ? 'bg-surface-container-lowest text-primary shadow-sm'
                  : 'text-secondary hover:text-on-surface'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Show All ({items.length})
            </button>
          </div>
        </div>

        {showBanner && stressFreeMode && (
          <div className="flex items-center justify-between bg-surface-container-high/60 p-3.5 rounded-xl text-xs text-on-surface">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-secondary-container text-primary flex items-center justify-center shrink-0">
                <EyeOff className="w-3.5 h-3.5" />
              </div>
              <span>
                Hiding <strong className="font-semibold text-primary">{bulkyCount} bulky / out-of-season</strong> pieces so your morning choice is immediate and effortless.
              </span>
            </div>
            <button
              onClick={() => setShowBanner(false)}
              className="text-secondary hover:text-on-surface font-semibold underline shrink-0 ml-3"
            >
              Dismiss
            </button>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-surface text-secondary hover:bg-surface-container-low'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-secondary absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search garments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-xs bg-surface rounded-full border border-surface-container focus:outline-none focus:ring-2 focus:ring-primary/20 text-on-surface"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="group bg-surface-container-lowest p-3 rounded-2xl border border-surface-container hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-surface-container-low mb-2.5">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button
                  onClick={() => onToggleFavorite(item.id)}
                  title={item.isFavorite ? 'Remove from favorites' : 'Mark favorite'}
                  className={`absolute top-2 right-2 w-7 h-7 rounded-full backdrop-blur-md flex items-center justify-center transition-all ${
                    item.isFavorite
                      ? 'bg-rose-50 text-rose-500 shadow'
                      : 'bg-white/80 text-secondary hover:text-rose-500'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${item.isFavorite ? 'fill-rose-500' : ''}`} />
                </button>

                {item.isBulkyOrStored && (
                  <span className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-sm text-[9px] font-bold text-white uppercase tracking-wider">
                    Stored
                  </span>
                )}
              </div>

              <h4 className="text-xs font-bold text-on-surface truncate" title={item.title}>
                {item.title}
              </h4>
              <p className="text-[11px] text-secondary truncate">{item.subtitle}</p>
            </div>

            <div className="mt-2.5 pt-2 border-t border-surface-container flex items-center justify-between">
              <button
                onClick={() => onCycleStatus && onCycleStatus(item.id)}
                title="Click to cycle laundry status"
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full cursor-pointer hover:opacity-85 transition-opacity ${
                  item.status === 'Washed'
                    ? 'bg-emerald-50 text-emerald-700'
                    : item.status === 'In Laundry'
                    ? 'bg-amber-50 text-amber-800'
                    : 'bg-slate-100 text-slate-700'
                }`}
              >
                {item.status}
              </button>

              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-secondary">
                  {item.timesWorn}x
                </span>
                {onDeleteItem && (
                  <button
                    onClick={() => onDeleteItem(item.id)}
                    title="Delete item"
                    className="text-secondary/50 hover:text-rose-600 transition-colors p-0.5 rounded"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12 bg-surface-container-lowest rounded-2xl border border-dashed border-outline-variant space-y-3">
          <p className="text-sm font-semibold text-secondary">No garments match your current filter</p>
          <button
            onClick={onOpenUploadModal}
            className="px-5 py-2 rounded-full bg-primary text-white text-xs font-bold shadow hover:bg-primary-container transition-all"
          >
            Upload a piece now
          </button>
        </div>
      )}
    </div>
  );
};
