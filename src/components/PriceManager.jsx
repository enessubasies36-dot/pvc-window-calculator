import React, { useState } from 'react'
import { useStore } from '../store/useStore'

export const PriceManager = () => {
  const { prices, updatePrice, currency, setCurrency, exchangeRate, setExchangeRate } = useStore()
  const [showPrices, setShowPrices] = useState(true)

  const priceFields = [
    { key: 'profile', label: 'PVC Profil (₺/m)', placeholder: '0.00' },
    { key: 'lProfile', label: 'L-Profil (₺/m)', placeholder: '0.00' },
    { key: 'glass', label: 'Cam (₺/m²)', placeholder: '0.00' },
    { key: 'handle', label: 'Kol (₺/adet)', placeholder: '0.00' },
    { key: 'hinge', label: 'Menteşe (₺/adet)', placeholder: '0.00' },
    { key: 'gasket', label: 'Conta (₺/m)', placeholder: '0.00' },
    { key: 'supportBar', label: 'Destek Saçı (₺/m)', placeholder: '0.00' },
    { key: 'glassStop', label: 'Cam Ayağı (₺/adet)', placeholder: '0.00' },
  ]

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Fiyat Yönetimi</h2>
        <button
          onClick={() => setShowPrices(!showPrices)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-sm font-semibold"
        >
          {showPrices ? 'Gizle' : 'Göster'}
        </button>
      </div>

      {showPrices && (
        <>
          {/* Para Birimi ve Kur */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-700 mb-3">Para Birimi & Kur</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Para Birimi
                </label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition bg-white text-sm"
                >
                  <option value="TRY">TRY (₺)</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Döviz Kuru (1 {currency} = ? TRY)
                </label>
                <input
                  type="number"
                  value={exchangeRate}
                  onChange={(e) => setExchangeRate(e.target.value)}
                  step="0.01"
                  min="0.01"
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition text-sm"
                />
              </div>
            </div>
          </div>

          {/* Fiyatlar Tabı */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {priceFields.map((field) => (
              <div key={field.key}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {field.label}
                </label>
                <input
                  type="number"
                  value={prices[field.key]}
                  onChange={(e) => updatePrice(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  step="0.01"
                  min="0"
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition text-sm"
                />
              </div>
            ))}
          </div>

          {/* İpucu */}
          <div className="mt-4 p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">💡 İpucu:</span> Fiyatları metre veya adet başına girin. Sistem otomatik olarak hesaplayacaktır.
            </p>
          </div>
        </>
      )}
    </div>
  )
}
