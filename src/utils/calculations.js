/**
 * PVC Pencere Hesaplama Fonksiyonları
 */

export const calculateMaterials = (width, height, profileType) => {
  // width ve height cm cinsinden gelir, m'ye çevir
  const w = width / 100; // cm -> m
  const h = height / 100; // cm -> m

  // Profil uzunluğu (kasa): 2 genişlik + 2 yükseklik
  const profileLength = (2 * w) + (2 * h);

  // L-profili uzunluğu (çerçeve): 2 genişlik + 2 yükseklik
  const lProfileLength = (2 * w) + (2 * h);

  // Cam alanı (m²)
  const glassArea = w * h;

  // Conta uzunluğu (cam etrafı): 2 genişlik + 2 yükseklik
  const gasketLength = (2 * w) + (2 * h);

  // Destek saçı (yüksekliğe bağlı, orta kısım)
  // Teorik olarak: 2 × yükseklik (dikey destek)
  const supportBarLength = 2 * h;

  // Sabit aksesuarlar
  const handles = 1; // 1 adet kol
  const hinges = 2; // 2 adet menteşe (üst-alt)
  const glassStops = 4; // 4 adet cam ayağı (köşelerde)

  return {
    profileLength: parseFloat(profileLength.toFixed(3)),
    lProfileLength: parseFloat(lProfileLength.toFixed(3)),
    glassArea: parseFloat(glassArea.toFixed(3)),
    gasketLength: parseFloat(gasketLength.toFixed(3)),
    supportBarLength: parseFloat(supportBarLength.toFixed(3)),
    handles,
    hinges,
    glassStops,
  }
}

export const calculateCosts = (materials, prices, exchangeRate = 1) => {
  const costs = {
    profile: materials.profileLength * prices.profile * exchangeRate,
    lProfile: materials.lProfileLength * prices.lProfile * exchangeRate,
    glass: materials.glassArea * prices.glass * exchangeRate,
    gasket: materials.gasketLength * prices.gasket * exchangeRate,
    supportBar: materials.supportBarLength * prices.supportBar * exchangeRate,
    handles: materials.handles * prices.handle * exchangeRate,
    hinges: materials.hinges * prices.hinge * exchangeRate,
    glassStops: materials.glassStops * prices.glassStop * exchangeRate,
  }

  const subtotal = Object.values(costs).reduce((sum, cost) => sum + cost, 0)

  return {
    ...costs,
    subtotal: parseFloat(subtotal.toFixed(2)),
  }
}

export const calculateWithMargin = (subtotal, marginPercent = 20) => {
  const margin = subtotal * (marginPercent / 100)
  const total = subtotal + margin

  return {
    subtotal: parseFloat(subtotal.toFixed(2)),
    margin: parseFloat(margin.toFixed(2)),
    marginPercent,
    total: parseFloat(total.toFixed(2)),
  }
}

export const formatCurrency = (value, currency = 'TRY') => {
  const currencySymbols = {
    TRY: '₺',
    USD: '$',
    EUR: '€',
    GBP: '£',
  }

  const symbol = currencySymbols[currency] || currency
  return `${parseFloat(value).toFixed(2)} ${symbol}`
}
