# Icons Management System

This folder contains the centralized icon management system for the website.

## 📁 Folder Structure

```
src/
├── config/
│   └── icons.ts          # Main icon configuration
├── components/
│   └── Icons/
│       └── CategoryIcon.tsx  # Reusable icon component
└── public/
    └── icons/
        └── categories/    # Local icon storage (future use)
```

## 🎯 How to Use

### 1. Import the Icon Component

```tsx
import CategoryIcon from '@/components/Icons/CategoryIcon'
import { getCategoryIcon } from '@/config/icons'
```

### 2. Use the CategoryIcon Component

```tsx
// Basic usage
<CategoryIcon categoryKey="electrical" />

// With custom size
<CategoryIcon categoryKey="plumbing" size="lg" />

// With custom styling
<CategoryIcon 
  categoryKey="hvac" 
  size="xl" 
  className="custom-class"
  useExternal={true}
  showFallback={true}
/>
```

### 3. Get Category Information

```tsx
const categoryInfo = getCategoryIcon('electrical')
console.log(categoryInfo.name) // "الكهرباء"
console.log(categoryInfo.icon) // "/icons/categories/electrical.png"
console.log(categoryInfo.fallbackIcon) // "⚡"
```

## 🔧 Configuration

### Adding New Categories

Edit `src/config/icons.ts` and add new categories:

```tsx
export const categoryIcons = {
  // ... existing categories
  newCategory: {
    name: 'اسم الفئة الجديدة',
    icon: '/icons/categories/new-category.png',
    fallbackIcon: '🔧',
    externalUrl: 'https://example.com/icon.png'
  }
}
```

### Available Icon URLs

All current icons are sourced from WBL3:

- **Electrical**: `plugin-r8ujy6kuuy3ff3rhnzuqwh57h9s411772zbggeo2us.png`
- **Plumbing**: `plumbing-r8uk5t1qakj5l8ot5aht4jvsxs7agngtgpt8l7d4dw.png`
- **HVAC**: `climate-control-r8uk8wwivus9yu6c04uev9nnmmvywmsvk3g0p4r9tg.png`
- **Security**: `security-camera-r8ukc0rbh51ecfnuuz70lzfibhkncm4xnh2st25f90.png`
- **Construction**: `construction-r8uktyifwbldwjlv48bpoyh6f75t8ocj499di5jyic.png`
- **Gardening**: `pruning-shears-r8ukz0v4q6j0gw8zjf5c4oglny70pygghbtklu1kz8.png`
- **Elevator**: `elevator-r8ul27jfvyvztbmexsptkviu4yhst13pl3et5lbjw4.png`
- **Carpentry**: `carpentry-r8v2wcy4vdxzf2v38dcdztxbvdf1d0e7vfyi0t752s.png`
- **Gypsum**: `gypsum-board-r8v2yw4habesp96nfyr77ox1hqxn3ng6jz8lknfyb8.png`
- **Renovation**: `renovation-r8v30qv0rjy5lkhpm9lpmq2ro3spa5t4h5k2nap01g.png`
- **Moving**: `delivery-truck-r8v32is1oadnj1wv918cc9y42b1ntkuvdxx3a428ac.png`
- **Stairs**: `stairs-r8ukwtwos3ixdnfoch0ob8dvrl06rdr06h0salanhw.png`

## 📏 Available Sizes

- `sm`: 24x24px (w-6 h-6)
- `md`: 32x32px (w-8 h-8) - Default
- `lg`: 40x40px (w-10 h-10)
- `xl`: 48x48px (w-12 h-12)

## 🎨 Features

- **Automatic Fallback**: If external image fails, shows emoji fallback
- **Lazy Loading**: Images load only when needed
- **Responsive**: Different sizes for different use cases
- **Centralized**: All icons managed in one place
- **Reusable**: Use anywhere in the application
- **Type Safe**: Full TypeScript support

## 🚀 Usage Examples

### Homepage Categories
```tsx
{mainCategories.map(category => {
  const categoryInfo = getCategoryIcon(category.key)
  return (
    <div key={category.key}>
      <CategoryIcon categoryKey={category.key} size="lg" />
      <h3>{categoryInfo.name}</h3>
    </div>
  )
})}
```

### Service Cards
```tsx
<CategoryIcon 
  categoryKey="electrical" 
  size="sm" 
  className="service-icon"
/>
```

### Navigation Menus
```tsx
<CategoryIcon 
  categoryKey="plumbing" 
  size="md" 
  useExternal={false} // Use local icons
/>
```

This system makes it easy to manage all icons from one place and use them consistently throughout the website! 🎉