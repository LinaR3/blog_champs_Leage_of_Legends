import { useState, useEffect } from "react";
import { getItems, getLatestVersion } from "../services/ddragon.js"; // la ruta sea correcta

export function useItems() {
  const [list, setList] = useState([]);
  const [version, setVersion] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const v = await getLatestVersion();
        setVersion(v);

        const itemsObj = await getItems();
        
        // DDragon devuelve los ítems como un objeto donde las llaves son números (IDs).
        // Lo convertimos a un array agregándole su ID para poder mapearlo fácilmente.
        const itemsArray = Object.entries(itemsObj).map(([id, itemData]) => ({
          id,
          ...itemData
        }));
        
        setList(itemsArray);

      } catch (error) {
        console.error("Error al cargar ítems:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { list, version, loading };
}