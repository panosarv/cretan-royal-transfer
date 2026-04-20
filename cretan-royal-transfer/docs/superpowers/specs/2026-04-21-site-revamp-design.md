# Site Revamp Design Spec
**Date:** 2026-04-21
**Project:** Cretan Royal Transfer

---

## Overview

Full visual and motion revamp of all three pages (Home, Tours & Airports, Book) plus all shared components. Approach: fix the one structurally broken component (AboutSection carousel), enhance everything else in-place with new typography, design tokens, scroll animations, parallax, route transitions, and card hover effects. No new pages or routes.

---

## Approach

**Option C — Targeted rewrite + enhancement:**
- Fix `AboutSection` carousel: replace fragile `getElementById` DOM manipulation with Vue reactive `ref` + `setInterval`
- Enhance all other components in-place (new classes, motion directives, parallax)
- Add design tokens to `tailwind.config.js`
- Add fonts to `index.html`
- Add `@vueuse/motion` plugin
- Add one `useParallax` composable using `@vueuse/core`
- Wrap `<RouterView>` in `App.vue` with a page transition

---

## Section 1: Typography & Design Tokens

### Fonts

Add to `index.html` `<head>`:
```html
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
```

Remove existing Schibsted Grotesk link.

Apply in `src/style.css`:
```css
body {
  font-family: 'Inter', sans-serif;
}
h1, h2, h3, h4, h5, h6 {
  font-family: 'Plus Jakarta Sans', sans-serif;
}
```

### Color Tokens

Add to `tailwind.config.js` under `theme.extend.colors`:
```js
brand: {
  gold:        '#D8A444',
  'gold-dark': '#B4952E',
  dark:        '#1A1A1A',
  charcoal:    '#2C2C2C',
  stone:       '#F5F0E8',
}
```

Replace all hardcoded color references across components:
- `#2C2C2C` → `brand-charcoal`
- `#1C1C1C` → `brand-dark`
- `#D8A444` → `brand-gold`
- `#B4952E` → `brand-gold-dark`
- `stone-50` / `bg-white` (section backgrounds) → `brand-stone`
- `bg-stone-800` / `bg-stone-900` buttons → `bg-brand-gold text-brand-charcoal hover:bg-brand-gold-dark`

---

## Section 2: Motion & Animation System

### Dependency

```bash
npm install @vueuse/motion
```

Register in `src/main.js`:
```js
import { MotionPlugin } from '@vueuse/motion'
app.use(MotionPlugin)
```

### Scroll-triggered entrance animations

Standard heading entrance:
```html
v-motion
:initial="{ opacity: 0, y: 40 }"
:visible-once="{ opacity: 1, y: 0, transition: { duration: 600 } }"
```

Staggered card entrance (applied per card with index):
```html
v-motion
:initial="{ opacity: 0, y: 30 }"
:visible-once="{ opacity: 1, y: 0, transition: { delay: index * 100, duration: 500 } }"
```

Applied to: section headings, service cards, about feature icons, tour selector buttons, contact items.

### Parallax composable

Create `src/composables/useParallax.js`:
```js
import { ref, onMounted, onUnmounted } from 'vue'

export function useParallax(speed = 0.3) {
  const offsetY = ref(0)

  const onScroll = () => {
    offsetY.value = window.scrollY * speed
  }

  onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
  onUnmounted(() => window.removeEventListener('scroll', onScroll))

  return { offsetY }
}
```

Usage on background images:
```html
<div :style="{ transform: `translateY(${offsetY}px)` }" class="absolute inset-0 scale-110">
  <img ... class="w-full h-full object-cover" />
</div>
```

`scale-110` prevents white edges during parallax movement.

### Route transitions

In `src/App.vue`, wrap `<RouterView>` with:
```vue
<RouterView v-slot="{ Component }">
  <Transition name="page" mode="out-in">
    <component :is="Component" :key="$route.path" />
  </Transition>
</RouterView>
```

Add to `src/style.css`:
```css
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.page-enter-from {
  opacity: 0;
  transform: translateY(12px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
```

