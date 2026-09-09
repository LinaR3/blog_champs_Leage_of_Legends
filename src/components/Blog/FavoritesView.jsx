import { useNavigate, useOutletContext } from 'react-router-dom';

export default function FavoritesView() {
  const { favorites, toggleFavorite } = useOutletContext();
  const navigate = useNavigate();

  const champs = favorites.filter(f => f.type === 'champion');
  const items = favorites.filter(f => f.type === 'item');

  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <svg className="w-12 h-12 text-[#1E3A6E] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        <p className="text-[#3D5A80] mb-2" style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '1.1rem' }}>
          Aún no tienes favoritos
        </p>
        <p className="text-[10px] text-[#1E3A6E] tracking-widest" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          GUARDA CAMPEONES E ÍTEMS
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <p className="text-[10px] tracking-[0.3em] mb-2" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#C850B0' }}>
          — MIS GUARDADOS
        </p>
        <h2 className="text-4xl mb-2 glow-pink" style={{ fontFamily: 'Bungee, cursive', color: '#E8F0FF' }}>
          FAVORITOS
        </h2>
        <div className="h-px" style={{ background: 'linear-gradient(to right, #C850B033, transparent)' }} />
      </div>

      {champs.length > 0 && (
        <section className="mb-10">
          <p className="text-[10px] tracking-[0.2em] mb-4 text-[#00D4FF]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            CAMPEONES ({champs.length})
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {champs.map(fav => (
              <div
                key={fav.id}
                className="group relative flex items-center gap-3 p-3 cursor-pointer transition-all"
                style={{ background: 'rgba(15,19,32,0.8)', border: '1px solid rgba(30,58,110,0.5)' }}
                onClick={() => navigate(`/champions/${fav.id}`)}
              >
                <div className="w-14 h-14 overflow-hidden flex-shrink-0" style={{ border: '1px solid rgba(0,212,255,0.2)' }}>
                  {fav.image && (
                    <img src={fav.image} alt={fav.name} className="w-full h-full object-cover object-top" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-[#E8F0FF] group-hover:text-[#00D4FF] transition-colors" style={{ fontFamily: 'Rajdhani, sans-serif' }}>{fav.name}</p>
                  <p className="text-[10px] text-[#3D5A80] tracking-wider" style={{ fontFamily: 'JetBrains Mono, monospace' }}>CAMPEÓN</p>
                </div>
                <button
                  onClick={e => { e.stopPropagation(); toggleFavorite(fav); }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-[#3D5A80] hover:text-[#C850B0]"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {items.length > 0 && (
        <section>
          <p className="text-[10px] tracking-[0.2em] mb-4 text-[#C850B0]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            ÍTEMS ({items.length})
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {items.map(fav => (
              <div
                key={fav.id}
                className="group flex items-center gap-3 p-3"
                style={{ background: 'rgba(15,19,32,0.8)', border: '1px solid rgba(30,58,110,0.5)' }}
              >
                {fav.image && (
                  <img src={fav.image} alt={fav.name} className="w-10 h-10 flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-[#E8F0FF] truncate" style={{ fontFamily: 'Rajdhani, sans-serif' }}>{fav.name}</p>
                  <p className="text-[10px] text-[#3D5A80] tracking-wider" style={{ fontFamily: 'JetBrains Mono, monospace' }}>ÍTEM</p>
                </div>
                <button
                  onClick={() => toggleFavorite(fav)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-[#3D5A80] hover:text-[#C850B0]"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}