<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{
  currentPage: number
  totalPages: number
}>()

const emits = defineEmits(['page-change', 'items-per-page-change'])

const perPageOptions = ref([10, 20, 50, 100])
const selectedPerPage = ref(perPageOptions.value[1])

const changePage = (page: any) => {
  if (page >= 1 && page <= props.totalPages) {
    emits('page-change', page)
  }
}

const goToPage = (page: any) => {
  if (page !== '...') {
    changePage(page)
  }
}

const visiblePages = computed(() => {
  const pages = []
  const total = props.totalPages
  const current = props.currentPage

  if (total <= 8) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(total)
    } else if (current >= total - 3) {
      pages.push(1)
      pages.push('...')
      for (let i = total - 4; i <= total; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)
      pages.push('...')
      for (let i = current - 1; i <= current + 1; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(total)
    }
  }

  return pages
})

const selectPerPage = (value: number) => {
  selectedPerPage.value = value
  emits('items-per-page-change', value)
}
</script>

<template>
  <div class="flex justify-between w-full">
    <nav class="flex items-center gap-x-1">
      <!-- Previous Button -->
      <button
        @click="goToPage(currentPage - 1)"
        :disabled="currentPage === 1"
        class="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center cursor-pointer items-center gap-x-2 text-sm rounded-lg disabled:opacity-50 disabled:hover:bg-transparent disabled:cursor-not-allowed text-white hover:bg-white/10 k:focus:bg-white/10"
      >
        <svg
          class="flex-shrink-0 size-3.5"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="m15 18-6-6 6-6"></path>
        </svg>
        <span aria-hidden="true" class="">Previous</span>
      </button>

      <!-- Page Numbers -->
      <div class="flex items-center gap-x-1">
        <button
          v-for="page in visiblePages"
          :key="page"
          @click="goToPage(page)"
          :disabled="page === '...' || page === currentPage"
          :class="[
            'min-h-[38px] min-w-[38px] flex justify-center items-center py-2 px-3 text-sm rounded-lg focus:outline-none cursor-pointer',
            page === currentPage
              ? ' bg-neutral-600 text-white'
              : ' text-white hover:bg-white/10 focus:bg-white/10'
          ]"
        >
          {{ page }}
        </button>
      </div>

      <!-- Next Button -->
      <button
        @click="goToPage(currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 cursor-pointer text-sm rounded-lg focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent text-white hover:bg-white/10 focus:bg-white/10"
      >
        <span aria-hidden="true" class="">Next</span>

        <svg
          class="flex-shrink-0 size-3.5"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="m9 18 6-6-6-6"></path>
        </svg>
      </button>
    </nav>

    <!-- Items Per Page Dropdown -->
    <div class="relative inline-flex">
      <select
        v-model="selectedPerPage"
        @change="selectPerPage(selectedPerPage)"
        class="py-1.5 px-2 text-sm rounded-lg border shadow-sm focus:outline-none border-neutral-700 text-white bg-neutral-800 focus:bg-neutral-700 cursor-pointer"
      >
        <option v-for="option in perPageOptions" :key="option" :value="option">
          {{ option }} per page
        </option>
      </select>
    </div>
  </div>
</template>

<style scoped>
.hs-tooltip-content {
  display: none;
}
.hs-tooltip-toggle:hover .hs-tooltip-content {
  display: block;
}
</style>
