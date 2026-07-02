import React from 'react'
import { MeasurementInput } from './components/MeasurementInput'
import { DrawingCanvas } from './components/DrawingCanvas'
import { PriceManager } from './components/PriceManager'
import { Calculator } from './components/Calculator'
import { CompanySettings } from './components/CompanySettings'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">PVC Pencere Hesaplama Sistemi</h1>
          <p className="text-blue-100">Ölçü gir, fiyat hesapla, müşteriye teklif gönder</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6 space-y-6 pb-12">
        {/* Üst Bölüm - Ölçü ve Çizim */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MeasurementInput />
          <DrawingCanvas />
        </div>

        {/* Orta Bölüm - Şirket Bilgileri ve Fiyatlar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CompanySettings />
          <PriceManager />
        </div>

        {/* Alt Bölüm - Hesaplama ve Çıktı */}
        <Calculator />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 p-4 text-center mt-12">
        <p>© 2024 PVC Pencere Hesaplama Sistemi - Tüm hakları saklıdır.</p>
      </footer>
    </div>
  )
}

export default App
