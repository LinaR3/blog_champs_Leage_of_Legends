import { createBrowserRouter } from "react-router-dom";

// Layout principal que contiene el menú lateral, header y <Outlet />
import App from "./App.js";

// Vistas individuales (Asegúrate de que las rutas coincidan con tu estructura de carpetas)
import HeroSection from "./components/Hero/HeroSection.js";
import ChampionsGrid from "./components/Blog/ChampionsGrid.js";
import ChampionDetail from "./components/Blog/ChampionDetail.js";
import ItemsGrid from "./components/Blog/ItemsGrid.js";
import MapsView from "./components/Blog/MapsView.js";
import FavoritesView from "./components/Blog/FavoritesView.js";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />, // App actúa como el contenedor fijo[cite: 1]
        children: [
            {
                path: "/",
                element: <HeroSection /> // Vista inicial[cite: 1]
            },
            {
                path: "/champions",
                element: <ChampionsGrid /> // Grilla de todos los campeones[cite: 1]
            },
            {
                path: "/champions/:id",
                element: <ChampionDetail /> // Detalle dinámico del campeón por ID[cite: 1]
            },
            {
                path: "/items",
                element: <ItemsGrid /> // Grilla de ítems[cite: 1]
            },
            {
                path: "/maps",
                element: <MapsView /> // Vista de mapas[cite: 1]
            },
            {
                path: "/favorites",
                element: <FavoritesView /> // Vista de favoritos[cite: 1]
            }
        ]
    }
]);