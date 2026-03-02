# KapeDoko

KapeDoko is a **Nuxt 3** web and mobile app for discovering coffee shops. It uses Mapbox for maps, geolocation for “cafes near me,” plus search, favorites, and onboarding. The stack includes Nuxt UI, Pinia, Ionic, and Capacitor (for Android).

---

## Prerequisites

- **Node.js** 18.x or 20.x (LTS recommended)
- **npm** (comes with Node.js)

---

## Setup & run (from clone to dev server)

### 1. Clone the repository

```bash
git clone <repository-url>
cd kapedoko-app
```

Replace `<repository-url>` with your repo URL (e.g. `https://github.com/your-org/kapedoko-app.git`).

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

Nuxt will start the dev server (usually at **http://localhost:3000**). Open that URL in your browser.

---

## Other npm scripts

| Command | Description |
|--------|-------------|
| `npm run build` | Build the app for production |
| `npm run preview` | Preview the production build locally |
| `npm run generate` | Generate a static site |

---

## Optional: Android (Capacitor)

To run on an Android device or emulator:

1. Build the app: `npm run build`
2. Add the Android platform: `npx cap add android` (if not already added)
3. Sync and open in Android Studio: `npx cap sync android` then `npx cap open android`

---

## Tech stack

- **Nuxt 3** – Vue-based framework
- **Nuxt UI** – UI components
- **Pinia** – State management
- **Ionic** – Mobile UI (via `@nuxtjs/ionic`)
- **Capacitor** – Native Android (and optional iOS)
- **Mapbox GL** – Maps
- **Tailwind CSS** – Styling
