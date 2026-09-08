import { useState, useEffect } from "react";
import { getChampions, getLatestVersion } from "../services/ddragon.js"; // 

export function useChampions() {
  const [champions, setChampions] = useState({}); //
  const [list, setList] = useState([]); // Arreglo para mapear en la grilla
  const [version, setVersion] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const v = await getLatestVersion();
        setVersion(v);

        const champsArray = await getChampions();
        setList(champsArray);

        // Convertir el array a un diccionario (objeto) para búsquedas rápidas
        const champsObj = champsArray.reduce((acc, champ) => {
          acc[champ.id] = champ;
          return acc;
        }, {});
        setChampions(champsObj);

      } catch (error) {
        console.error("Error al cargar campeones:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { champions, list, version, loading };
}