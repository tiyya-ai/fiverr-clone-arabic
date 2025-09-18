'use client'

import { useState, useEffect, useMemo } from 'react'
import { Clock, MapPin, DollarSign, Users, Search, Filter, Briefcase, Calendar, Star } from 'lucide-react'
import MainHeader from '@/components/MainHeader'
import Footer from '@/components/Footer'
import Image from 'next/image';

interface Job {
  id: string
  title: string
  description: string
  company: string
  companyLogo: string
  location: string
  type: 'full-time' | 'part-time' | 'contract' | 'freelance'
  category: string
  salary: {
    min: number
    max: number
    currency: string
    period: 'hour' | 'month' | 'project'
  }
  requirements: string[]
  skills: string[]
  experience: string
  postedDate: string
  deadline: string
  applicants: number
  isRemote: boolean
  isUrgent: boolean
  companyRating: number
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [sortBy, setSortBy] = useState('recent')

  // Mock jobs data
  const mockJobs: Job[] = useMemo(() => [
    {
      id: '1',
      title: 'مطور React.js متقدم',
      description: 'نبحث عن مطور React.js متقدم للانضمام إلى فريقنا لتطوير تطبيقات ويب حديثة ومتطورة. المرشح المثالي يجب أن يكون لديه خبرة قوية في React, Redux, وTypeScript.',
      company: 'شركة التقنية المتقدمة',
      companyLogo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop',
      location: 'الرياض، السعودية',
      type: 'full-time',
      category: 'تطوير البرمجيات',
      salary: {
        min: 8000,
        max: 12000,
        currency: 'ر.س',
        period: 'month'
      },
      requirements: [
        'خبرة 3+ سنوات في React.js',
        'إتقان JavaScript و TypeScript',
        'خبرة في Redux أو Context API',
        'معرفة بـ REST APIs و GraphQL'
      ],
      skills: ['React.js', 'TypeScript', 'Redux', 'JavaScript', 'HTML/CSS'],
      experience: '3-5 سنوات',
      postedDate: '2024-02-20',
      deadline: '2024-03-15',
      applicants: 23,
      isRemote: false,
      isUrgent: true,
      companyRating: 4.5
    },
    {
      id: '2',
      title: 'مصمم UI/UX',
      description: 'نحن نبحث عن مصمم UI/UX مبدع وموهوب للانضمام إلى فريق التصميم لدينا. ستكون مسؤولاً عن تصميم واجهات المستخدم وتجربة المستخدم لتطبيقاتنا الرقمية.',
      company: 'استوديو الإبداع الرقمي',
      companyLogo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=100&h=100&fit=crop',
      location: 'جدة، السعودية',
      type: 'full-time',
      category: 'التصميم',
      salary: {
        min: 6000,
        max: 9000,
        currency: 'ر.س',
        period: 'month'
      },
      requirements: [
        'خبرة 2+ سنوات في UI/UX',
        'إتقان Figma و Adobe XD',
        'معرفة بمبادئ التصميم',
        'خبرة في تصميم التطبيقات المحمولة'
      ],
      skills: ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator', 'Prototyping'],
      experience: '2-4 سنوات',
      postedDate: '2024-02-18',
      deadline: '2024-03-10',
      applicants: 45,
      isRemote: true,
      isUrgent: false,
      companyRating: 4.2
    },
    {
      id: '3',
      title: 'مختص تسويق رقمي',
      description: 'نبحث عن مختص تسويق رقمي لإدارة حملاتنا الإعلانية وتطوير استراتيجيات التسويق الرقمي. المرشح المثالي يجب أن يكون لديه خبرة في Google Ads و Facebook Ads.',
      company: 'وكالة التسويق الذكي',
      companyLogo: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=100&h=100&fit=crop',
      location: 'الدمام، السعودية',
      type: 'contract',
      category: 'التسويق الرقمي',
      salary: {
        min: 5000,
        max: 8000,
        currency: 'ر.س',
        period: 'month'
      },
      requirements: [
        'خبرة 2+ سنوات في التسويق الرقمي',
        'إتقان Google Ads و Facebook Ads',
        'معرفة بـ SEO و SEM',
        'خبرة في تحليل البيانات'
      ],
      skills: ['Google Ads', 'Facebook Ads', 'SEO', 'Analytics', 'Content Marketing'],
      experience: '2-3 سنوات',
      postedDate: '2024-02-15',
      deadline: '2024-03-05',
      applicants: 67,
      isRemote: true,
      isUrgent: false,
      companyRating: 4.7
    },
    {
      id: '4',
      title: 'كاتب محتوى إبداعي',
      description: 'نحن نبحث عن كاتب محتوى إبداعي للانضمام إلى فريق المحتوى لدينا. ستكون مسؤولاً عن كتابة محتوى تسويقي وإبداعي لمنصاتنا الرقمية.',
      company: 'شركة المحتوى الإبداعي',
      companyLogo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&h=100&fit=crop',
      location: 'مكة، السعودية',
      type: 'part-time',
      category: 'الكتابة والمحتوى',
      salary: {
        min: 25,
        max: 40,
        currency: 'ر.س',
        period: 'hour'
      },
      requirements: [
        'خبرة في كتابة المحتوى',
        'إتقان اللغة العربية',
        'معرفة بـ SEO',
        'قدرة على البحث والتحليل'
      ],
      skills: ['كتابة المحتوى', 'SEO Writing', 'البحث', 'التحرير', 'الإبداع'],
      experience: '1-2 سنة',
      postedDate: '2024-02-12',
      deadline: '2024-02-28',
      applicants: 89,
      isRemote: true,
      isUrgent: true,
      companyRating: 4.0
    },
    {
      id: '5',
      title: 'مطور تطبيقات الجوال',
      description: 'نبحث عن مطور تطبيقات جوال متخصص في Flutter أو React Native لتطوير تطبيقات iOS و Android مبتكرة.',
      company: 'تطبيقات المستقبل',
      companyLogo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=100&h=100&fit=crop',
      location: 'الرياض، السعودية',
      type: 'full-time',
      category: 'تطوير التطبيقات',
      salary: {
        min: 9000,
        max: 14000,
        currency: 'ر.س',
        period: 'month'
      },
      requirements: [
        'خبرة 3+ سنوات في تطوير التطبيقات',
        'إتقان Flutter أو React Native',
        'معرفة بـ Firebase',
        'خبرة في نشر التطبيقات'
      ],
      skills: ['Flutter', 'React Native', 'Dart', 'Firebase', 'Mobile Development'],
      experience: '3-5 سنوات',
      postedDate: '2024-02-10',
      deadline: '2024-03-20',
      applicants: 34,
      isRemote: false,
      isUrgent: false,
      companyRating: 4.8
    }
  ], [])

