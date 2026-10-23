import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ItemCard, { type Item } from '../components/ItemCard';
import ItemDetailModal from './ItemDetailModal';
import { useItems } from '../hook/item';
import { useMe } from '../hook/auth';
import { useLang } from '../context/LanguageContext';
import { useLabels } from '../hook/labels';

const CATEGORIES = [
  'Electronics',
  'Documents',
  'Personal Items',
  'Books',
  'Others',
];
const STATUSES = ['LOST', 'FOUND', 'RESOLVED'];
const ITEMS_PER_PAGE = 6;

export default function Items() {
  const { data: itemsResponse, isLoading, error } = useItems();
  const { data: userData } = useMe();
  const navigate = useNavigate();
  const { t } = useLang();
  const { label } = useLabels();

  const isAuthenticated = !!userData;

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const items: Item[] = itemsResponse?.data || itemsResponse || [];

  const keyword = searchTerm.trim().toLowerCase();
  const filteredItems = items.filter((item) => {
    const matchesSearch =
      !keyword ||
      item.title?.toLowerCase().includes(keyword) ||
      item.location?.toLowerCase().includes(keyword);
    const matchesCategory =
      selectedCategory === 'ALL' || item.category === selectedCategory;
    const matchesStatus =
      selectedStatus === 'ALL' || item.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const hasFilters =
    !!keyword || selectedCategory !== 'ALL' || selectedStatus !== 'ALL';

  // Pagination
  const totalPages = Math.max(
    1,
    Math.ceil(filteredItems.length / ITEMS_PER_PAGE),
  );
  const page = Math.min(currentPage, totalPages);
  const currentItems = filteredItems.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  const goToPage = (p: number) => {
    setCurrentPage(Math.min(Math.max(p, 1), totalPages));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Desktop မှာ ပြမယ့် page နံပါတ် (အများဆုံး ၅ ခု)
  const pageNumbers: number[] = [];
  const startPage = Math.max(1, Math.min(page - 2, totalPages - 4));
  for (let p = startPage; p <= Math.min(totalPages, startPage + 4); p++)
    pageNumbers.push(p);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('ALL');
    setSelectedStatus('ALL');
    setCurrentPage(1);
  };

  const handleBack = () => navigate(isAuthenticated ? '/dashboard' : '/');
  const handleAddItem = () =>
    navigate(isAuthenticated ? '/dashboard/add-item' : '/login');

  return (
    <div className="min-h-screen bg-base-200 font-sans">
      <Navbar />

      <main className="mx-auto max-w-6xl space-y-5 px-4 py-6 sm:px-6 sm:py-8">
        {/* Header */}
        <div className="flex flex-col gap-4 rounded-box border border-base-300 bg-base-100 p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="flex items-center gap-2 text-xl font-bold leading-relaxed sm:text-2xl">
              🔍 {t('items.title')}
            </h1>
            <p className="mt-1 text-xs leading-relaxed text-base-content/70">
              {t('items.subtitle')}
            </p>
          </div>
          <div className="flex w-full gap-2 sm:w-auto">
            <button
              onClick={handleBack}
              className="btn btn-outline btn-sm flex-1 sm:flex-none"
            >
              ← {t('items.back')}
            </button>
            <button
              onClick={handleAddItem}
              className="btn btn-primary btn-sm flex-1 sm:flex-none"
            >
              + {t('items.addNew')}
            </button>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="grid grid-cols-1 gap-3 rounded-box border border-base-300 bg-base-100 p-4 shadow-sm md:grid-cols-3">
          <input
            type="search"
            placeholder={t('items.search')}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="input w-full text-base"
          />
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1);
            }}
            className="select w-full text-base"
          >
            <option value="ALL">{t('items.allCategories')}</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {label('category', c)}
              </option>
            ))}
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value);
              setCurrentPage(1);
            }}
            className="select w-full text-base"
          >
            <option value="ALL">{t('items.allStatus')}</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {label('status', s)}
              </option>
            ))}
          </select>
        </div>

        {/* Result count + clear */}
        {!isLoading && !error && (
          <div className="flex items-center justify-between text-xs text-base-content/60">
            <span>
              {filteredItems.length} {t('items.countSuffix')}
            </span>
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="btn btn-ghost btn-xs text-primary"
              >
                ✕ {t('items.clearFilters')}
              </button>
            )}
          </div>
        )}

        {/* Loading skeleton */}
        {isLoading && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-box border border-base-300 bg-base-100"
              >
                <div className="skeleton aspect-[4/3] w-full rounded-none" />
                <div className="space-y-3 p-4">
                  <div className="skeleton h-4 w-2/3" />
                  <div className="skeleton h-3 w-1/2" />
                  <div className="skeleton h-3 w-full" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {error && (
          <div role="alert" className="alert alert-error text-xs shadow-sm">
            <span>{t('items.error')}</span>
          </div>
        )}

        {/* Empty */}
        {!isLoading && !error && filteredItems.length === 0 && (
          <div className="rounded-box border border-base-300 bg-base-100 px-4 py-16 text-center">
            <div className="text-4xl">📭</div>
            <p className="mt-3 text-sm leading-relaxed text-base-content/60">
              {t('items.empty')}
            </p>
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="btn btn-outline btn-sm mt-4"
              >
                {t('items.clearFilters')}
              </button>
            )}
          </div>
        )}

        {/* Grid */}
        {!isLoading && !error && currentItems.length > 0 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {currentItems.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                onClick={() => {
                  setSelectedItem(item);
                  setIsModalOpen(true);
                }}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center pt-2">
            <div className="join border border-base-300 bg-base-100 shadow-sm">
              <button
                className="join-item btn btn-sm"
                disabled={page === 1}
                onClick={() => goToPage(page - 1)}
              >
                «
                <span className="hidden sm:inline">
                  {' '}
                  {t('pagination.prev')}
                </span>
              </button>

              {/* ဖုန်း: စာမျက်နှာ 2 / 5 */}
              <button className="join-item btn btn-sm pointer-events-none sm:hidden">
                {t('pagination.page')} {page} / {totalPages}
              </button>

              {/* Tablet+: နံပါတ်များ */}
              {pageNumbers.map((n) => (
                <button
                  key={n}
                  className={`join-item btn btn-sm hidden sm:inline-flex ${
                    page === n ? 'btn-primary' : ''
                  }`}
                  onClick={() => goToPage(n)}
                >
                  {n}
                </button>
              ))}

              <button
                className="join-item btn btn-sm"
                disabled={page === totalPages}
                onClick={() => goToPage(page + 1)}
              >
                <span className="hidden sm:inline">
                  {t('pagination.next')}{' '}
                </span>
                »
              </button>
            </div>
          </div>
        )}
      </main>

      <ItemDetailModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedItem(null);
        }}
      />
    </div>
  );
}
