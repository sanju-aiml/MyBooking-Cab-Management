## Overview
Run the React frontend (Vite) located under `app` and open it at `http://localhost:5173`. This pairs with the backend CORS already allowing `http://localhost:5173`.

## Prerequisites
1. Node.js and npm installed (`npm -v` should work).
2. Backend can run separately on port `1111` (optional for frontend-only run).

## Start Dev Server
1. In a terminal: `cd "/Users/sanju/Library/Mobile Documents/com~apple~CloudDocs/Desktop/Booking_Management/app"`
2. Install deps (first run): `npm install`
3. Start dev: `npm run dev`
4. Open `http://localhost:5173` in the browser.

## Alternative: Preview Build
1. Build: `npm run build`
2. Preview: `npm run preview`
3. Open `http://localhost:4173`.

## Notes
- Vite config does not override the default port; expect `5173`.
- No `.env` files found; frontend will use hardcoded API URLs in code (if any).