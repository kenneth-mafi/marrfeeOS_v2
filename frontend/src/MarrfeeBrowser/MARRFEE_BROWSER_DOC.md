# Marrfee Browser — Documentation

Location: `src/Browser`

Purpose
- The Marrfee Browser is an in-app browser component that renders a simple tabbed browsing experience inside MarrfeeOS. It relies on a small in-app "web registry" (`BrowserProvider`) that allows pages (React components) to be "deployed" and then visited by URL keys.

High-level overview (what this folder contains)
- `index.js` — re-exports the Browser app default (entry for app registry).
- `plan.txt` — developer notes (existing file).
- `src/` — main source for the browser app:
  - `MarrfeeBrowser.jsx` — router entry + `download(addApp)` helper used to register this app into the global Apps registry.
  - `pages/` — pages used by the browser app (home page, main frames, default page view).
  - `Components/` — UI components used by the browser (Tabs, UrlSearchBox, BrowserTabRenderer, TabsContainer).
  - `utils/` — helpers (e.g. `utils.js` exports `isValidWebsite`).
  - `assets/` — icons and images for the browser UI.

Key files explained

- src/MarrfeeBrowser.jsx
  - Exports default React component `MarrfeeBrowser` (a small `Routes` tree). It also exports a named function `download(addApp)` which accepts the global `addApp` function and registers the browser with the app registry using an object like:
    {
      id: 'marrfeeBrowser',
      appName: 'Marrfee Browser',
      path: '/marrfeeBrowser',
      appLogo: appLogo,
      color: 'whitesmoke',
      allowedDevices: ['desktop','laptop']
    }
  - Note: `index.js` currently only re-exports default; to import `download` you can import directly from `src/Browser/src/MarrfeeBrowser.jsx`:

```javascript
import MarrfeeBrowser, { download as downloadBrowser } from './src/Browser/src/MarrfeeBrowser';
// then call downloadBrowser(addApp) to register the app
```

- src/pages/HomePage/MBrHomePage.jsx
  - Renders the home page frame which mounts `TabsFrame` (the main tabbed browsing UI).

- src/Components/TabsContainer/TabsFrame.jsx
  - Core UI handling tab state and active tab content.
  - Manages tabs (array of objects with `title`, `icon`, `pageUrl`, and `id`).
  - Renders a `UrlSearchBox` (to accept a URL) and a `BrowserTabRenderer` that loads the page for the active tab.
  - Calls `visitWebpage(url)` from `useBrowserContext()` to resolve a deployed site.
  - Key behaviours:
    - `addNewTab()` — adds a new tab with default state
    - `handleSearch()` — uses `visitWebpage()` to fetch site info and updates the active tab's `pageUrl`, `title`, and `icon`.

