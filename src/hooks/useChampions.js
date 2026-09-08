const BASE_URL = "https://ddragon.leagueoflegends.com/cdn";

export async function getLatestVersion() {
  const response = await fetch("https://ddragon.leagueoflegends.com/api/versions.json");
  const versions = await response.json();
  return versions[0];
}

export async function getChampions() {
  const version = await getLatestVersion();
  const response = await fetch(`${BASE_URL}/${version}/data/es_ES/champion.json`);
  const data = await response.json();
  return Object.values(data.data);
}

export async function getChampionDetail(championId) {
  const version = await getLatestVersion();
  const response = await fetch(`${BASE_URL}/${version}/data/es_ES/champion/${championId}.json`);
  const data = await response.json();
  return data.data[championId];
}

export async function getItems() {
  const version = await getLatestVersion();
  const response = await fetch(`${BASE_URL}/${version}/data/es_ES/item.json`);
  const data = await response.json();
  return data.data;
}