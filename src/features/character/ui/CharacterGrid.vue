<script setup lang="ts">
import type { Character } from '../../../entities/character/model/types'
import CharacterCard from '../../../entities/character/ui/CharacterCard.vue'

interface Props {
  characters: Character[]
  loading: boolean
}

defineProps<Props>()
</script>

<template>
  <!-- Loader -->
  <div v-if="loading" class="flex justify-center items-center py-16">
    <div class="flex flex-col items-center gap-4">
      <span class="loading loading-spinner loading-lg text-green-400"></span>
      <p class="text-gray-400 font-mono">LOADING CHARACTERS FROM THE MULTIVERSE...</p>
    </div>
  </div>

  <!-- Основная сетка карточек -->
  <div v-if="!loading" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
    <CharacterCard v-for="(character, index) in characters" :key="character.id" :character="character" :index="index" />
  </div>
</template>