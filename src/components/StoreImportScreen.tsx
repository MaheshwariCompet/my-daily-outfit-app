import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, ChevronRight, CheckCircle2, Sparkles, Upload } from 'lucide-react';
import { ClothingItem, ClothingCategory } from '../types/wardrobe';

interface StoreImportScreenProps {
  onAddItem: (item: ClothingItem) => void;
  activeClosetId: string;
}

const SUPPORTED_STORES = [
  { id: 'amazon', name: 'AMAZON', subtitle: 'Sign in and Import from AMAZON' },
  { id: 'shein', name: 'SHEIN', subtitle: 'Sign in and Import from SHEIN' },
  { id: 'zara', name: 'ZARA', subtitle: 'Sign in and Import from ZARA' },
  { id: 'asos', name: 'ASOS', subtitle: 'Sign in and Import from ASOS' },
];

export const StoreImportScreen: React.FC<StoreImportScreenProps> = ({ onAddItem, activeClosetId }) => {
  const navigate = useNavigate();
  const [searchStore, setSearchStore] = useState('');
  const [selectedStore, setSelectedStore] = useState<string | null>(null);

  const [itemName, setItemName] = useState('');
  const [itemCategory, setItemCategory] = useState<ClothingCategory>('Tops');
  const [itemPrice, setItemPrice] = useState<number>(0);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const filteredStores = SUPPORTED_STORES.filter((s) =>
    s.name.toLowerCase().includes(searchStore.toLowerCase())
  );

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setImagePreview(uploadEvent.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemName.trim() || !imagePreview) {
      alert('Please enter an item name and upload a picture of the garment.');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      const newItem: ClothingItem = {
        id: `item-${Date.now()}`,
        title: itemName.trim(),
        category: itemCategory,
        price: Number(itemPrice) || 0,
        timesWorn: 0,
        lastWornDate: new Date().toISOString(),
        imageUrl: imagePreview,
        closetId: activeClosetId,
        importedFrom: (selectedStore?.toUpperCase() as any) || 'Manual',
        isFavorite: false,
      };

      onAddItem(newItem);
      setIsProcessing(false);
      setSuccessToast(`Added ${newItem.title} to your wardrobe!`);

      setTimeout(() => {
        navigate('/closet');
      }, 1000);
    }, 600);
  };

  return (
    <div className="max-w-2xl mx-auto py-4 px-4 sm:px-6 space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/closet')}
          className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container-low"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <button
          onClick={() => alert('Guide: How to import order receipts or camera photos.')}
          className="px-3.5 py-1.5 rounded-xl border border-surface-container text-xs font-bold text-on-surface hover:bg-surface-container-low"
        >
          Guide
        </button>
      </div>

      <div>
        <h1 className="text-2xl font-black text-on-surface tracking-tight">Select a store to import</h1>
        <p className="text-xs text-secondary mt-1">
          Import past orders from online retailers or upload camera photos.
        </p>
      </div>

      <div className="relative">
        <Search className="w-4 h-4 text-secondary absolute left-3.5 top-3.5" />
        <input
          type="text"
          placeholder="Search for a store"
          value={searchStore}
          onChange={(e) => setSearchStore(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-surface-container-low rounded-2xl border border-surface-container text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {!selectedStore && (
        <div className="space-y-3 pt-2">
          <span className="text-xs font-bold text-secondary uppercase tracking-wider block">Recommended</span>
          <div className="space-y-2.5">
            {filteredStores.map((store) => (
              <div
                key={store.id}
                onClick={() => setSelectedStore(store.name)}
                className="p-3.5 rounded-2xl bg-surface-container-lowest border border-surface-container hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-surface-container-low flex items-center justify-center font-black text-xs shrink-0">
                    {store.name}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-on-surface block group-hover:text-primary transition-colors">
                      {store.subtitle}
                    </span>
                    <span className="text-[11px] text-secondary">Verified Store Import</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-secondary group-hover:translate-x-1 transition-transform" />
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedStore && (
        <form onSubmit={handleImportSubmit} className="p-6 bg-surface-container-lowest rounded-3xl border-2 border-primary/30 shadow-md space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-surface-container pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <h3 className="font-bold text-sm text-on-surface">Importing from {selectedStore}</h3>
            </div>
            <button
              type="button"
              onClick={() => setSelectedStore(null)}
              className="text-xs font-bold text-primary hover:underline"
            >
              Back to stores
            </button>
          </div>

          <div>
            <label className="block text-xs font-bold text-secondary uppercase mb-1">
              Garment Picture (Take with Camera or Upload Image) *
            </label>
            <div className="flex items-center gap-4">
              {imagePreview ? (
                <div className="relative w-20 h-24 rounded-xl overflow-hidden border border-surface-container shrink-0">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-20 h-24 rounded-xl bg-surface-container-low border border-dashed border-outline-variant flex items-center justify-center text-secondary shrink-0">
                  <Upload className="w-5 h-5" />
                </div>
              )}
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="block w-full text-xs text-secondary file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-primary file:text-white hover:file:bg-primary-container cursor-pointer"
                />
                <span className="text-[10px] text-secondary mt-1 block">
                  Select a photo of the clothing item.
                </span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-secondary uppercase mb-1">Garment Name *</label>
            <input
              type="text"
              required
              placeholder={`e.g. ${selectedStore} Linen Shirt`}
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-surface border border-surface-container text-xs text-on-surface"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-secondary uppercase mb-1">Category</label>
              <select
                value={itemCategory}
                onChange={(e) => setItemCategory(e.target.value as any)}
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
              <label className="block text-xs font-bold text-secondary uppercase mb-1">Price Paid ($)</label>
              <input
                type="number"
                min={0}
                step="0.01"
                value={itemPrice}
                onChange={(e) => setItemPrice(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-surface border border-surface-container text-xs text-on-surface"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className="w-full py-3 rounded-full bg-primary hover:bg-primary-container text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isProcessing ? 'Saving Garment...' : 'Add to Closet'}</span>
          </button>
        </form>
      )}

      {successToast && (
        <div className="p-3.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successToast}</span>
        </div>
      )}
    </div>
  );
};