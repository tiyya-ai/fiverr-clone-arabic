import type { Metadata } from 'next'
import { Cairo, Tajawal, Noto_Kufi_Arabic } from 'next/font/google'
import './globals.css'
import Providers from '@/components/Providers'

const cairo = Cairo({ 
  subsets: ['arabic', 'latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-cairo',
  display: 'swap',
})

const tajawal = Tajawal({ 
  subsets: ['arabic', 'latin'],
  weight: ['200', '300', '400', '500', '700', '800', '900'],
  variable: '--font-tajawal',
  display: 'swap',
})

const notoKufiArabic = Noto_Kufi_Arabic({ 
  subsets: ['arabic'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-noto-kufi-arabic',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'منصة الخدمات المنزلية',
  description: 'اعثر على أفضل الحرفيين لصيانة منزلك',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.variable} ${tajawal.variable} ${notoKufiArabic.variable} font-sans antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}