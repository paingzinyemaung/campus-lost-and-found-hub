import { useLang } from '../context/LanguageContext';
import { statusBadge, useLabels } from '../hook/labels';

export type Item = {
  id: string;
  title: string;
  description?: string | null;
  category: string;
  status: string;
  imageUrl?: string | null;
  location: string;
  contactInfo: string;
  createdAt: string;
};

type Props = { item: Item; onClick: () => void };

export default function ItemCard({ item, onClick }: Props) {
  const { t } = useLang();
  const { label, formatDate } = useLabels();

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      className="flex cursor-pointer flex-col overflow-hidden rounded-box border border-base-300 bg-base-100 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-primary"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-base-200">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.title}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center gap-1 text-xs text-base-content/40">
            🖼️ {t('items.noImage')}
          </div>
        )}
        <span
          className={`badge badge-sm absolute right-3 top-3 font-bold ${statusBadge(item.status)}`}
        >
          {label('status', item.status)}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h2 className="line-clamp-1 text-sm font-bold leading-relaxed">
            {item.title}
          </h2>
          <span className="badge badge-outline badge-sm shrink-0">
            {label('category', item.category)}
          </span>
        </div>
        <p className="line-clamp-1 text-xs leading-relaxed text-base-content/70">
          📍 {item.location}
        </p>
        <p className="line-clamp-2 text-xs leading-relaxed text-base-content/60">
          {item.description || t('items.noDescription')}
        </p>
      </div>

      <div className="mt-auto flex items-center justify-between gap-2 border-t border-base-200 px-4 py-3 text-xs">
        <span className="truncate text-base-content/70">
          📞 {item.contactInfo}
        </span>
        <span className="shrink-0 text-[11px] text-base-content/50">
          {formatDate(item.createdAt)}
        </span>
      </div>
    </article>
  );
}
