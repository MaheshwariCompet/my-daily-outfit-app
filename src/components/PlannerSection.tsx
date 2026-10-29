import React, { useState } from 'react';
import { Sparkles, ChevronRight, Check, CalendarDays } from 'lucide-react';
import { DayPlan, PresetOutfit } from '../types/wardrobe';

interface PlannerSectionProps {
  weekPlan: DayPlan[];
  presets: PresetOutfit[];
  onSelectPreset: (preset: PresetOutfit) => void;
  onUpdateDayPlan: (dayIndex: number, newTop: string, newBottom: string) => void;
}

export const PlannerSection: React.FC<PlannerSectionProps> = ({
  weekPlan,
  presets,
  onSelectPreset,
  onUpdateDayPlan,
}) => {
  const [selectedDayIdx, setSelectedDayIdx] = useState<number>(2);
  const currentDay = weekPlan[selectedDayIdx];

  const handleToggleDayConfirmed = () => {
    onUpdateDayPlan(selectedDayIdx, currentDay.topTitle, currentDay.bottomTitle);
  };

  return (
    <div className="space-y-6">
      <div className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-container shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-on-surface">Weekly Horizon Strip</h2>
            <p className="text-xs text-secondary">Click any day to inspect and set its planned outfit</p>
          </div>
          <span className="text-xs font-bold text-primary bg-surface-container-low px-3 py-1.5 rounded-full">
            Week of Oct 21 – 27
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
          {weekPlan.map((day, idx) => {
            const isSelected = selectedDayIdx === idx;
            return (
              <div
                key={idx}
                onClick={() => setSelectedDayIdx(idx)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                  isSelected
                    ? 'bg-primary-container text-white border-primary shadow-md scale-105'
                    : 'bg-surface border-surface-container hover:bg-surface-container-low text-on-surface'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-secondary'}`}>
                    {day.dayName}
                  </span>
                  <span className="text-base font-extrabold">{day.dateNumber}</span>
                </div>

                <div className="space-y-1">
                  <p className={`text-[11px] font-semibold truncate ${isSelected ? 'text-white/90' : 'text-on-surface'}`}>
                    {day.topTitle}
                  </p>
                  <p className={`text-[10px] truncate ${isSelected ? 'text-white/70' : 'text-secondary'}`}>
                    + {day.bottomTitle}
                  </p>
                </div>

                <div className="pt-1 flex items-center justify-between">
                  <span className={`w-2 h-2 rounded-full ${day.isConfirmed ? 'bg-emerald-400' : 'bg-outline-variant'}`} />
                  <span className={`text-[10px] ${isSelected ? 'text-white/90 font-bold' : 'text-secondary'}`}>
                    {day.isConfirmed ? 'Confirmed' : 'Planned'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-4 rounded-xl bg-surface-container-low flex flex-col sm:flex-row items-center justify-between gap-4 border border-surface-container">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold">
              <CalendarDays className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-on-surface">
                {currentDay.dayName} {currentDay.dateNumber} Setup: {currentDay.topTitle} + {currentDay.bottomTitle}
              </h4>
              <p className="text-xs text-secondary">
                Status: {currentDay.isConfirmed ? 'Locked & ready on hanger' : 'Draft plan'}
              </p>
            </div>
          </div>
          <button
            onClick={handleToggleDayConfirmed}
            className={`px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${
              currentDay.isConfirmed
                ? 'bg-emerald-600 text-white'
                : 'bg-primary text-white hover:bg-primary-container'
            }`}
          >
            <Check className="w-4 h-4" />
            {currentDay.isConfirmed ? 'Confirmed for Day' : 'Confirm Outfit for This Day'}
          </button>
        </div>
      </div>

      <div className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-container shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <h3 className="font-bold text-base text-on-surface">3 Fast Favorites (Saved Capsules)</h3>
          </div>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-secondary-container text-primary font-bold">
            1-Click Wear
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {presets.map((preset) => (
            <div
              key={preset.id}
              className="bg-surface p-4 rounded-xl border border-surface-container hover:shadow-md transition-all flex flex-col justify-between space-y-3"
            >
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-surface-container">
                <img
                  src={preset.imageUrl}
                  alt={preset.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full bg-white/90 text-[10px] font-bold text-secondary">
                  {preset.tag}
                </span>
              </div>

              <div>
                <h4 className="text-sm font-bold text-on-surface">{preset.title}</h4>
                <p className="text-xs text-secondary mt-0.5">{preset.vibe}</p>
              </div>

              <button
                onClick={() => onSelectPreset(preset)}
                className="w-full py-2.5 rounded-full bg-primary hover:bg-primary-container text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow"
              >
                <span>Wear This Look Today</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};