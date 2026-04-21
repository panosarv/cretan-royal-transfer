# Aesthetic Revamp Design Spec
**Date:** 2026-04-21
**Project:** Cretan Royal Transfer

---

## Overview

A premium visual upgrade to the Home page and Tours & Airports page. Goals: eliminate the flat stacked-section feel, create visual flow between sections using diagonal cuts, wave dividers, and overlapping elements, and elevate each section to feel distinct and high-end.

**No new routes. No i18n changes. No booking wizard changes.**

---

## Section 1: Page Structure & Flow

### New Home Page Section Order

**Before:** Hero → About → Services → Meet the Team
**After:** Hero → Services → About → Meet the Team

Update `src/pages/Home.vue` to render components in the new order.

### Section Transition Techniques

| Boundary | Technique | Implementation |
|----------|-----------|---------------|
| Hero → Services | Diagonal cut | SVG `<clipPath>` on hero bottom edge, ~6deg angle |
| Services → About | Wave divider | Inline SVG wave between sections, `brand-charcoal` fill |
| About → Meet the Team | Overlapping card | MeetTheTeam wrapper has `mt-[-60px]` and `z-10`, creating layered depth |

### Background Rhythm

| Section | Background |
|---------|-----------|
| Hero | `brand-charcoal` + full-screen image |
| Services | `brand-stone` (odd rows) / `white` (even rows) |
| About | `brand-charcoal` |
| Meet the Team | Dark background image + overlay |

### Typography System (applied globally across all sections)

Every section heading gets a gold label above it:
```html
<p class="text-brand-gold text-xs font-semibold tracking-widest uppercase mb-3">LABEL TEXT</p>
<h2 class="text-3xl sm:text-4xl font-extrabold font-heading ...">Heading</h2>
```

Labels per section:
- Services: "OUR SERVICES"
- About: "WHY CHOOSE US"
- Tours & Airports: "EXPLORE CRETE"

---

## Section 2: ServicesSection — Alternating Image/Text Rows

**File:** `src/components/ServicesSection.vue`

### Layout

Replace the 3-column card grid with 6 full-width alternating rows. Each row is a 2-column layout (50/50):
- Odd rows (1, 3, 5): image left, text right, `bg-brand-stone`
- Even rows (2, 4, 6): text left, image right, `bg-white`
- On mobile: image always stacks above text, single column

### Row Structure (per service)

```html
<div class="flex flex-col md:flex-row [even:flex-row-reverse] items-stretch min-h-[420px]">
  <!-- Image side -->
  <div class="w-full md:w-1/2 overflow-hidden">
    <img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
  </div>
  <!-- Text side -->
  <div class="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 py-12">
    <span class="text-brand-gold text-xs font-semibold tracking-widest uppercase mb-2">CATEGORY TAG</span>
    <h3 class="text-2xl font-bold text-brand-charcoal font-heading mb-3">Title</h3>
    <p class="text-stone-600 mb-5">Description</p>
    <ul class="space-y-2 mb-6"><!-- feature bullets --></ul>
    <RouterLink to="/book"><button class="bg-brand-gold ...">Book Now</button></RouterLink>
  </div>
</div>
```

### Category Tags (per service)

| Service | Tag |
|---------|-----|
| Chania Airport Transfer | Airport Transfer |
| Heraklion Airport Transfer | Airport Transfer |
| Knossos Tour | Historical Tour |
| Preveli Tour | Nature Tour |
| Arkadi Tour | Historical Tour |
| Elafonisi Tour | Beach Tour |

### Scroll Animation

Each row enters from its respective side:
- Odd rows: image enters `x: -40`, text enters `x: 40`
- Even rows: text enters `x: -40`, image enters `x: 40`
- Both use `:visible-once`, `duration: 600`, `delay: 0` (simultaneous per row)

### Bottom CTA

Centered "View All Tours" button (`bg-brand-charcoal`) below the last row, replacing per-card CTA duplication.

---

## Section 3: AboutSection — Mosaic Image Grid

**File:** `src/components/AboutSection.vue`

### Layout

Replace the crossfade carousel with a two-column split layout:

**Left column (55% width) — Asymmetric mosaic:**
```
┌──────────┬──────┐
│          │      │
│  Tall    │  Sq  │
│  Image   │      │
│  (2 rows)├──────┤
│          │  Sq  │
│          │      │
└──────────┴──────┘
```
- Top-left: `reliability-aboutus.jpg` — tall, spans full height via `row-span-2`
- Top-right: `safety-aboutus.jpg` — square
- Bottom-right: `airport-aboutus.jpg` — square
- Grid: `grid grid-cols-2 grid-rows-2 gap-3 h-[420px]`
- Images use `object-cover w-full h-full rounded-xl`
- Scroll entrance: stagger `scale-95→1` + `opacity-0→1`, delay `index * 100ms`

**Right column (45% width) — Features list:**
- Gold label: "WHY CHOOSE US"
- Section heading
- 4 feature items as vertical stacked list, each with:
  - Gold icon circle (left)
  - Bold title
  - Description text
  - Thin gold left border: `border-l-2 border-brand-gold pl-4`
