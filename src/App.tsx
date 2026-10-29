import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HeroMorningGuide } from './components/HeroMorningGuide';
import { MixMatchBuilder } from './components/MixMatchBuilder';
import { FeatureGrid } from './components/FeatureGrid';
import { ClosetSection } from './components/ClosetSection';
import { StoreImportScreen } from './components/StoreImportScreen';
import { StyleStatsScreen } from './components/StyleStatsScreen';
import { PlannerSection } from './components/PlannerSection';
import { InsightsSection } from './components/InsightsSection';
import { AvatarConfigurator } from './components/AvatarConfigurator';
import { TravelPackingAssistant } from './components/TravelPackingAssistant';
import { LoginScreen, LogoutScreen } from './components/AuthScreens';
import { SettingsScreen } from './components/SettingsScreen';
import { UploadModal } from './components/UploadModal';
import { LocationModal } from './components/LocationModal';
import { ProfileModal } from './components/ProfileModal';
import { PaymentModal } from './components/PaymentModal';
import { FillTheGapModal } from './components/FillTheGapModal';

import { INITIAL_CLOTHES, INITIAL_SUB_CLOSETS, generateCurrentWeekPlan } from './data/initialData';
import { ClothingItem, WeatherData, DayPlan, SubCloset } from './types/wardrobe';
import { useAuth } from './context/AuthContext';
import { CheckCircle2, Upload } from 'lucide-react';

