import { ClothingItem, SubCloset, DayPlan } from '../types/wardrobe';

export const INITIAL_CLOTHES: ClothingItem[] = [];

export const INITIAL_SUB_CLOSETS: SubCloset[] = [
  { id: 'all', name: 'All Clothes' },
  { id: 'winter', name: 'Winter items' }
];

export const generateCurrentWeekPlan = (): DayPlan[] => {
  const now = new Date();
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const week: DayPlan[] = [];

  const currentDayOfWeek = now.getDay();
  const startOfWeek = new Date(now);
  // Set to current Monday
  const distanceToMonday = currentDayOfWeek === 0 ? -6 : 1 - currentDayOfWeek;
  startOfWeek.setDate(now.getDate() + distanceToMonday);

  for (let i = 0; i < 7; i++) {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    week.push({
      dayName: dayNames[d.getDay()],
      dateNumber: d.getDate(),
      fullDate: d.toISOString().split('T')[0],
      isConfirmed: false,
    });
  }
  return week;
};