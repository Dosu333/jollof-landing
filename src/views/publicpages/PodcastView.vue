<script lang="ts" setup>
import {
  SvgKHorizontalMenu,
  SvgKKArrowLeft,
  SvgKLoveIcon,
  SvgKPlayIcon,
  SvgKShareIcon
} from '../../core/icons'
import { useRouter, useRoute } from 'vue-router'
import { ref, onMounted, watch, nextTick } from 'vue'
import axios from 'axios'
import { getAudioDuration } from '../../core/helper'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
import EmptyPage from '../../components/shared/EmptyPage.vue'
import { useAudioplayerStore } from '../../stores/audioplayer'
import ShareModel from '../../components/shared/ShareModel.vue'
import jollofEmpty from '../../assets/images/jollofEmpty.jpg'

const $toast = useToast()
const router = useRouter()
const route = useRoute()

const podcast_name = ref('')

const isPlaying = ref(false)
const playingId = ref(0)
const liked = ref(false)
const slug = ref('')
const audioType = ref()
const loading = ref(true)
const player: any = useAudioplayerStore()

const showShareModal = ref(false)
const showRoute = ref('')

let podcast: any = ref({
  id: 0,
  logo: '',
  title: 'loading..',
  slug: '',
  description: '',
  liked: false,
  subscribers: 0,
  episodes: [
    {
      id: 0,
      logo: '',
      title: '',
      source: '',
      description: '',
      duration: ''
    }
  ]
})
let view = {
  id: 0,
  slug: '',
  photo: '',
  firstname: '',
  lastname: '',
  followers: [{ user_id: 0 }],
  podcasts: [
    {
      logo: '',
      slug: '',
      title: '',
      subscribers: 0,
      creator: {
        firstname: '',
        lastname: ''
      }
    }
  ]
}

onMounted(async () => {
  // const existPlaying = podcasts.findIndex((element:any) => {
  //     console.log(element);
  // })
  console.log(route)

  await axios
    .get(`services/podcast/${route.params.name}/`)
    .then((res: any) => {
      if (res.data.approved) {
        podcast.value = res.data
        podcast.value.episodes = getAudioDuration(podcast.value.episodes)
        podcast_name.value = podcast.value.title
        localStorage.setItem('podcast_name', JSON.stringify(podcast_name.value))
        loading.value = false
      } else {
        loading.value = false
        // router.push('/not-found');
      }
    })
    .catch((e: any) => {
      if (e) {
        loading.value = false
        // router.push('/not-found');
      }
    })

  if (route.query.episode) {
    await nextTick()
    const startfrom = podcast.value.episodes.findIndex(
      (element: any) => element.slug === route.query.episode
    )

    playSound(startfrom, 'episode', '', true)
    // const selectedEpisode = podcast.value.episodes.find((element:any) => element.slug === route.query.episode)

    // playMusic(podcast.value, 'episode', startfrom, 'playFrom')
    // localStorage.setItem('isPlaying', JSON.stringify(false));
  } else {
    await nextTick()
  }
})

function breakString(text: string, length: number) {
  if (text && text && text.length > length) {
    return text.substring(0, length) + '...'
  } else {
    return text
  }
}

setInterval(() => {
  if (
    localStorage.getItem('isPlaying') &&
    JSON.parse(localStorage.getItem('isPlaying') ?? '') == true
  ) {
    if (
      localStorage.getItem('podcast_name') &&
      JSON.parse(localStorage.getItem('podcast_name') ?? '') === podcast.value.title
    ) {
      if (localStorage.getItem('playingId')) {
        playingId.value = JSON.parse(localStorage.getItem('playingId') ?? '') ?? 0
        isPlaying.value = JSON.parse(localStorage.getItem('isPlaying') ?? '')
      }
    }
  } else {
    isPlaying.value = false
    playingId.value = 0
  }
}, 1000)

