<script setup lang="ts">
// import TheWelcome from '../components/TheWelcome.vue'
import SvgKShareIcon from '../../components/icons/KShareIcon.vue'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import {
  recommendedBreakpoints,
  episodesBreakpoints,
  categoryBreakpoints
} from '../../cores/carousel'
// import { gotoExternalRouteOnTab } from "@/cores/actions"
import { Skeletor } from 'vue-skeletor'
import { displayTextLimit } from '../../cores/behaviours'
import { ref, watch, onMounted, nextTick } from 'vue'
import axios from 'axios'
import { useRouter, useRoute } from 'vue-router'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
import { useAudioplayerStore } from '../../stores/audioplayer'
import { onClickOutside } from '@vueuse/core'
import { inject } from 'vue'
import ShareModel from '../../components/shared/ShareModel.vue'
import { gotoExternalRouteOnTab } from '../../cores/actions'
import jollofEmpty from '../../assets/images/jollofEmpty.jpg'

const $toast = useToast()
const player: any = useAudioplayerStore()
const playlist: any = ref()
const swal: any = inject('$swal')

const stationsCarousel = ref()
const stationsCarouselBottom = ref()
const episodesCarousel = ref()
const episodesCarouselBottom = ref()

const recommendedCarousel = ref()
const justAddedCarousel = ref()

const router = useRouter()
const route = useRoute()
const htmlRegexG = ref(/<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g)

const showShareModal = ref(false)
const showRoute = ref('')

const creators = ref()
const stations = ref([
  {
    id: 0,
    logo: '',
    title: '',
    state: '',
    frequency: '',
    slug: '',
    handles: {
      twitter: ''
    }
  }
])

const response: any = ref([])
const podcast: any = ref([
  {
    id: 0,
    logo: '',
    title: '',
    duration: '',
    description: ''
  }
])
const release: any = ref([
  {
    id: 0,
    logo: '',
    title: '',
    duration: '',
    description: ''
  }
])
const shuffle_pod: any = ref([
  {
    id: 0,
    logo: '',
    title: '',
    duration: '',
    description: ''
  }
])
const just_added = ref([
  {
    id: 0,
    logo: '',
    title: '',
    duration: '',
    description: ''
  }
])
const top_picks = ref([
  {
    id: 0,
    logo: '',
    title: '',
    duration: '',
    description: '',
    podcast: ''
  }
])

const category = ref([
  {
    id: 0,
    logo: '',
    name: ''
  }
])
const isLoadingStation = ref(true)
const isLoadingPodcast = ref(true)
const isLoadingCategory = ref(true)
const isPlaying = ref(false)
const playingId = ref()
const audioType = ref()

// axios
//   .get('services/streams')
//   .then((res) => {
//     response.value = res.data.data
//     release.value = response.value.release
//     latest.value = response.value.latest
//     trending.value = response.value.trending
//     toppick.value = response.value.toppick
//     podcast.value = response.value.podcast
//     isLoadingPodcast.value = false
//   })
//   .catch((error) => {
//     if (error.response) {
//       swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: error.response.data.message
//       })
//     } else {
//       swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: error.message
//       })
//     }
//   })

// axios
//   .get('services/playlist')
//   .then((res) => {
//     playlist.value = res.data.data

//     Object.keys(playlist.value).forEach((key) => {
//       if (!playlist.value[key].episodes.length) {
//         delete playlist.value[key]
//       }
//     })
//   })
//   .catch((error) => {
//     if (error.response) {
//       swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: error.response.data.message
//       })
//     } else {
//       swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: error.message
//       })
//     }
//   })

