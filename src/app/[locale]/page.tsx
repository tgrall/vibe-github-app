"use client";

import { useState } from "react";
import { useTranslations } from 'next-intl';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { fetchUserRepos } from "@/lib/github";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export default function HomePage() {
  const t = useTranslations('HomePage');
  const tRepo = useTranslations('Repository');
  
  const [username, setUsername] = useState("");
  const [repos, setRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setRepos([]);
    try {
      const data = await fetchUserRepos(username);
      setRepos(data);
    } catch (err: any) {
      setError(err.message || t('error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-8">
      {/* Language Switcher */}
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>

      <h1 className="text-3xl font-bold mb-4">{t('title')}</h1>
      <p className="text-gray-600 mb-4">{t('description')}</p>
      
      <form onSubmit={handleSearch} className="flex gap-2 w-full max-w-md">
        <Input
          placeholder={t('searchPlaceholder')}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <Button type="submit" disabled={loading}>
          {loading ? t('loading') : t('searchButton')}
        </Button>
      </form>
      
      {error && <div className="text-red-500">{error}</div>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-5xl mt-6">
        {repos.map((repo) => (
          <Card key={repo.id} className="p-4">
            <div className="font-semibold text-lg mb-2">{repo.name}</div>
            <div className="text-sm text-muted-foreground mb-2">
              {repo.description}
            </div>
            <div className="flex justify-between items-center text-sm">
              <div className="flex gap-4">
                <span>⭐ {repo.stargazers_count} {tRepo('stars')}</span>
                <span>🍴 {repo.forks_count} {tRepo('forks')}</span>
              </div>
              {repo.language && (
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                  {repo.language}
                </span>
              )}
            </div>
            <div className="mt-2 flex justify-between items-center">
              <span className="text-xs text-gray-500">
                🐛 {repo.open_issues_count} {tRepo('openIssues')}
              </span>
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                {tRepo('viewOnGitHub')} →
              </a>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
