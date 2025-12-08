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
    <div className="flex min-h-screen bg-indigo-50 font-sans">
      <main className="flex min-h-screen w-full max-w-3xl flex-col  justify-center mx-auto px-4">
        <h2 className="text-4xl font-bold text-purple-900 sm:text-5xl text-center">
          Welcome to Purple API Playground
        </h2>
        
        <p className="mt-4 text-purple-600 sm:text-lg text-center">
          Try emailing this email to see the analysis:<br/>
          <strong>example@email.com</strong>
        </p>
        <div className="mt-8">
          <Card title="Current Email" content={email_analysis ? email_analysis : "Obtaining Latest Email..."}/>
        </div>


        
      </main>
    </div>
  );
}
