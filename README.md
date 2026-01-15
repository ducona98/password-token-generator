# 🔐 Password & Token Generator (React)

A **100% client-side** developer utility built with **React + TypeScript** for generating secure passwords, tokens, UUIDs, and hashes.

No backend. No tracking. Just fast, local, and secure.

---

## ✨ Features

### Password Generator

- Configurable length
- Uppercase / Lowercase / Number / Special toggle
- Password strength indicator
- One-click copy

### Token Generator

- UUID v4 generator
- Random token (hex / base64)
- Regenerate & copy

### Hash Generator

- SHA-256 hashing via Web Crypto API
- Copy hash output

### UX

- Dark / Light mode
- Preset configs (Strong / Medium / Simple)
- LocalStorage persistence

---

## 🛠 Tech Stack

- React 19+
- TypeScript (strict)
- React Router v7
- Vite
- Tailwind CSS v4
- Web Crypto API
- localStorage

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Build for GitHub Pages
npm run build:gh-pages

# Deploy to GitHub Pages (requires gh-pages package)
npm run deploy

# Type check
npm run typecheck
```

## 📦 Deployment

### GitHub Pages

This project is configured to automatically deploy to GitHub Pages using GitHub Actions.

1. Push your code to the `main` branch
2. GitHub Actions will automatically build and deploy to GitHub Pages
3. Your site will be available at: `https://<username>.github.io/password-token-generator/`

**Note:** If your repository name is different, update the `BASE_PATH` in:
- `.github/workflows/deploy.yml`
- `package.json` scripts
- `react-router.config.ts`

---

## 📁 Project Structure

```
app/
 ├─ components/
 │   ├─ PasswordGenerator.tsx
 │   ├─ TokenGenerator.tsx
 │   ├─ HashGenerator.tsx
 │   └─ StrengthBar.tsx
 ├─ hooks/
 │   ├─ usePassword.ts
 │   ├─ useClipboard.ts
 │   ├─ useLocalStorage.ts
 │   └─ useTheme.ts
 ├─ utils/
 │   ├─ password.ts
 │   ├─ token.ts
 │   └─ hash.ts
 ├─ routes/
 │   └─ home.tsx
 ├─ root.tsx
 ├─ routes.ts
 └─ app.css
```

---

## 🧩 Component Breakdown

### `PasswordGenerator`

- UI + state for password rules
- Length slider (4-64 characters)
- Character type toggles (lowercase, uppercase, numbers, symbols)
- Preset buttons (Strong, Medium, Simple)
- Real-time strength calculation
- One-click copy functionality
- Uses `usePassword` hook

### `TokenGenerator`

- UUID v4 generator with copy
- Random token generator (hex/base64)
- Configurable token length
- Copy functionality

### `HashGenerator`

- Text input for hashing
- Real-time SHA-256 hash generation
- Copy hash output
- Uses Web Crypto API

### Hooks

- `usePassword` – password generation logic with presets
- `useClipboard` – copy to clipboard with feedback
- `useLocalStorage` – persist configuration
- `useTheme` – dark/light mode toggle with persistence

---

## 🧠 Core Logic Examples

### Password generation

```ts
export function generatePassword(opts: Options): string {
  const pools = [];
  if (opts.lower) pools.push("abcdefghijklmnopqrstuvwxyz");
  if (opts.upper) pools.push("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
  if (opts.number) pools.push("0123456789");
  if (opts.symbol) pools.push("!@#$%^&*()_+-=[]{};");

  const chars = pools.join("");
  return Array.from({ length: opts.length })
    .map(() => chars[Math.floor(Math.random() * chars.length)])
    .join("");
}
```

### SHA-256 hash

```ts
export async function sha256(text: string): Promise<string> {
  const data = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
```

---

## 🗺 Roadmap

- [x] Password generator
- [x] Token & UUID generator
- [x] Hash generator
- [x] Dark / Light mode
- [x] LocalStorage persistence
- [x] Password strength indicator
- [x] Preset configurations
- [ ] JWT dummy generator
- [ ] Password history
- [ ] PWA support

---

## 🧪 Dev Quality Checklist

- [x] No `any` types
- [x] Hooks isolated from UI
- [x] Components < 250 LOC
- [x] Accessible inputs (labels, aria-labels)
- [x] Mobile-friendly (responsive design)
- [x] Dark mode support
- [x] TypeScript strict mode

---

## 📄 License

MIT

---

## 💡 Notes

This project is designed to:

- Demonstrate **clean React architecture**
- Showcase **Web Crypto API usage**
- Be reusable as a real dev tool