### Card hover effects (Tailwind only)

On card wrapper:
```
group hover:scale-[1.02] hover:shadow-2xl transition-all duration-300
```

On card image:
```
group-hover:scale-105 transition-transform duration-500
```

---

## Section 3: Component Changes

### `src/components/Navbar.vue`
- Active route link: add gold underline that slides in (`after:` pseudo-element via Tailwind)
- Mobile menu: replace `transform: translateY` transition with `max-height` transition for smoother open/close

### `src/components/HeroBanner.vue`
- Background image wrapped in parallax div using `useParallax(0.3)`
- Hero content (title, subtitle, CTA) animated with `@vueuse/motion` stagger:
  - Title: delay 0ms
  - Subtitle: delay 150ms
  - CTA button: delay 300ms
- CTA button: gold with pulse ring on hover (`hover:ring-4 hover:ring-brand-gold/40`)

### `src/components/AboutSection.vue` ← structural fix
- **Remove** `getElementById('carousel')` and the `setInterval` DOM mutation
- **Replace** with reactive carousel:
  - `currentSlide` ref, `setInterval` increments it
  - `v-for` images with `v-show="i === currentSlide"` and CSS `transition: opacity 0.8s ease`
- Feature icon cards: scroll-triggered stagger entrance via `v-motion`
- Background: `bg-brand-charcoal`

### `src/components/ServicesSection.vue`
- Background: `bg-brand-stone`
- Cards: add `group hover:scale-[1.02] hover:shadow-2xl transition-all duration-300`
- Card images: add `group-hover:scale-105 transition-transform duration-500 overflow-hidden`
- Buttons: replace `bg-stone-800` with `bg-brand-gold text-brand-charcoal hover:bg-brand-gold-dark`
- Section heading + cards: scroll-triggered entrance via `v-motion`

### `src/components/MeetTheTeam.vue`
- Scroll-triggered fade-in on content
- Background/overlay stays dark

### `src/components/ContactSection.vue`
- Background: `bg-brand-dark`
- Gold divider line at top: `border-t-2 border-brand-gold`
- Contact items: stagger fade-in via `v-motion`

### `src/pages/ToursAirports.vue`
- Background: `bg-brand-stone`
- Selected service button: gold border highlight (`border-2 border-brand-gold`) replaces `bg-gray-300`
- Detail panel: slides in with `v-motion` when service is selected (`:initial="{ opacity: 0, y: 20 }"`, `:enter="{ opacity: 1, y: 0 }"`)
- Section heading: scroll-triggered entrance

### `src/pages/Book.vue`
- Font tokens applied (already dark-themed, no layout change)
- Heading updated to use Plus Jakarta Sans via global CSS

### `src/App.vue`
- `<Navbar />` and `<ContactSection />` already sit outside `<RouterView>` — do not move them
- Wrap only the `<RouterView>` with the page `<Transition>` as described above
- Result: navbar and footer are stable across route changes; only the page content fades/slides

---

## Files Created / Modified

| Action | Path |
|--------|------|
| Modify | `index.html` — swap fonts |
| Modify | `src/style.css` — font families, page transition CSS |
| Modify | `tailwind.config.js` — brand color tokens |
| Modify | `src/main.js` — register MotionPlugin |
| Create | `src/composables/useParallax.js` |
| Modify | `src/App.vue` — route transition wrapper |
| Modify | `src/components/Navbar.vue` |
| Modify | `src/components/HeroBanner.vue` |
| Modify | `src/components/AboutSection.vue` — structural fix + visual |
| Modify | `src/components/ServicesSection.vue` |
| Modify | `src/components/MeetTheTeam.vue` |
| Modify | `src/components/ContactSection.vue` |
| Modify | `src/pages/ToursAirports.vue` |
| Modify | `src/pages/Book.vue` |

---

## Out of Scope
- No new pages or routes
- No i18n changes
- No changes to booking wizard components or Pinia store
- No Swiper library replacement (ToursAirports mobile slider stays)
- No backend or form submission changes
