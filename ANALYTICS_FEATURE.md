# Repository Analytics Feature

## Overview
Added a new analytics page that provides interactive bar charts for GitHub repository statistics.

## Features
- **Interactive Bar Charts**: Visualize repository data with responsive charts
- **Multiple Metrics**: Switch between Stars, Forks, and Open Issues
- **Dropdown Selection**: Easy metric switching with a shadcn/ui dropdown
- **Top 10 Repositories**: Shows the top 10 repositories for the selected metric
- **Responsive Design**: Charts adapt to different screen sizes
- **Internationalization**: Full i18n support for English and French

## Technical Implementation
- **Framework**: Next.js 15 with App Router
- **Charts**: shadcn/ui chart components with Recharts
- **UI Components**: shadcn/ui dropdown menu, cards, buttons
- **Internationalization**: next-intl for translations
- **Styling**: Tailwind CSS

## Navigation
- Added navigation component with links to Home and Analytics pages
- Integrated language switcher in the navigation bar

## Usage
1. Navigate to the Analytics page using the navigation menu
2. Enter a GitHub username
3. Select a metric (Stars, Forks, or Open Issues) from the dropdown
4. View the interactive bar chart showing the top 10 repositories

## File Structure
```
src/
├── app/[locale]/analytics/page.tsx    # Analytics page component
├── components/Navigation.tsx          # Navigation component
└── ...
messages/
├── en.json                           # English translations
├── fr.json                           # French translations
```

## Branch
This feature was developed on the `feature/repo-analytics` branch.
