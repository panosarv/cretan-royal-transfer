<script setup>
import { ref, computed, onMounted } from 'vue';
import emailjs from '@emailjs/browser';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const companyPhone = '+306973857378'; // Change to your business number
const companyEmail = 'cretanroyaltransfer@gmail.com'; // Change to your company email

const services = ref([
  'Transportation','Airport Transfer - Chania', 'Airport Transfer - Heraklion', 'Knossos Tour', 'Preveli Tour',
  'Arkadi Tour', 'Kalypso - Plaka Tour', 'Elafonisi Tour', 'Balos Tour', 'Kournas Lake',
  'Samaria Tour', 'Chania Old Town', 'Matala Tour', 'Heraklion Tour', 'Seitan Harbor','Phalasarna Tour','Other'
]);

const name = ref('');
const surname = ref('');
const email = ref('');
const phone = ref('');
const selectedDate = ref('');
const selectedService = ref('');
const guests = ref(1);
const location = ref('');
const additionalInfo = ref('');

const isFormValid = computed(() => {
  return location.value && name.value && surname.value && email.value && phone.value && selectedDate.value && selectedService.value && guests.value > 0;
});

const submitBooking = async () => {
  try {
    const templateParams = {
      location: location.value,
      to_email: companyEmail,
      from_name: `${name.value} ${surname.value}`,
      guest_email: email.value,
      guest_phone: phone.value,
      booking_date: selectedDate.value,
      service: selectedService.value,
      guests: guests.value,
      additionalInfo: additionalInfo.value,
    };

    await emailjs.send(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      templateParams,
      'YOUR_PUBLIC_KEY'
    );

    alert('Booking request sent successfully! We will contact you shortly.');
    resetForm();
  } catch (error) {
    console.error('Error sending booking request:', error);
    alert('There was an error sending your request. Please try again.');
  }
};

const resetForm = () => {
  name.value = '';
  surname.value = '';
  email.value = '';
  phone.value = '';
  selectedDate.value = '';
  selectedService.value = '';
  guests.value = 1;
  location.value = '';
  additionalInfo.value = '';
};

const openWhatsApp = () => {
  const message = `Hello, I would like to book a ${selectedService.value} on ${selectedDate.value} for ${guests.value} people. My name is ${name.value} ${surname.value}. My pickup location is ${location.value}.`;
  window.open(`https://wa.me/${companyPhone}?text=${encodeURIComponent(message)}`, '_blank');
};
</script>

<template>
 
  <div class="max-w-2xl mx-auto p-10 bg-white rounded-lg shadow-xl border border-gray-200">
    <form action="https://formsubmit.co/cretanroyaltransfer@gmail.com" method="POST" class="space-y-6">
      <input type="hidden" name="_subject" value="New Transfer Booking">
      <input type="hidden" name="_captcha" value="false">
      <input type="hidden" name="_autoresponse" value="Thank you for your booking request. We will contact you shortly.">
      <input type="hidden" name="_template" value="table">
      <input type="hidden" name="_replyto" value="{{ email }}">

    <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">{{ t('message.booking_form_title') }}</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label class="block text-sm font-medium text-gray-700">{{ t('message.first_name') }}</label>
        <input v-model="name" name="name" type="text" required class="mt-2 block w-full p-3 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">{{ t('message.surname') }}</label>
        <input v-model="surname" name="surname" type="text" required class="mt-2 block w-full p-3 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">{{ t('message.email') }}</label>
        <input v-model="email" name="email" type="email" required class="mt-2 block w-full p-3 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">{{ t('message.phone') }}</label>
        <input v-model="phone" name="phone" type="tel" required class="mt-2 block w-full p-3 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">{{ t('message.date') }}</label>
        <input v-model="selectedDate" name="date" type="date" required class="mt-2 block w-full p-3 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">{{ t('message.pickup_location') }}</label>
        <input v-model="location" name="pickup location" type="text" required class="mt-2 block w-full p-3 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">{{ t('message.select_service') }}</label>
        <select v-model="selectedService" name="service" required class="mt-2 block w-full p-3 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
          <option value="">{{ t('message.choose_service') }}</option>
          <option v-for="service in services" :key="service" :value="service">{{ service }}</option>
        </select>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">{{ t('message.number_of_guests') }}</label>
        <input v-model="guests" name="number of people" type="number" min="1" required class="mt-2 block w-full p-3 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
      </div>
      <div class="md:col-span-2">
         <label class="block text-sm font-medium text-gray-700" for="additionalInfo">
           {{ t('message.additional_information') }}
         </label>
         <textarea
           v-model="additionalInfo"
           name="additionalInfo"
           id="additionalInfo"
           rows="4"
           :placeholder="t('message.additional_information_placeholder')"
           class="mt-2 block w-full p-3 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
         ></textarea>
       </div>
    </div>

    <div class="mt-6 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
      <button type="submit" :disabled="!isFormValid" class="w-full md:w-1/2 bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition">{{ t('message.send_email') }}</button>
      <button @click="openWhatsApp" class="w-full md:w-1/2 bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition">{{ t('message.message_on_whatsapp') }}</button>
      <a :href="`tel:${companyPhone}`" class="w-full md:w-1/2 bg-yellow-500 text-white py-3 px-4 rounded-md hover:bg-yellow-600 text-center transition">{{ t('message.call_now') }}</a>
    </div>
  </form>
  </div>
</template>
