// Category Icons Configuration
// All icons are stored in public/icons/categories/ folder

export const categoryIcons = {
  // Main Categories
  electrical: {
    name: 'الكهرباء',
    icon: '/icons/categories/electrical.png',
    fallbackIcon: '⚡',
    externalUrl: 'https://wbl3.com/wp-content/uploads/elementor/thumbs/plugin-r8ujy6kuuy3ff3rhnzuqwh57h9s411772zbggeo2us.png'
  },
  plumbing: {
    name: 'السباكة',
    icon: '/icons/categories/plumbing.png',
    fallbackIcon: '🔧',
    externalUrl: 'https://wbl3.com/wp-content/uploads/elementor/thumbs/plumbing-r8uk5t1qakj5l8ot5aht4jvsxs7agngtgpt8l7d4dw.png'
  },
  hvac: {
    name: 'التكييف والتبريد',
    icon: '/icons/categories/hvac.png',
    fallbackIcon: '❄️',
    externalUrl: 'https://wbl3.com/wp-content/uploads/elementor/thumbs/climate-control-r8uk8wwivus9yu6c04uev9nnmmvywmsvk3g0p4r9tg.png'
  },
  security: {
    name: 'تركيب كاميرات المراقبة',
    icon: '/icons/categories/security.png',
    fallbackIcon: '📹',
    externalUrl: 'https://wbl3.com/wp-content/uploads/elementor/thumbs/security-camera-r8ukc0rbh51ecfnuuz70lzfibhkncm4xnh2st25f90.png'
  },
  construction: {
    name: 'البناء والمقاولات',
    icon: '/icons/categories/construction.png',
    fallbackIcon: '🏗️',
    externalUrl: 'https://wbl3.com/wp-content/uploads/elementor/thumbs/construction-r8uktyifwbldwjlv48bpoyh6f75t8ocj499di5jyic.png'
  },
  
  // Secondary Categories
  gardening: {
    name: 'تنسيق الحدائق',
    icon: '/icons/categories/gardening.png',
    fallbackIcon: '🌱',
    externalUrl: 'https://wbl3.com/wp-content/uploads/elementor/thumbs/pruning-shears-r8ukz0v4q6j0gw8zjf5c4oglny70pygghbtklu1kz8.png'
  },
  elevator: {
    name: 'صيانة المصاعد',
    icon: '/icons/categories/elevator.png',
    fallbackIcon: '🛗',
    externalUrl: 'https://wbl3.com/wp-content/uploads/elementor/thumbs/elevator-r8ul27jfvyvztbmexsptkviu4yhst13pl3et5lbjw4.png'
  },
  carpentry: {
    name: 'النجارة',
    icon: '/icons/categories/carpentry.png',
    fallbackIcon: '🪚',
    externalUrl: 'https://wbl3.com/wp-content/uploads/elementor/thumbs/carpentry-r8v2wcy4vdxzf2v38dcdztxbvdf1d0e7vfyi0t752s.png'
  },
  gypsum: {
    name: 'جبس بورد والديكور',
    icon: '/icons/categories/gypsum.png',
    fallbackIcon: '🎨',
    externalUrl: 'https://wbl3.com/wp-content/uploads/elementor/thumbs/gypsum-board-r8v2yw4habesp96nfyr77ox1hqxn3ng6jz8lknfyb8.png'
  },
  renovation: {
    name: 'الدهان والتشطيبات',
    icon: '/icons/categories/renovation.png',
    fallbackIcon: '🎨',
    externalUrl: 'https://wbl3.com/wp-content/uploads/elementor/thumbs/renovation-r8v30qv0rjy5lkhpm9lpmq2ro3spa5t4h5k2nap01g.png'
  },
  moving: {
    name: 'نقل العفش والأثاث',
    icon: '/icons/categories/moving.png',
    fallbackIcon: '📦',
    externalUrl: 'https://wbl3.com/wp-content/uploads/elementor/thumbs/delivery-truck-r8v32is1oadnj1wv918cc9y42b1ntkuvdxx3a428ac.png'
  },
  stairs: {
    name: 'صيانة السلالم',
    icon: '/icons/categories/stairs.png',
    fallbackIcon: '🪜',
    externalUrl: 'https://wbl3.com/wp-content/uploads/elementor/thumbs/stairs-r8ukwtwos3ixdnfoch0ob8dvrl06rdr06h0salanhw.png'
  },
  
  // Additional Categories
  metalwork: {
    name: 'الحدادة والألمنيوم',
    icon: '/icons/categories/metalwork.png',
    fallbackIcon: '🔧',
    externalUrl: 'https://cdn-icons-png.flaticon.com/512/2092/2092063.png'
  },
  cleaning: {
    name: 'تنظيف الواجهات والزجاج',
    icon: '/icons/categories/cleaning.png',
    fallbackIcon: '✨',
    externalUrl: 'https://cdn-icons-png.flaticon.com/512/2092/2092045.png'
  },
  maintenance: {
    name: 'صيانة الشقق والأبراج السكنية',
    icon: '/icons/categories/maintenance.png',
    fallbackIcon: '🏢',
    externalUrl: 'https://cdn-icons-png.flaticon.com/512/2092/2092055.png'
  },
  safety: {
    name: 'السلامة وتسعير المخططات',
    icon: '/icons/categories/safety.png',
    fallbackIcon: '📋',
    externalUrl: 'https://cdn-icons-png.flaticon.com/512/2092/2092050.png'
  }
}

