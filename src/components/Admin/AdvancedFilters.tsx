'use client'

import { useState } from 'react'
import { Filter, Calendar, Search, X, Save, RotateCcw } from 'lucide-react'

interface FilterOption {
  id: string
  label: string
  type: 'text' | 'select' | 'date' | 'daterange' | 'number'
  options?: { value: string; label: string }[]
  placeholder?: string
}

interface AdvancedFiltersProps {
  filters: FilterOption[]
  onApplyFilters: (filters: Record<string, any>) => void
  onResetFilters: () => void
  savedFilters?: { name: string; filters: Record<string, any> }[]
  onSaveFilter?: (name: string, filters: Record<string, any>) => void
}

export default function AdvancedFilters({
  filters,
  onApplyFilters,
  onResetFilters,
  savedFilters = [],
  onSaveFilter
}: AdvancedFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [filterValues, setFilterValues] = useState<Record<string, any>>({})
  const [saveFilterName, setSaveFilterName] = useState('')
  const [showSaveDialog, setShowSaveDialog] = useState(false)

  const handleFilterChange = (filterId: string, value: any) => {
    setFilterValues(prev => ({
      ...prev,
      [filterId]: value
    }))
  }

  const handleApplyFilters = () => {
    onApplyFilters(filterValues)
    setIsOpen(false)
  }

  const handleResetFilters = () => {
    setFilterValues({})
    onResetFilters()
  }

  const handleSaveFilter = () => {
    if (saveFilterName.trim() && onSaveFilter) {
      onSaveFilter(saveFilterName.trim(), filterValues)
      setSaveFilterName('')
      setShowSaveDialog(false)
    }
  }

  const loadSavedFilter = (savedFilter: { name: string; filters: Record<string, any> }) => {
    setFilterValues(savedFilter.filters)
    onApplyFilters(savedFilter.filters)
    setIsOpen(false)
  }

  const renderFilterInput = (filter: FilterOption) => {
    const value = filterValues[filter.id] || ''

    switch (filter.type) {
      case 'text':
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => handleFilterChange(filter.id, e.target.value)}
            placeholder={filter.placeholder}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        )

      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => handleFilterChange(filter.id, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">اختر {filter.label}</option>
            {filter.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )

      case 'date':
        return (
          <input
            type="date"
            value={value}
            onChange={(e) => handleFilterChange(filter.id, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        )

      case 'daterange':
        return (
          <div className="grid grid-cols-2 gap-2">
            <input
              type="date"
              value={value?.from || ''}
              onChange={(e) => handleFilterChange(filter.id, { ...value, from: e.target.value })}
              placeholder="من"
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="date"
              value={value?.to || ''}
              onChange={(e) => handleFilterChange(filter.id, { ...value, to: e.target.value })}
              placeholder="إلى"
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        )

      case 'number':
        return (
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              value={value?.min || ''}
              onChange={(e) => handleFilterChange(filter.id, { ...value, min: e.target.value })}
              placeholder="الحد الأدنى"
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="number"
              value={value?.max || ''}
              onChange={(e) => handleFilterChange(filter.id, { ...value, max: e.target.value })}
              placeholder="الحد الأقصى"
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        )

      default:
        return null
    }
  }

  const activeFiltersCount = Object.keys(filterValues).filter(key => {
    const value = filterValues[key]
    if (typeof value === 'string') return value.trim() !== ''
    if (typeof value === 'object' && value !== null) {
      return Object.values(value).some(v => v && v.toString().trim() !== '')
    }
    return false
  }).length

  return (
    <div className="relative">
      {/* Filter Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors ${
          activeFiltersCount > 0
            ? 'bg-blue-50 border-blue-300 text-blue-700'
            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
        }`}
      >
        <Filter className="h-4 w-4" />
        <span>فلترة متقدمة</span>
        {activeFiltersCount > 0 && (
          <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
            {activeFiltersCount}
          </span>
        )}
      </button>

      {/* Saved Filters Quick Access */}
      {savedFilters.length > 0 && (
        <div className="absolute top-full left-0 mt-1 flex gap-2 z-10">
          {savedFilters.slice(0, 3).map((savedFilter, index) => (
            <button
              key={index}
              onClick={() => loadSavedFilter(savedFilter)}
              className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors"
            >
              {savedFilter.name}
            </button>
          ))}
        </div>
      )}

      {/* Filter Panel */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-96 bg-white border border-gray-200 rounded-lg shadow-xl z-50">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">فلترة متقدمة</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="p-4 max-h-96 overflow-y-auto">
            <div className="space-y-4">
              {filters.map((filter) => (
                <div key={filter.id}>
                  <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                    {filter.label}
                  </label>
                  {renderFilterInput(filter)}
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between gap-3">
              <div className="flex gap-2">
                <button
                  onClick={handleResetFilters}
                  className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span className="text-sm">إعادة تعيين</span>
                </button>
                
                {onSaveFilter && (
                  <button
                    onClick={() => setShowSaveDialog(true)}
                    className="flex items-center gap-2 px-3 py-2 text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <Save className="h-4 w-4" />
                    <span className="text-sm">حفظ الفلتر</span>
                  </button>
                )}
              </div>

              <button
                onClick={handleApplyFilters}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                تطبيق الفلاتر
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Save Filter Dialog */}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">حفظ الفلتر</h3>
            <input
              type="text"
              value={saveFilterName}
              onChange={(e) => setSaveFilterName(e.target.value)}
              placeholder="اسم الفلتر"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
            />
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowSaveDialog(false)
                  setSaveFilterName('')
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                إلغاء
              </button>
              <button
                onClick={handleSaveFilter}
                disabled={!saveFilterName.trim()}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                حفظ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}