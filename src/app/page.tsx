"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { fetchUserRepos } from "@/lib/github";

export default function Home() {
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
      setError(err.message || "Failed to fetch repositories");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-8">
      <h1 className="text-3xl font-bold mb-4">GitHub User Repositories</h1>
      <form onSubmit={handleSearch} className="flex gap-2 w-full max-w-md">
        <Input
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Search"}
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
            <div className="text-xs text-gray-500 mb-1">
              ⭐ {repo.stargazers_count} | Forks: {repo.forks_count}
            </div>
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline text-xs"
            >
              View on GitHub
            </a>
          </Card>
        ))}
      </div>
    </div>
  );
}
