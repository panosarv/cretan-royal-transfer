# Homepage Mobile Redesign & ToursAirports Flip Cards

**Date:** 2026-04-24  
**Status:** Approved

## Overview

Four focused changes to improve mobile usability and add missing content:

1. Replace ServicesSection alternating rows with a flip card carousel
2. Add a new "About Us" company story section to the homepage
3. Add a "Call Us" button to the hero banner
4. Replace ToursAirports detail-panel interaction with flip cards

---

## 1. ServicesSection — Flip Card Carousel

### What changes
`src/components/ServicesSection.vue` — the alternating image+text rows are replaced with a horizontal carousel of 6 flip cards.

### Card anatomy

**Front face:**
- Full-bleed service image as background
- Gradient overlay (`from-black/70 via-black/20 to-transparent`) at the bottom
- Gold uppercase category badge
- Service title in white bold text
- Small "tap to flip" hint icon (e.g. a rotate/refresh SVG) in the top-right corner

**Back face:**
- `bg-brand-charcoal` solid background
- Gold uppercase category badge
- Service title in `text-stone-100`
- Description paragraph in `text-stone-300`
- Feature list using the existing arrow SVG icon (`/src/assets/icons/next.svg`), `text-stone-400`
- Gold "Book Now" `<RouterLink to="/book">` button

### Flip mechanic
- Each card maintains its own `flipped` boolean ref
- Click/tap toggles `flipped` → applies `.flipped` CSS class on the inner card wrapper
- CSS: `transform: rotateY(180deg)` on `.flipped`, with `perspective: 1000px` on the outer container and `backface-visibility: hidden` on both faces
- Cards are independent — flipping one does not affect others

### Carousel behavior
| Breakpoint | Cards visible | Navigation |
|---|---|---|
| Mobile (default) | 1 | Scroll-snap + dot indicators |
| Tablet (`sm:`) | 2 | Scroll-snap + dot indicators |
| Desktop (`lg:`) | 3 | Scroll-snap + prev/next arrow buttons |

- Implemented with `overflow-x: scroll`, `scroll-snap-type: x mandatory`, and `scroll-snap-align: start`
- Dot indicators below the carousel show current position; clicking a dot scrolls to that card
- Arrows (desktop) are absolutely positioned left/right of the carousel container

### Card dimensions
- Height: `h-[400px]`
- Width: `w-[280px]` mobile, flexible on larger breakpoints to fill available columns

---

## 2. About Us Section — New Homepage Component

### What changes
New file `src/components/AboutUsSection.vue` inserted in `src/pages/Home.vue` **between** `<ServicesSection />` and the existing wave divider that leads into `<AboutSection />` (Why Choose Us).

### New homepage order
1. HeroBanner
2. ServicesSection (carousel)
3. **AboutUsSection** ← new
4. Wave divider (brand-stone → brand-charcoal)
5. AboutSection (Why Choose Us)
6. Meet the Team

### Layout
- `bg-brand-stone` background
- Section header: small gold uppercase label "ABOUT US", then an `<h2>` headline ("Cretan Royal Transfer" or equivalent)
- **Desktop:** two-column grid (`lg:grid-cols-2`)
  - Left: company story text + bullet list
  - Right: decorative image collage (reusing `reliability-aboutus.jpg`, `safety-aboutus.jpg`, `airport-aboutus.jpg`)
- **Mobile:** stacked — text first, images below

### Content
Text sourced from `src/components/aboutus.txt` (Greek). Hardcoded directly in the component (not i18n keys) as it is brand identity copy unlikely to change per locale. If English translation is needed in the future, it can be added to locale files.

The bullet list ("Γιατί να επιλέξετε...") is rendered as a styled list with gold checkmark or arrow icons, matching the site's existing icon style.

### Animations
Follows existing `v-motion` patterns: fade+slide-in on scroll using `:visible-once`.

---

## 3. HeroBanner — "Call Us" Button

### What changes
`src/components/HeroBanner.vue` — a second CTA button added alongside the existing "Book Us" button.

### Button spec
- Text: "Call Us" (or locale key equivalent)
- Tag: `<a href="tel:+306973857378">`
- Style: outlined — `border-2 border-white text-white` with `hover:bg-white/10` and `hover:scale-105` transitions
- Same dimensions as Book button: `px-8 py-4 rounded-lg text-lg font-semibold`

### Layout
- Buttons wrapped in `flex flex-col sm:flex-row gap-4`
- On very small screens they stack vertically; on `sm:` and above they sit side by side

---

## 4. ToursAirports Page — Flip Card Grid

### What changes
`src/pages/ToursAirports.vue` — the click-to-expand detail panel is removed and replaced with in-place CSS 3D flip cards.

### Card anatomy
Same as ServicesSection flip cards (front/back structure, flip mechanic) with these differences:
- Grid layout retained: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` — no carousel (dedicated full page, 16 cards)
- Card height: `h-[320px]` (slightly shorter than services cards — enough for description + 3 features + button)
- The existing selected-service highlight ring and detail panel below the grid are **removed entirely**

### Removed
- `selectedService` ref
- `selectService()` function  
- The `<Transition name="detail-panel">` detail panel block
- The `.detail-panel-enter-active` / `leave-active` scoped styles

### Flip mechanic
Each card has its own `flipped` ref (array indexed by card index). Tap/click toggles that card's flip state. All 16 cards are independent.

---

## Files Affected

| File | Change |
|---|---|
| `src/components/ServicesSection.vue` | Rewrite — flip card carousel |
| `src/components/AboutUsSection.vue` | New file — About Us company story |
| `src/pages/Home.vue` | Add `<AboutUsSection />` import and placement |
| `src/components/HeroBanner.vue` | Add "Call Us" button |
| `src/pages/ToursAirports.vue` | Rewrite cards — CSS 3D flip, remove detail panel |

## Files NOT affected
- `src/components/AboutSection.vue` (Why Choose Us — unchanged)
- `src/components/MeetTheTeam.vue`
- `src/components/Navbar.vue`
- `src/components/ContactSection.vue`
- Locale files (no new i18n keys needed for hardcoded About Us text)