const playMusic = (item: any, type: string, index: number, category: any) => {
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
    object = podcast.value.episodes ?? []
  }

  // localStorage.removeItem('player_details');
  localStorage.removeItem('liked')

  localStorage.setItem(
    'player_details',
    JSON.stringify(
      type === 'episode'
        ? {
            startWith:
              category === 'playAll' && localStorage.getItem('player_details')
                ? JSON.parse(localStorage.getItem('player_details') ?? '').startWith
                : index,
            podcasts: object
          }
        : { startWith: 0, podcasts: object }
    )
  )

  localStorage.setItem('liked', JSON.stringify({ id: object.id, liked: object.liked }))
  localStorage.setItem('audio-type', JSON.stringify(type === 'episode' ? 'podcasts' : 'radio'))
  audioType.value = JSON.parse(localStorage.getItem('audio-type') ?? '') ?? ''

  if (
    localStorage.getItem('isPlaying') &&
    JSON.parse(localStorage.getItem('isPlaying') ?? '') == true &&
    localStorage.getItem('podcast_name') &&
    JSON.parse(localStorage.getItem('podcast_name') ?? '') === podcast.value.title &&
    category === 'playAll'
  ) {
    localStorage.setItem('isPlaying', JSON.stringify(false))
    isPlaying.value = JSON.parse(localStorage.getItem('isPlaying') ?? '')
  } else {
    localStorage.setItem('isPlaying', JSON.stringify(false))
  }
}

const copyLink = () => {
  $toast.success('Copied!')
}

