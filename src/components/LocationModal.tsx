import React, { useState } from 'react';
import { X, MapPin, Check } from 'lucide-react';
import { WeatherData } from '../types/wardrobe';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  weather: WeatherData;
  onUpdateWeather: (newWeather: WeatherData) => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  onClose,
  weather,
  onUpdateWeather,
}) => {
  const [city, setCity] = useState(weather.city);
  const [temp, setTemp] = useState(weather.temp);
  const [condition, setCondition] = useState<WeatherData['condition']>(weather.condition);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    let note = 'Mild weather expected today';
    let recommendation = 'Single layer comfortable';

    if (condition === 'Rainy') {
      note = 'Showers expected throughout afternoon';
      recommendation = 'Rain Layer Recommended';
    } else if (condition === 'Cold') {
      note = 'Chilly breeze in the evening';
      recommendation = 'Warm Knit or Overshirt';
    } else if (condition === 'Sunny') {
      note = 'Clear blue skies with pleasant daylight';
      recommendation = 'Breathable Cotton / Light Layers';
    } else if (condition === 'Windy') {
      note = 'Gusty winds near evening';
      recommendation = 'Windbreaker / Utility Jacket';
    }

    onUpdateWeather({
      city: city.trim() || 'Coimbatore',
      temp,
      condition,
      note,
      recommendation,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-surface-container-lowest rounded-2xl w-full max-w-md shadow-2xl border border-surface-container p-6 space-y-5">
        <div className="flex items-center justify-between border-b border-surface-container pb-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-base text-on-surface">Change Location & Weather</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-secondary hover:text-on-surface">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-secondary uppercase mb-1">City / Region</label>
            <input
              type="text"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-surface border border-surface-container text-sm text-on-surface"
              placeholder="e.g. Coimbatore, Chennai, Tokyo"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-secondary uppercase mb-1">Temperature (°F)</label>
              <input
                type="number"
                value={temp}
                onChange={(e) => setTemp(Number(e.target.value))}
                className="w-full px-3.5 py-2 rounded-xl bg-surface border border-surface-container text-sm text-on-surface"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-secondary uppercase mb-1">Weather Climate</label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value as WeatherData['condition'])}
                className="w-full px-3 py-2 rounded-xl bg-surface border border-surface-container text-sm text-on-surface"
              >
                <option value="Sunny">Sunny</option>
                <option value="Rainy">Rainy</option>
                <option value="Cold">Cold</option>
                <option value="Windy">Windy</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-surface-container">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-secondary hover:text-on-surface"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2 rounded-full bg-primary text-white text-xs font-bold shadow"
            >
              <Check className="w-4 h-4" />
              Apply Weather
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
