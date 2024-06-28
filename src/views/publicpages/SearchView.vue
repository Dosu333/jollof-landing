<script lang="ts" setup>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import { useRouter, useRoute } from 'vue-router'
import { ref, watch, onMounted } from 'vue'
import axios from 'axios'
import { debounce } from 'lodash' // Import debounce from lodash
import EmptyPage from '../../components/shared/EmptyPage.vue'
import { useAudioplayerStore } from '../../stores/audioplayer'
import AllCategories from './AllCategories.vue'
import { Skeletor } from 'vue-skeletor'
import jollofEmpty from '../../assets/images/jollofEmpty.jpg'

const router = useRouter()
const route = useRoute()
let episode_id = ref()
let episode_source = ''
const podcast_id = ref(0)
const isPlaying = ref(false)
const playingId = ref(0)
const player: any = useAudioplayerStore()

let breakpoints = {
  0: {
    itemsToShow: 2.8,
    snapAlign: 'start'
  },
  // 700px and up
  700: {
    itemsToShow: 3.7,
    snapAlign: 'start'
  },
  // 1024 and up
  1024: {
    itemsToShow: 5.5,
    snapAlign: 'start'
  }
}
let CategoryBreakpoints = {
  0: {
    itemsToShow: 2.2,
    snapAlign: 'start'
  },
  // 700px and up
  700: {
    itemsToShow: 4,
    snapAlign: 'start'
  },
  // 1024 and up
  1024: {
    itemsToShow: 6.5,
    snapAlign: 'start'
  }
}
let CreatorBreakpoints = {
  0: {
    itemsToShow: 2.5,
    snapAlign: 'start'
  },
  // 700px and up
  700: {
    itemsToShow: 3.5,
    snapAlign: 'start'
  },
  // 1024 and up
  1024: {
    itemsToShow: 4,
    snapAlign: 'start'
  }
}

const searchResponse = ref({
  categories: [
    {
      id: 0,
      logo: '',
      name: ''
    }
  ],
  episodes: [
    {
      id: 0,
      logo: '',
      title: '',
      source: '',
      liked: false,
      slug: '',
      description: '',
      podcast_id: 0
    }
  ],
  podcasts: [
    {
      id: 0,
      logo: '',
      title: '',
      podcast: '',
      description: '',
      creator: {
        firstname: '',
        lastname: ''
      }
    }
  ],
  creators: [
    {
      photo: '',
      title: '',
      firstname: '',
      lastname: '',
      podcasts: []
    }
  ]
})

const isLoadingStation = ref(true)
const isLoadingPodcast = ref(true)
const audioType = ref()
const search = ref('')

const liked = ref(false)
const loading = ref(true)

const searchCarousel: any = ref(null)
const searchCarouselNext = () => searchCarousel.value.next()
const searchCarouselPrev = () => searchCarousel.value.prev()

onMounted(() => {})

function breakString(text: string, length: number) {
  if (text && text.length > length) {
    return text.substring(0, length) + '...'
  } else {
    return text
  }
}

watch(route, async (newValue, oldValue) => {
  loading.value = true

  // axios
  //   .get('services/search?q=' + route.query.query)
  //   .then((res) => {
  //     loading.value = false
  //     searchResponse.value = res.data.data
  //   })
  //   .catch((e) => {
  //     if (e) {
  //       // console.log(e);
  //       // return log.value = e.response;
  //     }
  //   })
})

setInterval(() => {
  if (localStorage.getItem('liked-id') && localStorage.getItem('liked')) {
    liked.value = JSON.parse(localStorage.getItem('liked') ?? '')?.liked
  }
}, 1000)

const showPodcast = (item: any) => {
  localStorage.removeItem('podcast')
  localStorage.removeItem('subscribed')
  localStorage.setItem('podcast', JSON.stringify(item))
  localStorage.setItem('podcast_name', JSON.stringify(item.title))

  router.push({ name: 'view-podcast', params: { name: item.id } })
}

