import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart2, Heart, Wand2, Share2, Plus, 
  Trash2, ShoppingBag, FolderPlus, ChevronDown, UploadCloud 
} from 'lucide-react';
import { ClothingItem, SubCloset } from '../types/wardrobe';

interface ClosetSectionProps {
  items: ClothingItem[];
  subClosets: SubCloset[];
  onAddSubCloset: (name: string) => void;
  onDeleteItem: (id: string) => void;
  onCycleStatus: (id: string) => void;
  onOpenUploadModal: () => void;
}

export const ClosetSection: React.FC<ClosetSectionProps> = ({
  items,
  subClosets,
  onAddSubCloset,
  onDeleteItem,
  onCycleStatus,
  onOpenUploadModal,
}) => {
  const navigate = useNavigate();
  const [selectedClosetId, setSelectedClosetId] = useState<string>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newClosetName, setNewClosetName] = useState('');

  const activeItems = selectedClosetId === 'all'
    ? items
    : items.filter((item) => item.closetId === selectedClosetId);

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClosetName.trim()) return;
    onAddSubCloset(newClosetName.trim());
    setNewClosetName('');
    setShowCreateModal(false);
  };

  return (
    <div className="max-w-4xl mx-auto py-2 px-4 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <h1 className="text-2xl font-black text-on-surface">Closet</h1>
          <ChevronDown className="w-5 h-5 text-secondary" />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/store-import')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-surface-container-low hover:bg-surface-container text-primary text-xs font-bold border border-surface-container transition-all"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Import Store</span>
          </button>
          <button
            onClick={onOpenUploadModal}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-primary hover:bg-primary-container text-white text-xs font-bold shadow transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Clothes</span>
          </button>
        </div>
      </div>

      {/* Progress Reward Banner */}
      <div className="bg-surface-container-low p-3.5 rounded-2xl border border-surface-container flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-lg bg-primary text-white flex items-center justify-center text-xs font-bold">
            {items.length}
          </span>
          <span className="text-xs font-bold text-on-surface">
            {items.length === 0 
              ? "Your digital wardrobe is empty! Add your real garments to begin." 
              : "Great habit! Don't forget to track what you wear today."}
          </span>
        </div>
        <span className="text-xs font-bold text-secondary">{items.length} Total</span>
      </div>

      {/* Circular Action Navigation */}
      <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 text-center">
        <button onClick={() => navigate('/stats')} className="flex flex-col items-center gap-1.5 group">
          <div className="w-12 h-12 rounded-full bg-surface-container-lowest border border-surface-container flex items-center justify-center text-on-surface shadow-sm group-hover:scale-105 transition-transform">
            <BarChart2 className="w-5 h-5 text-primary" />
          </div>
          <span className="text-[11px] font-semibold text-secondary">Style stats</span>
        </button>

        <button onClick={() => navigate('/store-import')} className="flex flex-col items-center gap-1.5 group">
          <div className="w-12 h-12 rounded-full bg-surface-container-lowest border border-surface-container flex items-center justify-center text-on-surface shadow-sm group-hover:scale-105 transition-transform">
            <ShoppingBag className="w-5 h-5 text-emerald-600" />
          </div>
          <span className="text-[11px] font-semibold text-secondary">Import Store</span>
        </button>

        <button onClick={onOpenUploadModal} className="flex flex-col items-center gap-1.5 group">
          <div className="w-12 h-12 rounded-full bg-surface-container-lowest border border-surface-container flex items-center justify-center text-on-surface shadow-sm group-hover:scale-105 transition-transform">
            <Wand2 className="w-5 h-5 text-amber-600" />
          </div>
          <span className="text-[11px] font-semibold text-secondary">Add Photo</span>
        </button>

        <button onClick={() => alert('Wishlist is ready. Add items when you test stores before buying!')} className="flex flex-col items-center gap-1.5 group">
          <div className="w-12 h-12 rounded-full bg-surface-container-lowest border border-surface-container flex items-center justify-center text-on-surface shadow-sm group-hover:scale-105 transition-transform">
            <Heart className="w-5 h-5 text-rose-500" />
          </div>
          <span className="text-[11px] font-semibold text-secondary">Wishlist</span>
        </button>

        <button 
          onClick={() => {
            if (navigator.share) {
              navigator.share({ title: 'My Wardrobe', text: `I have ${items.length} items logged on MyDailyFit.` });
            } else {
              alert('Closet link copied to clipboard.');
            }
          }} 
          className="hidden sm:flex flex-col items-center gap-1.5 group"
        >
          <div className="w-12 h-12 rounded-full bg-surface-container-lowest border border-surface-container flex items-center justify-center text-on-surface shadow-sm group-hover:scale-105 transition-transform">
            <Share2 className="w-5 h-5 text-secondary" />
          </div>
          <span className="text-[11px] font-semibold text-secondary">Share Closet</span>
        </button>
      </div>

      {/* Sub-Closet Folders Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {/* All Clothes Folder with dynamic 4-Item Preview */}
        <div
          onClick={() => setSelectedClosetId('all')}
          className={`p-4 rounded-3xl bg-surface-container-lowest border transition-all cursor-pointer ${
            selectedClosetId === 'all' ? 'border-primary ring-2 ring-primary/20 shadow-md' : 'border-surface-container hover:shadow-sm'
          }`}
        >
          <div className="aspect-square rounded-2xl overflow-hidden bg-surface-container-low p-2 mb-3">
            {items.length === 0 ? (
              <div className="w-full h-full flex flex-col items-center justify-center text-secondary border border-dashed border-outline-variant rounded-xl">
                <UploadCloud className="w-6 h-6 mb-1 text-secondary/60" />
                <span className="text-[10px] font-medium">Empty Closet</span>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-1.5 h-full">
                {items.slice(0, 4).map((imgItem) => (
                  <img key={imgItem.id} src={imgItem.imageUrl} alt={imgItem.title} className="w-full h-full object-cover rounded-xl bg-white" />
                ))}
              </div>
            )}
          </div>
          <h3 className="font-extrabold text-sm text-on-surface">All Clothes</h3>
          <span className="text-xs text-secondary">{items.length} items</span>
        </div>

        {/* Custom User Sub-Closets */}
        {subClosets.filter(c => c.id !== 'all').map((closet) => {
          const closetItems = items.filter((i) => i.closetId === closet.id);
          return (
            <div
              key={closet.id}
              onClick={() => setSelectedClosetId(closet.id)}
              className={`p-4 rounded-3xl bg-surface-container-lowest border transition-all cursor-pointer ${
                selectedClosetId === closet.id ? 'border-primary ring-2 ring-primary/20 shadow-md' : 'border-surface-container hover:shadow-sm'
              }`}
            >
              <div className="aspect-square rounded-2xl overflow-hidden bg-surface-container-low mb-3">
                {closetItems.length === 0 ? (
                  <div className="w-full h-full flex flex-col items-center justify-center text-secondary border border-dashed border-outline-variant rounded-xl">
                    <span className="text-[10px] font-medium">0 items</span>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-1.5 p-2 h-full">
                    {closetItems.slice(0, 4).map((imgItem) => (
                      <img key={imgItem.id} src={imgItem.imageUrl} alt={imgItem.title} className="w-full h-full object-cover rounded-xl bg-white" />
                    ))}
                  </div>
                )}
              </div>
              <h3 className="font-extrabold text-sm text-on-surface">{closet.name}</h3>
              <span className="text-xs text-secondary">{closetItems.length} items</span>
            </div>
          );
        })}

        {/* Create Sub-Closet Button */}
        <div
          onClick={() => setShowCreateModal(true)}
          className="p-4 rounded-3xl border-2 border-dashed border-surface-container hover:border-primary/40 flex flex-col items-center justify-center text-center cursor-pointer min-h-[200px] transition-colors"
        >
          <div className="w-10 h-10 rounded-2xl bg-surface-container-low flex items-center justify-center text-primary mb-2">
            <FolderPlus className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-on-surface">Create closet</span>
          <span className="text-[10px] text-secondary">Organize by season or trip</span>
        </div>
      </div>

      {/* Items Grid */}
      <div className="space-y-4 pt-4 border-t border-surface-container">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-sm text-on-surface">
            {selectedClosetId === 'all' ? 'All Garments' : 'Folder Contents'} ({activeItems.length})
          </h3>
          <span className="text-[11px] text-secondary">Tap laundry badge to cycle Washed / In Laundry</span>
        </div>

        {activeItems.length === 0 ? (
          <div className="p-10 rounded-3xl bg-surface-container-lowest border border-dashed border-surface-container text-center space-y-3">
            <p className="text-xs text-secondary font-medium">
              No garments in this folder yet. Take a camera picture or import from an online store.
            </p>
            <div className="flex justify-center gap-2">
              <button
                onClick={onOpenUploadModal}
                className="px-5 py-2.5 rounded-full bg-primary text-white text-xs font-bold shadow"
              >
                Upload Photo
              </button>
              <button
                onClick={() => navigate('/store-import')}
                className="px-5 py-2.5 rounded-full bg-surface-container text-primary text-xs font-bold"
              >
                Import from Store
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
            {activeItems.map((item) => (
              <div key={item.id} className="p-2.5 rounded-2xl bg-surface-container-lowest border border-surface-container flex flex-col justify-between">
                <div>
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-surface-container-low mb-2">
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                    {item.importedFrom && item.importedFrom !== 'Manual' && (
                      <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-sm text-[8px] font-bold text-white uppercase tracking-wider">
                        {item.importedFrom}
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-xs text-on-surface truncate" title={item.title}>
                    {item.title}
                  </h4>
                  <div className="flex items-center justify-between text-[11px] text-secondary mt-0.5">
                    <span>${item.price.toFixed(2)}</span>
                    <span>{item.timesWorn}x worn</span>
                  </div>
                </div>

                <div className="mt-2.5 pt-2 border-t border-surface-container flex items-center justify-between">
                  <button
                    onClick={() => onCycleStatus(item.id)}
                    className={`text-[9px] font-bold px-2 py-0.5 rounded-full cursor-pointer hover:opacity-85 ${
                      item.status === 'Washed' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-800'
                    }`}
                  >
                    {item.status}
                  </button>
                  <button onClick={() => onDeleteItem(item.id)} className="text-secondary/40 hover:text-rose-600 p-0.5">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Sub-Closet Dialog */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleCreateSubmit} className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4">
            <h3 className="font-bold text-base text-slate-900">Create New Closet</h3>
            <input
              type="text"
              required
              placeholder="e.g. Workwear Capsule, Vacation"
              value={newClosetName}
              onChange={(e) => setNewClosetName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-xs font-bold text-slate-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-full bg-slate-900 text-white text-xs font-bold"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};