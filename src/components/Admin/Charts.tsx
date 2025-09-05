'use client'

import { useState, useEffect } from 'react'

interface ChartData {
  labels: string[]
  data: number[]
  colors?: string[]
}

export const LineChart = ({ data, title }: { data: ChartData; title: string }) => {
  const maxValue = Math.max(...data.data)
  const minValue = Math.min(...data.data)
  const range = maxValue - minValue || 1

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4 text-right">{title}</h3>
      <div className="relative h-64">
        <svg className="w-full h-full" viewBox="0 0 400 200">
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={i}
              x1="40"
              y1={40 + (i * 32)}
              x2="380"
              y2={40 + (i * 32)}
              stroke="#f3f4f6"
              strokeWidth="1"
            />
          ))}
          
          {/* Y-axis labels */}
          {[0, 1, 2, 3, 4].map((i) => (
            <text
              key={i}
              x="35"
              y={45 + (i * 32)}
              textAnchor="end"
              className="text-xs fill-gray-500"
            >
              {Math.round(maxValue - (i * range / 4))}
            </text>
          ))}

          {/* Line path */}
          <path
            d={`M ${data.data.map((value, index) => {
              const x = 50 + (index * (320 / (data.data.length - 1)))
              const y = 40 + ((maxValue - value) / range) * 128
              return `${index === 0 ? 'M' : 'L'} ${x} ${y}`
            }).join(' ')}`}
            fill="none"
            stroke="#1ab7ea"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Data points */}
          {data.data.map((value, index) => {
            const x = 50 + (index * (320 / (data.data.length - 1)))
            const y = 40 + ((maxValue - value) / range) * 128
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="4"
                fill="#1ab7ea"
                className="hover:r-6 transition-all cursor-pointer"
              />
            )
          })}

          {/* X-axis labels */}
          {data.labels.map((label, index) => (
            <text
              key={index}
              x={50 + (index * (320 / (data.labels.length - 1)))}
              y="185"
              textAnchor="middle"
              className="text-xs fill-gray-500"
            >
              {label}
            </text>
          ))}
        </svg>
      </div>
    </div>
  )
}

export const BarChart = ({ data, title }: { data: ChartData; title: string }) => {
  const maxValue = Math.max(...data.data)
  const colors = data.colors || ['#1ab7ea', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4 text-right">{title}</h3>
      <div className="relative h-64">
        <svg className="w-full h-full" viewBox="0 0 400 200">
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={i}
              x1="40"
              y1={40 + (i * 32)}
              x2="380"
              y2={40 + (i * 32)}
              stroke="#f3f4f6"
              strokeWidth="1"
            />
          ))}

          {/* Bars */}
          {data.data.map((value, index) => {
            const barWidth = 280 / data.data.length - 10
            const barHeight = (value / maxValue) * 128
            const x = 50 + (index * (280 / data.data.length)) + 5
            const y = 168 - barHeight

            return (
              <g key={index}>
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  fill={colors[index % colors.length]}
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                  rx="4"
                />
                <text
                  x={x + barWidth / 2}
                  y={y - 5}
                  textAnchor="middle"
                  className="text-xs fill-gray-700 font-medium"
                >
                  {value}
                </text>
              </g>
            )
          })}

          {/* X-axis labels */}
          {data.labels.map((label, index) => (
            <text
              key={index}
              x={50 + (index * (280 / data.labels.length)) + (280 / data.labels.length) / 2}
              y="185"
              textAnchor="middle"
              className="text-xs fill-gray-500"
            >
              {label}
            </text>
          ))}
        </svg>
      </div>
    </div>
  )
}

