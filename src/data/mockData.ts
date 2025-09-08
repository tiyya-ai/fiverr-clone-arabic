// Mock data for services and users
export interface User {
  id: string
  username: string
  fullName: string
  avatar: string
  rating: number
  totalReviews: number
  responseTime: string
  isOnline: boolean
  memberSince: string
  bio: string
  skills: string[]
  languages: string[]
  location: string
  totalSales: number
  level?: string
  isVerified?: boolean
  verificationStatus?: 'pending' | 'verified' | 'rejected'
  verificationBadges?: string[]
  completedTasks?: number
  verificationScore?: number
}

export interface Service {
  id: string
  title: string
  description: string
  category: string
  images: string[]
  rating: number
  totalReviews: number
  totalSales: number
  userId: string
  packages: {
    type: 'BASIC' | 'STANDARD' | 'PREMIUM'
    title: string
    price: number
    deliveryTime: number
    revisions: number
    features: string[]
  }[]
  tags: string[]
  createdAt: string
  faq: {
    question: string
    answer: string
  }[]
  workAreas: string[]
}

export interface Review {
  id: string
  serviceId: string
  userId: string
  rating: number
  comment: string
  createdAt: string
}

export interface Message {
  id: string
  fromUserId: string
  toUserId: string
  content: string
  isRead: boolean
  createdAt: string
}

export interface Project {
  id: string
  title: string
  description: string
  budget: {
    min: number
    max: number
    type: 'fixed' | 'hourly'
  }
  skills: string[]
  duration: string
  clientId: string
  status: 'open' | 'in_progress' | 'completed' | 'cancelled'
  bids: Bid[]
  createdAt: string
  deadline?: string
  attachments?: string[]
  category: string
}

export interface Bid {
  id: string
  projectId: string
  freelancerId: string
  amount: number
  deliveryTime: number
  proposal: string
  createdAt: string
  status: 'pending' | 'accepted' | 'rejected'
}

export interface Job {
  id: string
  title: string
  description: string
  company: {
    name: string
    logo?: string
    location: string
  }
  salary: {
    min?: number
    max?: number
    currency: string
    type: 'monthly' | 'yearly' | 'hourly'
  }
  type: 'full_time' | 'part_time' | 'contract' | 'freelance'
  location: string
  remote: boolean
  requirements: string[]
  benefits?: string[]
  applications: Application[]
  createdAt: string
  deadline?: string
  status: 'active' | 'closed' | 'filled'
  category: string
}

export interface Application {
  id: string
  jobId: string
  freelancerId: string
  coverLetter: string
  resume?: string
  createdAt: string
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected'
}

export interface PortfolioItem {
  id: string
  title: string
  description: string
  images: string[]
  technologies: string[]
  projectUrl?: string
  completedAt: string
}

export interface Certification {
  id: string
  name: string
  issuer: string
  issueDate: string
  expiryDate?: string
  credentialUrl?: string
}

export interface WorkHistoryItem {
  id: string
  title: string
  company: string
  duration: string
  description: string
  technologies: string[]
}

// Mock Users - حرفي متعدد المهارات
export const mockUsers: User[] = [
  {
    id: '1',
    username: 'ahmed_craftsman',
    fullName: 'أحمد محمد الحرفي',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    rating: 4.9,
    totalReviews: 456,
    responseTime: '30 دقيقة',
    isOnline: true,
    memberSince: '2018',
    bio: 'حرفي متخصص في جميع أعمال الصيانة المنزلية مع خبرة أكثر من 15 سنة في الكهرباء، السباكة، التكييف، والنجارة. أقدم خدمات عالية الجودة مع ضمان على جميع الأعمال.',
    skills: ['الكهرباء', 'السباكة', 'التكييف والتبريد', 'النجارة', 'كاميرات المراقبة', 'الدهان والتشطيبات'],
    languages: ['العربية'],
    location: 'الرياض، السعودية',
    totalSales: 1250,
    level: 'خبير معتمد',
    isVerified: true,
    verificationStatus: 'verified',
    verificationBadges: ['identity', 'skills', 'phone', 'email', 'address'],
    completedTasks: 1250,
    verificationScore: 98
  }
]

