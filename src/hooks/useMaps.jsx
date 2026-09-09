const STATIC_MAPS = [
  { MapId: '11', MapName: 'La Grieta del Invocador', Notes: 'El mapa principal de League of Legends, con tres carriles y la selva.' },
  { MapId: '12', MapName: 'El Abismo de los Lamentos', Notes: 'Mapa de una sola carrilera, el campo de batalla del ARAM.' },
  { MapId: '10', MapName: 'El Torneo de las Sombras', Notes: 'Campo de batalla de 3v3 ubicado en las Islas de la Sombra.' },
  { MapId: '21', MapName: 'Nexus Blitz', Notes: 'Modo de juego experimental con enfrentamientos rápidos y eventos caóticos.' },
  { MapId: '22', MapName: 'Convergencia', Notes: 'La arena táctica de Teamfight Tactics, donde el destino del reino se decide.' },
  { MapId: '30', MapName: 'Arena de los Campeones', Notes: 'El coliseo donde los campeones luchan en combates 2v2v2v2.' },
];

export function useMaps() {
  return { maps: STATIC_MAPS, loading: false, error: null };
}