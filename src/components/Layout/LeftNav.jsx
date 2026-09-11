const links = [
  { id: 'champions', label: 'Campeones', color: '#1E3A6E', hoverColor: '#00D4FF' },
  { id: 'items', label: 'Ítems', color: '#1E3A6E', hoverColor: '#C850B0' },
  { id: 'maps', label: 'Mapas', color: '#1E3A6E', hoverColor: '#A8C4E0' },
];

export default function LeftNav({ active, onNavigate, favCount }) {
  return (
    <>
      <nav
        className="fixed left-0 top-0 h-full z-40 flex flex-col items-start justify-center"
        style={{ pointerEvents: 'none' }}
      >
        <div
          className="fixed left-0 top-0 h-full"
          style={{
            width: '140px',
            background: 'linear-gradient(to right, rgba(10,11,20,0.85) 0%, rgba(10,11,20,0.4) 55%, transparent 100%)',
            pointerEvents: 'none',
            zIndex: -1,
          }}
        />

        <div className="flex flex-col gap-6" style={{ pointerEvents: 'auto', paddingLeft: '20px' }}>
          {links.map((link) => {
            const isActive = active === link.id;
            return (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className="text-left"
                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
              >
                <span
                  style={{
                    fontFamily: 'Bungee, cursive',
                    fontSize: isActive ? '0.85rem' : '0.68rem',
                    color: isActive ? link.hoverColor : link.color,
                    textShadow: isActive
                      ? `0 0 20px ${link.hoverColor}70, 0 0 40px ${link.hoverColor}30`
                      : 'none',
                    letterSpacing: '0.04em',
                    transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
                    display: 'block',
                    transform: isActive ? 'translateX(6px)' : 'translateX(0)',
                  }}
                >
                  {link.label.toUpperCase()}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

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