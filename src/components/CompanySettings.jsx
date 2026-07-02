import React, { useState } from 'react'
import { useStore } from '../store/useStore'
import { Settings } from 'lucide-react'

export const CompanySettings = () => {
  const { company, setCompany } = useStore()
  const [showSettings, setShowSettings] = useState(false)
  const [formData, setFormData] = useState(company)

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = () => {
    setCompany(formData)
    setShowSettings(false)
    alert('Şirket bilgileri kaydedildi!')
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Şirket Bilgileri</h2>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          <Settings size={20} />
        </button>
      </div>

      {showSettings ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Şirket Adı
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Adres
            </label>
            <textarea
              value={formData.address}
              onChange={(e) => handleChange('address', e.target.value)}
              rows="2"
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Telefon
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Vergi Kimlik Numarası (VKN)
            </label>
            <input
              type="text"
              value={formData.taxId}
              onChange={(e) => handleChange('taxId', e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition font-semibold"
            >
              Kaydet
            </button>
            <button
              onClick={() => setShowSettings(false)}
              className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition font-semibold"
            >
              İptal
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600 mb-1">Şirket Adı</p>
            <p className="font-semibold text-gray-800">{company.name}</p>
          </div>
          <div>
            <p className="text-gray-600 mb-1">Telefon</p>
            <p className="font-semibold text-gray-800">{company.phone}</p>
          </div>
          <div>
            <p className="text-gray-600 mb-1">Email</p>
            <p className="font-semibold text-gray-800">{company.email}</p>
          </div>
          <div>
            <p className="text-gray-600 mb-1">VKN</p>
            <p className="font-semibold text-gray-800">{company.taxId}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-gray-600 mb-1">Adres</p>
            <p className="font-semibold text-gray-800">{company.address}</p>
          </div>
        </div>
      )}
    </div>
  )
}
