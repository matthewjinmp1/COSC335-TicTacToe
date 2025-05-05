# COSC335 Tiny Towns

A full-stack web implementation of the Tiny Towns board game (originally scaffolded as a Tic-Tac-Toe assignment for COSC335). Players build a 4×4 town by selecting and placing resources, constructing buildings, and earning points. The app features user authentication, resource drawing/shuffling, achievement tracking, and persistent game saves to Firebase Firestore.

---

## Table of Contents

- [Features](#features)  
- [Architecture & Tech Stack](#architecture--tech-stack)  
- [Getting Started](#getting-started)  
  - [Prerequisites](#prerequisites)  
  - [Local Development (Vite + Express)](#local-development-vite--express)  
  - [Docker Compose](#docker-compose)  
- [Testing](#testing)  
- [Project Structure](#project-structure)  
- [Environment Variables & Firebase Setup](#environment-variables--firebase-setup)  
- [License](#license)  

---

## Features

- **4×4 town grid** with five resource types (Brick, Glass, Stone, Wheat, Wood)  
- **Eight building cards** (Cottage, Chapel, Farm, Tavern, Well, Theater, Factory, Monument) each with unique build rules and scoring  
- **Resource draw & shuffle** animation (cup-shuffle style)  
- **Achievement system** (e.g. "Master Builder", "Perfect Town")  
- **User authentication** (Email/Password & Google via Firebase Auth)  
- **Persistent game saves** in Firestore with timestamp, board state, and winner  
- **Express backend** using Firebase Admin SDK to secure Firestore writes  
- **Responsive UI** built in React (Vite) + Tailwind + vanilla JS game logic  
- **Docker Compose** setup for easy dev environment  

---

## Architecture & Tech Stack

| Layer         | Technology                              |
|--------------:|-----------------------------------------|
| **Front-end** | React (Vite), Tailwind CSS, plain CSS   |
| **Game Logic**| Vanilla JS (DOM API)                    |
| **Back-end**  | Node.js, Express, Firebase Admin SDK    |
| **Database**  | Google Firestore                        |
| **Auth**      | Firebase Auth (compat)                  |
| **Testing**   | Vitest, Testing Library DOM & React     |
| **Dev Ops**   | Docker, Docker Compose, Vite Dev Server |

---

## Getting Started

### Prerequisites

- **Node.js** (LTS 18.x+)  
- **npm** or **yarn**  
- **Docker & Docker Compose** (optional, for containerized dev)  
- A **Firebase** project with:
  - **Service account key** (`app/serviceAccountKey.json`)
  - **Web config** (`app/firebaseConfig.json`)

---

### Local Development (Vite + Express)

1. **Clone** the repo  
   ```bash
   git clone https://github.com/matthewjinmp1/COSC335-TicTacToe.git
   cd COSC335-TicTacToe/app
   ```

2. **Install** dependencies  
   ```bash
   npm install
   ```

3. **Set up** environment  
   - Copy and edit `.env` in `app/` (see [Environment Variables](#environment-variables--firebase-setup))  
   - Place your `serviceAccountKey.json` and `firebaseConfig.json` alongside `server.js` and `index.html`

4. **Run** front-end and back-end  
   ```bash
   # In one terminal:  
   npm run dev        # starts Vite on http://localhost:5173  

   # In another terminal:
   npm start          # starts Express on http://localhost:5000  
   ```

5. **Open** `http://localhost:5173` in your browser.

---

### Docker Compose

With Docker and the Compose file at the repo root:

```bash
docker-compose up --build
```

- **Front-end** → http://localhost:5173  
- **API**       → http://localhost:3000  

---

## Testing

From within `app/`:

```bash
npm test           # run all logic & UI tests in headless mode
npm run test:ui    # open Vitest UI to browse tests interactively
```

---

## Project Structure

```
COSC335-TicTacToe/
├── app/
│   ├── src/
│   │   ├── main.jsx        # React components & layout
│   │   ├── main.js         # Game logic, DOM handlers, API calls
│   │   └── functions.js    # scoring & achievement helpers
│   ├── tests/              # Vitest unit & UI tests
│   ├── server.js           # Express + Firebase Admin backend
│   ├── index.html          # Entry point, Firebase Auth init
│   ├── main.css            # global & Tailwind overrides
│   ├── package.json        # scripts & deps
│   └── vite.config.js      # Vite config for JSX & static assets
├── compose.yaml            # dev Docker Compose setup
├── node.js                 # default PORT configuration
└── .gitignore
```

---

## Environment Variables & Firebase Setup

1. **`app/.env`**  
   ```dotenv
   VITE_BACKEND_PORT=5000
   ```
2. **`app/serviceAccountKey.json`**  
   - Generated from your Firebase project → Service Accounts → “Generate new private key.”
3. **`app/firebaseConfig.json`**  
   ```json
   {
     "apiKey": "...",
     "authDomain": "...",
     "projectId": "...",
     // etc.
   }
   ```

---

## License

This project is released under the **MIT License**.  