onMounted(async () => {
  //   await axios
  //     .get('services/stations')
  //     .then((res) => {
  //       stations.value = res.data.data.sort(function (a: any, b: any) {
  //         return 0.5 - Math.random()
  //       })
  //       random_stations.value = res.data.data.slice().sort(function (a: any, b: any) {
  //         return 0.5 - Math.random()
  //       })
  //       isLoadingStation.value = false
  //       // console.log(res)
  //     })
  //     .catch((error) => {
  //       if (error.response) {
  //         swal.fire({
  //           icon: 'error',
  //           title: 'Oops...',
  //           text: error.response.data.message
  //         })
  //       } else {
  //         swal.fire({
  //           icon: 'error',
  //           title: 'Oops...',
  //           text: error.message
  //         })
  //       }
  //     })

  axios
    .get('services/landing-page/')
    .then((res) => {
      response.value = res.data
      category.value = res.data.top_categories
      //   top_picks.value = response.value.top_picks
      shuffle_pod.value = response.value.shuffle_pod
      stations.value = response.value.stations
      podcast.value = response.value.new_podcasters
      just_added.value = response.value.just_added
      playlist.value = res.data.playlist
      isLoadingPodcast.value = false
      isLoadingCategory.value = false
      isLoadingStation.value = false

      //   Object.keys(playlist.value).forEach((key) => {
      //     if (!playlist.value[key].episodes.length) {
      //       delete playlist.value[key]
      //     }
      //   })
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

  if (route.query.station) {
    await nextTick()
    const selectedRadio = stations.value.find(
      (element: any) => element.slug === route.query.station
    )

    if (selectedRadio) {
      playSound(selectedRadio.id, 'radio', '', '', '', true)
    }

    // playMusic(selectedRadio, 'radio', 0, '')
    // localStorage.setItem('isPlaying', JSON.stringify(false));
  }
})

const stationCarouselNext = () => {
  stationsCarousel.value?.next()
  stationsCarouselBottom.value?.next()
}

const stationCarouselPrev = () => {
  stationsCarousel.value?.prev()
  stationsCarouselBottom.value?.prev()
}

const episodeCarouselNext = () => {
  episodesCarousel.value?.next()
  episodesCarouselBottom.value?.next()
}

const episodeCarouselPrev = () => {
  episodesCarousel.value?.prev()
  episodesCarouselBottom.value?.prev()
}

const recommendedCarouselNext = () => {
  recommendedCarousel.value?.next()
}

const recommendedCarouselPrev = () => {
  recommendedCarousel.value?.prev()
}
const justAddedNext = () => {
  justAddedCarousel.value?.next()
}

const justAddedPrev = () => {
  justAddedCarousel.value?.prev()
}

// is playing
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

const copyLink = (data: any) => {
  $toast.success('Copied!')
}

// sharing
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
    // showShareModal.value = true;
    navigator.share(shareData)
  }

  //   if (navigator.share) {
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

// play sound
const playSound = (
  index: any,
  type: string,
  playlist: string,
  state: string,
  data: any,
  isShared: boolean = false
) => {
  let object: any = type === 'episode' ? [] : stations.value
  player.audioType = type

  player.currentTrackIndex =
    type === 'episode' ? index : stations.value.findIndex((element: any) => element.id === index)

  if (state === 'static') {
    if (type === 'episode') {
      for (let key in response.value) {
        if (key === playlist) {
          object = response.value[key]
        }
      }
    }
  } else if (state === 'dynamic') {
    object = data
  }

  if (JSON.stringify(player.trackList) !== JSON.stringify(object)) {
    player.trackList = object
  }

  player.playPauseTrack(isShared)
}

// see all
const seeAll = (type: string, topic: any, items: any, extra: any, name: any) => {
  const data = {
    type: type,
    topic: topic,
    resource: items,
    extra: extra,
    name: name
  }
  localStorage.setItem('see-all', JSON.stringify(data))
  router.push({ name: 'view.all.type', params: { name: topic } })
}
</script>

<template>
  <div class="overflow-hidden pt-[50px] pb-10" v-if="true">
    <!-- Topr Banner/Hero  -->
    <div class="hero mx-auto relative">
      <div class="container mx-auto lg:mx-0">
        <div
          class="hero-text__wrapper text-white lg:absolute lg:right-[480px] sm:right-[0] top-[20px] lg:w-[300px] md:px-0 px-[15px] mt-10 lg:z-50 md:z-20"
        >
          <!-- <div class="container"> -->
          <div class="md:pt-6 pt-[50px]">
            <h1
              class="hero-header lg:text-[60px] md:text-[40px] sm:text-[35px] text-[35px] lg:leading-[61px] leading-[1.2em] font-[600] satoshi relative lg:w-[650px] w-auto z-50 mb-[20px] lg:tracking-[2px] tracking-[0.3px] capitalize lg:px-0 md:px-3"
            >
              Explore, create, learn, have fun.
            </h1>
            <p
              class="hero-text satoshi lg:w-[450px] md:text-[16px] text-[13px] font-[300] lg:leading-0 leading-[25px] lg:px-0 md:px-3"
            >
              Experience Jollof Radio: Where Podcasters, Listeners, and Advertisers Connect for
              Great Entertainment and Mutual Benefits.
            </p>
          </div>
          <div class="md:mt-[38.48px] mt-[22px] lg:px-0 md:px-3 px-0">
            <button
              class="main-button Manrope capitalize rounded-full md:text-[15px] text-[12px] flex bg-[#F0CF7B] md:px-[30px] px-[20px] md:!py-[15.5px] !py-[7px]"
              @click="gotoExternalRouteOnTab('https://app.jollofradio.com')"
            >
              Get started
            </button>
            <!-- </div> -->
          </div>
        </div>
      </div>
      <div class="relative block lg:hidden z-0">
        <img
          src="@/assets/images/hero-image/stars.png"
          alt=""
          class="absolute right-[10px] md:right-[100px] top-[30px] transform scale-75"
        />
      </div>
      <div class="overflow-hidden lg:h-[630px] md:h-[370px] h-[270px]">
        <div class="container mx-auto">
          <div
            class="hero-image__wrapper relative md:h-[650px] h-[150px] z-0 transform scale-50 sm:scale-[.5] lg:scale-[.85] md:translate-y-[-120px] md:translate-x-[-100px] lg:translate-y-[-70px] sm:translate-x-[-200px] sm:translate-y-[50px] translate-y-[50px] translate-x-[-100px] md:top-0 top-[-80px]"
          >
            <div class="md:block hidden">
              <img
                src="@/assets/images/hero-image/star-md.png"
                alt=""
                class="absolute top-[720px] left-[100px] w-[50px]"
              />
              <img
                src="@/assets/images/hero-image/star-sm.png"
                alt=""
                class="absolute top-[740px] left-[145px] w-[35px]"
              />
              <img
                src="@/assets/images/hero-image/star-sm.png"
                alt=""
                class="absolute top-[780px] left-[130px] w-[35px]"
              />
            </div>
            <img
              src="@/assets/images/hero-image/design1.png"
              alt=""
              class="absolute hidden md:!block sm:top-[500px] top-[650px] lg:left-[-140px] md:left-[-220px] left-[-260px] transform md:translate-x-0 md:translate-y-0 translate-y-[-325px] translate-x-[170px] md:rotate-[0] rotate-[60deg] w-[700px]"
            />
            <img
              src="@/assets/images/hero-image/moon.png"
              alt=""
              class="absolute top-[100px] lg:left-[130px] md:left-[40px] left-[50%] transform md:translate-x-[0] translate-x-[-50%] lg:w-[300px] md:w-[250px] w-[250px]"
            />
            <img
              src="@/assets/images/hero-image/arrow.png"
              alt=""
              class="absolute top-[24px] lg:left-[55px] md:left-[-45px] left-[50%] transform md:translate-x-0 translate-x-[-120%] w-[160px]"
            />
            <img
              src="@/assets/images/hero-image/model.png"
              alt=""
              class="absolute top-[140px] lg:left-[160px] md:left-[65px] left-[50%] transform md:translate-x-[0] translate-x-[-35%] md:w-[490px] w-[300px]"
            />
            <img
              src="@/assets/images/hero-image/design2.png"
              alt=""
              class="absolute lg:top-[600px] hidden md:!block lg:left-[-300px] md:top-[600px] md:left-[-380px] top-[720px] left-[-286px] transform md:translate-x-0 md:translate-y-0 translate-y-[-255px] translate-x-[200px] w-[700px]"
            />
          </div>
          <div class="opacity-40 md:transform translate-y-[-700px] translate-x-[140px]">
            <div class="xl:!block hidden">
              <img
                src="@/assets/images/hero-image/Frame2.png"
                alt=""
                class="frame absolute md:top-[252px] top-[1403px] md:right-[-90px] w-[503px] md:w-[500px] right-[-173px]"
              />
              <img
                src="@/assets/images/hero-image/Frame3.png"
                alt=""
                class="absolute md:top-[430px] top-[1589px] md:right-[-65px] right-[-75px] md:w-[480px] w-[400px]"
              />
              <img
                src="@/assets/images/hero-image/Frame4.png"
                alt=""
                class="absolute md:top-[440px] top-[1597px] md:right-[160px] right-[89px] md:w-[250px] w-[205px]"
              />
              <img
                src="@/assets/images/hero-image/waves.png"
                alt=""
                class="absolute top-[440px] right-[410px] w-[50px]"
              />
            </div>
            <div class="design relative h-[200px] hidden">
              <img
                src="@/assets/images/hero-image/mobilestyle.png"
                alt=""
                class="absolute right-[-140px] tranform translate-x-[-50px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Categories -->
    <div class="container mx-auto px-[15px] mt-7" v-if="category.length">
      <div class="space-y-2 satoshi">
        <div class="satoshi flex items-end justify-between text-white">
          <h4 class="md:text-2xl text-[20px] font-medium">Top Categories</h4>
          <div class="flex items-center">
            <!-- <div>
                    <button class="hover:text-yellow" @click="recommendedCarouselPrev()">
                        <label for="top-week-left" class="pointer-cursor"><font-awesome-icon :icon="['fas', 'chevron-left']" class="cursor-pointer" /></label>
                    </button>
                    <button class="hover:text-yellow" @click="recommendedCarouselNext()">
                        <label for="top-week-right" class="ml-[10px] pointer-cursor"><font-awesome-icon :icon="['fas', 'chevron-right']" class="cursor-pointer" /></label>
                    </button>
                </div> -->
            <span
              class="text-yellow cursor-pointer ml-[10px] text-[20px] hover:text-[#F0CF7B]"
              @click="isLoadingStation ? '' : $router.push('/categories')"
              >See all</span
            >
          </div>
        </div>

        <div class="text-white">
          <carousel :breakpoints="categoryBreakpoints" v-if="!isLoadingCategory">
            <slide
              v-for="(item, index) in category.slice(0, 12)"
              :key="index"
              class="episodeSlider"
            >
              <div
                class="slider-info w-full bg-blue-deep-200 relative md:pr-3 pr-1 pt-2.5 pb-2 rounded-md cursor-pointer"
                @click="$router.push({ name: 'view.single.category', params: { name: item.name } })"
              >
                <div class="relative aspect-square rounded-md overflow-hidden">
                  <img
                    :src="item.logo || jollofEmpty"
                    class="block h-[196.33px] w-[196.33px] rounded-md"
                    height="196.33px"
                    width="196.33px"
                    alt="Category"
                  />
                  <div
                    class="absolute top-0 item-center sm:w-[196.33px] w-full h-[40px] leading-[40px] bg-black/50"
                  >
                    <span class="text-[12px] text-white">{{ item.name }}</span>
                  </div>
                </div>
              </div>
            </slide>
          </carousel>

          <carousel :breakpoints="categoryBreakpoints" v-else>
            <!-- <slide v-for="(item, index) in 6" :key="index" class="discover-slider">
                        <div class="slider-info h-[405.43px] overflow-hidden px-0 relative rounded-md">
                            <Skeletor class="block w-full h-[155px]" style="border-radius: 0; width: 600px; height: 500px;" />
                            <div class="transparent absolute h-[99.59px] w-full bottom-0">
                                
                            </div>
                            <div class="tag w-full absolute bottom-0 h-[99.59px] text-left py-[18px] px-[28px] bg-[rgba(0,0,0, 0.4)] overflow-hidden">
                                <Skeletor class="h-full w-full mb-[5px]" style="height: 25px; width: 100%;" />
                                <Skeletor class="h-full w-full" style="height: 10px; width: 100%;" />
                            </div>
                            <div class="screen absolute h-full w-full left-0 right-0 top-0 bottom-0 bg-[#0D192160] opacity-0">
                                <div class="relative flex items-center justify-center h-full">
                                </div>
                            </div>
                        </div>
                    </slide> -->
            <slide v-for="(item, index) in 6" :key="index">
              <div
                class="slider-info w-full bg-blue-deep-200 relative md:pr-3 pr-1 pt-2.5 pb-2 rounded-md"
              >
                <div class="relative h-[155px] !w-full overflow-hidden">
                  <Skeletor class="block w-full h-[155px]" style="border-radius: 0" />
                </div>
              </div>
            </slide>
          </carousel>
        </div>
      </div>
    </div>

    <!-- Banner -->
    <div class="container mx-auto px-[15px] mt-7">
      <div class="ad-container relative bg-[#22a38f] w-full h-[350px] rounded-md overflow-hidden">
        <img
          src="@/assets/images/jollof-radio-shape-3.png"
          class="absolute bottom-0 md:left-0 left-5 md:w-auto w-[90%]"
        />
        <div class="ad-text sm:pl-[45px] relative space-y-6 mt-[65px]">
          <h1
            class="md:text-[45px] text-[35px] leading-[44px] text-white font-black satoshi relative z-50"
          >
            Get a worthwhile discount/get an amazing discount
          </h1>
          <button class="bg-[#F0CF7B] p-1 px-6 rounded-full cursor-pointer">
            Set up your free ad account
          </button>
          <p class="text-white">You only get billed when someone listens to your ads</p>
        </div>
        <div class="relative w-full">
          <img
            src="@/assets/images/IMG_2988-200x300.png"
            class="avatar absolute bottom-0 transform translate-x-[-50%] left-[50%]"
          />
        </div>
      </div>
    </div>

    <!-- Shuffle Pod -->
    <div class="container mx-auto px-[15px] mt-7" v-if="shuffle_pod.length">
      <!-- section -->
      <div class="space-y-2 satoshi mb-[30px]">
        <div class="flex items-end justify-between text-white">
          <h4 class="md:text-2xl text-[20px] font-medium hover:text-[#F0CF7B]">Shuffle Pod 247</h4>
          <div class="flex items-center space-x-2">
            <div>
              <button class="hover:text-yellow" @click="episodeCarouselPrev()">
                <label for="top-week-left" class="pointer-cursor"
                  ><font-awesome-icon :icon="['fas', 'chevron-left']" class="cursor-pointer"
                /></label>
              </button>
              <button class="hover:text-yellow" @click="episodeCarouselNext()">
                <label for="top-week-right" class="ml-[10px] pointer-cursor"
                  ><font-awesome-icon :icon="['fas', 'chevron-right']" class="cursor-pointer"
                /></label>
              </button>
            </div>
            <!-- <span
              class="text-yellow text-xl font-medium cursor-pointer"
              @click="
                isLoadingPodcast
                  ? ''
                  : seeAll('episodes', 'Shuffle Pod 247', shuffle_pod, response, 'latest')
              "
              >See all</span
            > -->
          </div>
        </div>

        <div class="">
          <!-- cards -->
          <carousel
            :breakpoints="episodesBreakpoints"
            ref="episodesCarousel"
            v-if="!isLoadingPodcast"
            class=""
          >
            <slide
              v-for="(item, index) in shuffle_pod.slice(0, 20)"
              :key="index"
              class="episodeSlider"
            >
              <div
                class="slider-info w-full bg-blue-deep-200 relative md:pr-3 pr-1 pt-2.5 pb-2 rounded-md"
              >
                <div class="relative w-full aspect-square xl:h-[200px] overflow-hidden">
                  <img
                    :src="item.logo || jollofEmpty"
                    class="block aspect-square w-[196.33px] h-[196.33px] rounded-md"
                    height="196.33px"
                    width="196.33px"
                    alt="Episode"
                  />
                  <!-- <span 
                                    class="absolute bottom-1 left-2 bg-blue-deep-100/40 py-1 px-2 text-[8px] rounded-full">{{ item.duration }}</span> -->
                </div>
                <div class="text-left">
                  <span
                    v-html="displayTextLimit(item.title, 13)"
                    class="text-left text-white block md:text-sm text-[14px] mb-[-5px]"
                  ></span>
                  <!-- <span v-html="item.description ? displayTextLimit(item.description, 20) : ' '" class="md:text-xs text-[10px] text-[grey]"></span> -->
                </div>
                <div
                  class="screen absolute w-[196.33px] left-0 right-0 top-0 bottom-0 bg-[#0D192160] opacity-0"
                  @click="playSound(index, 'episode', 'shuffle_pod', 'static', '')"
                >
                  <div class="relative flex items-center justify-center h-full">
                    <button
                      type="button"
                      class="playpause-track flex items-center justify-center absolute text-[23px] bg-[#F0CF7B] w-[50px] h-[50px] rounded-full text-[#030F18]"
                    >
                      <font-awesome-icon
                        :icon="['fas', 'play']"
                        v-if="!player.isPlaying || player.currentTrackId !== item.id"
                      />
                      <font-awesome-icon v-else :icon="['fas', 'pause']" />
                    </button>
                    <div class="action absolute bottom-[14px] right-[10px] flex items-center">
                      <!-- <button @click="likeAction(item.id, item.liked, index, 'recnt')">
                                            <SvgKLoveFilled v-if="item.liked" />
                                            <SvgKLoveIcon v-else />
                                        </button> -->
                      <!-- <button>
                                            <svg class="ml-[5px]" width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                                <path d="M13.5729 10.8691C14.3062 10.8691 14.9063 10.2316 14.9063 9.45247C14.9063 8.67331 14.3063 8.03581 13.5729 8.03581C12.8396 8.03581 12.2396 8.67331 12.2396 9.45247C12.2396 10.2316 12.8396 10.8691 13.5729 10.8691Z" fill="#ffffff"/>
                                                <path d="M4.23893 10.8691C4.97227 10.8691 5.57227 10.2316 5.57227 9.45247C5.57227 8.67331 4.97227 8.03581 4.23893 8.03581C3.5056 8.03581 2.9056 8.67331 2.9056 9.45247C2.9056 10.2316 3.5056 10.8691 4.23893 10.8691Z" fill="#ffffff"/>
                                                <path d="M8.9069 10.8691C9.64023 10.8691 10.2402 10.2316 10.2402 9.45247C10.2402 8.67331 9.64023 8.03581 8.9069 8.03581C8.17357 8.03581 7.57357 8.67331 7.57357 9.45247C7.57357 10.2316 8.17357 10.8691 8.9069 10.8691Z" fill="#ffffff"/>
                                            </svg>
                                        </button> -->
                    </div>
                  </div>
                </div>
                <!-- <div class="screen absolute left-0 right-0 top-0 bottom-0 bg-[#0D192160]"></div> -->
              </div>
            </slide>
          </carousel>
          <div v-else class="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 grid-cols-2 gap-2">
            <div
              v-for="(item, index) in 6"
              :key="index"
              class="flex flex-col gap-4 w-full items-left relative rounded-md"
            >
              <div class="slider-info w-full bg-blue-deep-200 relative md:pr-3 pr-1 pt-2.5 pb-2">
                <div class="relative w-full h-[155px] overflow-hidden">
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
          <!--  -->
        </div>
      </div>
    </div>

    <!-- Radio 247 -->
    <div class="container relative mx-auto px-[15px] mt-7" v-if="stations.length">
      <div class="container mx-auto bg-blue-deep-100 rounded-t-[10px] text-white satoshi">
        <div class="text-white space-y-2 mx-auto">
          <div class="flex items-end justify-between">
            <h4 class="md:text-2xl text-[20px] font-medium hover:text-[#F0CF7B]">RADIO 247</h4>
            <div class="flex items-center space-x-2">
              <!-- <div>
                            <button class="hover:text-yellow" @click="stationCarouselPrev()">
                                <label for="top-week-left" class="pointer-cursor"><font-awesome-icon :icon="['fas', 'chevron-left']" class="cursor-pointer" /></label>
                            </button>
                            <button class="hover:text-yellow" @click="stationCarouselNext()">
                                <label for="top-week-right" class="ml-[10px] pointer-cursor"><font-awesome-icon :icon="['fas', 'chevron-right']" class="cursor-pointer" /></label>
                            </button>
                        </div> -->
              <span
                class="text-yellow text-xl font-medium cursor-pointer"
                @click="isLoadingStation ? '' : $router.push('/station')"
                >See all</span
              >
            </div>
          </div>

          <!--  -->
          <div class="space-y-4">
            <div
              class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 xl:gap-4 sm:gap-3 gap-6"
              v-if="!isLoadingStation"
            >
              <div v-for="(item, index) in stations.slice(0, 6)" :key="index" class="stationSlider">
                <div class="flex items-center bg-[#12222D] rounded-md w-full aspect-[1/auto] px-2">
                  <div
                    class="md:w-[95px] md:h-full w-[60px] h-[60px] rounded-md overflow-hidden"
                    @click="playSound(item.id, 'radio', '', '', '')"
                  >
                    <img :src="item.logo || jollofEmpty" alt="radio h-full" class="aspect-square" />
                  </div>
                  <div class="space-y-4 md:py-[15px] flex-grow lg:px-[10px] px-[20px] pr-0">
                    <div
                      class="flex flex-grow items-start md:space-x-1 pt-2"
                      @click="playSound(item.id, 'radio', '', '', '')"
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
                          @click="gotoExternalRouteOnTab(item.handles.twitter)"
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
            <div
              v-else
              class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 xl:gap-12 sm:gap-3 gap-6"
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
      </div>
    </div>

    <!-- New Podcasters -->
    <div class="container mx-auto px-[15px] mt-7" v-if="podcast.length">
      <div class="space-y-2 satoshi">
        <div class="satoshi flex items-end justify-between text-white">
          <h4 class="md:text-2xl text-[20px] font-medium">New Podcasters</h4>
          <div class="flex items-center">
            <div>
              <button class="hover:text-yellow" @click="recommendedCarouselPrev()">
                <label for="top-week-left" class="pointer-cursor"
                  ><font-awesome-icon :icon="['fas', 'chevron-left']" class="cursor-pointer"
                /></label>
              </button>
              <button class="hover:text-yellow" @click="recommendedCarouselNext()">
                <label for="top-week-right" class="ml-[10px] pointer-cursor"
                  ><font-awesome-icon :icon="['fas', 'chevron-right']" class="cursor-pointer"
                /></label>
              </button>
            </div>
            <!-- <span
              class="text-yellow cursor-pointer ml-[10px] text-[20px] hover:text-[#F0CF7B]"
              @click="
                isLoadingPodcast ? '' : seeAll('podcasts', 'New Podcasters', podcast, {}, 'podcast')
              "
              >See all</span
            > -->
          </div>
        </div>

        <div class="text-white">
          <carousel
            :breakpoints="recommendedBreakpoints"
            ref="recommendedCarousel"
            v-if="!isLoadingPodcast"
          >
            <slide v-for="(item, index) in podcast.slice(0, 12)" :key="index" class="episodeSlider">
              <div
                class="slider-info w-full bg-blue-deep-200 relative md:pr-3 pr-1 pt-2.5 pb-2 rounded-md"
              >
                <div class="relative w-full aspect-square xl:h-[200px] overflow-hidden">
                  <img
                    :src="item.logo || jollofEmpty"
                    class="block aspect-square w-[174.56px] h-[174.56px] rounded-md"
                    height="174.56px"
                    width="174.56px"
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
                    item.item_count + ' Episode'
                  }}</span>
                </div>
                <div
                  class="screen absolute w-[196.33px] left-0 right-0 top-0 bottom-0 bg-[#0D192160] opacity-0"
                >
                  <div
                    class="relative flex items-center justify-center h-full"
                    @click="$router.push({ name: 'view-podcast', params: { name: item.id } })"
                  >
                    <!-- <button type="button" class="playpause-track flex items-center justify-center absolute text-[23px] bg-[#F0CF7B] w-[50px] h-[50px] rounded-full text-[#030F18]">
                                        <font-awesome-icon  :icon="['fas', 'play']" v-if="!player.isPlaying || player.currentTrackId !== item.id" />
                                        <font-awesome-icon v-else :icon="['fas', 'pause']" />
                                    </button> -->
                    <div class="action absolute bottom-[14px] right-[10px] flex items-center"></div>
                  </div>
                </div>
                <!-- <div class="screen absolute left-0 right-0 top-0 bottom-0 bg-[#0D192160]"></div> -->
              </div>
            </slide>
            <!-- <slide v-for="(item, index) in release" :key="index" class="discover-slider rounded-md" @click="$router.push({ name: 'view-podcast', params: {name: item.id}})">
                        <div class="slider-info h-[405px] overflow-hidden px-0 relative rounded-md">
                            <img :src="item.logo" class="h-[500px] w-[600px] rounded-md" />
                            <div class="transparent absolute h-[99.59px] w-full bottom-0">
                                
                            </div>
                            <div class="w-full absolute bottom-0 h-[99.59px] text-left py-[18px] px-[28px]">
                                <div class="tag w-full absolute bottom-[-20px] h-[99.59px] text-left bg-[rgba(0,0,0, 0.4)]">
                                    <p v-html="displayTextLimit(item.description, 22)" class="lg:text-[24px] text-[18px]  mb-[5px]"></p>
                                    <p v-html="displayTextLimit(item.title, 60)" class="text-[14px]"></p>
                                </div>
                            </div>
                            <div class="screen absolute h-full w-full left-0 right-0 top-0 bottom-0 bg-[#0D192160] opacity-0">
                                <div class="relative flex items-center justify-center h-full">
                                </div>
                            </div>
                        </div>
                    </slide> -->
          </carousel>

          <carousel :breakpoints="recommendedBreakpoints" ref="recommendedCarousel" v-else>
            <!-- <slide v-for="(item, index) in 6" :key="index" class="discover-slider">
                        <div class="slider-info h-[405.43px] overflow-hidden px-0 relative rounded-md">
                            <Skeletor class="block w-full h-[155px]" style="border-radius: 0; width: 600px; height: 500px;" />
                            <div class="transparent absolute h-[99.59px] w-full bottom-0">
                                
                            </div>
                            <div class="tag w-full absolute bottom-0 h-[99.59px] text-left py-[18px] px-[28px] bg-[rgba(0,0,0, 0.4)] overflow-hidden">
                                <Skeletor class="h-full w-full mb-[5px]" style="height: 25px; width: 100%;" />
                                <Skeletor class="h-full w-full" style="height: 10px; width: 100%;" />
                            </div>
                            <div class="screen absolute h-full w-full left-0 right-0 top-0 bottom-0 bg-[#0D192160] opacity-0">
                                <div class="relative flex items-center justify-center h-full">
                                </div>
                            </div>
                        </div>
                    </slide> -->
            <slide v-for="(item, index) in 6" :key="index">
              <div
                class="slider-info w-full bg-blue-deep-200 relative md:pr-3 pr-1 pt-2.5 pb-2 rounded-md"
              >
                <div class="relative h-[155px] !w-full overflow-hidden">
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
            </slide>
          </carousel>
        </div>
      </div>
    </div>

    <!-- Just Added -->
    <div class="container mx-auto px-[15px] mt-7" v-if="just_added.length">
      <!-- section -->
      <div class="space-y-2 satoshi mb-[30px]">
        <div class="flex items-end justify-between text-white">
          <h4 class="md:text-2xl text-[20px] font-medium hover:text-[#F0CF7B]">Just Added</h4>
          <div class="flex items-center space-x-2">
            <div>
              <button class="hover:text-yellow" @click="justAddedPrev()">
                <label for="top-week-left" class="pointer-cursor"
                  ><font-awesome-icon :icon="['fas', 'chevron-left']" class="cursor-pointer"
                /></label>
              </button>
              <button class="hover:text-yellow" @click="justAddedNext()">
                <label for="top-week-right" class="ml-[10px] pointer-cursor"
                  ><font-awesome-icon :icon="['fas', 'chevron-right']" class="cursor-pointer"
                /></label>
              </button>
            </div>
            <!-- <span
              class="text-yellow text-xl font-medium cursor-pointer"
              @click="
                isLoadingPodcast
                  ? ''
                  : seeAll('episodes', 'Just Added', just_added, response, 'latest')
              "
              >See all</span
            > -->
          </div>
        </div>

        <div class="">
          <!-- cards -->
          <carousel
            :breakpoints="recommendedBreakpoints"
            ref="justAddedCarousel"
            v-if="!isLoadingPodcast"
            class=""
          >
            <slide v-for="(item, index) in just_added" :key="index" class="episodeSlider">
              <div
                class="slider-info w-full bg-blue-deep-200 relative md:pr-3 pr-1 pt-2.5 pb-2 rounded-md"
              >
                <div class="relative w-full aspect-square xl:h-[200px] overflow-hidden">
                  <img
                    :src="item.logo || jollofEmpty"
                    class="block aspect-square w-[196.33px] h-[196.33px] rounded-md object-contain"
                    height="196.33"
                    width="196.33"
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
                  <!-- <span v-html="item.description ? displayTextLimit(item.description, 20) : ' '" class="md:text-xs text-[10px] text-[grey]"></span> -->
                </div>
                <div
                  class="screen absolute w-[196.33px] left-0 right-0 top-0 bottom-0 bg-[#0D192160] opacity-0"
                  @click="playSound(index, 'episode', 'just_added', 'static', '')"
                >
                  <div class="relative flex items-center justify-center h-full">
                    <button
                      type="button"
                      class="playpause-track flex items-center justify-center absolute text-[23px] bg-[#F0CF7B] w-[50px] h-[50px] rounded-full text-[#030F18]"
                    >
                      <font-awesome-icon
                        :icon="['fas', 'play']"
                        v-if="!player.isPlaying || player.currentTrackId !== item.id"
                      />
                      <font-awesome-icon v-else :icon="['fas', 'pause']" />
                    </button>
                    <div class="action absolute bottom-[14px] right-[10px] flex items-center">
                      <!-- <button @click="likeAction(item.id, item.liked, index, 'recnt')">
                                            <SvgKLoveFilled v-if="item.liked" />
                                            <SvgKLoveIcon v-else />
                                        </button> -->
                      <!-- <button>
                                            <svg class="ml-[5px]" width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                                <path d="M13.5729 10.8691C14.3062 10.8691 14.9063 10.2316 14.9063 9.45247C14.9063 8.67331 14.3063 8.03581 13.5729 8.03581C12.8396 8.03581 12.2396 8.67331 12.2396 9.45247C12.2396 10.2316 12.8396 10.8691 13.5729 10.8691Z" fill="#ffffff"/>
                                                <path d="M4.23893 10.8691C4.97227 10.8691 5.57227 10.2316 5.57227 9.45247C5.57227 8.67331 4.97227 8.03581 4.23893 8.03581C3.5056 8.03581 2.9056 8.67331 2.9056 9.45247C2.9056 10.2316 3.5056 10.8691 4.23893 10.8691Z" fill="#ffffff"/>
                                                <path d="M8.9069 10.8691C9.64023 10.8691 10.2402 10.2316 10.2402 9.45247C10.2402 8.67331 9.64023 8.03581 8.9069 8.03581C8.17357 8.03581 7.57357 8.67331 7.57357 9.45247C7.57357 10.2316 8.17357 10.8691 8.9069 10.8691Z" fill="#ffffff"/>
                                            </svg>
                                        </button> -->
                    </div>
                  </div>
                </div>
                <!-- <div class="screen absolute left-0 right-0 top-0 bottom-0 bg-[#0D192160]"></div> -->
              </div>
            </slide>
          </carousel>
          <div v-else class="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 grid-cols-2 gap-2">
            <div
              v-for="(item, index) in 6"
              :key="index"
              class="flex flex-col gap-4 w-full items-left relative rounded-md"
            >
              <div class="slider-info w-full bg-blue-deep-200 relative md:pr-3 pr-1 pt-2.5 pb-2">
                <div class="relative w-full h-[155px] overflow-hidden">
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
          <!--  -->
        </div>
      </div>
    </div>

    <!-- Custom Playlist -->
    <div class="container mx-auto px-[15px] mt-7">
      <!-- section -->
      <div class="space-y-2 satoshi mb-[30px]" v-for="(value, key) in playlist" :key="key">
        <div v-if="!isLoadingPodcast">
          <div class="flex items-end justify-between text-white">
            <h4 class="md:text-2xl text-[20px] font-medium hover:text-[#F0CF7B]">{{ key }}</h4>
            <div class="flex items-center space-x-2">
              <div>
                <!-- <button class="hover:text-yellow" @click="episodeCarouselPrev()">
                            <label for="top-week-left" class="pointer-cursor"><font-awesome-icon :icon="['fas', 'chevron-left']" class="cursor-pointer" /></label>
                        </button>
                        <button class="hover:text-yellow" @click="episodeCarouselNext()">
                            <label for="top-week-right" class="ml-[10px] pointer-cursor"><font-awesome-icon :icon="['fas', 'chevron-right']" class="cursor-pointer" /></label>
                        </button> -->
              </div>
              <span
                class="text-yellow text-xl font-medium cursor-pointer"
                @click="
                  isLoadingPodcast
                    ? ''
                    : seeAll('episodes', key, playlist[key].episodes, '', 'Custom Playlist')
                "
                >See all</span
              >
            </div>
          </div>

          <div class="">
            <!-- cards -->
            <carousel :breakpoints="episodesBreakpoints" ref="episodesCarousel" class="">
              <slide
                v-for="(item, index) in playlist[key].episodes"
                :key="index"
                class="episodeSlider"
              >
                <div
                  class="slider-info w-full bg-blue-deep-200 relative md:pr-3 pr-1 pt-2.5 pb-2 rounded-md"
                >
                  <div class="relative aspect-square xl:h-[200px] overflow-hidden">
                    <img
                      :src="item.logo || jollofEmpty"
                      class="block w-[196.33px] h-[196.33px] rounded-md object-contain"
                      height="196.33"
                      width="196.33"
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
                    <!-- <span v-html="item.description ? displayTextLimit(item.description, 20) : ' '" class="md:text-xs text-[10px] text-[grey]"></span> -->
                  </div>
                  <div
                    class="screen absolute w-[196.33px] left-0 right-0 top-0 bottom-0 bg-[#0D192160] opacity-0"
                    @click="
                      playSound(index, 'episode', 'just_added', 'dynamic', playlist[key].episodes)
                    "
                  >
                    <div class="relative flex items-center justify-center h-full">
                      <button
                        type="button"
                        class="playpause-track flex items-center justify-center absolute text-[23px] bg-[#F0CF7B] w-[50px] h-[50px] rounded-full text-[#030F18]"
                      >
                        <font-awesome-icon
                          :icon="['fas', 'play']"
                          v-if="!player.isPlaying || player.currentTrackId !== item.id"
                        />
                        <font-awesome-icon v-else :icon="['fas', 'pause']" />
                      </button>
                      <div class="action absolute bottom-[14px] right-[10px] flex items-center">
                        <!-- <button @click="likeAction(item.id, item.liked, index, 'recnt')">
                                                <SvgKLoveFilled v-if="item.liked" />
                                                <SvgKLoveIcon v-else />
                                            </button> -->
                        <!-- <button>
                                                <svg class="ml-[5px]" width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                                    <path d="M13.5729 10.8691C14.3062 10.8691 14.9063 10.2316 14.9063 9.45247C14.9063 8.67331 14.3063 8.03581 13.5729 8.03581C12.8396 8.03581 12.2396 8.67331 12.2396 9.45247C12.2396 10.2316 12.8396 10.8691 13.5729 10.8691Z" fill="#ffffff"/>
                                                    <path d="M4.23893 10.8691C4.97227 10.8691 5.57227 10.2316 5.57227 9.45247C5.57227 8.67331 4.97227 8.03581 4.23893 8.03581C3.5056 8.03581 2.9056 8.67331 2.9056 9.45247C2.9056 10.2316 3.5056 10.8691 4.23893 10.8691Z" fill="#ffffff"/>
                                                    <path d="M8.9069 10.8691C9.64023 10.8691 10.2402 10.2316 10.2402 9.45247C10.2402 8.67331 9.64023 8.03581 8.9069 8.03581C8.17357 8.03581 7.57357 8.67331 7.57357 9.45247C7.57357 10.2316 8.17357 10.8691 8.9069 10.8691Z" fill="#ffffff"/>
                                                </svg>
                                            </button> -->
                      </div>
                    </div>
                  </div>
                  <!-- <div class="screen absolute left-0 right-0 top-0 bottom-0 bg-[#0D192160]"></div> -->
                </div>
              </slide>
            </carousel>
          </div>
        </div>
        <div v-else class="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 grid-cols-2 gap-2">
          <div
            v-for="(item, index) in 2"
            :key="index"
            class="flex flex-col gap-4 w-full items-left relative rounded-md"
          >
            <div class="slider-info w-full bg-blue-deep-200 relative md:pr-3 pr-1 pt-2.5 pb-2">
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
        <!--  -->
      </div>
    </div>

    <!-- Creator -->
    <div class="container mx-auto mt-7" v-if="false">
      <div class="flex justify-between">
        <p class="text-[25px] text-white font-light mt-[40px]">Creator</p>
      </div>
      <carousel
        :breakpoints="episodesBreakpoints"
        ref="episodesCarouselBottom"
        v-if="isLoadingPodcast"
        class=""
      >
        <slide v-for="(item, index) in just_added" :key="index" class="episodeSlider">
          <Skeletor style="aspect-ratio: 1/1" />
        </slide>
      </carousel>
    </div>

    <!-- Share -->
    <ShareModel v-if="showShareModal" :route="showRoute" @close="showShareModal = false" />
  </div>
  <!-- <div class="container mx-auto">
    <div class="grid grid-cols-6 gap-3  pt-[50px] pb-[150px]">
        <div v-for="(item, index) in 20" :key="index" class="bg-red-100">

        </div>
    </div>
  </div> -->
