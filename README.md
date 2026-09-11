# ⚔️ Blog Champs_LoL

An interactive blog for exploring the **League of Legends** universe — champions, items and maps — built with React and powered by Riot Games' **Data Dragon API**.

![Vite](https://img.shields.io/badge/Vite-4.4.8-646CFF?logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-6-CA4245?logo=reactrouter&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)

## ✨ Features

- **Browse champions**: grid with search by name and filter by role (Fighter, Mage, Assassin, Tank, Support, Marksman)
- **Champion detail**: splash art, lore and base stats
- **Browse items**: grid with search and category filter, with description tooltip
- **Maps of Runeterra**: the game's 6 battlegrounds, each with a description
- **Favorites**: bookmark champions and items, persisted in `localStorage`, accessible from a dedicated view
- **Global search**: in the header, with live results as you type
- **"Chromeless" design**: minimalist navigation with no borders or rigid containers, with a glow effect inspired by Runeterra's aesthetic

## 🛠️ Tech stack

| Layer | Tool |
|---|---|
| Bundler | Vite |
| UI | React 18 + React Router 6 |
| Styling | Tailwind CSS 3 |
| Data | [Data Dragon API](https://developer.riotgames.com/docs/lol#data-dragon) (Riot Games) |
| Local persistence | `localStorage` (favorites) |

## 🚀 Running it locally

> 📦 Requires Node.js 20 or higher.

```bash
# 1. Clone the repository
git clone https://github.com/LinaR3/blog_champs_Leage_of_Legends.git
cd blog_champs_Leage_of_Legends

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run start
```

Open `http://localhost:3000` in your browser.

## 📁 Project structure

```
src/
├── components/
│   ├── Blog/          # Champion, item, map and favorites views
│   ├── Hero/           # Landing/cover section
│   ├── Layout/         # Header, LeftNav, Footer
│   └── Search/         # Global search bar
├── hooks/               # useChampions, useItems, useFavorites, useMaps
├── pages/
│   └── Layout.jsx       # Root layout: data hooks + <Outlet>
├── services/
│   └── ddragon.js       # Single entry point to the Riot API
└── routes.jsx           # Route definitions with react-router-dom
```

### Data architecture

```
Riot Games API (Data Dragon)
        ↓ fetch
services/ddragon.js   ← single access point to the API
        ↓
hooks/ (useChampions, useItems, useFavorites)
        ↓
pages/Layout.jsx       ← centralizes the data
   ↙                        ↘
Header / LeftNav          <Outlet context={{...}}>
(direct props)            (useOutletContext in each page)
```

Route-level pages (`ChampionsGrid`, `ChampionDetail`, `ItemsGrid`, `MapsView`, `FavoritesView`) don't receive data through props — they consume it via `useOutletContext()`, since `Layout.jsx` is the single place responsible for loading data and sharing it through the router.

## 🌐 Deployment

Recommended with [Vercel](https://vercel.com):

```bash
npm i vercel -g
vercel login
vercel --prod
```

## 📄 Credits

- Champion, item and splash art data: [Data Dragon](https://developer.riotgames.com/docs/lol#data-dragon), courtesy of Riot Games.
- Base template: [4GeeksAcademy/react-hello-webapp](https://github.com/4GeeksAcademy/react-hello-webapp)
- League of Legends is a registered trademark of Riot Games, Inc. This project is an academic assignment with no commercial purpose.