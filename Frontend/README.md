# Football Booking Frontend

Next.js App Router + TypeScript frontend for the Spring Boot Football Booking API.

## Run locally

Requirements: Node.js 20+ and npm. Start the backend on `http://localhost:8080`, then:

```bash
npm install
Copy-Item .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. Set `NEXT_PUBLIC_API_URL` in `.env.local` if the backend uses a different address. The backend CORS allow-list must include the frontend origin.

Production checks:

```bash
npm run build
npm start
```

## Screens

- Public home and searchable field directory with address/type/price filters and API pagination.
- Field detail, direct booking request, reviews, and server-reported booking price/status.
- Login/register, profile, booking history and booking detail/cancellation.
- Owner area for own fields and booking confirmation/rejection.
- Admin dashboard, users/owners, field status/create, field-type catalog, bookings, and statistics.

## Backend contract notes

The client uses JWT bearer tokens returned by `POST /api/auth/login` and stores the access token in browser local storage. Registration follows the backend's six-character minimum password rule. All API calls use the configured API URL and handle the `{ status, message, data }` response envelope plus backend validation errors.

Some requested admin capabilities are not present in the current backend and are therefore not simulated:

- Field types have only `GET /api/field-types`; the admin catalog is read-only.
- No endpoint reports field availability. The booking form submits a date/time range and displays conflicts returned by the booking API.
- Admin booking API is list-only; confirm/reject actions are available in the owner area, where the backend exposes them.
- Statistics include aggregate counts, booking status totals, and total revenue only. No revenue-by-day/month or occupancy endpoint exists.
- Profile update supports name and phone only; there is no change-password endpoint.

The API request fields and statuses are defined from backend DTOs and enums; frontend forms do not send a booking total price because the backend calculates it.

