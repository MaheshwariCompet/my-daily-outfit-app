import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HeroMorningGuide } from './components/HeroMorningGuide';
import { MixMatchBuilder } from './components/MixMatchBuilder';
import { FeatureGrid } from './components/FeatureGrid';
import { ClosetSection } from './components/ClosetSection';
import { PlannerSection } from './components/PlannerSection';
import { InsightsSection } from './components/InsightsSection';
import { UploadModal } from './components/UploadModal';
import { LocationModal } from './components/LocationModal';
import { ProfileModal } from './components/ProfileModal';
import { INITIAL_CLOTHES, INITIAL_PRESETS, INITIAL_WEEK_PLAN } from './data/initialData';
import { ClothingItem, MoodType, PresetOutfit, WeatherData, UserProfile, DayPlan } from './types/wardrobe';
import { CheckCircle2 } from 'lucide-react';

export function App() {
  const navigate = useNavigate();

  // 1. Persistent Clothes State
  const [clothes, setClothes] = useState<ClothingItem[]>(() => {
    const saved = localStorage.getItem('mydailyfit_clothes');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved clothes', e);
      }
    }
    return INITIAL_CLOTHES;
  });

  // 2. Persistent Week Plan State
  const [weekPlan, setWeekPlan] = useState<DayPlan[]>(() => {
    const saved = localStorage.getItem('mydailyfit_weekplan');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved week plan', e);
      }
    }
    return INITIAL_WEEK_PLAN;
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('mydailyfit_clothes', JSON.stringify(clothes));
  }, [clothes]);

  useEffect(() => {
    localStorage.setItem('mydailyfit_weekplan', JSON.stringify(weekPlan));
  }, [weekPlan]);

  const [mood, setMood] = useState<MoodType>('energetic');
  const [isConfirmed, setIsConfirmed] = useState(false);

  // Modals
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Weather State
  const [weather, setWeather] = useState<WeatherData>({
    city: 'Coimbatore',
    temp: 78,
    condition: 'Sunny',
    note: 'Pleasant morning with gentle tropical breeze',
    recommendation: 'Breathable Cotton / Light Layers',
  });

  // Profile State
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Priya Sharma',
    email: 'priya@mydailyfit.local',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    isLoggedIn: true,
  });

  // Selected Outfit Pair for Today's Matched Pair
  const [selectedTopId, setSelectedTopId] = useState<string>('top-2');
  const [selectedBottomId, setSelectedBottomId] = useState<string>('bottom-1');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const selectedTop = clothes.find((c) => c.id === selectedTopId) || clothes[0];
  const selectedBottom = clothes.find((c) => c.id === selectedBottomId) || clothes.find((c) => c.category === 'Bottoms') || clothes[0];

  const anchorItem = clothes.find((c) => c.id === 'top-1') || clothes[0];
  const bottomOptions = clothes.filter((c) => c.category === 'Bottoms');

  const handleConfirmLook = () => {
    setIsConfirmed(true);
    setWeekPlan((prev) =>
      prev.map((d, i) => (i === 2 ? { ...d, topTitle: selectedTop.title, bottomTitle: selectedBottom.title, isConfirmed: true } : d))
    );
    showToast(`Confirmed! "${selectedTop.title} + ${selectedBottom.title}" is set for today.`);
    setTimeout(() => setIsConfirmed(false), 3000);
  };

  const handleShuffleLook = () => {
    const tops = clothes.filter((c) => c.category === 'Tops' || c.category === 'Outerwear');
    const bottoms = clothes.filter((c) => c.category === 'Bottoms');
    if (tops.length > 0 && bottoms.length > 0) {
      const nextTop = tops[Math.floor(Math.random() * tops.length)];
      const nextBottom = bottoms[Math.floor(Math.random() * bottoms.length)];
      setSelectedTopId(nextTop.id);
      setSelectedBottomId(nextBottom.id);
      setIsConfirmed(false);
      showToast(`Shuffled to ${nextTop.title} + ${nextBottom.title}`);
    }
  };

  const handleGenerateCombo = () => {
    handleShuffleLook();
    navigate('/');
    showToast('AI Outfit Generator created a new matching look for you!');
  };

  const handleToggleFavorite = (id: string) => {
    setClothes((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  };

  const handleAddItem = (newItem: ClothingItem) => {
    setClothes((prev) => [newItem, ...prev]);
    showToast(`Added "${newItem.title}" to your closet!`);
  };

  const handleDeleteItem = (id: string) => {
    const itemToDelete = clothes.find((c) => c.id === id);
    setClothes((prev) => prev.filter((item) => item.id !== id));
    showToast(`Removed "${itemToDelete?.title || 'Garment'}" from your closet.`);
  };

  const handleCycleStatus = (id: string) => {
    setClothes((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextStatus =
            item.status === 'Washed'
              ? 'In Laundry'
              : item.status === 'In Laundry'
              ? 'Resting'
              : 'Washed';
          return { ...item, status: nextStatus };
        }
        return item;
      })
    );
  };

  const handleSelectPreset = (preset: PresetOutfit) => {
    setSelectedTopId(preset.topId);
    setSelectedBottomId(preset.bottomId);
    setIsConfirmed(true);
    setWeekPlan((prev) =>
      prev.map((d, i) => (i === 2 ? { ...d, topTitle: preset.title, bottomTitle: 'Matching Preset', isConfirmed: true } : d))
    );
    navigate('/');
    showToast(`Wearing "${preset.title}" today! Loaded into morning guide.`);
  };

  const handleSetForTomorrow = (item: ClothingItem) => {
    setWeekPlan((prev) =>
      prev.map((d, i) => {
        if (i === 3) {
          if (item.category === 'Bottoms') {
            return { ...d, bottomTitle: item.title, isConfirmed: true };
          }
          return { ...d, topTitle: item.title, isConfirmed: true };
        }
        return d;
      })
    );
    showToast(`Scheduled "${item.title}" for tomorrow (Thursday)! Check Outfit Planner.`);
  };

  const handleUpdateDayPlan = (dayIndex: number) => {
    setWeekPlan((prev) =>
      prev.map((day, idx) =>
        idx === dayIndex ? { ...day, isConfirmed: !day.isConfirmed } : day
      )
    );
    showToast(`Updated status for ${weekPlan[dayIndex].dayName}!`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface antialiased font-sans pb-20 md:pb-0">
      <Header
        onOpenUploadModal={() => setIsUploadModalOpen(true)}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
        clothesCount={clothes.length}
        profile={profile}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        <Routes>
          <Route
            path="/"
            element={
              <div className="space-y-10 animate-fadeIn">
                <HeroMorningGuide
                  mood={mood}
                  setMood={setMood}
                  selectedTop={selectedTop}
                  selectedBottom={selectedBottom}
                  isConfirmed={isConfirmed}
                  onConfirmLook={handleConfirmLook}
                  onShuffleLook={handleShuffleLook}
                  weather={weather}
                  onOpenLocationModal={() => setIsLocationModalOpen(true)}
                />

                <MixMatchBuilder
                  anchorItem={anchorItem}
                  bottomOptions={bottomOptions}
                />

                <FeatureGrid onGenerateCombo={handleGenerateCombo} />
              </div>
            }
          />

          <Route
            path="/planner"
            element={
              <div className="animate-fadeIn">
                <PlannerSection
                  weekPlan={weekPlan}
                  presets={INITIAL_PRESETS}
                  onSelectPreset={handleSelectPreset}
                  onUpdateDayPlan={handleUpdateDayPlan}
                />
              </div>
            }
          />

          <Route
            path="/closet"
            element={
              <div className="animate-fadeIn">
                <ClosetSection
                  items={clothes}
                  onToggleFavorite={handleToggleFavorite}
                  onOpenUploadModal={() => setIsUploadModalOpen(true)}
                  onDeleteItem={handleDeleteItem}
                  onCycleStatus={handleCycleStatus}
                />
              </div>
            }
          />

          <Route
            path="/insights"
            element={
              <div className="animate-fadeIn">
                <InsightsSection
                  clothes={clothes}
                  onSetForTomorrow={handleSetForTomorrow}
                />
              </div>
            }
          />
        </Routes>
      </main>

      <footer className="mt-16 border-t border-surface-container bg-surface-container-lowest/50 py-8 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-secondary">
          <p>© 2026 MyDailyFit. Built for mindful capsule wardrobing and anti-stress morning styling.</p>
          <div className="flex items-center gap-6">
            <span>Location: {weather.city}</span>
            <span>Real-time Dynamic Sync & Local Storage</span>
          </div>
        </div>
      </footer>

      {/* Bottom Nav for Mobile / Tablet Viewports */}
      <BottomNav clothesCount={clothes.length} />

      {/* Modals */}
      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onAddItem={handleAddItem}
      />

      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        weather={weather}
        onUpdateWeather={(w) => {
          setWeather(w);
          showToast(`Location updated to ${w.city} (${w.temp}°F, ${w.condition})`);
        }}
      />

      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profile={profile}
        onUpdateProfile={(p) => {
          setProfile(p);
          showToast(p.isLoggedIn ? `Welcome back, ${p.name}!` : 'Signed out as guest.');
        }}
      />

      {/* Dynamic Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-20 md:bottom-6 right-6 z-50 bg-on-surface text-surface px-5 py-3 rounded-full shadow-2xl flex items-center gap-2.5 text-xs font-semibold animate-slideUp">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
