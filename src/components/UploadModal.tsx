import React, { useState, useRef } from 'react';
import { X, UploadCloud, CheckCircle, Wand2 } from 'lucide-react';
import { ClothingCategory, ClothingStatus, ClothingItem } from '../types/wardrobe';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddItem: (item: ClothingItem) => void;
}

export const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose, onAddItem }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ClothingCategory>('Tops');
  const [subtitle, setSubtitle] = useState('');
  const [status, setStatus] = useState<ClothingStatus>('Washed');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isBulky, setIsBulky] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const cleanName = file.name
        .replace(/\.[^/.]+$/, '')
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase());

      const lower = file.name.toLowerCase();
      let detectedCategory: ClothingCategory = 'Tops';
      let detectedBulky = false;

      if (lower.includes('pant') || lower.includes('jean') || lower.includes('trouser') || lower.includes('chino') || lower.includes('short')) {
        detectedCategory = 'Bottoms';
      } else if (lower.includes('jacket') || lower.includes('coat') || lower.includes('overshirt') || lower.includes('hoodie') || lower.includes('cardigan')) {
        detectedCategory = 'Outerwear';
        if (lower.includes('heavy') || lower.includes('coat') || lower.includes('winter')) {
          detectedBulky = true;
        }
      } else if (lower.includes('shoe') || lower.includes('boot') || lower.includes('sneaker')) {
        detectedCategory = 'Shoes';
      }

      setTitle(cleanName || 'Custom Wardrobe Piece');
      setCategory(detectedCategory);
      setIsBulky(detectedBulky);
      setSubtitle('Custom personal wardrobe piece');

      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newItem: ClothingItem = {
      id: `item-${Date.now()}`,
      title: title.trim(),
      category,
      subtitle: subtitle.trim() || 'Organic comfortable fit',
      status,
      timesWorn: 0,
      lastWornDaysAgo: 0,
      imageUrl: previewUrl || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=700&q=80',
      isFavorite: false,
      isBulkyOrStored: isBulky,
    };

    onAddItem(newItem);
    setTitle('');
    setSubtitle('');
    setPreviewUrl(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-on-surface/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-surface-container-lowest rounded-2xl w-full max-w-lg shadow-2xl border border-surface-container flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-5 border-b border-surface-container shrink-0 bg-surface-container-lowest">
          <div>
            <h3 className="text-lg font-bold text-on-surface">Add Your Clothes Picture</h3>
            <p className="text-xs text-secondary">Upload personal clothes; name and category auto-populate</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-secondary hover:text-on-surface hover:bg-surface-container-low transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 overflow-y-auto flex-1">
          <div>
            <label className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-2">
              Garment Photo
            </label>
            <div
              onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                dragActive ? 'border-primary bg-surface-container-low' : 'border-outline-variant hover:border-primary/60 bg-surface'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              />

              {previewUrl ? (
                <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden group">
                  <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold">
                    Click to choose another photo
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center py-5">
                  <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-primary mb-2">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-semibold text-on-surface">Click to select or drag & drop</p>
                  <p className="text-xs text-secondary mt-1">Upload your actual camera picture (PNG, JPG)</p>
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-secondary uppercase tracking-wider">
                Garment Name *
              </label>
              <span className="text-[11px] text-primary flex items-center gap-1 font-medium">
                <Wand2 className="w-3 h-3" /> Auto-populated on upload
              </span>
            </div>
            <input
              type="text"
              required
              placeholder="e.g. My Favorite Green Linen Shirt"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-surface border border-surface-container focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm text-on-surface"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ClothingCategory)}
                className="w-full px-3 py-2.5 rounded-xl bg-surface border border-surface-container focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm text-on-surface"
              >
                <option value="Tops">Tops</option>
                <option value="Bottoms">Bottoms</option>
                <option value="Outerwear">Outerwear</option>
                <option value="Shoes">Shoes</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-1.5">
                Laundry State
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ClothingStatus)}
                className="w-full px-3 py-2.5 rounded-xl bg-surface border border-surface-container focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm text-on-surface"
              >
                <option value="Washed">Washed (Ready)</option>
                <option value="In Laundry">In Laundry</option>
                <option value="Resting">Resting</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-1.5">
              Fabric & Comfort Notes
            </label>
            <input
              type="text"
              placeholder="e.g. 100% Breathable cotton, relaxed fit"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-surface border border-surface-container focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm text-on-surface"
            />
          </div>

          <div className="flex items-center gap-2 p-3 rounded-xl bg-surface border border-surface-container">
            <input
              type="checkbox"
              id="isBulky"
              checked={isBulky}
              onChange={(e) => setIsBulky(e.target.checked)}
              className="w-4 h-4 text-primary rounded"
            />
            <label htmlFor="isBulky" className="text-xs text-on-surface font-medium cursor-pointer">
              Mark as bulky / out-of-season item (hidden in Stress-Free mode)
            </label>
          </div>

          <div className="pt-3 flex items-center justify-end gap-3 border-t border-surface-container sticky bottom-0 bg-surface-container-lowest pb-1">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full text-xs font-semibold text-secondary hover:text-on-surface"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!title.trim()}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary hover:bg-primary-container text-white text-xs font-semibold shadow-md disabled:opacity-50 transition-all"
            >
              <CheckCircle className="w-4 h-4" />
              Save to My Closet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
