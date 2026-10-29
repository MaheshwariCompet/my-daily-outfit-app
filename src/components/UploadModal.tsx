import React, { useState, useRef } from 'react';
import { X, UploadCloud, CheckCircle } from 'lucide-react';
import { ClothingCategory, ClothingStatus, ClothingItem } from '../types/wardrobe';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddItem: (item: ClothingItem) => void;
}

export const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose, onAddItem }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ClothingCategory>('Tops');
  const [price, setPrice] = useState<number>(0);
  const [status, setStatus] = useState<ClothingStatus>('Washed');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const cleanName = file.name
        .replace(/\.[^/.]+$/, '')
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase());

      setTitle(cleanName || '');
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !previewUrl) {
      alert('Please provide a garment name and select a photo.');
      return;
    }

    const newItem: ClothingItem = {
      id: `item-${Date.now()}`,
      title: title.trim(),
      category,
      price: Number(price) || 0,
      status,
      timesWorn: 0,
      imageUrl: previewUrl,
      closetId: 'all',
      isFavorite: false,
    };

    onAddItem(newItem);
    setTitle('');
    setPreviewUrl(null);
    setPrice(0);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-on-surface/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-surface-container-lowest rounded-2xl w-full max-w-lg shadow-2xl border border-surface-container flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-5 border-b border-surface-container shrink-0">
          <div>
            <h3 className="text-lg font-bold text-on-surface">Add Clothing Photo</h3>
            <p className="text-xs text-secondary">Upload a real camera photo or screenshot</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center text-secondary hover:text-on-surface">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 overflow-y-auto flex-1">
          <div>
            <label className="block text-xs font-semibold text-secondary uppercase mb-2">Photo *</label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-outline-variant hover:border-primary/60 rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer bg-surface"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              />

              {previewUrl ? (
                <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
                  <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="flex flex-col items-center py-6">
                  <UploadCloud className="w-8 h-8 text-primary mb-2" />
                  <p className="text-sm font-semibold text-on-surface">Select image or camera photo</p>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-secondary uppercase">Garment Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Blue Linen Button-down"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-surface border border-surface-container text-xs text-on-surface mt-1"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-secondary uppercase mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ClothingCategory)}
                className="w-full px-3 py-2 rounded-xl bg-surface border border-surface-container text-xs text-on-surface"
              >
                <option value="Tops">Tops</option>
                <option value="Bottoms">Bottoms</option>
                <option value="Outerwear">Outerwear</option>
                <option value="Shoes">Shoes</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-secondary uppercase mb-1">Price Paid ($)</label>
              <input
                type="number"
                min={0}
                step="0.01"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-surface border border-surface-container text-xs text-on-surface"
              />
            </div>
          </div>

          <div className="pt-3 flex items-center justify-end gap-3 border-t border-surface-container">
            <button type="button" onClick={onClose} className="px-4 py-2 text-xs font-semibold text-secondary">
              Cancel
            </button>
            <button
              type="submit"
              disabled={!title.trim() || !previewUrl}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-primary text-white text-xs font-bold shadow disabled:opacity-50"
            >
              <CheckCircle className="w-4 h-4" />
              Save to Closet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};