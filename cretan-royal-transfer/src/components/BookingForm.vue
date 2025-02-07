<script setup>
import { ref, computed } from 'vue';
import { format, addDays, parseISO } from 'date-fns';
import emailjs from '@emailjs/browser';

const availableTimeSlots = [
  '09:00', '11:00', '13:00', '15:00'
];

const safariExperiences = [
  'Mountain Safari', 'Coastal Safari', 'Village Safari'
];

const name = ref('');
const email = ref('');
const phone = ref('');
const selectedDate = ref('');
const selectedTime = ref('');
const selectedExperience = ref('');
const guests = ref(1);

const nextWeekDates = computed(() => {
  const dates = [];
  const today = new Date();
  for (let i = 1; i <= 7; i++) {
    const date = addDays(today, i);
    dates.push({
      date: format(date, 'yyyy-MM-dd'),
      formatted: format(date, 'MMM dd, yyyy')
    });
  }
  return dates;
});

const isFormValid = computed(() => {
  return name.value && 
         email.value && 
         phone.value && 
         selectedDate.value && 
         selectedTime.value && 
         selectedExperience.value && 
         guests.value > 0;
});

const submitBooking = async () => {
  try {
    const templateParams = {
      to_name: 'Safari Owner',
      from_name: name.value,
      guest_email: email.value,
      guest_phone: phone.value,
      booking_date: format(parseISO(selectedDate.value), 'MMMM dd, yyyy'),
      booking_time: selectedTime.value,
      safari_experience: selectedExperience.value,
      guests: guests.value
    };

    // Replace these with your EmailJS credentials
    await emailjs.send(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      templateParams,
      'YOUR_PUBLIC_KEY'
    );

    alert('Booking submitted successfully! We will contact you shortly.');
    resetForm();
  } catch (error) {
    console.error('Error submitting booking:', error);
    alert('There was an error submitting your booking. Please try again.');
  }
};

const resetForm = () => {
  name.value = '';
  email.value = '';
  phone.value = '';
  selectedDate.value = '';
  selectedTime.value = '';
  selectedExperience.value = '';
  guests.value = 1;
};
</script>

<template>
  <div class="max-w-2xl mx-auto p-10 bg-gradient-to-r from-yellow-600 to-amber-500 rounded-lg shadow-xl border border-amber-700">
    <form @submit.prevent="submitBooking" class="space-y-6">
      <div class="grid grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-white">Name</label>
          <input 
            type="text" 
            v-model="name"
            required
            class="mt-2 block w-full p-3 rounded-md border border-amber-300 shadow-sm focus:border-yellow-400 focus:ring-yellow-400 bg-white text-gray-900"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-white">Email</label>
          <input 
            type="email" 
            v-model="email"
            required
            class="mt-2 block w-full p-3 rounded-md border border-amber-300 shadow-sm focus:border-yellow-400 focus:ring-yellow-400 bg-white text-gray-900"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-white">Phone (WhatsApp)</label>
          <input 
            type="tel" 
            v-model="phone"
            required
            class="mt-2 block w-full p-3 rounded-md border border-amber-300 shadow-sm focus:border-yellow-400 focus:ring-yellow-400 bg-white text-gray-900"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-white">Date</label>
          <select 
            v-model="selectedDate"
            required
            class="mt-2 block w-full p-3 rounded-md border border-amber-300 shadow-sm focus:border-yellow-400 focus:ring-yellow-400 bg-white text-gray-900"
          >
            <option value="">Select a date</option>
            <option 
              v-for="date in nextWeekDates" 
              :key="date.date" 
              :value="date.date"
            >
              {{ date.formatted }}
            </option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-white">Time</label>
          <select 
            v-model="selectedTime"
            required
            class="mt-2 block w-full p-3 rounded-md border border-amber-300 shadow-sm focus:border-yellow-400 focus:ring-yellow-400 bg-white text-gray-900"
          >
            <option value="">Select a time</option>
            <option 
              v-for="time in availableTimeSlots" 
              :key="time" 
              :value="time"
            >
              {{ time }}
            </option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-white">Safari Experience</label>
          <select 
            v-model="selectedExperience"
            required
            class="mt-2 block w-full p-3 rounded-md border border-amber-300 shadow-sm focus:border-yellow-400 focus:ring-yellow-400 bg-white text-gray-900"
          >
            <option value="">Select an experience</option>
            <option 
              v-for="experience in safariExperiences" 
              :key="experience" 
              :value="experience"
            >
              {{ experience }}
            </option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-white">Number of Guests</label>
          <input 
            type="number" 
            v-model="guests"
            min="1"
            max="10"
            required
            class="mt-2 block w-full p-3 rounded-md border border-amber-300 shadow-sm focus:border-yellow-400 focus:ring-yellow-400 bg-white text-gray-900"
          />
        </div>
      </div>
      
      <button 
        type="submit"
        :disabled="!isFormValid"
        class="w-full bg-yellow-700 text-white py-3 px-4 rounded-md hover:bg-yellow-800 disabled:bg-stone-400 disabled:cursor-not-allowed transition-colors shadow-lg"
      >
        Book Safari
      </button>
    </form>
  </div>

</template>
