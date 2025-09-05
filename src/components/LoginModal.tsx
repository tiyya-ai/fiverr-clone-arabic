'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  onLogin: (userType: string) => void
}

export default function LoginModal({ isOpen, onClose, onLogin }: LoginModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">تسجيل الدخول التجريبي</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={() => onLogin('user')}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            دخول كمستخدم عادي
          </button>
          
          <button
            onClick={() => onLogin('admin')}
            className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700"
          >
            دخول كمدير
          </button>
          
          <button
            onClick={() => onLogin('seller')}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
          >
            دخول كبائع
          </button>
        </div>
      </div>
    </div>
  )
}