<script setup>
import { useBookingStore } from '@/stores/booking'

const booking = useBookingStore()
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold text-stone-100 mb-2 text-center">Your Details</h2>
    <p class="text-stone-400 text-center mb-8">Almost there — we just need your contact information</p>

    <form
      action="https://formspree.io/f/mpqkreew"
      method="POST"
      class="space-y-4"
    >
      <!-- Hidden booking data -->
      <input type="hidden" name="booking_type" :value="booking.type" />
      <input type="hidden" name="pickup" :value="booking.pickup" />
      <input type="hidden" name="pickup_details" :value="booking.pickupDetails" />
      <input type="hidden" name="dropoff" :value="booking.dropoff" />
      <input type="hidden" name="dropoff_details" :value="booking.dropoffDetails" />
      <input type="hidden" name="selected_tour" :value="booking.selectedTour" />
      <input type="hidden" name="custom_tour" :value="booking.customTour" />
      <input type="hidden" name="date" :value="booking.date" />
      <input type="hidden" name="time" :value="booking.time" />
      <input type="hidden" name="passengers" :value="booking.passengers" />
      <input type="hidden" name="luggage" :value="booking.luggage" />
      <input type="hidden" name="baby_seats" :value="booking.babySeats" />
      <input type="hidden" name="booster_seats" :value="booking.boosterSeats" />
      <input type="hidden" name="price" :value="booking.hasPrice ? `€${booking.price}` : 'To be confirmed'" />

      <!-- Precise pickup location -->
      <input type="hidden" name="pickup_address" :value="booking.pickupText" />
      <input type="hidden" name="pickup_lat" :value="booking.pickupLatLng?.lat ?? ''" />
      <input type="hidden" name="pickup_lng" :value="booking.pickupLatLng?.lng ?? ''" />

      <!-- Precise dropoff location -->
      <input type="hidden" name="dropoff_address" :value="booking.dropoffText" />
      <input type="hidden" name="dropoff_lat" :value="booking.dropoffLatLng?.lat ?? ''" />
      <input type="hidden" name="dropoff_lng" :value="booking.dropoffLatLng?.lng ?? ''" />

      <!-- Passenger IDs (comma-separated, blanks filtered out) -->
      <input type="hidden" name="passenger_ids" :value="booking.passengerIds.filter(Boolean).join(', ')" />

      <!-- Visible fields -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-stone-300 mb-1">First Name <span class="text-[#D8A444]">*</span></label>
          <input
            v-model="booking.name"
            name="name"
            type="text"
            required
            class="w-full p-3 rounded-lg bg-stone-800 border border-stone-600 text-stone-100 placeholder-stone-500 focus:border-[#D8A444] focus:outline-none"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-stone-300 mb-1">Last Name <span class="text-[#D8A444]">*</span></label>
          <input
            v-model="booking.surname"
            name="surname"
            type="text"
            required
            class="w-full p-3 rounded-lg bg-stone-800 border border-stone-600 text-stone-100 placeholder-stone-500 focus:border-[#D8A444] focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-stone-300 mb-1">Email <span class="text-[#D8A444]">*</span></label>
        <input
          v-model="booking.email"
          name="email"
          type="email"
          required
          class="w-full p-3 rounded-lg bg-stone-800 border border-stone-600 text-stone-100 placeholder-stone-500 focus:border-[#D8A444] focus:outline-none"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-stone-300 mb-1">Phone <span class="text-[#D8A444]">*</span></label>
        <input
          v-model="booking.phone"
          name="phone"
          type="tel"
          required
          class="w-full p-3 rounded-lg bg-stone-800 border border-stone-600 text-stone-100 placeholder-stone-500 focus:border-[#D8A444] focus:outline-none"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-stone-300 mb-1">Additional Information</label>
        <textarea
          v-model="booking.additionalInfo"
          name="message"
          rows="3"
          placeholder="Flight number, special requests, accessibility needs..."
          class="w-full p-3 rounded-lg bg-stone-800 border border-stone-600 text-stone-100 placeholder-stone-500 focus:border-[#D8A444] focus:outline-none resize-none"
        ></textarea>
      </div>

      <div class="flex justify-between pt-2">
        <button
          type="button"
          @click="booking.prevStep()"
          class="px-6 py-3 rounded-lg font-semibold text-stone-300 border border-stone-600 hover:border-stone-400 transition-all"
        >
          ← Back
        </button>
        <button
          type="submit"
          class="px-8 py-3 rounded-lg font-semibold bg-[#D8A444] text-stone-900 hover:bg-[#B4952E] transition-all"
        >
          Submit Booking
        </button>
      </div>
    </form>
  </div>
</template>
