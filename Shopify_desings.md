# Shopify Polaris Design Guidelines for SheetFlow

SheetFlow should feel like a premium extension of the Shopify ecosystem. These guidelines are adapted from Shopify Polaris to ensure a consistent, professional, and tool-centric aesthetic.

## 1. Color System (Semantic & Functional)
Polaris uses semantic colors to communicate meaning. SheetFlow should adopt this hierarchy:

- **Surface (Backgrounds):**
  - Default: `#f6f6f7` (Light gray for the page background)
  - Secondary: `#ffffff` (White for cards and content containers)
- **Primary (Actions):**
  - Default: `#008060` (Shopify Green) or a high-contrast Blue (`#005bd3`)
  - Hover: Darker shade of the primary color.
- **Text:**
  - Main: `#202223` (High contrast for readability)
  - Subdued: `#6d7175` (For secondary info)
- **Status Indicators:**
  - Success: `#008060` (Green)
  - Critical: `#d72c0d` (Red)
  - Warning: `#ffc453` (Amber)
  - Highlight: `#005bd3` (Blue)

## 2. Typography
- **Font Stack:** System fonts (Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto).
- **Scale:**
  - Headers: Bold, large (`text-xl` or `text-2xl`), tracking-tight.
  - Body: Regular, `text-sm` (14px) or `text-base` (16px).
  - Labels/Monospace: Uppercase, bold, `text-[10px]` or `text-xs`.

## 3. Spacing & Layout
- **The 4px Grid:** Use multiples of 4px for padding and margins (4, 8, 12, 16, 24, 32).
- **Compactness:** Polaris favors high-density layouts. Reduce whitespace between related elements.
- **Containers:** Use `Card` components with an 8px (`rounded-lg`) border radius and a subtle 1px border (`border-border`).

## 4. Components & Interactive Elements
- **Border Radius:** Enforce a strict **8px (`rounded-lg`)** radius on all buttons, inputs, and cards.
- **Buttons:**
  - Primary: Solid background, high contrast text.
  - Secondary: Outline or ghost style for less prominent actions.
  - Cursor: Always `cursor-pointer`.
- **Inputs:**
  - Height: Standardized at 32px or 40px (`h-9` or `h-10`).
  - Focus: Clear 2px ring or border color change.
- **Micro-interactions:** Subtle hover effects (background shifts, scale transforms) to indicate interactivity.

## 5. UI Philosophy: "Functional Premium"
- **Tool-First:** The UI should look like a sophisticated admin panel, not a landing page.
- **Hierarchy:** Use bold headers, uppercase labels, and italic accents to create a clear visual hierarchy.
- **Shadows:** Minimal usage. Rely on borders and subtle background shifts to create depth.

---
*Reference: [Shopify Polaris Documentation](https://polaris.shopify.com/)*
