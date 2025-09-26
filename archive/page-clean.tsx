'use client'

import MainHeader from '@/components/MainHeader'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <MainHeader />
      
      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            منصة الخدمات المنزلية
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            اعثر على أفضل الحرفيين لمنزلك
          </p>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-4">الخدمات المتاحة</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">الكهرباء</div>
              <div className="p-4 border rounded-lg">السباكة</div>
              <div className="p-4 border rounded-lg">التكييف</div>
              <div className="p-4 border rounded-lg">النجارة</div>
              <div className="p-4 border rounded-lg">كاميرات المراقبة</div>
              <div className="p-4 border rounded-lg">البناء والمقاولات</div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}