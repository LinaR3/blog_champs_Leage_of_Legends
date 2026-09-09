import { Link } from 'react-router-dom';

const tagColors = {
  Fighter: '#C850B0',
  Mage: '#00D4FF',
  Assassin: '#E8A0C8',
  Tank: '#3D5A80',
  Support: '#A8C4E0',
  Marksman: '#7DD4F0',
};

export default function ChampionCard({ champion, isFavorite, onToggleFav }) {
  return (
    <Link
      to={`/champions/${champion.id}`}
      className="champion-card group relative cursor-pointer overflow-hidden block"
      style={{ background: 'rgba(15,19,32,0.8)', border: '1px solid rgba(30,58,110,0.5)' }}
    >
      <div className="relative h-48 overflow-hidden bg-[#0F1320]">
        <img
          src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg`}
          alt={champion.name}
          className="card-img w-full h-full object-cover object-top transition-all duration-500 group-hover:scale-105"
          style={{ filter: 'brightness(0.85) saturate(1.2)' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, transparent 40%, rgba(15,19,32,0.9) 100%)' }}
        />

        <div className="absolute top-2 left-2 flex gap-1 flex-wrap">
          {champion.tags.slice(0, 2).map(tag => (
            <span
              key={tag}
              className="tag"
              style={{ color: tagColors[tag] ?? '#6B8EB8', borderColor: tagColors[tag] ?? '#6B8EB8' }}
            >
              {tag}
            </span>
          ))}
        </div>

        <button
          onClick={e => { e.preventDefault(); onToggleFav(); }}
          className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
          style={{ background: 'rgba(10,11,20,0.8)' }}
        >
          <svg
            className="w-4 h-4 transition-all"
            fill={isFavorite ? '#C850B0' : 'none'}
            stroke={isFavorite ? '#C850B0' : '#6B8EB8'}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      <div className="p-4">
        <p className="text-[10px] tracking-[0.2em] mb-1" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#3D5A80' }}>
          {champion.title.toUpperCase()}
        </p>
        <h3 className="text-lg leading-tight mb-2 group-hover:text-[#00D4FF] transition-colors" style={{ fontFamily: 'Bungee, cursive', color: '#E8F0FF' }}>
          {champion.name}
        </h3>
        <p className="text-sm leading-relaxed line-clamp-2" style={{ fontFamily: 'Rajdhani, sans-serif', color: '#6B8EB8', fontWeight: 400 }}>
          {champion.blurb}
        </p>

        <div className="mt-3 flex gap-3">
          <div>
            <p className="text-[9px] text-[#3D5A80]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>HP</p>
            <p className="text-xs text-[#A8C4E0]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>{Math.round(champion.stats.hp)}</p>
          </div>
          <div>
            <p className="text-[9px] text-[#3D5A80]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>AD</p>
            <p className="text-xs text-[#A8C4E0]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>{Math.round(champion.stats.attackdamage)}</p>
          </div>
          <div>
            <p className="text-[9px] text-[#3D5A80]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>MANA</p>
            <p className="text-xs text-[#A8C4E0]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>{Math.round(champion.stats.mp)}</p>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-[10px] text-[#00D4FF] tracking-widest" style={{ fontFamily: 'JetBrains Mono, monospace' }}>VER MÁS</span>
          <svg className="w-3 h-3 text-[#00D4FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ background: 'linear-gradient(to right, #00D4FF, #C850B0)' }}
      />
    </Link>
  );
}