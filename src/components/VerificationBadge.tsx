import { Shield, CheckCircle, Phone, Mail, MapPin, Award, User, Check } from 'lucide-react'

interface VerificationBadgeProps {
  type: string
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  isOnline?: boolean
}

export default function VerificationBadge({ type, size = 'sm', showLabel = false, isOnline = false }: VerificationBadgeProps) {
  // Simple green circle with check mark
  const circleSize = size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-5 h-5' : 'w-6 h-6'
  const iconSize = size === 'sm' ? 'w-2.5 h-2.5' : size === 'md' ? 'w-3 h-3' : 'w-3.5 h-3.5'

  return (
    <div className="relative inline-flex items-center">
      <div className={`${circleSize} bg-green-500 rounded-full flex items-center justify-center flex-shrink-0`}>
        <Check className={`${iconSize} text-white stroke-[3]`} />
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

  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2'
  }

  return (
    <div className={`inline-flex items-center ${sizeClasses[size]} ${getScoreColor(score)} rounded-full font-medium`}>
      <span>{score}%</span>
    </div>
  )
}

// Multiple Verification Badges Component
interface VerificationBadgesProps {
  badges: string[]
  maxVisible?: number
  size?: 'sm' | 'md' | 'lg'
}

export function VerificationBadges({ badges, maxVisible = 3, size = 'sm' }: VerificationBadgesProps) {
  const visibleBadges = badges.slice(0, maxVisible)
  const remainingCount = badges.length - maxVisible

  return (
    <div className="flex items-center gap-1">
      {visibleBadges.map((badge, index) => (
        <VerificationBadge key={index} type={badge} size={size} showLabel={false} />
      ))}
      {remainingCount > 0 && (
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
          +{remainingCount}
        </span>
      )}
    </div>
  )
}