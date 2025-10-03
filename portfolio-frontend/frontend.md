# Design System Documentation
## Abraham Adelodun Portfolio

---

## Color Palette

### Primary Colors
- **Primary Blue**: `#0EA5E9` (or similar - used for hero text, buttons, accents)
- **Black/Dark Background**: `#000000` or `#0A0A0A`
- **White/Light Text**: `#FFFFFF` or `#F5F5F5`

### Semantic Colors
- **Accent Blue (CTAs)**: `#0EA5E9` - Primary call-to-action buttons
- **Info Blue**: Lighter blue variant for informational elements
- **Border/Outline**: Dark gray/blue `#1E293B` or similar

### Text Colors
- **Primary Text**: `#FFFFFF` (White)
- **Secondary Text**: `#94A3B8` or `#CBD5E1` (Light gray/blue)
- **Accent Text**: `#0EA5E9` (Bright blue)

---

## Typography

### Font Family
- **Primary Font**: Monospace font (appears to be `JetBrains Mono`, `Fira Code`, or `Source Code Pro`)
- **Fallback**: `Consolas, Monaco, 'Courier New', monospace`

### Font Sizes
- **Hero Heading (H1)**: ~72-96px
- **Name/Header**: ~18-20px
- **Section Headings**: ~20-24px
- **Body Text**: ~16px
- **Small Text/Labels**: ~14px
- **Pro Tip**: ~14px

### Font Weights
- **Bold**: 700 (Headings, emphasis)
- **Medium**: 500-600 (Subheadings)
- **Regular**: 400 (Body text)

### Line Height
- **Headings**: 1.1-1.2
- **Body**: 1.6-1.8

---

## Spacing System

### Scale (8px base)
```
xs:  4px   (0.5rem)
sm:  8px   (1rem)
md:  16px  (2rem)
lg:  24px  (3rem)
xl:  32px  (4rem)
2xl: 48px  (6rem)
3xl: 64px  (8rem)
4xl: 96px  (12rem)
```

### Component Spacing
- **Section Padding**: 96-128px vertical, 48-64px horizontal
- **Card Padding**: 24-32px
- **Button Padding**: 12px 24px
- **Navigation Items**: 16px horizontal gap

---

## Components

### Buttons

#### Primary Button (CTA)
```
Background: #0EA5E9 (Bright blue)
Text: #FFFFFF
Padding: 12px 24px
Border Radius: 6-8px
Font Weight: 500-600
Icon: Optional (right arrow →)
Hover: Slightly lighter blue or shadow effect
```

#### Secondary Button
```
Background: Transparent
Border: 1px solid #0EA5E9
Text: #0EA5E9
Padding: 12px 24px
Border Radius: 6-8px
Icon: Optional
Hover: Background #0EA5E9 with opacity
```

### Navigation
```
Position: Fixed top
Background: Transparent or slightly dark (#0A0A0A)
Height: 64-72px
Items: Right-aligned
Active State: Underline or blue highlight
Font Size: 14-16px
```

### Cards/Sections
```
Background: Transparent or very dark (#0F0F0F)
Border: 1px solid #1E293B (subtle)
Border Radius: 8-12px
Padding: 32px
Icon Size: 24-32px
Icon Color: #0EA5E9
```

### Pro Tip Banner
```
Background: Dark with blue border or accent
Border: 1px solid #0EA5E9
Border Radius: 6px
Padding: 12px 16px
Icon: Lightbulb or similar (blue)
Text: 14px
```

### Terminal/Code Elements
```
Background: Very dark (#0A0A0A or darker)
Border: 1px solid #1E293B
Font: Monospace
Color: #0EA5E9 for commands
Padding: 16px
Border Radius: 4-6px
```

---

## Icons

### Icon Style
- **Type**: Line icons (outline style)
- **Stroke Width**: 1.5-2px
- **Size**: 20-24px (standard), 32px (section headings)
- **Color**: `#0EA5E9` (primary) or `#FFFFFF` (neutral)

### Icon Usage
- Navigation: User, folder, grid icons
- Sections: Grid, settings, target icons
- Buttons: Arrow right (→)
- Terminal: Command prompt (>_)

---

## Layout

### Grid System
```
Max Width: 1280px (container)
Columns: 12-column grid
Gap: 24-32px
Breakpoints:
  - Mobile: 320px+
  - Tablet: 768px+
  - Desktop: 1024px+
  - Large: 1280px+
```

### Hero Section
```
Full viewport height or near-full
Centered content with left alignment
Large hero text with blue accent
CTA buttons below
```

### Three-Column Cards
```
Grid: 3 equal columns on desktop
Gap: 24-32px
Each card: Icon + Heading + Description
Mobile: Stacks vertically
```

---

## Effects & Animations

