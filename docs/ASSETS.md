# Authentication and welcome artwork

Saved asset: `public/assets/welcome-hero.jpg` (941 × 1672 JPEG q82, ~148 KB). Supplied
directly by the user (not generated) as a 1.8 MB PNG, re-encoded to JPEG because it
shipped in the PWA precache and dominated first paint on a slow connection.

Used in two places:

- `.welcome-art` (`src/screens/auth/welcome.tsx`) — full-bleed, sharp, as the welcome screen's hero image. Preloaded from `index.html`, since a CSS background otherwise waits for the JS bundle to mount the element.
- `.auth-art` (`src/components/auth-layout.tsx`) — the same photo as the ambient backdrop behind login, invite, password recovery and 2FA. Blurred 22px and scaled, so it uses the inlined `--hero-lqip` thumbnail (`src/mobile-design.css`) instead and fetches nothing.

`--hero-lqip` is a 28 × 50 JPEG of the same photo as a data URI (~1 KB). It also sits
under the sharp image on the welcome screen so the first paint is the photo's colors
rather than a flat fill. Re-generate it alongside any replacement of the hero.

The previous AI-generated illustration (`auth-wellbeing.png`, made with the built-in image generator from a Pinterest-influenced prompt) has been superseded and removed now that both surfaces share this real photo.
