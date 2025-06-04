// src/lib/github.ts

export async function fetchUserRepos(username: string) {
  const res = await fetch(`https://api.github.com/users/${username}/repos`, {
    headers: {
      Accept: 'application/vnd.github+json',
    },
    next: { revalidate: 60 }, // ISR for Next.js 15
  });
  if (!res.ok) {
    throw new Error('Failed to fetch repositories');
  }
  return res.json();
}
