import jsPDF from 'jspdf'
import { formatCurrency } from './calculations'

export const generatePDF = (
  data,
  materials,
  costs,
  totalWithMargin,
  company,
  customerInfo,
  currency
) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  })

  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 15
  let yPosition = margin

  // Başlık - Şirket Adı
  doc.setFontSize(20)
  doc.setTextColor(25, 103, 210)
  doc.text(company.name || 'PVC Pencere', margin, yPosition)
  yPosition += 12

  // Şirket Bilgileri
  doc.setFontSize(10)
  doc.setTextColor(100, 100, 100)
  if (company.address) doc.text(`Adres: ${company.address}`, margin, yPosition), (yPosition += 6)
  if (company.phone) doc.text(`Tel: ${company.phone}`, margin, yPosition), (yPosition += 6)
  if (company.email) doc.text(`Email: ${company.email}`, margin, yPosition), (yPosition += 6)
  if (company.taxId) doc.text(`VKN: ${company.taxId}`, margin, yPosition), (yPosition += 6)

  yPosition += 5

  // Tarih ve Saat
  const now = new Date()
  const dateStr = now.toLocaleDateString('tr-TR')
  const timeStr = now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
  
  doc.setFontSize(9)
  doc.setTextColor(100, 100, 100)
  doc.text(`Tarih: ${dateStr} - ${timeStr}`, margin, yPosition)
  yPosition += 8

  // Müşteri Bilgileri
  doc.setFontSize(12)
  doc.setTextColor(25, 103, 210)
  doc.text('MÜŞTERİ BİLGİLERİ', margin, yPosition)
  yPosition += 8

  doc.setFontSize(10)
  doc.setTextColor(0, 0, 0)
  if (customerInfo.name) doc.text(`Ad/Soyadı: ${customerInfo.name}`, margin, yPosition), (yPosition += 6)
  if (customerInfo.phone) doc.text(`Telefon: ${customerInfo.phone}`, margin, yPosition), (yPosition += 6)
  if (customerInfo.email) doc.text(`Email: ${customerInfo.email}`, margin, yPosition), (yPosition += 6)
  if (customerInfo.address) doc.text(`Adres: ${customerInfo.address}`, margin, yPosition), (yPosition += 6)

  yPosition += 5

  // Pencere Ölçüleri
  doc.setFontSize(12)
  doc.setTextColor(25, 103, 210)
  doc.text('PENCERE ÖLÇÜLERİ', margin, yPosition)
  yPosition += 8

  doc.setFontSize(10)
  doc.setTextColor(0, 0, 0)
  doc.text(`Genişlik: ${data.width} cm`, margin, yPosition), (yPosition += 6)
  doc.text(`Yükseklik: ${data.height} cm`, margin, yPosition), (yPosition += 6)
  doc.text(`Profil Tipi: ${data.profileType} mm`, margin, yPosition), (yPosition += 6)

  yPosition += 5

  // Malzeme Hesaplaması
  doc.setFontSize(12)
  doc.setTextColor(25, 103, 210)
  doc.text('MALZEME HESAPLAMASI', margin, yPosition)
  yPosition += 8

  doc.setFontSize(9)
  doc.setTextColor(50, 50, 50)
  const materialItems = [
    { label: 'Profil (PVC)', value: `${materials.profileLength.toFixed(2)} m` },
    { label: 'L-Profil', value: `${materials.lProfileLength.toFixed(2)} m` },
    { label: 'Cam', value: `${materials.glassArea.toFixed(2)} m²` },
    { label: 'Conta', value: `${materials.gasketLength.toFixed(2)} m` },
    { label: 'Destek Saçı', value: `${materials.supportBarLength.toFixed(2)} m` },
    { label: 'Kol', value: `${materials.handles} adet` },
    { label: 'Menteşe', value: `${materials.hinges} adet` },
    { label: 'Cam Ayağı', value: `${materials.glassStops} adet` },
  ]

  materialItems.forEach((item) => {
    doc.text(item.label, margin, yPosition)
    doc.text(item.value, pageWidth - margin - 30, yPosition)
    yPosition += 5
  })

  yPosition += 5

  // Maliyet Tablosu
  doc.setFontSize(12)
  doc.setTextColor(25, 103, 210)
  doc.text('MALİYET HESAPLAMASI', margin, yPosition)
  yPosition += 8

  // Tablo Başlıkları
  doc.setFontSize(9)
  doc.setFillColor(25, 103, 210)
  doc.setTextColor(255, 255, 255)
  doc.rect(margin, yPosition - 5, pageWidth - 2 * margin, 7, 'F')
  doc.text('Malzeme', margin + 5, yPosition)
  doc.text('Maliyet', pageWidth - margin - 30, yPosition)
  yPosition += 8

  // Tablo Satırları
  doc.setTextColor(0, 0, 0)
  doc.setFontSize(9)

  const costItems = [
    { label: 'Profil', value: costs.profile },
    { label: 'L-Profil', value: costs.lProfile },
    { label: 'Cam', value: costs.glass },
    { label: 'Conta', value: costs.gasket },
    { label: 'Destek Saçı', value: costs.supportBar },
    { label: 'Kol', value: costs.handles },
    { label: 'Menteşe', value: costs.hinges },
    { label: 'Cam Ayağı', value: costs.glassStops },
  ]

  costItems.forEach((item, idx) => {
    if (idx % 2 === 0) {
      doc.setFillColor(240, 240, 240)
      doc.rect(margin, yPosition - 5, pageWidth - 2 * margin, 6, 'F')
    }
    doc.text(item.label, margin + 5, yPosition)
    doc.text(formatCurrency(item.value, currency), pageWidth - margin - 30, yPosition)
    yPosition += 6
  })

  yPosition += 3

  // Toplam Satırları
  doc.setFontSize(10)
  doc.setFillColor(220, 230, 255)
  doc.rect(margin, yPosition - 5, pageWidth - 2 * margin, 7, 'F')
  doc.setFont(undefined, 'bold')
  doc.text('Ara Toplam', margin + 5, yPosition)
  doc.text(formatCurrency(costs.subtotal, currency), pageWidth - margin - 30, yPosition)
  yPosition += 8

  doc.setFont(undefined, 'normal')
  doc.text(`Kar Payı (${totalWithMargin.marginPercent}%)`, margin + 5, yPosition)
  doc.text(formatCurrency(totalWithMargin.margin, currency), pageWidth - margin - 30, yPosition)
  yPosition += 8

  doc.setFillColor(25, 103, 210)
  doc.setTextColor(255, 255, 255)
  doc.rect(margin, yPosition - 5, pageWidth - 2 * margin, 8, 'F')
  doc.setFont(undefined, 'bold')
  doc.setFontSize(12)
  doc.text('TOPLAM FİYAT', margin + 5, yPosition + 1)
  doc.text(formatCurrency(totalWithMargin.total, currency), pageWidth - margin - 30, yPosition + 1)

  yPosition += 12

  // Alt Not
  doc.setFontSize(8)
  doc.setTextColor(150, 150, 150)
  doc.setFont(undefined, 'italic')
  doc.text('Bu fiyat teklifi 30 gün geçerlidir. Tarafınızdan onay alındıktan sonra işleme başlanacaktır.', margin, yPosition)

  // Sayfa Numarası
  doc.setFontSize(8)
  doc.setTextColor(200, 200, 200)
  doc.text(
    `Sayfa ${doc.internal.pages.length} / ${doc.internal.pages.length}`,
    pageWidth / 2,
    pageHeight - margin + 5,
    { align: 'center' }
  )

  return doc
}

export const downloadPDF = (doc, customerName = 'teklif') => {
  const filename = `PVC_Pencere_${customerName}_${new Date().getTime()}.pdf`
  doc.save(filename)
}

export const sharePDFLink = async (doc, customerInfo) => {
  // Base64 formatında PDF oluştur
  const pdfBase64 = btoa(doc.output())
  const shareData = {
    title: 'PVC Pencere Fiyat Teklifi',
    text: `${customerInfo.name} için fiyat teklifi`,
    url: `data:application/pdf;base64,${pdfBase64}`,
  }

  if (navigator.share) {
    try {
      await navigator.share(shareData)
    } catch (err) {
      console.log('Hata:', err)
    }
  }
}
