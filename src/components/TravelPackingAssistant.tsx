import React, { useState } from 'react';
import { Plane, Luggage, Calendar, Sparkles, Check, MapPin } from 'lucide-react';
import { ClothingItem } from '../types/wardrobe';

interface TravelPackingAssistantProps {
  clothes: ClothingItem[];
}

export const TravelPackingAssistant: React.FC<TravelPackingAssistantProps> = ({ clothes }) => {
  const [destination, setDestination] = useState('');
  const [durationDays, setDurationDays] = useState(3);
  const [packedItems, setPackedItems] = useState<{ [id: string]: boolean }>({});

  const tops = clothes.filter((c) => c.category === 'Tops' || c.category === 'Outerwear').slice(0, Math.min(3, clothes.length));
  const bottoms = clothes.filter((c) => c.category === 'Bottoms').slice(0, Math.min(2, clothes.length));
  const shoes = clothes.filter((c) => c.category === 'Shoes').slice(0, 1);

  const capsuleItems = [...tops, ...bottoms, ...shoes];

  const toggleCheck = (id: string) => {
    setPackedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const packedCount = Object.values(packedItems).filter(Boolean).length;

  return (
    <div className="max-w-4xl mx-auto py-2 px-4 space-y-6">
      <div className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-container shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-secondary-container text-primary flex items-center justify-center font-bold">
            <Plane className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-on-surface">Travel Packing Assistant</h2>
            <p className="text-xs text-secondary">
              Generates a carry-on capsule list using only garments currently in your digital wardrobe.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-surface-container">
          <div>
            <label className="block text-[11px] font-bold text-secondary uppercase mb-1">Destination City</label>
            <input
              type="text"
              placeholder="e.g. Tokyo, London, Mumbai"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-surface border border-surface-container text-xs text-on-surface"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-secondary uppercase mb-1">Duration (Days)</label>
            <input
              type="number"
              min={1}
              max={30}
              value={durationDays}
              onChange={(e) => setDurationDays(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl bg-surface border border-surface-container text-xs text-on-surface"
            />
          </div>

          <div className="flex items-end">
            <span className="text-xs text-secondary">
              Available wardrobe items: <strong>{clothes.length}</strong>
            </span>
          </div>
        </div>
      </div>

      {capsuleItems.length === 0 ? (
        <div className="p-8 rounded-2xl bg-surface-container-lowest border border-dashed border-surface-container text-center space-y-2">
          <p className="text-xs text-secondary">
            Your wardrobe has no items to pack yet. Upload clothes to build your travel packing list.
          </p>
        </div>
      ) : (
        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-container shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-on-surface">
              {durationDays}-Day Suggested Capsule {destination && `for ${destination}`}
            </h3>
            <span className="text-xs font-bold text-primary">{packedCount} of {capsuleItems.length} packed</span>
          </div>

          <div className="space-y-2">
            {capsuleItems.map((item) => {
              const isChecked = !!packedItems[item.id];
              return (
                <div
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    isChecked ? 'bg-emerald-50/60 border-emerald-300' : 'bg-surface border-surface-container'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center ${isChecked ? 'bg-emerald-600 text-white' : 'border border-outline-variant'}`}>
                      {isChecked && <Check className="w-3.5 h-3.5" />}
                    </div>
                    <img src={item.imageUrl} alt={item.title} className="w-10 h-10 rounded-lg object-cover" />
                    <div>
                      <h4 className={`text-xs font-bold ${isChecked ? 'line-through text-secondary' : 'text-on-surface'}`}>
                        {item.title}
                      </h4>
                      <span className="text-[10px] text-secondary">{item.category}</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-surface-container text-secondary">
                    ${item.price.toFixed(2)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};