const share = (slug: string) => {
  let shareData = {
    url: ''
  }

  if (window.innerWidth > 768) {
    showShareModal.value = true
  }

  shareData.url = 'https://share.jollofradio.com/podcast/' + slug
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

const playSound = (index: any, type: string, playlist: string, isShared: boolean = false) => {
  let object: any = podcast.value.episodes

  player.audioType = type

  player.currentTrackIndex = index
  player.podcastName = podcast.value.title

  if (JSON.stringify(player.trackList) !== JSON.stringify(object)) {
    player.trackList = object
  }

  player.playPauseTrack(isShared)
}
</script>

<template>
  <div class="bg-blue-deep-100 px-3 pt-[100px] rounded-t-[10px] space-y-6 pb-20 w-full text-white">
    <div class="container mx-auto space-x-2">
      <button class="bg-[#F0CF7B40] rounded px-2.5 py-1.5" @click="router.back()">
        <SvgKKArrowLeft />
      </button>
      <span>Back</span>
    </div>

    <!--  -->

    <div
      class="container flex-col mx-auto flex divide-y divide-grey-900"
      v-if="Object.keys(podcast).length"
    >
      <div class="flex md:flex-row flex-col mb-[32px]">
        <div class="p-2 overflow-hidden md:block flex items-center justify-center">
          <img
            v-if="!loading"
            :src="podcast.logo"
            class="rounded-sm w-[330px] origin-center h-[330px] block"
            alt="card-image"
          />
          <Skeletor
            v-else
            class="w-[330px] origin-center h-[330px]"
            style="width: 330px; height: 330px; border-radius: 0"
          />
        </div>

        <div class="text-md flex-1 md:ml-[44px] md:mt-0 mt-[25px]">
          <span class="text-white text-[20px] pt-[4px] block mb-[10px]"> About </span>

          <p
            v-if="!loading"
            v-html="breakString(podcast.description, 400)"
            class="text-[#9A9FA3] leading-[20px] md:w-[378px] md:text-[12px] text-[17px] mb-[20px] pr-[70px]"
          ></p>
          <p class="flex flex-col space-y-3" v-else>
            <Skeletor
              class="w-[330px] origin-center h-[330px]"
              style="width: 330px; height: 10px"
            />
            <Skeletor
              class="w-[330px] origin-center h-[330px]"
              style="width: 260px; height: 10px"
            />
          </p>

          <p
            v-if="!loading"
            v-html="breakString(podcast.title, 200)"
            class="text-white text-[17px] pt-1 mt-[12px]"
          ></p>

          <Skeletor
            v-else
            class="w-[330px] origin-center h-[330px] mt-[40px]"
            style="width: 330px; height: 20px"
          />

          <div class="flex flex-col mt-[9px]" v-if="!loading">
            <span class="text-[#9A9FA3] text-[13px]"
              >{{ podcast.subscribers ?? 0 }} Subsribers</span
            >
            <span class="text-[10px] text-yellow mt-[6px]">
              <span class="text-[]">{{ podcast.episodes.length }}</span> Episodes</span
            >
          </div>

          <div class="flex items-center space-x-4" v-if="!loading">
            <!-- <SvgKShareIcon class="mt-[22px] cursor-pointer" @click="handlePlaylistDropdownClick($event), episode_source = podcasts.logo, options = 'share', slug = podcasts.slug" /> -->
            <!-- <button class="md:flex hidden items-center justify-center mt-[20px]" v-copy="'https://app.jollofradio.com/podcast/'+podcast.slug" @click="copyLink()">
                            <font-awesome-icon :icon="['fas', 'link']" />
                        </button> -->
            <button class="flex items-center justify-center mt-[20px]" @click="share(podcast.slug)">
              <SvgKShareIcon />
            </button>
            <div
              class="w-[60px] mt-[24px] h-[60px] rounded-full bg-[#F0CF7B] flex items-center justify-center text-[22px] text-black cursor-pointer"
              @click="playSound(0, 'episode', '')"
              v-if="podcast.episodes.length"
            >
              <font-awesome-icon
                v-if="!player.isPlaying || player.currentTrack.podcast !== podcast.title"
                :icon="['fas', 'play']"
              />
              <font-awesome-icon v-else :icon="['fas', 'pause']" />
            </div>
          </div>
        </div>
      </div>
      <!--  -->

      <div class="py-7.5" v-if="!loading">
        <div class="w-full space-between mb-[20px]">
          <h3 class="float-left text-[25px] font-medium text-grey py-10">All Episodes</h3>
          <!-- <p class="float-right"><span class="text-yellow mt-[6px] text-[25px]"> <span class="text-[]">{{ podcasts.episodes.length }}</span> Episodes</span></p> -->
          <div class="clearfix"></div>
        </div>

        <div class="py-4.5 space-y-4.5" v-if="podcast.episodes[0]?.title">
          <!--  -->
          <div
            v-for="(item, index) in podcast.episodes"
            :key="index"
            class="w-full flex items-center bg-[#12222D] py-1.5 md:pr-[30px] pr-[20px] space-x-6 rounded-md text-white cursor-pointer mt-[5px]"
            :style="player.currentTrack.id === item.id ? 'opacity: 0.5;' : 'opacity: 1;'"
          >
            <div class="flex items-center pl-[5px]">
              <div @click="playSound(index, 'episode', '')">
                <img
                  :src="item.logo || jollofEmpty"
                  class="md:min-w-[105px] md:max-w-[105px] rounded-md min-w-[75px] max-w-[75px] md:h-[105px] h-[75px]"
                  alt="Episode"
                />
              </div>
            </div>
            <div class="grow flex items-center justify-between">
              <div
                class="text-base space-y-1 cursor-pointer"
                @click="playSound(index, 'episode', '')"
              >
                <div class="flex space-x-8 items-center">
                  <h3
                    v-html="breakString(item.title, 45)"
                    class="font-medium md:text-xl sm:text-[13px] text-[12px] cursor-pointer xl:w-[400px] lg:w-[300px]"
                  ></h3>
                  <!-- <p class="font-normal text-grey sm:text-[14px] text-[8px] lg:block hidden">{{ item.duration }}</p> -->
                </div>
                <p
                  v-html="breakString(item.description, 30)"
                  class="font-normal text-grey md:text-[15px] sm:text-[11px] text-[11px] cursor-pointer"
                ></p>
                <!-- <p class="font-normal text-grey sm:text-[10px] text-[8px] block lg:hidden">{{ item.duration }}</p> -->
              </div>

              <button
                class="flex items-center justify-center mt-[20px]"
                @click="share(podcast.slug)"
              >
                <SvgKShareIcon />
              </button>
            </div>
          </div>
        </div>
        <div v-else>
          <p class="text-center text-white italic text-[15px] mt-[80px]">
            There is currently no episode for this podcast.
          </p>
        </div>
      </div>
    </div>
    <div v-else>
      <EmptyPage messgae="No record found." />
    </div>
    <ShareModel v-if="showShareModal" :route="showRoute" @close="showShareModal = false" />
  </div>
</template>
