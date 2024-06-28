<script setup lang="ts">
import { SvgKKArrowLeft } from '../../core/icons'
// import  SvgKShareIcon from '@/components/icons/KShareIcon.vue';
import SvgKTwitterYellow from '../../components/icons/KTwitterYellow.vue'
import { displayTextLimit } from '../../cores/behaviours'
import { onMounted, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
import { useAudioplayerStore } from '../../stores/audioplayer'
import axios from 'axios'
import jollofEmpty from '../../assets/images/jollofEmpty.jpg'
import { inject } from 'vue'

const $toast = useToast()
const player: any = useAudioplayerStore()
const swal: any = inject('$swal')

const router = useRouter()
const route = useRoute()

const resource = ref(JSON.parse(localStorage.getItem('see-all') ?? '[]') ?? [])
const radioTypes: any = ref({
  local: [],
  international: []
})
const data = ref(resource.value ?? {})

const category: any = ref()
const isLoadingStation = ref(true)
const isLoadingPodcast = ref(true)
const isPlaying = ref(false)
const playingId = ref()
const audioType = ref()
const loading = ref(true)

onMounted(() => {
  loading.value = true
  axios
    .get('services/category/')
    .then((res) => {
      //   console.log(res)
      //   isLoadingPodcast.value = false;
      category.value = res.data.data
      loading.value = false

      // console.log(category.value)
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
})
</script>

<template>
  <div class="overflow-hidden pb-[150px]">
    <div>
      <div
        class="container mx-auto md:mt-[80px] mt-[80px] bg-blue-deep-100 md:pt-[24px] rounded-t-[10px] space-y-6 pb-10 px-[15px] text-white space-y-17 satoshi"
      >
        <div class="container mx-auto space-x-2" v-if="route.name != 'view.search'">
          <button class="bg-[#F0CF7B40] rounded px-2.5 py-1.5" @click="router.back()">
            <SvgKKArrowLeft />
          </button>
          <span>Back</span>
        </div>
        <div class="text-white space-y-6">
          <div class="flex items-end justify-between py-[24px] pb-0">
            <h4 class="text-2xl font-medium" v-if="route.name === 'view.search'">
              Browse Categories
            </h4>
            <h4 class="text-2xl font-medium" v-else>All Categories</h4>
          </div>

          <div
            class="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 grid-cols-2 gap-2"
            v-if="!loading"
          >
            <slide
              v-for="(item, index) in category"
              :key="index"
              class="episodeSlider cursor-pointer"
              @click="$router.push({ name: 'view.single.category', params: { name: item.name } })"
            >
              <div
                class="slider-info bg-blue-deep-200 relative md:px-3 px-1 pt-2.5 pb-2 rounded-md"
              >
                <div class="relative rounded-md overflow-hidden">
                  <img
                    :src="item.logo || jollofEmpty"
                    class="block lg:w-[177.67px] lg:h-[177.67px] sm:w-[154.5px] sm:h-[154.5px] w-[177.67px] h-[177.67px] aspect-square rounded-md"
                    height="177.67px"
                    width="177.67px"
                    alt="Episode"
                  />
                  <div
                    class="absolute top-0 item-center w-full h-[40px] leading-[40px] bg-black/50 px-2"
                  >
                    <span class="text-[12px] text-white">{{ item.name }}</span>
                  </div>
                </div>
              </div>
            </slide>
          </div>
          <div class="grid md:grid-cols-6 sm:grid-cols-4 grid-cols-2" v-else>
            <div v-for="(item, index) in 5" :key="index">
              <div
                class="slider-info w-full bg-blue-deep-200 relative md:px-3 px-1 pt-2.5 pb-2 rounded-md"
              >
                <div class="relative h-[155px] !w-full overflow-hidden">
                  <Skeletor class="block w-full h-[155px]" style="border-radius: 0" />
                </div>
              </div>
            </div>
          </div>
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
