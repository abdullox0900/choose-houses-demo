export const locales = ['uz', 'kr', 'ru'] as const
export type Locale = (typeof locales)[number]
