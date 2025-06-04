'use client';

import { usePathname } from '@/i18n/navigation';
import { Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { useParams } from 'next/navigation';

export function LanguageSwitcher() {
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = params?.locale as string;

  return (
    <div className="flex gap-2">
      {routing.locales.map((locale) => (
        <Link
          key={locale}
          href={pathname}
          locale={locale}
          className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
            currentLocale === locale
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
          }`}
        >
          {locale === 'en' ? '🇺🇸 EN' : '🇫🇷 FR'}
        </Link>
      ))}
    </div>
  );
}
