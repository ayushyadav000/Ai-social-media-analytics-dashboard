# OrbitIQ Social Media Analytics Dashboard

OrbitIQ is a modern React, Vite, and Tailwind CSS dashboard for social media analytics, AI content workflows, campaign tracking, team collaboration, and authentication screens. The project uses a mobile-first responsive layout, glassmorphism styling, dark/light mode, Recharts analytics, and Framer Motion animations.

## Features

- Responsive sidebar navigation for Dashboard, Analytics, Posts, Messages, Followers, Campaigns, and Settings.
- Top navbar with search, real-time notification simulation, profile dropdown, language selector, and theme toggle.
- Main dashboard metric cards for followers, likes, engagement rate, reach, impressions, ads revenue, and growth.
- Animated counters, smooth hover states, scroll reveal animations, and loading skeletons.
- Interactive line, bar, pie, and area charts powered by Recharts.
- Weekly and monthly analytics with platform-wise comparison for Instagram, YouTube, LinkedIn, and Twitter/X.
- Social feed with recent posts, engagement stats, trending hashtags, and scheduled posts table.
- AI caption generator UI, AI hashtag suggestions, best posting time recommendation, sentiment card, and insights panel.
- Export analytics as PDF using the browser print workflow.
- Drag-and-drop dashboard widgets.
- Team collaboration panel, real-time chat mockup, and social account integrations.
- Authentication screens for login, signup, and forgot password.
- Dark and light mode support with local storage persistence.

## Tech Stack

- React 19
- Vite 7
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Recharts
- clsx and tailwind-merge

## Folder Structure

```text
src/
  assets/
  charts/
    AnalyticsCharts.tsx
  components/
    AIWorkspace.tsx
    AuthPanel.tsx
    CollaborationPanel.tsx
    DraggableWidgets.tsx
    EmptyState.tsx
    GlassPanel.tsx
    Icon.tsx
    LoadingSkeleton.tsx
    MetricCard.tsx
    Sidebar.tsx
    SocialFeed.tsx
    Topbar.tsx
  data/
    dashboardData.ts
  hooks/
    useCountUp.ts
    useNotifications.ts
    useTheme.ts
  pages/
    DashboardPage.tsx
  services/
    exportService.ts
  utils/
    cn.ts
  App.tsx
  index.css
  main.tsx
```

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

Open the local URL shown in your terminal. Vite commonly uses:

```text
http://localhost:5173
```

### 3. Build For Production

```bash
npm run build
```

### 4. Preview Production Build

```bash
npm run preview
```

Vite commonly previews at:

```text
http://localhost:4173
```

## Available Scripts

- `npm run dev` starts the local development server.
- `npm run build` creates a production build.
- `npm run preview` previews the production build locally.

## Main Files

- `src/App.tsx` is the application entry point and dashboard shell.
- `src/pages/DashboardPage.tsx` controls dashboard section rendering.
- `src/data/dashboardData.ts` contains dummy analytics, posts, schedules, team, chat, and integration data.
- `src/charts/AnalyticsCharts.tsx` contains the Recharts visualizations.
- `src/index.css` contains Tailwind import, dark mode variant, and global styles.

## Notes

- This is a frontend-only project with dummy data.
- Backend features such as Node.js, Express.js, MongoDB, JWT authentication, and REST APIs can be added later.
- The PDF export uses the browser print dialog and can be saved as a PDF from there.
- Authentication pages are frontend UI screens and are not connected to a backend yet.

## Future Improvements

- Connect to a real REST API.
- Add JWT authentication and protected routes.
- Add MongoDB-backed analytics and campaign data.
- Add live WebSocket notifications and chat.
- Add role-based team permissions.
- Add real social platform integrations.
