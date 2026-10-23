import { useLang } from '../context/LanguageContext';
import type { TKey } from '../i18n/translations';

export function useLabels() {
  const { t } = useLang();

  // key မရှိရင် (ဥပမာ category အသစ်) မူလတန်ဖိုးကိုပဲ ပြမယ်
  const label = (prefix: 'category' | 'status', value: string) => {
    const key = `${prefix}.${value}` as TKey;
    const text = t(key);
    return text === key ? value : text;
  };

  const formatDate = (date: string | Date) =>
    new Date(date).toLocaleDateString('en-GB'); // ရက်/လ/နှစ်

  return { label, formatDate };
}

export const statusBadge = (status: string) =>
  status === 'LOST'
    ? 'badge-error'
    : status === 'FOUND'
      ? 'badge-success'
      : 'badge-info';
