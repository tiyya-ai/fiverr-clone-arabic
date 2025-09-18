'use client'

import { useState, useEffect, useMemo } from 'react'
import { Clock, DollarSign, Users, Search, Filter, FolderOpen, Calendar, Star, MapPin } from 'lucide-react'
import MainHeader from '@/components/MainHeader'
import Footer from '@/components/Footer'
import Image from 'next/image';

interface Project {
  id: string
  title: string
  description: string
  client: string
  clientAvatar: string
  category: string
  budget: {
    min: number
    max: number
    currency: string
    type: 'fixed' | 'hourly'
  }
  duration: string
  skills: string[]
  requirements: string[]
  postedDate: string
  deadline: string
  proposals: number
  clientRating: number
  clientReviews: number
  location: string
  isRemote: boolean
  isUrgent: boolean
  experienceLevel: 'beginner' | 'intermediate' | 'expert'
  projectType: 'short-term' | 'long-term' | 'ongoing'
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedBudget, setSelectedBudget] = useState('')
  const [sortBy, setSortBy] = useState('recent')

  // Mock projects data
  const mockProjects: Project[] = useMemo(() => [
    {
      id: '1',
      title: 'تطوير متجر إلكتروني متكامل',
      description: 'أحتاج إلى تطوير متجر إلكتروني متكامل باستخدام React و Node.js مع نظام دفع آمن وإدارة المخزون. المشروع يتطلب تصميم حديث ومتجاوب مع جميع الأجهزة.',
      client: 'محمد الأحمد',
      clientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      category: 'تطوير الويب',
      budget: {
        min: 15000,
        max: 25000,
        currency: 'ر.س',
        type: 'fixed'
      },
      duration: '2-3 أشهر',
      skills: ['React.js', 'Node.js', 'MongoDB', 'Payment Gateway', 'E-commerce'],
      requirements: [
        'خبرة في تطوير المتاجر الإلكترونية',
        'معرفة بأنظمة الدفع الإلكتروني',
        'القدرة على التسليم في الوقت المحدد',
        'تقديم دعم فني بعد التسليم'
      ],
      postedDate: '2024-02-20',
      deadline: '2024-03-01',
      proposals: 12,
      clientRating: 4.8,
      clientReviews: 23,
      location: 'الرياض، السعودية',
      isRemote: true,
      isUrgent: true,
      experienceLevel: 'expert',
      projectType: 'long-term'
    },
    {
      id: '2',
      title: 'تصميم هوية بصرية لشركة ناشئة',
      description: 'نحن شركة ناشئة في مجال التقنية ونحتاج إلى تصميم هوية بصرية كاملة تشمل الشعار، الألوان، الخطوط، وجميع المواد التسويقية.',
      client: 'سارة العتيبي',
      clientAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      category: 'التصميم الجرافيكي',
      budget: {
        min: 5000,
        max: 8000,
        currency: 'ر.س',
        type: 'fixed'
      },
      duration: '3-4 أسابيع',
      skills: ['Branding', 'Logo Design', 'Adobe Illustrator', 'Photoshop', 'Brand Guidelines'],
      requirements: [
        'خبرة في تصميم الهويات البصرية',
        'إتقان Adobe Creative Suite',
        'تقديم عدة خيارات للتصميم',
        'تسليم الملفات بصيغ مختلفة'
      ],
      postedDate: '2024-02-18',
      deadline: '2024-02-28',
      proposals: 28,
      clientRating: 4.5,
      clientReviews: 15,
      location: 'جدة، السعودية',
      isRemote: true,
      isUrgent: false,
      experienceLevel: 'intermediate',
      projectType: 'short-term'
    }
  ], [])

  const categories = ['تطوير الويب', 'التصميم الجرافيكي', 'التسويق الرقمي', 'الكتابة والمحتوى', 'تطوير التطبيقات']
  const budgetRanges = ['أقل من 1000', '1000-5000', '5000-10000', '10000-20000', 'أكثر من 20000']

  useEffect(() => {
    setTimeout(() => {
      setProjects(mockProjects)
      setFilteredProjects(mockProjects)
      setLoading(false)
    }, 1000)
  }, [mockProjects])

  useEffect(() => {
    let filtered = projects

    if (searchQuery) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    if (selectedCategory) {
      filtered = filtered.filter(project => project.category === selectedCategory)
    }

    if (selectedBudget) {
      filtered = filtered.filter(project => {
        const max = project.budget.max
        switch (selectedBudget) {
          case 'أقل من 1000':
            return max < 1000
          case '1000-5000':
            return max >= 1000 && max <= 5000
          case '5000-10000':
            return max >= 5000 && max <= 10000
          case '10000-20000':
            return max >= 10000 && max <= 20000
          case 'أكثر من 20000':
            return max > 20000
          default:
            return true
        }
      })
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
        case 'budget':
          return b.budget.max - a.budget.max
        case 'proposals':
          return a.proposals - b.proposals
        case 'deadline':
          return new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
        default:
          return 0
      }
    })

    setFilteredProjects(filtered)
  }, [projects, searchQuery, selectedCategory, selectedBudget, sortBy])

  const formatBudget = (budget: Project['budget']) => {
    if (budget.type === 'hourly') {
      return `${budget.min} - ${budget.max} ${budget.currency} في الساعة`
    }
    return `${budget.min} - ${budget.max} ${budget.currency}`
  }

  const getDaysAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return `منذ ${diffDays} يوم`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <MainHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4" dir="rtl">المشاريع</h1>
          <p className="text-gray-600" dir="rtl">اعثر على المشاريع المناسبة لمهاراتك وابدأ العمل عليها</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="ابحث عن مشروع..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#1ab7ea] focus:border-[#1ab7ea]"
                dir="rtl"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#1ab7ea] focus:border-[#1ab7ea]"
            >
              <option value="">جميع الفئات</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <select
              value={selectedBudget}
              onChange={(e) => setSelectedBudget(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#1ab7ea] focus:border-[#1ab7ea]"
            >
              <option value="">جميع الميزانيات</option>
              {budgetRanges.map(range => (
                <option key={range} value={range}>{range} ر.س</option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#1ab7ea] focus:border-[#1ab7ea]"
            >
              <option value="recent">الأحدث</option>
              <option value="budget">الميزانية الأعلى</option>
              <option value="proposals">الأقل عروض</option>
              <option value="deadline">قرب انتهاء الموعد</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1ab7ea] mx-auto"></div>
            <p className="mt-4 text-gray-600">جاري تحميل المشاريع...</p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-gray-600" dir="rtl">
                تم العثور على {filteredProjects.length} مشروع
              </p>
            </div>

            <div className="space-y-4">
              {filteredProjects.map(project => (
                <div key={project.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-6 border border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900 text-right" dir="rtl">{project.title}</h3>
                        {project.isUrgent && (
                          <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                            عاجل
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <span className="font-medium">{project.client}</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span>{project.clientRating}</span>
                        </div>
                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                          {project.category}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-3 text-right line-clamp-2" dir="rtl">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 justify-end">
                        {project.skills.slice(0, 3).map(skill => (
                          <span
                            key={skill}
                            className="px-2 py-1 bg-blue-100 text-[#1ab7ea] text-xs rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                        {project.skills.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                            +{project.skills.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-left ml-6">
                      <div className="text-lg font-bold text-[#1ab7ea] mb-3">
                        {formatBudget(project.budget)}
                      </div>
                      <button className="bg-[#1ab7ea] text-white px-6 py-2 rounded-md hover:bg-[#0ea5d9] transition-colors">
                        أرسل عرض
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{getDaysAgo(project.postedDate)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{project.proposals} عرض</span>
                      </div>
                    </div>
                    <span>المدة: {project.duration}</span>
                  </div>
                </div>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <FolderOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد مشاريع</h3>
                <p className="text-gray-600">جرب تغيير معايير البحث أو الفلاتر</p>
              </div>
            )}
          </>
        )}
      </div>
      
      <Footer />
    </div>
  )
}