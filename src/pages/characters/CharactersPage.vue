<script setup lang="ts">
import { onMounted } from 'vue'
import { useCharacters } from '../../features/character/lib/hooks/useCharacters'
import CharacterFilters from '../../features/character/ui/CharacterFilter.vue'
import CharacterGrid from '../../features/character/ui/CharacterGrid.vue'
import CharacterPagination from '../../features/character/ui/CharacterPagination.vue'

const {
  loading,
  filteredCharacters,
  charactersOnPage,
  page,
  totalPages,
  goToPage,
  createParticles
} = useCharacters()

onMounted(() => {
  createParticles()
})
</script>

<template>
  <div class="min-h-screen bg-gray-900 overflow-x-hidden font-mono">
    <!-- Анимированные частицы фона -->
    <div id="particles-container" class="fixed inset-0 pointer-events-none"></div>

    <div class="relative z-10 container mx-auto px-4 py-8">
      <!-- Хедер с научными схемами -->
      <header class="text-center mb-12 relative">
        <div class="portal-glow w-64 h-64 mx-auto rounded-full absolute inset-x-0 -top-20 opacity-30"></div>

        <h1
          class="text-5xl md:text-6xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400 neon-text mb-4">
          RICK & MORTY
        </h1>
        <p class="text-gray-400 text-lg font-mono">
          MULTIVERSAL CHARACTER DATABASE // DIMENSION C-137
        </p>

        <!-- Статус бар -->
        <div class="flex justify-center items-center gap-6 mt-6 text-sm text-gray-400">
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>DATABASE: ONLINE</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 bg-cyan-500 rounded-full"></div>
            <span>{{ filteredCharacters.length }} CHARACTERS LOADED</span>
          </div>
        </div>
      </header>

      <CharacterFilters />

      <CharacterGrid :characters="charactersOnPage" :loading="loading" />

      <CharacterPagination :page="page" :total-pages="totalPages" :total-characters="filteredCharacters.length"
        @page-change="goToPage" />
    </div>
  </div>
</template>

<style scoped>
</style>