- Remove the old 4-column grid layout

**Mobile:** Mosaic collapses to `grid-cols-2 grid-rows-2` (equal squares, 2×2), stacked above the features list.

**Remove:** All `currentSlide`, `setInterval`, `onMounted`/`onUnmounted` carousel logic.

---

## Section 4: ToursAirports — Card Grid with Hover Reveal

**File:** `src/pages/ToursAirports.vue`

### Card Grid

Replace button grid with large image cards:

```html
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  <div
    v-for="(service, index) in services"
    class="group relative rounded-2xl overflow-hidden cursor-pointer h-[340px] shadow-lg"
    :class="selectedService === service ? 'ring-2 ring-brand-gold' : ''"
    @click="selectService(service)"
  >
    <!-- Background image -->
    <img :src="service.image" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
    <!-- Gradient overlay -->
    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-all duration-300" />
    <!-- Always-visible label -->
    <div class="absolute bottom-0 left-0 right-0 p-5">
      <span class="text-brand-gold text-xs font-semibold tracking-widest uppercase">category</span>
      <h3 class="text-white text-xl font-bold font-heading mt-1">{{ service.title }}</h3>
      <!-- Hover reveal -->
      <p class="text-stone-300 text-sm mt-2 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 line-clamp-2">
        {{ service.description }}
      </p>
    </div>
    <!-- Selected indicator -->
    <div v-if="selectedService === service" class="absolute top-4 right-4 bg-brand-gold rounded-full p-1.5">
      <svg class="w-4 h-4 text-brand-charcoal" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
      </svg>
    </div>
  </div>
</div>
```

### Detail Panel Redesign

Replace the current simple detail panel with a premium two-column layout:

```
┌─────────────────────────────────────────┐
│         Full-width hero image           │
│              (h-72)                     │
├──────────────────┬──────────────────────┤
│ Gold accent line │                      │
│ Title            │  Feature bullets     │
│ Description      │  Book CTA button     │
└──────────────────┴──────────────────────┘
```

- Hero image: `w-full h-72 object-cover rounded-t-2xl`
- Content area: `grid grid-cols-1 md:grid-cols-2 gap-8 p-8`
- Left: `border-t-4 border-brand-gold pt-4` then title + description
- Right: feature bullets + `bg-brand-gold` Book button

### Remove

- All Swiper mobile slider (replace with same card grid, just scrollable on mobile)
- `isMobile` ref and resize listener
- `activeIndex` and `updateActiveIndex` Swiper handler
- Swiper imports

### Scroll Entrance

Cards stagger in: `opacity: 0, y: 30` → `opacity: 1, y: 0`, `delay: index * 80ms`

---

## Section 5: Hero Bottom Diagonal

**File:** `src/components/HeroBanner.vue`

Add an absolutely-positioned SVG clip at the bottom of the hero:

```html
<div class="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
  <svg viewBox="0 0 1440 60" preserveAspectRatio="none" class="w-full h-[60px]" fill="#F5F0E8">
    <polygon points="0,60 1440,0 1440,60" />
  </svg>
</div>
```

This creates a diagonal cut from top-right to bottom-left, bleeding into the `brand-stone` Services section.

---

## Section 6: Wave Divider (Services → About)

**Location:** Between `ServicesSection` and `AboutSection` in `src/pages/Home.vue`

Add an inline SVG wave:

```html
<div class="overflow-hidden leading-none bg-brand-stone">
  <svg viewBox="0 0 1440 80" preserveAspectRatio="none" class="w-full h-[80px] block" fill="#2C2C2C">
    <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" />
  </svg>
</div>
```

The wave is `brand-charcoal` fill, sitting inside a `brand-stone` container, transitioning into the dark About section.

---

## Section 7: About → Meet the Team Overlap

**File:** `src/pages/Home.vue`

Wrap `<MeetTheTeam />` in a container that overlaps the About section:

The MeetTheTeam section's parent wrapper in Home.vue gets `relative z-10 -mt-16` so it visually layers over the bottom of AboutSection. The MeetTheTeam background image section already provides its own dark backdrop.

---

## Files Modified

| File | Changes |
|------|---------|
| `src/pages/Home.vue` | Remove duplicate `<Navbar />` import (already in App.vue), reorder sections, add wave divider, add overlap wrapper, fix root bg to `brand-stone` |
| `src/components/HeroBanner.vue` | Add diagonal SVG clip at bottom |
| `src/components/ServicesSection.vue` | Full rewrite: alternating rows layout |
| `src/components/AboutSection.vue` | Replace carousel with mosaic grid, features as stacked list |
| `src/pages/ToursAirports.vue` | Replace button grid + Swiper with image card grid, redesign detail panel |

### Bug Fix: Duplicate Navbar

`Home.vue` currently imports and renders `<Navbar />` directly. Since we moved `<Navbar />` to `App.vue` in the site revamp, `Home.vue` must have its `<Navbar />` import and usage removed to prevent two navbars rendering on the home page.

---

## Out of Scope

- No changes to Navbar, ContactSection, Book page, booking wizard
- No i18n additions or removals
- No new routes
- No backend changes
