'use client'

import { useState, useEffect } from 'react'
import { Star, MapPin, Clock, Search, Filter, User, MessageCircle, Heart, CheckCircle } from 'lucide-react'
import MainHeader from '@/components/MainHeader'
import Footer from '@/components/Footer'
import { mockUsers } from '@/data/mockData'
import Image from 'next/image';

interface Freelancer {
  id: string
  fullName: string
  avatar: string
  title: string
  description: string
  rating: number
  totalReviews: number
  completedJobs: number
  responseTime: string
  location: string
  hourlyRate: number
  skills: string[]
  languages: string[]
  isOnline: boolean
  isVerified: boolean
  joinedDate: string
  successRate: number
}

export default function FreelancersPage() {
  const [freelancers, setFreelancers] = useState<Freelancer[]>([])
  const [filteredFreelancers, setFilteredFreelancers] = useState<Freelancer[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSkill, setSelectedSkill] = useState('')
  const [minRating, setMinRating] = useState(0)
  const [sortBy, setSortBy] = useState('rating')

  // Mock freelancers data
  const mockFreelancers: Freelancer[] = [
    {
      id: '1',
      fullName: 'أحمد محمد',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      title: 'مطور مواقع متخصص في React و Node.js',
      description: 'مطور ويب محترف مع خبرة 5 سنوات في تطوير تطبيقات الويب الحديثة باستخدام React, Node.js, والتقنيات الحديثة.',
      rating: 4.9,
      totalReviews: 127,
      completedJobs: 89,
      responseTime: 'خلال ساعة',
      location: 'الرياض، السعودية',
      hourlyRate: 75,
      skills: ['React', 'Node.js', 'JavaScript', 'TypeScript', 'MongoDB'],
      languages: ['العربية', 'الإنجليزية'],
      isOnline: true,
      isVerified: true,
      joinedDate: '2022-01-15',
      successRate: 98
    },
    {
      id: '2',
      fullName: 'فاطمة العلي',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      title: 'مصممة جرافيك ومصممة UI/UX',
      description: 'مصممة إبداعية متخصصة في تصميم الهويات البصرية وتجربة المستخدم مع خبرة في Adobe Creative Suite و Figma.',
      rating: 4.8,
      totalReviews: 95,
      completedJobs: 156,
      responseTime: 'خلال 30 دقيقة',
      location: 'جدة، السعودية',
      hourlyRate: 60,
      skills: ['Photoshop', 'Illustrator', 'Figma', 'UI/UX', 'Branding'],
      languages: ['العربية', 'الإنجليزية', 'الفرنسية'],
      isOnline: true,
      isVerified: true,
      joinedDate: '2021-08-20',
      successRate: 96
    },
    {
      id: '3',
      fullName: 'خالد السعد',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      title: 'مختص تسويق رقمي وإدارة حملات إعلانية',
      description: 'خبير في التسويق الرقمي مع تخصص في Google Ads, Facebook Ads, وتحسين محركات البحث SEO.',
      rating: 4.7,
      totalReviews: 203,
      completedJobs: 178,
      responseTime: 'خلال ساعتين',
      location: 'الدمام، السعودية',
      hourlyRate: 85,
      skills: ['Google Ads', 'Facebook Ads', 'SEO', 'Analytics', 'Content Marketing'],
      languages: ['العربية', 'الإنجليزية'],
      isOnline: false,
      isVerified: true,
      joinedDate: '2020-03-10',
      successRate: 94
    },
    {
      id: '4',
      fullName: 'نورا الحربي',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      title: 'كاتبة محتوى ومترجمة محترفة',
      description: 'كاتبة محتوى إبداعي ومترجمة محترفة متخصصة في المحتوى التسويقي والتقني باللغتين العربية والإنجليزية.',
      rating: 4.9,
      totalReviews: 84,
      completedJobs: 112,
      responseTime: 'خلال 45 دقيقة',
      location: 'مكة، السعودية',
      hourlyRate: 45,
      skills: ['كتابة المحتوى', 'الترجمة', 'التدقيق اللغوي', 'SEO Writing', 'Copywriting'],
      languages: ['العربية', 'الإنجليزية'],
      isOnline: true,
      isVerified: true,
      joinedDate: '2021-11-05',
      successRate: 99
    },
    {
      id: '5',
      fullName: 'عبدالله القحطاني',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      title: 'محرر فيديو ومصمم موشن جرافيك',
      description: 'محرر فيديو محترف ومصمم موشن جرافيك مع خبرة في After Effects, Premiere Pro, وإنتاج المحتوى المرئي.',
      rating: 4.6,
      totalReviews: 67,
      completedJobs: 93,
      responseTime: 'خلال 3 ساعات',
      location: 'الطائف، السعودية',
      hourlyRate: 70,
      skills: ['After Effects', 'Premiere Pro', 'Motion Graphics', 'Video Editing', '3D Animation'],
      languages: ['العربية', 'الإنجليزية'],
      isOnline: true,
      isVerified: false,
      joinedDate: '2022-06-12',
      successRate: 92
    },
    {
      id: '6',
      fullName: 'سارة المطيري',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      title: 'مطورة تطبيقات الجوال Flutter & React Native',
      description: 'مطورة تطبيقات جوال متخصصة في Flutter و React Native مع خبرة في تطوير تطبيقات iOS و Android.',
      rating: 4.8,
      totalReviews: 156,
      completedJobs: 134,
      responseTime: 'خلال ساعة',
      location: 'الرياض، السعودية',
      hourlyRate: 90,
      skills: ['Flutter', 'React Native', 'Dart', 'Firebase', 'Mobile Development'],
      languages: ['العربية', 'الإنجليزية'],
      isOnline: false,
      isVerified: true,
      joinedDate: '2020-09-18',
      successRate: 97
    }
  ]

    useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setFreelancers(mockFreelancers)
      setFilteredFreelancers(mockFreelancers)
      setLoading(false)
    }, 1000)
  }, [mockFreelancers])

  useEffect(() => {
    let filtered = freelancers

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(freelancer =>
        freelancer.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        freelancer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        freelancer.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    // Skill filter
    if (selectedSkill) {
      filtered = filtered.filter(freelancer =>
        freelancer.skills.includes(selectedSkill)
      )
    }

    // Rating filter
    if (minRating > 0) {
      filtered = filtered.filter(freelancer => freelancer.rating >= minRating)
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating
        case 'price':
          return a.hourlyRate - b.hourlyRate
        case 'reviews':
          return b.totalReviews - a.totalReviews
        case 'recent':
          return new Date(b.joinedDate).getTime() - new Date(a.joinedDate).getTime()
        default:
          return 0
      }
    })

    setFilteredFreelancers(filtered)
  }, [freelancers, searchQuery, selectedSkill, minRating, sortBy])

  const allSkills = Array.from(new Set(freelancers.flatMap(f => f.skills)))

  return (
    <div className="min-h-screen bg-gray-50">
      <MainHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4" dir="rtl">المستقلون</h1>
          <p className="text-gray-600" dir="rtl">اعثر على أفضل المستقلين المحترفين لمشروعك</p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="ابحث عن مستقل..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                dir="rtl"
              />
            </div>

            {/* Skills Filter */}
            <select
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
            >
              <option value="">جميع المهارات</option>
              {allSkills.map(skill => (
                <option key={skill} value={skill}>{skill}</option>
              ))}
            </select>

            {/* Rating Filter */}
            <select
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
            >
              <option value={0}>جميع التقييمات</option>
              <option value={4.5}>4.5+ نجوم</option>
              <option value={4.0}>4.0+ نجوم</option>
              <option value={3.5}>3.5+ نجوم</option>
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
            >
              <option value="rating">الأعلى تقييماً</option>
              <option value="price">السعر الأقل</option>
              <option value="reviews">الأكثر مراجعات</option>
              <option value="recent">الأحدث انضماماً</option>
            </select>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">جاري تحميل المستقلين...</p>
          </div>
        ) : (
          <>
            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-600" dir="rtl">
                تم العثور على {filteredFreelancers.length} مستقل
              </p>
            </div>

            {/* Freelancers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFreelancers.map(freelancer => (
                <div key={freelancer.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
                  {/* Header */}
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <Image
                          src={freelancer.avatar}
                          alt={freelancer.fullName}
                          width={64}
                          height={64}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        {freelancer.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900" dir="rtl">{freelancer.fullName}</h3>
                          {freelancer.isVerified && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span>{freelancer.rating}</span>
                            <span>({freelancer.totalReviews})</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{freelancer.location}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Clock className="h-4 w-4" />
                          <span>يرد {freelancer.responseTime}</span>
                        </div>
                      </div>
                      
                      <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                        <Heart className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h4 className="font-medium text-gray-900 mb-3 text-right" dir="rtl">
                      {freelancer.title}
                    </h4>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 text-right" dir="rtl">
                      {freelancer.description}
                    </p>

                    {/* Skills */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2 justify-end">
                        {freelancer.skills.slice(0, 4).map(skill => (
                          <span
                            key={skill}
                            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                        {freelancer.skills.length > 4 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                            +{freelancer.skills.length - 4}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                      <div>
                        <div className="font-semibold text-gray-900">{freelancer.completedJobs}</div>
                        <div className="text-xs text-gray-600">مشروع مكتمل</div>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{freelancer.successRate}%</div>
                        <div className="text-xs text-gray-600">معدل النجاح</div>
                      </div>
                      <div>
                        <div className="font-semibold text-green-600">${freelancer.hourlyRate}</div>
                        <div className="text-xs text-gray-600">في الساعة</div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors text-sm">
                        عرض الملف الشخصي
                      </button>
                      <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                        <MessageCircle className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredFreelancers.length === 0 && (
              <div className="text-center py-12">
                <User className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد نتائج</h3>
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