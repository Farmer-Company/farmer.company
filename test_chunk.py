# The memory says:
# "To optimize Vite build chunk sizes and prevent Cloudflare deployment failures, vite.config.ts uses build.rollupOptions.output.manualChunks to split specific dependencies. The firebase-vendor chunk must explicitly list sub-packages (e.g., firebase/app, firebase/auth, @firebase/app, firebase/firestore, firebase/database, firebase/storage, firebase/app-check) instead of the catch-all firebase package to avoid Vite resolution errors. It also explicitly chunks market-data (src/data/Market.json), react-vendor (react, react-dom, react-router-dom), and three-vendor (three). Do NOT use a manual chunk for maplibre-gl. Do not use a catch-all chunking rule for node_modules as it generates too many tiny files. Set chunkSizeWarningLimit to 4000."
# This is exactly what I have.

# What about memory:
# "Cloudflare Pages 'Workers Builds' enforce a strict 1MB size limit per compiled asset chunk. Large libraries like maplibre-gl must be kept to v4.x (e.g., 4.7.1) and dynamically imported (via React.lazy) rather than manually chunked to stay safely under this limit."
# Is `maplibre-gl` dynamically imported via `React.lazy`?
# I imported `HeroMapBackground` dynamically via `React.lazy`. This splits `HeroMapBackground` and its dependencies (including maplibre-gl) into a separate chunk. That chunk is `HeroMapBackground-CKbziDZL.js` which is 798K.
# 798K is < 1MB limit.
# But wait... is there any OTHER file using `maplibre-gl` that isn't dynamically imported?
