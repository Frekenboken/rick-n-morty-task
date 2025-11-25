import { onMounted, ref, watch, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import { useCharactersStore } from '../../../../store/useCharactersStore'
import type { Character } from '../../../../entities/character/model/types'

export function useCharacters() {
  const charactersStore = useCharactersStore()
  const { loading, filteredCharacters } = storeToRefs(charactersStore)
  const { fetchAllCharacters } = charactersStore

  const route = useRoute()
  const router = useRouter()

  function parsePage(value: unknown): number {
    const num = Number(value)
    return Number.isNaN(num) || num <= 0 ? 1 : num
  }

  const page = ref<number>(parsePage(route.query.page))

  const charactersOnPage = computed<Character[]>(() => {
    const startIndex = (page.value - 1) * 20
    const endIndex = startIndex + 20
    return filteredCharacters.value.slice(startIndex, endIndex)
  })

  const totalPages = computed(() => {
    return Math.ceil(filteredCharacters.value.length / 20)
  })

  watch(
    () => route.query.page,
    newValue => {
      page.value = parsePage(newValue)
    }
  )

  watch(
    () => charactersStore.selectedStatus,
    _ => {
      goToPage(1)
    }
  )

  watch(
    () => charactersStore.searchQuery,
    _ => {
      goToPage(1)
    }
  )

  onMounted(() => {
    fetchAllCharacters()
  })

  const goToPage = (pageNumber: number) => {
    router.replace({
      query: { page: pageNumber.toString() },
    })
  }

  const pagesList = computed(() => {
    return Array.from({ length: totalPages.value }, (_, i) => i + 1)
  })

  // Создание анимированных частиц
  const createParticles = () => {
    if (typeof document !== 'undefined') {
      const container = document.getElementById('particles-container')
      if (container) {
        for (let i = 0; i < 12; i++) {
          const particle = document.createElement('div')
          particle.className = 'particle'
          const size = Math.random() * 4 + 1
          particle.style.width = `${size}px`
          particle.style.height = `${size}px`
          particle.style.left = `${Math.random() * 100}vw`
          particle.style.animationDelay = `${Math.random() * 12}s`
          particle.style.animationDuration = `${Math.random() * 8 + 10}s`
          container.appendChild(particle)
        }
      }
    }
  }

  return {
    loading,
    filteredCharacters,
    charactersOnPage,
    page,
    totalPages,
    pagesList,
    goToPage,
    createParticles
  }
}