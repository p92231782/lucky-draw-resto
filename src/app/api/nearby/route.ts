import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { lat, lng } = await req.json();
    if (!lat || !lng) return NextResponse.json({ error: 'Bad Request' }, { status: 400 });

    const body = {
        includedTypes: ['RESTAURANT'],
        maxResultCount: 20,
        locationRestriction: {
            circle: { center: { latitude: lat, longitude: lng }, radius: 1500 }
        }
    };

    const res = await fetch(
        'https://places.googleapis.com/v1/places:searchNearby',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'X-Goog-Api-Key': process.env.GOOGLE_MAPS_API_KEY!,
                'X-Goog-FieldMask':
                    'places.displayName,places.rating,places.formattedAddress,places.priceLevel,places.location'
            },
            body: JSON.stringify(body),
            // 60 s Server-Side Cache, 30 min revalidate
            next: { revalidate: 1800 }
        }
    );

    const json = await res.json();
    return NextResponse.json(json.places ?? []);
}
