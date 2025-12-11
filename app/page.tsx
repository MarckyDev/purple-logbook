import BentoCard from '@/components/BentoCard';

async function get_email_analysis(){
    try {
    const response = await fetch(process.env.API_URL_EMAIL_READER as string, {
      cache: 'no-store' // Ensures fresh data on each request
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch');
    }
    
    const data = await response.json();
    console.log(data);
    return data.analysis || 'No analysis available';
  } catch (error) {
    console.error('Error fetching email analysis:', error);
    return 'Error loading email analysis';
  }
}

async function get_verse_of_the_day(){
    try {
    const response = await fetch(process.env.API_URL_VOTD as string, {
      cache: 'no-store' // Ensures fresh data on each request
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch');
    }
    
    const data = await response.json();
    console.log(data);
    return data || 'No verse available';
    } catch (error) {
      console.error('Error fetching verse of the day:', error);
      return 'Error loading verse of the day';
    }
}

async function get_bored_activity(){
    try {
    const response = await fetch(process.env.API_URL_BORED as string, {
      next: { revalidate: 300 } // Cache for 5 minutes
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch');
    }
    
    const data = await response.json();
    console.log(data);
    return data || 'No activity available';
    } catch (error) {
      console.error('Error fetching bored activity:', error);
      return 'Error loading bored activity';
    }
}

async function get_weather_japan(){
  try {
    const response = await fetch(process.env.API_URL_WEATHER as string, {
      //cache: 'force-cache' // Cache the response for better performance
      cache: 'no-store' // Ensures fresh data on each request
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch');
    }
    
    const data = await response.json();
    console.log(data);
    return data || 'No weather data available';
    } catch (error) {
      console.error('Error fetching weather data:', error);
      return 'Error loading weather data';
    }
}

export default async function Home() {
  const email_analysis = await get_email_analysis();
  const verse_of_the_day = await get_verse_of_the_day();
  console.log("================ VOTD ================");
  console.log(verse_of_the_day);
  console.log("===============================================");
  const bored_activity = await get_bored_activity();
  // console.log("================ Bored Activity ================");
  // console.log(bored_activity);
  // console.log("===============================================");

  const weather_japan = await get_weather_japan();
  console.log("================ Weather Japan ================");
  console.log(weather_japan);
  console.log("===============================================");

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

          <BentoCard title="🌤️ Weather Today in Japan" className="md:col-span-1 lg:col-span-2">
            <div className="space-y-3">
              <div className="text-4xl font-bold text-purple-700 dark:text-purple-300">
                {weather_japan.weather_main}
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="space-y-1">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Temperature</p>
                  <p className="text-xl font-semibold">{weather_japan.temp_min_celsius}° - {weather_japan.temp_max_celsius}°C</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Humidity</p>
                  <p className="text-xl font-semibold">{weather_japan.humidity}%</p>
                </div>
              </div>
              <div className="mt-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <p className="text-sm font-medium text-purple-800 dark:text-purple-200">{weather_japan.condition}</p>
              </div>
            </div>
          </BentoCard>

          <BentoCard title="🎯 Bored?" className="md:col-span-1">
            <div className="space-y-3">
              <p className="text-sm text-gray-600 dark:text-gray-400">Try this activity:</p>
              <div className="p-4 bg-linear-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200/50">
                <p className="font-semibold text-lg mb-2">{bored_activity.activity}</p>
                <div className="flex gap-2 text-sm">
                  <span className="px-2 py-1 bg-purple-200 dark:bg-purple-700 rounded-full text-purple-800 dark:text-purple-200">
                    {bored_activity.type != null ? (bored_activity.type).charAt(0).toUpperCase() + bored_activity.type.slice(1) : 'N/A'}
                  </span>
                  <span className="px-2 py-1 bg-green-200 dark:bg-green-700 rounded-full text-green-800 dark:text-green-200">
                    {bored_activity.price == 0 ? 'Free' : `$${bored_activity.price}`}
                  </span>
                </div>
              </div>
            </div>
          </BentoCard>

          <BentoCard title="📧 Latest Email Status" className="md:col-span-1">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200/50">
              <p className="text-sm leading-relaxed">{email_analysis}</p>
            </div>
          </BentoCard>

          <BentoCard title="📖 Verse of the Day" className="md:col-span-1 lg:col-span-2">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-purple-700 dark:text-purple-300">
                <span>{verse_of_the_day.reference}</span>
                <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-800 rounded text-xs">
                  {verse_of_the_day.version}
                </span>
              </div>
              <blockquote className="text-lg italic leading-relaxed border-l-4 border-purple-400 pl-4 py-2">
                &ldquo;{verse_of_the_day.verse}&rdquo;
              </blockquote>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                {verse_of_the_day.notice}
              </p>
            </div>
          </BentoCard>

        </div>
      </main>
    </div>
  );
}
