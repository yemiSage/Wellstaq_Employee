# Authentication and welcome artwork

Saved asset: `public/assets/welcome-hero.png` (941 × 1672 PNG, ~1.8 MB).

Supplied directly by the user (not generated). Used in two places:

- `.welcome-art` (`src/screens/auth/welcome.tsx`) — full-bleed, sharp, as the welcome screen's hero image.
- `.auth-art` (`src/components/auth-layout.tsx`) — the same photo, heavily blurred, as the ambient backdrop behind login, invite, password recovery and 2FA.

The previous AI-generated illustration (`auth-wellbeing.png`, made with the built-in image generator from a Pinterest-influenced prompt) has been superseded and removed now that both surfaces share this real photo.

The file is uncompressed and sizeable; if the PWA precache size becomes a concern, re-export it as a compressed JPEG before it ships.