### Hover States
- **Buttons**: Scale (1.02-1.05) or brightness increase
- **Links**: Underline appears or color change
- **Cards**: Subtle border glow or shadow

### Transitions
```
Duration: 200-300ms
Easing: cubic-bezier(0.4, 0, 0.2, 1) or ease-in-out
Properties: background, color, transform, border
```

### Terminal Cursor
- Blinking cursor effect (optional)
- Blue color matching theme

---

## Accessibility

### Contrast Ratios
- **Text on Dark Background**: Ensure 4.5:1 minimum
- **Blue (#0EA5E9) on Black**: Meets WCAG AA standards

### Focus States
- Visible outline on interactive elements
- Color: `#0EA5E9` with 2px offset
- Never remove focus indicators

### Screen Reader Text
- Descriptive alt text for icons
- ARIA labels where needed
- Semantic HTML structure

---

## Usage Guidelines

### Do's
✅ Use monospace font for technical/code aesthetic  
✅ Maintain high contrast between text and background  
✅ Keep blue accent consistent across interactive elements  
✅ Use icons sparingly and consistently  
✅ Maintain generous whitespace

### Don'ts
❌ Don't use multiple accent colors  
❌ Don't overcrowd sections with text  
❌ Don't use non-monospace fonts  
❌ Don't reduce contrast for "aesthetics"  
❌ Don't animate excessively

---

## Code Example

### CSS Variables
```css
:root {
  /* Colors */
  --color-primary: #0EA5E9;
  --color-bg-dark: #000000;
  --color-text-primary: #FFFFFF;
  --color-text-secondary: #94A3B8;
  --color-border: #1E293B;
  
  /* Typography */
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
  --font-size-base: 16px;
  --font-size-lg: 20px;
  --font-size-hero: 72px;
  
  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  
  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  
  /* Transitions */
  --transition-fast: 200ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-base: 300ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

## Design Philosophy

This design system reflects a **developer-first, terminal-inspired aesthetic**:

- **Minimal & Functional**: Every element serves a purpose
- **High Contrast**: Easy to read, professional appearance
- **Monospace Typography**: Technical authenticity
- **Blue as Power Color**: Strategic use for CTAs and accents
- **Dark Mode Native**: Designed for dark environments
- **Performance First**: Lightweight, fast-loading design

---

## Version
**v1.0** - Initial documentation based on landing page analysis


"How I Work" Section Design System
Layout Structure
Two-Column Layout (Top)
Grid: 2 equal columns
Gap: 48-64px
Left: "The Approach" text block
Right: "Core Principles" checklist
Padding: 64-96px vertical
Four-Card Grid (Bottom)
Grid: 2x2 grid (4 cards total)
Gap: 24-32px between cards
Each card: Icon + Heading + Description
Cards span full width on mobile
Section Components
Section Header
Heading: "How I Build Systems That M[atter]"
Font Size: 48-56px
Color: #FFFFFF
Font Weight: 700
Margin Bottom: 16px

Subheading: "Engineering philosophy..."
Font Size: 18-20px
Color: #94A3B8 (muted gray)
Margin Bottom: 64px
Text Blocks
"The Approach" Block:
Background: Transparent or very dark (#0A0A0A)
Border: 1px solid #1E293B
Border Radius: 12px
Padding: 32-40px

Heading Color: #0EA5E9 (bright blue)
Heading Size: 20-24px
Margin Bottom: 16px

Body Text Color: #FFFFFF or #E2E8F0
Body Text Size: 16px
Line Height: 1.7
Emphasis/Highlight Text:
*work* styling:
  Font Style: Italic
  Color: Slightly brighter white or blue tint
  Background: Optional subtle highlight
Core Principles Checklist
Container:
Background: Transparent or dark (#0A0A0A)
Border: 1px solid #1E293B
Border Radius: 12px
Padding: 32-40px

Heading: "Core Principles"
Color: #0EA5E9
Size: 20-24px
Margin Bottom: 24px
Checklist Items:
Display: Flex
Gap: 12-16px (between icon and text)
Margin Bottom: 16-20px

Icon:
  Type: Check circle (✓ in circle)
  Color: #0EA5E9
  Size: 20-24px
  
Text:
  Color: #FFFFFF or #E2E8F0
  Size: 16px
  Line Height: 1.6
  
Bold Text in Items:
  Font Weight: 600
  Same color as body text
Feature Cards (Bottom Grid)
Card Structure:
Background: #0A0A0A or slightly lighter dark
Border: 1px solid #1E293B
Border Radius: 12px
Padding: 32px
Transition: All 300ms ease

Hover State:
  Border Color: #0EA5E9 (subtle glow)
  Transform: translateY(-2px)
  Box Shadow: 0 8px 24px rgba(14, 165, 233, 0.1)
Card Icon:
Size: 28-32px
Color: #0EA5E9
Margin Bottom: 20px
Type: Outline/line style icons
  - Rocket (From Zero to Ship)
  - Map/Chart (Context-Aware Engineering)
  - Layers (Reusable Infrastructure)
  - Heart (Deep Ownership)
Card Heading:
Font Size: 18-20px
Font Weight: 600-700
Color: #FFFFFF
Margin Bottom: 12px
Card Description:
Font Size: 15-16px
Color: #94A3B8 or #CBD5E1
Line Height: 1.6
Specific Card Styling
"From Zero to Ship"
Icon: Rocket (🚀) - Blue outline
Text: Standard card styling
"Context-Aware Engineering"
Icon: Map/Chart - Blue outline
Text: Standard card styling
"Reusable Infrastructure"
Icon: Layers/Stack - Blue outline
Text: Standard card styling
"Deep Ownership"
Icon: Heart - Blue outline
Text: Standard card styling
Spacing & Rhythm
Section Padding Top: 96-128px
Section Padding Bottom: 96-128px
Section Padding Horizontal: 48-64px

Between Section Header and Content: 48-64px
Between Two-Column and Four-Card Grid: 64-80px

Card Internal Spacing:
  Icon to Heading: 20px
  Heading to Description: 12px
Responsive Behavior
Desktop (1024px+):

Two-column layout for approach/principles
2x2 grid for cards

Tablet (768px-1023px):

Two-column layout maintained
2x2 grid for cards (smaller gaps)

Mobile (<768px):

Single column for approach/principles
Single column stack for cards
Reduced padding: 24-32px
Smaller font sizes (scale down 10-15%)

Typography Hierarchy
Section H2 (Main): 48-56px, Weight 700, White
Section Subtitle: 18-20px, Weight 400, Muted gray
Block Heading: 20-24px, Weight 600, Blue
Card Heading: 18-20px, Weight 600, White
Body Text: 16px, Weight 400, White/Light gray
Card Description: 15-16px, Weight 400, Muted gray
Color Usage in This Section
Background Layers:
  - Page: #000000
  - Cards/Blocks: #0A0A0A or #0F0F0F
  
Borders:
  - Default: #1E293B (dark blue-gray)
  - Hover: #0EA5E9 (bright blue)
  
Text:
  - Primary: #FFFFFF
  - Secondary: #E2E8F0
  - Muted: #94A3B8
  - Accent/Headings: #0EA5E9
  
Icons:
  - All icons: #0EA5E9
Interactive States
Card Hover:
css.card {
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover {
  border-color: #0EA5E9;
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(14, 165, 233, 0.15);
}
Link Hover (if applicable):
css.link:hover {
  color: #0EA5E9;
  text-decoration: underline;
}
Code Example for This Section
css/* Section Styles */
.how-i-work-section {
  padding: 128px 64px;
  max-width: 1280px;
  margin: 0 auto;
}

.section-header h2 {
  font-size: 56px;
  font-weight: 700;
  color: #FFFFFF;
  margin-bottom: 16px;
}

.section-header p {
  font-size: 20px;
  color: #94A3B8;
  margin-bottom: 64px;
}

/* Two Column Layout */
.two-column-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  margin-bottom: 80px;
}

.text-block {
  background: #0A0A0A;
  border: 1px solid #1E293B;
  border-radius: 12px;
  padding: 40px;
}

.text-block h3 {
  font-size: 24px;
  color: #0EA5E9;
  margin-bottom: 20px;
}

.text-block p {
  color: #E2E8F0;
  line-height: 1.7;
}

/* Checklist */
.checklist-item {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
  align-items: flex-start;
}

.checklist-icon {
  color: #0EA5E9;
  font-size: 24px;
  flex-shrink: 0;
}

/* Four Card Grid */
.four-card-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
}

.feature-card {
  background: #0A0A0A;
  border: 1px solid #1E293B;
  border-radius: 12px;
  padding: 32px;
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

.feature-card:hover {
  border-color: #0EA5E9;
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(14, 165, 233, 0.15);
}

.feature-card-icon {
  color: #0EA5E9;
  font-size: 32px;
  margin-bottom: 20px;
}

.feature-card h4 {
  font-size: 20px;
  font-weight: 600;
  color: #FFFFFF;
  margin-bottom: 12px;
}

.feature-card p {
  color: #94A3B8;
  line-height: 1.6;
}

/* Responsive */
@media (max-width: 768px) {
  .two-column-grid,
  .four-card-grid {
    grid-template-columns: 1fr;
  }
  
  .how-i-work-section {
    padding: 64px 24px;
  }
}

Version
v1.1 - Added "How I Work" section design system