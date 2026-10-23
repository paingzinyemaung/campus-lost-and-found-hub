import { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useMe } from '../hook/auth';
import { useItems, useUpdateItem, useDeleteItem } from '../hook/item';
import { useLang } from '../context/LanguageContext';
import { statusBadge, useLabels } from '../hook/labels';
import type { Item } from '../components/ItemCard';

type MyItem = Item & { userId: string };

export default function Home() {
  const { t } = useLang();
  const { label, formatDate } = useLabels();

  const { data: userData, isLoading: isUserLoading } = useMe();
  const { data: itemsData, isLoading: isItemsLoading } = useItems();
  const updateMutation = useUpdateItem();
  const deleteMutation = useDeleteItem();

  const [deleteTarget, setDeleteTarget] = useState<MyItem | null>(null);

  const resData = userData?.data || userData;
  const currentUser = resData?.user || resData?.data || resData;

  const items: MyItem[] = Array.isArray(itemsData)
    ? itemsData
    : (itemsData?.data ?? []);
  const myItems = items.filter((item) => item.userId === currentUser?.id);

  const handleToggleStatus = (item: MyItem) => {
    const newStatus = item.status === 'RESOLVED' ? 'LOST' : 'RESOLVED';
    updateMutation.mutate(
      { id: item.id, data: { ...item, status: newStatus } },
      {
        onSuccess: () => toast.success(t('home.updated')),
        onError: () => toast.error(t('home.updateFailed')),
      },
    );
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    deleteMutation.mutate(deleteTarget.id, {
      onSuccess: () => {
        toast.success(t('home.deleted'));
        setDeleteTarget(null);
      },
      onError: () => toast.error(t('home.deleteFailed')),
    });
  };

  // Loading skeleton
  if (isUserLoading || isItemsLoading) {
    return (
      <main className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 sm:py-8">
        <div className="skeleton h-40 w-full rounded-box" />
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="skeleton h-24 rounded-box" />
          ))}
        </div>
        <div className="skeleton h-64 w-full rounded-box" />
      </main>
    );
  }

  const lostCount = myItems.filter((i) => i.status === 'LOST').length;
  const foundCount = myItems.filter((i) => i.status === 'FOUND').length;
  const resolvedCount = myItems.filter((i) => i.status === 'RESOLVED').length;

  const stats = [
    {
      label: t('home.stat.total'),
      value: myItems.length,
      icon: '📦',
      tone: 'bg-primary/10 text-primary',
    },
    {
      label: t('home.stat.lost'),
      value: lostCount,
      icon: '❗',
      tone: 'bg-error/10 text-error',
    },
    {
      label: t('home.stat.found'),
      value: foundCount,
      icon: '✅',
      tone: 'bg-success/10 text-success',
    },
    {
      label: t('home.stat.resolved'),
      value: resolvedCount,
      icon: '🎉',
      tone: 'bg-info/10 text-info',
    },
  ];

  const renderActions = (item: MyItem) => (
    <div className="flex items-center gap-2">
      <button
        onClick={() => handleToggleStatus(item)}
        disabled={updateMutation.isPending}
        className={`btn btn-sm flex-1 sm:flex-none ${
          item.status !== 'RESOLVED'
            ? 'btn-outline btn-info'
            : 'btn-ghost border-base-300'
        }`}
      >
        {item.status !== 'RESOLVED' ? t('home.markResolved') : t('home.reopen')}
      </button>
      <button
        onClick={() => setDeleteTarget(item)}
        aria-label={t('home.delete')}
        className="btn btn-sm btn-square btn-outline btn-error"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  );

  const thumb = (item: MyItem, size: string) =>
    item.imageUrl ? (
      <img
        src={item.imageUrl}
        alt={item.title}
        className={`${size} shrink-0 rounded-lg object-cover`}
      />
    ) : (
      <div
        className={`${size} flex shrink-0 items-center justify-center rounded-lg bg-base-200 text-lg`}
      >
        🖼️
      </div>
    );

  return (
    <main className="mx-auto w-full max-w-7xl space-y-5 px-4 py-6 font-sans sm:space-y-6 sm:px-6 sm:py-8">
      {/* Profile */}
      {currentUser && (
        <section className="rounded-box border border-base-300 bg-linear-to-br from-primary/10 via-base-100 to-base-100 p-5 shadow-sm sm:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex min-w-0 items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-content shadow sm:h-16 sm:w-16 sm:text-2xl">
                {currentUser.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="min-w-0">
                <h1 className="text-lg font-bold leading-relaxed wrap-break-word sm:text-2xl">
                  {t('home.welcome')} {currentUser.name}! 👋
                </h1>
                <p className="truncate text-xs text-base-content/70 sm:text-sm">
                  {currentUser.email}
                </p>
              </div>
            </div>
            <div className="flex w-full flex-col gap-2 sm:flex-row sm:gap-3 md:w-auto">
              <Link to="/items" className="btn btn-outline w-full sm:w-auto">
                🔍 {t('home.browse')}
              </Link>
              <Link
                to="/dashboard/add-item"
                className="btn btn-primary w-full shadow-md sm:w-auto"
              >
                + {t('home.addNew')}
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Stats */}
      <section className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-box border border-base-300 bg-base-100 p-4 shadow-sm"
          >
            <div
              className={`mb-3 flex h-9 w-9 items-center justify-center rounded-lg text-base ${s.tone}`}
            >
              {s.icon}
            </div>
            <div className="text-3xl font-extrabold leading-none">
              {s.value}
            </div>
            <div className="mt-2 text-xs leading-relaxed text-base-content/60">
              {s.label}
            </div>
          </div>
        ))}
      </section>

      {/* My items */}
      <section className="overflow-hidden rounded-box border border-base-300 bg-base-100 shadow-sm">
        <div className="flex items-center justify-between gap-3 border-b border-base-300 p-4 sm:p-6">
          <h2 className="flex items-center gap-2 text-base font-bold leading-relaxed sm:text-xl">
            📦 {t('home.myItems')}
          </h2>
          <span className="badge badge-primary">{myItems.length}</span>
        </div>

        {myItems.length === 0 ? (
          <div className="px-4 py-14 text-center">
            <div className="mb-3 text-5xl">📭</div>
            <h3 className="mb-2 text-lg font-bold leading-relaxed">
              {t('home.emptyTitle')}
            </h3>
            <p className="mx-auto mb-6 max-w-sm text-sm leading-relaxed text-base-content/60">
              {t('home.emptyDesc')}
            </p>
            <Link to="/dashboard/add-item" className="btn btn-primary">
              {t('home.emptyCta')}
            </Link>
          </div>
        ) : (
          <>
            {/* ဖုန်း: Card list */}
            <ul className="divide-y divide-base-200 md:hidden">
              {myItems.map((item) => (
                <li key={item.id} className="space-y-3 p-4">
                  <div className="flex gap-3">
                    {thumb(item, 'h-16 w-16')}
                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="truncate text-sm font-bold leading-relaxed">
                        {item.title}
                      </div>
                      <div className="truncate text-xs text-base-content/60">
                        📍 {item.location}
                      </div>
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <span
                          className={`badge badge-sm font-medium ${statusBadge(item.status)}`}
                        >
                          {label('status', item.status)}
                        </span>
                        <span className="badge badge-outline badge-sm">
                          {label('category', item.category)}
                        </span>
                        <span className="text-[11px] text-base-content/50">
                          {formatDate(item.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                  {renderActions(item)}
                </li>
              ))}
            </ul>

            {/* Tablet / Desktop: Table */}
            <div className="hidden overflow-x-auto md:block">
              <table className="table">
                <thead className="bg-base-200/50">
                  <tr>
                    <th>{t('home.col.no')}</th>
                    <th>{t('home.col.name')}</th>
                    <th>{t('home.col.category')}</th>
                    <th>{t('home.col.status')}</th>
                    <th>{t('home.col.date')}</th>
                    <th className="text-right">{t('home.col.actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {myItems.map((item, index) => (
                    <tr key={item.id} className="hover:bg-base-200/40">
                      <th className="font-normal text-base-content/60">
                        {index + 1}
                      </th>
                      <td>
                        <div className="flex items-center gap-3">
                          {thumb(item, 'h-10 w-10')}
                          <div className="min-w-0">
                            <div className="max-w-56 truncate font-bold">
                              {item.title}
                            </div>
                            <div className="max-w-56 truncate text-xs text-base-content/50">
                              {item.location}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="text-sm">
                        {label('category', item.category)}
                      </td>
                      <td>
                        <span
                          className={`badge badge-sm font-medium ${statusBadge(item.status)}`}
                        >
                          {label('status', item.status)}
                        </span>
                      </td>
                      <td className="whitespace-nowrap text-sm text-base-content/70">
                        {formatDate(item.createdAt)}
                      </td>
                      <td>
                        <div className="flex justify-end">
                          {renderActions(item)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </section>

      {/* Delete confirm modal */}
      {deleteTarget && (
        <div
          role="dialog"
          aria-modal="true"
          className="modal modal-open modal-bottom sm:modal-middle"
        >
          <div className="modal-box">
            <h3 className="text-lg font-bold leading-relaxed">
              🗑️ {t('home.deleteTitle')}
            </h3>
            <p className="mt-3 truncate text-sm font-semibold">
              “{deleteTarget.title}”
            </p>
            <p className="py-2 text-sm leading-relaxed text-base-content/70">
              {t('home.deleteConfirm')}
            </p>
            <div className="modal-action">
              <button
                className="btn flex-1 sm:flex-none"
                onClick={() => setDeleteTarget(null)}
                disabled={deleteMutation.isPending}
              >
                {t('home.cancel')}
              </button>
              <button
                className="btn btn-error flex-1 sm:flex-none"
                onClick={confirmDelete}
                disabled={deleteMutation.isPending}
              >
                {deleteMutation.isPending && (
                  <span className="loading loading-spinner loading-sm" />
                )}
                {t('home.delete')}
              </button>
            </div>
          </div>
          <div
            className="modal-backdrop"
            onClick={() => setDeleteTarget(null)}
            aria-hidden="true"
          />
        </div>
      )}
    </main>
  );
}
