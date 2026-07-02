# PVC Pencere Hesaplama Sistemi

PVC pencereler için ölçü girişi, malzeme hesaplaması ve otomatik fiyatlandırma yapabileceğiniz web uygulaması.

## Özellikler

✅ **Ölçü Girişi & Çizim**
- Genişlik × Yükseklik ölçülerini girin
- Canvas'ta görsel olarak çiziliyor
- Kasa, l-kasa, cam, destek saçı görüntüleniyor

✅ **Profil Seçenekleri**
- 70 mm
- 76 mm
- 80 mm

✅ **Otomatik Malzeme Hesaplaması**
- Profil: (2 × Genişlik) + (2 × Yükseklik) metre
- L-Profil: (2 × Genişlik) + (2 × Yükseklik) metre
- Cam: Genişlik × Yükseklik m²
- Conta: (2 × Genişlik) + (2 × Yükseklik) metre
- Destek Saçı: 2 × Yükseklik metre
- Aksesuarlar: Kol (1 adet), Menteşe (2 adet), Cam Ayağı (4 adet)

✅ **Fiyat Yönetimi**
- Metre/adet fiyatlarını girin
- Para birimi seçin (TRY, USD, EUR, GBP)
- Döviz kuru ayarı

✅ **Müşteri Bilgileri**
- Müşteri adı, telefon, email, adres
- PDF'ye otomatik ekleniyor

✅ **Şirket Bilgileri**
- Şirket adı, adres, telefon, email, VKN
- PDF'de müşteri bilgileriyle birlikte gösterilir
- Tarih ve saat otomatik eklenir

✅ **Kar Payı Ayarı**
- Yüzde olarak kar payı belirleyin
- Slider veya sayı giriş

✅ **PDF Rapor**
- Şirket bilgileri
- Müşteri bilgileri
- Pencere ölçüleri
- Malzeme hesaplaması
- Maliyet tablosu
- Toplam fiyat
- Tarih ve saat

✅ **Link Paylaşımı**
- PDF'yi link olarak paylaşın
- Panoya kopyalanır

## Kurulum

```bash
# Repository'yi klonla
git clone https://github.com/enessubasies36-dot/pvc-window-calculator.git
cd pvc-window-calculator

# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev

# Production build
npm run build
```

## Proje Yapısı

```
src/
├── components/
│   ├── MeasurementInput.jsx      # Ölçü girişi
│   ├── DrawingCanvas.jsx          # Pencere çizimi
│   ├── PriceManager.jsx           # Fiyat yönetimi
│   ├── Calculator.jsx             # Hesaplama & çıktı
│   └── CompanySettings.jsx        # Şirket bilgileri
├── store/
│   └── useStore.js                # Zustand state management
├── utils/
│   ├── calculations.js            # Hesaplama fonksiyonları
│   └── pdfGenerator.js            # PDF oluşturma
├── App.jsx
├── main.jsx
└── index.css
```

## Teknolojiler

- **React 18** - UI framework
- **Vite** - Build tool
- **Zustand** - State management
- **Tailwind CSS** - Styling
- **jsPDF** - PDF generation
- **html2canvas** - HTML to image
- **Lucide React** - Icons

## Kullanım

1. **Ölçüleri girin** - Genişlik, yükseklik ve profil tipi seçin
2. **Fiyatları belirleyin** - Metre/adet fiyatlarını girin
3. **Şirket bilgisi ekleyin** - Şirket adı, iletişim bilgileri vb.
4. **Müşteri bilgileri doldurun** - Müşteri adı, telefon, email, adres
5. **Kar payını ayarlayın** - Kar yüzdesini belirleyin
6. **PDF indir veya link oluştur** - Müşteriye gönderin

## Lisans

MIT

## İletişim

Sorularınız için iletişime geçin.
