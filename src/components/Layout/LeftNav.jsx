const links = [
  { id: 'champions', label: 'Campeones', hoverColor: '#00D4FF' },
  { id: 'items',     label: 'Ítems',     hoverColor: '#C850B0' },
  { id: 'maps',      label: 'Mapas',     hoverColor: '#A8C4E0' },
];

export default function LeftNav({ active, onNavigate, favCount }) {
  return (
    <>
      <button
        onClick={() => onNavigate('home')}
        className="fixed top-7 left-5 z-50 text-left group"
        style={{ background: 'none', border: 'none', padding: 0 }}
      >
        <span className="block tracking-[0.3em] mb-1" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', color: '#3D5A80' }}>
          blog //
        </span>
        <span className="block leading-none transition-all duration-300 group-hover:tracking-wider" style={{ fontFamily: 'Bungee, cursive', fontSize: '1.35rem', color: '#00D4FF', textShadow: '0 0 18px rgba(0,212,255,0.45)' }}>
          CHAMPS
        </span>
        <span className="block leading-none transition-all duration-300 group-hover:tracking-wider" style={{ fontFamily: 'Bungee, cursive', fontSize: '1.35rem', color: '#C850B0', textShadow: '0 0 18px rgba(200,80,176,0.4)', marginLeft: '6px' }}>
          _LOL
        </span>
      </button>

      {/* Atajos rotados 90°, sin caja ni fondo */}
      <div
        className="fixed left-0 z-40 flex flex-col"
        style={{ top: '11rem', bottom: '5rem', pointerEvents: 'none' }}
      >
        {links.map((link) => {
          const isActive = active === link.id;
          return (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                pointerEvents: 'auto',
                position: 'absolute',
                left: '18px',
                top: link.id === 'champions' ? '0%' : link.id === 'items' ? '38%' : '76%',
                transform: 'rotate(-90deg)',
                transformOrigin: 'left top',
                whiteSpace: 'nowrap',
              }}
            >
              <span
                style={{
                  fontFamily: 'Bungee, cursive',
                  fontSize: isActive ? '1rem' : '0.8rem',
                  color: isActive ? link.hoverColor : '#1E3A6E',
                  textShadow: isActive
                    ? `0 0 20px ${link.hoverColor}70, 0 0 40px ${link.hoverColor}30`
                    : 'none',
                  letterSpacing: '0.15em',
                  transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
                }}
              >
                {link.label.toUpperCase()}
              </span>
            </button>
          );
        })}
      </div>

      <button
        onClick={() => onNavigate('favorites')}
        className="fixed bottom-8 left-8 z-50 flex items-center gap-2 group"
        style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
      >
        <svg
          className="w-3 h-3 transition-colors duration-300"
          fill={active === 'favorites' ? '#C850B0' : 'none'}
          stroke={active === 'favorites' ? '#C850B0' : '#1E3A6E'}
          viewBox="0 0 24 24"
          style={{ flexShrink: 0 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        <span
          className="text-[10px] tracking-[0.25em] transition-colors duration-300"
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            color: active === 'favorites' ? '#C850B0' : '#1E3A6E',
            textShadow: active === 'favorites' ? '0 0 16px #C850B060' : 'none',
          }}
        >
          FAV{favCount > 0 ? ` · ${favCount}` : ''}
        </span>
      </button>

      <div className="fixed bottom-8 right-8 z-50 flex items-center gap-1.5" style={{ pointerEvents: 'none' }}>
        <div className="w-1 h-1 rounded-full animate-pulse-glow" style={{ background: '#00D4FF' }} />
        <span className="text-[9px] tracking-[0.2em]" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#1E3A6E' }}>
          DATA DRAGON
        </span>
      </div>
    </>
  );
}