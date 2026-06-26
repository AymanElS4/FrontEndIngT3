# FrontEndIng

Frontend application for the **Legal Catalog System** (LegalFileManager).
Built with React 18 + TypeScript + Vite + Tailwind CSS.

> **Important — full deployment**: this frontend is only one half of the system.
> A working environment also requires the backend project:
> [https://github.com/AymanElS4/BackEndIngT3.git](https://github.com/AymanElS4/BackEndIngT3.git).
> This app consumes the REST API exposed by that backend. Both must be running
> (locally or in their respective hosts) for the system to be usable end-to-end.

## Requirements

- Node.js 18 or higher
- npm

## Installation

1. Open a terminal in the frontend folder.

2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```

   > The `--legacy-peer-deps` flag is required because the project currently uses
   > both Radix UI and Material UI, which declare conflicting peer dependencies.
   > Removing the flag will cause `npm install` to fail.

## Environment variables

The frontend reads the backend URL from `VITE_API_URL`. Create a `.env` file in the
root of the project before running the app:

```bash
# .env
VITE_API_URL=http://localhost:8000/api
```

If `VITE_API_URL` is not defined, the application falls back to
`http://localhost:8000/api`. When pointing to a deployed backend (e.g., Render)
override this variable accordingly:

```bash
VITE_API_URL=https://<your-backend>.onrender.com/api
```

## Running the frontend

Start the development server:

```bash
npm run dev -- --host
```

This starts the Vite dev server at:

- http://localhost:5173/

The `--host` flag exposes the server on the local network, which is useful for
testing on other devices.

## Build

Generate the production assets:

```bash
npm run build
```

The build output is written to `dist/`. This is the folder that gets deployed to
Vercel.

## Preview a production build locally

Before deploying, you can serve the built bundle locally to validate it:

```bash
npm run preview
```

## Lint

Check the codebase with ESLint:

```bash
npm run lint
```

Automatically fix issues that can be fixed:

```bash
npm run lint:fix
```

## Project structure

```
FrontEndIng/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
└── src/
    ├── main.tsx
    ├── styles/
    └── app/
        ├── App.tsx
        ├── context/
        │   └── AuthContext.tsx        # JWT + session state
        ├── services/
        │   └── api.ts                 # HTTP client (uses VITE_API_URL)
        └── components/
            ├── ui/                    # shadcn + Radix primitives
            ├── figma/                 # imported Figma designs
            └── ...                    # feature components (Dashboard, Cases, PDF Viewer, etc.)
```