export function App() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // 1. Persistent User Wardrobe
  const [clothes, setClothes] = useState<ClothingItem[]>(() => {
    const saved = localStorage.getItem('mydailyfit_real_clothes');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_CLOTHES;
  });

  // 2. Persistent Multi-Closet Sub-folders
  const [subClosets, setSubClosets] = useState<SubCloset[]>(() => {
    const saved = localStorage.getItem('mydailyfit_subclosets');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_SUB_CLOSETS;
  });

  // 3. Dynamic 7-day schedule with real system dates
  const [weekPlan, setWeekPlan] = useState<DayPlan[]>(() => {
    const saved = localStorage.getItem('mydailyfit_weekplan');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return generateCurrentWeekPlan();
  });

  useEffect(() => {
    localStorage.setItem('mydailyfit_real_clothes', JSON.stringify(clothes));
  }, [clothes]);

  useEffect(() => {
    localStorage.setItem('mydailyfit_subclosets', JSON.stringify(subClosets));
  }, [subClosets]);

  useEffect(() => {
    localStorage.setItem('mydailyfit_weekplan', JSON.stringify(weekPlan));
  }, [weekPlan]);

  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isFillTheGapModalOpen, setIsFillTheGapModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [weather, setWeather] = useState<WeatherData>({
    city: 'Local Area',
    temp: 75,
    condition: 'Sunny',
    note: 'Clear skies with pleasant conditions',
    recommendation: 'Breathable Cotton / Light Layers',
  });

  const userTops = clothes.filter((c) => c.category === 'Tops' || c.category === 'Outerwear');
  const userBottoms = clothes.filter((c) => c.category === 'Bottoms');
  
  const [selectedTopId, setSelectedTopId] = useState<string>('');
  const [selectedBottomId, setSelectedBottomId] = useState<string>('');

  const selectedTop = clothes.find((c) => c.id === selectedTopId) || userTops[0];
  const selectedBottom = clothes.find((c) => c.id === selectedBottomId) || userBottoms[0];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddItem = (newItem: ClothingItem) => {
    setClothes((prev) => [newItem, ...prev]);
    showToast(`Added "${newItem.title}" to your wardrobe!`);
  };

  const handleDeleteItem = (id: string) => {
    setClothes((prev) => prev.filter((i) => i.id !== id));
    showToast('Garment deleted.');
  };

  const handleCycleStatus = (id: string) => {
    setClothes((prev) =>
      prev.map((i) => {
        if (i.id === id) {
          const next = i.status === 'Washed' ? 'In Laundry' : 'Washed';
          return { ...i, status: next };
        }
        return i;
      })
    );
  };

  const handleAddSubCloset = (name: string) => {
    const newCloset: SubCloset = {
      id: `closet-${Date.now()}`,
      name,
    };
    setSubClosets((prev) => [...prev, newCloset]);
    showToast(`Created closet: ${name}`);
  };

  const handleConfirmLook = () => {
    if (!selectedTop || !selectedBottom) {
      showToast('Upload a top and bottom first to log an outfit!');
      return;
    }
    setIsConfirmed(true);
    setClothes((prev) =>
      prev.map((c) => 
        c.id === selectedTop.id || c.id === selectedBottom.id 
          ? { ...c, timesWorn: c.timesWorn + 1, lastWornDate: new Date().toISOString() } 
          : c
      )
    );
    showToast(`Logged "${selectedTop.title} + ${selectedBottom.title}" for today!`);
    setTimeout(() => setIsConfirmed(false), 2500);
  };

  const handleShuffleLook = () => {
    if (userTops.length === 0 || userBottoms.length === 0) {
      showToast('Add tops and bottoms to your closet to shuffle pairings.');
      return;
    }
    const nextTop = userTops[Math.floor(Math.random() * userTops.length)];
    const nextBottom = userBottoms[Math.floor(Math.random() * userBottoms.length)];
    setSelectedTopId(nextTop.id);
    setSelectedBottomId(nextBottom.id);
    showToast(`Shuffled to ${nextTop.title} + ${nextBottom.title}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface antialiased font-sans pb-20 md:pb-0">
      <Header
        onOpenUploadModal={() => setIsUploadModalOpen(true)}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
        onOpenPaymentModal={() => setIsPaymentModalOpen(true)}
        clothesCount={clothes.length}
        profile={user}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Routes>
          <Route
            path="/"
            element={
              <div className="space-y-8 animate-fadeIn">
                {clothes.length === 0 ? (
                  <div className="p-8 sm:p-12 rounded-3xl bg-surface-container-lowest border border-surface-container shadow-sm text-center space-y-4 max-w-xl mx-auto my-6">
                    <div className="w-14 h-14 rounded-2xl bg-secondary-container text-primary flex items-center justify-center mx-auto">
                      <Upload className="w-7 h-7" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-on-surface">Welcome to your MyDailyFit Wardrobe</h2>
                      <p className="text-xs text-secondary mt-1 max-w-md mx-auto">
                        This digital closet has zero placeholder items. Snap a picture of your clothes or import a past order to get started.
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-2">
                      <button
                        onClick={() => setIsUploadModalOpen(true)}
                        className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-primary text-white text-xs font-bold shadow"
                      >
                        Upload First Clothes Photo
                      </button>
                      <button
                        onClick={() => navigate('/store-import')}
                        className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-surface-container text-primary text-xs font-bold"
                      >
                        Import from Zara / Amazon
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <HeroMorningGuide
                      mood="energetic"
                      setMood={() => {}}
                      selectedTop={selectedTop}
                      selectedBottom={selectedBottom}
                      isConfirmed={isConfirmed}
                      onConfirmLook={handleConfirmLook}
                      onShuffleLook={handleShuffleLook}
                      weather={weather}
                      onOpenLocationModal={() => setIsLocationModalOpen(true)}
                    />
                    {selectedTop && (
                      <MixMatchBuilder anchorItem={selectedTop} bottomOptions={userBottoms} />
                    )}
                  </>
                )}
                <FeatureGrid onGenerateCombo={handleShuffleLook} />
              </div>
            }
          />

          <Route
            path="/closet"
            element={
              <ClosetSection
                items={clothes}
                subClosets={subClosets}
                onAddSubCloset={handleAddSubCloset}
                onDeleteItem={handleDeleteItem}
                onCycleStatus={handleCycleStatus}
                onOpenUploadModal={() => setIsUploadModalOpen(true)}
              />
            }
          />

          <Route
            path="/store-import"
            element={<StoreImportScreen onAddItem={handleAddItem} activeClosetId="all" />}
          />

          <Route
            path="/stats"
            element={<StyleStatsScreen clothes={clothes} ootdCount={clothes.filter(c => c.timesWorn > 0).length} />}
          />

          <Route
            path="/planner"
            element={
              <PlannerSection
                weekPlan={weekPlan}
                presets={[]}
                onSelectPreset={() => {}}
                onUpdateDayPlan={(idx) => {
                  setWeekPlan((prev) => prev.map((d, i) => (i === idx ? { ...d, isConfirmed: !d.isConfirmed } : d)));
                }}
              />
            }
          />

          <Route path="/avatar" element={<AvatarConfigurator clothes={clothes} />} />
          <Route path="/travel" element={<TravelPackingAssistant clothes={clothes} />} />
          <Route path="/insights" element={<InsightsSection clothes={clothes} onSetForTomorrow={(item) => showToast(`Scheduled ${item.title} for tomorrow!`)} />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/logout" element={<LogoutScreen />} />
          <Route path="/settings" element={<SettingsScreen />} />
        </Routes>
      </main>

      <BottomNav clothesCount={clothes.length} />

      {/* Modals */}
      <UploadModal isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)} onAddItem={handleAddItem} />
      <LocationModal isOpen={isLocationModalOpen} onClose={() => setIsLocationModalOpen(false)} weather={weather} onUpdateWeather={setWeather} />
      <ProfileModal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} profile={user} onUpdateProfile={() => showToast('Profile updated')} />
      <PaymentModal isOpen={isPaymentModalOpen} onClose={() => setIsPaymentModalOpen(false)} onSuccessToast={showToast} />
      <FillTheGapModal isOpen={isFillTheGapModalOpen} onClose={() => setIsFillTheGapModalOpen(false)} userClothes={clothes} onImportItem={handleAddItem} />

      {toastMessage && (
        <div className="fixed bottom-20 md:bottom-6 right-6 z-50 bg-on-surface text-surface px-5 py-3 rounded-full shadow-2xl flex items-center gap-2.5 text-xs font-semibold animate-slideUp">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}