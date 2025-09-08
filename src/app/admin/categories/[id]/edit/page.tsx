'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowRight, Upload, X } from 'lucide-react'

// Mock data
const mockCategories: Record<string, { name: string; description: string; icon: string; status: string }> = {
  '1': { name: 'تطوير المواقع', description: 'خدمات تطوير المواقع والتطبيقات', icon: '💻', status: 'active' },
  '2': { name: 'التصميم الجرافيكي', description: 'خدمات التصميم والجرافيك', icon: '🎨', status: 'active' },
  '3': { name: 'التسويق الرقمي', description: 'خدمات التسويق الإلكتروني', icon: '📱', status: 'active' }
}

export default function EditCategoryPage() {
  const router = useRouter()
  const params = useParams()
  const categoryId = params?.id as string

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: '',
    status: 'active'
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const category = mockCategories[categoryId as keyof typeof mockCategories]
    if (category) {
      setFormData(category)
    }
    setLoading(false)
  }, [categoryId])

  const sanitizeInput = (input: string): string => {
    if (!input || typeof input !== 'string') return ''
    return input
      .replace(/[<>"'&]/g, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+=/gi, '')
      .trim()
      .substring(0, 100)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    const sanitizedValue = name === 'status' ? value : sanitizeInput(value)
    setFormData(prev => ({
      ...prev,
      [name]: sanitizedValue
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
      if (!allowedTypes.includes(file.type)) {
        alert('نوع الملف غير مدعوم. يرجى اختيار صورة بصيغة JPG, PNG, GIF أو WebP')
        return
      }
      
      if (file.size > 5 * 1024 * 1024) {
        alert('حجم الملف كبير جداً. يرجى اختيار صورة أصغر من 5 ميجابايت')
        return
      }
      
      setImageFile(file)
      const reader = new FileReader()
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const result = e.target?.result as string
        if (result && result.startsWith('data:image/')) {
          setImagePreview(result)
        }
      }
      reader.onerror = () => {
        alert('حدث خطأ في قراءة الملف. يرجى المحاولة مرة أخرى')
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setImageFile(null)
    setImagePreview(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const sanitizedName = sanitizeInput(formData.name)
    if (!sanitizedName) {
      alert('يرجى إدخال اسم الفئة')
      return
    }

    alert('تم تحديث الفئة بنجاح!')
    router.push('/admin/categories')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">جاري تحميل بيانات الفئة...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ArrowRight className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">تعديل الفئة</h1>
          <p className="text-gray-600 mt-2">تعديل بيانات الفئة #{categoryId ? sanitizeInput(categoryId) : 'غير محدد'}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            اسم الفئة *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="مثال: تطوير المواقع"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            الوصف
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="وصف مختصر للفئة..."
          />
        </div>

        <div>
          <label htmlFor="icon" className="block text-sm font-medium text-gray-700 mb-2">
            الأيقونة (إيموجي)
          </label>
          <input
            type="text"
            id="icon"
            name="icon"
            value={formData.icon}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="💻"
            maxLength={2}
          />
          <p className="text-sm text-gray-500 mt-1">
            يمكنك استخدام إيموجي كأيقونة للفئة
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            صورة الفئة
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="معاينة الصورة"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="text-center">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">اسحب الصورة هنا أو انقر للاختيار</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer inline-block"
                >
                  اختيار صورة
                </label>
              </div>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
            الحالة
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="active">نشط</option>
            <option value="inactive">غير نشط</option>
          </select>
        </div>

        <div className="flex gap-4 pt-6">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 font-medium"
          >
            حفظ التغييرات
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 font-medium"
          >
            إلغاء
          </button>
        </div>
      </form>
    </div>
  )
}