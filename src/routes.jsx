import { createBrowserRouter } from "react-router-dom";

import { Layout } from "./pages/Layout";
import HeroSection from "./components/Hero/HeroSection";
import ChampionsGrid from "./components/Blog/ChampionsGrid";
import ChampionDetail from "./components/Blog/ChampionDetail";
import ItemsGrid from "./components/Blog/ItemsGrid";
import MapsView from "./components/Blog/MapsView";
import FavoritesView from "./components/Blog/FavoritesView";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <HeroSection />
            },
            {
                path: "/champions",
                element: <ChampionsGrid />
            },
            {
                path: "/champions/:id",
                element: <ChampionDetail />
            },
            {
                path: "/items",
                element: <ItemsGrid />
            },
            {
                path: "/maps",
                element: <MapsView />
            },
            {
                path: "/favorites",
                element: <FavoritesView />
            }
        ]
    }
]);