// Mock Portfolio Items
export const mockPortfolio: PortfolioItem[] = [
  {
    id: '1',
    title: 'تصميم هوية بصرية لشركة تقنية',
    description: 'تصميم شعار وهوية بصرية كاملة لشركة تقنية ناشئة تعمل في مجال الذكاء الاصطناعي',
    images: [
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=400&h=300&fit=crop'
    ],
    technologies: ['Adobe Illustrator', 'Photoshop', 'Figma'],
    projectUrl: 'https://example.com/project1',
    completedAt: '2024-01-15'
  },
  {
    id: '2',
    title: 'موقع إلكتروني لمتجر أزياء',
    description: 'تطوير موقع إلكتروني متكامل لمتجر أزياء مع نظام إدارة المحتوى ونظام الدفع',
    images: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop'
    ],
    technologies: ['React', 'Next.js', 'Node.js', 'MongoDB'],
    projectUrl: 'https://example.com/project2',
    completedAt: '2024-02-01'
  }
]

// Mock Certifications
export const mockCertifications: Certification[] = [
  {
    id: '1',
    name: 'شهادة Adobe Certified Expert',
    issuer: 'Adobe',
    issueDate: '2023-06-15',
    expiryDate: '2025-06-15',
    credentialUrl: 'https://adobe.com/cert/123456'
  },
  {
    id: '2',
    name: 'React Developer Certification',
    issuer: 'Meta',
    issueDate: '2023-09-20',
    credentialUrl: 'https://meta.com/cert/789012'
  }
]

// Mock Work History
export const mockWorkHistory: WorkHistoryItem[] = [
  {
    id: '1',
    title: 'مصمم جرافيك أول',
    company: 'شركة الإبداع الرقمي',
    duration: '2020 - 2023',
    description: 'قيادة فريق التصميم وإنشاء الهويات البصرية للعملاء الكبار',
    technologies: ['Adobe Creative Suite', 'Figma', 'Sketch']
  },
  {
    id: '2',
    title: 'مطور واجهات أمامية',
    company: 'تك سوليوشنز',
    duration: '2018 - 2020',
    description: 'تطوير واجهات المستخدم للتطبيقات الويب باستخدام React و Vue.js',
    technologies: ['React', 'Vue.js', 'JavaScript', 'CSS3']
  }
]

