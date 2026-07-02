import { create } from 'zustand'

export const useStore = create((set) => ({
  // Ölçümler
  width: 100,
  height: 150,
  profileType: 70, // 70, 76, 80
  
  setMeasurements: (width, height, profileType) =>
    set({ width, height, profileType }),

  // Fiyatlar (metre/m2 fiyatları)
  prices: {
    profile: 0, // mm profil fiyatı (metre)
    lProfile: 0, // L profili fiyatı (metre)
    glass: 0, // cam fiyatı (m2)
    handle: 0, // kol fiyatı (adet)
    hinge: 0, // menteşe fiyatı (adet)
    gasket: 0, // conta fiyatı (metre)
    supportBar: 0, // destek saçı fiyatı (metre)
    glassStop: 0, // cam ayağı fiyatı (adet)
  },

  setPrices: (prices) =>
    set({ prices }),

  updatePrice: (key, value) =>
    set((state) => ({
      prices: { ...state.prices, [key]: parseFloat(value) || 0 }
    })),

  // Şirket Bilgileri
  company: {
    name: 'Şirket Adı',
    address: 'Adres',
    phone: 'Telefon',
    email: 'Email',
    taxId: 'VKN',
    logo: '',
  },

  setCompany: (company) =>
    set({ company }),

  // Para Birimi
  currency: 'TRY',
  setCurrency: (currency) => set({ currency }),

  // Kur
  exchangeRate: 1,
  setExchangeRate: (rate) => set({ exchangeRate: parseFloat(rate) || 1 }),
}))
