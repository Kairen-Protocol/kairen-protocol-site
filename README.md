# Kairen Protocol Website

The official landing page for Kairen Protocol - Infrastructure for Autonomous AI Agents.

## 🚀 Features

- **Interactive 3D Animations**: Built with Three.js and React Three Fiber
- **Responsive Design**: Mobile-first, fully responsive across all devices
- **Modern Stack**: Next.js 16, TypeScript, Tailwind CSS, Framer Motion
- **Agentic UI/UX**: Futuristic, minimal design reflecting autonomous agent ecosystem

## 🏗️ Project Structure

```
website/
├── app/
│   ├── globals.css          # Global styles and Tailwind
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main landing page
├── components/
│   ├── 3d/
│   │   ├── KairenScene.tsx     # Hero 3D background
│   │   ├── NetworkNodes.tsx    # Animated network visualization
│   │   └── ProtocolLayers.tsx  # Interactive layer stack
│   ├── sections/
│   │   ├── Hero.tsx           # Hero section
│   │   ├── About.tsx          # Problem/Solution
│   │   ├── HowItWorks.tsx     # Protocol layers
│   │   ├── Whitepaper.tsx     # Interactive docs
│   │   └── Wishlist.tsx       # Waitlist signup
│   ├── Navigation.tsx         # Top nav
│   └── Footer.tsx             # Footer
└── public/
    └── fonts/                 # Custom fonts (if needed)
```

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **3D Graphics**: Three.js, React Three Fiber, React Three Drei
- **Animations**: Framer Motion
- **Package Manager**: npm

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🌐 Development

**Local Development**: The development server runs at `http://localhost:3000`

**Production**: Live site at `https://kairen.xyz`

### Key Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Design System

### Colors

- **kairen-darker**: #050508 (Background)
- **kairen-dark**: #0a0a0f (Cards)
- **kairen-blue**: #3b82f6 (Primary)
- **kairen-cyan**: #06b6d4 (Secondary)
- **kairen-purple**: #8b5cf6 (Accent)
- **kairen-accent**: #10b981 (Success)

### Typography

- **Sans**: Inter (headings, body)
- **Mono**: JetBrains Mono (code, labels)

## 🌐 Live Services

The Kairen Protocol operates across multiple domains:

- **Main Site**: https://kairen.xyz
- **X402N (Payments & Negotiations)**: https://x402n.kairen.xyz - LIVE
- **Market (Service Aggregator)**: https://market.kairen.xyz - LIVE
- **AgentNet (Network Routing)**: https://net.kairen.xyz - Coming Soon
- **ForgeID (Identity & Reputation)**: https://id.kairen.xyz - Coming Soon

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Other Platforms

The site can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Cloudflare Pages
- Digital Ocean App Platform

## 📝 Content Updates

### Updating Sections

Each section is a standalone component in `components/sections/`. Edit the content directly in these files:

- **Hero**: Update headline, tagline, stats
- **About**: Modify problem/solution narrative
- **HowItWorks**: Add/edit protocol layers
- **Whitepaper**: Update document sections
- **Wishlist**: Configure email integration

### Adding 3D Scenes

Create new Three.js components in `components/3d/` following the existing patterns:
- Use `useFrame` for animations
- Keep geometries simple for performance
- Add to Canvas with Suspense wrapper

## 🎯 Roadmap

- [ ] Connect waitlist form to email service (Mailchimp/ConvertKit)
- [ ] Add blog section for protocol updates
- [ ] Create documentation subsite at /docs
- [ ] Add live protocol stats dashboard
- [ ] Multi-language support

## 📄 License

MIT License - See LICENSE file for details

## 🤝 Contributing

This is the official Kairen Protocol website. For issues or suggestions, please open an issue on GitHub.

---

Built with ❤️ for the autonomous agent economy
