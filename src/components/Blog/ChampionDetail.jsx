import { useState, useEffect } from 'react';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import { getChampionDetail } from '../../services/ddragon';

export default function ChampionDetail() {
  const { id: championId } = useParams();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useOutletContext();

  const [champion, setChampion] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetail() {
      try {
        setLoading(true);
        const data = await getChampionDetail(championId);
        setChampion(data);
      } catch (error) {
        console.error("Error al cargar detalle del campeón:", error);
      } finally {
        setLoading(false);
      }
    }
    if (championId) fetchDetail();
  }, [championId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-8 h-8 border-2 border-[#00D4FF] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!champion) return null;

  const favorite = isFavorite(champion.id);

  const handleToggleFav = () => {
    toggleFavorite({
      id: champion.id,
      name: champion.name,
      type: 'champion',
      image: `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg`,
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-6">
      <button
        onClick={() => navigate('/champions')}
        className="mb-6 flex items-center gap-2 text-xs text-[#00D4FF] hover:text-[#E8F0FF] transition-colors"
        style={{ fontFamily: 'JetBrains Mono, monospace' }}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        VOLVER A CAMPEONES
      </button>

      <div className="relative h-96 overflow-hidden border border-[#1E3A6E] mb-8 bg-[#0F1320]">
        <img
          src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg`}
          alt={champion.name}
          className="w-full h-full object-cover object-top"
          style={{ filter: 'brightness(0.8) saturate(1.2)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B14] via-transparent to-transparent" />

        <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
          <div>
            <p className="text-xs text-[#00D4FF] tracking-widest mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              {champion.title.toUpperCase()}
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-[#E8F0FF]" style={{ fontFamily: 'Bungee, cursive' }}>
              {champion.name}
            </h1>
          </div>

          <button
            onClick={handleToggleFav}
            className="px-4 py-2 bg-[#0F1320]/80 border border-[#C850B0] flex items-center gap-2 hover:bg-[#C850B0]/20 transition-colors"
          >
            <svg className="w-5 h-5" fill={favorite ? '#C850B0' : 'none'} stroke="#C850B0" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="text-xs text-[#E8F0FF]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              {favorite ? 'EN FAVORITOS' : 'FAVORITO'}
            </span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          <h3 className="text-lg font-bold text-[#00D4FF]" style={{ fontFamily: 'Bungee, cursive' }}>HISTORIA</h3>
          <p className="text-[#6B8EB8] text-sm leading-relaxed" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
            {champion.lore}
          </p>
        </div>

        <div className="p-6 bg-[#0F1320] border border-[#1E3A6E] space-y-4">
          <h3 className="text-sm font-bold text-[#E8F0FF]" style={{ fontFamily: 'Bungee, cursive' }}>ESTADÍSTICAS BASE</h3>
          <div className="space-y-2 text-xs" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            <div className="flex justify-between border-b border-[#1E3A6E]/40 pb-2">
              <span className="text-[#3D5A80]">VIDA (HP)</span>
              <span className="text-[#E8F0FF]">{champion.stats.hp}</span>
            </div>
            <div className="flex justify-between border-b border-[#1E3A6E]/40 pb-2">
              <span className="text-[#3D5A80]">DAÑO DE ATAQUE</span>
              <span className="text-[#E8F0FF]">{champion.stats.attackdamage}</span>
            </div>
            <div className="flex justify-between border-b border-[#1E3A6E]/40 pb-2">
              <span className="text-[#3D5A80]">ARMADURA</span>
              <span className="text-[#E8F0FF]">{champion.stats.armor}</span>
            </div>
            <div className="flex justify-between pb-2">
              <span className="text-[#3D5A80]">VEL. DE ATAQUE</span>
              <span className="text-[#E8F0FF]">{champion.stats.attackspeed}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}