# 🍀 Lucky-Draw Resto

A tiny web app that picks a **random nearby restaurant** so you never have to ask  
“今天吃什麼？” again.

Built with **Next.js 15 (App Router + Turbopack)**, **TypeScript**, and the  
**Google Places API**. Deploy-ready for **Vercel** in one click.

---

## ✨ Demo

| Desktop | Mobile |
|---------|--------|
| ![Desktop demo](docs/demo-desktop.gif) | ![Mobile demo](docs/demo-mobile.gif) |

*(Add your own GIFs / screenshots to `/docs` when you’re ready.)*

---

## 🔨 Features

| Feature | Notes |
|---------|-------|
| 💡 “Lucky draw” button | Uses `Math.random()` on Google Places results |
| 📍 Auto-detect location | HTML Geolocation API (falls back with a toast if denied) |
| 🌐 Serverless API route | Hides your Google API key + enables caching |
| ⚡️ Fast | Turbopack dev server + optional Maps JS lazy-load |
| 🛠 100 % TypeScript | Strict types (`Place` interface) |
| ♻️ 30 min edge cache | Reduce Places quota usage (configurable) |
| 🗺 Optional map | Add the Maps JS `<Script>` only if you need it |

---

## 🗄 Tech Stack

| Layer | Tech |
|-------|------|
| Front end | Next.js 15, React 18, Tailwind CSS |
| Back end | Next.js App Router **route handler** (`src/app/api/nearby/route.ts`) |
| Data | Google **Places API** — choose *Classic Nearby Search* **or** *Places API (New)* |
| Infra | Vercel (Preview & Prod), GitHub CI (auto-deploy on push) |

