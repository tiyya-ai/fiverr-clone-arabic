'use client'

import { X, Plus, Minus, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'

interface CartItem {
  id: number
  title: string
  seller: string
  package: string
  price: number
  quantity: number
  image: string
}

interface CartModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } = useCart()
  const total = getTotalPrice()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 pt-20">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold" dir="rtl">سلة التسوق ({cartItems.length})</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="p-4 max-h-96 overflow-y-auto">
          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4" dir="rtl">سلة التسوق فارغة</p>
              <a 
                href="/services"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                تصفح الخدمات
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={60}
                    height={60}
                    className="rounded-lg object-cover"
                  />
                  <div className="flex-1 mr-3">
                    <h3 className="font-semibold text-sm mb-1" dir="rtl">{item.title}</h3>
                    <p className="text-xs text-gray-600 mb-1" dir="rtl">البائع: {item.seller}</p>
                    <p className="text-xs text-gray-600 mb-2" dir="rtl">{item.package}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-bold text-blue-600">{item.price} ر.س</div>
                      <div className="flex items-center space-x-1">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-sm w-6 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="p-1 text-red-500 hover:bg-red-50 rounded ml-2"
                          title="حذف من السلة"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t p-4">
            <div className="flex justify-between items-center mb-4" dir="rtl">
              <span className="font-semibold">المجموع:</span>
              <span className="text-lg font-bold text-blue-600">{total} ر.س</span>
            </div>
            <div className="space-y-2">
              <a 
                href="/checkout"
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium text-center transition-colors"
              >
                إتمام الطلب
              </a>
              <button 
                onClick={onClose}
                className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 py-2 rounded-lg font-medium transition-colors"
              >
                متابعة التسوق
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}