export async function GET() {
    try {
    const response = await fetch(process.env.API_URL_VOTD as string);
    const data = await response.json();
    return Response.json(data);
    } catch (error) {
        return Response.json({ error: 'Failed to fetch verse of the day. ' + error }, { status: 500 });
    }
}