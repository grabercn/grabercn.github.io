# Christian Graber - Personal Portfolio

> **Live site:** [grabercn.github.io](https://grabercn.github.io)

A modern, full-featured portfolio website built with React, featuring travel photography, music, an interactive resume, and more.

![Built with React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![Ant Design](https://img.shields.io/badge/Ant%20Design-5-0170FE?logo=antdesign)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite)
![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-222?logo=github)
![Last Updated](https://img.shields.io/badge/Updated-2026-05-07-green)

## Features

### Portfolio Home
- Glass morphism UI with purple gradient theme
- Scroll-synced navigation with IntersectionObserver
- About, Experience, Projects, Skills, Testimonials, Contact sections
- Photo of the Day showcase
- Dark mode toggle (system preference + manual)
- Skip-to-content & focus-visible accessibility
- Responsive hamburger menu on mobile

### Photography Gallery (`/#/photo`)
- **1062 photos** across 8 countries (Prague, London, Switzerland, Italy, Barcelona, Ireland, Japan, and more)
- Masonry grid layout with virtualized lazy-loading (IntersectionObserver)
- **Location filter pills** + debounced search
- **World map view** with interactive pins (pigeon-maps)
- Grid/Map view toggle
- Photo stats dashboard with animated counters
- Swipe gestures, arrow keys, and arrow buttons for modal navigation
- ScrollPreview sidebar (desktop) with thumbnail strip
- WebP images with JPEG fallback (`<picture>` tags)
- Back-to-top floating button
- Anti-AI metadata (XMP rights, PLUS DataMining prohibition)

### Music Page (`/#/music`)
- Deezer API integration for full discography
- Album/single modals with tracklists
- **30-second audio previews** with progress bars
- Spotify & Apple Music deep links
- Parallax hero section

### Interactive Resume (`/#/resume`)
- Timeline-based experience section
- Skill proficiency bars
- Print-friendly styles (`@media print`)
- PDF download option

### Other Pages
- `/#/desktop` - Desktop simulator mini-app
- `/#/datavis` - Data visualization playground
- `/#/cookie` - Cookie clicker game

## Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | React 18, Vite 5 |
| **UI** | Ant Design 5, Styled Components |
| **Animation** | Framer Motion, CSS transitions |
| **Routing** | React Router (HashRouter) |
| **Maps** | pigeon-maps |
| **Image Processing** | sharp (WebP, thumbnails, metadata) |
| **Deployment** | GitHub Pages (auto-deploy on push) |
| **PWA** | Service worker with network-first caching |

## Project Stats

| Metric | Count |
|--------|-------|
| Source files | 55 |
| Components | 39 |
| Photos | 1062 |
| Routes | `/,/photo,/music,/desktop,/datavis,/cookie,/resume,/*` |

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npx vite build

# Process photos (metadata strip + WebP + thumbnails + location tagging)
node scripts/process-photos.js

# Run individual pipeline steps
node scripts/process-photos.js --step 1  # Strip EXIF + anti-AI XMP
node scripts/process-photos.js --step 2  # Generate WebP + thumbnails
node scripts/process-photos.js --step 3  # Update JSON paths
node scripts/process-photos.js --step 4  # Tag locations
```

## Deployment

Deployment is **fully automatic** via GitHub Actions. Every push to `main` triggers:
1. `npm ci` + `vite build`
2. Deploy to GitHub Pages

No manual `npm run deploy` needed.

## Anti-AI Protection

All photos include multi-layer protection against AI training:
- `robots.txt` blocking 15+ AI crawlers
- `<meta name="robots" content="noai, noimageai">`
- XMP metadata with PLUS DataMining prohibition
- HTTP headers via `_headers` file

## Recent Changes

- Merge branch 'main' of https://github.com/grabercn/grabercn.github.io
- Enhance purple backgrounds; remove theme indicator
- docs: auto-update README [skip ci]
- Merge branch 'main' of https://github.com/grabercn/grabercn.github.io
- Introduce Navbar, add resume data, refactor pages
- docs: auto-update README [skip ci]
- Merge branch 'main' of https://github.com/grabercn/grabercn.github.io
- Refactor gallery toolbar and controls CSS
- docs: auto-update README [skip ci]
- Merge branch 'main' of https://github.com/grabercn/grabercn.github.io

## Easter Eggs

Try the Konami code on any page.

## License

This project is open source and available under the [MIT License](LICENSE).

---
*This README is auto-generated on each push to main via GitHub Actions.*
