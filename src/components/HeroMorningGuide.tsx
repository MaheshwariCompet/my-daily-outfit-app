import React from 'react';
import { Sun, BatteryLow, CheckCircle2, Briefcase, CloudRain, Sparkles, Shuffle, Check, CloudSun, Snowflake, Wind } from 'lucide-react';
import { MoodType, ClothingItem, WeatherData } from '../types/wardrobe';

interface HeroMorningGuideProps {
  mood: MoodType;
  setMood: (mood: MoodType) => void;
  selectedTop: ClothingItem | undefined;
  selectedBottom: ClothingItem | undefined;
  isConfirmed: boolean;
  onConfirmLook: () => void;
  onShuffleLook: () => void;
  weather: WeatherData;
  onOpenLocationModal: () => void;
}

export const HeroMorningGuide: React.FC<HeroMorningGuideProps> = ({
  mood,
  setMood,
  selectedTop,
  selectedBottom,
  isConfirmed,
  onConfirmLook,
  onShuffleLook,
  weather,
  onOpenLocationModal,
}) => {
  const getWeatherIcon = () => {
    switch (weather.condition) {
      case 'Rainy':
        return <CloudRain className="w-5 h-5" />;
      case 'Sunny':
        return <CloudSun className="w-5 h-5" />;
      case 'Cold':
        return <Snowflake className="w-5 h-5" />;
      case 'Windy':
        return <Wind className="w-5 h-5" />;
      default:
        return <CloudRain className="w-5 h-5" />;
    }
  };

  return (
    <section className="bg-gradient-to-b from-surface-container-low/60 to-surface rounded-2xl p-6 lg:p-8 border border-surface-container shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container text-primary text-xs font-semibold uppercase tracking-wider">
              <Sun className="w-3.5 h-3.5" />
              Anti-Stress Morning Routine
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight leading-tight">
              Easy Morning Guide
            </h1>
            <p className="text-secondary text-base max-w-xl">
              Eliminate morning decision fatigue. Answer your daily energy check and get a calm, ready-to-wear match in under 10 seconds.
            </p>
          </div>

          <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm border border-surface-container space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold tracking-wider text-secondary">
                Step 1 • Energy Check
              </span>
              <span className="text-xs font-medium text-tertiary flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Tailored Comfort
              </span>
            </div>
            <p className="text-sm font-semibold text-on-surface">How are you feeling today?</p>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setMood('tired')}
                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  mood === 'tired'
                    ? 'bg-primary-container text-white shadow-md scale-[1.02]'
                    : 'bg-surface text-secondary hover:bg-surface-container-low'
                }`}
              >
                <BatteryLow className="w-4 h-4" />
                <span>Tired / Cozy</span>
              </button>
              <button
                onClick={() => setMood('energetic')}
                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  mood === 'energetic'
                    ? 'bg-primary-container text-white shadow-md scale-[1.02]'
                    : 'bg-surface text-secondary hover:bg-surface-container-low'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Energetic</span>
              </button>
              <button
                onClick={() => setMood('ready')}
                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  mood === 'ready'
                    ? 'bg-primary-container text-white shadow-md scale-[1.02]'
                    : 'bg-surface text-secondary hover:bg-surface-container-low'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>Work Ready</span>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between bg-surface-container-lowest p-4 rounded-2xl border border-surface-container">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-primary">
                {getWeatherIcon()}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-on-surface text-sm">
                    {weather.city}: {weather.temp}°F • {weather.condition}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-[11px] font-semibold">
                    {weather.recommendation}
                  </span>
                </div>
                <span className="text-xs text-secondary">{weather.note}</span>
              </div>
            </div>
            <button
              onClick={onOpenLocationModal}
              className="text-xs font-semibold text-primary hover:underline px-3 py-1.5 rounded-full bg-surface-container-low hover:bg-surface-container transition-colors"
            >
              Change Location
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 bg-surface-container-lowest p-6 rounded-2xl border border-surface-container shadow-md space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <h3 className="font-bold text-on-surface text-base">Today's Matched Pair</h3>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
              Match Score: 98%
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 bg-surface-container-low p-3 rounded-xl">
            <div className="bg-surface-container-lowest rounded-xl p-2 shadow-sm space-y-2">
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-surface-container">
                <img
                  src={selectedTop?.imageUrl}
                  alt={selectedTop?.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-white/90 text-[10px] font-bold uppercase text-on-surface">
                  Top
                </span>
              </div>
              <div>
                <h4 className="text-xs font-bold text-on-surface truncate">{selectedTop?.title}</h4>
                <p className="text-[11px] text-secondary truncate">{selectedTop?.subtitle}</p>
              </div>
            </div>

            <div className="bg-surface-container-lowest rounded-xl p-2 shadow-sm space-y-2">
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-surface-container">
                <img
                  src={selectedBottom?.imageUrl}
                  alt={selectedBottom?.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-white/90 text-[10px] font-bold uppercase text-on-surface">
                  Bottom
                </span>
              </div>
              <div>
                <h4 className="text-xs font-bold text-on-surface truncate">{selectedBottom?.title}</h4>
                <p className="text-[11px] text-secondary truncate">{selectedBottom?.subtitle}</p>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-1">
            <button
              onClick={onConfirmLook}
              className={`w-full py-3.5 px-4 rounded-full font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all duration-300 ${
                isConfirmed
                  ? 'bg-emerald-600 text-white'
                  : 'bg-primary hover:bg-primary-container text-white active:scale-98'
              }`}
            >
              <Check className="w-4 h-4" />
              <span>{isConfirmed ? "Look Confirmed! Have a great day" : "Confirm I'm Wearing This"}</span>
            </button>
            <button
              onClick={onShuffleLook}
              className="w-full py-2 text-xs font-semibold text-secondary hover:text-on-surface flex items-center justify-center gap-1.5 transition-colors"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>Shuffle to next smart pairing</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
