import MainHeader from '@/components/MainHeader'
import Footer from '@/components/Footer'

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <MainHeader />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">سياسة الخصوصية</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-6" dir="rtl">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">جمع المعلومات</h2>
            <p className="text-gray-600 leading-relaxed">
              نجمع المعلومات التي تقدمها لنا مباشرة عند التسجيل أو استخدام خدماتنا، بما في ذلك الاسم، البريد الإلكتروني، ورقم الهاتف.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">استخدام المعلومات</h2>
            <p className="text-gray-600 leading-relaxed">
              نستخدم معلوماتك لتقديم الخدمات، تحسين تجربة المستخدم، والتواصل معك بخصوص طلباتك وحسابك.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">مشاركة المعلومات</h2>
            <p className="text-gray-600 leading-relaxed">
              لا نشارك معلوماتك الشخصية مع أطراف ثالثة إلا بموافقتك أو عند الضرورة لتقديم الخدمة المطلوبة.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">أمان المعلومات</h2>
            <p className="text-gray-600 leading-relaxed">
              نتخذ تدابير أمنية مناسبة لحماية معلوماتك من الوصول غير المصرح به أو التغيير أو الكشف أو التدمير.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">حقوقك</h2>
            <p className="text-gray-600 leading-relaxed">
              يحق لك الوصول إلى معلوماتك الشخصية وتصحيحها أو حذفها. يمكنك التواصل معنا لممارسة هذه الحقوق.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  )
}