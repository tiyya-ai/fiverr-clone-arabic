export default function SignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-center mb-6">تسجيل الدخول</h2>
        <form className="space-y-4">
          <input
            type="email"
            placeholder="البريد الإلكتروني"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="password"
            placeholder="كلمة المرور"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
            تسجيل الدخول
          </button>
        </form>
      </div>
    </div>
  )
}