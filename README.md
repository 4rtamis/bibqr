# bibqr

**bibqr** is a mobile-first bibliography visualizer.  
It lets you share the sources behind your paper or presentation in a clean, readable format — complete with tags, optional descriptions, and links. A built-in QR code makes it easy for your audience to scan and explore your references.

## ✨ Features

- Chicago-style source display (from JSON file)
- **Recommended** vs. other sources
- Tags and optional descriptions for each entry
- Share sheet with **QR code** + copy link
- Dark/Light/System theme toggle (with persistence)
- Mobile-first responsive design

## 🛠️ Tech stack

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) bundler
- [Tailwind CSS v4](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/) components
- [qrcode.react](https://github.com/zpao/qrcode.react) for QR codes
- [react-markdown](https://github.com/remarkjs/react-markdown) for markdown rendering

## 🚀 Getting started

```bash
# Install dependencies
npm install

# Run in dev mode
npm run dev

# Build for production
npm run build
```

Place your sources in `public/sources.json` using this schema:

```json
{
  "id": "unique-id",
  "citationChicago": "Formatted citation string",
  "tags": ["tag1", "tag2"],
  "description": "Optional notes or context",
  "link": "https://optional-link",
  "recommended": true
}
```

## 📄 License

MIT