  const categories = ['تطوير البرمجيات', 'التصميم', 'التسويق الرقمي', 'الكتابة والمحتوى', 'تطوير التطبيقات']
  const jobTypes = ['full-time', 'part-time', 'contract', 'freelance']

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setJobs(mockJobs)
      setFilteredJobs(mockJobs)
      setLoading(false)
    }, 1000)
  }, [mockJobs])

  useEffect(() => {
    let filtered = jobs

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(job => job.category === selectedCategory)
    }

    // Type filter
    if (selectedType) {
      filtered = filtered.filter(job => job.type === selectedType)
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
        case 'salary':
          return b.salary.max - a.salary.max
        case 'applicants':
          return a.applicants - b.applicants
        case 'deadline':
          return new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
        default:
          return 0
      }
    })

    setFilteredJobs(filtered)
  }, [jobs, searchQuery, selectedCategory, selectedType, sortBy])

  const formatSalary = (salary: Job['salary']) => {
    const periodText = {
      hour: 'في الساعة',
      month: 'شهرياً',
      project: 'للمشروع'
    }
    
    return `${salary.min} - ${salary.max} ${salary.currency} ${periodText[salary.period]}`
  }

  const getJobTypeText = (type: string) => {
    const types = {
      'full-time': 'دوام كامل',
      'part-time': 'دوام جزئي',
      'contract': 'عقد',
      'freelance': 'عمل حر'
    }
    return types[type as keyof typeof types] || type
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ar-SA')
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
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4" dir="rtl">الوظائف</h1>
          <p className="text-gray-600" dir="rtl">اعثر على الوظيفة المثالية التي تناسب مهاراتك وطموحاتك</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="ابحث عن وظيفة..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                dir="rtl"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
            >
              <option value="">جميع الفئات</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            {/* Type Filter */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
            >
              <option value="">جميع الأنواع</option>
              {jobTypes.map(type => (
                <option key={type} value={type}>{getJobTypeText(type)}</option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
            >
              <option value="recent">الأحدث</option>
              <option value="salary">الراتب الأعلى</option>
              <option value="applicants">الأقل متقدمين</option>
              <option value="deadline">قرب انتهاء الموعد</option>
            </select>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">جاري تحميل الوظائف...</p>
          </div>
        ) : (
          <>
            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-600" dir="rtl">
                تم العثور على {filteredJobs.length} وظيفة
              </p>
            </div>

            {/* Jobs List */}
            <div className="space-y-6">
              {filteredJobs.map(job => (
                <div key={job.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4 flex-1">
                      <Image
                        src={job.companyLogo}
                        alt={job.company}
                        width={64}
                        height={64}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900" dir="rtl">{job.title}</h3>
                          {job.isUrgent && (
                            <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                              عاجل
                            </span>
                          )}
                          {job.isRemote && (
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                              عن بُعد
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <span className="font-medium">{job.company}</span>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span>{job.companyRating}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{job.location}</span>
                          </div>
                          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                            {getJobTypeText(job.type)}
                          </span>
                        </div>
                        
                        <p className="text-gray-600 mb-4 line-clamp-2 text-right" dir="rtl">
                          {job.description}
                        </p>
                        
                        {/* Skills */}
                        <div className="flex flex-wrap gap-2 mb-4 justify-end">
                          {job.skills.slice(0, 5).map(skill => (
                            <span
                              key={skill}
                              className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                          {job.skills.length > 5 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                              +{job.skills.length - 5}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-left">
                      <div className="text-lg font-semibold text-green-600 mb-2">
                        {formatSalary(job.salary)}
                      </div>
                      <button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors">
                        تقدم الآن
                      </button>
                    </div>
                  </div>
                  
                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{getDaysAgo(job.postedDate)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>ينتهي في {formatDate(job.deadline)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{job.applicants} متقدم</span>
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-600">
                      خبرة: {job.experience}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredJobs.length === 0 && (
              <div className="text-center py-12">
                <Briefcase className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد وظائف</h3>
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