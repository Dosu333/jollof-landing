<script setup lang="ts">
import { menuItems, footermenu } from '../cores/menu'
import { RouterLink, RouterView } from 'vue-router'
import { useRouter, useRoute } from 'vue-router'
import { gotoExternalRoute, gotoExternalRouteOnTab } from '../cores/actions'
import AudioPlayer from '../components/AudioPlayerComponent.vue'
import { ref, watch } from 'vue'
import { onClickOutside } from '@vueuse/core'

const router = useRouter()
const route = useRoute()

const menuOpen = ref(false)
const search = ref()
const searchOpen = ref(false)
const searchZone = ref()
const d = new Date()
const year = d.getFullYear()

watch(route, (newValue, oldValue) => {
  if (Object.keys(newValue).length) {
    search.value = ''
  }
})

const handleSubmitForm = () => {
  if (search.value) {
    searchOpen.value = false
    router.push({ name: 'view.search', query: { query: search.value } })
  }
}

onClickOutside(searchZone, (event) => {
  searchOpen.value = false
})

const header: any = ref(route)
const currentPage: any = ref()

// console.log(header.value.name);

route.matched.some(({ name }) => {
  if (name) {
    if (header.value.name.includes('home')) {
      return (currentPage.value = 'home')
    } else if (
      header.value.name.includes('categories') ||
      header.value.name.includes('view-podcast')
    ) {
      return (currentPage.value = 'podcast')
    } else if (header.value.name.includes('station')) {
      return (currentPage.value = 'radio')
    } else {
      return currentPage.value
    }
  }
})

watch(route, (newValue, oldValue) => {
  route.matched.some(({ name }) => {
    if (name) {
      if (header.value.name.includes('home')) {
        return (currentPage.value = 'home')
      } else if (
        header.value.name.includes('categories') ||
        header.value.name.includes('view-podcast')
      ) {
        return (currentPage.value = 'podcast')
      } else if (header.value.name.includes('station')) {
        return (currentPage.value = 'radio')
      } else {
        return currentPage.value
      }
    }
  })
})
</script>

