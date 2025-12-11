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
      //cache: 'force-cache' // Cache the response for better performance
      cache: 'no-store' // Ensures fresh data on each request
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

export default async function Home() {
  const email_analysis = await get_email_analysis();
  const verse_of_the_day = await get_verse_of_the_day();
  //console.log(verse_of_the_day);
  const bored_activity = await get_bored_activity();
  // console.log("================ Bored Activity ================");
  // console.log(bored_activity);
  // console.log("===============================================");
  return (
    <div className="flex min-h-screenfont-sans flex-col overflow-clip">
      <nav>
        <header className="border-red-50 border-2 p-4">
          <h1 className="text-5xl font-bold text-purple-600 text-left">
            API Playground
          </h1>
        </header>
      </nav>
      <main className="grid grid-flow-dense grid-cols-2 grid-rows-6 min-h-screen w-full mx-auto px-4 gap-4 mt-4">

      <div className="row-span-3 border-2 border-red-500 h-full w-auto">
          Weather Today in the Philippines
          <div className="border-blue-500 border-2">
            tryret
          </div>
      </div>

      <div className="row-span-3 border-2 border-red-500 h-full w-auto">
          Bored?
          <br/>
          Try this activity:
          <div className="border-blue-500 border-2 p-4 m-2">
            {bored_activity.activity} (Type: {(bored_activity.type).charAt(0).toUpperCase() + bored_activity.type.slice(1)})
            <br/>
            Price: {bored_activity.price == 0 ? 'Free' : bored_activity.price}
          </div>
      </div>

      <div className="row-span-2 border-2 border-red-500 h-72 w-auto">
          Latest Email Status
          <div className="border-blue-500 border-2 p-4 m-2">
            {email_analysis}
          </div>
      </div>

      <div className="row-span-2 border-2 border-red-500 h-72 w-auto">
          Verse of the Day
          <div className="border-blue-500 border-2 p-4 m-2">
            {verse_of_the_day.verse.details.reference} ({verse_of_the_day.verse.details.version})
            <p className="mt-2 italic">{verse_of_the_day.verse.details.text}</p>
            <br/>
            <p className="mt-2 italic">{verse_of_the_day.verse.notice}</p>
          </div>
      </div>

        
      </main>
    </div>
  );
}
