import { Book, MessageCircle, Phone, Video, FileText, Users } from 'lucide-react'
import MainHeader from '@/components/MainHeader'
import Footer from '@/components/Footer'

export default function Help() {
  const helpCategories = [
    {
      icon: Book,
      title: 'دليل المستخدم',
      description: 'تعلم كيفية استخدام المنصة خطوة بخطوة',
      link: '/help/user-guide'
    },
    {
      icon: MessageCircle,
      title: 'الدردشة المباشرة',
      description: 'تحدث مع فريق الدعم الفني مباشرة',
      link: '/help/chat'
    },
    {
      icon: Phone,
      title: 'الاتصال الهاتفي',
      description: 'اتصل بنا على الرقم المجاني',
      link: 'tel:+966123456789'
    },
    {
      icon: Video,
      title: 'فيديوهات تعليمية',
      description: 'شاهد الفيديوهات التعليمية',
      link: '/help/videos'
    },
    {
      icon: FileText,
      title: 'الأسئلة الشائعة',
      description: 'إجابات على الأسئلة الأكثر شيوعاً',
      link: '/faq'
    },
    {
      icon: Users,
      title: 'منتدى المجتمع',
      description: 'تفاعل مع المستخدمين الآخرين',
      link: '/help/community'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <MainHeader />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">مركز المساعدة</h1>
          <p className="text-xl text-gray-600">نحن هنا لمساعدتك في كل خطوة</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {helpCategories.map((category, index) => {
            const IconComponent = category.icon
            return (
              <a
                key={index}
                href={category.link}
                className="bg-white rounded-lg shadow-sm p-8 hover:shadow-md transition-shadow group"
              >
                <div className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                    <IconComponent className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{category.title}</h3>
                  <p className="text-gray-600">{category.description}</p>
                </div>
              </a>
            )
          })}
        </div>

        {/* Quick Help Section */}
        <div className="mt-16 bg-blue-50 rounded-lg p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">تحتاج مساعدة فورية؟</h2>
            <p className="text-gray-600 mb-6">فريق الدعم الفني متاح 24/7 لمساعدتك</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                تواصل معنا الآن
              </a>
              <a
                href="tel:+966123456789"
                className="bg-white text-blue-600 border border-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors"
              >
                اتصل بنا
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}