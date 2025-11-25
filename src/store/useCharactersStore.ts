// stores/characters.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { charactersAPI } from '../shared/api/rickAndMorty'
import type { Character } from '../entities/character/model/types'
import type { CharacterStatus } from '../entities/character/model/types'

export const useCharactersStore = defineStore('characters', () => {
  const characters = ref<Character[]>([])            // текущие загруженные персонажи (страница или все)
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)

  const totalCount = ref<number>(0)                  // всего персонажей в API
  const totalPages = ref<number>(0)                  // всего страниц

  const searchQuery = ref('')
  const selectedStatus = ref<CharacterStatus | null>(null)
  const sortOption = ref('')

  // -----------------------------
  // Геттеры
  // -----------------------------
  const charactersCount = computed(() => characters.value.length)
  const hasCharacters = computed(() => characters.value.length > 0)
  const errorMessage = computed(() => error.value)

  const getCharacterById = (id: number) =>
    characters.value.find(c => c.id === id)

  const filteredCharacters = computed(() => {
    const query = searchQuery.value.trim().toLowerCase()
    const status = selectedStatus.value

    let result = characters.value.filter(character => {
      const matchesSearch =
        !query ||
        character.name.toLowerCase().includes(query)

      const matchesStatus = !status || character.status === status

      return matchesSearch && matchesStatus
    })

    // Сортировка
    if (sortOption.value) {
      result = [...result].sort((a, b) => {
        switch (sortOption.value) {
          case 'NAME ↑':
            return a.name.localeCompare(b.name)
          case 'NAME ↓':
            return b.name.localeCompare(a.name)
          case 'EPISODES ↑':
            return a.episode.length - b.episode.length
          case 'EPISODES ↓':
            return b.episode.length - a.episode.length
          default:
            return 0
        }
      })
    }

    return result
  })


  // -----------------------------
  // Загрузка всех персонажей (все страницы)
  // -----------------------------
  const fetchAllCharacters = async () => {
    loading.value = true
    error.value = null

    try {
      const firstPage = await charactersAPI.getCharacters(1)

      const pages = firstPage.data.info.pages
      const allResults: Character[] = [...firstPage.data.results]

      // Загружаем остальные страницы
      const requests: Promise<any>[] = []
      for (let p = 2; p <= pages; p++) {
        requests.push(charactersAPI.getCharacters(p))
      }

      const responses = await Promise.all(requests)
      responses.forEach(res => {
        allResults.push(...res.data.results)
      })

      characters.value = allResults
      totalCount.value = allResults.length
      totalPages.value = 1

    } catch (err: any) {
      console.error('Characters fetch error:', err)
      error.value =
        err?.response?.data?.error || 'Ошибка при загрузке всех персонажей'
    } finally {
      loading.value = false
    }
  }


  return {
    // state
    characters,
    loading,
    error,
    totalCount,
    searchQuery,
    selectedStatus,
    sortOption,

    // getters
    charactersCount,
    hasCharacters,
    errorMessage,
    getCharacterById,
    filteredCharacters,

    // actions
    fetchAllCharacters,
  }
})
