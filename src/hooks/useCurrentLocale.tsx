import { useLocale } from 'next-intl';

export function useCurrentLocale(): string {
  const locale = useLocale();
  return locale;
}