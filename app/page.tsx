'use client';

import BentoCard from '@/components/BentoCard';
import { useState, useEffect } from 'react';

type VerseOfTheDay = {
  verse: string;
  reference: string;
  version: string;
  notice: string;
};

type BoredActivity = {
  activity: string;
  type: string | null;
  price: number;
};

type Weather = {
  weather_main: string;
  temp_min_celsius: string;
  temp_max_celsius: string;
  humidity: string;
  condition: string;
};

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
  const [emailAnalysis, setEmailAnalysis] = useState<string>('Loading...');
  const [verseOfTheDay, setVerseOfTheDay] = useState<VerseOfTheDay>({ verse: 'Loading...', reference: '', version: '', notice: '' });
  const [boredActivity, setBoredActivity] = useState<BoredActivity>({ activity: 'Loading...', type: null, price: 0 });
  const [weatherJapan, setWeatherJapan] = useState<Weather>({ weather_main: 'Loading...', temp_min_celsius: '', temp_max_celsius: '', humidity: '', condition: 'Loading...' });
  
  const [isRefreshing, setIsRefreshing] = useState({
    email: false,
    verse: false,
    activity: false,
    weather: false
  });

  const [lastUpdated, setLastUpdated] = useState({
    email: '',
    verse: '',
    activity: '',
    weather: ''
  });

  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    // Set time-based greeting
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');

    // Initial data fetch
    const now = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    fetchEmailAnalysis().then(data => {
      setEmailAnalysis(data);
      setLastUpdated(prev => ({ ...prev, email: now }));
    });
    fetchVerseOfTheDay().then(data => {
      setVerseOfTheDay(data);
      setLastUpdated(prev => ({ ...prev, verse: now }));
    });
    fetchBoredActivity().then(data => {
      setBoredActivity(data);
      setLastUpdated(prev => ({ ...prev, activity: now }));
    });
    fetchWeather().then(data => {
      setWeatherJapan(data);
      setLastUpdated(prev => ({ ...prev, weather: now }));
    });
  }, []);

  const handleRefresh = async (type: 'email' | 'verse' | 'activity' | 'weather') => {
    setIsRefreshing(prev => ({ ...prev, [type]: true }));
    
    const now = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    
    try {
      switch(type) {
        case 'email':
          const emailData = await fetchEmailAnalysis();
          setEmailAnalysis(emailData);
          setLastUpdated(prev => ({ ...prev, email: now }));
          break;
        case 'verse':
          const verseData = await fetchVerseOfTheDay();
          setVerseOfTheDay(verseData);
          setLastUpdated(prev => ({ ...prev, verse: now }));
          break;
        case 'activity':
          const activityData = await fetchBoredActivity();
          setBoredActivity(activityData);
          setLastUpdated(prev => ({ ...prev, activity: now }));
          break;
        case 'weather':
          const weatherData = await fetchWeather();
          setWeatherJapan(weatherData);
          setLastUpdated(prev => ({ ...prev, weather: now }));
          break;
      }
    } finally {
      setIsRefreshing(prev => ({ ...prev, [type]: false }));
    }
  };

  const copyToClipboard = async (text: string, item: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(item);
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

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
                {greeting} ✨
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Real-time API Integration Dashboard</p>
            </div>
          </div>
        </header>
      </nav>
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">

          <BentoCard 
            title="Weather Today in Japan" 
            className="md:col-span-1 lg:col-span-2"
            actions={
              <div className="flex items-center gap-2">
                {lastUpdated.weather && (
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {lastUpdated.weather}
                  </span>
                )}
                <button 
                  onClick={() => handleRefresh('weather')}
                  disabled={isRefreshing.weather}
                  className="p-1.5 hover:bg-purple-100 dark:hover:bg-purple-800 rounded-lg transition-colors disabled:opacity-50"
                  title="Refresh weather"
                >
                  <svg className={`w-4 h-4 ${isRefreshing.weather ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              </div>
            }
          >
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

          <BentoCard 
            title="Bored?" 
            className="md:col-span-1"
            actions={
              <div className="flex items-center gap-2">
                {lastUpdated.activity && (
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {lastUpdated.activity}
                  </span>
                )}
                <button 
                  onClick={() => handleRefresh('activity')}
                  disabled={isRefreshing.activity}
                  className="p-1.5 hover:bg-purple-100 dark:hover:bg-purple-800 rounded-lg transition-colors disabled:opacity-50"
                  title="Get new activity"
                >
                  <svg className={`w-4 h-4 ${isRefreshing.activity ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              </div>
            }
          >
            <div className="space-y-3">
              <p className="text-sm text-gray-600 dark:text-gray-400">Try this activity:</p>
              <div className="p-4 bg-linear-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200/50">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <p className="font-semibold text-lg flex-1">{boredActivity.activity}</p>
                  <button 
                    onClick={() => copyToClipboard(boredActivity.activity, 'activity')}
                    className="p-1 hover:bg-purple-200 dark:hover:bg-purple-700 rounded transition-colors"
                    title="Copy activity"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {copiedItem === 'activity' ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      )}
                    </svg>
                  </button>
                </div>
                <div className="flex gap-2 text-sm">
                  <span className="px-2 py-1 bg-purple-200 dark:bg-purple-700 rounded-full text-purple-800 dark:text-purple-200">
                    {boredActivity.type 
                      ? boredActivity.type.charAt(0).toUpperCase() + boredActivity.type.slice(1) 
                      : 'N/A'}
                  </span>
                  <span className="px-2 py-1 bg-green-200 dark:bg-green-700 rounded-full text-green-800 dark:text-green-200">
                    {boredActivity.price == 0 ? 'Free' : `$${boredActivity.price}`}
                  </span>
                </div>
              </div>
            </div>
          </BentoCard>

          <BentoCard 
            title="Latest Email Status" 
            className="md:col-span-1"
            actions={
              <div className="flex items-center gap-2">
                {lastUpdated.email && (
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {lastUpdated.email}
                  </span>
                )}
                <button 
                  onClick={() => handleRefresh('email')}
                  disabled={isRefreshing.email}
                  className="p-1.5 hover:bg-purple-100 dark:hover:bg-purple-800 rounded-lg transition-colors disabled:opacity-50"
                  title="Refresh email status"
                >
                  <svg className={`w-4 h-4 ${isRefreshing.email ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              </div>
            }
          >
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200/50">
              <p className="text-sm leading-relaxed">{emailAnalysis}</p>
            </div>
          </BentoCard>

          <BentoCard 
            title="Verse of the Day" 
            className="md:col-span-1 lg:col-span-2"
            actions={
              <div className="flex items-center gap-2">
                {lastUpdated.verse && (
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {lastUpdated.verse}
                  </span>
                )}
                <button 
                  onClick={() => copyToClipboard(`${verseOfTheDay.verse} - ${verseOfTheDay.reference}`, 'verse')}
                  className="p-1.5 hover:bg-purple-100 dark:hover:bg-purple-800 rounded-lg transition-colors"
                  title="Copy verse"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {copiedItem === 'verse' ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    )}
                  </svg>
                </button>
                <button 
                  onClick={() => handleRefresh('verse')}
                  disabled={isRefreshing.verse}
                  className="p-1.5 hover:bg-purple-100 dark:hover:bg-purple-800 rounded-lg transition-colors disabled:opacity-50"
                  title="Refresh verse"
                >
                  <svg className={`w-4 h-4 ${isRefreshing.verse ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              </div>
            }
          >
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
