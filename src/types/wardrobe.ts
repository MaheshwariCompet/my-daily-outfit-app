export type ClothingStatus = 'Washed' | 'In Laundry' | 'Resting';
export type ClothingCategory = 'Tops' | 'Bottoms' | 'Outerwear' | 'Shoes' | 'Accessories';

export interface ClothingItem {
  id: string;
  title: string;
  category: ClothingCategory;
  price: number;
  timesWorn: number;
  lastWornDate?: string;
  imageUrl: string;
  closetId: string;
  importedFrom?: 'Amazon' | 'Zara' | 'Shein' | 'ASOS' | 'Gmail' | 'Manual';
  isFavorite: boolean;
  notes?: string;
}

export interface SubCloset {
  id: string;
  name: string;
  coverImage?: string;
}

export interface DayPlan {
  dayName: string;
  dateNumber: number;
  fullDate: string;
  topId?: string;
  bottomId?: string;
  isConfirmed: boolean;
}

export interface UserProfile {
  name: string;
  email: string;
  avatarUrl?: string;
  isLoggedIn: boolean;
  isPro: boolean;
  connectedGmail: boolean;
  connectedCalendar: boolean;
}

export interface WeatherData {
  city: string;
  temp: number;
  condition: 'Sunny' | 'Rainy' | 'Cold' | 'Windy';
  note: string;
  recommendation: string;
}