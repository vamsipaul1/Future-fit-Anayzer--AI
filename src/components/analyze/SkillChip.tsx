'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { X, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface SkillChipProps {
  skillId: string
  skillName: string
  level: number
  trend?: 'up' | 'down' | 'stable'
  onRemove?: (skillId: string) => void
  onLevelChange?: (skillId: string, level: number) => void
  showLevel?: boolean
  showTrend?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'outline' | 'glass'
  className?: string
}

export function SkillChip({
  skillId,
  skillName,
  level,
  trend,
  onRemove,
  onLevelChange,
  showLevel = true,
  showTrend = false,
  size = 'md',
  variant = 'default',
  className
}: SkillChipProps) {
  const getLevelColor = (level: number) => {
    if (level < 40) return 'bg-red-500'
    if (level < 70) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  const getLevelText = (level: number) => {
    if (level < 40) return 'Beginner'
    if (level < 70) return 'Intermediate'
    return 'Advanced'
  }

  const getTrendIcon = (trend?: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-3 h-3 text-green-500" />
      case 'down':
        return <TrendingDown className="w-3 h-3 text-red-500" />
      case 'stable':
        return <Minus className="w-3 h-3 text-gray-500" />
      default:
        return null
    }
  }

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-3 text-base'
  }

  const variantClasses = {
    default: 'bg-primary-100 text-primary-800 border border-primary-200',
    outline: 'bg-white text-gray-800 border border-gray-300',
    glass: 'glass-card text-gray-800 border border-white/20'
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      whileHover={{ scale: 1.05 }}
      className={cn(
        'inline-flex items-center space-x-2 rounded-full transition-all duration-200',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      {/* Skill Name */}
      <span className="font-medium">{skillName}</span>

      {/* Level Indicator */}
      {showLevel && (
        <div className="flex items-center space-x-1">
          <div className="flex items-center space-x-1">
            <div className={cn('w-2 h-2 rounded-full', getLevelColor(level))} />
            <span className="text-xs font-medium">{level}%</span>
          </div>
          <span className="text-xs text-gray-600">
            ({getLevelText(level)})
          </span>
        </div>
      )}

      {/* Trend Indicator */}
      {showTrend && trend && (
        <div className="flex items-center">
          {getTrendIcon(trend)}
        </div>
      )}

      {/* Remove Button */}
      {onRemove && (
        <button
          onClick={() => onRemove(skillId)}
          className="ml-1 p-0.5 hover:bg-black/10 rounded-full transition-colors"
          title="Remove skill"
          aria-label={`Remove ${skillName} skill`}
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </motion.div>
  )
}

// Skill Chip Group Component
export interface SkillChipGroupProps {
  skills: Array<{
    skillId: string
    skillName: string
    level: number
    trend?: 'up' | 'down' | 'stable'
  }>
  onRemove?: (skillId: string) => void
  onLevelChange?: (skillId: string, level: number) => void
  showLevel?: boolean
  showTrend?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'outline' | 'glass'
  className?: string
  maxDisplay?: number
}

export function SkillChipGroup({
  skills,
  onRemove,
  onLevelChange,
  showLevel = true,
  showTrend = false,
  size = 'md',
  variant = 'default',
  className,
  maxDisplay
}: SkillChipGroupProps) {
  const displaySkills = maxDisplay ? skills.slice(0, maxDisplay) : skills
  const remainingCount = maxDisplay ? skills.length - maxDisplay : 0

  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {displaySkills.map((skill) => (
        <SkillChip
          key={skill.skillId}
          skillId={skill.skillId}
          skillName={skill.skillName}
          level={skill.level}
          trend={skill.trend}
          onRemove={onRemove}
          onLevelChange={onLevelChange}
          showLevel={showLevel}
          showTrend={showTrend}
          size={size}
          variant={variant}
        />
      ))}
      
      {remainingCount > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={cn(
            'inline-flex items-center px-3 py-2 rounded-full text-sm font-medium',
            'bg-gray-100 text-gray-600 border border-gray-200'
          )}
        >
          +{remainingCount} more
        </motion.div>
      )}
    </div>
  )
}