<template>
  <main>
    <header class="w-screen pt-2 mb:pb-5 fixed bg-[#051724] border-0 z-30" style="z-index: 99">
      <div
        class="container mx-auto !grid md:grid-cols-3 grid-cols-2 items-center md:py-[10px] pt-[0]"
      >
        <img
          alt="Vue logo"
          class="logo md:!block hidden cursor-pointer ml-[12px]"
          src="../assets/images/jollofradio-horizontal.png"
          width="62"
          height="85"
          @click="$router.push('/')"
        />
        <img
          alt="Vue logo"
          class="logo md:hidden cursor-pointer ml-[12px]"
          src="../assets/images/jollofradio.png"
          width="90"
          height="85"
          @click="$router.push('/')"
        />
        <div class="space-x-8 satoshi font-light md:!flex items-center hidden">
          <nav>
            <button
              :class="`lg:text-[12px] md:text-[9px] text-[12px] tracking-[2.3px] hover:text-[#F0CF7B] uppercase px-[20px] font-[500] ${
                currentPage == 'home' ? '!text-[#F0CF7B]' : '!text-white'
              }`"
              @click="$router.push('/')"
            >
              Home
            </button>
            <button
              v-for="(item, index) in menuItems"
              :key="index"
              :class="`lg:text-[12px] md:text-[9px] text-[12px] tracking-[2.3px] hover:text-[#F0CF7B] uppercase px-[20px] font-[500] ${
                currentPage == item.name ? '!text-[#F0CF7B]' : '!text-white'
              }`"
              @click="$router.push(item.path)"
            >
              {{ item.name }}
            </button>
          </nav>
        </div>
        <aside
          class="!flex relative items-center mr-[16px] md:space-x-4 space-x-4 border-0 justify-end"
        >
          <div class="h-full items-center md:!block hidden">
            <button
              class="main-button Manrope tracking-wide capitalize rounded-full md:text-[15px] text-[15px] text-white hidden lg:block border-b border-white px-7 py-2 hover:border-[#F0CF7B]"
              style="color: white; background-color: transparent"
              @click="$router.push('/search')"
            >
              <font-awesome-icon :icon="['fas', 'magnifying-glass']" /> Search
            </button>
          </div>
          <button
            class="main-button Manrope font-normal tracking-wide uppercase rounded-full md:text-[15px] text-[15px] border-0 text-white lg:hidden"
            style="color: white; background-color: transparent"
            @click="$router.push('/search')"
          >
            <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
          </button>
          <button
            class="main-button Manrope font-normal uppercase rounded-full lg:text-[13px] text-[12px] tracking-[2.3px] border-0 text-white"
            style="color: white; background-color: transparent"
            @click="gotoExternalRouteOnTab('https://app.jollofradio.com')"
          >
            <span class="md:!block hidden lg:text-[12px] md:text-[9px] text-[12px]"> Log in </span>
            <span
              class="md:hidden flex items-center justify-center w-[30px] h-[30px] bg-[#F0CF7B] text-[#051724] rounded-full text-[15px]"
            >
              <font-awesome-icon :icon="['fas', 'user']" />
            </span>
          </button>
          <button
            class="main-button Manrope font-normal tracking-wide uppercase rounded-full md:text-[15px] text-[15px] border-0 md:hidden"
            style="color: #f0cf7b; background-color: transparent"
            @click="menuOpen = !menuOpen"
          >
            <font-awesome-icon :icon="['fas', 'bars']" v-if="!menuOpen" />
            <font-awesome-icon :icon="['fas', 'xmark']" v-else />
          </button>

          <!-- <button class="main-button Manrope capitalize rounded-full text-[15px] md:flex hidden">
                    Download App
                </button> -->
        </aside>
      </div>
      <div
        class="mobile-nav container mx-auto h-0 md:pt-[20px] pt-[0] bg-[#051724] p-3 px-3 md:hidden opacity-0 overflow-hidden"
        :style="menuOpen ? 'height: 220px; opacity: 1;' : ''"
      >
        <div>
          <button
            class="block w-full p-3 text-white lg:text-[15px] text-[12px] hover:text-[#F0CF7B] text-left uppercase"
            @click="$router.push('/'), (menuOpen = !menuOpen)"
          >
            Home
          </button>
          <button
            v-for="(item, index) in menuItems"
            :key="index"
            class="block w-full p-3 text-white lg:text-[15px] text-[12px] hover:text-[#F0CF7B] text-left uppercase"
            @click="$router.push(item.path), (menuOpen = !menuOpen)"
          >
            {{ item.name }}
          </button>
          <button
            class="block w-full p-3 text-white lg:text-[15px] text-[12px] hover:text-[#F0CF7B] text-left uppercase"
            @click="gotoExternalRouteOnTab('https://app.jollofradio.com')"
          >
            Sign In
          </button>
          <button
            class="block w-full p-3 text-white lg:text-[15px] text-[12px] hover:text-[#F0CF7B] text-left uppercase"
            @click="gotoExternalRouteOnTab('https://app.jollofradio.com/signup')"
          >
            Sign Up
          </button>
        </div>
      </div>
    </header>
    <div class="body !w-screen !overflow-x-hidden">
      <RouterView />
    </div>
    <div class="w-full fixed bottom-0 z-50 bg-[#051724]" style="z-index: 99">
      <AudioPlayer />
    </div>
    <footer class="w-screen overflow-hidden relative z-10">
      <div>
        <div class="container mx-auto py-[46px] text-white relative z-10">
          <div
            class="w-full md:grid md:grid-cols-4 flex flex-col md:space-y-0 space-y-10 grow px-[15px] items-start"
          >
            <div class="lg:mr-[149px] md:mr-[100px] space-y-2">
              <h3 class="text-[20px]">Company</h3>
              <div class="flex flex-col text-[#A7A7A7] space-y-2">
                <button
                  v-for="(item, index) in footermenu.company"
                  :key="index"
                  class="capitalize text-[15px] text-left"
                  @click="gotoExternalRoute(item.path)"
                >
                  {{ item.name }}
                </button>
              </div>
            </div>
            <div class="lg:mr-[114px] md:mr-[90px] space-y-2">
              <h3 class="text-[20px]">Communities</h3>
              <div class="flex flex-col text-[#A7A7A7] space-y-2">
                <button
                  v-for="(item, index) in footermenu.Communities"
                  :key="index"
                  class="capitalize text-[15px] text-left"
                  @click="gotoExternalRoute(item.path)"
                >
                  {{ item.name }}
                </button>
              </div>
            </div>
            <div class="md:w-[830px] space-y-2">
              <h3 class="text-[20px]">Download App</h3>
              <div class="flex flex-col text-[#A7A7A7] space-y-2">
                <button
                  @click="
                    gotoExternalRoute(
                      'https://play.google.com/store/apps/details?id=com.dukewebtech.jollofradio&hl=en&gl=US'
                    )
                  "
                >
                  <img
                    src="../assets/images/google-play-badge-300x116.png"
                    class="md:w-[170xp] w-[130px]"
                    alt=""
                  />
                </button>
                <button
                  @click="
                    gotoExternalRoute('https://apps.apple.com/ng/app/jollofradio/id1473841302')
                  "
                >
                  <img
                    src="../assets/images/available-on-the-app-store.svg"
                    class="md:w-[170xp] w-[130px]"
                    alt=""
                  />
                </button>
              </div>
            </div>
            <div class="w-full flex flex-col mt-[20px] md:pt-[0] pt-[20px]">
              <h3 class="text-[20px]">Social Icons</h3>
              <div class="flex items-center space-x-3">
                <button
                  class="h-[40px] rounded-full text-[#F0CF7B] text-[15px] flex items-center justify-center"
                  @click="gotoExternalRoute('https://www.facebook.com/myjollofradio/')"
                >
                  <font-awesome-icon :icon="['fab', 'facebook-f']" />
                </button>
                <button
                  class="h-[40px] rounded-full text-[#F0CF7B] text-[15px] flex items-center justify-center"
                  @click="gotoExternalRoute('https://twitter.com/myjollofradio')"
                >
                  <img src="/images/png/x-twitter.png" alt="x-twitter" class="w-[14px]" />
                </button>
                <button
                  class="h-[40px] rounded-full text-[#F0CF7B] text-[15px] flex items-center justify-center"
                  @click="
                    gotoExternalRoute('https://instagram.com/jollofradiomedia?igshid=YmMyMTA2M2Y=')
                  "
                >
                  <font-awesome-icon :icon="['fab', 'instagram']" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <hr class="md:w-[100%] mx-auto border-b-[1.2px] border-[#5A5A5A] mt-[50px]" />
        <div
          class="policy container flex justify-between items-center mx-auto text-[#A7A7A7] h-[100px] text-[15px] md:px-0 px-[15px] relative z-[9999]"
        >
          <button
            @click="gotoExternalRoute('https://m.jollofradio.com/privacy-policy/')"
            class="text-[13px] text-white hover:text-[#F0CF7B]"
          >
            Privacy Policy
          </button>
          <button class="text-[13px] text-white">&#169; {{ year }} Jollof Radio</button>
        </div>
      </div>
    </footer>
  </main>
</template>

<style scoped>
.main-button:hover {
  color: #f0cf7b !important;
}
</style>
