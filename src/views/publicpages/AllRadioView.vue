<script setup lang="ts">
import { SvgKKArrowLeft, SvgKShareIcon } from '../../core/icons'
import { displayTextLimit } from '../../cores/behaviours'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
import { useAudioplayerStore } from '../../stores/audioplayer'
import ShareModel from '../../components/shared/ShareModel.vue'
import Pagination from '../../components/shared/PaginationComponent.vue'

const $toast = useToast()
const player: any = useAudioplayerStore()

const router = useRouter()

const showShareModal = ref(false)
const showRoute = ref('')

const resource = ref([])
const page = ref([])
const data = ref(resource.value ?? {})

const isLoadingStation = ref(false)
const isPlaying = ref(false)
const playingId = ref()
const station: any = ref({
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
      frequency: '',
      slug: ''
    }
  ]
})

const radioTypes: any = ref({
  local: [],
  international: []
})

onMounted(() => {
  fetchStations(station.value.page_size)
})

const fetchStations = (itemPerPage: number, page?: number) => {
  isLoadingStation.value = true
  const url =
    page && page > 1
      ? `services/station/?page=${page}&page_size=${itemPerPage}`
      : `services/station/?page_size=${itemPerPage}`
  axios
    .get(url)
    .then((res) => {
      // Clear previous station data before updating
      station.value.resource = []
      radioTypes.value.local = []
      radioTypes.value.international = []

      // Update station data with response data
      station.value = {
        type: 'radio',
        topic: 'All Radio',
        resource: res.data.results,
        totalPages: res.data.total_pages,
        page: res.data.current_page,
        page_size: res.data.page_size
      }
      station.value.resource.forEach((element: any) => {
        if (element.type === 'Local') {
          radioTypes.value.local.push(element)
        } else if (element.type === 'International') {
          radioTypes.value.international.push(element)
        }
      })
      isLoadingStation.value = false
    })
    .catch((e) => {
      if (e) {
        // console.log('there was an error');
      }
    })
}

