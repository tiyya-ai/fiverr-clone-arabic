// نظام الألوان الموحد للمنصة
export const colors = {
  // الألوان الأساسية
  primary: '#1ab7ea',
  primaryHover: '#0ea5d9',
  secondary: '#22c55e',
  secondaryHover: '#16a34a',
  
  // ألوان الحالة
  success: '#22c55e',
  warning: '#f59e0b', 
  error: '#ef4444',
  
  // الألوان المحايدة
  white: '#ffffff',
  gray50: '#f9fafb',
  gray100: '#f3f4f6',
  gray200: '#e5e7eb',
  gray600: '#4b5563',
  gray900: '#111827'
}

// فئات CSS للاستخدام المباشر
export const styles = {
  // أزرار
  primaryButton: 'bg-[#1ab7ea] hover:bg-[#0ea5d9] text-white px-6 py-2 rounded-lg transition-colors',
  secondaryButton: 'bg-[#22c55e] hover:bg-[#16a34a] text-white px-6 py-2 rounded-lg transition-colors',
  
  // روابط
  link: 'text-[#1ab7ea] hover:text-[#0ea5d9] transition-colors',
  
  // بطاقات
  card: 'bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow',
  
  // تركيز
  focus: 'focus:ring-2 focus:ring-[#1ab7ea] focus:border-transparent'
}