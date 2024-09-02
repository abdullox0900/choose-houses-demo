import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import { locales } from './config'

export const { Link, redirect, usePathname, useRouter } =
	createSharedPathnamesNavigation({
		locales,
		localePrefix: 'always', // yoki 'as-needed'
	})

export const defaultLocale = 'uz' as const
