# Zerodha Clone — Fresher Interview Guide

> **Use this file with `README.md`:**  
> - `README.md` → setup, commands, how to run  
> - **`PROJECT_INTERVIEW_GUIDE.md`** → explain the project in interviews + expected questions & answers  

---

## Table of contents

1. [30-second elevator pitch](#30-second-elevator-pitch)
2. [2-minute project explanation](#2-minute-project-explanation)
3. [What problem does this project solve?](#what-problem-does-this-project-solve)
4. [Complete project overview](#complete-project-overview)
5. [Architecture (draw this in interview)](#architecture-draw-this-in-interview)
6. [Tech stack & why you used it](#tech-stack--why-you-used-it)
7. [Folder structure explained](#folder-structure-explained)
8. [How each part works (deep dive)](#how-each-part-works-deep-dive)
9. [Database & API details](#database--api-details)
10. [Environment variables (.env)](#environment-variables-env)
11. [Challenges you faced & how you fixed them](#challenges-you-faced--how-you-fixed-them)
12. [What you learned as a fresher](#what-you-learned-as-a-fresher)
13. [Honest limitations (say this confidently)](#honest-limitations-say-this-confidently)
14. [Future improvements you can mention](#future-improvements-you-can-mention)
15. [Interview questions & sample answers](#interview-questions--sample-answers)
16. [Coding / technical round questions](#coding--technical-round-questions)
17. [Behavioral questions about this project](#behavioral-questions-about-this-project)
18. [Questions you can ask the interviewer](#questions-you-can-ask-the-interviewer)
19. [Quick revision cheat sheet](#quick-revision-cheat-sheet)

---

## 30-second elevator pitch

> “I built a **Zerodha Clone** — a full-stack web project with three parts: a **React landing website** for marketing pages, a **React trading dashboard** like Kite’s UI, and a **Node.js + Express backend** with **MongoDB**. The dashboard fetches **holdings** from the database using REST APIs and can **place buy orders** that get saved in MongoDB. I used **Axios** for API calls, **Mongoose** for database models, and **Chart.js** for portfolio charts. It’s a learning project, not real trading, but it shows I understand **frontend, backend, and database** working together.”

---

## 2-minute project explanation

This project imitates **Zerodha** (Indian stock broker) at a basic level.

1. **frontend** (port 3000) — Public website: Home, Products, Pricing, About, Support, Signup. Pure UI; no backend connection.
2. **dashboard** (port 3001) — Trading-style app: watchlist, holdings table, buy window, summary, orders, positions, funds.
3. **Backend** (port 3002) — REST API that connects to **MongoDB Atlas**, stores **holdings** and **orders**, and sends JSON to the dashboard.

**Real dynamic flow:**  
Dashboard → `GET /allHoldings` → Express → MongoDB → JSON → React table + chart.

**When user buys a stock:**  
Watchlist → Buy modal → `POST /newOrder` → saved in `orders` collection.

**Static parts (for UI only):** watchlist, positions, summary numbers — stored in `dashboard/src/data/data.js`, not in DB yet.

---

## What problem does this project solve?

**For learning / portfolio (not production):**

- Shows you can build a **multi-app** system (not just one HTML page).
- Shows **client–server** communication (React ↔ Express ↔ MongoDB).
- Shows **REST API** design (`GET`, `POST`).
- Shows **real-world tools**: Git, npm, `.env`, MongoDB Atlas, CORS.

**In interview, say:**  
“It’s a **portfolio and learning project** to practice MERN-style development. It does not execute real trades or connect to NSE/BSE live feeds.”

---

## Complete project overview

| Part | Folder | Port | Technology | Main job |
|------|--------|------|------------|----------|
| Landing site | `frontend/` | 3000 | React 19, React Router | Marketing pages |
| Dashboard | `dashboard/` | 3001 | React 18, Axios, MUI, Chart.js | Trading UI |
| API | `Backend/` | 3002 | Node, Express 5, Mongoose | REST + MongoDB |

### Main features you can claim

| Feature | Implemented? | Details |
|---------|--------------|---------|
| Multi-page landing site | Yes | 6+ routes with Navbar/Footer |
| Dashboard navigation | Yes | React Router: Summary, Orders, Holdings, etc. |
| Fetch holdings from DB | Yes | `Holdings.js` + `useEffect` + Axios |
| Place buy order | Yes | `BuyActionWindow.js` → `POST /newOrder` |
| MongoDB Atlas | Yes | Cloud database via `MONGO_URL` |
| Auto seed data | Yes | 13 stocks on first server start |
| Charts | Yes | Chart.js bar + doughnut charts |
| User login | No | Passport in package.json but not wired |
| Live stock prices | No | Static/mock prices |
| Sell order from UI | No | Sell button exists, not fully wired |

---

## Architecture (draw this in interview)

```
┌─────────────────┐     ┌─────────────────┐
│   frontend      │     │   dashboard     │
│   React :3000   │     │   React :3001   │
│   (no API)      │     │   Axios calls   │
└─────────────────┘     └────────┬────────┘
                                 │ HTTP (JSON)
                                 ▼
                        ┌─────────────────┐
                        │    Backend      │
                        │  Express :3002  │
                        │  CORS + routes  │
                        └────────┬────────┘
                                 │ Mongoose
                                 ▼
                        ┌─────────────────┐
                        │  MongoDB Atlas  │
                        │  DB: Zerodha    │
                        │  holdings       │
                        │  orders         │
                        └─────────────────┘
```

**Say in interview:** “Frontend and dashboard are **decoupled**. Only the dashboard talks to the API. That’s similar to how real products separate marketing site from trading app.”

---

## Tech stack & why you used it

| Technology | Where used | Why (interview answer) |
|------------|------------|-------------------------|
| **React** | frontend, dashboard | Component-based UI, reusable, industry standard |
| **React Router** | Both React apps | SPA navigation without full page reload |
| **Node.js** | Backend | JavaScript on server — same language as frontend |
| **Express** | Backend | Simple, fast way to create REST APIs |
| **MongoDB** | Database | Flexible JSON-like documents — good for holdings/orders |
| **Mongoose** | Backend | Schema + models for MongoDB, easy CRUD |
| **Axios** | Dashboard | Promise-based HTTP client, cleaner than raw fetch |
| **CORS** | Backend | Allows dashboard (port 3001) to call API (port 3002) |
| **dotenv** | Backend, dashboard | Hide secrets (DB URL) and configure ports |
| **Chart.js** | Dashboard | Visualize holdings prices |
| **Material UI** | Dashboard | Tooltips/icons for watchlist actions |
| **nodemon** | Backend dev | Auto-restart server on code change |

**MERN?**  
Yes — **M**ongoDB, **E**xpress, **R**eact, **N**ode. (React is split into two apps, but stack is MERN-style.)

---

## Folder structure explained

```
Zerodha_clone/
├── frontend/              → Landing website
├── dashboard/             → Trading dashboard
├── Backend/               → API + database logic
├── README.md              → Run & setup guide
└── PROJECT_INTERVIEW_GUIDE.md  → This file (interview prep)
```

**Important files to know by name:**

| File | Why interviewer may ask |
|------|-------------------------|
| `Backend/server.js` | All API routes, DB connect, seeding |
| `Backend/model/HoldingsModel.js` | Mongoose model for holdings |
| `Backend/seed/holdingsSeed.js` | Initial 13 stocks |
| `dashboard/src/Components/Holdings.js` | Fetches & displays holdings |
| `dashboard/src/Components/BuyActionWindow.js` | Places order |
| `dashboard/src/config.js` | API base URL from `.env` |
| `dashboard/src/data/data.js` | Mock watchlist & positions |

---

## How each part works (deep dive)

### 1. Landing site (`frontend`)

- Entry: `src/index.js` — wraps app in `BrowserRouter`, adds `Navbar` + `Footer`.
- Routes: `/`, `/signup`, `/about`, `/product`, `/pricing`, `/support`, `*` (404).
- **No API calls** — completely static React pages.
- **Interview line:** “I practiced React routing and component composition on the public site.”

### 2. Dashboard (`dashboard`)

- Entry: `src/index.js` → `Home.js` → `TopBar` + `Dashboard`.
- `Dashboard.js` — left: `WatchList` (always visible), right: routes for Summary, Holdings, etc.
- `GeneralContext.js` — React Context to open/close **Buy** modal and pass stock name.
- **Holdings page** — on mount, `useEffect` runs once, calls API, stores result in `useState`, renders table.
- **Buy flow** — hover stock → Buy → modal → POST order → close modal.

### 3. Backend (`Backend`)

- Reads `PORT` and `MONGO_URL` from `.env`.
- Connects MongoDB → seeds holdings if empty → starts Express.
- **Middleware:** `cors()`, `express.json()` (parse JSON body).
- **Routes:** 3 endpoints (see below).

---

## Database & API details

### MongoDB collections

| Collection | Model name | Sample fields |
|------------|------------|---------------|
| `holdings` | `holding` | name, qty, avg, price, net, day, isLoss |
| `orders` | `order` | name, qty, price, mode, createdAt |

### API endpoints (memorize these)

| Method | URL | Body | Response |
|--------|-----|------|----------|
| GET | `/allHoldings` | — | Array of all holdings |
| GET | `/allOrders` | — | Array of orders (newest first) |
| POST | `/newOrder` | `{ name, qty, price, mode }` | Created order, status 201 |

**Base URL:** `http://localhost:3002`

### Example POST body

```json
{
  "name": "INFY",
  "qty": 1,
  "price": 1555.45,
  "mode": "BUY"
}
```

---

## Environment variables (.env)

### `Backend/.env`

```env
PORT=3002
MONGO_URL=mongodb+srv://...   # your Atlas connection string
```

- **PORT** — which port Express listens on.
- **MONGO_URL** — connects to MongoDB Atlas (never commit to Git).

### `dashboard/.env`

```env
REACT_APP_API_URL=http://localhost:3002
```

- Tells React where the API is.
- Must start with `REACT_APP_` for Create React App.
- Restart dashboard after changing it.

**Interview answer:**  
“I use `.env` so ports and database URL are configurable without changing code. Sensitive data stays out of Git via `.gitignore`.”

---

## Challenges you faced & how you fixed them

Use these as **STAR stories** (Situation, Task, Action, Result).

### 1. Network Error / AxiosError on dashboard

- **Situation:** Holdings page showed red “Network Error”.
- **Cause:** Dashboard called wrong port OR backend not running OR no API routes.
- **Action:** Created Express routes, aligned `PORT=3002` in Backend and `REACT_APP_API_URL` in dashboard, added `.catch()` on Axios.
- **Result:** Holdings load from MongoDB successfully.

### 2. Wrong Mongoose schema

- **Situation:** Holdings in DB had only `_id`, no stock names.
- **Cause:** Schema typo (`name: "String"` instead of `name: String`).
- **Action:** Fixed schema, added re-seed logic on server start.
- **Result:** 13 valid holdings with names and prices.

### 3. Port conflict between apps

- **Situation:** frontend and dashboard both want port 3000.
- **Action:** Run dashboard on 3001, backend on 3002.
- **Result:** All three apps run together.

---

## What you learned as a fresher

Pick 4–5 for interviews:

1. How **frontend and backend communicate** using REST and JSON.
2. How to use **MongoDB Atlas** and **Mongoose** models.
3. **React hooks**: `useState`, `useEffect`, `useContext`.
4. Why **CORS** is needed for cross-origin requests.
5. How to debug with **browser Network tab** and API URLs in browser.
6. Project structure: **separation of concerns** (3 folders, 3 apps).
7. Using **environment variables** for config and secrets.

---

## Honest limitations (say this confidently)

Interviewers respect honesty.

- No real **authentication** (login/signup UI only).
- No **live market data** — prices are seed/mock data.
- **Orders page** does not list DB orders in UI yet (API exists).
- **Positions & watchlist** are static files, not in MongoDB.
- Not production-ready: no tests, no deployment in repo, no payment/trading logic.
- **Passport** packages installed but not implemented.

**Strong line:**  
“I know what’s mock vs dynamic. My next step would be auth, wiring Orders UI to `GET /allOrders`, and optional live price API.”

---

## Future improvements you can mention

1. JWT / session **login** and protected routes.
2. Display orders on **Orders** page from API.
3. **Positions** model + CRUD APIs.
4. Save **watchlist** per user in MongoDB.
5. **Sell** button wired to `POST /newOrder` with `mode: "SELL"`.
6. Deploy on **Render/Vercel** + MongoDB Atlas.
7. Write **unit tests** (Jest) and API tests.
8. **WebSocket** for live prices (advanced).

---

## Interview questions & sample answers

### A. Project overview

**Q1: Tell me about your project.**  
**A:** (Use [2-minute project explanation](#2-minute-project-explanation) above.)

**Q2: Why did you choose Zerodha Clone?**  
**A:** “I wanted a real-world domain (fintech/trading UI) that uses tables, charts, forms, and APIs — not just a todo app. It’s familiar in India and shows full-stack skills.”

**Q3: Is this a live trading app?**  
**A:** “No. It’s educational. It doesn’t connect to exchange APIs or real money. It demonstrates UI + REST API + database.”

**Q4: How many modules / parts does it have?**  
**A:** “Three: landing frontend, trading dashboard, and Backend API. Plus MongoDB as the database layer.”

**Q5: What is your role in this project?**  
**A:** “I built/integrated the full stack — React pages, dashboard API integration, Express routes, Mongoose models, MongoDB setup, and fixing bugs like CORS and port mismatch.”

---

### B. React (fresher level)

**Q6: What is React and why use it?**  
**A:** “React is a JavaScript library for building UI with reusable **components**. I used it because it’s component-based and widely used in industry.”

**Q7: What is JSX?**  
**A:** “JSX lets us write HTML-like syntax inside JavaScript. React converts it to JavaScript function calls.”

**Q8: What is useState? Where did you use it?**  
**A:** “`useState` stores data that can change in a component. In `Holdings.js` I use it for `allHoldings` — when API returns data, I call `setAllHoldings` and the table re-renders.”

**Q9: What is useEffect? Where did you use it?**  
**A:** “`useEffect` runs side effects after render. In `Holdings.js` I use it with `[]` dependency to call the API **once** when the page loads.”

**Q10: What is React Router?**  
**A:** “It maps URLs to components without reloading the page. Example: `/holdings` shows `Holdings` component.”

**Q11: What is React Context?**  
**A:** “It shares data between components without prop drilling. I use `GeneralContext` to open the Buy modal from the watchlist and pass the stock symbol.”

**Q12: Difference between props and state?**  
**A:** “**Props** come from parent (read-only). **State** is internal and can change with `setState`/`useState`.”

**Q13: What are components in your dashboard?**  
**A:** “Examples: `WatchList`, `Holdings`, `BuyActionWindow`, `Menu`, `Summary` — each handles one UI section.”

---

### C. Node.js & Express

**Q14: What is Node.js?**  
**A:** “Node runs JavaScript on the server. I use it for the Backend API instead of only browser JavaScript.”

**Q15: What is Express?**  
**A:** “Express is a minimal framework on Node to create routes, handle HTTP methods, and middleware.”

**Q16: What is middleware? Examples in your project?**  
**A:** “Functions that run before the route handler. I use `cors()` for cross-origin requests and `express.json()` to parse JSON request bodies.”

**Q17: What is REST API?**  
**A:** “REST uses HTTP methods on URLs. I use GET to fetch holdings/orders and POST to create an order. Data is exchanged as JSON.”

**Q18: Difference between GET and POST?**  
**A:** “GET reads data (no body needed). POST sends data to create something — like a new order in `req.body`.”

**Q19: What status codes did you use?**  
**A:** “200 for successful GET, 201 for created order, 500 for server errors.”

---

### D. MongoDB & Mongoose

**Q20: Why MongoDB instead of SQL?**  
**A:** “MongoDB stores flexible JSON-like documents. For holdings with varying fields it’s simple to start. SQL is also fine for fintech at scale — I chose MongoDB for learning MERN.”

**Q21: What is Mongoose?**  
**A:** “Mongoose is an ODM — it defines **schemas** and **models** to interact with MongoDB collections in Node.”

**Q22: What is a schema vs model?**  
**A:** “**Schema** defines structure (fields and types). **Model** is the class used to query the collection — e.g. `HoldingsModel.find()`.”

**Q23: What collections do you have?**  
**A:** “`holdings` and `orders` in database `Zerodha` (on Atlas).”

**Q24: How do you insert initial data?**  
**A:** “`holdingsSeed.js` has 13 stocks. On server start, if collection is empty, `insertMany` runs automatically.”

**Q25: What is MongoDB Atlas?**  
**A:** “Cloud-hosted MongoDB. I connect using connection string in `MONGO_URL` instead of installing MongoDB locally.”

---

### E. Axios, CORS, .env

**Q26: What is Axios?**  
**A:** “A library to make HTTP requests from React. I use `axios.get` for holdings and `axios.post` for new orders.”

**Q27: What is CORS? Why did you need it?**  
**A:** “Browsers block requests from one origin to another by default. Dashboard is `localhost:3001`, API is `localhost:3002` — different ports = different origins. `cors()` on Express allows the dashboard to call the API.”

**Q28: What is dotenv?**  
**A:** “Loads variables from `.env` into `process.env` so we don’t hardcode secrets or ports in code.”

**Q29: Why `REACT_APP_` prefix in dashboard .env?**  
**A:** “Create React App only exposes env variables that start with `REACT_APP_` to the browser for security.”

---

### F. General fresher / CS basics

**Q30: What is full-stack?**  
**A:** “Working on both client (React) and server (Node) plus database (MongoDB).”

**Q31: What is JSON?**  
**A:** “JavaScript Object Notation — text format to send data between frontend and backend.”

**Q32: What is npm?**  
**A:** “Node package manager — installs libraries like express, react, axios listed in `package.json`.”

**Q33: Difference between frontend and backend?**  
**A:** “Frontend runs in browser (UI). Backend runs on server (logic, database, security).”

**Q34: What is Git? Did you use it?**  
**A:** “Git is version control. I use it to track changes, commit code, and push to GitHub.” (Say truthfully if you use it.)

**Q35: How do you test your project?**  
**A:** “Run all three apps, open holdings page, check Network tab in DevTools, hit API URLs in browser, verify data in MongoDB Atlas.”

---

## Coding / technical round questions

**Q: Write API route to get all holdings.**  
```javascript
app.get("/allHoldings", async (req, res) => {
  const data = await HoldingsModel.find({});
  res.json(data);
});
```

**Q: How to fetch data in React on page load?**  
```javascript
useEffect(() => {
  axios.get(`${API_BASE_URL}/allHoldings`)
    .then(res => setAllHoldings(res.data))
    .catch(err => console.error(err));
}, []);
```

**Q: How to save a new order?**  
```javascript
await OrdersModel.create({ name, qty, price, mode });
```

**Q: Find P&L for one holding (logic in your table)?**  
`currentValue = price * qty`  
`profit = currentValue - avg * qty`

---

## Behavioral questions about this project

**Q: What was the hardest part?**  
**A:** “Debugging the Network Error — I learned to check if backend is running, correct port, CORS, and API route exists. Browser DevTools Network tab helped a lot.”

**Q: Did you work in a team?**  
**A:** (Answer honestly — solo or college group.)

**Q: If you had one more week?**  
**A:** “Add login, show orders on Orders page, and deploy the project live with a README demo link.”

**Q: Why should we hire you based on this project?**  
**A:** “It shows I can learn full-stack independently, fix real bugs, document my work, and I’m honest about what’s complete vs planned.”

---

## Questions you can ask the interviewer

1. What stack does your team use for frontend and backend?
2. Will freshers work on API integration or UI first?
3. How do you do code reviews and testing?
4. Is there mentorship for MongoDB/React best practices?

---

## Quick revision cheat sheet

| Topic | One line |
|-------|----------|
| Project | Zerodha-style: landing + dashboard + API + MongoDB |
| Ports | frontend 3000, dashboard 3001, backend 3002 |
| Dynamic data | Holdings (GET), Orders save (POST) |
| Static data | Watchlist, positions, summary |
| Main files | `server.js`, `Holdings.js`, `BuyActionWindow.js` |
| DB | MongoDB Atlas, collections: holdings, orders |
| APIs | GET `/allHoldings`, GET `/allOrders`, POST `/newOrder` |
| Tools | React, Express, Mongoose, Axios, CORS, dotenv |
| Not implemented | Auth, live prices, orders list UI |
| Bug you fixed | Port mismatch + CORS + schema + Axios catch |

---

## Before interview — checklist

- [ ] Run backend → see “MONGODB CONNECTED” and port 3002
- [ ] Open http://localhost:3001/holdings — table loads
- [ ] Open http://localhost:3002/allHoldings — JSON in browser
- [ ] Place one Buy order → check http://localhost:3002/allOrders
- [ ] Open MongoDB Atlas → see `holdings` and `orders` collections
- [ ] Practice 30-second pitch out loud
- [ ] Draw architecture on paper once

---

**Good luck with your interviews. Know what you built, what you didn’t build yet, and be honest — that matters more than pretending everything is production-ready.**
