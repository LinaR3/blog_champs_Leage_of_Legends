import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const ALL_TAGS = ['Damage', 'SpellDamage', 'Armor', 'MagicResist', 'Health', 'Mana', 'AttackSpeed', 'CriticalStrike', 'LifeSteal', 'Lane'];

export default function ItemsGrid() {
  const { itemList, itemVersion, itemsLoading, isFavorite, toggleFavorite } = useOutletContext();

  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState(null);

  const filtered = itemList.filter(item => {
    const matchName = item.name.toLowerCase().includes(search.toLowerCase());
    const matchTag = !activeTag || item.tags.includes(activeTag);
    return matchName && matchTag;
  });

  const cleanDesc = (html) => html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

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
              className="group relative p-3 transition-all cursor-default"
              style={{ background: 'rgba(15,19,32,0.8)', border: '1px solid rgba(30,58,110,0.4)' }}
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

              <div
                className="absolute left-full top-0 ml-2 w-48 p-3 z-20 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity"
                style={{ background: '#0F1320', border: '1px solid rgba(200,80,176,0.3)', boxShadow: '0 10px 40px rgba(0,0,0,0.8)' }}
              >
                <p className="text-xs font-bold text-[#E8F0FF] mb-1" style={{ fontFamily: 'Rajdhani, sans-serif' }}>{item.name}</p>
                {item.plaintext && (
                  <p className="text-[10px] text-[#C850B0] mb-2" style={{ fontFamily: 'Rajdhani, sans-serif' }}>{item.plaintext}</p>
                )}
                <p className="text-[10px] text-[#6B8EB8] leading-relaxed" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                  {cleanDesc(item.description).slice(0, 120)}...
                </p>
              </div>

              <button
                onClick={() => toggleFavorite({ id: item.id, name: item.name, type: 'item', image: `https://ddragon.leagueoflegends.com/cdn/${itemVersion}/img/item/${item.image.full}` })}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <svg className="w-3 h-3" fill={fav ? '#C850B0' : 'none'} stroke={fav ? '#C850B0' : '#6B8EB8'} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}