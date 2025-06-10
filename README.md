# 🍀 Lucky-Draw Resto

A tiny web app that picks a **random nearby restaurant** so you never have to ask  
“今天吃什麼？” again.

https://lucky-draw-resto.vercel.app/

Built with **Next.js 15 (App Router + Turbopack)**, **TypeScript**, and the  
**Google Places API**. Deploy-ready for **Vercel** in one click.


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

---

## 🚀 Quick Start (Local dev)

### 1. Clone & install

```bash
git clone https://github.com/<you>/lucky-draw-resto.git
cd lucky-draw-resto
npm install      # or pnpm / yarn
````

### 2. Get Google API keys

| Key name                          | Scope                             | Best practice                                                                                                                                     |
| --------------------------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GOOGLE_MAPS_API_KEY`             | Server-side calls (route handler) | **IP unrestricted**, API restrictions = *Places API* (Classic **or** New)                                                                         |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | (Optional) Maps JS in browser     | **HTTP referrer** restricted (`http://localhost:3000/*`, `https://*.vercel.app/*`), API restrictions = *Maps JavaScript API* (+ Places if needed) |

Create `.env.local`:

```bash
GOOGLE_MAPS_API_KEY=AIza...      # server key (required)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIza...  # browser key (optional)
```

> **Tip:** don’t commit `.env.local`; a `.gitignore` entry is already provided.

### 3. Run dev server

```bash
npm run dev     # ➜ http://localhost:3000
```

---

## 🏗 Build & Deploy (Vercel)

1. Push to GitHub (or GitLab/Bitbucket).

2. **Import Project** on [Vercel](https://vercel.com).

3. In **Settings → Environment Variables** add the same vars:

   | Name                              | Value                |
   | --------------------------------- | -------------------- |
   | `GOOGLE_MAPS_API_KEY`             | `AIza...`            |
   | `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | `AIza...` (optional) |

4. Click **Deploy** – Vercel will run `npm run build` and host at
   `https://<project>.vercel.app`.

---

## 🔧 Config & Customization

| What             | Where                                                                | How                            |
| ---------------- | -------------------------------------------------------------------- | ------------------------------ |
| Search radius    | `src/app/api/nearby/route.ts`                                        | Change `radius: 1500` (meters) |
| Result page size | Classic API → automatic 20; New API → `maxResultCount`               |                                |
| API version      | Toggle switch in route handler:<br>`useNewApi = true/false`          |                                |
| Avoid duplicates | Store `place_id`s in `localStorage` and filter before draw           |                                |
| Add map preview  | Uncomment `<Script …>` in `page.tsx` + add a simple `<div id="map">` |                                |
| UI theme         | Tailwind classes in `page.tsx`                                       |                                |

---

## 🧩 Switching to Places API (New)

1. **Enable** *Places API (New)* in Google Cloud Console.
2. Replace the `useClassicApi` flag in the route handler (sample code included).
3. Make sure to send a **POST** request with `X-Goog-FieldMask`.
4. Keep an eye on usage: the new SKU uses a different pricing table.

---

## 🛡 Quota & Cost Tips

* Google’s \$200/month free credit ≈ \~6 000 Standard Nearby calls.
* Edge-cache responses (`next: { revalidate: 1800 }`) to save quota.
* Filter by `price_level`, `rating` server-side to avoid polling again on client.

---

## 📜 Scripts

| Command         | What it does                           |
| --------------- | -------------------------------------- |
| `npm run dev`   | Next.js dev server (Turbopack, HMR)    |
| `npm run build` | Production build (`.next/`)            |
| `npm start`     | Start local prod server (`next start`) |
| `npm run lint`  | ESLint + TypeScript checks             |

---

## 🤝 Contributing

1. Fork ➜ create feature branch (`git checkout -b feat/my-awesome-idea`).
2. Commit **with conventional commits**.
3. Open Pull Request – CI must pass 🎉.

---

## 📄 License

[MIT](LICENSE)

---

> Made with ☕ and 🍜 in Taipei. If this project helped you, star the repo or buy me a milk tea!

```

**How to use**

1. Save as `README.md` in your repo root.  
2. Replace placeholder URLs / screenshots.  
3. (Optional) Remove sections you don’t need, or localize to 繁體中文。

Enjoy shipping!
```
