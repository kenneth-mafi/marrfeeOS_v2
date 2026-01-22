RPS (Rock Paper Scissors) — App Documentation

Location: src/APPS/RPS

Overview
- App name used in registry: `RPS` (registered via `download(addApp)` in `src/RockPaperScissors.jsx`).
- Purpose: Small game with launch, game, and rules pages using a dedicated game provider.

Top-level files
- `index.js` — exports default `RockPaperScissors` component.
- `src/RockPaperScissors.jsx` — main entry: routes, `RPSGameProvider`, `download(addApp)`.

Key structure
- `src/providers/` — `RPSGameProvider` contains game state and logic.
- `src/Pages/` — `launchPage`, `gamePage`, `rulesPage` components.
- `src/components/`, `hooks/`, `contexts/` — UI, helpers and context used by the game.

Routing & Providers
- The app is wrapped with `RPSGameProvider` so game state is available to pages.
- Routes: index -> redirects to `rpsLaunchPage`, plus `rpsGamePage`, `rpsRulesPage`.

How to register the app
- The `download(addApp)` function is exported and registers app metadata: `appName`, `appLogo`, `path` (`/rpsGameApp`), `id`, `color`, and `allowedDevices`.

Usage & development notes
- Quick test: add the app via `download(addApp)` during app registration, open the registered path and navigate to the launch page.
- Game logic lives in the `RPSGameProvider`; to add features (AI difficulty, match history) extend that provider.

Extension suggestions
- Provide a `demoMode` in `RPSGameProvider` to auto-play matches for UI testing.
- Add a small `scores` persistence using localStorage in the provider.

Important files
- `src/RockPaperScissors.jsx` — entry and routes
- `src/providers/RPSGameProvider` — core game state
- `src/Pages/*` — launch, game, rules UI

Run (project-level)
- From repo root:

```bash
npm install
npm run dev
```

- App path: `/rpsGameApp`.

----------------