const onPageChange = (newPage: number) => {
  fetchStations(newPage)
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

const playSound = (index: any, type: string, playlist: string) => {
  let object: any = type === 'episode' ? [] : station.value.resource
  player.audioType = type

  player.currentTrackIndex =
    type === 'episode'
      ? index
      : station.value.resource.findIndex((element: any) => element.id === index)

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

const onItemsPerPageChange = (newItemsPerPage: number) => {
  fetchStations(newItemsPerPage, 0)
  // console.log(podcasts.value.page_size)
}
</script>

<template>
  <div class="overflow-hidden pt-[20px] pb-[100px]">
    <div>
      <div
        class="container mx-auto mt-[80px] bg-blue-deep-100 pt-[20px] rounded-t-[10px] space-y-6 pb-10 px-[15px] text-white space-y-17 satoshi"
      >
        <div class="container mx-auto space-x-2">
          <button class="bg-[#F0CF7B40] rounded px-2.5 py-1.5" @click="router.back()">
            <SvgKKArrowLeft />
          </button>
          <span>Back</span>
        </div>
        <!-- stations -->
        <div class="text-white space-y-6">
          <!-- <div class="flex items-end justify-between py-[24px] pb-0">
                        <h4 class="text-2xl font-medium">{{ station.topic ? station.topic : podcasts.topic ? podcasts.topic : ''  }}</h4>
                    </div> -->

          <div
            class="flex items-end justify-between py-[24px] pb-0"
            v-show="radioTypes.local.length"
          >
            <h4 class="text-2xl font-medium">Local Brodcast</h4>
          </div>

          <!--  -->
          <div v-if="!isLoadingStation">
            <div
              class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 xl:gap-6 xl:gap-x-12 md:gap-x-10 sm:gap-3 gap-6"
              v-if="radioTypes.local.length"
            >
              <div v-for="(item, index) in radioTypes.local" :key="index" class="stationSlider">
                <div class="flex items-center bg-[#12222D] rounded-md w-full aspect-[1/auto] px-2">
                  <div
                    class="md:w-[95px] md:h-full w-[60px] h-[60px] rounded-md overflow-hidden"
                    @click="playSound(item.id, 'radio', '')"
                  >
                    <img :src="item.logo" alt="radio" class="aspect-square" />
                  </div>
                  <div class="space-y-4 md:py-[15px] flex-grow lg:px-[10px] px-[20px] pr-0">
                    <div
                      class="flex flex-grow items-start md:space-x-1 pt-2"
                      @click="playSound(item.id, 'radio', '')"
                    >
                      <div class="flex flex-col font-bold space-y-1">
                        <span
                          v-html="displayTextLimit(item.title, 80)"
                          class="lg:text-[15px] text-md font-normal work-sans"
                        ></span>
                        <span
                          v-html="displayTextLimit(item.state, 30)"
                          class="text-[10px] font-medium text-left"
                        ></span>
                      </div>
                    </div>
                    <div class="flex items-center space-x-6 relative">
                      <span
                        v-html="displayTextLimit(item.frequency + 'FM', 30)"
                        class="text-white/20 md:text-[16px] text-[12px]"
                      ></span>
                      <div
                        class="flex items-center space-x-4 absolute sm:right-1 right-1 bottom-[3px] transform scale-75"
                      >
                        <button
                          class=""
                          v-copy="'https://app.jollofradio.com/home?station=' + item.slug"
                          @click="share(item?.slug)"
                        >
                          <SvgKShareIcon />
                        </button>
                        <button
                          v-if="item.handles && item.handles.twitter"
                          @click="gotoExternalRoute(item.handles.twitter)"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width="28"
                            height="28"
                            viewBox="0,0,256,256"
                          >
                            <g
                              fill="#ffffff"
                              fill-rule="nonzero"
                              stroke="none"
                              stroke-width="1"
                              stroke-linecap="butt"
                              stroke-linejoin="miter"
                              stroke-miterlimit="10"
                              stroke-dasharray=""
                              stroke-dashoffset="0"
                              font-family="none"
                              font-weight="none"
                              font-size="none"
                              text-anchor="none"
                              style="mix-blend-mode: normal"
                            >
                              <g transform="scale(5.12,5.12)">
                                <path
                                  d="M5.91992,6l14.66211,21.375l-14.35156,16.625h3.17969l12.57617,-14.57812l10,14.57813h12.01367l-15.31836,-22.33008l13.51758,-15.66992h-3.16992l-11.75391,13.61719l-9.3418,-13.61719zM9.7168,8h7.16406l23.32227,34h-7.16406z"
                                ></path>
                              </g>
                            </g>
                          </svg>
                        </button>
                        <!-- <button @click="playMusic(item, 'radio', index, '')">
                                                    <div class="bg-[#F0CF7B] w-[22px] h-[22px] rounded-full text-black flex items-center justify-center text-[13px]">
                                                        <font-awesome-icon  :icon="['fas', 'play']" v-if="(isPlaying === false && playingId !== item.id) || audioType !== 'radio'" />
                                                        <font-awesome-icon v-else :icon="['fas', 'pause']" />
                                                    </div>
                                                </button> -->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <div class="flex items-end justify-between py-[24px] pb-0">
              <h4 class="text-2xl font-medium">Local Brodcast</h4>
            </div>
            <div
              class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 xl:gap-6 xl:gap-x-12 md:gap-x-10 sm:gap-3 gap-6"
            >
              <div
                v-for="(item, index) in 6"
                :key="index"
                class="flex items-center bg-[#0D1921] rounded-md h-[95px] p-2"
              >
                <div class="w-[75px] h-[75px] rounded-md overflow-hidden">
                  <Skeletor class="h-full w-full" />
                </div>
                <div class="space-y-4 flex-grow lg:px-[10px] px-[20px]">
                  <div class="flex flex-col flex-grow items-start space-y-2">
                    <Skeletor class="h-full w-full" />
                    <Skeletor class="h-full w-[50px]" style="width: 50px" />
                  </div>
                  <div class="flex items-center space-x-6 relative">
                    <Skeletor class="h-full w-[50px]" style="width: 50px; height: 8px" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            class="flex items-end justify-between py-[24px] pb-0"
            v-if="radioTypes.international.length"
          >
            <!-- <h4 class="text-2xl font-medium">International Brodcast</h4> -->
          </div>

          <!--  -->
          <div v-if="!isLoadingStation">
            <div
              class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 xl:gap-6 xl:gap-x-12 md:gap-x-10 sm:gap-3 gap-6"
              v-if="radioTypes.international.length"
            >
              <div
                v-for="(item, index) in radioTypes.international"
                :key="index"
                class="stationSlider"
              >
                <div class="flex items-center bg-[#12222D] rounded-md w-full aspect-[1/auto] px-2">
                  <div
                    class="md:w-[95px] md:h-full w-[60px] h-[60px] rounded-md overflow-hidden"
                    @click="playSound(item.id, 'radio', '')"
                  >
                    <img :src="item.logo" alt="radio" class="aspect-square" />
                  </div>
                  <div class="space-y-4 md:py-[15px] flex-grow lg:px-[10px] px-[20px] pr-0">
                    <div
                      class="flex flex-grow items-start md:space-x-1 pt-2"
                      @click="playSound(item.id, 'radio', '')"
                    >
                      <div class="flex flex-col font-bold space-y-1">
                        <span
                          v-html="displayTextLimit(item.title, 80)"
                          class="lg:text-[15px] text-md font-normal work-sans"
                        ></span>
                        <span
                          v-html="displayTextLimit(item.state, 30)"
                          class="text-[10px] font-medium text-left"
                        ></span>
                      </div>
                    </div>
                    <div class="flex items-center space-x-6 relative">
                      <span
                        v-html="displayTextLimit(item.frequency + 'FM', 30)"
                        class="text-white/20 md:text-[16px] text-[12px]"
                      ></span>
                      <div
                        class="flex items-center space-x-4 absolute sm:right-1 right-1 bottom-[3px] transform scale-75"
                      >
                        <button
                          class=""
                          v-copy="'https://app.jollofradio.com/home?station=' + item.slug"
                          @click="share(item?.slug)"
                        >
                          <SvgKShareIcon />
                        </button>
                        <button
                          v-if="item.handles && item.handles.twitter"
                          @click="gotoExternalRoute(item.handles.twitter)"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width="28"
                            height="28"
                            viewBox="0,0,256,256"
                          >
                            <g
                              fill="#ffffff"
                              fill-rule="nonzero"
                              stroke="none"
                              stroke-width="1"
                              stroke-linecap="butt"
                              stroke-linejoin="miter"
                              stroke-miterlimit="10"
                              stroke-dasharray=""
                              stroke-dashoffset="0"
                              font-family="none"
                              font-weight="none"
                              font-size="none"
                              text-anchor="none"
                              style="mix-blend-mode: normal"
                            >
                              <g transform="scale(5.12,5.12)">
                                <path
                                  d="M5.91992,6l14.66211,21.375l-14.35156,16.625h3.17969l12.57617,-14.57812l10,14.57813h12.01367l-15.31836,-22.33008l13.51758,-15.66992h-3.16992l-11.75391,13.61719l-9.3418,-13.61719zM9.7168,8h7.16406l23.32227,34h-7.16406z"
                                ></path>
                              </g>
                            </g>
                          </svg>
                        </button>
                        <!-- <button @click="playMusic(item, 'radio', index, '')">
                                                    <div class="bg-[#F0CF7B] w-[22px] h-[22px] rounded-full text-black flex items-center justify-center text-[13px]">
                                                        <font-awesome-icon  :icon="['fas', 'play']" v-if="(isPlaying === false && playingId !== item.id) || audioType !== 'radio'" />
                                                        <font-awesome-icon v-else :icon="['fas', 'pause']" />
                                                    </div>
                                                </button> -->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <div class="flex items-end justify-between py-[24px] pb-0">
              <!-- <h4 class="text-2xl font-medium">International Brodcast</h4> -->
            </div>

            <div
              class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 xl:gap-6 xl:gap-x-12 md:gap-x-10 sm:gap-3 gap-6"
            >
              <div
                v-for="(item, index) in 6"
                :key="index"
                class="flex items-center bg-[#0D1921] rounded-md h-[95px] p-2"
              >
                <div class="w-[75px] h-[75px] rounded-md overflow-hidden">
                  <Skeletor class="h-full w-full" />
                </div>
                <div class="space-y-4 flex-grow lg:px-[10px] px-[20px]">
                  <div class="flex flex-col flex-grow items-start space-y-2">
                    <Skeletor class="h-full w-full" />
                    <Skeletor class="h-full w-[50px]" style="width: 50px" />
                  </div>
                  <div class="flex items-center space-x-6 relative">
                    <Skeletor class="h-full w-[50px]" style="width: 50px; height: 8px" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- stations -->
        <div class="mx-auto flex justify-center pt-20 mt-[1000px]" v-if="station.totalPages > 0">
          <Pagination
            :currentPage="station.page"
            :totalPages="station.totalPages"
            @page-change="onPageChange"
            @items-per-page-change="onItemsPerPageChange"
          />
        </div>
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
