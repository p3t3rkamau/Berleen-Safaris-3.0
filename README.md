
  # Read Attached Document

  Tours Website

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.
  

  # Safari Data System

## Folder Structure

```
src/
├── data/
│   ├── loadSafaris.ts          ← auto-discovers all JSON files
│   └── json/
│       ├── kenya/
│       │   ├── best-kenya-safari-south.json
│       │   └── maasai-mara-classic.json
│       ├── tanzania/
│       │   └── serengeti-wildebeest.json
│       └── uganda/
│           └── gorilla-trekking.json
├── types/
│   └── safari.ts               ← TypeScript interface
├── components/
│   └── safari-detail/
│       ├── SafariGallery.tsx
│       ├── SafariOverview.tsx
│       ├── SafariTabs.tsx
│       ├── SafariInclusions.tsx
│       └── SafariBookingSidebar.tsx
└── pages/
    └── SafariDetail.tsx        ← composes all sub-components
```

## Adding a New Safari

1. Create a `.json` file in the matching country folder:
   ```
   src/data/json/kenya/my-new-safari.json
   ```
2. That's it. Vite's `import.meta.glob` will pick it up automatically on the next dev-server reload (or build). No code changes required.

## JSON Schema

See `src/types/safari.ts` for the full TypeScript interface. Key fields:

| Field | Type | Notes |
|---|---|---|
| `id` | string | Must match the filename (kebab-case) |
| `country` | string | Used for SEO + future filtering |
| `category` | string | `luxury` / `mid-range` / `budget` |
| `experience` | string | `wildlife` / `beach` / `cultural` / `gorilla` |
| `pricing` | object | `lowSeason` + `highSeason` each with `solo`, `twoPersons`, `group` |
| `gallery` | string[] | Paths relative to `/public` |
| `itinerary` | ItineraryDay[] | `{ day, title, description }` |

## SEO Notes

- Each country subfolder maps to a URL segment: `/safaris/kenya/best-kenya-safari-south`
- The `country` field in JSON powers the `<title>` and meta description on the detail page
- Add `getCountries()` and `getCategories()` from `loadSafaris.ts` to build filter dropdowns

## Planned Features (search & sort)

`loadSafaris.ts` already exports helpers ready for the filter/search UI:

```ts
loadSafaris()      // all safaris, sorted by price
getSafariById(id)  // single safari
getCountries()     // ['Kenya', 'Tanzania', ...]
getCategories()    // ['budget', 'luxury', ...]
```

You can extend these with filter params when building the search page:
```ts
loadSafaris().filter(s =>
  s.country === selectedCountry &&
  s.price <= maxPrice
)
```