<script setup lang="ts">
import type { Character } from '../model/types'
import { Dna, Activity, MapPin, Film } from 'lucide-vue-next';

interface Props {
  character: Character
  index: number
}

defineProps<Props>()
</script>

<template>
  <div
    class="card-hologram rounded-2xl overflow-hidden group hover:scale-[1.02] transition-all duration-500 floating-subtle"
    :style="`animation-delay: -${index * 2}s`">
    <div class="relative overflow-hidden">
      <div class="absolute top-4 left-4 z-10">
        <div class="badge badge-lg font-mono gap-1" :class="{
          'badge-success': character.status === 'Alive',
          'badge-error': character.status === 'Dead',
          'badge-warning': character.status === 'unknown'
        }">
          <div class="w-2 h-2 mr-1 bg-gray-300 rounded-full" :class="{ 'animate-pulse': character.status === 'Alive' }">
          </div>
          {{ character.status.toUpperCase() }}
        </div>
      </div>

      <img :src="character.image" :alt="character.name"
        class="w-full h-58 object-cover group-hover:scale-105 transition-transform duration-500" />

      <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
    </div>

    <div class="card-body p-5">
      <h3 class="card-title text-green-400 font-orbitron text-lg mb-3 tracking-wide line-clamp-1">
        {{ character.name.toUpperCase() }}
      </h3>

      <div class="space-y-4">
        <!-- Вид -->
        <div class="flex items-center gap-3">
          <Dna class="text-cyan-300" :size="16"></Dna>
          <div class="flex items-baseline gap-2 flex-1 min-w-0">
            <span class="info-label whitespace-nowrap">Species:</span>
            <span class="text-cyan-100 truncate">{{ character.species }}</span>
          </div>
        </div>

        <!-- Статус -->
        <div class="flex items-center gap-3">
          <Activity class="text-green-300" :size="16"></Activity>
          <div class="flex items-baseline gap-2 flex-1 min-w-0">
            <span class="info-label whitespace-nowrap">Status:</span>
            <span class="text-green-100 truncate">{{ character.status }}</span>
          </div>
        </div>

        <!-- Откуда родом -->
        <div class="flex items-center gap-3">
          <MapPin class="text-yellow-300" :size="16"></MapPin>
          <div class="flex items-baseline gap-2 flex-1 min-w-0">
            <span class="info-label whitespace-nowrap">Origin:</span>
            <span class="text-yellow-100 line-clamp-1">{{ character.origin.name }}</span>
          </div>
        </div>

        <!-- Количество эпизодов -->
        <div class="flex items-center gap-3">
          <Film class="text-purple-300" :size="16"></Film>
          <div class="flex items-baseline gap-2 flex-1 min-w-0">
            <span class="info-label whitespace-nowrap">Episodes:</span>
            <span class="text-purple-100 truncate">{{ character.episode.length }} episodes</span>
          </div>
        </div>
      </div>
    </div>

    <div
      class="absolute inset-0 border-2 border-green-400 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none">
    </div>
  </div>
</template>

<style scoped>
</style>