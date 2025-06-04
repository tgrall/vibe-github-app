# Internationalization (i18n) Setup

This project uses `next-intl` for internationalization with support for English and French.

## Structure

```
messages/
├── en.json     # English translations
└── fr.json     # French translations

src/
├── i18n/
│   ├── routing.ts      # Routing configuration
│   ├── navigation.ts   # Navigation helpers
│   └── request.ts      # Request configuration
├── middleware.ts       # i18n middleware
└── app/
    ├── page.tsx        # Root page (redirects to default locale)
    └── [locale]/
        ├── layout.tsx  # Localized layout (main layout)
        └── page.tsx    # Localized pages
```

## Features

- 🌍 Support for French (`fr`) and English (`en`)
- 🔄 Automatic locale detection and routing
- 🧭 Language switcher component  
- 🛡️ Type-safe translations with TypeScript
- 📱 URL-based locale switching (`/fr`, `/en`)

## Usage

### Adding Translations

1. Add new keys to both `messages/en.json` and `messages/fr.json`
2. Use the `useTranslations` hook in components:

```tsx
import { useTranslations } from 'next-intl';

export default function MyComponent() {
  const t = useTranslations('MyNamespace');
  
  return <h1>{t('title')}</h1>;
}
```

### Navigation

Use the internationalized navigation helpers:

```tsx
import { Link } from '@/i18n/navigation';

// Automatically uses current locale
<Link href="/about">About</Link>

// Force specific locale
<Link href="/about" locale="fr">À propos</Link>
```

### Adding New Locales

1. Add the locale to `src/i18n/routing.ts`
2. Create a new message file in `messages/`
3. Update the language switcher component

## URLs

- Default: `/` → redirects to `/fr`
- French: `/fr` (default)
- English: `/en`
- Pages: `/fr/about`, `/en/about`, etc.

## Troubleshooting

### ERR_TOO_MANY_REDIRECTS

If you encounter redirect loops:

1. Ensure there's no root `layout.tsx` file (only `page.tsx` for root redirect)
2. Verify middleware configuration excludes static files
3. Check that `[locale]/layout.tsx` is the main layout file
4. Restart the development server after structural changes

### Translation Not Working

1. Verify message keys exist in both `en.json` and `fr.json`
2. Check namespace matches between translation files and `useTranslations('Namespace')`
3. Ensure `NextIntlClientProvider` wraps components in layout
