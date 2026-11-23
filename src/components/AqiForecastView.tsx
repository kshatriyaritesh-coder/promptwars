import React from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ReferenceLine 
} from 'recharts';
import { 
  Wind, 
  Droplets, 
  Thermometer, 
  Compass, 
  AlertCircle, 
  Clock, 
  MapPin
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getCategoryColor } from '../services/aqiService';

export const AqiForecastView: React.FC = () => {
  const { aqiData, household, language, seniorMode } = useApp();
  const isHi = language === 'hi';

  const chartData = aqiData.hourlyForecast.map(h => ({
    time: h.time,
    aqi: h.aqi,
    pm25: h.pm25,
    category: h.category,
    isBest: h.isBestWindow,
    isWorst: h.isWorstWindow
  }));

  return (
    <div className={`space-y-6 max-w-7xl mx-auto ${seniorMode ? 'text-lg' : 'text-sm'}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className={`${seniorMode ? 'text-3xl font-black' : 'text-2xl font-bold'} text-slate-900 dark:text-white flex items-center gap-2`}>
            <Wind className="w-6 h-6 text-teal-500" />
            <span>{isHi ? `${household.city} वायु गुणवत्ता एवं 72-घंटे पूर्वानुमान` : `${household.city} Air Quality & 72-Hour Forecast`}</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {isHi ? 'केंद्रीय प्रदूषण नियंत्रण बोर्ड (CPCB) के अनुसार वास्तविक समय डेटा' : 'Official CPCB National Air Quality Index (NAQI) Standard & Meteorology'}
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200 text-xs shadow-2xs">
          <MapPin className="w-4 h-4 text-teal-600" />
          <span className="font-semibold text-slate-800">
            {aqiData.stationName} ({aqiData.stationDistanceKm} km)
          </span>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-600" />
              <span>{isHi ? '24 घंटे का AQI ट्रेंड व सुरक्षित समय अंतराल' : '24-Hour AQI Trend & Optimal Activity Windows'}</span>
            </h3>
            <p className="text-xs text-slate-500">
              {isHi ? 'तापमान उलटाव के कारण सुबह-शाम प्रदूषण बढ़ता है और दोपहर में घटता है' : 'Notice diurnal curve: midday solar dip vs. severe early morning nocturnal inversion'}
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1 text-emerald-700 font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              {isHi ? 'दोपहर सबसे सुरक्षित (2-3:30 PM)' : 'Best Window (2:00 - 3:30 PM)'}
            </span>
            <span className="flex items-center gap-1 text-rose-700 font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
              {isHi ? 'सुबह का स्मॉग पीक (6-9 AM)' : 'Worst Peak (6:00 - 9:30 AM)'}
            </span>
          </div>
        </div>

        <div className="h-64 sm:h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="aqiGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="time" 
                tick={{ fontSize: 11, fill: '#64748b' }} 
                axisLine={{ stroke: '#cbd5e1' }}
              />
              <YAxis 
                domain={[0, 450]} 
                tick={{ fontSize: 11, fill: '#64748b' }}
                axisLine={{ stroke: '#cbd5e1' }}
              />
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl border border-slate-700 text-xs space-y-1">
                        <div className="font-bold text-teal-300">{data.time}</div>
                        <div>AQI: <span className="font-bold text-white">{data.aqi}</span> ({data.category})</div>
                        <div>PM2.5: <span className="font-semibold text-rose-400">{data.pm25} µg/m³</span></div>
                        {data.isBest && (
                          <div className="text-emerald-400 font-bold pt-1">
                            ✨ {isHi ? 'सर्वश्रेष्ठ बाहरी गतिविधि समय' : 'Recommended Outdoor Window'}
                          </div>
                        )}
                        {data.isWorst && (
                          <div className="text-rose-400 font-bold pt-1">
                            ⚠️ {isHi ? 'गंभीर स्मॉग पीक - बाहर न निकलें' : 'Nocturnal Smog Peak - Stay Indoors'}
                          </div>
                        )}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <ReferenceLine y={200} stroke="#f59e0b" strokeDasharray="3 3" label={{ value: 'Moderate (200)', fill: '#d97706', fontSize: 10 }} />
              <ReferenceLine y={300} stroke="#ef4444" strokeDasharray="3 3" label={{ value: 'Very Poor (300)', fill: '#dc2626', fontSize: 10 }} />
              <Area 
                type="monotone" 
                dataKey="aqi" 
                stroke="#ef4444" 
                strokeWidth={3} 
                fillOpacity={1} 
                fill="url(#aqiGradient)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="font-bold text-slate-900 text-base">
          {isHi ? 'प्रदूषक तत्वों का विस्तृत विवरण (CPCB मानक अनुसार)' : 'Detailed Pollutant Breakdown vs National Ambient Air Standards (NAAQS)'}
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {Object.entries(aqiData.pollutants).map(([key, item]) => {
            const isDominant = key.toUpperCase() === aqiData.dominantPollutant.replace('.', '');
            const isHazardous = item.value > item.standardLimit * 2;
            return (
              <div 
                key={key}
                className={`bg-white rounded-2xl p-4 border shadow-2xs relative overflow-hidden ${
                  isDominant 
                    ? 'border-rose-400 ring-2 ring-rose-500/20' 
                    : 'border-slate-200'
                }`}
              >
                {isDominant && (
                  <span className="absolute top-2 right-2 text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-rose-500 text-white">
                    Primary
                  </span>
                )}
                <span className="text-xs font-bold text-slate-500 uppercase">
                  {key.toUpperCase()}
                </span>
                <div className="flex items-baseline gap-1 my-1">
                  <span className="text-2xl font-black text-slate-900">
                    {item.value}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {item.unit}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500">
                  {isHi ? 'सुरक्षित सीमा:' : 'NAAQS Limit:'} {item.standardLimit} {item.unit}
                </div>
                <div className={`mt-2 text-[10px] font-bold uppercase ${
                  isHazardous ? 'text-rose-600' : 'text-emerald-700'
                }`}>
                  {item.status} ({Math.round((item.value / item.standardLimit) * 100)}% of limit)
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-200 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
            <Thermometer className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-500">{isHi ? 'तापमान' : 'Temperature'}</span>
            <div className="text-lg font-bold text-slate-900">{aqiData.weather.temp}°C</div>
            <span className="text-[11px] text-slate-500">{aqiData.weather.condition}</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
            <Droplets className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-500">{isHi ? 'आर्द्रता' : 'Relative Humidity'}</span>
            <div className="text-lg font-bold text-slate-900">{aqiData.weather.humidity}%</div>
            <span className="text-[11px] text-slate-500">
              {aqiData.weather.humidity > 70 ? (isHi ? 'उच्च नमी स्मॉग बढ़ाती है' : 'High humidity binds smoke') : 'Normal'}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center text-teal-600">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-500">{isHi ? 'हवा की गति व दिशा' : 'Wind Speed & Direction'}</span>
            <div className="text-lg font-bold text-slate-900">{aqiData.weather.windSpeedKmH} km/h</div>
            <span className="text-[11px] text-slate-500">{aqiData.weather.windDirection}</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-700">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-500">{isHi ? 'तापमान उलटाव जोखिम' : 'Inversion Risk'}</span>
            <div className="text-xs font-bold text-purple-800">{aqiData.weather.inversionRisk}</div>
            <span className="text-[11px] text-slate-500">
              {aqiData.weather.windSpeedKmH < 6 ? (isHi ? 'स्थिर वायुमंडल' : 'Stagnant ground layer') : 'Ventilated'}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="font-bold text-slate-900 text-base">
          {isHi ? '3-दिवसीय दैनिक पूर्वानुमान' : '3-Day Daily Outlook & Trend'}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {aqiData.dailyForecast.map((day, idx) => {
            const catColor = getCategoryColor(day.category);
            return (
              <div 
                key={idx}
                className="bg-white rounded-3xl p-5 border border-slate-200 shadow-2xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 text-base">
                      {day.day}
                    </h4>
                    <span className="text-xs text-slate-500">{day.date}</span>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${catColor.badge}`}>
                    {day.category}
                  </span>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-xs text-slate-500">Range:</span>
                  <span className="text-xl font-black text-slate-900">
                    {day.minAqi} – {day.maxAqi}
                  </span>
                  <span className="text-xs text-slate-500">AQI</span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-2">
                  {isHi ? day.summaryHi : day.summary}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