// Mock Services - خدمات صيانة المنازل والحرف
export const mockServices: Service[] = [
  {
    id: '1',
    title: 'سأقوم بأعمال الكهرباء المنزلية وإصلاح الأعطال',
    description: 'خدمات كهربائية شاملة للمنازل والمكاتب تشمل تركيب الإضاءة، إصلاح الأعطال، تمديد الأسلاك، وتركيب المفاتيح والمقابس. خبرة 15 سنة في مجال الكهرباء مع ضمان الجودة والسلامة.',
    category: 'الكهرباء',
    images: [
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=600&fit=crop'
    ],
    rating: 4.9,
    totalReviews: 156,
    totalSales: 340,
    userId: '1',
    packages: [
      {
        type: 'BASIC',
        title: 'إصلاح بسيط',
        price: 50,
        deliveryTime: 1,
        revisions: 1,
        features: ['فحص العطل', 'إصلاح مشكلة واحدة', 'ضمان 30 يوم', 'استشارة مجانية']
      },
      {
        type: 'STANDARD',
        title: 'صيانة شاملة',
        price: 120,
        deliveryTime: 2,
        revisions: 2,
        features: ['فحص شامل للكهرباء', 'إصلاح عدة مشاكل', 'تنظيف اللوحة الكهربائية', 'ضمان 90 يوم', 'تقرير مفصل']
      },
      {
        type: 'PREMIUM',
        title: 'تركيب وتجديد',
        price: 300,
        deliveryTime: 3,
        revisions: 3,
        features: ['تركيب إضاءة جديدة', 'تمديد أسلاك إضافية', 'تركيب مفاتيح ومقابس', 'فحص السلامة الكامل', 'ضمان سنة كاملة']
      }
    ],
    tags: ['كهرباء', 'إصلاح', 'تركيب', 'صيانة'],
    createdAt: '2024-01-15',
    faq: [
      {
        question: 'هل تقدمون خدمة الطوارئ؟',
        answer: 'نعم، نقدم خدمة الطوارئ على مدار 24 ساعة للحالات العاجلة.'
      },
      {
        question: 'ما هي مدة الضمان؟',
        answer: 'نقدم ضمان يتراوح من 30 يوم إلى سنة كاملة حسب نوع الخدمة.'
      }
    ],
    workAreas: ['الرياض', 'جدة', 'الدمام', 'مكة المكرمة', 'المدينة المنورة']
  },
  {
    id: '2',
    title: 'سأقوم بأعمال السباكة وإصلاح تسريبات المياه',
    description: 'خدمات سباكة احترافية تشمل إصلاح التسريبات، تسليك المجاري، تركيب الأدوات الصحية، وصيانة شبكات المياه. فريق متخصص مع أدوات حديثة وضمان على جميع الأعمال.',
    category: 'السباكة',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&h=600&fit=crop'
    ],
    rating: 4.8,
    totalReviews: 203,
    totalSales: 280,
    userId: '1',
    packages: [
      {
        type: 'BASIC',
        title: 'إصلاح طارئ',
        price: 80,
        deliveryTime: 1,
        revisions: 1,
        features: ['إصلاح تسريب واحد', 'فحص المشكلة', 'ضمان 30 يوم', 'خدمة سريعة']
      },
      {
        type: 'STANDARD',
        title: 'صيانة شاملة',
        price: 180,
        deliveryTime: 2,
        revisions: 2,
        features: ['فحص شامل للسباكة', 'إصلاح عدة مشاكل', 'تسليك المجاري', 'ضمان 90 يوم', 'تنظيف الأنابيب']
      },
      {
        type: 'PREMIUM',
        title: 'تركيب وتجديد',
        price: 400,
        deliveryTime: 3,
        revisions: 3,
        features: ['تركيب أدوات صحية جديدة', 'تمديد شبكة مياه', 'عزل الخزانات', 'فحص الضغط', 'ضمان سنة كاملة']
      }
    ],
    tags: ['سباكة', 'تسريبات', 'تسليك', 'تركيب'],
    createdAt: '2024-01-20',
    faq: [
      {
        question: 'هل تتعاملون مع جميع أنواع التسريبات؟',
        answer: 'نعم، نتعامل مع جميع أنواع التسريبات في الأنابيب والخزانات والأدوات الصحية.'
      },
      {
        question: 'كم يستغرق إصلاح التسريب؟',
        answer: 'عادة ما يستغرق الإصلاح من ساعة إلى 3 ساعات حسب حجم المشكلة.'
      }
    ],
    workAreas: ['الرياض', 'جدة', 'الدمام', 'الخبر', 'القطيف']
  },
  {
    id: '3',
    title: 'سأقوم بصيانة وتركيب أجهزة التكييف والتبريد',
    description: 'خدمات تكييف شاملة تشمل التركيب، الصيانة الدورية، إصلاح الأعطال، وتنظيف المكيفات. فريق فني متخصص مع قطع غيار أصلية وضمان على جميع الخدمات.',
    category: 'التكييف والتبريد',
    images: [
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&h=600&fit=crop'
    ],
    rating: 4.7,
    totalReviews: 189,
    totalSales: 220,
    userId: '1',
    packages: [
      {
        type: 'BASIC',
        title: 'تنظيف وصيانة',
        price: 60,
        deliveryTime: 1,
        revisions: 1,
        features: ['تنظيف المكيف', 'فحص الفلاتر', 'إضافة غاز إذا لزم', 'ضمان 30 يوم']
      },
      {
        type: 'STANDARD',
        title: 'صيانة شاملة',
        price: 150,
        deliveryTime: 2,
        revisions: 2,
        features: ['صيانة كاملة للمكيف', 'تغيير الفلاتر', 'فحص الدائرة الكهربائية', 'تنظيف الوحدة الخارجية', 'ضمان 90 يوم']
      },
      {
        type: 'PREMIUM',
        title: 'تركيب جديد',
        price: 350,
        deliveryTime: 3,
        revisions: 3,
        features: ['تركيب مكيف جديد', 'تمديد الأنابيب', 'تركيب الوحدة الخارجية', 'برمجة الريموت', 'ضمان سنة كاملة']
      }
    ],
    tags: ['تكييف', 'تبريد', 'صيانة', 'تركيب'],
    createdAt: '2024-02-01',
    faq: [
      {
        question: 'كم يستغرق تركيب المكيف الجديد؟',
        answer: 'عادة ما يستغرق التركيب من 2 إلى 4 ساعات حسب نوع المكيف وموقع التركيب.'
      },
      {
        question: 'هل تقدمون صيانة دورية؟',
        answer: 'نعم، نقدم خدمة الصيانة الدورية كل 3 أشهر للحفاظ على كفاءة المكيف.'
      }
    ],
    workAreas: ['الرياض', 'جدة', 'الدمام', 'مكة المكرمة', 'الطائف']
  },
  {
    id: '4',
    title: 'سأقوم بتركيب وصيانة كاميرات المراقبة',
    description: 'خدمات أمنية متكاملة تشمل تركيب كاميرات المراقبة، أنظمة الإنذار، والتحكم عن بعد. نستخدم أحدث التقنيات مع إمكانية المراقبة عبر الهاتف المحمول.',
    category: 'تركيب كاميرات المراقبة',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=600&fit=crop'
    ],
    rating: 4.9,
    totalReviews: 134,
    totalSales: 180,
    userId: '1',
    packages: [
      {
        type: 'BASIC',
        title: 'كاميرا واحدة',
        price: 200,
        deliveryTime: 2,
        revisions: 1,
        features: ['تركيب كاميرا واحدة', 'تطبيق المراقبة', 'تدريب على الاستخدام', 'ضمان 6 أشهر']
      },
      {
        type: 'STANDARD',
        title: 'نظام متوسط',
        price: 500,
        deliveryTime: 3,
        revisions: 2,
        features: ['4 كاميرات مراقبة', 'جهاز تسجيل DVR', 'تطبيق المراقبة', 'تركيب الكابلات', 'ضمان سنة']
      },
      {
        type: 'PREMIUM',
        title: 'نظام شامل',
        price: 1000,
        deliveryTime: 5,
        revisions: 3,
        features: ['8 كاميرات عالية الدقة', 'نظام إنذار متكامل', 'مراقبة عن بعد', 'تخزين سحابي', 'ضمان سنتين']
      }
    ],
    tags: ['كاميرات', 'مراقبة', 'أمان', 'تركيب'],
    createdAt: '2024-02-05',
    faq: [
      {
        question: 'هل يمكن مراقبة الكاميرات عن بعد؟',
        answer: 'نعم، يمكنك مراقبة الكاميرات من أي مكان عبر تطبيق الهاتف المحمول.'
      },
      {
        question: 'ما هي مدة الضمان على الكاميرات؟',
        answer: 'نقدم ضمان يتراوح من 6 أشهر إلى سنتين حسب نوع النظام المختار.'
      }
    ],
    workAreas: ['الرياض', 'جدة', 'الدمام', 'مكة المكرمة', 'الطائف']
  },
  {
    id: '5',
    title: 'سأقوم بأعمال النجارة وتفصيل الأثاث',
    description: 'خدمات نجارة احترافية تشمل تفصيل الأثاث، إصلاح الخشب، تركيب الأبواب والنوافذ، وأعمال الديكور الخشبي. نستخدم أجود أنواع الخشب مع تشطيبات عالية الجودة.',
    category: 'النجارة',
    images: [
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&h=600&fit=crop'
    ],
    rating: 4.8,
    totalReviews: 167,
    totalSales: 145,
    userId: '1',
    packages: [
      {
        type: 'BASIC',
        title: 'إصلاح بسيط',
        price: 100,
        deliveryTime: 2,
        revisions: 1,
        features: ['إصلاح قطعة أثاث واحدة', 'صنفرة وتلميع', 'ضمان 30 يوم', 'استشارة مجانية']
      },
      {
        type: 'STANDARD',
        title: 'تفصيل متوسط',
        price: 300,
        deliveryTime: 7,
        revisions: 2,
        features: ['تفصيل قطعة أثاث', 'اختيار نوع الخشب', 'تشطيب احترافي', 'تركيب في المكان', 'ضمان 6 أشهر']
      },
      {
        type: 'PREMIUM',
        title: 'مشروع كامل',
        price: 800,
        deliveryTime: 14,
        revisions: 3,
        features: ['تفصيل غرفة كاملة', 'تصميم مخصص', 'خشب فاخر', 'تشطيبات متعددة', 'ضمان سنة كاملة']
      }
    ],
    tags: ['نجارة', 'أثاث', 'خشب', 'تفصيل'],
    createdAt: '2024-02-10',
    faq: [
      {
        question: 'ما هي أنواع الخشب المتاحة؟',
        answer: 'نوفر جميع أنواع الخشب من الزان والبيش إلى المهوجني والأرو الفاخر.'
      },
      {
        question: 'هل تقدمون خدمة التركيب؟',
        answer: 'نعم، نقدم خدمة التركيب في الموقع مع ضمان على جودة التركيب.'
      }
    ],
    workAreas: ['الرياض', 'جدة', 'الدمام', 'مكة المكرمة', 'المدينة المنورة']
  }
]

