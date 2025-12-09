export async function GET() {
    try {
    const response = await fetch('http://localhost:8000/bored_activity');
    const data = await response.json();
    return Response.json(data);
  } catch (error) {
      return Response.json({ error: 'Failed to catch boredom activities. ' + error }, { status: 500 });
  }
}