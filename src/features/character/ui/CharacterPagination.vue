<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  page: number
  totalPages: number
  totalCharacters: number
}

interface Emits {
  (e: 'pageChange', page: number): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const goToPage = (pageNumber: number) => {
  emit('pageChange', pageNumber)
}

const pagesList = computed(() => {
  return Array.from({ length: props.totalPages }, (_, i) => i + 1)
})

const visiblePages = computed(() => {
  return pagesList.value.slice(Math.max(0, props.page - 3), props.page + 2)
})
</script>

<template>
  <div class="card-hologram rounded-2xl p-6 border border-green-400/20">
    <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
      <div class="text-gray-400 font-mono text-sm">
        DISPLAYING <span class="text-green-400">{{ (page - 1) * 20 + 1 }}-{{ Math.min(page * 20, totalCharacters)
          }}</span> OF <span class="text-cyan-400">{{ totalCharacters }}</span> ENTITIES
      </div>

      <div class="join">
        <button class="join-item btn btn-outline btn-success font-mono" :disabled="page <= 1"
          @click="goToPage(page - 1)">
          <i data-lucide="chevron-left" class="w-4 h-4"></i>
          PREV
        </button>

        <button v-for="p in visiblePages" :key="p" @click="goToPage(p)" class="join-item btn font-mono" :class="{
          'btn-active btn-success': p === page,
          'btn-outline btn-success': p !== page
        }">
          {{ p }}
        </button>

        <button class="join-item btn btn-outline btn-success font-mono gap-1" :disabled="page >= totalPages"
          @click="goToPage(page + 1)">
          NEXT
          <i data-lucide="chevron-right" class="w-4 h-4"></i>
        </button>
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
}
</style>