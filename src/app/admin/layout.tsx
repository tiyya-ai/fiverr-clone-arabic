'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Users, Package, DollarSign, TrendingUp, AlertTriangle, CheckCircle, Bell, BarChart3, PieChart, Star, Clock, Menu, Home, FileText, CreditCard, LogOut, ChevronDown, ChevronRight, UserCheck, ShoppingCart, Settings } from 'lucide-react'
import NotificationSystem from '@/components/Admin/NotificationSystem'
import AdminLogin from '@/components/Admin/AdminLogin'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const { data: session, status } = useSession()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['dashboard', 'users', 'services', 'orders', 'financial'])

  // Show loading spinner while checking authentication
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    )
  }

  // Show admin login page if not authenticated or not admin
  if (!session || session.user.userType !== 'ADMIN') {
    return <AdminLogin />
  }

  const toggleMenu = (menuId: string) => {
    setExpandedMenus(prev =>
      prev.includes(menuId)
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    )
  }

  const sidebarMenus = [
    {
      id: 'dashboard',
      title: 'لوحة التحكم',
      icon: Home,
      items: [
        { id: 'overview', title: 'نظرة عامة', icon: BarChart3, path: '/admin' },
        { id: 'analytics', title: 'التحليلات', icon: PieChart, path: '/admin/analytics' }
      ]
    },
    {
      id: 'users',
      title: 'إدارة المستخدمين',
      icon: Users,
      items: [
        { id: 'users', title: 'جميع المستخدمين', icon: Users, path: '/admin/users' },
        { id: 'sellers', title: 'البائعين', icon: Star, path: '/admin/users?type=sellers' },
        { id: 'buyers', title: 'المشترين', icon: UserCheck, path: '/admin/users?type=buyers' }
      ]
    },
    {
      id: 'services',
      title: 'إدارة الخدمات',
      icon: Package,
      items: [
        { id: 'all-services', title: 'جميع الخدمات', icon: Package, path: '/admin/services' },
        { id: 'categories', title: 'الفئات', icon: FileText, path: '/admin/categories' },
        { id: 'pending', title: 'في انتظار الموافقة', icon: Clock, path: '/admin/services?status=pending' }
      ]
    },
    {
      id: 'orders',
      title: 'إدارة الطلبات',
      icon: CheckCircle,
      items: [
        { id: 'orders', title: 'جميع الطلبات', icon: CheckCircle, path: '/admin/orders' },
        { id: 'cart', title: 'سلة المشتريات', icon: ShoppingCart, path: '/admin/cart' },
        { id: 'disputes', title: 'النزاعات', icon: AlertTriangle, path: '/admin/disputes' },
        { id: 'refunds', title: 'المبالغ المسترجعة', icon: DollarSign, path: '/admin/refunds' }
      ]
    },
    {
      id: 'financial',
      title: 'الإدارة المالية',
      icon: DollarSign,
      items: [
        { id: 'financial', title: 'التقارير المالية', icon: DollarSign, path: '/admin/financial' },
        { id: 'payouts', title: 'المدفوعات', icon: CreditCard, path: '/admin/payouts' },
        { id: 'commissions', title: 'العمولات', icon: TrendingUp, path: '/admin/commissions' }
      ]
    }
  ]

  const getCurrentPageTitle = () => {
    for (const menu of sidebarMenus) {
      for (const item of menu.items) {
        if (item.path === pathname || pathname.startsWith(item.path + '/')) {
          return item.title
        }
      }
    }
    
    // Handle special cases
    if (pathname.includes('/create')) return 'إضافة جديد'
    if (pathname.includes('/edit')) return 'تعديل'
    
    return 'لوحة التحكم'
  }

  const isActiveItem = (itemPath: string) => {
    return pathname === itemPath || pathname.startsWith(itemPath + '/')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-80' : 'w-16'} bg-gradient-to-b from-gray-900 to-gray-800 shadow-lg transition-all duration-300 flex flex-col`}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-blue-700">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div>
                <h1 className="text-xl font-bold text-white">لوحة المدير</h1>
                <p className="text-sm text-blue-200">إدارة شاملة للمنصة</p>
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Menu className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>

        {/* Admin Profile */}
        {sidebarOpen && (
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold">م</span>
              </div>
              <div>
                <p className="font-semibold text-white">مدير النظام</p>
                <p className="text-sm text-blue-200">admin@fiverr.com</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-2">
            {sidebarMenus.map((menu) => {
              const MenuIcon = menu.icon
              const isExpanded = expandedMenus.includes(menu.id)

              return (
                <div key={menu.id}>
                  <div
                    onClick={() => toggleMenu(menu.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-gray-700 cursor-pointer ${isExpanded ? 'bg-gray-700 text-white' : 'text-gray-300'
                      }`}
                  >
                    <MenuIcon className="h-5 w-5 flex-shrink-0" />
                    {sidebarOpen && (
                      <>
                        <span className="flex-1 text-right font-medium">{menu.title}</span>
                        {isExpanded ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </>
                    )}
                  </div>

                  {sidebarOpen && isExpanded && (
                    <div className="mr-8 mt-2 space-y-1">
                      {menu.items.map((item) => {
                        const ItemIcon = item.icon
                        const isActive = isActiveItem(item.path)
                        
                        return (
                          <button
                            key={item.id}
                            onClick={() => router.push(item.path)}
                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${isActive
                              ? 'bg-green-600 text-white font-medium'
                              : 'text-gray-400 hover:bg-gray-600 hover:text-white'
                              }`}
                          >
                            <ItemIcon className="h-4 w-4" />
                            <span className="text-right">{item.title}</span>
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={() => {
              localStorage.clear()
              window.location.href = '/'
            }}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-blue-200 hover:bg-blue-800 hover:text-white transition-colors"
          >
            <LogOut className="h-5 w-5" />
            {sidebarOpen && <span className="font-medium">تسجيل الخروج</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold text-gray-900">
                {getCurrentPageTitle()}
              </h2>
              <div className="relative">
                <Bell className="h-6 w-6 text-gray-600 cursor-pointer" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  12
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <NotificationSystem />
              <span className="text-sm text-gray-500">آخر تحديث: الآن</span>
              <button 
                onClick={() => {
                  alert('تم تحديث البيانات بنجاح')
                  window.location.reload()
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                تحديث البيانات
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}