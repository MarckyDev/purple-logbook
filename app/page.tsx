'use client';

import BentoCard from '@/components/BentoCard';
import { useState, useEffect } from 'react';

const fetchEmailAnalysis = async () => {
  try {
    const res = await fetch("https://logbook-api-wine.vercel.app/analyze");
    const data = await res.json();
    return data.analysis || 'No analysis available';
  } catch {
    return 'Error loading email analysis';
  }
};

const fetchVerseOfTheDay = async () => {
  try {
    const res = await fetch("https://logbook-api-wine.vercel.app/verse_of_the_day");
    return await res.json();
  } catch {
    return { verse: 'Error loading verse', reference: '', version: '', notice: '' };
  }
};

const fetchBoredActivity = async () => {
  try {
    const res = await fetch("https://logbook-api-wine.vercel.app/bored_activity");
    return await res.json();
  } catch {
    return { activity: 'Error loading activity', type: null, price: 0 };
  }
};

const fetchWeather = async () => {
  try {
    const res = await fetch("https://logbook-api-wine.vercel.app/weather_today");
    return await res.json();
  } catch {
    return { weather_main: 'Error', temp_min_celsius: '', temp_max_celsius: '', humidity: '', condition: 'Error loading weather' };
  }
};

export default function Home() {
  const [emailAnalysis, setEmailAnalysis] = useState('Loading...');
  const [verseOfTheDay, setVerseOfTheDay] = useState({ verse: 'Loading...', reference: '', version: '', notice: '' });
  const [boredActivity, setBoredActivity] = useState({ activity: 'Loading...', type: null, price: 0 });
  const [weatherJapan, setWeatherJapan] = useState({ weather_main: 'Loading...', temp_min_celsius: '', temp_max_celsius: '', humidity: '', condition: 'Loading...' });

  useEffect(() => {
    fetchEmailAnalysis().then(setEmailAnalysis);
    fetchVerseOfTheDay().then(setVerseOfTheDay);
    fetchBoredActivity().then(setBoredActivity);
    fetchWeather().then(setWeatherJapan);
  }, []);

  return (
    <div className="min-h-screen font-sans">
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/50 dark:bg-gray-900/50 border-b border-purple-200/30">
        <header className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-purple-500 to-purple-700 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-linear-to-r from-purple-600 to-purple-900 bg-clip-text text-transparent">
                API Playground
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Real-time API Integration Dashboard</p>
            </div>
          </div>
        </header>
      </nav>
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">

          <BentoCard title="Weather Today in Japan" className="md:col-span-1 lg:col-span-2">
            <div className="space-y-3">
              <div className="text-4xl font-bold text-purple-700 dark:text-purple-300">
                {weatherJapan.weather_main}
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="space-y-1">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Temperature</p>
                  <p className="text-xl font-semibold">{weatherJapan.temp_min_celsius}° - {weatherJapan.temp_max_celsius}°C</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Humidity</p>
                  <p className="text-xl font-semibold">{weatherJapan.humidity}%</p>
                </div>
              </div>
              <div className="mt-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <p className="text-sm font-medium text-purple-800 dark:text-purple-200">{weatherJapan.condition}</p>
              </div>
            </div>
          </BentoCard>

          <BentoCard title="Bored?" className="md:col-span-1">
            <div className="space-y-3">
              <p className="text-sm text-gray-600 dark:text-gray-400">Try this activity:</p>
              <div className="p-4 bg-linear-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200/50">
                <p className="font-semibold text-lg mb-2">{boredActivity.activity}</p>
                <div className="flex gap-2 text-sm">
                  <span className="px-2 py-1 bg-purple-200 dark:bg-purple-700 rounded-full text-purple-800 dark:text-purple-200">
                    {boredActivity.type ? boredActivity.type.charAt(0).toUpperCase() + boredActivity.type.slice(1) : 'N/A'}
                  </span>
                  <span className="px-2 py-1 bg-green-200 dark:bg-green-700 rounded-full text-green-800 dark:text-green-200">
                    {boredActivity.price == 0 ? 'Free' : `$${boredActivity.price}`}
                  </span>
                </div>
              </div>
            </div>
          </BentoCard>

          <BentoCard title="Latest Email Status" className="md:col-span-1">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200/50">
              <p className="text-sm leading-relaxed">{emailAnalysis}</p>
            </div>
          </BentoCard>

          <BentoCard title="Verse of the Day" className="md:col-span-1 lg:col-span-2">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-purple-700 dark:text-purple-300">
                <span>{verseOfTheDay.reference}</span>
                <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-800 rounded text-xs">
                  {verseOfTheDay.version}
                </span>
              </div>
              <blockquote className="text-lg italic leading-relaxed border-l-4 border-purple-400 pl-4 py-2">
                &ldquo;{verseOfTheDay.verse}&rdquo;
              </blockquote>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                {verseOfTheDay.notice}
              </p>
            </div>
          </BentoCard>

        </div>
      </main>
    </div>
  );
}
