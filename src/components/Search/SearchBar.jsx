import { useState, useRef, useEffect } from 'react';

export default function SearchBar({ champions, items, maps, onSelect }) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(0);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  const all = [...champions, ...items, ...maps];
  const results = query.length >= 1
    ? all.filter(i => i.name.toLowerCase().includes(query.toLowerCase())).slice(0, 8)
    : [];

  useEffect(() => {
    setFocused(0);
  }, [query]);

  useEffect(() => {
    function handleClick(e) {
      if (!dropdownRef.current?.contains(e.target) && !inputRef.current?.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  function handleKey(e) {
    if (e.key === 'ArrowDown') { e.preventDefault(); setFocused(f => Math.min(f + 1, results.length - 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setFocused(f => Math.max(f - 1, 0)); }
    if (e.key === 'Enter' && results[focused]) { handleSelect(results[focused]); }
    if (e.key === 'Escape') { setOpen(false); inputRef.current?.blur(); }
  }

  function handleSelect(item) {
    setQuery('');
    setOpen(false);
    onSelect(item);
  }

  const typeLabel = { champion: 'CAMPEÓN', item: 'ÍTEM', map: 'MAPA' };
  const typeColor = {
    champion: 'text-[#00D4FF] border-[#00D4FF]',
    item: 'text-[#C850B0] border-[#C850B0]',
    map: 'text-[#A8C4E0] border-[#A8C4E0]',
  };

  return (
    <div className="relative w-full max-w-sm">
      <div className="relative flex items-center">
        <svg className="absolute left-3 w-4 h-4 text-[#6B8EB8] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKey}
          placeholder="Buscar campeones, ítems..."
          className="w-full pl-10 pr-4 py-2 bg-[#0F1320] border border-[#1E3A6E] text-[#E8F0FF] placeholder-[#3D5A80] text-sm font-['Rajdhani'] focus:outline-none focus:border-[#00D4FF] transition-colors"
          style={{ fontFamily: 'Rajdhani, sans-serif' }}
        />
        {query && (
          <button
            onClick={() => { setQuery(''); setOpen(false); }}
            className="absolute right-3 text-[#3D5A80] hover:text-[#E8F0FF] transition-colors"
          >
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>

      {open && results.length > 0 && (
        <div
          ref={dropdownRef}
          className="search-dropdown absolute top-full left-0 right-0 mt-1 z-50 max-h-80 overflow-y-auto"
        >
          {results.map((item, i) => (
            <button
              key={`${item.type}-${item.id}`}
              onMouseEnter={() => setFocused(i)}
              onClick={() => handleSelect(item)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors ${
                i === focused ? 'bg-[#1E3A6E]/40' : 'hover:bg-[#1E3A6E]/20'
              }`}
            >
              <div className="w-8 h-8 flex-shrink-0 overflow-hidden bg-[#16213E]">
                {item.type === 'champion' && (
                  <img
                    src={`https://ddragon.leagueoflegends.com/cdn/${item.version}/img/champion/${item.image}`}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                )}
                {item.type === 'item' && item.image && (
                  <img
                    src={`https://ddragon.leagueoflegends.com/cdn/${item.version}/img/item/${item.image}`}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                )}
                {item.type === 'map' && (
                  <div className="w-full h-full flex items-center justify-center text-[#A8C4E0]">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zm10.586 13.414L18 14.414V4a1 1 0 00-1.707-.707L14 5.586v12.828a1 1 0 01-.707-.707z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[#E8F0FF] text-sm font-semibold truncate" style={{ fontFamily: 'Rajdhani, sans-serif' }}>{item.name}</p>
                {item.subtitle && <p className="text-[#6B8EB8] text-xs truncate" style={{ fontFamily: 'Rajdhani, sans-serif' }}>{item.subtitle}</p>}
              </div>
              <span className={`tag flex-shrink-0 ${typeColor[item.type]}`}>{typeLabel[item.type]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}