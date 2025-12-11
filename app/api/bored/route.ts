export const revalidate = 300; // Cache for 5 minutes

export async function GET() {
    try {
    const response = await fetch('http://localhost:8000/bored_activity', {
      next: { revalidate: 300 }
    });
    const data = await response.json();
    return Response.json(data);
  } catch (error) {
      return Response.json({ error: 'Failed to catch boredom activities. ' + error }, { status: 500 });
  }
}