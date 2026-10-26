import React, { useState } from 'react';
import { PieChart, AlertCircle, ArrowRight } from 'lucide-react';
import { ClothingItem } from '../types/wardrobe';

interface InsightsSectionProps {
  clothes: ClothingItem[];
  onSetForTomorrow: (item: ClothingItem) => void;
}

export const InsightsSection: React.FC<InsightsSectionProps> = ({ clothes, onSetForTomorrow }) => {
  const [activeSegment, setActiveSegment] = useState<'rotation' | 'stored'>('rotation');

  const totalItems = clothes.length;
  const storedItems = clothes.filter((c) => c.isBulkyOrStored).length;
  const inRotationItems = totalItems - storedItems;
  const rotationPercent = totalItems > 0 ? Math.round((inRotationItems / totalItems) * 100) : 100;
  const storedPercent = 100 - rotationPercent;

  const washedCount = clothes.filter((c) => c.status === 'Washed').length;
  const laundryCount = clothes.filter((c) => c.status === 'In Laundry').length;
  const forgottenItems = clothes.filter((c) => c.lastWornDaysAgo > 60 || c.timesWorn === 0).slice(0, 3);

  const circumference = 289;
  const strokeWorn = (rotationPercent / 100) * circumference;
  const strokeStored = circumference - strokeWorn;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 bg-surface-container-lowest p-6 rounded-2xl border border-surface-container shadow-sm flex flex-col items-center justify-between">
          <div className="w-full flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <PieChart className="w-4 h-4 text-primary" />
              <h3 className="font-bold text-sm text-on-surface">Closet Balance Ratio</h3>
            </div>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-secondary-container text-primary font-semibold">
              Live Real Data
            </span>
          </div>

          <div className="relative w-48 h-48 my-2 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="46" fill="transparent" stroke="#e5eeff" strokeWidth="16" />
              <circle
                cx="60"
                cy="60"
                r="46"
                fill="transparent"
                stroke="#f5bc7e"
                strokeWidth="16"
                strokeDasharray={`${strokeStored} ${circumference}`}
                strokeDashoffset={`-${strokeWorn}`}
                className="cursor-pointer transition-all duration-300 hover:opacity-80"
                onClick={() => setActiveSegment('stored')}
              />
              <circle
                cx="60"
                cy="60"
                r="46"
                fill="transparent"
                stroke="#4a6fa5"
                strokeWidth="16"
                strokeDasharray={`${strokeWorn} ${circumference}`}
                strokeDashoffset="0"
                className="cursor-pointer transition-all duration-300 hover:opacity-80"
                onClick={() => setActiveSegment('rotation')}
              />
            </svg>
            <div className="absolute flex flex-col items-center text-center">
              <span className="text-3xl font-extrabold text-on-surface">
                {activeSegment === 'rotation' ? `${rotationPercent}%` : `${storedPercent}%`}
              </span>
              <span className="text-[11px] font-bold text-secondary uppercase tracking-wider">
                {activeSegment === 'rotation' ? 'In Rotation' : 'Stored Away'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 w-full mt-4">
            <div
              onClick={() => setActiveSegment('rotation')}
              className={`p-3 rounded-xl cursor-pointer border transition-all ${
                activeSegment === 'rotation'
                  ? 'bg-surface-container-low border-primary/40 shadow-sm'
                  : 'bg-surface border-transparent'
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-primary-container"></span>
                <span className="text-xs font-bold text-on-surface">Active Staples</span>
              </div>
              <span className="text-lg font-bold text-primary">{inRotationItems} Items</span>
              <p className="text-[11px] text-secondary mt-0.5">{rotationPercent}% of your closet</p>
            </div>

            <div
              onClick={() => setActiveSegment('stored')}
              className={`p-3 rounded-xl cursor-pointer border transition-all ${
                activeSegment === 'stored'
                  ? 'bg-surface-container-low border-amber-400 shadow-sm'
                  : 'bg-surface border-transparent'
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-tertiary-fixed-dim"></span>
                <span className="text-xs font-bold text-on-surface">Stored Pieces</span>
              </div>
              <span className="text-lg font-bold text-tertiary">{storedItems} Items</span>
              <p className="text-[11px] text-secondary mt-0.5">{storedPercent}% bulky / seasonal</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-surface-container-lowest p-5 rounded-2xl border border-surface-container shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-secondary">Total Wardrobe</span>
              <h4 className="text-sm font-bold text-on-surface">Total Clothes Entered</h4>
              <p className="text-xs text-secondary">Based on your original pictures</p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-extrabold text-primary">{totalItems}</span>
              <span className="text-xs text-secondary block font-semibold">Garments</span>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-5 rounded-2xl border border-surface-container shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-secondary">Clean & Ready</span>
              <h4 className="text-sm font-bold text-on-surface">Washed Items</h4>
              <p className="text-xs text-secondary">Ready to wear right now</p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-extrabold text-emerald-600">{washedCount}</span>
              <span className="text-xs text-secondary block font-semibold">Clean</span>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-5 rounded-2xl border border-surface-container shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-secondary">In Laundry Cycle</span>
              <h4 className="text-sm font-bold text-on-surface">Currently in Wash</h4>
              <p className="text-xs text-secondary">Moving to front row soon</p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-extrabold text-amber-700">{laundryCount}</span>
              <span className="text-xs text-secondary block font-semibold">In Wash</span>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-5 rounded-2xl border border-surface-container shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-secondary">Unused Attention</span>
              <h4 className="text-sm font-bold text-on-surface">Needs Rotation</h4>
              <p className="text-xs text-secondary">Untouched &gt; 60 days</p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-extrabold text-tertiary">{forgottenItems.length}</span>
              <span className="text-xs text-secondary block font-semibold">Items</span>
            </div>
          </div>

          <div className="sm:col-span-2 bg-gradient-to-r from-surface-container-low to-surface-container p-5 rounded-2xl border border-surface-container flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[10px] uppercase font-bold tracking-wider text-primary">Mindful Laundry Habit</span>
              <h4 className="text-sm font-bold text-on-surface">The 3-Step Rotation Pipeline</h4>
              <p className="text-xs text-secondary">Hang fresh laundry in the front row to rotate through all pieces</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-3 py-1.5 rounded-xl bg-white shadow-sm text-xs font-bold text-on-surface">
                1. Wear
              </span>
              <ArrowRight className="w-4 h-4 text-secondary" />
              <span className="px-3 py-1.5 rounded-xl bg-white shadow-sm text-xs font-bold text-on-surface">
                2. Wash
              </span>
              <ArrowRight className="w-4 h-4 text-secondary" />
              <span className="px-3 py-1.5 rounded-xl bg-primary-container text-white shadow-sm text-xs font-bold">
                3. Front Row
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-container shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-tertiary" />
            <h3 className="font-bold text-sm text-on-surface">Waiting for an Outfit (Untouched 60+ Days)</h3>
          </div>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-semibold">
            {forgottenItems.length} Waiting
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {forgottenItems.map((item) => (
            <div
              key={item.id}
              className="p-3.5 rounded-xl bg-surface border border-surface-container flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-12 h-12 rounded-lg object-cover bg-surface-container shrink-0"
                />
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-on-surface truncate">{item.title}</h4>
                  <p className="text-[11px] text-secondary">
                    {item.timesWorn === 0 ? 'Never worn' : `Last worn ${item.lastWornDaysAgo}d ago`}
                  </p>
                </div>
              </div>
              <button
                onClick={() => onSetForTomorrow(item)}
                className="px-3 py-1.5 rounded-full bg-secondary-container hover:bg-primary hover:text-white text-xs font-bold text-primary transition-all shrink-0"
              >
                Wear Tomorrow
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
