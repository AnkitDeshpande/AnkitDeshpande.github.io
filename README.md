# Ankit Deshpande — Portfolio

Personal portfolio website built with **React 19**, **TypeScript**, and **Tailwind CSS v4**. Showcases my experience as a Backend Developer working with Java, Spring Boot, AWS, and Azure.

**Live site:** [ankitdeshpande.github.io](https://ankitdeshpande.github.io)

---

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | React 19 + TypeScript 5 |
| Build Tool | Vite 6 |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| Icons | Lucide React |
| Effects | react-type-animation, react-github-calendar |

---

## Sections

- **Home** — Hero with typewriter animation, profile picture, and social links
- **About** — Bio, stats (years of experience, projects, companies), and resume download
- **Skills** — Accordion skill groups with animated progress bars and a categorised tech stack grid (Backend · AWS · Azure · Frontend · Tools)
- **GitHub Activity** — Stats cards and contribution calendar
- **My Journey** — Road-style timeline with Work / Education tab toggle
- **Projects** — Multi-layout project showcase (Spotlight · Grid · Slider) with live and source links
- **Contact** — Contact details and message form

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/AnkitDeshpande/AnkitDeshpande.github.io.git
cd AnkitDeshpande.github.io
```

### 2. Install dependencies

```bash
# Recommended
bun install

# Alternatively
npm install
yarn
pnpm install
```

> Don't have Bun? Install it: `curl -fsSL https://bun.sh/install | bash`

### 3. Start the dev server

```bash
bun run dev   # or: npm run dev / yarn dev / pnpm dev
```

Runs on `http://localhost:1998`

### 4. Build for production

```bash
bun run build   # or: npm run build / yarn build / pnpm build
```

---

## Deployment

Automatically deployed to **GitHub Pages** via GitHub Actions on every push to `master`.

Workflow: `.github/workflows/deploy.yml`
- Installs dependencies with Bun
- Builds with Vite
- Deploys the `dist/` folder to GitHub Pages

To enable on a fork: go to repo **Settings → Pages → Source** and select **GitHub Actions**.

---

## Project Structure

```
src/
├── components/       # React components (Home, About, Skills, Projects, etc.)
├── data/             # Static data files (projects, skills, qualification)
└── main.tsx          # App entry point

public/
├── assets/svgs/      # Tech stack icons
├── img/              # Project screenshots and profile picture
└── Ankit-Deshpande-Resume.pdf
```

---

## Contact

- **Email:** ankitdeshpande1998@gmail.com
- **LinkedIn:** [ankit-deshpande](https://www.linkedin.com/in/ankit-deshpande/)
- **GitHub:** [AnkitDeshpande](https://github.com/AnkitDeshpande)
