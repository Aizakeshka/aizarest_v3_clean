import { useState, useMemo, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import RestaurantCard from '../components/RestaurantCard';
import EmptyState from '../components/ui/EmptyState';
import Select from '../components/ui/Select';
import Icon from '../components/ui/Icon';
import { usePagination } from '../hooks/usePagination';

const CUISINES = ['Все', 'Кыргызская кухня', 'Средиземноморская', 'Авторская кухня', 'Узбекская и кыргызская', 'Европейская', 'Кочевая кухня'];
const SORTS = [
  { value: 'rating', label: 'По рейтингу' },
  { value: 'price_asc', label: 'Сначала дешевле' },
  { value: 'price_desc', label: 'Сначала дороже' },
  { value: 'name', label: 'По алфавиту' },
];

export default function Restaurants() {
  const { restaurants } = useApp();
  const [search, setSearch] = useState('');
  const [cuisine, setCuisine] = useState('Все');
  const [sort, setSort] = useState('rating');

  const filtered = useMemo(() => {
    let list = [...restaurants];
    if (search) list = list.filter(r =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.address.toLowerCase().includes(search.toLowerCase())
    );
    if (cuisine !== 'Все') list = list.filter(r => r.cuisine === cuisine);
    switch (sort) {
      case 'rating': list.sort((a, b) => b.rating - a.rating); break;
      case 'price_asc': list.sort((a, b) => a.pricePerDish - b.pricePerDish); break;
      case 'price_desc': list.sort((a, b) => b.pricePerDish - a.pricePerDish); break;
      case 'name': list.sort((a, b) => a.name.localeCompare(b.name)); break;
    }
    return list;
  }, [restaurants, search, cuisine, sort]);

  const { page, setPage, totalPages, paginated, hasPrev, hasNext, nextPage, prevPage } = usePagination(filtered, 6);

  useEffect(() => { setPage(1); }, [search, cuisine, sort, setPage]);

  const hasFilters = search || cuisine !== 'Все';

  return (
    <div style={{ minHeight: '80vh' }}>
      <div className="page-header" style={{ paddingBottom: 52 }}>
        <div className="container">
          <p className="page-header-label">Кыргызстан</p>
          <h1 className="page-header-title" style={{ marginBottom: 8 }}>Рестораны</h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>
            {filtered.length} из {restaurants.length} заведений
          </p>
        </div>
      </div>

      <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', position: 'sticky', top: 68, zIndex: 50 }}>
        <div className="container" style={{ padding: '14px 24px', display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ flex: 1, minWidth: 220, position: 'relative' }}>
            <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }}>
              <Icon name="search" size={16} />
            </div>
            <input
              className="input-field"
              placeholder="Поиск по названию или адресу..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ fontSize: 13, paddingLeft: 36 }}
            />
          </div>

          <div style={{ minWidth: 180 }}>
            <Select
              options={CUISINES}
              value={cuisine}
              onChange={setCuisine}
              placeholder="Кухня"
            />
          </div>

          <div style={{ minWidth: 170 }}>
            <Select
              options={SORTS}
              value={sort}
              onChange={setSort}
              placeholder="Сортировка"
            />
          </div>

          {hasFilters && (
            <button
              className="btn btn-ghost"
              style={{ fontSize: 11.5, padding: '11px 18px', display: 'flex', alignItems: 'center', gap: 6 }}
              onClick={() => { setSearch(''); setCuisine('Все'); }}
            >
              <Icon name="x" size={14} /> Сбросить
            </button>
          )}
        </div>
      </div>

      <div className="container" style={{ padding: '48px 24px' }}>
        {filtered.length === 0 ? (
          <EmptyState
            icon="search"
            title="Ничего не найдено"
            text="Попробуйте изменить параметры поиска или сбросить фильтры"
            action={
              <button className="btn btn-ghost" onClick={() => { setSearch(''); setCuisine('Все'); }}>
                Сбросить фильтры
              </button>
            }
          />
        ) : (
          <>
            <div className="grid-3" style={{ marginBottom: 48 }}>
              {paginated.map(r => <RestaurantCard key={r.id} restaurant={r} />)}
            </div>

            {totalPages > 1 && (
              <div className="pagination">
                <button onClick={prevPage} disabled={!hasPrev} className="pagination-btn">
                  <Icon name="arrow-left" size={16} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`pagination-btn ${p === page ? 'active' : ''}`}
                  >
                    {p}
                  </button>
                ))}
                <button onClick={nextPage} disabled={!hasNext} className="pagination-btn">
                  <Icon name="arrow-right" size={16} />
                </button>
                <span className="pagination-info">{page} / {totalPages}</span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
