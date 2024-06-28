<script setup lang="ts">
import {
  SvgKHorizontalMenu,
  SvgKKArrowLeft,
  SvgKLoveIcon,
  SvgKPlayIcon,
  SvgKShareIcon
} from '../../core/icons'
import SvgKTwitterYellow from '../../components/icons/KTwitterYellow.vue'
import { displayTextLimit } from '../../cores/behaviours'
import { onMounted, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import EmptyPage from '../../components/shared/EmptyPage.vue'
import axios from 'axios'
import { inject } from 'vue'
import Pagination from '../../components/shared/PaginationComponent.vue'
import jollofEmpty from '../../assets/images/jollofEmpty.jpg'

const router = useRouter()
const route = useRoute()
const swal: any = inject('$swal')

const resource = ref([])

const isLoadingPodcast = ref(true)
const isPlaying = ref(false)
const playingId = ref()
const audioType = ref()
const station: any = ref({
  type: '',
  topic: '',
  resource: [
    {
      id: 0,
      logo: '',
      title: '',
      state: '',
      frequency: ''
    }
  ]
})
const podcasts: any = ref({
  type: '',
  topic: '',
  totalPages: 0,
  page_size: 20,
  page: 0,
  resource: [
    {
      id: 0,
      logo: '',
      title: '',
      state: '',
      frequency: ''
    }
  ]
})

onMounted(async () => {
  fetchPodcast(podcasts.value.page_size)
})

const fetchPodcast = (itemPerPage: number, page?: number) => {
  isLoadingPodcast.value = true
  const url =
    page && page > 1
      ? `services/podcast/?category=${route.params.name}&page=${page}&page_size=${itemPerPage}`
      : `services/podcast/?category=${route.params.name}&page_size=${itemPerPage}`

  let filteredData: any = []
  axios
    .get(url)
    .then((res) => {
      filteredData = res.data.results
      // Clear previous podcast data before updating
      podcasts.value.resource = []

      // Update podcast data with response data
      podcasts.value = {
        type: 'podcasts',
        topic: route.params.name,
        resource: filteredData,
        totalPages: res.data.total_pages,
        page: res.data.current_page,
        page_size: res.data.page_size
      }

      isLoadingPodcast.value = false
    })
    .catch((error) => {
      if (error.response) {
        swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.data.message
        })
      } else {
        swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message
        })
      }
    })
}
const onPageChange = (newPage: number) => {
  fetchPodcast(podcasts.value.page_size, newPage)
}

const showPodcast = (item: any) => {
  localStorage.removeItem('podcast')
  localStorage.removeItem('subscribed')
  localStorage.setItem('podcast', JSON.stringify(item))
  localStorage.setItem('podcast_name', JSON.stringify(item.title))

  router.push({ name: 'view-podcast', params: { name: item.id } })
}

setInterval(() => {
  if (
    localStorage.getItem('isPlaying') &&
    JSON.parse(localStorage.getItem('isPlaying') ?? '') == true
  ) {
    if (localStorage.getItem('playingId')) {
      playingId.value = JSON.parse(localStorage.getItem('playingId') ?? '')
    }
  } else {
    isPlaying.value = false
    playingId.value = 0
  }
}, 1000)

const onItemsPerPageChange = (newItemsPerPage: number) => {
  fetchPodcast(newItemsPerPage, 0)
  // console.log(podcasts.value.page_size)
}
</script>

