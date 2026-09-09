import { useMaps } from '../../hooks/useMaps';

const MAP_IMAGES = {
  '11': 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&h=450&fit=crop&auto=format',
  '12': 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&h=450&fit=crop&auto=format',
  '10': 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&h=450&fit=crop&auto=format',
  '14': 'https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=450&fit=crop&auto=format',
  '21': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=450&fit=crop&auto=format',
};

const MAP_DESCRIPTIONS = {
  '11': 'La Grieta del Invocador es el campo de batalla principal de League of Legends. Tres carriles, la selva y el objetivo más codiciado de Runaterra: el Barón Nashor.',
  '12': 'El Abismo de los Lamentos es el único campo de batalla de una sola carrilera. Aquí las peleas son constantes y los enfrentamientos, inevitables.',
  '10': 'El Torneo de las Sombras — un mapa de 3v3 ubicado en las Islas de la Sombra. Táctico y oscuro.',
  '14': 'Un campo de práctica donde los invocadores dominan el arte del combate sin interferencias.',
  '21': 'El Reino de los Ases es el hogar del juego rotativo más caótico del multiverso.',
};

export default function MapsView() {
  const { maps, loading } = useMaps();

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-[#A8C4E0] border-t-transparent rounded-full animate-spin" />
        <p className="text-[10px] text-[#3D5A80] tracking-widest" style={{ fontFamily: 'JetBrains Mono, monospace' }}>CARGANDO MAPAS...</p>
      </div>
    </div>
  );

  return (
    <div>
      <div className="mb-8">
        <p className="text-[10px] tracking-[0.3em] mb-2" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#A8C4E0' }}>
          — TERRITORIOS
        </p>
        <h2 className="text-4xl mb-2" style={{ fontFamily: 'Bungee, cursive', color: '#E8F0FF' }}>
          MAPAS
        </h2>
        <div className="h-px" style={{ background: 'linear-gradient(to right, #A8C4E033, transparent)' }} />
      </div>

      <div className="space-y-6">
        {maps.map((map, i) => (
          <article
            key={map.MapId}
            className="group relative overflow-hidden"
            style={{ border: '1px solid rgba(30,58,110,0.5)' }}
          >
            <div className="relative h-52 overflow-hidden">
              <img
                src={MAP_IMAGES[map.MapId] ?? `https://images.unsplash.com/photo-1519638399535-1b036603ac77?w=800&h=450&fit=crop&auto=format`}
                alt={map.MapName}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ filter: 'brightness(0.5) saturate(0.8)' }}
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to right, rgba(10,11,20,0.9) 0%, rgba(10,11,20,0.4) 100%)' }}
              />

              <div className="absolute top-4 right-4">
                <span className="tag text-[#A8C4E0] border-[#A8C4E0]">MAP_{map.MapId}</span>
              </div>

              <div className="absolute inset-0 flex flex-col justify-center px-8">
                <p className="text-[10px] tracking-[0.3em] mb-2" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#A8C4E0', opacity: 0.8 }}>
                  TERRITORIO #{String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="text-2xl md:text-3xl mb-3" style={{ fontFamily: 'Bungee, cursive', color: '#E8F0FF' }}>
                  {map.MapName}
                </h3>
                <p className="text-sm max-w-lg leading-relaxed" style={{ fontFamily: 'Rajdhani, sans-serif', color: '#6B8EB8' }}>
                  {MAP_DESCRIPTIONS[map.MapId] ?? map.Notes ?? 'Un campo de batalla en el universo de League of Legends.'}
                </p>
              </div>
            </div>

            <div
              className="h-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ background: 'linear-gradient(to right, #A8C4E0, #00D4FF, transparent)' }}
            />
          </article>
        ))}
      </div>
    </div>
  );
}