// Mock Reviews - تقييمات للمستقل الواحد
export const mockReviews: Review[] = [
  {
    id: '1',
    serviceId: '1',
    userId: '1',
    rating: 5,
    comment: 'عمل رائع ومتقن! الشعار جاء أفضل من المتوقع والتسليم كان في الوقت المحدد. أنصح بالتعامل مع أحمد بقوة.',
    createdAt: '2024-02-10'
  },
  {
    id: '2',
    serviceId: '1',
    userId: '1',
    rating: 5,
    comment: 'احترافية عالية في التعامل والتصميم. حصلت على شعار مميز وهوية بصرية متكاملة. شكراً لك!',
    createdAt: '2024-02-08'
  },
  {
    id: '3',
    serviceId: '1',
    userId: '1',
    rating: 4,
    comment: 'تصميم جميل وإبداعي. أحمد مصمم محترف ويتفهم متطلبات العميل بسرعة. سأتعامل معه مرة أخرى.',
    createdAt: '2024-02-05'
  },
  {
    id: '4',
    serviceId: '2',
    userId: '1',
    rating: 5,
    comment: 'موقع احترافي بكل معنى الكلمة! أحمد مطور ممتاز ويفهم المتطلبات بسرعة. التسليم كان قبل الموعد المحدد.',
    createdAt: '2024-02-12'
  },
  {
    id: '5',
    serviceId: '2',
    userId: '1',
    rating: 5,
    comment: 'تطوير موقع على أعلى مستوى! الموقع سريع ومتجاوب ويعمل بشكل مثالي على جميع الأجهزة.',
    createdAt: '2024-02-15'
  },
  {
    id: '6',
    serviceId: '3',
    userId: '1',
    rating: 5,
    comment: 'تصميم واجهة المستخدم رائع! التصميم حديث وسهل الاستخدام. أحمد لديه ذوق رفيع في التصميم.',
    createdAt: '2024-02-18'
  },
  {
    id: '7',
    serviceId: '3',
    userId: '1',
    rating: 4,
    comment: 'عمل ممتاز في تصميم الواجهات. التصميم جذاب ومتجاوب. التسليم كان في الوقت المحدد.',
    createdAt: '2024-02-20'
  }
]

