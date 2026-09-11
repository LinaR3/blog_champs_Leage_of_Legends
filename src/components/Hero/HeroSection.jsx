import { useEffect, useRef, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';

const FEATURED = ['Jinx', 'Ekko', 'Vi', 'Jayce', 'Viktor', 'Caitlyn'];

export default function HeroSection() {
  const { champList } = useOutletContext();
  const navigate = useNavigate();

  const [scrollY, setScrollY] = useState(0);
  const [currentFeatured, setCurrentFeatured] = useState(0);
  const heroRef = useRef(null);

  const featured = champList
    .filter(c => FEATURED.includes(c.name))
    .slice(0, 6);

  const activeFeatured = featured[currentFeatured] ?? featured[0];

  useEffect(() => {
    const el = heroRef.current?.closest('.main-scroll');
    if (!el) return;
    const handler = () => setScrollY(el.scrollTop);
    el.addEventListener('scroll', handler, { passive: true });
    return () => el.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    if (featured.length === 0) return;
    const id = setInterval(() => {
      setCurrentFeatured(i => (i + 1) % featured.length);
    }, 4000);
    return () => clearInterval(id);
  }, [featured.length]);

  const opacity = Math.max(0, 1 - scrollY / 400);
  const translateY = scrollY * 0.3;

  return (
    <section ref={heroRef} className="relative h-screen flex flex-col overflow-hidden">
      {activeFeatured && (
        <div className="absolute inset-0 transition-opacity duration-1000" style={{ opacity: 0.18 }}>
          <img
            src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${activeFeatured.id}_0.jpg`}
            alt={activeFeatured.name}
            className="w-full h-full object-cover object-top"
            style={{ filter: 'saturate(1.4) blur(1px)' }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #0A0B14CC 0%, #0A0B14 100%)' }} />
        </div>
      )}

      <div
        className="absolute left-0 right-0 h-px z-10 pointer-events-none"
        style={{
          top: '30%',
          background: 'linear-gradient(to right, transparent, #00D4FF33, transparent)',
          transform: `translateY(${scrollY * 0.1}px)`,
        }}
      />

      <div
        className="relative z-10 flex flex-col items-center justify-center flex-1 px-8 text-center"
        style={{ opacity, transform: `translateY(${translateY}px)`, paddingTop: '4rem' }}
      >
        <p className="mb-6 tracking-[0.4em] text-[10px] hero-anim hero-anim-1" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#00D4FF', opacity: 0.8 }}>
          DATA DRAGON API — RIOT GAMES
        </p>

        <h1 className="text-[clamp(3rem,12vw,9rem)] leading-none mb-2 glow-cyan hero-anim hero-anim-2" style={{ fontFamily: 'Bungee, cursive', color: '#E8F0FF', letterSpacing: '-0.01em' }}>
          BLOG
        </h1>
        <h1 className="text-[clamp(2rem,8vw,6rem)] leading-none mb-4 glow-pink hero-anim hero-anim-3" style={{ fontFamily: 'Bungee, cursive', color: '#C850B0', letterSpacing: '0.05em' }}>
          CHAMPS_LOL
        </h1>

        <p className="max-w-md text-lg mb-10 leading-relaxed hero-anim hero-anim-4" style={{ fontFamily: 'Rajdhani, sans-serif', color: '#6B8EB8', fontWeight: 500 }}>
          Explora el universo de League of Legends — campeones, ítems y territorios de Runaterra
        </p>

        {featured.length > 0 && (
          <div className="flex items-center gap-3 mb-10">
            {featured.map((c, i) => (
              <button
                key={c.id}
                onClick={() => setCurrentFeatured(i)}
                className="relative transition-all duration-300"
                style={{ transform: i === currentFeatured ? 'scale(1.15)' : 'scale(1)' }}
              >
                <div
                  className="w-10 h-10 overflow-hidden"
                  style={{
                    border: `2px solid ${i === currentFeatured ? '#00D4FF' : 'rgba(30,58,110,0.6)'}`,
                    boxShadow: i === currentFeatured ? '0 0 15px rgba(0,212,255,0.4)' : 'none',
                  }}
                >
                  <img
                    src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${c.id}_0.jpg`}
                    alt={c.name}
                    className="w-full h-full object-cover object-top"
                    style={{ transform: 'scale(1.3) translateY(-10%)' }}
                  />
                </div>
              </button>
            ))}
          </div>
        )}

        {activeFeatured && (
          <p className="text-[10px] tracking-[0.3em] mb-10" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#3D5A80' }}>
            {activeFeatured.name.toUpperCase()} — {activeFeatured.title.toUpperCase()}
          </p>
        )}

        <button onClick={() => navigate('/champions')} className="group flex flex-col items-center gap-2 transition-all">
          <span className="text-sm tracking-[0.2em] text-[#6B8EB8] group-hover:text-[#00D4FF] transition-colors" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}>
            EXPLORAR CAMPEONES
          </span>
          <div className="flex flex-col items-center gap-1 animate-float">
            <div className="w-px h-6 bg-[#1E3A6E] group-hover:bg-[#00D4FF] transition-colors" />
            <svg className="w-4 h-4 text-[#3D5A80] group-hover:text-[#00D4FF] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, #0A0B14)' }} />

      <div className="absolute top-8 left-8 w-8 h-8 pointer-events-none" style={{ borderTop: '2px solid #00D4FF44', borderLeft: '2px solid #00D4FF44' }} />
      <div className="absolute top-8 right-8 w-8 h-8 pointer-events-none" style={{ borderTop: '2px solid #C850B044', borderRight: '2px solid #C850B044' }} />
      <div className="absolute bottom-8 left-8 w-8 h-8 pointer-events-none" style={{ borderBottom: '2px solid #C850B044', borderLeft: '2px solid #C850B044' }} />
      <div className="absolute bottom-8 right-8 w-8 h-8 pointer-events-none" style={{ borderBottom: '2px solid #00D4FF44', borderRight: '2px solid #00D4FF44' }} />
    </section>
  );
}