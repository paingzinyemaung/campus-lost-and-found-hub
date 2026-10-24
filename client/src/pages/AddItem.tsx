import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useCreateItem } from '../hook/item';
import { useLang } from '../context/LanguageContext';
import { useLabels } from '../hook/labels';
import { compressImage } from '../lib/image';

const CATEGORIES = [
  'Electronics',
  'Documents',
  'Personal Items',
  'Books',
  'Others',
];
const MAX_ORIGINAL_MB = 20; // ရွေးတဲ့ မူလပုံ၏ အများဆုံး (တင်မယ့်ပုံက compress လုပ်ပြီးသား)

export default function AddItem() {
  const navigate = useNavigate();
  const createMutation = useCreateItem();
  const { t } = useLang();
  const { label } = useLabels();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Electronics');
  const [status, setStatus] = useState<'LOST' | 'FOUND'>('LOST');
  const [location, setLocation] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Preview URL ကို မသုံးတော့တဲ့အခါ memory ပြန်ရှင်းရန်
  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const file = input.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error(t('add.imageNotImage'));
      input.value = '';
      return;
    }
    if (file.size > MAX_ORIGINAL_MB * 1024 * 1024) {
      toast.error(t('add.imageTooBig'));
      input.value = '';
      return;
    }

    setIsCompressing(true);
    const compressed = await compressImage(file);
    setIsCompressing(false);

    setImageFile(compressed);
    setImagePreview(URL.createObjectURL(compressed));
    input.value = ''; // တူတဲ့ပုံ ထပ်ရွေးရင်လည်း အလုပ်လုပ်စေရန်
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');

    if (!title.trim() || !location.trim() || !contactInfo.trim()) {
      setErrorMessage(t('add.requiredError'));
      toast.error(t('add.requiredError'));
      return;
    }

    const formData = new FormData();
    formData.append('title', title.trim());
    formData.append('description', description.trim());
    formData.append('category', category);
    formData.append('status', status);
    formData.append('location', location.trim());
    formData.append('contactInfo', contactInfo.trim());
    if (imageFile) formData.append('image', imageFile);

    createMutation.mutate(formData, {
      onSuccess: () => {
        toast.success(t('add.success'));
        navigate('/dashboard');
      },
      onError: (err: any) => {
        console.error('Create item failed:', err);

        const statusCode: number | undefined = err?.response?.status;
        const serverMessage: string | undefined = err?.response?.data?.message;

        let msg: string;
        if (serverMessage) {
          msg = serverMessage;
        } else if (err?.code === 'ECONNABORTED') {
          msg = `${t('add.timeout')} [timeout]`;
        } else if (statusCode === 413) {
          msg = `${t('add.tooLargeServer')} [413]`;
        } else if (!err?.response) {
          msg = `${t('add.network')} [network]`;
        } else {
          msg = `${t('add.failed')} [${statusCode}]`;
        }

        setErrorMessage(msg);
        toast.error(msg);
      },
    });
  };

  const isBusy = createMutation.isPending || isCompressing;

  const statusOptions = [
    {
      value: 'LOST' as const,
      icon: '😟',
      title: t('add.lost'),
      hint: t('add.lostHint'),
      active: 'border-error bg-error/10 text-error',
    },
    {
      value: 'FOUND' as const,
      icon: '🎁',
      title: t('add.found'),
      hint: t('add.foundHint'),
      active: 'border-success bg-success/10 text-success',
    },
  ];

  return (
    <main className="mx-auto w-full max-w-2xl space-y-4 px-4 py-6 font-sans sm:space-y-5 sm:px-6 sm:py-8">
      {/* Header */}
      <div className="flex flex-col gap-3 rounded-box border border-base-300 bg-base-100 p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div>
          <h1 className="flex items-center gap-2 text-lg font-bold leading-relaxed sm:text-xl">
            📦 {t('add.title')}
          </h1>
          <p className="mt-0.5 text-xs leading-relaxed text-base-content/70">
            {t('add.subtitle')}
          </p>
        </div>
        <Link
          to="/dashboard"
          className="btn btn-outline btn-sm w-full sm:w-auto"
        >
          ← {t('add.back')}
        </Link>
      </div>

      {errorMessage && (
        <div role="alert" className="alert alert-error text-sm shadow-sm">
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Form */}
      <div className="rounded-box border border-base-300 bg-base-100 p-5 shadow-sm sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Status */}
          <fieldset className="space-y-2">
            <legend className="text-xs font-semibold text-base-content/80">
              {t('add.type')} *
            </legend>
            <div className="grid grid-cols-2 gap-3">
              {statusOptions.map((o) => (
                <label
                  key={o.value}
                  className={`flex cursor-pointer flex-col items-center gap-1 rounded-box border-2 p-3 text-center transition focus-within:outline-2 focus-within:outline-primary sm:p-4 ${
                    status === o.value
                      ? o.active
                      : 'border-base-300 text-base-content/70 hover:border-base-content/30'
                  }`}
                >
                  <input
                    type="radio"
                    name="status"
                    value={o.value}
                    checked={status === o.value}
                    onChange={() => setStatus(o.value)}
                    className="sr-only"
                  />
                  <span className="text-2xl">{o.icon}</span>
                  <span className="text-sm font-bold leading-relaxed">
                    {o.title}
                  </span>
                  <span className="text-[11px] leading-relaxed opacity-70">
                    {o.hint}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-1.5">
              <label
                htmlFor="title"
                className="text-xs font-semibold text-base-content/80"
              >
                {t('add.itemTitle')} *
              </label>
              <input
                id="title"
                type="text"
                required
                value={title}
                disabled={isBusy}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t('add.itemTitlePh')}
                className="input w-full text-base"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="category"
                className="text-xs font-semibold text-base-content/80"
              >
                {t('add.category')} *
              </label>
              <select
                id="category"
                value={category}
                disabled={isBusy}
                onChange={(e) => setCategory(e.target.value)}
                className="select w-full text-base"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {label('category', c)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-1.5">
              <label
                htmlFor="location"
                className="text-xs font-semibold text-base-content/80"
              >
                📍 {t('add.location')} *
              </label>
              <input
                id="location"
                type="text"
                required
                value={location}
                disabled={isBusy}
                onChange={(e) => setLocation(e.target.value)}
                placeholder={t('add.locationPh')}
                className="input w-full text-base"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="contact"
                className="text-xs font-semibold text-base-content/80"
              >
                📞 {t('add.contact')} *
              </label>
              <input
                id="contact"
                type="text"
                required
                value={contactInfo}
                disabled={isBusy}
                onChange={(e) => setContactInfo(e.target.value)}
                placeholder={t('add.contactPh')}
                className="input w-full text-base"
              />
              <p className="text-[11px] leading-relaxed text-base-content/50">
                {t('add.contactHint')}
              </p>
            </div>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="description"
              className="text-xs font-semibold text-base-content/80"
            >
              {t('add.description')}{' '}
              <span className="font-normal text-base-content/50">
                ({t('add.optional')})
              </span>
            </label>
            <textarea
              id="description"
              value={description}
              disabled={isBusy}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t('add.descriptionPh')}
              className="textarea h-28 w-full text-base"
            />
          </div>

          {/* Image */}
          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-base-content/80">
              🖼️ {t('add.image')}{' '}
              <span className="font-normal text-base-content/50">
                ({t('add.optional')})
              </span>
            </span>

            {isCompressing ? (
              <div className="flex items-center justify-center gap-2 rounded-box border-2 border-dashed border-base-300 bg-base-200/40 p-8 text-sm text-base-content/70">
                <span className="loading loading-spinner loading-sm" />
                {t('add.compressing')}
              </div>
            ) : imagePreview ? (
              <div className="relative overflow-hidden rounded-box border border-base-300 bg-base-200">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-h-72 w-full object-cover"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  disabled={isBusy}
                  aria-label={t('add.imageRemove')}
                  className="btn btn-circle btn-sm absolute right-2 top-2 bg-base-100/90"
                >
                  ✕
                </button>
              </div>
            ) : (
              <label
                htmlFor="image"
                className="flex cursor-pointer flex-col items-center justify-center gap-1 rounded-box border-2 border-dashed border-base-300 bg-base-200/40 p-6 text-center transition hover:border-primary hover:bg-primary/5 focus-within:border-primary"
              >
                <span className="text-3xl">📷</span>
                <span className="text-sm font-semibold leading-relaxed">
                  {t('add.imageUpload')}
                </span>
                <span className="text-xs text-base-content/60">
                  {t('add.imageHint')}
                </span>
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  disabled={isBusy}
                  onChange={handleImageChange}
                  className="sr-only"
                />
              </label>
            )}
          </div>

          <button
            type="submit"
            disabled={isBusy}
            className="btn btn-primary mt-2 h-12 w-full text-sm font-bold shadow-md"
          >
            {isBusy ? (
              <>
                <span className="loading loading-spinner loading-sm" />
                {isCompressing ? t('add.compressing') : t('add.submitting')}
              </>
            ) : (
              <>🚀 {t('add.submit')}</>
            )}
          </button>
        </form>
      </div>
    </main>
  );
}
