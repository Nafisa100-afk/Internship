# City Connect — Frontend

A responsive React + TypeScript + Vite starter for the City Connect complaint-management platform.

## Included
- All 27 routes listed in the supplied master prompt
- Public pages, citizen area, Ward Clerk area, Department Clerk area, Mayor dashboard, System Admin pages
- Role-aware route guards and a demo role switcher for local UI testing
- Warm beige design foundation from the prompt, with restrained teal, coral and gold accents
- Responsive sidebar, cards, charts, accessible forms, status chips, tables and mobile navigation
- Mock/demo content is labelled as demo content; no fake API connection is implied

## Run locally
1. Install Node.js LTS (18+ recommended).
2. Extract the ZIP and open this folder in VS Code.
3. In the terminal run:
   ```bash
   npm install
   npm run dev
   ```
4. Open the local URL shown by Vite, usually `http://localhost:5173`.

## Production build
```bash
npm run build
npm run preview
```

## API integration notes
This package is a frontend scaffold. It does not claim to connect to a real backend. Before production:
- Replace demo data and demo login/role selection with the project's real authentication and API client.
- Configure endpoints from the backend specification; no endpoints have been invented here.
- Enforce authorization on the backend as well as the UI.
- Keep internal notes and private citizen details hidden from public tracking.
- Public complaint tracking should use the 16-character tracking token described in the prompt.
- The demo role switcher is for preview only and must be removed or disabled in production.


## Sign-in page
Open `/login` or use the **Sign in** links in the site header and homepage. The login form is a demo preview only; real authentication requires backend/API integration. The original colour palette is unchanged.
