import { useEffect } from 'react';
import rigoImageURL from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { getLatestVersion, getChampions, getItems } from '../services/ddragon';

export const Home = () => {
    const {store, dispatch} = useGlobalReducer();

    useEffect(() => {
        window.lolApi = {
            getLatestVersion,
            getChampions,
            getItems
        };
    }, []);

    return (
        <div className="text-center mt-5">
            <h1>Blog</h1>
            <h1>CHAMPS_LOL</h1>
            <p>
                <img src={rigoImageURL} />
            </p>
        </div>
    );
};