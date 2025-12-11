export async function GET() {
    try {
    const response = await fetch('http://localhost:8000/weather_today');
    const data = await response.json();
    return Response.json(data);
    } catch (error) {
        return Response.json({ error: 'Failed to fetch verse of the day. ' + error }, { status: 500 });
    }
}