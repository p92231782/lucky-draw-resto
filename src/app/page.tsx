'use client';

import { useState } from 'react';
import Script from 'next/script';

export default function Home() {
  const [winner, setWinner] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const spin = async () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const r = await fetch('/api/nearby', {
        method: 'POST',
        body: JSON.stringify({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        })
      });
      const places = await r.json();
      if (!places.length) {
        alert('附近找不到餐廳 😢');
        return setLoading(false);
      }
      const pick = places[Math.floor(Math.random() * places.length)];
      setWinner(pick);
      setLoading(false);
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-3xl font-bold">今晚吃什麼？ Lucky Draw!</h1>

      <button
        onClick={spin}
        className="rounded-2xl bg-indigo-600 px-6 py-3 text-white shadow-lg hover:scale-105 transition"
        disabled={loading}
      >
        {loading ? '尋找中…' : '抽獎！'}
      </button>

      {winner && (
        <div className="w-full max-w-md rounded-2xl border p-4 shadow">
          <h2 className="text-xl font-semibold">{winner.displayName.text}</h2>
          {winner.rating && <p>⭐ {winner.rating}</p>}
          <p className="text-sm text-gray-600">{winner.formattedAddress}</p>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              winner.displayName.text
            )}&query_place_id=${winner.id}`}
            target="_blank"
            className="text-indigo-600 underline"
          >
            在 Google 地圖開啟
          </a>
        </div>
      )}

      {/* 非必需：若你要在頁面上也嵌入地圖再加這段 Script */}
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
        strategy="afterInteractive"
      />
    </main>
  );
}
