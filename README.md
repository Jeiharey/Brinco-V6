# Studio Bookings

Build a single-page booking website for a creative/digital agency ([BRAND NAME]). 

Static frontend, React + Tailwind. Minimal, modern, professional aesthetic — 

not templated-looking. Think: a design studio's own site, not a generic SaaS landing page.

## VISUAL DIRECTION

- Minimal, confident, lots of whitespace, no clutter, no stock gradients or glassmorphism clichés.

- Typography-led design: a strong geometric display font for headings (e.g. Space Grotesk 

  or similar), a clean sans for body text, and a monospace font for small labels/numbers 

  (like "01", "02" service numbers) to give it a precise, "studio" feel.

- Palette: warm off-white/paper background, near-black ink text, one confident accent 

  color (electric indigo or similar) plus a secondary warm accent (coral/orange) used 

  sparingly for CTAs and highlights. Avoid generic blue/purple SaaS gradients.

- HOMEPAGE BACKGROUND — this needs to be genuinely unique, not a generic particle effect:

  a canvas/WebGL background of soft floating color "swatches" (small circles in the 

  brand's accent colors) that drift slowly and gently scatter/repel away from the cursor 

  as it moves — like a living brand color palette reacting to the visitor. Subtle, slow, 

  never distracting from the text on top. Must respect prefers-reduced-motion.

- Smooth, understated micro-interactions on hover/click (150–300ms ease). No bouncy or 

  flashy animation.

## PAGES / FLOW (single-page app, client-side routed — no full reloads)

1. HOME

   - Header: small brand mark/logo + name (top left)

   - Hero: headline + short subhead about the studio's services

   - A numbered list of 5 services (01–05), styled like a clean index/menu, each row 

     shows: number, title, one-line description, arrow — clicking navigates to that 

     service's page

   - Row of social links (Facebook, Instagram, WhatsApp, Threads, X, LinkedIn) that 

     open the client's real profiles in a new tab

   - Footer with copyright

2. SERVICE PAGE (one per service, same layout, different data)

   - Back link to home

   - Service title + number at top

   - The service's sub-categories displayed as grouped sections, each with a list of 

     selectable items (checkbox-style rows)

   - Selecting an item shows its description in a panel (desktop: sticky side panel; 

     mobile: expands inline or below) — items are multi-selectable, each selected 

     item's description stays visible

   - Below the sub-category lists: a date & time picker — "When do you need this 

     completed?"

   - Bottom action bar: shows count of items selected, and a "Proceed" button 

     (disabled until at least one item is selected)

3. CONTACT PAGE

   - Back link to previous step

   - Simple form: full name, email, phone number — all required, basic validation

   - A summary panel showing what was selected: service, each chosen sub-item, and 

     the due date/time

   - Submit button

4. CONFIRMATION / SUCCESS PAGE

   - Simple thank-you message confirming the request was received

   - Link back to home

## BACKEND / SUBMISSION

On submit, the full request (client name, email, phone, selected service, every 

selected sub-item with its description, and the due date/time) needs to be sent to 

the business owner's email address. Use Lovable's built-in backend (Supabase) to store 

each submission in a table AND trigger an email notification to the admin — don't rely 

on a client-side-only email widget. Include basic error handling and a loading state 

on the submit button.

## CONTENT STRUCTURE

5 services, each with 3–4 sub-category groups, each group with 4–6 selectable items. 

I'll provide the full list of services/sub-categories/item names and descriptions 

separately — structure the data as an editable config/array so content can be updated 

without touching layout code.

## RESPONSIVE

Fully responsive — mobile-first, touch-friendly tap targets on the selection rows, 

and the background effect should degrade gracefully (reduced particle count or 

static gradient) on smaller/lower-power devices.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/55e87621-7ec9-4a40-8aa3-c93360a76dfe).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
