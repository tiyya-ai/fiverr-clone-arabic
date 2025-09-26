import { Shield, CheckCircle, Phone, Mail, MapPin, Award, User } from 'lucide-react'

interface VerificationBadgeProps {
  type: string
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  isOnline?: boolean
}

const badgeConfig = {
  identity: {
    icon: User,
    label: 'هوية محققة',
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    iconColor: 'text-blue-600'
  },
  skills: {
    icon: Award,
    label: 'مهارات محققة',
    color: 'bg-green-100 text-green-800 border-green-200',
    iconColor: 'text-green-600'
  },
  phone: {
    icon: Phone,
    label: 'هاتف محقق',
    color: 'bg-purple-100 text-purple-800 border-purple-200',
    iconColor: 'text-purple-600'
  },
  email: {
    icon: Mail,
    label: 'إيميل محقق',
    color: 'bg-orange-100 text-orange-800 border-orange-200',
    iconColor: 'text-orange-600'
  },
  address: {
    icon: MapPin,
    label: 'عنوان محقق',
    color: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    iconColor: 'text-indigo-600'
  },
  verified: {
    icon: CheckCircle,
    label: 'محقق',
    color: 'bg-green-100 text-green-800 border-green-200',
    iconColor: 'text-green-600'
  }
}

const sizeConfig = {
  sm: {
    container: 'px-2 py-1 text-xs',
    icon: 'w-3 h-3',
    gap: 'gap-1'
  },
  md: {
    container: 'px-3 py-1.5 text-sm',
    icon: 'w-4 h-4',
    gap: 'gap-1.5'
  },
  lg: {
    container: 'px-4 py-2 text-base',
    icon: 'w-5 h-5',
    gap: 'gap-2'
  }
}

export default function VerificationBadge({ type, size = 'sm', showLabel = false, isOnline = false }: VerificationBadgeProps) {
  const config = badgeConfig[type as keyof typeof badgeConfig]
  const sizeStyles = sizeConfig[size]
  
  if (!config) return null

  const IconComponent = config.icon

  // Perfect green circle with check icon
  const circleSize = size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-5 h-5' : 'w-6 h-6'
  const iconSize = size === 'sm' ? 'w-2.5 h-2.5' : size === 'md' ? 'w-3 h-3' : 'w-3.5 h-3.5'

  return (
    <div className="relative inline-flex items-center">
      <div className={`${circleSize} bg-green-500 rounded-full flex items-center justify-center flex-shrink-0`}>
        <CheckCircle className={`${iconSize} text-white`} fill="currentColor" />
      </div>
      {isOnline && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full animate-pulse"></div>
      )}
    </div>
  )
}

// Verification Score Component
interface VerificationScoreProps {
  score: number
  size?: 'sm' | 'md' | 'lg'
}

export function VerificationScore({ score, size = 'md' }: VerificationScoreProps) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100'
    if (score >= 70) return 'text-yellow-600 bg-yellow-100'
    if (score >= 50) return 'text-orange-600 bg-orange-100'
    return 'text-red-600 bg-red-100'
  }

  const sizeStyles = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2'
  }

  return (
    <div className={`inline-flex items-center gap-1 ${sizeStyles[size]} ${getScoreColor(score)} rounded-full font-bold`}>
      <Shield className="w-3 h-3" />
      <span>{score}% محقق</span>
    </div>
  )
}

// Multiple Badges Component
interface VerificationBadgesProps {
  badges: string[]
  maxShow?: number
  size?: 'sm' | 'md' | 'lg'
}

export function VerificationBadges({ badges, maxShow = 3, size = 'sm' }: VerificationBadgesProps) {
  if (!badges || badges.length === 0) {
    return null
  }
  
  const visibleBadges = badges.slice(0, maxShow)
  const remainingCount = badges.length - maxShow

  return (
    <div className="flex items-center gap-1 flex-wrap">
      {visibleBadges.map((badge) => (
        <VerificationBadge key={badge} type={badge} size={size} showLabel={false} />
      ))}
      {remainingCount > 0 && (
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
          +{remainingCount}
        </span>
      )}
    </div>
  )
}