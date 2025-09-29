'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts'
import { cn } from '@/lib/utils'

export interface RadarData {
  skill: string
  value: number
  fullMark?: number
}

interface RadarChartProps {
  data: RadarData[]
  title?: string
  className?: string
  showLegend?: boolean
  maxValue?: number
  colors?: {
    fill: string
    stroke: string
  }
}

export function RadarChartComponent({
  data,
  title = 'Skill Analysis',
  className,
  showLegend = true,
  maxValue = 100,
  colors = {
    fill: 'rgba(59, 130, 246, 0.3)',
    stroke: 'rgba(59, 130, 246, 0.8)'
  }
}: RadarChartProps) {
  const chartData = data.map(item => ({
    ...item,
    fullMark: maxValue
  }))

  const getLevelColor = (value: number) => {
    if (value < 40) return 'text-red-500'
    if (value < 70) return 'text-yellow-500'
    return 'text-green-500'
  }

  const getLevelText = (value: number) => {
    if (value < 40) return 'Beginner'
    if (value < 70) return 'Intermediate'
    return 'Advanced'
  }

  return (
    <div className={cn('w-full space-y-4', className)}>
      {/* Chart Title */}
      {title && (
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        </div>
      )}

      {/* Radar Chart */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50">
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={chartData}>
              <PolarGrid 
                stroke="#e5e7eb" 
                strokeWidth={1}
                strokeOpacity={0.3}
              />
              <PolarAngleAxis 
                dataKey="skill" 
                tick={{ 
                  fontSize: 12, 
                  fill: '#374151',
                  fontWeight: 500
                }}
                tickLine={{ stroke: '#9ca3af' }}
              />
              <PolarRadiusAxis 
                angle={0} 
                domain={[0, maxValue]}
                tick={{ 
                  fontSize: 10, 
                  fill: '#6b7280'
                }}
                tickLine={{ stroke: '#9ca3af' }}
                axisLine={{ stroke: '#9ca3af' }}
              />
              <Radar
                name="Skill Level"
                dataKey="value"
                stroke={colors.stroke}
                fill={colors.fill}
                strokeWidth={2}
                dot={{ 
                  fill: colors.stroke, 
                  strokeWidth: 2, 
                  r: 4 
                }}
                activeDot={{ 
                  r: 6, 
                  fill: colors.stroke,
                  stroke: '#fff',
                  strokeWidth: 2
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Legend and Stats */}
      {showLegend && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Skill Breakdown */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-200/50">
            <h4 className="font-semibold text-gray-800 mb-3">Skill Breakdown</h4>
            <div className="space-y-2">
              {data.map((item, index) => (
                <motion.div
                  key={item.skill}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between"
                >
                  <span className="text-sm text-gray-600">{item.skill}</span>
                  <div className="flex items-center space-x-2">
                    <span className={cn('text-sm font-medium', getLevelColor(item.value))}>
                      {item.value}%
                    </span>
                    <span className={cn('text-xs px-2 py-1 rounded-full', getLevelColor(item.value))}>
                      {getLevelText(item.value)}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Overall Stats */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-200/50">
            <h4 className="font-semibold text-gray-800 mb-3">Overall Stats</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Average Score</span>
                <span className="font-semibold text-gray-800">
                  {Math.round(data.reduce((sum, item) => sum + item.value, 0) / data.length)}%
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Highest Skill</span>
                <span className="font-semibold text-green-600">
                  {data.reduce((max, item) => item.value > max.value ? item : max).skill}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Skills to Improve</span>
                <span className="font-semibold text-red-600">
                  {data.filter(item => item.value < 50).length}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Advanced Skills</span>
                <span className="font-semibold text-green-600">
                  {data.filter(item => item.value >= 75).length}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Skill Comparison Radar Chart
interface SkillComparisonProps {
  data: Array<{
    skill: string
    current: number
    target: number
  }>
  title?: string
  className?: string
}

export function SkillComparisonChart({
  data,
  title = 'Current vs Target Skills',
  className
}: SkillComparisonProps) {
  const chartData = data.map(item => ({
    skill: item.skill,
    current: item.current,
    target: item.target
  }))

  return (
    <div className={cn('w-full space-y-4', className)}>
      {title && (
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        </div>
      )}

      <div className="glass-card p-6 rounded-2xl">
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={chartData}>
              <PolarGrid stroke="#e5e7eb" strokeWidth={1} strokeOpacity={0.3} />
              <PolarAngleAxis 
                dataKey="skill" 
                tick={{ fontSize: 12, fill: '#374151', fontWeight: 500 }}
                tickLine={{ stroke: '#9ca3af' }}
              />
              <PolarRadiusAxis 
                angle={0} 
                domain={[0, 100]}
                tick={{ fontSize: 10, fill: '#6b7280' }}
                tickLine={{ stroke: '#9ca3af' }}
                axisLine={{ stroke: '#9ca3af' }}
              />
              <Radar
                name="Current"
                dataKey="current"
                stroke="rgba(59, 130, 246, 0.8)"
                fill="rgba(59, 130, 246, 0.3)"
                strokeWidth={2}
                dot={{ fill: 'rgba(59, 130, 246, 0.8)', strokeWidth: 2, r: 4 }}
              />
              <Radar
                name="Target"
                dataKey="target"
                stroke="rgba(34, 197, 94, 0.8)"
                fill="rgba(34, 197, 94, 0.3)"
                strokeWidth={2}
                dot={{ fill: 'rgba(34, 197, 94, 0.8)', strokeWidth: 2, r: 4 }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Legend */}
        <div className="flex justify-center space-x-6 mt-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Current Level</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Target Level</span>
          </div>
        </div>
      </div>
    </div>
  )
}
