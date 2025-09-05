import MainHeader from '@/components/MainHeader'
import Footer from '@/components/Footer'

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50">
      <MainHeader />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">الشروط والأحكام</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-6" dir="rtl">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. قبول الشروط</h2>
            <p className="text-gray-600 leading-relaxed">
              باستخدام منصة WBL3، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي من هذه الشروط، يرجى عدم استخدام المنصة.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. وصف الخدمة</h2>
            <p className="text-gray-600 leading-relaxed">
              WBL3 هي منصة رقمية تربط بين العملاء ومقدمي الخدمات المحترفين في مجال الصيانة المنزلية والخدمات التقنية.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. التسجيل والحساب</h2>
            <p className="text-gray-600 leading-relaxed">
              يجب عليك تقديم معلومات دقيقة وحديثة عند التسجيل. أنت مسؤول عن الحفاظ على سرية كلمة المرور الخاصة بك.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. الدفع والرسوم</h2>
            <p className="text-gray-600 leading-relaxed">
              جميع الأسعار معروضة بالريال السعودي وتشمل ضريبة القيمة المضافة. يتم الدفع من خلال وسائل الدفع المعتمدة في المنصة.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. إلغاء الخدمة</h2>
            <p className="text-gray-600 leading-relaxed">
              يمكن إلغاء الطلب قبل بدء تنفيذ الخدمة. بعد بدء التنفيذ، يخضع الإلغاء لسياسة الإلغاء المحددة لكل خدمة.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. المسؤولية</h2>
            <p className="text-gray-600 leading-relaxed">
              WBL3 تعمل كوسيط بين العملاء ومقدمي الخدمات. نحن غير مسؤولين عن جودة الخدمات المقدمة من قبل مقدمي الخدمات المستقلين.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  )
}