- src/Components/BrowserTabRenderer/*
  - Responsible for rendering the `Page` component returned by the Browser registry for a given `pageUrl`.

- src/utils/utils.js
  - Exports `isValidWebsite(siteData)` — performs basic validation of website data shape (expects `title`, `icon` and a `pages` map or `Page` component).

Cross-folder behaviors / runtime context
- The browser relies on a `BrowserContext` provider (`GlobalProviders/BrowserProvider.jsx`) mounted near the app root.
  - `deployToWeb(site)` — adds a site object to the in-memory `webPages` registry under a key (`site.url` or auto-generated key). Accepts either `siteData` or `{ siteData }` shapes.
  - `visitWebpage(url)` — returns `{ Page, title, icon, pages }` if the url exists in the registry. `TabsFrame` uses this to fetch a page and update tab UI.

Data shapes / API contracts
- App registration object (used by `download(addApp)`):
  - `id` (string), `appName` (string), `path` (string), `appLogo` (any importable asset), `color` (string), `allowedDevices` (array).

- Website / siteData (for deployToWeb)
  - Minimal valid shape (examples):

Single page site:
```javascript
{
  url: 'my-site',        
  title: 'My Site',
  icon: myIcon,
  Page: MySinglePageComponent
}
```

Multi-page site:
```javascript
{
  url: 'my-shop',
  title: 'Shop',
  icon: shopIcon,
  pages: {
    Main: ShopMainComponent,
    Cart: CartPageComponent
  }
}
```

BrowserProvider behavior notes
- `deployToWeb(siteData)` stores the site under the provided `url` or a generated key like `site-<timestamp>`.
- `visitWebpage(url)` returns `undefined` if not found. TabsFrame expects a returned object with a `Page` property or `pages` map.
- `utils.isValidWebsite` (in `src/Browser/src/utils/utils.js`) performs additional validation and can be used by custom deploy logic.

Mind map (text)
- Marrfee Browser (src/Browser)
  - index.js -> exports default MarrfeeBrowser
  - src/MarrfeeBrowser.jsx
    - Routes -> MBrHomePage
    - named export `download(addApp)` to register the app
  - src/pages/
    - HomePage -> mounts TabsFrame
    - DefaultBrowserPage -> fallback when no pageUrl
  - src/Components/
    - TabsContainer (TabsFrame.jsx)
      - Tabs (Tab components)
      - UrlSearchBox (input + search button)
      - BrowserTabRenderer (renders deployed page)
    - BrowserTabRenderer -> loads `Page` from BrowserContext.visitWebpage
  - src/utils/utils.js -> `isValidWebsite()`
  - assets -> logos and icons
  - GlobalProviders/BrowserProvider.jsx (outside this folder, required at app root)
    - `deployToWeb()` / `visitWebpage()` — in-app registry

How to use the Browser (developer guide)

1) Registering the Browser app in the global Apps registry
- If your app registry uses an `addApp` function, register this browser by calling the `download` helper exported from the component file:

```javascript
import MarrfeeBrowser, { download as downloadBrowser } from './src/Browser/src/MarrfeeBrowser';
// in your app registration code
downloadBrowser(addApp);
```

Note: `src/Browser/index.js` exports the default component but does not re-export the named `download` helper. Import the helper from `src/Browser/src/MarrfeeBrowser.jsx` if needed.

2) Deploying websites/pages into the in-app web registry
- The browser depends on a `BrowserProvider` higher in the component tree. The provider exposes `deployToWeb(siteData)` which you can call to make a site available by a URL key.

Example deploy:
```javascript
// anywhere within the BrowserProvider context (e.g., at app boot)
const site = {
  url: 'my-site',
  title: 'My Site',
  icon: myIcon,
  pages: {
    Home: MyHomeComponent,
    About: AboutComponent
  }
};
deployToWeb(site);
```
- Then in the Browser UI, search or open `my-site` (use the same `url` key).

3) Visiting a page from TabsFrame
- When a user enters a URL in `UrlSearchBox`, `TabsFrame.handleSearch()` calls `visitWebpage(url)` from `useBrowserContext()`.
- If `visitWebpage` returns a valid site, the active tab is updated to show `BrowserTabRenderer` for that page; otherwise nothing happens.

4) Extending behavior
- To add features like history, bookmarking, or richer routing between `pages` within a deployed site, update `BrowserProvider` to store additional metadata (history stacks, per-site routing helpers) and extend `BrowserTabRenderer` to use them.
- Use `utils.isValidWebsite` as a validation helper before deploying sites.

How to run (project-level)
- From the project root (this repository uses Vite):

```bash
npm install
npm run dev
```

- Open the app in the browser at the Vite URL. The MarrfeeOS shell should mount `GlobalProviders` including `BrowserProvider`. Ensure `BrowserProvider` is present (it is in `src/GlobalProviders/BrowserProvider.jsx`) and wrapped around the app root so `useBrowserContext()` works.

Troubleshooting
- If a search returns nothing, confirm the site was deployed to the registry using the same `url` key (or inspect `webPages` state in `BrowserProvider`).
- If `download(addApp)` does not register the Browser, import the helper correctly from `src/Browser/src/MarrfeeBrowser.jsx` and call it in your apps registration phase.
- If pages do not render, ensure deployed site object has a `Page` or a `pages` map where each value is a function/component (see `utils.isValidWebsite`).

Next steps / suggestions
- Consider re-exporting `download` from `src/Browser/index.js` (so consumers can `import { download } from 'src/Browser'`).
- Add a small example deploy script in this folder that programmatically deploys a demo site at startup for easier testing.

File references
- See [src/Browser](src/Browser) for the app root.
- Component entry: [src/Browser/src/MarrfeeBrowser.jsx](src/Browser/src/MarrfeeBrowser.jsx)
- Provider: [src/GlobalProviders/BrowserProvider.jsx](src/GlobalProviders/BrowserProvider.jsx)
- Utilities: [src/Browser/src/utils/utils.js](src/Browser/src/utils/utils.js)

---

