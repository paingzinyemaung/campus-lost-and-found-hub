interface ItemDetailModalProps {
  item: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function ItemDetailModal({
  item,
  isOpen,
  onClose,
}: ItemDetailModalProps) {
  if (!isOpen || !item) return null;

  return (
    <div className="modal modal-open font-sans">
      <div className="modal-box max-w-lg bg-base-100 p-6 rounded-2xl border border-base-300 shadow-xl space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-base-200 pb-3">
          <h3 className="font-bold text-lg text-base-content flex items-center gap-2">
            📦 ပစ္စည်း အသေးစိတ် အချက်အလက်
          </h3>
          <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost">
            ✕
          </button>
        </div>

        {/* Image Preview */}
        <div className="h-56 w-full bg-base-200 rounded-xl relative overflow-hidden border border-base-300">
          {item.imageUrl ? (
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs text-base-content/40">
              ပုံမရှိပါ
            </div>
          )}
          <span
            className={`absolute top-3 right-3 badge badge-sm font-bold text-[10px] ${item.status === 'LOST' ? 'badge-error' : item.status === 'FOUND' ? 'badge-success' : 'badge-info'}`}
          >
            {item.status}
          </span>
        </div>

        {/* Details Content */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-bold text-base-content">
              {item.title}
            </h2>
            <span className="badge badge-outline text-xs">{item.category}</span>
          </div>

          <div className="bg-base-200/50 p-3 rounded-xl space-y-2 text-xs text-base-content/80">
            <p className="flex items-center gap-2">
              <span className="font-semibold">📍 တည်နေရာ:</span>{' '}
              {item.location || 'ဖော်ပြထားခြင်း မရှိပါ။'}
            </p>
            <p className="flex items-center gap-2">
              <span className="font-semibold">📞 ဆက်သွယ်ရန်:</span>{' '}
              {item.contactInfo || 'ဖော်ပြထားခြင်း မရှိပါ။'}
            </p>
            <p className="flex items-center gap-2">
              <span className="font-semibold">📅 တင်ထားသည့်ရက်စွဲ:</span>{' '}
              {new Date(item.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-base-content mb-1">
              အသေးစိတ် ဖော်ပြချက်
            </h4>
            <p className="text-xs text-base-content/70 bg-base-200/30 p-3 rounded-xl border border-base-200 min-h-16">
              {item.description || 'အသေးစိတ်ဖော်ပြချက် မရှိပါ။'}
            </p>
          </div>
        </div>

        {/* Footer Action */}
        <div className="modal-action pt-2 border-t border-base-200">
          <button
            onClick={onClose}
            className="btn btn-sm btn-outline w-full text-xs"
          >
            ပိတ်မည်
          </button>
        </div>
      </div>
    </div>
  );
}
