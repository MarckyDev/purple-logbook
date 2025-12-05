export async function GET() {
    try {
    const response = await fetch('http://localhost:8000/analyze');
    const data = await response.json();
    
    return Response.json(data);
  } catch (error) {
    return Response.json({ error: 'Failed to analyze email' }, { status: 500 });
  }
}