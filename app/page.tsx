import Card from "@/components/Card";
import { use } from "react";


async function get_email_analysis(){
    try {
    const response = await fetch('http://localhost:3000/api/email-reader', {
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
    const response = await fetch('http://localhost:3000/api/verse-of-the-day', {
      //cache: 'force-cache' // Cache the response for better performance
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

export default async function Home() {
  //const email_analysis = await get_email_analysis();
  const verse_of_the_day = await get_verse_of_the_day();
  //verse_of_the_day = verse_of_the_day.data;
  console.log(verse_of_the_day);
  return (
    <div className="flex min-h-screenfont-sans flex-col overflow-clip">
      <nav>
        <header className="border-red-50 border-2 p-4">
          <h1 className="text-5xl font-bold text-purple-600 text-left">
            Hello Marc!
          </h1>
        </header>
      </nav>
      <main className="grid grid-flow-dense grid-cols-2 grid-rows-6 min-h-screen w-full mx-auto px-4 gap-4 mt-4">

      <div className="row-span-3 border-2 border-red-500 h-full w-auto">
          Weather 
          <div className="border-blue-500 border-2">
            tryret
          </div>
      </div>

      <div className="row-span-3 border-2 border-red-500 h-full w-auto">
          Timezones 
      </div>

      <div className="row-span-2 border-2 border-red-500 h-72 w-auto">
          To Do &apos;s
      </div>

      <div className="row-span-2 border-2 border-red-500 h-72 w-auto">
          Verse of the Day
          <div className="border-blue-500 border-2 p-4 m-2">
            {verse_of_the_day.verse.details.reference} ({verse_of_the_day.verse.details.version})
            <p className="mt-2 italic">{verse_of_the_day.verse.details.text}</p>
          </div>
      </div>

        
      </main>
    </div>
  );
}
