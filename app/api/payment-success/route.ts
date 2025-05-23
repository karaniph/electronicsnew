// Minimal static handler for deployment
export async function GET() {
  return new Response(JSON.stringify({ message: 'Payment success endpoint disabled for deployment.' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
