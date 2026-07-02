import React, { useEffect, useRef } from 'react'
import { useStore } from '../store/useStore'

export const DrawingCanvas = () => {
  const canvasRef = useRef(null)
  const { width, height, profileType } = useStore()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const canvasWidth = canvas.width
    const canvasHeight = canvas.height

    // Arka plan
    ctx.fillStyle = '#f8f9fa'
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)

    // Pencere ölçülerini canvas'a sığdır
    const scale = Math.min(
      (canvasWidth - 60) / (width || 1),
      (canvasHeight - 60) / (height || 1),
      2
    )

    const x = (canvasWidth - width * scale) / 2
    const y = (canvasHeight - height * scale) / 2

    // Dış kasa (Profil) - Kalın çizgi
    const frameWidth = 8 * (profileType / 70) // Profil tipi ile ölçekle
    ctx.strokeStyle = '#1f2937'
    ctx.lineWidth = frameWidth
    ctx.strokeRect(x, y, width * scale, height * scale)

    // İç L-profili - İnce çizgi
    ctx.strokeStyle = '#6b7280'
    ctx.lineWidth = 2
    ctx.strokeRect(x + frameWidth / 2, y + frameWidth / 2, 
                   width * scale - frameWidth, height * scale - frameWidth)

    // Cam - Şeffaf alan
    ctx.fillStyle = 'rgba(200, 220, 240, 0.3)'
    ctx.fillRect(x + frameWidth / 2, y + frameWidth / 2, 
                 width * scale - frameWidth, height * scale - frameWidth)

    // Dikey destek saçı (ortada)
    const supportX = x + (width * scale) / 2
    ctx.strokeStyle = '#9ca3af'
    ctx.lineWidth = 2
    ctx.setLineDash([4, 4])
    ctx.beginPath()
    ctx.moveTo(supportX, y + frameWidth / 2)
    ctx.lineTo(supportX, y + height * scale - frameWidth / 2)
    ctx.stroke()
    ctx.setLineDash([])

    // Menteşe simgeleri (sol taraf)
    ctx.fillStyle = '#ef4444'
    ctx.fillRect(x + 5, y + 15, 5, 5) // Üst menteşe
    ctx.fillRect(x + 5, y + height * scale - 20, 5, 5) // Alt menteşe

    // Kol simgesi (sağ taraf)
    ctx.fillStyle = '#3b82f6'
    ctx.beginPath()
    ctx.arc(x + width * scale - 10, y + height * scale / 2, 4, 0, Math.PI * 2)
    ctx.fill()

    // Ölçü yazıları
    ctx.fillStyle = '#374151'
    ctx.font = 'bold 14px Arial'
    ctx.textAlign = 'center'

    // Genişlik ölçüsü
    ctx.fillText(`${width} cm`, x + (width * scale) / 2, y - 10)

    // Yükseklik ölçüsü
    ctx.save()
    ctx.translate(x - 20, y + (height * scale) / 2)
    ctx.rotate(-Math.PI / 2)
    ctx.fillText(`${height} cm`, 0, 0)
    ctx.restore()

    // Profil tipi yazısı
    ctx.font = '12px Arial'
    ctx.fillStyle = '#6b7280'
    ctx.fillText(`Profil: ${profileType}mm`, x + (width * scale) / 2, y + height * scale + 25)

  }, [width, height, profileType])

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Pencere Çizimi</h2>
      <div className="flex justify-center bg-gray-100 rounded-lg p-4">
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="border-2 border-gray-300 rounded bg-white"
        />
      </div>
      <div className="mt-4 grid grid-cols-4 gap-2 text-xs text-gray-600">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-gray-900 rounded mr-2"></div>
          <span>Kasa</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 border-2 border-gray-500 rounded mr-2"></div>
          <span>L-Profil</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-1 bg-red-500 mr-2"></div>
          <span>Menteşe</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-1 bg-blue-500 mr-2"></div>
          <span>Kol</span>
        </div>
      </div>
    </div>
  )
}
