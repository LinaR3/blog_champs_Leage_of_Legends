# ⚔️ Blog Champs_LoL

Un blog interactivo para explorar el universo de **League of Legends** — campeones, ítems y mapas — construido en React y alimentado por la **Data Dragon API** de Riot Games.

![Vite](https://img.shields.io/badge/Vite-4.4.8-646CFF?logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-6-CA4245?logo=reactrouter&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)

## ✨ Funcionalidades

- **Explorar campeones**: grid con búsqueda por nombre y filtro por rol (Luchador, Mago, Asesino, Tanque, Soporte, Tirador)
- **Detalle de campeón**: splash art, lore y estadísticas base
- **Explorar ítems**: grid con búsqueda y filtro por categoría, con tooltip de descripción
- **Mapas de Runaterra**: los 6 campos de batalla del juego, con descripción
- **Favoritos**: marca campeones e ítems, persistidos en `localStorage`, accesibles desde una vista dedicada
- **Buscador global**: en el header, con resultados en vivo mientras escribes
- **Diseño "chromeless"**: navegación minimalista sin bordes ni contenedores rígidos, con efecto glow inspirado en la estética de Runaterra

## 🛠️ Stack técnico

| Capa | Herramienta |
|---|---|
| Bundler | Vite |
| UI | React 18 + React Router 6 |
| Estilos | Tailwind CSS 3 |
| Datos | [Data Dragon API](https://developer.riotgames.com/docs/lol#data-dragon) (Riot Games) |
| Persistencia local | `localStorage` (favoritos) |

## 🚀 Cómo correrlo localmente

> 📦 Requiere Node.js 20 o superior.

```bash
# 1. Clona el repositorio
git clone https://github.com/LinaR3/blog_champs_Leage_of_Legends.git
cd blog_champs_Leage_of_Legends

# 2. Instala las dependencias
npm install

# 3. Corre el servidor de desarrollo
npm run start
```

Abre `http://localhost:3000` en tu navegador.

## 📁 Estructura del proyecto

```
src/
├── components/
│   ├── Blog/          # Vistas de campeones, ítems, mapas y favoritos
│   ├── Hero/           # Sección de portada
│   ├── Layout/         # Header, LeftNav, Footer
│   └── Search/         # Buscador global
├── hooks/               # useChampions, useItems, useFavorites, useMaps
├── pages/
│   └── Layout.jsx       # Layout raíz: hooks de datos + <Outlet>
├── services/
│   └── ddragon.js       # Puerta de entrada a la API de Riot
└── routes.jsx           # Definición de rutas con react-router-dom
```

### Arquitectura de datos

```
Riot Games API (Data Dragon)
        ↓ fetch
services/ddragon.js   ← único punto de acceso a la API
        ↓
hooks/ (useChampions, useItems, useFavorites)
        ↓
pages/Layout.jsx       ← centraliza los datos
   ↙                        ↘
Header / LeftNav          <Outlet context={{...}}>
(props directas)          (useOutletContext en cada página)
```

Las páginas de ruta (`ChampionsGrid`, `ChampionDetail`, `ItemsGrid`, `MapsView`, `FavoritesView`) no reciben datos por props — los consumen con `useOutletContext()`, ya que `Layout.jsx` es quien concentra la carga de datos y la comparte a través del router.

## 🌐 Despliegue

Recomendado con [Vercel](https://vercel.com):

```bash
npm i vercel -g
vercel login
vercel --prod
```

## 📄 Créditos

- Datos de campeones, ítems y splash arts: [Data Dragon](https://developer.riotgames.com/docs/lol#data-dragon), cortesía de Riot Games.
- Plantilla base: [4GeeksAcademy/react-hello-webapp](https://github.com/4GeeksAcademy/react-hello-webapp)
- League of Legends es una marca registrada de Riot Games, Inc. Este proyecto es un trabajo académico sin fines comerciales.