# TMDB Explorer

React/Vite TMDB discovery app with a dynamic homepage, movie filters and sorting, search, pagination, and movie/TV detail pages.

## Run locally

Copy `.env.example` to `.env.local` and add either your TMDB API Read Access Token (recommended) or v3 API key.

```bash
npm install
npm run dev
```

## Routes

- `/` — hero search and trending movies/TV shows
- `/movie` — movie discovery, filters, sorting, and pagination
- `/movie/:id` — movie details
- `/tv/:id` — TV details
- `/search?query=...` — movie and TV search results

This product uses the TMDB API but is not endorsed or certified by TMDB.
