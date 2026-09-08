import { createBrowserRouter } from "react-router-dom";

// Importación del Layout principal
import { Layout } from "./pages/Layout";

import HeroSection from "./components/Hero/HeroSection";
import ChampionsGrid from "./components/blog/ChampionsGrid";
import ChampionDetail from "./components/blog/ChampionDetail";
import ItemsGrid from "./components/blog/ItemsGrid";
import MapsView from "./components/blog/MapsView";
import FavoritesView from "./components/blog/FavoritesView";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>, 
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