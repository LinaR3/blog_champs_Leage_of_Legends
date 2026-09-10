import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useChampions } from '../hooks/useChampions';
import { useItems } from '../hooks/useItems';
import { useFavorites } from '../hooks/useFavorites';
import LeftNav from '../components/Layout/LeftNav';
import Header from '../components/Layout/Header';

export const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { champions, list: champList, version, loading: champsLoading } = useChampions();
  const { list: itemList, version: itemVersion, loading: itemsLoading } = useItems();
  const { favorites, isFavorite, toggleFavorite } = useFavorites();

  const getActiveSection = () => {
    if (location.pathname === '/') return 'home';
    if (location.pathname.startsWith('/champions')) return 'champions';
    if (location.pathname === '/items') return 'items';
    if (location.pathname === '/maps') return 'maps';
    if (location.pathname === '/favorites') return 'favorites';
    return 'home';
  };

  const mapCount = 11;

  function handleSearchSelect(type, id) {
    if (type === 'champion') { navigate(`/champions/${id}`); }
    else if (type === 'item') { navigate('/items'); }
    else if (type === 'map') { navigate('/maps'); }
  }

  return (
    <div className="noise flex h-screen overflow-hidden bg-[#0A0B14]">
      {/* Menú lateral fijo */}
      <LeftNav
        active={getActiveSection()}
        onNavigate={(s) => {
          if (s === 'home') navigate('/');
          else navigate(`/${s}`);
        }}
        champCount={champList.length}
        itemCount={itemList.length}
        mapCount={mapCount}
        favCount={favorites.length}
      />

      {/* Área principal */}
      <div className="flex-1 flex flex-col">
        <Header
          champions={champions}
          items={Object.fromEntries(itemList.map(i => [i.id, i]))}
          version={version || itemVersion}
          favCount={favorites.length}
          onShowFavs={() => navigate('/favorites')}
          onSelect={handleSearchSelect}
          onNavigate={(s) => { if (s === 'home') navigate('/'); else navigate(`/${s}`); }}
        />

        <main
          className="main-scroll flex-1 overflow-y-auto"
          style={{
            paddingTop: location.pathname === '/' ? '0' : '3.5rem',
            paddingLeft: location.pathname === '/' ? '0' : '6rem',
          }}
        >
          <Outlet context={{ champList, itemList, version, itemVersion, champsLoading, itemsLoading, champions, favorites, isFavorite, toggleFavorite, mapCount, navigate }} />
        </main>
      </div>
    </div>
  );
};