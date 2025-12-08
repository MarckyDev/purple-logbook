import Card from "@/components/Card";


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

export default async function Home() {
  const email_analysis = await get_email_analysis();
  return (
    <div className="flex min-h-screenfont-sans flex-col ">
      <nav>
        <header className=" col-span-1 border-red-50 border-2 p-4">
          <h1 className="text-5xl font-bold text-purple-600 text-left">
            Hello Marc!
          </h1>
        </header>
      </nav>
      <main className="grid grid-cols-2 grid-rows-2 min-h-screen w-full max-w-3xl mx-auto px-4 gap-4 mt-8">
      <div className="border-2 border-red-500 h-auto w-auto"> hello world</div>
      <div className="border-2 border-red-500 h-auto w-auto"> hello world</div>
      <div className="border-2 border-red-500 h-auto w-auto"> hello world</div>
      <div className="border-2 border-red-500 h-auto w-auto"> hello world</div>
        
      </main>
    </div>
  );
}
