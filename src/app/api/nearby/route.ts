// src/app/api/nearby/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
 
  const payload = await req.json();
  console.log('incoming payload =', payload);

  const { lat, lng } = payload;

 
  if (lat == null || lng == null) {
    console.log('❌ Missing lat/lng:', { lat, lng });
    return NextResponse.json({ error: 'Bad Request: lat/lng missing' }, { status: 400 });
  }


  if (!process.env.GOOGLE_MAPS_API_KEY) {
    console.log('❌ Missing GOOGLE_MAPS_API_KEY environment variable');
    return NextResponse.json({ error: 'Server configuration error: API key missing' }, { status: 500 });
  }

  console.log('✅ API Key exists:', process.env.GOOGLE_MAPS_API_KEY.substring(0, 10) + '...');


  const body = {
    includedTypes: ['restaurant'], 
    maxResultCount: 20,
    locationRestriction: {
      circle: { center: { latitude: lat, longitude: lng }, radius: 1000 }
    }
  };

  console.log('📡 Sending to Google Places API:', JSON.stringify(body, null, 2));

  try {
    const res = await fetch('https://places.googleapis.com/v1/places:searchNearby', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'X-Goog-Api-Key': process.env.GOOGLE_MAPS_API_KEY!,
        'X-Goog-FieldMask':
          'places.displayName,places.rating,places.formattedAddress,places.priceLevel,places.location'
      },
      body: JSON.stringify(body)

    });

    console.log('📨 Google API Response Status:', res.status);

    if (!res.ok) {
 
      const text = await res.text();
      console.log('❌ Google API Error:', text);
      return NextResponse.json({ 
        error: `Google Places API Error: ${text}`,
        status: res.status 
      }, { status: res.status });
    }

    const json = await res.json();
    console.log('✅ Google API Success, places count:', json.places?.length || 0);
    

    return NextResponse.json(json.places ?? []);
  } catch (err) {
    console.error('❌ Places API fetch failed', err);
    return NextResponse.json({ error: 'Internal Server Error: ' + (err as Error).message }, { status: 500 });
  }
}
