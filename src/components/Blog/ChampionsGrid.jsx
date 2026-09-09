import { useState, useEffect, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import ChampionCard from './ChampionCard';

const ALL_TAGS = ['Fighter', 'Mage', 'Assassin', 'Tank', 'Support', 'Marksman'];
const tagLabels = {
  Fighter: 'Luchador',
  Mage: 'Mago',
  Assassin: 'Asesino',
  Tank: 'Tanque',
  Support: 'Soporte',
  Marksman: 'Tirador',
};

export default function ChampionsGrid() {
  const { champList, champsLoading, isFavorite, toggleFavorite } = useOutletContext();

  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState(null);
  const [visible, setVisible] = useState(24);
  const loaderRef = useRef(null);

  const filtered = champList.filter(c => {
    const matchName = c.name.toLowerCase().includes(search.toLowerCase());
    const matchTag = !activeTag || c.tags.includes(activeTag);
    return matchName && matchTag;
  });

  const shown = filtered.slice(0, visible);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => { if (entries[0].isIntersecting) setVisible(v => v + 12); },
      { threshold: 0.1 }
    );
    if (loaderRef.current) obs.observe(loaderRef.current);
    return () => obs.disconnect();
  }, []);

  if (champsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-[#00D4FF] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <p className="text-[10px] tracking-[0.3em] mb-2" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#00D4FF' }}>
          — PERSONAJES
        </p>
        <h2 className="text-4xl mb-2 glow-cyan" style={{ fontFamily: 'Bungee, cursive', color: '#E8F0FF' }}>
          CAMPEONES
        </h2>
        <div className="h-px" style={{ background: 'linear-gradient(to right, #00D4FF33, transparent)' }} />
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-[#3D5A80]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar campeón..."
            className="pl-8 pr-4 py-1.5 bg-[#0F1320] border border-[#1E3A6E] text-[#E8F0FF] placeholder-[#3D5A80] text-sm focus:outline-none focus:border-[#00D4FF] transition-colors"
            style={{ fontFamily: 'Rajdhani, sans-serif' }}
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          {ALL_TAGS.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className="tag transition-all"
              style={{
                color: activeTag === tag ? '#00D4FF' : '#3D5A80',
                borderColor: activeTag === tag ? '#00D4FF' : '#1E3A6E',
                background: activeTag === tag ? 'rgba(0,212,255,0.1)' : 'transparent',
              }}
            >
              {tagLabels[tag]}
            </button>
          ))}
        </div>
      </div>

      <p className="text-[10px] text-[#3D5A80] mb-4" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
        {filtered.length} CAMPEONES{activeTag ? ` — ${activeTag.toUpperCase()}` : ''}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {shown.map(champion => (
          <ChampionCard
            key={champion.id}
            champion={champion}
            isFavorite={isFavorite(champion.id)}
            onToggleFav={() => toggleFavorite({
              id: champion.id,
              name: champion.name,
              type: 'champion',
              image: `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg`,
            })}
          />
        ))}
      </div>

      {shown.length < filtered.length && (
        <div ref={loaderRef} className="flex justify-center py-10">
          <div className="w-6 h-6 border border-[#1E3A6E] border-t-[#00D4FF] rounded-full animate-spin" />
        </div>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-[#3D5A80]" style={{ fontFamily: 'Rajdhani, sans-serif' }}>No se encontraron campeones con esos filtros.</p>
        </div>
      )}
    </div>
  );
}