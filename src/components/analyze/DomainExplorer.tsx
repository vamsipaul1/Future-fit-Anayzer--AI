'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, Code, Database, Globe, Smartphone, Cpu, Shield, Palette, BarChart3 } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface Domain {
  id: string
  name: string
  description: string
  skillCount: number
  color: string
}

interface DomainExplorerProps {
  domains: Domain[]
  selectedDomainId?: string
  onSelectDomain: (domainId: string) => void
  className?: string
}

const domainIcons = {
  'web-development': Globe,
  'mobile-development': Smartphone,
  'data-science': BarChart3,
  'backend-development': Database,
  'frontend-development': Code,
  'devops': Cpu,
  'cybersecurity': Shield,
  'ui-ux': Palette,
}

export function DomainExplorer({
  domains,
  selectedDomainId,
  onSelectDomain,
  className
}: DomainExplorerProps) {
  const [hoveredDomain, setHoveredDomain] = useState<string | null>(null)

  const getDomainIcon = (domainId: string) => {
    const IconComponent = domainIcons[domainId as keyof typeof domainIcons] || Code
    return IconComponent
  }

  return (
    <div className={cn('w-full space-y-6', className)}>
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-800">Choose Your Domain</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Select the domain that best matches your career goals. We'll tailor your skill analysis accordingly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {domains.map((domain, index) => {
          const IconComponent = getDomainIcon(domain.id)
          const isSelected = selectedDomainId === domain.id
          const isHovered = hoveredDomain === domain.id

          return (
            <motion.div
              key={domain.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onHoverStart={() => setHoveredDomain(domain.id)}
              onHoverEnd={() => setHoveredDomain(null)}
              onClick={() => onSelectDomain(domain.id)}
              className={cn(
                'glass-card p-6 rounded-2xl cursor-pointer transition-all duration-300',
                'border-2 border-transparent hover:border-primary-200',
                isSelected && 'border-primary-500 bg-primary-50/50',
                'group'
              )}
            >
              {/* Domain Icon */}
              <div className="flex items-center justify-between mb-4">
                <div 
                  className={cn(
                    'w-12 h-12 rounded-xl flex items-center justify-center transition-colors',
                    isSelected ? 'bg-primary-500' : 'bg-gray-100 group-hover:bg-primary-100'
                  )}
                >
                  <IconComponent 
                    className={cn(
                      'w-6 h-6 transition-colors',
                      isSelected ? 'text-white' : 'text-gray-600 group-hover:text-primary-600'
                    )} 
                  />
                </div>
                <ChevronRight 
                  className={cn(
                    'w-5 h-5 transition-all',
                    isSelected || isHovered ? 'text-primary-500 translate-x-1' : 'text-gray-400'
                  )} 
                />
              </div>

              {/* Domain Info */}
              <div className="space-y-3">
                <h3 className={cn(
                  'text-xl font-semibold transition-colors',
                  isSelected ? 'text-primary-700' : 'text-gray-800 group-hover:text-primary-600'
                )}>
                  {domain.name}
                </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed">
                  {domain.description}
                </p>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-gray-500">
                    {domain.skillCount} skills available
                  </span>
                  
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-2 h-2 bg-primary-500 rounded-full"
                    />
                  )}
                </div>
              </div>

              {/* Hover Effect Overlay */}
              <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              />
            </motion.div>
          )
        })}
      </div>

      {/* Selected Domain Details */}
      {selectedDomainId && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 rounded-2xl border border-primary-200"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
              <ChevronRight className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Selected Domain</h3>
          </div>
          
          <p className="text-gray-600">
            Great choice! {domains.find(d => d.id === selectedDomainId)?.name} is a growing field with excellent opportunities.
            You'll be able to select relevant skills and take targeted assessments.
          </p>
        </motion.div>
      )}
    </div>
  )
}
