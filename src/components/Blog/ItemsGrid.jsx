import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const ALL_TAGS = ['Damage', 'SpellDamage', 'Armor', 'MagicResist', 'Health', 'Mana', 'AttackSpeed', 'CriticalStrike', 'LifeSteal', 'Lane'];

export default function ItemsGrid() {
  const { itemList, itemVersion, itemsLoading, isFavorite, toggleFavorite } = useOutletContext();

  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState(null);
  const [pulsingIds, setPulsingIds] = useState(new Set());
  const [selectedItem, setSelectedItem] = useState(null);

  const filtered = itemList.filter(item => {
    const matchName = item.name.toLowerCase().includes(search.toLowerCase());
    const matchTag = !activeTag || item.tags.includes(activeTag);
    return matchName && matchTag;
  });

  const cleanDesc = (html) => html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/[ \t]+/g, ' ')
    .trim();

  const handleToggle = (item) => {
    toggleFavorite({ id: item.id, name: item.name, type: 'item', image: `https://ddragon.leagueoflegends.com/cdn/${itemVersion}/img/item/${item.image.full}` });
    setPulsingIds(prev => new Set(prev).add(item.id));
    setTimeout(() => {
      setPulsingIds(prev => {
        const next = new Set(prev);
        next.delete(item.id);
        return next;
      });
    }, 320);
  };

  if (itemsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-[#C850B0] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <p className="text-[10px] tracking-[0.3em] mb-2" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#C850B0' }}>
          — EQUIPAMIENTO
        </p>
        <h2 className="text-4xl mb-2 glow-pink" style={{ fontFamily: 'Bungee, cursive', color: '#E8F0FF' }}>
          ÍTEMS
        </h2>
        <div className="h-px" style={{ background: 'linear-gradient(to right, #C850B033, transparent)' }} />
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-6">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Filtrar ítems..."
          className="px-3 py-1.5 bg-[#0F1320] border border-[#1E3A6E] text-[#E8F0FF] placeholder-[#3D5A80] text-sm focus:outline-none focus:border-[#C850B0] transition-colors"
          style={{ fontFamily: 'Rajdhani, sans-serif' }}
        />
        <div className="flex gap-2 flex-wrap">
          {ALL_TAGS.slice(0, 6).map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className="tag transition-all"
              style={{
                color: activeTag === tag ? '#C850B0' : '#3D5A80',
                borderColor: activeTag === tag ? '#C850B0' : '#1E3A6E',
                background: activeTag === tag ? 'rgba(200,80,176,0.1)' : 'transparent',
              }}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <p className="text-[10px] text-[#3D5A80] mb-4" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
        {filtered.length} ÍTEMS
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {filtered.map(item => {
          const fav = isFavorite(item.id);
          return (
            <div
              key={item.id}
              className="group relative p-3 transition-all cursor-pointer hover:scale-[1.03]"
              style={{ background: 'rgba(15,19,32,0.8)', border: '1px solid rgba(30,58,110,0.4)' }}
              onClick={() => setSelectedItem(item)}
            >
              <div className="relative w-12 h-12 mb-2 overflow-hidden" style={{ border: '1px solid rgba(200,80,176,0.2)' }}>
                <img
                  src={`https://ddragon.leagueoflegends.com/cdn/${itemVersion}/img/item/${item.image.full}`}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="text-xs font-semibold text-[#E8F0FF] leading-tight mb-1 line-clamp-2" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                {item.name}
              </p>

              <p className="text-[10px] text-[#C850B0]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                {item.gold.total}g
              </p>

              <button
                onClick={(e) => { e.stopPropagation(); handleToggle(item); }}
                className={`absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity ${pulsingIds.has(item.id) ? 'fav-pulse' : ''}`}
              >
                <svg className="w-3 h-3" fill={fav ? '#C850B0' : 'none'} stroke={fav ? '#C850B0' : '#6B8EB8'} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
          );
        })}
      </div>

      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ background: 'rgba(10,11,20,0.85)', backdropFilter: 'blur(4px)' }}
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative w-full max-w-md max-h-[85vh] overflow-y-auto p-6"
            style={{ background: '#0F1320', border: '1px solid rgba(200,80,176,0.4)', boxShadow: '0 20px 60px rgba(0,0,0,0.9)' }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 text-[#6B8EB8] hover:text-[#E8F0FF] transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>

            <div
              className="w-24 h-24 mx-auto mb-4 overflow-hidden"
              style={{ border: '2px solid rgba(200,80,176,0.4)' }}
            >
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/${itemVersion}/img/item/${selectedItem.image.full}`}
                alt={selectedItem.name}
                className="w-full h-full object-cover"
              />
            </div>

            <h3 className="text-xl font-bold text-center mb-1" style={{ fontFamily: 'Bungee, cursive', color: '#E8F0FF' }}>
              {selectedItem.name}
            </h3>

            <p className="text-sm text-center mb-4" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#C850B0' }}>
              {selectedItem.gold.total}g
            </p>

            {selectedItem.plaintext && (
              <p className="text-sm text-center mb-4 italic" style={{ fontFamily: 'Rajdhani, sans-serif', color: '#A8C4E0' }}>
                {selectedItem.plaintext}
              </p>
            )}

            <div className="h-px mb-4" style={{ background: 'linear-gradient(to right, transparent, #C850B033, transparent)' }} />

            <p
              className="text-sm leading-relaxed"
              style={{ fontFamily: 'Rajdhani, sans-serif', color: '#6B8EB8', whiteSpace: 'pre-line' }}
            >
              {cleanDesc(selectedItem.description)}
            </p>

            <button
              onClick={() => handleToggle(selectedItem)}
              className={`mt-6 w-full py-2.5 flex items-center justify-center gap-2 border transition-colors ${
                isFavorite(selectedItem.id)
                  ? 'border-[#C850B0] text-[#C850B0]'
                  : 'border-[#1E3A6E] text-[#A8C4E0] hover:border-[#C850B0] hover:text-[#C850B0]'
              } ${pulsingIds.has(selectedItem.id) ? 'fav-pulse' : ''}`}
            >
              <svg className="w-4 h-4" fill={isFavorite(selectedItem.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="text-xs tracking-wider" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}>
                {isFavorite(selectedItem.id) ? 'EN FAVORITOS' : 'AGREGAR A FAVORITOS'}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}