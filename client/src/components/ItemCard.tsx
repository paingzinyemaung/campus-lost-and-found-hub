import { useLang } from '../context/LanguageContext';
import { statusBadge, useLabels } from '../hook/labels';
import { optimizeImage } from '../lib/image';

export type Item = {
  id: string;
  title: string;
  description?: string | null;
  category: string;
  status: string;
  previousStatus?: string | null;
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
      className="flex cursor-pointer overflow-hidden rounded-box border border-base-300 bg-base-100 shadow-sm transition active:scale-[0.99] hover:shadow-md focus-visible:outline-2 focus-visible:outline-primary sm:flex-col sm:hover:-translate-y-0.5"
    >
      {/* ပုံ: ဖုန်းမှာ 112px လေးထောင့်၊ tablet+ မှာ အကျယ်အပြည့် */}
      <div className="relative aspect-square w-28 shrink-0 self-stretch overflow-hidden bg-base-200 sm:aspect-4/3 sm:w-full sm:self-auto">
        {item.imageUrl ? (
          <img
            src={optimizeImage(item.imageUrl, 600)}
            alt={item.title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-1 text-[11px] text-base-content/40">
            <span className="text-2xl">🖼️</span>
            <span className="hidden sm:inline">{t('items.noImage')}</span>
          </div>
        )}
        <span
          className={`badge badge-sm absolute left-1.5 top-1.5 font-bold shadow-sm sm:left-auto sm:right-3 sm:top-3 ${statusBadge(item.status)}`}
        >
          {label('status', item.status)}
        </span>
      </div>

      {/* စာ */}
      <div className="flex min-w-0 flex-1 flex-col gap-1 p-3 sm:gap-2 sm:p-4">
        <div className="flex items-start justify-between gap-2">
          <h2 className="line-clamp-1 text-sm font-bold leading-relaxed">
            {item.title}
          </h2>
          <span className="badge badge-outline badge-sm hidden shrink-0 sm:inline-flex">
            {label('category', item.category)}
          </span>
        </div>

        <p className="line-clamp-1 text-xs leading-relaxed text-base-content/70">
          📍 {item.location}
        </p>

        <p className="line-clamp-1 text-xs leading-relaxed text-base-content/60 sm:line-clamp-2">
          {item.description || t('items.noDescription')}
        </p>

        {/* ဖုန်းမှာသာ: အမျိုးအစား + ရက်စွဲ */}
        <div className="mt-auto flex items-center justify-between gap-2 pt-1 sm:hidden">
          <span className="badge badge-outline badge-sm">
            {label('category', item.category)}
          </span>
          <span className="text-[11px] text-base-content/50">
            {formatDate(item.createdAt)}
          </span>
        </div>
      </div>

      {/* Tablet+ မှာသာ: ဆက်သွယ်ရန် + ရက်စွဲ */}
      <div className="mt-auto hidden items-center justify-between gap-2 border-t border-base-200 px-4 py-3 text-xs sm:flex">
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
