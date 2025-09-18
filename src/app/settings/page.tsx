'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import MainHeader from '@/components/MainHeader';

interface UserSettings {
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  privacy: {
    profileVisibility: 'public' | 'private';
    showEmail: boolean;
    showPhone: boolean;
  };
  language: string;
  currency: string;
}

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [settings, setSettings] = useState<UserSettings>({
    notifications: {
      email: true,
      sms: false,
      push: true
    },
    privacy: {
      profileVisibility: 'public',
      showEmail: false,
      showPhone: false
    },
    language: 'ar',
    currency: 'SAR'
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/api/auth/signin');
      return;
    }
  }, [session, status, router]);

  const handleSave = async () => {
    setLoading(true);
    try {
      // Here you would typically save to your API
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      setMessage('تم حفظ الإعدادات بنجاح!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('حدث خطأ أثناء حفظ الإعدادات');
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <MainHeader />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900" dir="rtl">إعدادات الحساب</h1>
            <p className="text-gray-600 mt-2" dir="rtl">قم بإدارة إعدادات حسابك وتفضيلاتك</p>
          </div>

          <div className="p-6 space-y-8">
            {/* Notifications Section */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4" dir="rtl">الإشعارات</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between" dir="rtl">
                  <div>
                    <label className="text-sm font-medium text-gray-700">إشعارات البريد الإلكتروني</label>
                    <p className="text-sm text-gray-500">تلقي إشعارات حول الطلبات والرسائل</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.notifications.email}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, email: e.target.checked }
                    }))}
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                  />
                </div>
                
                <div className="flex items-center justify-between" dir="rtl">
                  <div>
                    <label className="text-sm font-medium text-gray-700">إشعارات الرسائل النصية</label>
                    <p className="text-sm text-gray-500">تلقي إشعارات SMS للطلبات المهمة</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.notifications.sms}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, sms: e.target.checked }
                    }))}
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                  />
                </div>

                <div className="flex items-center justify-between" dir="rtl">
                  <div>
                    <label className="text-sm font-medium text-gray-700">الإشعارات الفورية</label>
                    <p className="text-sm text-gray-500">تلقي إشعارات فورية في المتصفح</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.notifications.push}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, push: e.target.checked }
                    }))}
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                  />
                </div>
              </div>
            </div>

            {/* Privacy Section */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4" dir="rtl">الخصوصية</h2>
              <div className="space-y-4">
                <div dir="rtl">
                  <label className="block text-sm font-medium text-gray-700 mb-2">مستوى الخصوصية</label>
                  <select
                    value={settings.privacy.profileVisibility}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      privacy: { ...prev.privacy, profileVisibility: e.target.value as 'public' | 'private' }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="public">عام - يمكن للجميع رؤية ملفك الشخصي</option>
                    <option value="private">خاص - ملف شخصي محدود الرؤية</option>
                  </select>
                </div>

                <div className="flex items-center justify-between" dir="rtl">
                  <div>
                    <label className="text-sm font-medium text-gray-700">إظهار البريد الإلكتروني</label>
                    <p className="text-sm text-gray-500">السماح للآخرين برؤية بريدك الإلكتروني</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.privacy.showEmail}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      privacy: { ...prev.privacy, showEmail: e.target.checked }
                    }))}
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                  />
                </div>

                <div className="flex items-center justify-between" dir="rtl">
                  <div>
                    <label className="text-sm font-medium text-gray-700">إظهار رقم الهاتف</label>
                    <p className="text-sm text-gray-500">السماح للآخرين برؤية رقم هاتفك</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.privacy.showPhone}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      privacy: { ...prev.privacy, showPhone: e.target.checked }
                    }))}
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                  />
                </div>
              </div>
            </div>

            {/* Language & Currency */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4" dir="rtl">اللغة والعملة</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div dir="rtl">
                  <label className="block text-sm font-medium text-gray-700 mb-2">اللغة</label>
                  <select
                    value={settings.language}
                    onChange={(e) => setSettings(prev => ({ ...prev, language: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="ar">العربية</option>
                    <option value="en">English</option>
                  </select>
                </div>

                <div dir="rtl">
                  <label className="block text-sm font-medium text-gray-700 mb-2">العملة</label>
                  <select
                    value={settings.currency}
                    onChange={(e) => setSettings(prev => ({ ...prev, currency: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="SAR">ريال سعودي (SAR)</option>
                    <option value="USD">دولار أمريكي (USD)</option>
                    <option value="EUR">يورو (EUR)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end pt-6 border-t border-gray-200">
              {message && (
                <div className={`mr-4 px-4 py-2 rounded-md text-sm ${
                  message.includes('نجاح') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {message}
                </div>
              )}
              <button
                onClick={handleSave}
                disabled={loading}
                className="px-6 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'جاري الحفظ...' : 'حفظ الإعدادات'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}