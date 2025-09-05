import { Headphones, MessageCircle, Mail, Clock } from 'lucide-react'
import MainHeader from '@/components/MainHeader'
import Footer from '@/components/Footer'

export default function Support() {
  return (
    <div className="min-h-screen bg-gray-50">
      <MainHeader />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">الدعم الفني</h1>
          <p className="text-xl text-gray-600">نحن هنا لمساعدتك في حل أي مشكلة تواجهها</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Headphones className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">دعم هاتفي</h3>
            <p className="text-gray-600 mb-4">تحدث مع فريق الدعم مباشرة</p>
            <a
              href="tel:+966123456789"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              اتصل الآن
            </a>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">دردشة مباشرة</h3>
            <p className="text-gray-600 mb-4">احصل على مساعدة فورية</p>
            <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
              ابدأ المحادثة
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">ساعات الدعم</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center">
              <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">الدعم الهاتفي</h3>
              <p className="text-gray-600">الأحد - الخميس: 9:00 ص - 6:00 م</p>
              <p className="text-gray-600">الجمعة - السبت: 10:00 ص - 4:00 م</p>
            </div>
            
            <div className="text-center">
              <Mail className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">الدعم الإلكتروني</h3>
              <p className="text-gray-600">متاح 24/7</p>
              <p className="text-gray-600">نرد خلال 24 ساعة</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}