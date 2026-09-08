import { createBrowserRouter } from "react-router-dom";

// Importación del Layout principal
import App from "./App";

import HeroSection from "./components/Hero/HeroSection";
import ChampionsGrid from "./components/Blog/ChampionsGrid";
import ChampionDetail from "./components/Blog/ChampionDetail";
import ItemsGrid from "./components/Blog/ItemsGrid";
import MapsView from "./components/Blog/MapsView";
import FavoritesView from "./components/Blog/FavoritesView";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />, 
        children: [
            {
                path: "/",
                element: <HeroSection /> // Vista principal al entrar al blog
            },
            {
                path: "/champions",
                element: <ChampionsGrid /> // Lista general de campeones
            },
            {
                path: "/champions/:id",
                element: <ChampionDetail /> // Detalle específico dinámico
            },
            {
                path: "/items",
                element: <ItemsGrid /> // Grilla de ítems
            },
            {
                path: "/maps",
                element: <MapsView /> // Territorios y mapas
            },
            {
                path: "/favorites",
                element: <FavoritesView /> // Lista de favoritos guardados
            }
        ]
    }
]);