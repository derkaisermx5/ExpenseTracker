# Expense Tracker

A full-stack expense tracking application with a live dashboard, category and monthly breakdowns, filtering, and CSV export. Built with React, Express, and MongoDB.

**Live app:** [https://expense-tracker-ruddy-five-30.vercel.app/](https://expense-tracker-ruddy-five-30.vercel.app/)

## Features

- **Add, view, and delete transactions** — track income and expenses with category, amount, description, and date
- **Dashboard** — live summary cards (total balance, income, expenses, savings rate), a spending-by-category donut chart, and a monthly income vs. expenses bar chart
- **Filtering** — narrow the transaction list by category and/or date range
- **CSV export** — download all transactions as a spreadsheet-compatible file
- **Responsive design** — sidebar navigation on desktop, collapsible hamburger menu on mobile
- **Error handling** — graceful fallback UI with retry if the backend is unreachable

## Tech Stack

- **Frontend:** React (Vite), Recharts
- **Backend:** Node.js, Express
- **Database:** MongoDB (Atlas), Mongoose
- **Deployment:** Vercel (frontend), Render (backend)

## Project Structure

```
ExpenseTracker/
├── client/          # React frontend (Vite)
│   └── src/
│       ├── components/
│       └── App.jsx
├── server/          # Express backend
│   ├── models/
│   └── routes/
```

## Getting Started Locally

### Prerequisites

- Node.js and npm installed
- A MongoDB Atlas account (free tier works) or a local MongoDB instance

### 1. Clone the repo

```bash
git clone https://github.com/derkaisermx5/ExpenseTracker.git
cd ExpenseTracker
```

### 2. Set up the backend

```bash
cd server
npm install
```

Create a `.env` file in `server/`:

```
MONGO_URI=your_mongodb_connection_string
```

Start the server:

```bash
node server.js
```

The API will run at `http://localhost:5000`.

### 3. Set up the frontend

```bash
cd ../client
npm install
```

Create a `.env` file in `client/`:

```
VITE_API_URL=http://localhost:5000
```

Start the dev server:

```bash
npm run dev
```

The app will run at `http://localhost:5173`.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|--------------|
| GET | `/api/transactions` | Get all transactions |
| POST | `/api/transactions` | Create a new transaction |
| PUT | `/api/transactions/:id` | Update a transaction |
| DELETE | `/api/transactions/:id` | Delete a transaction |
| GET | `/api/transactions/summary` | Get totals, balance, savings rate, category breakdown, and monthly breakdown |

## Deployment

- **Frontend** is deployed on [Vercel](https://vercel.com), with the `client` folder set as the project root and `VITE_API_URL` set as an environment variable pointing to the live backend.
- **Backend** is deployed on [Render](https://render.com), with the `server` folder set as the project root and `MONGO_URI` set as an environment variable.

## Future Improvements

- User authentication (multiple users, private data)
- Budgets and savings goals
- Recurring transactions
- Multi-currency support

## License

This project is open source and available for personal or educational use.