<template>
  <div class="overflow-hidden pb-[100px]">
    <div>
      <div
        class="container mx-auto mt-[80px] bg-blue-deep-100 pt-[46px] rounded-t-[10px] space-y-6 pb-10 px-[15px] text-white space-y-17 satoshi"
      >
        <div class="container mx-auto space-x-2">
          <button class="bg-[#F0CF7B40] rounded px-2.5 py-1.5" @click="router.back()">
            <SvgKKArrowLeft />
          </button>
          <span>Back</span>
        </div>
        <div class="text-white space-y-6">
          <div class="flex items-end justify-between py-[24px] pb-0">
            <h4 class="text-2xl font-medium">
              {{ station.topic ? station.topic : podcasts.topic ? podcasts.topic : '' }}
            </h4>
          </div>
          <div v-if="!isLoadingPodcast">
            <!-- <div class="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 grid-cols-1 lg:gap-4 gap-2" v-if="podcasts.type === 'podcasts'">
                            <div v-for="(item, index) in podcasts.resource" :key="index" class="discover-slider">
                                <div class="slider-info h-[405.43px] overflow-hidden px-0 relative" @click="showPodcast(item)">
                                    <img :src="item.logo ? item.logo : 'https://dummyimage.com/300.png/09f/fff'" class="h-[500px] w-[600px]" />
                                    <div class="transparent absolute h-[99.59px] w-full bottom-0">
                                        
                                    </div>
                                    <div class="tag w-full absolute bottom-0 h-[99.59px] text-left py-[18px] px-[28px] bg-[rgba(0,0,0, 0.4)] overflow-hidden">
                                        <p v-html="displayTextLimit(item.description, 22)" class="lg:text-[24px] md:text-[16.5px] text-[24px] mb-[5px]"></p>
                                        <p v-html="displayTextLimit(item.title, 60)" class="text-[14px]"></p>
                                    </div>
                                    <div class="screen absolute h-full w-full left-0 right-0 top-0 bottom-0 bg-[#0D192160] opacity-0">
                                        <div class="relative flex items-center justify-center h-full">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> -->

            <div
              class="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 grid-cols-2 gap-2 cursor-pointer"
              v-if="podcasts.resource && podcasts.resource[0]?.title"
            >
              <slide v-for="(item, index) in podcasts.resource" :key="index" class="episodeSlider">
                <div
                  class="slider-info bg-blue-deep-200 relative md:px-3 px-1 pt-2.5 pb-2 rounded-md"
                >
                  <div class="relative">
                    <img
                      :src="item.logo || jollofEmpty"
                      class="block aspect-square rounded-md"
                      alt="Episode"
                    />
                    <!-- <span 
                                            class="absolute bottom-1 left-2 bg-blue-deep-100/40 py-1 px-2 text-[8px] rounded-full">{{ item.duration }}</span> -->
                  </div>
                  <div class="text-left mt-[5px]">
                    <span
                      v-html="displayTextLimit(item.title, 13)"
                      class="text-left text-white block md:text-sm text-[14px] mb-[-5px]"
                    ></span>
                    <span class="md:text-xs text-[10px] text-[grey]">{{
                      item.item_count ||
                      item?.episode_count + ` Episode${item.episode_count > 1 ? 's' : ''}`
                    }}</span>
                  </div>
                  <div
                    class="screen absolute left-0 right-0 top-0 bottom-0 bg-[#0D192160] opacity-0"
                  >
                    <div
                      class="relative flex items-center justify-center h-full"
                      @click="$router.push({ name: 'view-podcast', params: { name: item.id } })"
                    >
                      <!-- <button type="button" class="playpause-track flex items-center justify-center absolute text-[23px] bg-[#F0CF7B] w-[50px] h-[50px] rounded-full text-[#030F18]">
                                                <font-awesome-icon  :icon="['fas', 'play']" v-if="!player.isPlaying || player.currentTrackId !== item.id" />
                                                <font-awesome-icon v-else :icon="['fas', 'pause']" />
                                            </button> -->
                      <div
                        class="action absolute bottom-[14px] right-[10px] flex items-center"
                      ></div>
                    </div>
                  </div>
                  <!-- <div class="screen absolute left-0 right-0 top-0 bottom-0 bg-[#0D192160]"></div> -->
                </div>
              </slide>
            </div>
            <div v-else>
              <EmptyPage messgae="No record found." />
            </div>
          </div>
          <div v-else class="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 grid-cols-2 gap-2">
            <div
              v-for="(item, index) in 6"
              :key="index"
              class="flex flex-col gap-4 w-full items-left relative rounded-md"
            >
              <div class="slider-info bg-blue-deep-200 relative md:px-3 px-1 pt-2.5 pb-2">
                <div class="relative h-[155px] overflow-hidden">
                  <Skeletor class="block w-full h-[155px]" style="border-radius: 0" />
                  <span
                    class="absolute bottom-1 left-2 bg-blue-deep-100/40 py-1 px-2 text-[8px] rounded-full"
                    ><Skeletor style="width: 20px; height: 8px"
                  /></span>
                </div>
                <div class="text-left mt-[5px]">
                  <Skeletor class="h-full w-full" />
                  <Skeletor class="h-full w-[50px]" style="width: 80px; height: 10px" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mx-auto flex justify-center pt-20 mt-[1000px]" v-if="podcasts.totalPages > 0">
          <Pagination
            :currentPage="podcasts.page"
            :totalPages="podcasts.totalPages"
            @page-change="onPageChange"
            @items-per-page-change="onItemsPerPageChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slider-info:hover .screen {
  opacity: 1;
}

.transparent {
  background: rgba(0, 0, 0, 0.22);
  -webkit-backdrop-filter: blur(50px);
  backdrop-filter: blur(50px);
}

@media (min-width: 768px) and (max-width: 1023px) {
  .frame {
    top: 540px;
    right: -317px;
  }
}
</style>
