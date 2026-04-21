<script setup>
import { ref, watch, nextTick, onUnmounted } from 'vue'
import L from 'leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

// Fix Leaflet default icon paths broken by Vite
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

const props = defineProps({
  label: { type: String, required: true },
  text: { type: String, default: '' },
  latlng: { type: Object, default: null }
})

const emit = defineEmits(['update:text', 'update:latlng'])

const mode = ref('text')
const mapContainer = ref(null)
let map = null
let marker = null

const initMap = () => {
  if (map) return
  map = L.map(mapContainer.value).setView([35.2401, 24.8093], 8)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map)

  if (props.latlng) {
    marker = L.marker([props.latlng.lat, props.latlng.lng]).addTo(map)
    map.setView([props.latlng.lat, props.latlng.lng], 13)
  }

  map.on('click', (e) => {
    const lat = parseFloat(e.latlng.lat.toFixed(6))
    const lng = parseFloat(e.latlng.lng.toFixed(6))
    if (marker) {
      marker.setLatLng([lat, lng])
    } else {
      marker = L.marker([lat, lng]).addTo(map)
    }
    emit('update:latlng', { lat, lng })
  })
}

const destroyMap = () => {
  if (map) {
    map.remove()
    map = null
    marker = null
  }
}

const clearPin = () => {
  if (marker) {
    marker.remove()
    marker = null
  }
  emit('update:latlng', null)
}

watch(mode, async (val) => {
  if (val === 'map') {
    await nextTick()
    initMap()
  } else {
    destroyMap()
  }
})

onUnmounted(() => destroyMap())
</script>

<template>
  <div class="space-y-3">
    <p class="text-sm font-semibold text-stone-300">{{ label }}</p>

    <!-- Toggle pills -->
    <div class="flex rounded-lg overflow-hidden border border-stone-600 w-fit">
      <button
        type="button"
        @click="mode = 'text'"
        class="px-4 py-2 text-sm font-medium transition-colors"
        :class="mode === 'text'
          ? 'bg-[#D8A444] text-stone-900'
          : 'bg-stone-800 text-stone-400 hover:text-stone-200'"
      >
        Type address
      </button>
      <button
        type="button"
        @click="mode = 'map'"
        class="px-4 py-2 text-sm font-medium transition-colors"
        :class="mode === 'map'
          ? 'bg-[#D8A444] text-stone-900'
          : 'bg-stone-800 text-stone-400 hover:text-stone-200'"
      >
        Pin on map
      </button>
    </div>

    <!-- Text mode -->
    <div v-if="mode === 'text'">
      <input
        :value="text"
        @input="emit('update:text', $event.target.value)"
        type="text"
        placeholder="Hotel name, address, or landmark…"
        class="w-full p-3 rounded-lg bg-stone-800 border border-stone-600 text-stone-100 placeholder-stone-500 focus:border-[#D8A444] focus:outline-none"
      />
    </div>

    <!-- Map mode -->
    <div v-if="mode === 'map'" class="space-y-2">
      <div
        ref="mapContainer"
        class="w-full h-[300px] rounded-xl overflow-hidden border border-stone-600"
      />
      <div v-if="latlng" class="flex items-center justify-between text-xs text-stone-400">
        <span>{{ latlng.lat.toFixed(4) }}° N, {{ latlng.lng.toFixed(4) }}° E</span>
        <button
          type="button"
          @click="clearPin"
          class="text-[#D8A444] hover:underline"
        >
          Clear pin
        </button>
      </div>
      <p v-else class="text-xs text-stone-500">Click anywhere on the map to drop a pin</p>
    </div>
  </div>
</template>

<style>
@import 'leaflet/dist/leaflet.css';
</style>
