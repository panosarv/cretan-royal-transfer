import { defineStore } from 'pinia'

export const useBookingStore = defineStore('booking', {
  state: () => ({
    step: 1,
    type: null,

    pickup: '',
    dropoff: '',
    pickupDetails: '',
    dropoffDetails: '',

    passengers: 1,
    luggage: 0,
    babySeats: 0,
    boosterSeats: 0,

    date: '',
    time: '',

    selectedTour: null,
    customTour: '',

    name: '',
    surname: '',
    email: '',
    phone: '',
    idNumber: '',
    additionalInfo: '',

    price: null
  }),

  getters: {
    hasPrice: (state) => state.price !== null
  },

  actions: {
    nextStep() { this.step++ },
    prevStep() { this.step-- },

    setType(type) { this.type = type },

    calculatePrice() {
      if (this.type === 'tour') {
        this.price = null
        return
      }

      const normalize = (loc) => {
        if (!loc) return null
        if (loc.includes('Heraklion')) return 'HERAKLION'
        if (loc.includes('Chania')) return 'CHANIA'
        if (loc.includes('Gerani')) return 'GERANI_RETH'
        return loc.toUpperCase()
      }

      const PRICING = {
        HERAKLION: {
          RETHYMNO:     { upTo4: 87,  upTo8: 134, upTo14: 170 },
          BALI:         { upTo4: 68,  upTo8: 87,  upTo14: 130 },
          PANORMO:      { upTo4: 82,  upTo8: 115, upTo14: 150 },
          GERANI_RETH:  { upTo4: 95,  upTo8: 130, upTo14: 190 },
          KAVROS:       { upTo4: 110, upTo8: 147, upTo14: 205 },
          GEORGIOUPOLI: { upTo4: 115, upTo8: 152, upTo14: 210 },
          CHANIA:       { upTo4: 165, upTo8: 225, upTo14: 280 },
          PLAKIAS:      { upTo4: 125, upTo8: 155, upTo14: 220 },
          SFAKIA:       { upTo4: 150, upTo8: 192, upTo14: 265 }
        },
        CHANIA: {
          RETHYMNO:     { upTo4: 87,  upTo8: 134, upTo14: 170 },
          BALI:         { upTo4: 115, upTo8: 148, upTo14: 220 },
          PANORMO:      { upTo4: 105, upTo8: 139, upTo14: 185 },
          GERANI_RETH:  { upTo4: 82,  upTo8: 120, upTo14: 160 },
          KAVROS:       { upTo4: 70,  upTo8: 92,  upTo14: 135 },
          GEORGIOUPOLI: { upTo4: 70,  upTo8: 92,  upTo14: 135 },
          HERAKLION:    { upTo4: 165, upTo8: 225, upTo14: 280 },
          PLAKIAS:      { upTo4: 119, upTo8: 149, upTo14: 220 },
          SFAKIA:       { upTo4: 130, upTo8: 162, upTo14: 235 }
        }
      }

      const from = normalize(this.pickup)
      const to = normalize(this.dropoff)

      const route = PRICING[from]?.[to] || PRICING[to]?.[from]

      if (!route) {
        this.price = null
        return
      }

      if (this.passengers <= 4) this.price = route.upTo4
      else if (this.passengers <= 8) this.price = route.upTo8
      else if (this.passengers <= 14) this.price = route.upTo14
      else this.price = null
    }
  }
})
