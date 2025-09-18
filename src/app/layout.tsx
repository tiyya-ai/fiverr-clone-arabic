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
  title: {
    default: 'منصة الخدمات المصغرة - WBL3.org',
    template: '%s | WBL3.org'
  },
  description: 'منصة عربية رائدة للخدمات المصغرة. اكتشف آلاف الخدمات المتخصصة من مطورين ومصممين وكتاب محترفين. ابدأ مشروعك اليوم بأسعار تنافسية وجودة عالية.',
  keywords: [
    'خدمات مصغرة',
    'فريلانس',
    'عمل حر',
    'خدمات عربية',
    'تصميم',
    'برمجة',
    'كتابة',
    'ترجمة',
    'تسويق',
    'WBL3',
    'منصة خدمات'
  ],
  authors: [{ name: 'WBL3 Team' }],
  creator: 'WBL3.org',
  publisher: 'WBL3.org',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://wbl3.org'),
  alternates: {
    canonical: '/',
    languages: {
      'ar': '/',
      'en': '/en',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ar_SA',
    url: '/',
    title: 'منصة الخدمات المصغرة - WBL3.org',
    description: 'منصة عربية رائدة للخدمات المصغرة. اكتشف آلاف الخدمات المتخصصة من مطورين ومصممين وكتاب محترفين.',
    siteName: 'WBL3.org',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'منصة WBL3 للخدمات المصغرة',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'منصة الخدمات المصغرة - WBL3.org',
    description: 'منصة عربية رائدة للخدمات المصغرة. اكتشف آلاف الخدمات المتخصصة من مطورين ومصممين وكتاب محترفين.',
    images: ['/twitter-image.jpg'],
    creator: '@WBL3org',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_VERIFICATION_ID,
    yandex: process.env.YANDEX_VERIFICATION_ID,
    other: {
      'msvalidate.01': process.env.BING_VERIFICATION_ID || '',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "WBL3.org - منصة الخدمات المصغرة",
    "alternateName": "WBL3",
    "url": process.env.NEXT_PUBLIC_BASE_URL || "https://wbl3.org",
    "description": "منصة عربية رائدة للخدمات المصغرة. اكتشف آلاف الخدمات المتخصصة من مطورين ومصممين وكتاب محترفين.",
    "inLanguage": "ar",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${process.env.NEXT_PUBLIC_BASE_URL || "https://wbl3.org"}/services?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "WBL3.org",
      "url": process.env.NEXT_PUBLIC_BASE_URL || "https://wbl3.org",
      "logo": {
        "@type": "ImageObject",
        "url": `${process.env.NEXT_PUBLIC_BASE_URL || "https://wbl3.org"}/logo.png`
      }
    }
  }

  return (
    <html lang="ar" dir="rtl">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://api.stripe.com" />
        <link rel="dns-prefetch" href="https://js.stripe.com" />
        <meta name="theme-color" content="#3B82F6" />
        <meta name="msapplication-TileColor" content="#3B82F6" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`${cairo.variable} ${tajawal.variable} ${notoKufiArabic.variable} font-sans antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}