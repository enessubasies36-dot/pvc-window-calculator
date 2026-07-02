import React, { useState } from 'react'
import { useStore } from '../store/useStore'
import { calculateMaterials, calculateCosts, calculateWithMargin, formatCurrency } from '../utils/calculations'
import { Download, Link as LinkIcon } from 'lucide-react'
import { generatePDF, downloadPDF } from '../utils/pdfGenerator'

export const Calculator = () => {
  const { width, height, profileType, prices, currency, exchangeRate, company } = useStore()
  const [marginPercent, setMarginPercent] = useState(20)
  const [showCustomerForm, setShowCustomerForm] = useState(false)
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
  })

  // Hesaplamalar
  const materials = calculateMaterials(width, height, profileType)
  const costs = calculateCosts(materials, prices, exchangeRate)
  const totalWithMargin = calculateWithMargin(costs.subtotal, marginPercent)

  // Form değişiklikleri
  const handleCustomerChange = (field, value) => {
    setCustomerInfo((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // PDF İndir
  const handleDownloadPDF = () => {
    const doc = generatePDF(
      { width, height, profileType },
      materials,
      costs,
      totalWithMargin,
      company,
      customerInfo,
      currency
    )
    downloadPDF(doc, customerInfo.name || 'teklif')
  }

  // PDF Linki Oluştur ve Kopyala
  const handleGenerateLink = () => {
    const doc = generatePDF(
      { width, height, profileType },
      materials,
      costs,
      totalWithMargin,
      company,
      customerInfo,
      currency
    )
    const pdfBase64 = doc.output('datauristring')
    const dataURL = pdfBase64.replace('data:application/pdf;base64,', '')
    
    // Link oluştur ve kopyala
    const link = `${window.location.origin}?pdf=${dataURL}`
    navigator.clipboard.writeText(link)
    alert('Link panoya kopyalandı!')
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Hesaplama & Fiyatlandırma</h2>

      {/* Kar Payı */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Kar Payı Yüzdesi (%)
        </label>
        <div className="flex items-center gap-4">
          <input
            type="number"
            value={marginPercent}
            onChange={(e) => setMarginPercent(Math.max(0, parseInt(e.target.value) || 0))}
            min="0"
            max="100"
            step="5"
            className="w-20 px-3 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-600"
          />
          <input
            type="range"
            value={marginPercent}
            onChange={(e) => setMarginPercent(parseInt(e.target.value))}
            min="0"
            max="100"
            step="5"
            className="flex-1 h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>

      {/* Malzeme Özeti */}
      <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
          <p className="text-xs text-gray-600 mb-1">Profil</p>
          <p className="text-lg font-bold text-gray-800">{materials.profileLength.toFixed(2)} m</p>
        </div>
        <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
          <p className="text-xs text-gray-600 mb-1">Cam</p>
          <p className="text-lg font-bold text-gray-800">{materials.glassArea.toFixed(2)} m²</p>
        </div>
        <div className="p-3 bg-purple-50 rounded-lg border-l-4 border-purple-500">
          <p className="text-xs text-gray-600 mb-1">Conta</p>
          <p className="text-lg font-bold text-gray-800">{materials.gasketLength.toFixed(2)} m</p>
        </div>
        <div className="p-3 bg-orange-50 rounded-lg border-l-4 border-orange-500">
          <p className="text-xs text-gray-600 mb-1">Destek Saçı</p>
          <p className="text-lg font-bold text-gray-800">{materials.supportBarLength.toFixed(2)} m</p>
        </div>
      </div>

      {/* Maliyet Tablosu */}
      <div className="mb-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 border-b-2 border-gray-300">
            <tr>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">Malzeme</th>
              <th className="px-4 py-2 text-right font-semibold text-gray-700">Miktar</th>
              <th className="px-4 py-2 text-right font-semibold text-gray-700">Birim Fiyat</th>
              <th className="px-4 py-2 text-right font-semibold text-gray-700">Toplam</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-200 hover:bg-gray-50">
              <td className="px-4 py-2">PVC Profil</td>
              <td className="px-4 py-2 text-right">{materials.profileLength.toFixed(2)} m</td>
              <td className="px-4 py-2 text-right">{formatCurrency(prices.profile, currency)}</td>
              <td className="px-4 py-2 text-right font-semibold">{formatCurrency(costs.profile, currency)}</td>
            </tr>
            <tr className="border-b border-gray-200 hover:bg-gray-50">
              <td className="px-4 py-2">L-Profil</td>
              <td className="px-4 py-2 text-right">{materials.lProfileLength.toFixed(2)} m</td>
              <td className="px-4 py-2 text-right">{formatCurrency(prices.lProfile, currency)}</td>
              <td className="px-4 py-2 text-right font-semibold">{formatCurrency(costs.lProfile, currency)}</td>
            </tr>
            <tr className="border-b border-gray-200 hover:bg-gray-50">
              <td className="px-4 py-2">Cam</td>
              <td className="px-4 py-2 text-right">{materials.glassArea.toFixed(2)} m²</td>
              <td className="px-4 py-2 text-right">{formatCurrency(prices.glass, currency)}</td>
              <td className="px-4 py-2 text-right font-semibold">{formatCurrency(costs.glass, currency)}</td>
            </tr>
            <tr className="border-b border-gray-200 hover:bg-gray-50">
              <td className="px-4 py-2">Conta</td>
              <td className="px-4 py-2 text-right">{materials.gasketLength.toFixed(2)} m</td>
              <td className="px-4 py-2 text-right">{formatCurrency(prices.gasket, currency)}</td>
              <td className="px-4 py-2 text-right font-semibold">{formatCurrency(costs.gasket, currency)}</td>
            </tr>
            <tr className="border-b border-gray-200 hover:bg-gray-50">
              <td className="px-4 py-2">Destek Saçı</td>
              <td className="px-4 py-2 text-right">{materials.supportBarLength.toFixed(2)} m</td>
              <td className="px-4 py-2 text-right">{formatCurrency(prices.supportBar, currency)}</td>
              <td className="px-4 py-2 text-right font-semibold">{formatCurrency(costs.supportBar, currency)}</td>
            </tr>
            <tr className="border-b border-gray-200 hover:bg-gray-50">
              <td className="px-4 py-2">Kol</td>
              <td className="px-4 py-2 text-right">{materials.handles} adet</td>
              <td className="px-4 py-2 text-right">{formatCurrency(prices.handle, currency)}</td>
              <td className="px-4 py-2 text-right font-semibold">{formatCurrency(costs.handles, currency)}</td>
            </tr>
            <tr className="border-b border-gray-200 hover:bg-gray-50">
              <td className="px-4 py-2">Menteşe</td>
              <td className="px-4 py-2 text-right">{materials.hinges} adet</td>
              <td className="px-4 py-2 text-right">{formatCurrency(prices.hinge, currency)}</td>
              <td className="px-4 py-2 text-right font-semibold">{formatCurrency(costs.hinges, currency)}</td>
            </tr>
            <tr className="border-b border-gray-200 hover:bg-gray-50">
              <td className="px-4 py-2">Cam Ayağı</td>
              <td className="px-4 py-2 text-right">{materials.glassStops} adet</td>
              <td className="px-4 py-2 text-right">{formatCurrency(prices.glassStop, currency)}</td>
              <td className="px-4 py-2 text-right font-semibold">{formatCurrency(costs.glassStops, currency)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Toplam */}
      <div className="mb-6 space-y-2">
        <div className="flex justify-between text-lg">
          <span className="font-semibold text-gray-700">Ara Toplam:</span>
          <span className="font-semibold text-gray-800">{formatCurrency(totalWithMargin.subtotal, currency)}</span>
        </div>
        <div className="flex justify-between text-lg">
          <span className="font-semibold text-gray-700">Kar Payı ({marginPercent}%):</span>
          <span className="font-semibold text-gray-800">{formatCurrency(totalWithMargin.margin, currency)}</span>
        </div>
        <div className="flex justify-between text-2xl font-bold bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border-2 border-blue-500">
          <span className="text-gray-800">TOPLAM:</span>
          <span className="text-blue-600">{formatCurrency(totalWithMargin.total, currency)}</span>
        </div>
      </div>

      {/* Müşteri Bilgileri Formu */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <button
          onClick={() => setShowCustomerForm(!showCustomerForm)}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-semibold"
        >
          {showCustomerForm ? 'Formu Gizle' : 'Müşteri Bilgileri'}
        </button>

        {showCustomerForm && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Müşteri Adı"
              value={customerInfo.name}
              onChange={(e) => handleCustomerChange('name', e.target.value)}
              className="px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
            />
            <input
              type="tel"
              placeholder="Telefon"
              value={customerInfo.phone}
              onChange={(e) => handleCustomerChange('phone', e.target.value)}
              className="px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
            />
            <input
              type="email"
              placeholder="Email"
              value={customerInfo.email}
              onChange={(e) => handleCustomerChange('email', e.target.value)}
              className="px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
            />
            <input
              type="text"
              placeholder="Adres"
              value={customerInfo.address}
              onChange={(e) => handleCustomerChange('address', e.target.value)}
              className="px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
            />
          </div>
        )}
      </div>

      {/* İşlem Butonları */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={handleDownloadPDF}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition font-semibold"
        >
          <Download size={20} />
          PDF İndir
        </button>
        <button
          onClick={handleGenerateLink}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-semibold"
        >
          <LinkIcon size={20} />
          Link Oluştur
        </button>
      </div>
    </div>
  )
}
