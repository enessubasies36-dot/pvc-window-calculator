import React from 'react'
import { useStore } from '../store/useStore'

export const MeasurementInput = () => {
  const { width, height, profileType, setMeasurements } = useStore()

  const handleChange = (field, value) => {
    const numValue = Math.max(0, parseInt(value) || 0)
    if (field === 'width') {
      setMeasurements(numValue, height, profileType)
    } else if (field === 'height') {
      setMeasurements(width, numValue, profileType)
    } else if (field === 'profileType') {
      setMeasurements(width, height, parseInt(value))
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Pencere Ölçüleri</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Genişlik */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Genişlik (cm)
          </label>
          <input
            type="number"
            value={width}
            onChange={(e) => handleChange('width', e.target.value)}
            min="50"
            max="500"
            className="w-full px-4 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-600 transition"
          />
          <p className="text-xs text-gray-500 mt-1">{(width / 100).toFixed(2)} m</p>
        </div>

        {/* Yükseklik */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Yükseklik (cm)
          </label>
          <input
            type="number"
            value={height}
            onChange={(e) => handleChange('height', e.target.value)}
            min="50"
            max="500"
            className="w-full px-4 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-600 transition"
          />
          <p className="text-xs text-gray-500 mt-1">{(height / 100).toFixed(2)} m</p>
        </div>

        {/* Profil Tipi */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Profil Tipi (mm)
          </label>
          <select
            value={profileType}
            onChange={(e) => handleChange('profileType', e.target.value)}
            className="w-full px-4 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-600 transition bg-white"
          >
            <option value={70}>70 mm</option>
            <option value={76}>76 mm</option>
            <option value={80}>80 mm</option>
          </select>
        </div>
      </div>

      {/* Bilgi */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Cam Alanı:</span> {((width * height) / 10000).toFixed(2)} m²
        </p>
      </div>
    </div>
  )
}