// Helper function to get category icon
export const getCategoryIcon = (categoryKey: string) => {
  return categoryIcons[categoryKey as keyof typeof categoryIcons] || {
    name: 'خدمة عامة',
    icon: '/icons/categories/default.png',
    fallbackIcon: '🔧',
    externalUrl: ''
  }
}

// Helper function to get icon URL (with fallback to external URL)
export const getIconUrl = (categoryKey: string, useExternal: boolean = true) => {
  const category = getCategoryIcon(categoryKey)
  return useExternal && category.externalUrl ? category.externalUrl : category.icon
}

// Main categories for homepage
export const mainCategories = [
  {
    key: 'electrical',
    color: 'from-orange-400 to-orange-600',
    url: '/services?category=الكهرباء',
    description: 'إصلاح وتركيب الأنظمة الكهربائية'
  },
  {
    key: 'plumbing',
    color: 'from-blue-400 to-blue-600',
    url: '/services?category=السباكة',
    description: 'إصلاح التسريبات وتسليك المجاري'
  },
  {
    key: 'hvac',
    color: 'from-green-400 to-green-600',
    url: '/services?category=التكييف والتبريد',
    description: 'صيانة وتركيب أجهزة التبريد'
  },
  {
    key: 'security',
    color: 'from-purple-400 to-purple-600',
    url: '/services?category=تركيب كاميرات المراقبة',
    description: 'أنظمة الأمان والمراقبة'
  },
  {
    key: 'construction',
    color: 'from-red-400 to-red-600',
    url: '/services?category=البناء والمقاولات',
    description: 'أعمال البناء والتشييد'
  }
]

// Secondary categories for homepage
export const secondaryCategories = [
  {
    key: 'metalwork',
    color: 'bg-gray-50 hover:bg-gray-100 border-gray-200'
  },
  {
    key: 'gardening',
    color: 'bg-green-50 hover:bg-green-100 border-green-200'
  },
  {
    key: 'elevator',
    color: 'bg-blue-50 hover:bg-blue-100 border-blue-200'
  },
  {
    key: 'gypsum',
    color: 'bg-purple-50 hover:bg-purple-100 border-purple-200'
  },
  {
    key: 'renovation',
    color: 'bg-orange-50 hover:bg-orange-100 border-orange-200'
  },
  {
    key: 'moving',
    color: 'bg-red-50 hover:bg-red-100 border-red-200'
  },
  {
    key: 'cleaning',
    color: 'bg-cyan-50 hover:bg-cyan-100 border-cyan-200'
  },
  {
    key: 'maintenance',
    color: 'bg-indigo-50 hover:bg-indigo-100 border-indigo-200'
  },
  {
    key: 'safety',
    color: 'bg-yellow-50 hover:bg-yellow-100 border-yellow-200'
  },
  {
    key: 'carpentry',
    color: 'bg-amber-50 hover:bg-amber-100 border-amber-200'
  }
]