export type ClothingStatus = 'Washed' | 'In Laundry' | 'Resting';
export type ClothingCategory = 'Tops' | 'Bottoms' | 'Outerwear' | 'Shoes';
export type MoodType = 'tired' | 'energetic' | 'ready';

export interface ClothingItem {
  id: string;
  title: string;
  category: ClothingCategory;
  subtitle: string;
  status: ClothingStatus;
  timesWorn: number;
  lastWornDaysAgo: number;
  imageUrl: string;
  isFavorite: boolean;
  isBulkyOrStored?: boolean;
}

export interface PresetOutfit {
  id: string;
  title: string;
  tag: string;
  vibe: string;
  imageUrl: string;
  topId: string;
  bottomId: string;
}

export interface DayPlan {
  dayName: string;
  dateNumber: number;
  topTitle: string;
  bottomTitle: string;
  isConfirmed: boolean;
}

export interface WeatherData {
  city: string;
  temp: number;
  condition: 'Rainy' | 'Sunny' | 'Cold' | 'Windy';
  note: string;
  recommendation: string;
}

export interface UserProfile {
  name: string;
  email: string;
  avatarUrl: string;
  isLoggedIn: boolean;
}