export const PieChart = ({ data, title }: { data: ChartData; title: string }) => {
  const total = data.data.reduce((sum, value) => sum + value, 0)
  const colors = data.colors || ['#1ab7ea', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']
  
  let currentAngle = 0
  const radius = 80
  const centerX = 100
  const centerY = 100

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4 text-right">{title}</h3>
      <div className="flex items-center gap-8">
        <div className="relative">
          <svg width="200" height="200" viewBox="0 0 200 200">
            {data.data.map((value, index) => {
              const percentage = (value / total) * 100
              const angle = (value / total) * 360
              const startAngle = currentAngle
              const endAngle = currentAngle + angle
              
              const startX = centerX + radius * Math.cos((startAngle - 90) * Math.PI / 180)
              const startY = centerY + radius * Math.sin((startAngle - 90) * Math.PI / 180)
              const endX = centerX + radius * Math.cos((endAngle - 90) * Math.PI / 180)
              const endY = centerY + radius * Math.sin((endAngle - 90) * Math.PI / 180)
              
              const largeArcFlag = angle > 180 ? 1 : 0
              
              const pathData = [
                `M ${centerX} ${centerY}`,
                `L ${startX} ${startY}`,
                `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`,
                'Z'
              ].join(' ')
              
              currentAngle += angle
              
              return (
                <path
                  key={index}
                  d={pathData}
                  fill={colors[index % colors.length]}
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                  stroke="white"
                  strokeWidth="2"
                />
              )
            })}
          </svg>
        </div>
        
        <div className="flex-1">
          <div className="space-y-2">
            {data.labels.map((label, index) => {
              const percentage = ((data.data[index] / total) * 100).toFixed(1)
              return (
                <div key={index} className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: colors[index % colors.length] }}
                  />
                  <span className="text-sm text-gray-700 flex-1 text-right">{label}</span>
                  <span className="text-sm font-medium text-gray-900">{percentage}%</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export const DonutChart = ({ data, title, centerText }: { 
  data: ChartData; 
  title: string; 
  centerText?: string 
}) => {
  const total = data.data.reduce((sum, value) => sum + value, 0)
  const colors = data.colors || ['#1ab7ea', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']
  
  let currentAngle = 0
  const outerRadius = 80
  const innerRadius = 50
  const centerX = 100
  const centerY = 100

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4 text-right">{title}</h3>
      <div className="flex items-center gap-8">
        <div className="relative">
          <svg width="200" height="200" viewBox="0 0 200 200">
            {data.data.map((value, index) => {
              const percentage = (value / total) * 100
              const angle = (value / total) * 360
              const startAngle = currentAngle
              const endAngle = currentAngle + angle
              
              const outerStartX = centerX + outerRadius * Math.cos((startAngle - 90) * Math.PI / 180)
              const outerStartY = centerY + outerRadius * Math.sin((startAngle - 90) * Math.PI / 180)
              const outerEndX = centerX + outerRadius * Math.cos((endAngle - 90) * Math.PI / 180)
              const outerEndY = centerY + outerRadius * Math.sin((endAngle - 90) * Math.PI / 180)
              
              const innerStartX = centerX + innerRadius * Math.cos((startAngle - 90) * Math.PI / 180)
              const innerStartY = centerY + innerRadius * Math.sin((startAngle - 90) * Math.PI / 180)
              const innerEndX = centerX + innerRadius * Math.cos((endAngle - 90) * Math.PI / 180)
              const innerEndY = centerY + innerRadius * Math.sin((endAngle - 90) * Math.PI / 180)
              
              const largeArcFlag = angle > 180 ? 1 : 0
              
              const pathData = [
                `M ${outerStartX} ${outerStartY}`,
                `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${outerEndX} ${outerEndY}`,
                `L ${innerEndX} ${innerEndY}`,
                `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${innerStartX} ${innerStartY}`,
                'Z'
              ].join(' ')
              
              currentAngle += angle
              
              return (
                <path
                  key={index}
                  d={pathData}
                  fill={colors[index % colors.length]}
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                  stroke="white"
                  strokeWidth="2"
                />
              )
            })}
            
            {centerText && (
              <text
                x={centerX}
                y={centerY}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-lg font-bold fill-gray-700"
              >
                {centerText}
              </text>
            )}
          </svg>
        </div>
        
        <div className="flex-1">
          <div className="space-y-2">
            {data.labels.map((label, index) => {
              const percentage = ((data.data[index] / total) * 100).toFixed(1)
              return (
                <div key={index} className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: colors[index % colors.length] }}
                  />
                  <span className="text-sm text-gray-700 flex-1 text-right">{label}</span>
                  <span className="text-sm font-medium text-gray-900">{percentage}%</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}