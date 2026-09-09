import SearchBar from '../Search/SearchBar';

export default function Header({ champions, items, version, favCount, onShowFavs, onSelect, onNavigate }) {
  const champList = Object.values(champions).map(c => ({
    id: c.id,
    name: c.name,
    type: 'champion',
    subtitle: c.title,
    image: c.image.full,
    version,
  }));

  const itemList = Object.entries(items).map(([id, item]) => ({
    id,
    name: item.name,
    type: 'item',
    subtitle: item.plaintext,
    image: item.image.full,
    version,
  }));

  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-14 flex items-center gap-4"
      style={{ paddingLeft: '2rem', paddingRight: '1.5rem', background: 'linear-gradient(to bottom, rgba(10,11,20,0.98) 0%, rgba(10,11,20,0.85) 100%)', borderBottom: '1px solid rgba(30,58,110,0.5)', backdropFilter: 'blur(12px)' }}>

      <button
        onClick={() => onNavigate ? onNavigate('home') : null}
        className="flex items-center gap-2 mr-4 group"
        style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
      >
        <span
          className="tracking-[0.25em]"
          style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: '#3D5A80' }}
        >
          blog //
        </span>
        <span className="flex items-baseline leading-none transition-all duration-300 group-hover:tracking-wide">
          <span style={{ fontFamily: 'Bungee, cursive', fontSize: '1.1rem', color: '#00D4FF', textShadow: '0 0 14px rgba(0,212,255,0.45)' }}>
            CHAMPS
          </span>
          <span style={{ fontFamily: 'Bungee, cursive', fontSize: '1.1rem', color: '#C850B0', textShadow: '0 0 14px rgba(200,80,176,0.4)', marginLeft: '3px' }}>
            _LOL
          </span>
        </span>
      </button>

      <div className="flex-1 max-w-sm">
        <SearchBar
          champions={champList}
          items={itemList}
          maps={[]}
          onSelect={(item) => onSelect(item.type, item.id)}
        />
      </div>

      <div className="flex-1" />

      {version && (
        <span className="hidden md:block text-[#3D5A80] text-xs font-['JetBrains_Mono']">v{version}</span>
      )}

      <button
        onClick={onShowFavs}
        className="relative flex items-center gap-2 px-3 py-1.5 border border-[#1E3A6E] text-[#A8C4E0] hover:border-[#C850B0] hover:text-[#C850B0] transition-all text-xs font-['Rajdhani'] font-semibold tracking-wider"
      >
        <svg className="w-4 h-4" fill={favCount > 0 ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        FAVORITOS
        {favCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#C850B0] text-white text-[10px] flex items-center justify-center font-bold">
            {favCount}
          </span>
        )}
      </button>
    </header>
  );
}