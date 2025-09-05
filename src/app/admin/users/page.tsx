'use client'

import { useEffect, useState } from 'react'
import { Users, Search, Plus, Eye, Edit, Trash2, Star, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { mockUsers } from '@/data/mockData'

export default function AdminUsersPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')

  useEffect(() => {
    const userType = localStorage.getItem('userType')
    if (userType !== 'admin') {
      router.push('/')
    }
  }, [router])

  const users = mockUsers?.map(user => ({
    id: user.id,
    name: user.fullName,
    email: `${user.username}@example.com`,
    type: user.totalSales > 0 ? 'بائع' : 'مشتري',
    status: 'نشط',
    joinDate: user.memberSince,
    orders: user.totalSales || 0,
    rating: user.rating,
    avatar: user.fullName.charAt(0)
  })) || []

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || 
                       (filterType === 'sellers' && user.type === 'بائع') ||
                       (filterType === 'buyers' && user.type === 'مشتري')
    return matchesSearch && matchesType
  })

  const handleViewUser = (userId: string) => {
    router.push(`/admin/users/${userId}`)
  }

  const handleEditUser = (userId: string) => {
    router.push(`/admin/users/${userId}/edit`)
  }

  const handleDeleteUser = (user: any) => {
    if (confirm(`هل أنت متأكد من حذف المستخدم: ${user.name}؟`)) {
      // Here you would implement the actual delete functionality
      alert(`تم حذف المستخدم: ${user.name}`)
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header Actions */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => router.push('/admin/users/create')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          إضافة مستخدم
        </button>
      </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="البحث عن مستخدم..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">جميع المستخدمين</option>
              <option value="sellers">البائعين فقط</option>
              <option value="buyers">المشترين فقط</option>
            </select>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">إجمالي المستخدمين</p>
                <p className="text-3xl font-bold text-blue-600">{users.length}</p>
              </div>
              <Users className="h-12 w-12 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">البائعين</p>
                <p className="text-3xl font-bold text-green-600">
                  {users.filter(u => u.type === 'بائع').length}
                </p>
              </div>
              <Star className="h-12 w-12 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">المشترين</p>
                <p className="text-3xl font-bold text-purple-600">
                  {users.filter(u => u.type === 'مشتري').length}
                </p>
              </div>
              <Users className="h-12 w-12 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">المستخدم</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">النوع</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الحالة</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الطلبات</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">التقييم</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center ml-4">
                        <span className="text-blue-600 font-bold">{user.avatar}</span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{user.type}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.status === 'نشط' ? 'bg-green-100 text-green-800' :
                      user.status === 'معلق' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{user.orders}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current ml-1" />
                      <span className="text-sm">{user.rating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleViewUser(user.id)}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                        title="عرض التفاصيل"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleEditUser(user.id)}
                        className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50"
                        title="تعديل"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteUser(user)}
                        className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                        title="حذف"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
  )
}