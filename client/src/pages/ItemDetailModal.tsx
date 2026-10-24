import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useLang } from '../context/LanguageContext';
import { statusBadge, useLabels } from '../hook/labels';
import type { Item } from '../components/ItemCard';

import { optimizeImage } from '../lib/image';

interface ItemDetailModalProps {
  item: Item | null;
  isOpen: boolean;
  onClose: () => void;
}

const isPhone = (value: string) => /^[+\d][\d\s-]{6,}$/.test(value.trim());

export default function ItemDetailModal({
  item,
  isOpen,
  onClose,
}: ItemDetailModalProps) {
  const { t } = useLang();
  const { label, formatDate } = useLabels();

  // Esc နှိပ်ရင် ပိတ်ရန်
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen || !item) return null;

  const copyContact = async () => {
    try {
      await navigator.clipboard.writeText(item.contactInfo);
      toast.success(t('modal.copied'));
    } catch {
      toast.error(t('common.error'));
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="modal modal-open modal-bottom font-sans sm:modal-middle"
    >
      <div className="modal-box max-h-[90dvh] w-full max-w-lg space-y-4 overflow-y-auto p-5 sm:p-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-3 border-b border-base-200 pb-3">
          <h3 className="flex items-center gap-2 text-base font-bold leading-relaxed sm:text-lg">
            📦 {t('modal.title')}
          </h3>
          <button
            onClick={onClose}
            className="btn btn-circle btn-ghost btn-sm"
            aria-label={t('modal.close')}
          >
            ✕
          </button>
        </div>

        {/* Image */}
        <div className="relative aspect-16/10 w-full overflow-hidden rounded-box border border-base-300 bg-base-200">
          {item.imageUrl ? (
            <img
              src={optimizeImage(item.imageUrl, 900)}
              alt={item.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-base-content/40">
              🖼️ {t('items.noImage')}
            </div>
          )}
          <span
            className={`badge badge-sm absolute right-3 top-3 font-bold ${statusBadge(item.status)}`}
          >
            {label('status', item.status)}
          </span>
        </div>

        {/* Title */}
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-base font-bold leading-relaxed wrap-break-word">
            {item.title}
          </h2>
          <span className="badge badge-outline shrink-0 text-xs">
            {label('category', item.category)}
          </span>
        </div>

        {/* Info */}
        <div className="space-y-3 rounded-box bg-base-200/60 p-3 text-xs leading-relaxed">
          <div>
            <div className="font-semibold text-base-content/60">
              📍 {t('modal.location')}
            </div>
            <div className="wrap-break-word">
              {item.location || t('modal.notProvided')}
            </div>
          </div>

          <div>
            <div className="font-semibold text-base-content/60">
              📞 {t('modal.contact')}
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <span className="wrap-break-word">
                {item.contactInfo || t('modal.notProvided')}
              </span>
              {item.contactInfo && (
                <>
                  <button
                    onClick={copyContact}
                    className="btn btn-outline btn-xs"
                  >
                    {t('modal.copy')}
                  </button>
                  {isPhone(item.contactInfo) && (
                    <a
                      href={`tel:${item.contactInfo.replace(/[\s-]/g, '')}`}
                      className="btn btn-primary btn-xs"
                    >
                      {t('modal.call')}
                    </a>
                  )}
                </>
              )}
            </div>
          </div>

          <div>
            <div className="font-semibold text-base-content/60">
              📅 {t('modal.date')}
            </div>
            <div>{formatDate(item.createdAt)}</div>
          </div>
        </div>

        {/* Description */}
        <div>
          <h4 className="mb-1 text-xs font-semibold">
            {t('modal.description')}
          </h4>
          <p className="min-h-16 whitespace-pre-line rounded-box border border-base-200 bg-base-200/30 p-3 text-xs leading-relaxed text-base-content/70 wrap-break-word">
            {item.description || t('items.noDescription')}
          </p>
        </div>

        {/* Footer */}
        <div className="modal-action mt-0 border-t border-base-200 pt-3">
          <button onClick={onClose} className="btn btn-outline w-full">
            {t('modal.close')}
          </button>
        </div>
      </div>

      {/* အပြင်ဘက်နှိပ်ရင် ပိတ် */}
      <div className="modal-backdrop" onClick={onClose} aria-hidden="true" />
    </div>
  );
}