</template>

<style scoped>
@media (max-width: 1279px) and (min-width: 1024px) {
  .hero-header {
    width: 580px;
  }
}

/* @media (max-width: 1023px) and (min-width: 768px){
    .hero-image__wrapper{
        transform: translateY(300px)
    }
} */

.ad-container {
  display: grid;
  grid-template-columns: 8fr 4fr;
}

@media (max-width: 800px) {
  .ad-container {
    display: grid;
    height: 600px;
    grid-template-columns: 1fr;
    padding: 20px;
    overflow: hidden !important;
  }

  .ad-container .ad-text {
    padding: 0;
  }

  .ad-container .avatar {
    bottom: -20px;
  }
}

@media (max-width: 1279px) {
  .hero-text__wrapper {
    @apply !right-[240px];
  }
}

@media (max-width: 636px) {
  .hero-image__wrapper {
    @apply !translate-x-[-200px];
  }
}

@media (max-width: 482px) {
  .hero-image__wrapper {
    @apply !translate-x-[-130px];
  }
}

@media (max-width: 404px) {
  .hero-image__wrapper {
    @apply !translate-x-[-100px];
  }
}

@media (max-width: 320px) {
  .hero-image__wrapper {
    @apply !translate-x-[-80px];
  }
}

.carousel__item {
  /* min-height: 200px; */
  /* width: 100%; */
  background-color: #642afb;
  color: white;
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.carousel__slide {
  /* padding: 5px; */
}

@media (min-width: 1200px) {
  .stationSlider {
    /* padding-right: 50px */
  }
}

.episodeSlider {
  padding-left: 0;
}

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

@media (min-width: 640px) and (max-width: 767px) {
  .hero-text {
    width: auto;
  }
}
</style>