// Helper functions
export const getUserById = (id: string): User | undefined => {
  return mockUsers.find(user => user.id === id)
}

export const getServiceById = (id: string): Service | undefined => {
  return mockServices.find(service => service.id === id)
}

export const getServicesByCategory = (category: string): Service[] => {
  if (!category) return mockServices
  return mockServices.filter(service => service.category === category)
}

export const getServicesByUserId = (userId: string): Service[] => {
  return mockServices.filter(service => service.userId === userId)
}

export const getReviewsByServiceId = (serviceId: string): Review[] => {
  return mockReviews.filter(review => review.serviceId === serviceId)
}

// Input sanitization function
const sanitizeInput = (input: string): string => {
  if (typeof input !== 'string') return ''
  return input.replace(/[<>"'&]/g, '').trim().substring(0, 100)
}

export const searchServices = (query: string): Service[] => {
  if (!query) return mockServices
  const sanitizedQuery = sanitizeInput(query)
  if (!sanitizedQuery) return []
  
  const lowerQuery = sanitizedQuery.toLowerCase()
  return mockServices.filter(service => 
    service.title.toLowerCase().includes(lowerQuery) ||
    service.description.toLowerCase().includes(lowerQuery) ||
    service.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  )
}

// Mock Messages - رسائل المستقل
export const mockMessages: Message[] = [
  {
    id: '1',
    fromUserId: '1',
    toUserId: 'client1',
    content: 'مرحباً! شكراً لك على طلب خدمة تصميم الشعار. سأبدأ العمل فوراً وسأرسل لك المسودة الأولى خلال 24 ساعة.',
    isRead: true,
    createdAt: '2024-02-20T10:00:00Z'
  },
  {
    id: '2',
    fromUserId: 'client1',
    toUserId: '1',
    content: 'ممتاز! أتطلع لرؤية التصميم. هل يمكنك إضافة اللون الأزرق كلون أساسي؟',
    isRead: true,
    createdAt: '2024-02-20T10:30:00Z'
  },
  {
    id: '3',
    fromUserId: '1',
    toUserId: 'client1',
    content: 'بالطبع! سأضيف اللون الأزرق كما طلبت. هل لديك درجة معينة من الأزرق تفضلها؟',
    isRead: false,
    createdAt: '2024-02-20T11:00:00Z'
  },
  {
    id: '4',
    fromUserId: '1',
    toUserId: 'client2',
    content: 'أهلاً وسهلاً! تم استلام طلبك لتطوير الموقع الإلكتروني. سأحتاج منك بعض التفاصيل الإضافية حول التصميم المطلوب.',
    isRead: true,
    createdAt: '2024-02-19T14:00:00Z'
  },
  {
    id: '5',
    fromUserId: 'client2',
    toUserId: '1',
    content: 'شكراً لك! أريد موقع للتجارة الإلكترونية مع نظام دفع متكامل. هل يمكنك تنفيذ ذلك؟',
    isRead: true,
    createdAt: '2024-02-19T15:30:00Z'
  },
  {
    id: '6',
    fromUserId: '1',
    toUserId: 'client2',
    content: 'نعم بالتأكيد! لدي خبرة واسعة في تطوير مواقع التجارة الإلكترونية. سأرسل لك عرض سعر مفصل قريباً.',
    isRead: false,
    createdAt: '2024-02-19T16:00:00Z'
  }
]

// Helper functions for messages
export const getMessagesByUserId = (userId: string): Message[] => {
  return mockMessages.filter(message => 
    message.fromUserId === userId || message.toUserId === userId
  )
}

export const getUnreadMessagesCount = (userId: string): number => {
  return mockMessages.filter(message => 
    message.toUserId === userId && !message.isRead
  ).length
}

// Helper functions for projects
export const getProjectById = (id: string): Project | undefined => {
  return mockProjects.find(project => project.id === id)
}

export const getProjectsByCategory = (category: string): Project[] => {
  if (!category) return mockProjects
  return mockProjects.filter(project => project.category === category)
}

export const getProjectsByStatus = (status: string): Project[] => {
  return mockProjects.filter(project => project.status === status)
}

export const searchProjects = (query: string): Project[] => {
  if (!query) return mockProjects
  const sanitizedQuery = sanitizeInput(query)
  if (!sanitizedQuery) return []
  
  const lowerQuery = sanitizedQuery.toLowerCase()
  return mockProjects.filter(project => 
    project.title.toLowerCase().includes(lowerQuery) ||
    project.description.toLowerCase().includes(lowerQuery) ||
    project.skills.some(skill => skill.toLowerCase().includes(lowerQuery))
  )
}

// Helper functions for jobs
export const getJobById = (id: string): Job | undefined => {
  return mockJobs.find(job => job.id === id)
}

export const getJobsByCategory = (category: string): Job[] => {
  if (!category) return mockJobs
  return mockJobs.filter(job => job.category === category)
}

export const getJobsByType = (type: string): Job[] => {
  return mockJobs.filter(job => job.type === type)
}

export const getJobsByLocation = (location: string): Job[] => {
  return mockJobs.filter(job => 
    job.location.toLowerCase().includes(location.toLowerCase()) || job.remote
  )
}

export const searchJobs = (query: string): Job[] => {
  if (!query) return mockJobs
  const sanitizedQuery = sanitizeInput(query)
  if (!sanitizedQuery) return []
  
  const lowerQuery = sanitizedQuery.toLowerCase()
  return mockJobs.filter(job => 
    job.title.toLowerCase().includes(lowerQuery) ||
    job.description.toLowerCase().includes(lowerQuery) ||
    job.company.name.toLowerCase().includes(lowerQuery) ||
    job.requirements.some(req => req.toLowerCase().includes(lowerQuery))
  )
}

// Mock Projects - مشاريع وهمية
export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'تطوير موقع إلكتروني لشركة تجارية',
    description: 'نحتاج إلى تطوير موقع إلكتروني احترافي لشركة تجارية متخصصة في بيع المنتجات الإلكترونية. الموقع يجب أن يتضمن متجر إلكتروني كامل مع نظام دفع آمن وإدارة المخزون.',
    budget: {
      min: 2000,
      max: 5000,
      type: 'fixed'
    },
    skills: ['React', 'Next.js', 'Node.js', 'MongoDB', 'تطوير المواقع'],
    duration: '2-3 أشهر',
    clientId: 'client1',
    status: 'open',
    bids: [
      {
        id: '1',
        projectId: '1',
        freelancerId: '1',
        amount: 3500,
        deliveryTime: 60,
        proposal: 'أستطيع تطوير موقع إلكتروني احترافي باستخدام React و Next.js مع نظام دفع متكامل. لدي خبرة 8 سنوات في تطوير المواقع التجارية.',
        createdAt: '2024-02-20T10:00:00Z',
        status: 'pending'
      }
    ],
    createdAt: '2024-02-19T14:00:00Z',
    deadline: '2024-05-19T23:59:59Z',
    category: 'تطوير المواقع'
  },
  {
    id: '2',
    title: 'تصميم هوية بصرية كاملة لمطعم',
    description: 'مطعم جديد يحتاج إلى هوية بصرية كاملة تشمل الشعار، قائمة الطعام، كروت العمل، واللافتات. المطعم متخصص في الأكل الشرقي التقليدي.',
    budget: {
      min: 800,
      max: 1500,
      type: 'fixed'
    },
    skills: ['تصميم الشعارات', 'الهوية البصرية', 'Adobe Illustrator', 'Photoshop'],
    duration: '3-4 أسابيع',
    clientId: 'client2',
    status: 'open',
    bids: [
      {
        id: '2',
        projectId: '2',
        freelancerId: '1',
        amount: 1200,
        deliveryTime: 21,
        proposal: 'متخصص في تصميم الهويات البصرية للمطاعم. سأقدم لك تصاميم متعددة للاختيار من بينها مع جميع الملفات المطلوبة.',
        createdAt: '2024-02-20T11:30:00Z',
        status: 'pending'
      }
    ],
    createdAt: '2024-02-18T09:00:00Z',
    deadline: '2024-03-18T23:59:59Z',
    category: 'التصميم الجرافيكي'
  },
  {
    id: '3',
    title: 'كتابة محتوى تسويقي لموقع شركة استشارات',
    description: 'شركة استشارات إدارية تحتاج إلى كتابة محتوى تسويقي لموقعها الإلكتروني. المحتوى يجب أن يكون احترافي ومقنع ومحسن لمحركات البحث.',
    budget: {
      min: 500,
      max: 1000,
      type: 'fixed'
    },
    skills: ['كتابة المحتوى', 'التسويق الرقمي', 'SEO', 'كتابة الإعلانات'],
    duration: '2-3 أسابيع',
    clientId: 'client3',
    status: 'in_progress',
    bids: [],
    createdAt: '2024-02-15T16:00:00Z',
    deadline: '2024-03-15T23:59:59Z',
    category: 'الكتابة والترجمة'
  },
  {
    id: '4',
    title: 'تطوير تطبيق جوال لخدمة توصيل الطعام',
    description: 'نحتاج إلى تطوير تطبيق جوال (iOS و Android) لخدمة توصيل الطعام. التطبيق يجب أن يتضمن نظام طلبات، تتبع التوصيل، ونظام دفع.',
    budget: {
      min: 5000,
      max: 10000,
      type: 'fixed'
    },
    skills: ['React Native', 'Flutter', 'تطوير التطبيقات', 'Firebase'],
    duration: '4-6 أشهر',
    clientId: 'client4',
    status: 'open',
    bids: [],
    createdAt: '2024-02-21T12:00:00Z',
    deadline: '2024-08-21T23:59:59Z',
    category: 'البرمجة والتقنية'
  }
]

