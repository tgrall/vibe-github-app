# Copilot Instructions for This Workspace

## Project Overview
This is a Next.js 15 application using TypeScript, Tailwind CSS, and ShadCN UI components. It features a home page that allows users to enter a GitHub username, fetches repositories using the GitHub API, and displays them in cards.

## Key Technologies
- Next.js 15 (App Router, TypeScript)
- Tailwind CSS
- ShadCN UI (navigation menu, sidebar, card, input, button)

## Main Features
- **GitHub API Integration:**
  - The API logic is in `src/lib/github.ts`.
  - Use the `fetchUserRepos(username: string)` function to fetch public repositories for a given GitHub user.
- **Home Page:**
  - Located at `src/app/page.tsx`.
  - Uses ShadCN UI components for input, button, and card display.
  - Implements a client-side form to enter a GitHub username and display results.

## UI Components
- ShadCN UI components are in `src/components/ui/`.
- Use these for consistent design: `button`, `input`, `card`, `navigation-menu`, `sidebar`.

## Coding Guidelines
- Use `"use client"` at the top of client components/pages.
- Use the provided utility functions and UI components for new features.
- Keep API logic in `src/lib/`.
- Use TypeScript for all new files.

## Example: Fetching GitHub Repos
```typescript
import { fetchUserRepos } from "@/lib/github";

const repos = await fetchUserRepos("octocat");
```

## Contribution
- Follow Next.js and ShadCN UI best practices.
- Keep UI/UX consistent with the existing design.
- Use Tailwind CSS for styling.

## GitHub Repository
- Repository: [tgrall/vibe-github-app](https://github.com/tgrall/vibe-github-app)
- To contribute, clone with:
  ```sh
  git clone https://github.com/tgrall/vibe-github-app.git
  ```

---
This file is for Copilot and contributors to understand the structure and conventions of this workspace.
