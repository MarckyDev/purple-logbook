export async function GET() {
    try {
    const response = await fetch('https://beta.ourmanna.com/api/v1/get/?format=json');
    const data = await response.json();
    return Response.json(data);
    } catch (error) {
        return Response.json({ error: 'Failed to fetch verse of the day. ' + error }, { status: 500 });
    }
}