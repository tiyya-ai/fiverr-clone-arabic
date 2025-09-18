// نظام الألوان الموحد والاحترافي للمنصة
export const colors = {
  // الألوان الأساسية - نظام أزرق احترافي
  primary: '#1e40af',      // أزرق داكن احترافي
  primaryHover: '#1d4ed8',  // أزرق متوسط
  primaryLight: '#3b82f6', // أزرق فاتح
  primaryDark: '#1e3a8a',  // أزرق داكن جداً
  
  // الألوان الثانوية
  secondary: '#059669',     // أخضر احترافي
  secondaryHover: '#047857',
  accent: '#7c3aed',       // بنفسجي للتمييز
  accentHover: '#6d28d9',
  
  // ألوان الحالة
  success: '#059669',
  warning: '#d97706', 
  error: '#dc2626',
  info: '#0284c7',
  
  // الألوان المحايدة - نظام رمادي متدرج
  white: '#ffffff',
  gray50: '#f8fafc',
  gray100: '#f1f5f9',
  gray200: '#e2e8f0',
  gray300: '#cbd5e1',
  gray400: '#94a3b8',
  gray500: '#64748b',
  gray600: '#475569',
  gray700: '#334155',
  gray800: '#1e293b',
  gray900: '#0f172a',
  
  // ألوان النص
  textPrimary: '#0f172a',
  textSecondary: '#475569',
  textMuted: '#64748b'
}

// فئات CSS للاستخدام المباشر
export const styles = {
  // أزرار احترافية
  primaryButton: 'bg-[#1e40af] hover:bg-[#1d4ed8] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5',
  secondaryButton: 'bg-[#059669] hover:bg-[#047857] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl',
  outlineButton: 'border-2 border-[#1e40af] text-[#1e40af] hover:bg-[#1e40af] hover:text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200',
  ghostButton: 'text-[#1e40af] hover:bg-[#f1f5f9] px-6 py-3 rounded-xl font-semibold transition-all duration-200',
  
  // روابط
  link: 'text-[#1e40af] hover:text-[#1d4ed8] font-medium transition-colors duration-200 hover:underline',
  
  // بطاقات احترافية
  card: 'bg-white border border-[#e2e8f0] rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:border-[#cbd5e1]',
  cardHeader: 'border-b border-[#e2e8f0] p-6 bg-[#f8fafc] rounded-t-2xl',
  
  // حقول الإدخال
  input: 'border border-[#cbd5e1] rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#1e40af] focus:border-transparent transition-all duration-200 bg-white',
  
  // تركيز
  focus: 'focus:ring-2 focus:ring-[#1e40af] focus:border-transparent outline-none',
  
  // النصوص
  heading: 'text-[#0f172a] font-bold',
  subheading: 'text-[#475569] font-semibold',
  body: 'text-[#64748b]',
  
  // الخلفيات
  backgroundPrimary: 'bg-gradient-to-br from-[#1e40af] to-[#7c3aed]',
  backgroundSecondary: 'bg-[#f8fafc]',
  backgroundCard: 'bg-white'
}