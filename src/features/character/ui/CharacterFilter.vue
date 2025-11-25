<script setup lang="ts">
import { useCharactersStore } from '../../../store/useCharactersStore'
import { Search, SlidersHorizontal, ArrowUpDown } from 'lucide-vue-next';

const charactersStore = useCharactersStore()

const sortOptions = [
  { value: 'NAME ↑' },
  { value: 'NAME ↓' },
  { value: 'EPISODES ↑' },
  { value: 'EPISODES ↓' },
]
</script>

<template>
  <div class="card-hologram rounded-2xl p-6 mb-8 border border-green-400/20 relative overflow-visible">
    <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">

      <!-- Кнопка расширенных фильтров -->
      <div class="dropdown dropdown-bottom">
        <div tabindex="0" role="button" class="btn btn-outline btn-success gap-2 font-mono">
          <SlidersHorizontal class="w-4 h-4" />
          STATUS: {{ charactersStore.selectedStatus?.toUpperCase() || 'ALL' }}
        </div>
        <ul tabindex="0" class="dropdown-content menu bg-emerald-950 text-amber-50 rounded-box z-50 w-52 p-2 shadow-xl">
          <li><a @click.prevent="charactersStore.selectedStatus = 'Alive'">ALIVE</a></li>
          <li><a @click.prevent="charactersStore.selectedStatus = 'Dead'">DEAD</a></li>
          <li><a @click.prevent="charactersStore.selectedStatus = 'unknown'">UNKNOWN</a></li>
          <li><a @click.prevent="charactersStore.selectedStatus = null">ALL</a></li>
        </ul>
      </div>

      <!-- Поиск с иконкой -->
      <div class="relative flex-1 max-w-xl">
        <input type="text" v-model="charactersStore.searchQuery" placeholder="SCAN FOR CHARACTERS..."
          class="input input-bordered input-success w-full pl-10 font-mono bg-transparent text-base-100" />
        <Search class="absolute left-3 top-3 w-4 h-4 text-green-400" :size="20" />
      </div>

      <!-- Сортировка -->
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-outline btn-success gap-2 font-mono">
          <ArrowUpDown class="w-4 h-4" />
          SORT BY: {{ charactersStore.sortOption || 'ID' }}
        </div>
        <ul tabindex="0" class="dropdown-content menu bg-emerald-950 text-amber-50 rounded-box z-50 w-52 p-2 shadow-xl">
          <li v-for="option in sortOptions" :key="option.value">
            <a @click="charactersStore.sortOption = option.value" class="font-mono">{{ option.value }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-hologram {
  background: linear-gradient(135deg,
      rgba(30, 30, 40, 0.95) 0%,
      rgba(20, 25, 35, 0.9) 100%);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 255, 157, 0.2);
  box-shadow:
    0 8px 32px rgba(0, 255, 157, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  position: relative;
  z-index: 10;
}

/* Убедимся, что dropdownы поверх всего */
.dropdown-content {
  z-index: 9999 !important;
}
</style>