import React, { useState } from 'react';
import { 
  Navigation, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Car, 
  Train, 
  Trees, 
  CheckCircle, 
  XCircle,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { COMMUTE_ROUTES } from '../data/routesData';

export const RoutePlannerView: React.FC = () => {
  const { household, t, language, seniorMode } = useApp();
  const isHi = language === 'hi';

  const [origin, setOrigin] = useState(household.neighborhood || 'Home');
  const [destination, setDestination] = useState(household.workLocation || 'Office / University');
  const [selectedRouteId, setSelectedRouteId] = useState<string>('route-metro');

  const selectedRoute = COMMUTE_ROUTES.find(r => r.id === selectedRouteId) || COMMUTE_ROUTES[0];

  return (
    <div className={`space-y-6 max-w-7xl mx-auto ${seniorMode ? 'text-lg' : 'text-sm'}`}>
      <div>
        <h2 className={`${seniorMode ? 'text-3xl font-black' : 'text-2xl font-bold'} text-slate-900 flex items-center gap-2`}>
          <Navigation className="w-6 h-6 text-teal-600" />
          <span>{t.routesTitle}</span>
        </h2>
        <p className="text-xs text-slate-500">
          {t.routesSubtitle}
        </p>
      </div>

      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-2xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
          <div className="flex items-center gap-3 bg-slate-50 px-4 py-2.5 rounded-2xl border border-slate-200">
            <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
            <div className="w-full">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Origin (Home)</span>
              <input
                type="text"
                value={origin}
                onChange={e => setOrigin(e.target.value)}
                className="w-full bg-transparent text-xs font-semibold text-slate-800 outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 bg-slate-50 px-4 py-2.5 rounded-2xl border border-slate-200">
            <MapPin className="w-4 h-4 text-rose-600 shrink-0" />
            <div className="w-full">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Destination (Work / School)</span>
              <input
                type="text"
                value={destination}
                onChange={e => setDestination(e.target.value)}
                className="w-full bg-transparent text-xs font-semibold text-slate-800 outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {COMMUTE_ROUTES.map(route => {
          const isSelected = route.id === selectedRouteId;
          const isLowest = route.exposureScore <= 30;
          const isHighest = route.exposureScore >= 80;

          return (
            <div
              key={route.id}
              onClick={() => setSelectedRouteId(route.id)}
              className={`rounded-3xl p-5 border cursor-pointer transition-all space-y-4 relative flex flex-col justify-between ${
                isSelected
                  ? 'border-[#08332c] bg-white shadow-lg ring-2 ring-[#08332c]/20'
                  : 'border-slate-200 bg-white/80 hover:border-slate-300'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {route.mode === 'metro_walk' && <Train className="w-5 h-5 text-teal-600" />}
                    {route.mode === 'green_interior' && <Trees className="w-5 h-5 text-emerald-600" />}
                    {route.mode === 'arterial_highway' && <Car className="w-5 h-5 text-rose-600" />}
                    <h3 className="font-bold text-slate-900 text-sm">
                      {isHi ? route.nameHi : route.name}
                    </h3>
                  </div>

                  {isLowest && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      Cleanest
                    </span>
                  )}
                  {isHighest && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800">
                      Hazard Choke
                    </span>
                  )}
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-500">
                      {t.exposureScore} {t.lowerIsBetter}:
                    </span>
                    <span className={`font-black text-base ${
                      isLowest ? 'text-emerald-700' : isHighest ? 'text-rose-700' : 'text-amber-700'
                    }`}>
                      {route.exposureScore} / 100
                    </span>
                  </div>

                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        isLowest ? 'bg-emerald-500' : isHighest ? 'bg-rose-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${route.exposureScore}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                    <span>In-Transit PM2.5: ~{route.estimatedPm25Exposure} µg/m³</span>
                    <span>CO2: {route.co2FootprintKg} kg</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span className="flex items-center gap-1 font-semibold">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {route.durationMinutes} mins
                  </span>
                  <span>{route.distanceKm} km</span>
                </div>
              </div>

              <button
                className={`w-full py-2 rounded-xl text-xs font-semibold transition ${
                  isSelected
                    ? 'bg-[#08332c] text-white'
                    : 'bg-slate-100 text-slate-700'
                }`}
              >
                {isSelected ? (isHi ? '✓ चयनित मार्ग' : '✓ Active Selection') : (isHi ? 'मार्ग विवरण देखें' : 'View Full Details')}
              </button>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-teal-600" />
            <span>{isHi ? `${selectedRoute.nameHi} - विश्लेषण` : `${selectedRoute.name} - In-Depth Exposure Profile`}</span>
          </h3>
          <span className="text-xs font-bold text-teal-700">
            {isHi ? selectedRoute.modeLabelHi : selectedRoute.modeLabel}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4" />
              <span>Clean Air & Comfort Advantages</span>
            </span>
            <div className="space-y-1.5">
              {(isHi ? selectedRoute.prosHi : selectedRoute.pros).map((p, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                  <span className="text-emerald-600 shrink-0 font-bold">✓</span>
                  <span>{p}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-rose-700 uppercase tracking-wider flex items-center gap-1.5">
              <XCircle className="w-4 h-4" />
              <span>Smog & Commute Disadvantages</span>
            </span>
            <div className="space-y-1.5">
              {(isHi ? selectedRoute.consHi : selectedRoute.cons).map((c, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                  <span className="text-rose-600 shrink-0 font-bold">✗</span>
                  <span>{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
          <div className="text-xs">
            <strong className="text-teal-900">{isHi ? 'इस मार्ग हेतु मास्क निर्देश: ' : 'Mask Protocol for this Route: '}</strong>
            <span className="text-teal-800">
              {isHi ? selectedRoute.maskAdviceHi : selectedRoute.maskAdvice}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
