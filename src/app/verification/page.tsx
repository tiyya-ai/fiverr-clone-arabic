'use client'

import { useState } from 'react'
import MainHeader from '@/components/MainHeader'
import Footer from '@/components/Footer'
import VerificationBadge, { VerificationScore } from '@/components/VerificationBadge'
import { Shield, CheckCircle, Upload, Phone, Mail, MapPin, Award, User, Camera, FileText, Clock } from 'lucide-react'

export default function VerificationPage() {
  const [activeStep, setActiveStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState([])

  const verificationSteps = [
    {
      id: 'identity',
      title: 'التحقق من الهوية',
      description: 'ارفع صورة من هويتك الشخصية أو جواز السفر',
      icon: User,
      required: true,
      points: 25
    },
    {
      id: 'phone',
      title: 'التحقق من رقم الهاتف',
      description: 'أدخل رقم هاتفك لتلقي رمز التحقق',
      icon: Phone,
      required: true,
      points: 15
    },
    {
      id: 'email',
      title: 'التحقق من البريد الإلكتروني',
      description: 'تأكيد عنوان بريدك الإلكتروني',
      icon: Mail,
      required: true,
      points: 10
    },
    {
      id: 'address',
      title: 'التحقق من العنوان',
      description: 'ارفع مستند يثبت عنوان إقامتك',
      icon: MapPin,
      required: false,
      points: 20
    },
    {
      id: 'skills',
      title: 'التحقق من المهارات',
      description: 'ارفع شهادات أو أعمال سابقة تثبت مهاراتك',
      icon: Award,
      required: false,
      points: 30
    }
  ]

  const handleStepComplete = (stepId) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId])
    }
  }

  const totalPoints = completedSteps.reduce((sum, stepId) => {
    const step = verificationSteps.find(s => s.id === stepId)
    return sum + (step?.points || 0)
  }, 0)

  const currentStep = verificationSteps[activeStep]

  return (
    <div className="min-h-screen bg-gray-50">
      <MainHeader />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full mb-4">
            <Shield className="w-5 h-5" />
            <span className="font-semibold">نظام التحقق</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2" dir="rtl">تحقق من حسابك</h1>
          <p className="text-gray-600 max-w-2xl mx-auto" dir="rtl">
            احصل على المزيد من الثقة والمصداقية من خلال التحقق من هويتك ومهاراتك
          </p>
        </div>

        {/* Progress Overview */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold" dir="rtl">نظرة عامة على التقدم</h2>
            <VerificationScore score={totalPoints} size="md" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {verificationSteps.map((step, index) => {
              const isCompleted = completedSteps.includes(step.id)
              const isActive = activeStep === index
              const IconComponent = step.icon
              
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(index)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    isCompleted 
                      ? 'border-green-200 bg-green-50' 
                      : isActive 
                        ? 'border-blue-200 bg-blue-50' 
                        : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                      isCompleted 
                        ? 'bg-green-100 text-green-600' 
                        : isActive 
                          ? 'bg-blue-100 text-blue-600' 
                          : 'bg-gray-100 text-gray-600'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <IconComponent className="w-6 h-6" />
                      )}
                    </div>
                    <h3 className="font-medium text-sm mb-1" dir="rtl">{step.title}</h3>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-gray-500">+{step.points} نقطة</span>
                      {step.required && (
                        <span className="text-xs text-red-500">*</span>
                      )}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Current Step Details */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <currentStep.icon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold" dir="rtl">{currentStep.title}</h2>
              <p className="text-gray-600" dir="rtl">{currentStep.description}</p>
            </div>
          </div>

          {/* Step Content */}
          <div className="space-y-6">
            {currentStep.id === 'identity' && (
              <IdentityVerification onComplete={() => handleStepComplete('identity')} />
            )}
            {currentStep.id === 'phone' && (
              <PhoneVerification onComplete={() => handleStepComplete('phone')} />
            )}
            {currentStep.id === 'email' && (
              <EmailVerification onComplete={() => handleStepComplete('email')} />
            )}
            {currentStep.id === 'address' && (
              <AddressVerification onComplete={() => handleStepComplete('address')} />
            )}
            {currentStep.id === 'skills' && (
              <SkillsVerification onComplete={() => handleStepComplete('skills')} />
            )}
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6 mt-8">
          <h3 className="text-lg font-semibold mb-4" dir="rtl">فوائد التحقق</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-blue-600" />
              <span className="text-sm" dir="rtl">زيادة الثقة مع العملاء</span>
            </div>
            <div className="flex items-center gap-3">
              <Award className="w-5 h-5 text-green-600" />
              <span className="text-sm" dir="rtl">أولوية في نتائج البحث</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-purple-600" />
              <span className="text-sm" dir="rtl">شارة التحقق الظاهرة</span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

// Individual verification components
function IdentityVerification({ onComplete }) {
  const [uploaded, setUploaded] = useState(false)

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="font-semibold mb-2" dir="rtl">ارفع صورة هويتك</h3>
        <p className="text-sm text-gray-600 mb-4" dir="rtl">
          يمكنك رفع صورة من الهوية الوطنية أو جواز السفر
        </p>
        <button 
          onClick={() => {
            setUploaded(true)
            setTimeout(() => onComplete(), 1000)
          }}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          اختر ملف
        </button>
      </div>
      {uploaded && (
        <div className="flex items-center gap-2 text-green-600">
          <CheckCircle className="w-5 h-5" />
          <span>تم رفع الملف بنجاح - جاري المراجعة</span>
        </div>
      )}
    </div>
  )
}

function PhoneVerification({ onComplete }) {
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [codeSent, setCodeSent] = useState(false)

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2" dir="rtl">رقم الهاتف</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="05xxxxxxxx"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-right"
          dir="rtl"
        />
      </div>
      
      {!codeSent ? (
        <button 
          onClick={() => setCodeSent(true)}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          إرسال رمز التحقق
        </button>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" dir="rtl">رمز التحقق</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="123456"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-center"
              maxLength={6}
            />
          </div>
          <button 
            onClick={onComplete}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
          >
            تأكيد الرمز
          </button>
        </div>
      )}
    </div>
  )
}

function EmailVerification({ onComplete }) {
  return (
    <div className="text-center py-8">
      <Mail className="w-16 h-16 text-blue-600 mx-auto mb-4" />
      <h3 className="font-semibold mb-2" dir="rtl">تم إرسال رابط التحقق</h3>
      <p className="text-gray-600 mb-4" dir="rtl">
        تحقق من بريدك الإلكتروني واضغط على رابط التحقق
      </p>
      <button 
        onClick={onComplete}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
      >
        تم التحقق
      </button>
    </div>
  )
}

function AddressVerification({ onComplete }) {
  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="font-semibold mb-2" dir="rtl">ارفع مستند العنوان</h3>
        <p className="text-sm text-gray-600 mb-4" dir="rtl">
          فاتورة كهرباء أو ماء أو أي مستند رسمي يحتوي على عنوانك
        </p>
        <button 
          onClick={onComplete}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          اختر ملف
        </button>
      </div>
    </div>
  )
}

function SkillsVerification({ onComplete }) {
  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <Award className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="font-semibold mb-2" dir="rtl">ارفع شهاداتك ومهاراتك</h3>
        <p className="text-sm text-gray-600 mb-4" dir="rtl">
          شهادات، أعمال سابقة، أو أي مستند يثبت خبرتك في مجالك
        </p>
        <button 
          onClick={onComplete}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          اختر ملفات
        </button>
      </div>
    </div>
  )
}