const playMusic = (item: any, type: string, index: number) => {
  let object: any = []
  if (type !== 'episode') {
    object = [
      {
        id: type === 'episode' ? item.id : item.id,
        logo: type === 'episode' ? item.logo : item.logo,
        title: type === 'episode' ? item.title : item.title,
        source: type === 'episode' ? item.source : item.link,
        liked: false,
        creator: type === 'episode' ? item.creator : { firstname: item.frequency, lastname: 'FM' }
      }
    ]
  } else {
    object = searchResponse.value.episodes
  }

  localStorage.removeItem('player_details')
  localStorage.removeItem('liked')
  localStorage.setItem(
    'player_details',
    JSON.stringify(
      type === 'episode'
        ? { startWith: index, podcasts: object }
        : { startWith: 0, podcasts: object }
    )
  )
  localStorage.setItem('liked', JSON.stringify({ id: object.id, liked: object.liked }))
  localStorage.setItem('audio-type', JSON.stringify(type === 'episode' ? 'podcasts' : 'radio'))
  audioType.value = JSON.parse(localStorage.getItem('audio-type') ?? '') ?? ''

  if (
    localStorage.getItem('isPlaying') &&
    JSON.parse(localStorage.getItem('isPlaying') ?? '') == true &&
    JSON.parse(localStorage.getItem('playingId') ?? '') === item.id
  ) {
    isPlaying.value = false
    playingId.value = JSON.parse(localStorage.getItem('playingId') ?? '')
    localStorage.setItem('isPlaying', JSON.stringify(false))
  } else {
    localStorage.setItem('isPlaying', JSON.stringify(false))
  }
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

const playSound = (index: any, type: string, playlist: string) => {
  let object: any = searchResponse.value.episodes

  player.audioType = type

  player.currentTrackIndex = index

  if (JSON.stringify(player.trackList) !== JSON.stringify(object)) {
    player.trackList = object
  }

  player.playPauseTrack()
}

// New Search Filter
const filterResults = async () => {
  loading.value = true
  if (search.value) {
    try {
      const response = await axios.get('services/search?q=' + search.value)
      searchResponse.value = response.data
      loading.value = false
    } catch (error) {
      loading.value = false
      console.error(error)
    }
  }
}

const debouncedFilterResults = debounce(filterResults, 300) // Debounce the function with a 300ms delay
</script>

<template>
  <!-- blue-deep-200 -->
  <div class="relative">
    <div
      class="container mx-auto flex justify-between gap-2 items-center text-white pt-[130px] px-3"
    >
      <form
        class="flex items-center bg-[#0D1921] rounded-lg px-5 w-full gap-2 lg:w-1/3 border border-white"
      >
        <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
        <input
          v-model="search"
          @input="debouncedFilterResults"
          type="search"
          class="bg-transparent border-0 border-none focus:ring-transparent focus:border-0 focus:border-none focus:outline-none text-white w-full h-[56px] placeholder-white/60"
          placeholder="What do you want to listen to?"
        />
      </form>
    </div>
    <div v-if="search">
      <div v-if="!loading">
        <div class="container mx-auto flex justify-between items-center text-white pt-7 pb-2 px-3">
          <div class="w-full">
            <h2 class="font-bold text-lg">
              Top Results: <span class="text-[#F0CF7B]">{{ search }}</span>
            </h2>
            <!-- episodes and podcasts  -->
            <div
              class="lg:flex items-start py-[10px] h-auto md:px-[2px] bg-transparent mt-[30px] mb-[29px]"
            >
              <!-- Episode Record Found  -->
              <div
                class="lg:w-[60%] h-[500px] overflow-hidden lg:mb-0 mb-[40px] px-2 py-2"
                :class="{ 'w-full': !searchResponse?.podcasts }"
                v-if="searchResponse.episodes[0]?.title"
              >
                <p class="text-[20px] mb-[15px]">Episodes</p>
                <div class="h-[500px] pb-[40px] overflow-y-auto podcast">
                  <!--  -->
                  <div
                    v-for="(item, index) in searchResponse.episodes"
                    :key="index"
                    class="w-full flex items-center mb-[5px] bg-[#051724] py-1.5 space-x-6 rounded-md text-white px-[10px]"
                  >
                    <div class="flex items-center">
                      <div>
                        <img
                          :src="item.logo || jollofEmpty"
                          class="min-w-[56px] w-[56px] min-h-[56px] h-[56px]"
                          alt="Episode"
                        />
                      </div>
                    </div>
                    <div class="flex-grow flex items-center justify-between">
                      <div class="space-y-1">
                        <h3
                          v-html="breakString(item.description ?? '', 40)"
                          class="font-medium xl:text-md text-[13px]"
                        ></h3>
                        <div class="flex items-center space-x-3">
                          <p
                            v-html="breakString(item.title ?? '', 30)"
                            class="font-normal text-grey xl:text-[15px] text-[10px]"
                          ></p>
                          <!-- <p class="font-normal text-grey xl:text-[13px] text-[10px]">34 min 12 Sec </p> -->
                        </div>
                      </div>

                      <div class="flex items-center space-x-4">
                        <button>
                          <!-- <SvgKPlayIcon @click="playMusic(item)" /> -->
                          <button
                            type="button"
                            @click="playSound(index, 'episode', '')"
                            class="playpause-track md:text-[18px] text-[14px] bg-[#F0CF7B] md:w-[40px] md:h-[40px] w-[25px] h-[25px] rounded-full text-[#030F18]"
                          >
                            <font-awesome-icon
                              v-if="!player.isPlaying || player.currentTrack.id !== item.id"
                              :icon="['fas', 'play']"
                            />
                            <font-awesome-icon v-else :icon="['fas', 'pause']" />
                          </button>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Episode Record Found  -->
              <!-- Episode No Record  -->
              <!-- <div class="lg:w-[60%] h-[250px] lg:mb-0 mb-[40px] px-5 py-5" v-else>
                <div v-if="search">
                  <p class="text-[20px] mb-[15px]">Episodes</p>
                  <div
                    class="lg:h-[230px] h-[235px] flex flex-col items-center justify-center overflow-auto podcast text-white text-[70px]"
                  >
                    <font-awesome-icon :icon="['fas', 'file-excel']" class="opacity-5" />
                    <p class="text-[20px] mt-[10px] opacity-60">No Episode Found.</p>
                  </div>
                </div>
              </div> -->
              <!-- Episode No Record  -->
              <!-- categories  -->
              <div class="h-auto px-9 lg:w-[40%]" v-if="searchResponse?.categories?.length > 0">
                <p class="text-[20px] mb-[15px] py-3">Category</p>
                <div class="flex flex-wrap gap-4 w-full">
                  <div
                    v-for="(item, index) in searchResponse.categories"
                    :key="index"
                    class="cursor-pointer"
                    @click="
                      $router.push({ name: 'view.single.category', params: { name: item.name } })
                    "
                  >
                    <div class="h-[80px] rounded-md relative overflow-hidden cursor-pointer">
                      <div
                        class="px-5 py-1 absolute top-0 w-full bg-brown text-[12px] bg-[#0080002d]"
                      >
                        <span>{{ item.name }}</span>
                      </div>
                      <div class="w-full rounded-b-md">
                        <img
                          :src="item.logo || jollofEmpty"
                          class="w-full h-[100px]"
                          alt="Episode"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Podcast found  -->
            <div class="w-full" v-if="searchResponse.podcasts[0]?.title">
              <div class="flex mb-[10px] justify-between items-center">
                <p class="text-[20px] px-[20px] pt-[50px]">Podcasts</p>
                <div class="pt-[50px]">
                  <button @click="searchCarouselPrev" class="hover:text-yellow px-2">
                    <label for="top-week-left"
                      ><font-awesome-icon :icon="['fas', 'chevron-left']" class="cursor-pointer"
                    /></label>
                  </button>
                  <button @click="searchCarouselNext" class="hover:text-yellow px-2">
                    <label for="top-week-right" class="ml-[10px]"
                      ><font-awesome-icon :icon="['fas', 'chevron-right']" class="cusor-pointer"
                    /></label>
                  </button>
                </div>
              </div>
              <carousel :breakpoints="breakpoints" ref="searchCarousel">
                v-for="(item, index) in searchResponse.podcasts" :key="index"
                <slide
                  v-for="(item, index) in searchResponse.podcasts"
                  :key="index"
                  class="discover-slider flex flex-col flex-wrap gap-4 w-full rounded-md items-left relative cursor-pointer"
                  @click="showPodcast(item)"
                >
                  <div
                    class="slider-info bg-blue-deep-200 h-[220px] max-h-[220px] md:px-3 px-1 pt-1.8 pb-1.8 relative"
                  >
                    <div class="relative h-[155px] overflow-hidden">
                      <img
                        :src="item.logo || jollofEmpty"
                        class="block w-[155px] h-[155px] rounded-md"
                        height="200px"
                        width="155px"
                        alt="Episode"
                      />
                    </div>
                    <div class="text-left mt-[5px]">
                      <span
                        v-html="breakString(item.title ?? '', 10)"
                        class="text-left block md:text-sm text-[11px] mb-[-5px]"
                      ></span>
                      <span class="md:text-xs text-[9px] text-grey">{{
                        item.creator
                          ? item.creator.firstname + ' ' + item.creator.lastname
                          : item.podcast
                      }}</span>
                    </div>
                    <!-- <div class="screen absolute left-0 right-0 top-0 bottom-0 bg-[#0D192160]" :class="{'block' : playlistDropdown.id === item.id, 'hidden': playlistDropdown.id !== item.id }" @click="createPodcast(item)">
                                            <div class="relative flex items-center justify-center h-full">
                                                <div class="action absolute bottom-[14px] right-[10px] flex items-center">
                                                </div>
                                            </div>
                                        </div> -->
                  </div>
                </slide>
              </carousel>
            </div>
            <!-- Podcast found -->

            <!-- Podcast not found -->
            <!-- <div class="lg:w-[60%] h-[250px] lg:mb-0 mb-[40px]" v-else>
              <div v-if="search">
                <p class="text-[20px] mb-[15px]">Podcasts</p>
                <div
                  class="lg:h-[230px] h-[235px] flex flex-col items-center justify-center overflow-auto podcast text-white text-[70px]"
                >
                  <font-awesome-icon :icon="['fas', 'file-excel']" class="opacity-5" />
                  <p class="text-[20px] mt-[10px] opacity-60">No Podcast Found.</p>
                </div>
              </div>
            </div> -->
            <!-- Podcast not found -->
          </div>
        </div>
        <!-- <div v-else>
       
      </div> -->
      </div>
      <div v-if="loading">
        <div class="container mx-auto flex justify-between items-center text-white pt-7 pb-20 px-3">
          <div class="w-full">
            <!-- <div class="space-x-2 pt-[10px] mb-[45px]">
              <button class="bg-[#F0CF7B] rounded px-2.5 py-1.5" @click="router.back()">
                <svg
                  width="8"
                  height="13"
                  viewBox="0 0 8 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.33763 12.7419C6.06055 12.7419 5.78346 12.6398 5.56471 12.4211L0.416797 7.27314C-0.00611977 6.85023 -0.00611977 6.15023 0.416797 5.72731L5.56471 0.579395C5.98763 0.156478 6.68763 0.156478 7.11055 0.579395C7.53346 1.00231 7.53346 1.70231 7.11055 2.12523L2.73555 6.50023L7.11055 10.8752C7.53346 11.2981 7.53346 11.9981 7.11055 12.4211C6.90638 12.6398 6.6293 12.7419 6.33763 12.7419Z"
                    fill="#000000"
                  />
                </svg>
              </button>
              <span>Back</span>
            </div> -->
            <Skeletor class="block w-full h-[500px]" :circle="false" :height="500" />
            <!-- <EmptyPage messgae="No record found." /> -->
          </div>
        </div>
      </div>
    </div>
    <div v-else class="-m-20">
      <AllCategories />
    </div>
    <div
      class="container mx-auto flex justify-between items-center text-white pb-20 px-3"
      v-if="
        search &&
        searchResponse.categories.length < 1 &&
        searchResponse.episodes.length < 1 &&
        searchResponse.podcasts.length < 1
      "
    >
      <div class="w-full">
        <EmptyPage messgae="No record found." />
      </div>
    </div>
  </div>
</template>

<style scoped>
.carousel__item {
  min-height: 200px;
  /* width: 100%; */
  background-color: #642afb;
  color: white;
  font-size: 20px;
  border-radius: 8px;
  /* display: flex; */
  /* justify-content: center; */
  /* align-items: center; */
}
.carousel__slide {
  /* padding: 20px; */
}

.discover-slider .slider-info:hover .screen {
  display: block;
}

.pulse {
  width: 5rem;
  height: 5rem;
  margin: 0 auto;
  border-radius: 100%;
  background-color: white;
  opacity: 1;
  animation: pulse 1.5s infinite ease-in-out;
}

@keyframes pulse {
  0% {
    transform: scale(0);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}

@media (max-width: 600px) {
  .carousel__slide {
    padding: 4px;
  }
}

*::-webkit-scrollbar,
*::-webkit-scrollbar-thumb {
  width: 26px;
  border-radius: 13px;
  background-clip: padding-box;
  border: 10px solid transparent;
}

*::-webkit-scrollbar-thumb {
  box-shadow: inset 0 0 0 10px;
}

/* .podcast:hover {
  color: rgba(0, 0, 0, 0.3);
}

.podcast {
  background: white;
  padding: 20px;
  width: 200px;
  height: 100px;
  margin: 100px auto;
  border-radius: 3px;
  overflow: auto;
  color: rgba(0, 0, 0, 0);
  -webkit-text-fill-color: black;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  transition: color .3s ease;
} */
</style>
