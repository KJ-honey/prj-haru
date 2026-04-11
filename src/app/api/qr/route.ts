import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const data = searchParams.get('data');
  if (!data) return new NextResponse('Bad Request', { status: 400 });

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(data)}&format=png`;
  const response = await fetch(qrUrl);
  const blob = await response.blob();
  
  return new NextResponse(blob, {
    headers: {
      'Content-Type': response.headers.get('content-type') || 'image/png',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
