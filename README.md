# AizaRest

A restaurant booking platform for Kyrgyzstan. Browse restaurants in Bishkek, Osh, and across the country, book tables online, and manage reservations — all without a backend.


---

## Tech Stack

| Layer         | Technology                          |
|---------------|-------------------------------------|
| Framework     | React 18 + Vite                     |
| Routing       | React Router v6                     |
| State         | Context API + React Hooks           |
| Charts        | Recharts                            |
| Persistence   | localStorage (no backend)           |
| Styling       | Vanilla CSS (CSS custom properties) |

---

## Features

- Browse and search restaurants with filters (cuisine, price, rating)
- Paginated restaurant listing (6 per page)
- Restaurant detail with menu, gallery, and info tabs
- Inline booking form — date, time, guests, and phone
- User dashboard with booking history, status filters, and cancellation
- Favorites system — heart toggle persists across sessions
- Dark / light theme toggle — persists across sessions
- Admin panel with overview stats, charts, bookings management, and user role control
- Protected routes — user-only and admin-only access enforced client-side
- Toast notifications on every CRUD action
- Confirm modal before every delete

---

## Demo Accounts

| Role          | Email                  | Password  |
|---------------|------------------------|-----------|
| User          | user@aizarest.kg       | user123   |
| Administrator | admin@aizarest.kg      | admin123  |

---

## Local Setup

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173` by default.

---

## Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── ui/
│   │   ├── EmptyState.jsx
│   │   ├── LoadingSpinner.jsx
│   │   ├── Modal.jsx
│   │   ├── StarRating.jsx
│   │   └── Toast.jsx
│   ├── ProtectedRoute.jsx
│   └── RestaurantCard.jsx
├── context/
│   ├── AppContext.jsx
│   ├── AuthContext.jsx
│   └── ThemeContext.jsx
├── hooks/
│   ├── useFavorites.js
│   └── usePagination.js
├── pages/
│   ├── AdminPanel.jsx
│   ├── BookingForm.jsx
│   ├── Dashboard.jsx
│   ├── Favorites.jsx
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── NotFound.jsx
│   ├── Profile.jsx
│   ├── Register.jsx
│   ├── RestaurantDetail.jsx
│   ├── RestaurantForm.jsx
│   └── Restaurants.jsx
├── utils/
│   └── data.js
├── App.jsx
├── index.css
└── main.jsx
```

---

## Deploy

### Vercel

```bash
npm run build
npx vercel --prod
```

Or connect your GitHub repository in the Vercel dashboard. Vite projects are auto-detected; set the output directory to `dist`.

### Netlify

```bash
npm run build
```

Upload the `dist/` folder via the Netlify dashboard, or use the included `netlify.toml` for automatic deployments from GitHub.

```toml
[build]
  command = "npm run build"
  publish = "dist"
```

Add a `_redirects` file in `public/` for SPA routing:

```
/*  /index.html  200
```