// Mock Jobs - وظائف وهمية
export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'مطور React.js - دوام كامل',
    description: 'نبحث عن مطور React.js محترف للانضمام إلى فريقنا. المرشح المثالي يجب أن يكون لديه خبرة لا تقل عن 3 سنوات في تطوير تطبيقات الويب باستخدام React.',
    company: {
      name: 'شركة التقنيات المتقدمة',
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop',
      location: 'الرياض، السعودية'
    },
    salary: {
      min: 8000,
      max: 15000,
      currency: 'SAR',
      type: 'monthly'
    },
    type: 'full_time',
    location: 'الرياض، السعودية',
    remote: false,
    requirements: [
      'خبرة 3+ سنوات في React.js',
      'معرفة قوية بـ JavaScript و TypeScript',
      'خبرة في Redux أو Context API',
      'معرفة بـ HTML5 و CSS3',
      'خبرة في Git و GitHub'
    ],
    benefits: [
      'راتب تنافسي',
      'تأمين صحي شامل',
      'إجازة سنوية مدفوعة',
      'بيئة عمل مرنة',
      'فرص تطوير مهني'
    ],
    applications: [],
    createdAt: '2024-02-20T08:00:00Z',
    deadline: '2024-03-20T23:59:59Z',
    status: 'active',
    category: 'البرمجة والتقنية'
  },
  {
    id: '2',
    title: 'مصمم جرافيك - دوام جزئي',
    description: 'وكالة إعلانية تبحث عن مصمم جرافيك مبدع للعمل بدوام جزئي. المرشح يجب أن يكون قادر على إنشاء تصاميم إبداعية للحملات الإعلانية.',
    company: {
      name: 'وكالة الإبداع للإعلان',
      logo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=100&h=100&fit=crop',
      location: 'دبي، الإمارات'
    },
    salary: {
      min: 3000,
      max: 6000,
      currency: 'AED',
      type: 'monthly'
    },
    type: 'part_time',
    location: 'دبي، الإمارات',
    remote: true,
    requirements: [
      'خبرة 2+ سنوات في التصميم الجرافيكي',
      'إتقان Adobe Creative Suite',
      'معرفة بمبادئ التصميم والألوان',
      'قدرة على العمل تحت الضغط',
      'ملف أعمال قوي'
    ],
    benefits: [
      'مرونة في أوقات العمل',
      'إمكانية العمل عن بعد',
      'مشاريع متنوعة ومثيرة',
      'فرص للنمو المهني'
    ],
    applications: [],
    createdAt: '2024-02-19T10:00:00Z',
    deadline: '2024-03-19T23:59:59Z',
    status: 'active',
    category: 'التصميم الجرافيكي'
  },
  {
    id: '3',
    title: 'كاتب محتوى - عمل حر',
    description: 'منصة تعليمية تبحث عن كاتب محتوى متخصص في المجال التقني لكتابة مقالات ودروس تعليمية. العمل عن بعد بنظام المشاريع.',
    company: {
      name: 'منصة التعلم الذكي',
      logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&h=100&fit=crop',
      location: 'القاهرة، مصر'
    },
    salary: {
      min: 50,
      max: 100,
      currency: 'USD',
      type: 'hourly'
    },
    type: 'freelance',
    location: 'عن بعد',
    remote: true,
    requirements: [
      'خبرة في كتابة المحتوى التقني',
      'معرفة بأساسيات SEO',
      'قدرة على البحث والتحليل',
      'إتقان اللغة العربية والإنجليزية',
      'التزام بالمواعيد النهائية'
    ],
    benefits: [
      'عمل مرن عن بعد',
      'أجر تنافسي بالساعة',
      'مشاريع متنوعة',
      'إمكانية التطوير المهني'
    ],
    applications: [],
    createdAt: '2024-02-18T14:00:00Z',
    deadline: '2024-03-18T23:59:59Z',
    status: 'active',
    category: 'الكتابة والترجمة'
  }
]

export const categories = [
  'الكهرباء',
  'السباكة',
  'التكييف والتبريد',
  'تركيب كاميرات المراقبة',
  'النجارة',
  'الحدادة والألمنيوم',
  'الدهان والتشطيبات',
  'جبس بورد والديكور',
  'تنسيق الحدائق',
  'صيانة المصاعد',
  'نقل العفش والأثاث',
  'تنظيف الواجهات والزجاج',
  'صيانة الشقق والأبراج السكنية',
  'السلامة وتسعير المخططات',
  'التصميم الجرافيكي',
  'تطوير المواقع'
]