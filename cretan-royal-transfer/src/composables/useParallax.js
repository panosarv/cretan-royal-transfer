import { ref, onMounted, onUnmounted } from 'vue'

export function useParallax(speed = 0.3) {
  const offsetY = ref(0)

  const onScroll = () => {
    offsetY.value = window.scrollY * speed
  }

  onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
  onUnmounted(() => window.removeEventListener('scroll', onScroll))

  return { offsetY }
}
