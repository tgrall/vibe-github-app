"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from 'next-intl';
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function Navigation() {
  const t = useTranslations('Navigation');
  const pathname = usePathname();
  const locale = useLocale();

  const isActive = (path: string) => {
    const currentPath = pathname.replace(`/${locale}`, '') || '/';
    return currentPath === path;
  };

  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <h1 className="text-xl font-bold">GitHub App</h1>
            <div className="flex space-x-2">
              <Button
                asChild
                variant={isActive('/') ? 'default' : 'ghost'}
                size="sm"
              >
                <Link href={`/${locale}`}>
                  {t('home')}
                </Link>
              </Button>
              <Button
                asChild
                variant={isActive('/analytics') ? 'default' : 'ghost'}
                size="sm"
              >
                <Link href={`/${locale}/analytics`}>
                  {t('analytics')}
                </Link>
              </Button>
            </div>
          </div>
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
}
