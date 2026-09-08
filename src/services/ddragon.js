const BASE_URL = "https://ddragon.leagueoflegends.com/cdn";

// Versión más reciente de la API
export async function getLatestVersion() {
  const response = await fetch("https://ddragon.leagueoflegends.com/api/versions.json");
  const versions = await response.json();
  return versions[0]; // Retorna la versión más reciente, ej: "14.x.x"
}

// Obtener todos los campeones
export async function getChampions() {
  const version = await getLatestVersion();
  const response = await fetch(`${BASE_URL}/${version}/data/es_ES/champion.json`);
  const data = await response.json();
  return Object.values(data.data);
}

// Obtener detalles de un campeón específico
export async function getChampionDetail(championId) {
  const version = await getLatestVersion();
  const response = await fetch(`${BASE_URL}/${version}/data/es_ES/champion/${championId}.json`);
  const data = await response.json();
  return data.data[championId];
}

// Obtener todos los ítems
export async function getItems() {
  const version = await getLatestVersion();
  const response = await fetch(`${BASE_URL}/${version}/data/es_ES/item.json`);
  const data = await response.json();
  return data.data;
}