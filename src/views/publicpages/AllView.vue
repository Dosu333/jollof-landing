<script setup lang="ts">
import {
  SvgKHorizontalMenu,
  SvgKKArrowLeft,
  SvgKLoveIcon,
  SvgKPlayIcon,
  SvgKShareIcon
} from '../../core/icons'
// import  SvgKShareIcon from '@/components/icons/KShareIcon.vue';
import SvgKTwitterYellow from '../../components/icons/KTwitterYellow.vue'
import { displayTextLimit } from '../../cores/behaviours'
import { inject, onMounted, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
import { useAudioplayerStore } from '../../stores/audioplayer'
import ShareModel from '../../components/shared/ShareModel.vue'
import axios from 'axios'
import Pagination from '../../components/shared/PaginationComponent.vue'
import jollofEmpty from '../../assets/images/jollofEmpty.jpg'

const $toast = useToast()
const player: any = useAudioplayerStore()

const router = useRouter()
const route = useRoute()

const data: any = ref({
  type: '',
  topic: '',
  name: '',
  totalPages: 0,
  page_size: 20,
  page: 0,
  resource: [
    {
      active: false,
      created_at: '',
      creator: 0,
      description: '',
      duration: '',
      id: 0,
      logo: '',
      plays: 0,
      podcast: '',
      slug: '',
      source: '',
      title: '',
      updated_at: '',
      views: 0
    }
  ]
})

const showShareModal = ref(false)
const showRoute = ref('')

const response = ref()
const isPlaying = ref(false)
const playingId = ref()
const audioType = ref()
const loading = ref(false)
const swal: any = inject('$swal')

onMounted(() => {
  fetchViewAll(data.value.page_size)
})

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

const copyLink = () => {
  $toast.success('Copied!')
}

const playSound = (index: any, type: string, playlist: string, isShared: boolean = false) => {
  let object: any = data.value.resource

  player.audioType = type

  player.currentTrackIndex = index
  player.podcastName = data.value.title

  if (JSON.stringify(player.trackList) !== JSON.stringify(object)) {
    player.trackList = object
  }

  player.playPauseTrack()
}

const share = (slug: string) => {
  let shareData = {
    url: ''
  }

  if (window.innerWidth > 768) {
    showShareModal.value = true
  }

  shareData.url = 'https://share.jollofradio.com/station/' + slug

  showRoute.value = shareData.url

  if (window.innerWidth < 768) {
    navigator.share(shareData)
  }

  //   if (navigator.share) {
  //       navigator.share(shareData);
  //   } else {
  //     // Fallback for browsers that do not support the Web Share API
  //     var tempInput = document.createElement("input");
  //     tempInput.value = shareData.url;
  //     document.body.appendChild(tempInput);
  //     tempInput.select();
  //     document.execCommand('copy');
  //     document.body.removeChild(tempInput);
  //     $toast.success('Copied Link!');
  //   }
}

const gotoExternalRoute = (route: string) => {
  window.location.href = route
}

const fetchViewAll = (itemPerPage: number, page?: number) => {
  loading.value = true
  const url =
    page && page > 1
      ? `services/toppick-episodes/?toppick=${route.params.name}&page=${page}&page_size=${itemPerPage}`
      : `services/toppick-episodes/?toppick=${route.params.name}&page_size=${itemPerPage}`

  let filteredData: any = []
  loading.value = true
  axios
    .get(url)
    .then((res) => {
      filteredData = res.data.results
      // Clear previous podcast data before updating
      data.value.resource = []

      // Update podcast data with response data
      data.value = {
        type: 'episodes',
        topic: route.params.name,
        resource: filteredData,
        totalPages: res.data.total_pages,
        page: res.data.current_page,
        page_size: res.data.page_size
      }
      loading.value = false
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
  fetchViewAll(data.value.page_size, newPage)
}

const onItemsPerPageChange = (newItemsPerPage: number) => {
  fetchViewAll(newItemsPerPage, 0)
  // console.log(podcasts.value.page_size)
}
</script>

<template>
  <div class="overflow-hidden pt-[20px] pb-[150px]">
    <div>
      <div
        class="container mx-auto md:mt-[80px] mt-[80px] bg-blue-deep-100 md:pt-[24px] rounded-t-[10px] space-y-6 pb-10 px-[15px] text-white space-y-17 satoshi"
      >
        <div class="container mx-auto space-x-2">
          <button class="bg-[#F0CF7B40] rounded px-2.5 py-1.5" @click="router.back()">
            <SvgKKArrowLeft />
          </button>
          <span>Back</span>
        </div>
        <div class="text-white space-y-6">
          <div class="flex items-end justify-between py-[24px] pb-0">
            <h4 class="text-2xl font-medium">{{ data.topic }}</h4>
          </div>

          <!-- cards -->
          <div
            class="grid xl:grid-cols-6 lg:grid-cols-6 md:grid-cols-4 grid-cols-2 gap-2"
            v-if="!loading"
          >
            <div
              v-for="(item, index) in data.resource"
              :key="index"
              class="flex flex-col gap-4 w-full rounded-[5px] items-left relative"
            >
              <div
                class="slider-info bg-blue-deep-200 relative md:px-3 px-1 pt-2.5 pb-2 cursor-pointer"
                @click="playSound(index, 'episode', data.resource.title)"
              >
                <div class="relative h-[177.67px] rounded-md overflow-hidden">
                  <img
                    :src="item.logo || jollofEmpty"
                    class="block w-full h-[177.66px] aspect-square rounded-md"
                    height="177.66px"
                    width="177.67px"
                    alt="Episode"
                  />
                </div>
                <div class="text-left mt-[5px]">
                  <span
                    v-html="displayTextLimit(item.title, 20)"
                    class="text-left text-white block md:text-[14px] text-[11px] mb-[-5px]"
                  ></span>
                  <!-- <span class=" md:text-xs text-[9px] text-[grey]">{{ data.type === 'podcasts' ? item.item_count+' Episodes' : item.creator ? item.creator.firstname+' '+item.creator.lastname : "Jollof Radio" }}</span> -->
                </div>

                <!-- <div class="screen absolute left-0 right-0 top-0 bottom-0 bg-[#0D192160]"></div> -->
              </div>
            </div>
          </div>
          <!--  -->
        </div>
        <Pagination
          :currentPage="data.page"
          :totalPages="data.totalPages"
          @page-change="onPageChange"
          @items-per-page-change="onItemsPerPageChange"
        />
      </div>
    </div>
    <ShareModel v-if="showShareModal" :route="showRoute" @close="showShareModal = false" />
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
