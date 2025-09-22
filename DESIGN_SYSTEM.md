# WBL3 Design System - Fiverr-Inspired Saudi Home Services Platform

## 🎨 Color Palette

### Primary Colors (Fiverr Green)
- **Primary 50**: `#f0fdf4` - Very light green background
- **Primary 100**: `#dcfce7` - Light green background
- **Primary 500**: `#1dbf73` - **Main brand color** (Fiverr green)
- **Primary 600**: `#19a463` - Hover state for primary buttons
- **Primary 700**: `#15803d` - Active/pressed state

### Secondary Colors (Fiverr Orange)
- **Secondary 500**: `#ff7640` - **Secondary brand color**
- **Secondary 600**: `#e55a2b` - Hover state for secondary elements

### Accent Colors (Fiverr Yellow)
- **Accent 500**: `#ffbe5b` - **Accent color** for highlights
- **Accent 600**: `#f4a442` - Hover state for accent elements

### Text Colors
- **Text Primary**: `#404145` - Main text color (dark gray)
- **Text Secondary**: `#62646a` - Secondary text color
- **Text Muted**: `#95979d` - Muted text color
- **Text Light**: `#b5b6ba` - Light text color

### Background Colors
- **BG Primary**: `#ffffff` - Main background (white)
- **BG Secondary**: `#f7f8fc` - Secondary background (light gray)
- **BG Tertiary**: `#fafbfc` - Tertiary background
- **BG Dark**: `#404145` - Dark background

### Status Colors
- **Success**: `#1dbf73` - Success states (same as primary)
- **Warning**: `#ffbe5b` - Warning states (same as accent)
- **Error**: `#ff5a5f` - Error states (red)
- **Info**: `#446ee7` - Info states (blue)

## 🔤 Typography

### Font Stack
1. **Primary**: Noto Kufi Arabic (Arabic-first)
2. **Fallback**: Cairo, Tajawal
3. **System**: Segoe UI, Roboto, Arial, sans-serif

### Font Weights
- **Thin**: 100
- **Extra Light**: 200
- **Light**: 300
- **Normal**: 400 (default)
- **Medium**: 500
- **Semi Bold**: 600
- **Bold**: 700
- **Extra Bold**: 800
- **Black**: 900

### Typography Scale
- **H1**: 3rem (48px) - Hero titles
- **H2**: 2.25rem (36px) - Section titles
- **H3**: 1.875rem (30px) - Subsection titles
- **H4**: 1.25rem (20px) - Card titles
- **H5/H6**: 1.125rem (18px) - Small headings
- **Body**: 1rem (16px) - Default text
- **Small**: 0.875rem (14px) - Secondary text
- **XSmall**: 0.75rem (12px) - Captions

## 🎯 Component Classes

### Buttons
```css
.btn - Base button class
.btn-primary - Primary green button
.btn-secondary - Secondary outline button
.btn-outline - Gray outline button
.btn-ghost - Transparent button
.btn-lg - Large button
.btn-sm - Small button
```

### Cards
```css
.card - Base card class
.card-body - Card content area
.card-header - Card header with border
.card-footer - Card footer with border
.service-card - Fiverr-style service card
.category-card - Gradient category card
```

### Inputs
```css
.input - Base input class
.input-lg - Large input
.input-sm - Small input
```

### Badges
```css
.badge - Base badge class
.badge-primary - Primary colored badge
.badge-secondary - Gray badge
.badge-success - Green badge
.badge-warning - Yellow badge
.badge-error - Red badge
```

### Alerts
```css
.alert - Base alert class
.alert-success - Success alert
.alert-warning - Warning alert
.alert-error - Error alert
.alert-info - Info alert
```

## 🎨 Fiverr-Style Components

### Service Cards
- Hover effects with subtle lift
- Image scaling on hover
- Clean typography with Noto Kufi Arabic
- Price highlighting in primary green

### Category Cards
- Gradient backgrounds
- Icon-based design
- Hover animations
- Glass morphism effects

### Navigation
- Clean, minimal design
- Active state indicators
- Smooth transitions
- Arabic-first typography

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Mobile-First Approach
- Typography scales down on mobile
- Cards stack vertically
- Navigation becomes hamburger menu
- Touch-friendly button sizes

## 🌟 Animations & Effects

### Hover Effects
- `transform: translateY(-2px)` - Card lift
- `transform: scale(1.05)` - Image scaling
- Smooth transitions (0.3s ease)

### Loading States
- Skeleton loading with shimmer effect
- Pulse animation for loading elements
- Smooth fade-in animations

### Micro-interactions
- Button press feedback
- Form validation states
- Smooth page transitions

## 🎯 Usage Guidelines

### Do's
✅ Use Noto Kufi Arabic for all Arabic text
✅ Maintain consistent spacing (8px grid)
✅ Use primary green for CTAs
✅ Implement hover states for interactive elements
✅ Follow the typography hierarchy
✅ Use semantic color meanings (green for success, red for errors)

### Don'ts
❌ Mix different green shades randomly
❌ Use system fonts for Arabic text
❌ Ignore hover states
❌ Use colors outside the defined palette
❌ Break the typography scale
❌ Forget RTL support for Arabic content

## 🔧 Implementation

### CSS Variables
All colors are available as CSS custom properties:
```css
var(--color-primary)
var(--color-secondary)
var(--color-text-primary)
var(--font-noto-kufi)
```

### Tailwind Classes
Use Tailwind utility classes:
```html
<button class="btn btn-primary">
<div class="card service-card">
<h1 class="font-noto-kufi text-primary">
```

### Component Usage
```jsx
// React component example
<div className="service-card">
  <img className="service-card-image" />
  <div className="service-card-content">
    <h3 className="service-card-title">خدمة التصميم</h3>
    <p className="service-card-price">٥٠ ريال</p>
  </div>
</div>
```

## 🌍 Arabic & RTL Support

### Font Loading
- Noto Kufi Arabic loaded via Google Fonts
- Fallback to Cairo and Tajawal
- Proper Arabic character support

### RTL Layout
- Automatic RTL detection
- Mirrored layouts for Arabic content
- Proper text alignment

### Cultural Considerations
- Saudi-specific color preferences
- Professional, trustworthy appearance
- Modern, clean aesthetic matching Fiverr's style

---

This design system ensures consistency across the WBL3 platform while maintaining the professional, modern look inspired by Fiverr's successful design language, adapted for the Saudi market with proper Arabic typography and cultural considerations.