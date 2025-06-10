// src/app/api/nearby/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  // 1️⃣ 先讀取前端送來的 JSON
  const payload = await req.json();
  console.log('incoming payload =', payload);

  const { lat, lng } = payload;

  // 2️⃣ 基本驗證：緯經度缺一不可
  if (lat == null || lng == null) {
    console.log('❌ Missing lat/lng:', { lat, lng });
    return NextResponse.json({ error: 'Bad Request: lat/lng missing' }, { status: 400 });
  }

  // 2.5️⃣ 驗證 API Key
  if (!process.env.GOOGLE_MAPS_API_KEY) {
    console.log('❌ Missing GOOGLE_MAPS_API_KEY environment variable');
    return NextResponse.json({ error: 'Server configuration error: API key missing' }, { status: 500 });
  }

  console.log('✅ API Key exists:', process.env.GOOGLE_MAPS_API_KEY.substring(0, 10) + '...');

  // 3️⃣ 組 Places API (New) Request
  const body = {
    includedTypes: ['restaurant'], // 根據 Google Places API 文檔，這個是正確的
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
      // 先移除 cache，避免干擾調試
      // next: { revalidate: 1800 }
    });

    console.log('📨 Google API Response Status:', res.status);

    if (!res.ok) {
      // 把 Google 端錯誤原封回傳，方便前端顯示
      const text = await res.text();
      console.log('❌ Google API Error:', text);
      return NextResponse.json({ 
        error: `Google Places API Error: ${text}`,
        status: res.status 
      }, { status: res.status });
    }

    const json = await res.json();
    console.log('✅ Google API Success, places count:', json.places?.length || 0);
    
    // 取 json.places；若 undefined 回傳空陣列
    return NextResponse.json(json.places ?? []);
  } catch (err) {
    console.error('❌ Places API fetch failed', err);
    return NextResponse.json({ error: 'Internal Server Error: ' + (err as Error).message }, { status: 500 });
  }
}