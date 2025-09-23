'use client'

import { useState } from 'react'
import { Star } from 'lucide-react'
import { useSession } from 'next-auth/react'

interface ReviewSystemProps {
  serviceId: string
  orderId?: string
}

export default function ReviewSystem({ serviceId, orderId }: ReviewSystemProps) {
  const { data: session } = useSession()
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const submitReview = async () => {
    if (!session?.user || rating === 0) return

    setSubmitting(true)
    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceId,
          orderId,
          rating,
          comment
        })
      })

      if (response.ok) {
        alert('تم إرسال التقييم بنجاح!')
        setRating(0)
        setComment('')
      }
    } catch (error) {
      console.error('Failed to submit review:', error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg border">
      <h3 className="text-lg font-semibold mb-4" dir="rtl">اترك تقييمك</h3>
      
      <div className="space-y-4">
        <div dir="rtl">
          <label className="block text-sm font-medium mb-2">التقييم</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className="text-2xl"
              >
                <Star
                  className={`h-6 w-6 ${
                    star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div dir="rtl">
          <label className="block text-sm font-medium mb-2">التعليق</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border rounded-lg text-right"
            placeholder="شاركنا تجربتك مع هذه الخدمة..."
          />
        </div>

        <button
          onClick={submitReview}
          disabled={submitting || rating === 0}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {submitting ? 'جاري الإرسال...' : 'إرسال التقييم'}
        </button>
      </div>
    </div>
  )
}