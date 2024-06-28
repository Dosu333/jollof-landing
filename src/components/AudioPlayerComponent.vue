<script lang="ts" setup>
import { useAudioplayerStore } from '../stores/audioplayer'
import { watch, ref } from 'vue'
import axios from 'axios';
import { storeToRefs } from 'pinia';
import { onClickOutside } from '@vueuse/core'
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import ShareModel from "../components/shared/ShareModel.vue"

const $toast = useToast();

const player:any = useAudioplayerStore();
const fullTime:any = ref("00:00:00")
const playTime:any = ref("00:00:00")
const timer:any = ref(0)
const optionsZone = ref()
const { mobilePlayer } = storeToRefs(player);

const showShareModal = ref(false);
const showRoute = ref("");

// listners
player.audioplayer.addEventListener('waiting', () => {
    return player.playerIsWaiting = true
});

player.audioplayer.addEventListener('playing', () => {
    player.isPlaying = true;
    return player.playerIsWaiting = false
});

player.audioplayer.addEventListener("timeupdate", () => {
    player.timer = player.timer < 10 ? player.timer+1 : 20

    player.currentDuration = player.audioplayer.currentTime * (100 / player.audioplayer.duration);

    // console.log(player.audioplayer.currentTime);

    if(player.timer === 10 && player.audioType === 'episode'){
        // axios.post('service/landing-page', {
        //     "episode_id": player.currentTrack.id
        // })  
    }
});

player.audioplayer.addEventListener("ended", () => {
    if(player.audioplayer.currentTime > 1){
        player.nextTrack();
        // player.nextByBot()
    }
});


// functions
const toggleRepeat = () => {
    player.playRepeat = player.playRepeat === 'off' ? 'all' : player.playRepeat === 'all' ? 'once' : 'off'
}

const share = (slug:string) => {
  let shareData = {
    url: "",
  };

  if(window.innerWidth > 768){
    showShareModal.value = true;
}
  if(player.audioType === 'episode'){
    shareData.url = 'https://share.jollofradio.com/episode/'+slug
  }else{
    shareData.url = 'https://share.jollofradio.com/station/'+slug
  }
  
  showRoute.value = shareData.url;

  if(window.innerWidth < 768){
    navigator.share(shareData);
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

watch(player.mobilePlayer, (newValue:any, oldValue:any) => {
  console.log(newValue);
})

const gotoExternalRoute = (route:string) => {
    window.location.href = route;
}

player.audioplayer.addEventListener("loadedmetadata", () => {
  const hours = Math.floor(player.audioplayer.duration / 3600);
  const minutes = Math.floor((player.audioplayer.duration - (hours * 3600)) / 60);
  const seconds = Math.floor(player.audioplayer.duration - (hours * 3600) - (minutes * 60));
  fullTime.value = hours ? hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0') : '00'+':'+minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
});

player.audioplayer.addEventListener("timeupdate", () => {
  const hours = Math.floor(player.audioplayer.currentTime / 3600);
  const minutes = Math.floor((player.audioplayer.currentTime - (hours * 3600)) / 60);
  const seconds = Math.floor(player.audioplayer.currentTime - (hours * 3600) - (minutes * 60));
  playTime.value = hours ? hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0') : '00'+':'+minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
});

watch(mobilePlayer, (newValue:any, oldValue:any) => {
  const body:any = document.querySelector('body');

  if(newValue == true && window.innerWidth < 768){
    // player widget expanded
    body.style.height = '120vh';
    body.style.overflow = 'auto';
    return;  
  }

  body.style.height = 'auto';
  body.style.overflow = "auto";
})

onClickOutside(
    optionsZone,
  (event) => {
    player.options = false
  },
)

</script>

<template>
    <Transition>
        <div class="relative" v-show="player.playerIsUp">
            <div class="audio-bakground flex items-center lg:gap-8 gap-2 sm:h-[95px] h-[60px] bg-black sm:px-6 px-2">
                <div class="flex items-center gap-2 w-[250px]">
                    <div class="" @click="player.mobilePlayer = true">
                        <img :src="player.currentTrack.logo > 15 ? player.currentTrack.logo : player.currentTrack.logo" class="min-w-[50px] max-w-[50px] !h-[50px] rounded-lg" alt="audio image">
                    </div>
                    <div>
                        <marquee behavior="scroll" scrollamount="1" class="uppercase sm:w-[200px] w-[140px] text-white text-[11px]">
                          {{ player.currentTrack.title }}
                        </marquee>
                        <!-- <p class="text-white text-[10px]">{{ player.currentTrack.creator && Object.keys(player.currentTrack.creator).length ? player.currentTrack.creator.firstname+' '+player.currentTrack.creator.lastname : '' }}</p> -->
                        <div class="flex">
                            <button class="text-left text-[12px] text-[#F0CF7B] hover:underline sm:w-[190px] md:w-[140px] whitespace-nowrap overflow-hidden text-ellipsis" @click="$router.push({ name: 'view-podcast', params: {name: player.currentTrack.podcast_id}}), player.mobilePlayer = false" v-if="player.audioType !== 'radio'">{{ player.currentTrack.podcast }}</button>
                            <button class="text-left text-[12px] text-[#F0CF7B]" v-else>{{ player.currentTrack.frequency+'FM' }}</button>
                            <button type="button" @click="share(player.currentTrack.slug)" class="sm:block hidden sm:w-[190px] md:w-[140px] text-white"><font-awesome-icon :icon="['fas', 'share-nodes']" /></button>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col justify-center lg:ml-5 w-[60%]">
                    <div class="mx-auto items-center justify-center items-right flex md:gap-8 gap-2 md:translate-y-[-7px] translate-y-0">
                        <button class="md:block hidden relative" @click="player.audioType === 'radio' ? '' : toggleRepeat()" :class="{'!opaity-50':player.audioType === 'radio'}" v-if="player.audioType !== 'radio'">
                            <div class="description w-[110px] absolute text-[#fff] leading-[40px] text-[14px] capitalize" :class="{'!w-[124px]':player.playRepeat==='once'}">
                                {{ `Repeat: ${player.playRepeat}` }}
                            </div>
                            <!-- <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.0002 3.5L16.4402 5.84003L8.49023 5.82001C4.92023 5.82001 1.99023 8.75003 1.99023 12.34C1.99023 14.13 2.72022 15.76 3.90022 16.94" :stroke="player.playRepeat != 'off' ? '#F0CF7B' : 'white'" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M10.0001 21.5001L7.56006 19.16L15.5101 19.1801C19.0801 19.1801 22.0101 16.25 22.0101 12.66C22.0101 10.87 21.2801 9.24006 20.1001 8.06006" :stroke="player.playRepeat != 'off' ? '#F0CF7B' : 'white'" stroke-linecap="round" stroke-linejoin="round"/>
                            <path opacity="0.4" d="M9 12.5H15" :stroke="player.playRepeat != 'off' ? '#F0CF7B' : 'white'" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg> -->

                            <svg width="28px" height="28px" viewBox="-4 0 28 28" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000" v-if="player.playRepeat == 'once'"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>arrow_repeat [#F0CF7B]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-380.000000, -7034.000000)" fill="#F0CF7B"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M333,6892.14355 L335,6892.14355 L335,6884.50215 L333,6884.50215 L333,6892.14355 Z M344,6879.69666 L338.343,6874 L336.929,6875.51204 L340.172,6878.7711 L324,6878.7711 L324,6888.32285 L326,6888.32285 L326,6880.68145 L340.172,6880.68145 L336.929,6883.61479 L338.343,6884.88326 L344,6879.69666 Z M329.657,6902 L331.071,6900.81081 L327.829,6897.8746 L344,6897.8746 L344,6888.32285 L342,6888.32285 L342,6895.96425 L327.829,6895.96425 L331.071,6892.70328 L329.657,6891.27052 L324,6896.61186 L329.657,6902 Z" id="arrow_repeat-[#F0CF7B]"> </path> </g> </g> </g> </g></svg>
                            <font-awesome-icon class="text-[24px] text-white" :class="{'!text-[#F0CF7B]': player.playRepeat === 'all'}" :icon="['fas', 'repeat']" v-else />
                        </button>
                        <button :class="`md:block hidden relative ${player.currentTrack.handles && player.currentTrack.handles.twitter ? 'opacity-100' : 'opacity-30'}`" v-if="player.audioType === 'radio'" @click="player.currentTrack.handles && player.currentTrack.handles.twitter ? gotoExternalRoute(player.currentTrack.handles.twitter) : ''">
                            <div class="description absolute text-[#fff] leading-[40px] text-[14px] capitalize">
                                {{ `Twitter` }}
                            </div>


                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="28" height="28" viewBox="0,0,256,256">
                            <g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(5.12,5.12)"><path d="M5.91992,6l14.66211,21.375l-14.35156,16.625h3.17969l12.57617,-14.57812l10,14.57813h12.01367l-15.31836,-22.33008l13.51758,-15.66992h-3.16992l-11.75391,13.61719l-9.3418,-13.61719zM9.7168,8h7.16406l23.32227,34h-7.16406z"></path></g></g>
                            </svg>
                        </button>
                        <button class="prev-track md:block hidden relative" type="button" @click="player.trackList.length > 1 && player.audioType !== 'radio' ? player.previousTrack() : ''" :class="{'!opacity-40': player.audioType === 'radio'}">
                            <div class="description absolute text-[#fff] leading-[40px] text-[14px] capitalize">
                                Previous
                            </div>
                            <!-- <img src="@/assets/icons/prev.svg" class="rotate-[360deg]" :class="player.trackList.length > 1 && player.audioType !== 'radio' ? 'opacity-100' : 'opacity-50'"> -->
                                    
                            <svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="rotate-[180deg]" :class="player.trackList.length > 1 && player.audioType !== 'radio' ? 'opacity-100' : 'opacity-'"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M5.94601 5.59492C3.92853 4.15983 1 5.48359 1 7.83062V16.1694C1 18.5164 3.92853 19.8402 5.94601 18.4051L11 14.81V16.1694C11 18.5164 13.9285 19.8402 15.946 18.4051L21.8074 14.2357C23.3975 13.1046 23.3975 10.8954 21.8074 9.76429L15.946 5.59492C13.9285 4.15983 11 5.48359 11 7.83062V9.18996L5.94601 5.59492ZM3.0462 7.83062C3.0462 7.04828 4.02237 6.60703 4.69487 7.08539L10.5563 11.2548C11.0863 11.6318 11.0863 12.3682 10.5563 12.7452L4.69487 16.9146C4.02237 17.393 3.0462 16.9517 3.0462 16.1694V7.83062ZM13.0462 7.83062C13.0462 7.04828 14.0224 6.60703 14.6949 7.08539L20.5563 11.2548C21.0863 11.6318 21.0863 12.3682 20.5563 12.7452L14.6949 16.9146C14.0224 17.393 13.0462 16.9517 13.0462 16.1694V7.83062Z" fill="#ffffff"></path> </g></svg>
                        </button>
                        <button type="button" class="playpause-track relative text-[20px] bg-[#F0CF7B] md:w-[40px] md:h-[40px] w-[40px] h-[40px] rounded-full text-[#030F18]" @click="player.playPauseTrack()">
                            <div class="description absolute text-[#fff] leading-[40px] text-[14px] capitalize">
                            Play
                            </div>
                            <div v-if="!player.playerIsWaiting">
                                <font-awesome-icon v-if="!player.isPlaying" :icon="['fas', 'play']" />
                                <font-awesome-icon v-else :icon="['fas', 'pause']" />
                            </div>
                            <div v-else class="contain">
                                <span class="spinner spinner--quarter"></span>
                            </div>
                        </button>
                        <button type="button" class="next-track relative md:block hidden" @click="player.trackList.length > 1 || player.audioType === 'radio' ? player.nextTrack() : ''">
                            <div class="description absolute text-[#fff] leading-[40px] text-[14px] capitalize">
                                {{ player.audioType !== 'radio' ? 'Next' : 'Brodcast' }}
                            </div>
                            <!-- <img src="@/assets/icons/next.svg" :class="player.trackList.length > 1 && player.audioType !== 'radio' ? 'opacity-100' : 'opacity-50'"> -->
                            <svg fill="#ffffff" width="30px" height="64px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" v-if="player.audioType === 'radio'"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>signal-stream</title> <path d="M16 11.75c-2.347 0-4.25 1.903-4.25 4.25s1.903 4.25 4.25 4.25c2.347 0 4.25-1.903 4.25-4.25v0c-0.003-2.346-1.904-4.247-4.25-4.25h-0zM16 17.75c-0.966 0-1.75-0.784-1.75-1.75s0.784-1.75 1.75-1.75c0.966 0 1.75 0.784 1.75 1.75v0c-0.001 0.966-0.784 1.749-1.75 1.75h-0zM3.25 16c0.211-3.416 1.61-6.471 3.784-8.789l-0.007 0.008c0.223-0.226 0.361-0.536 0.361-0.879 0-0.69-0.56-1.25-1.25-1.25-0.344 0-0.655 0.139-0.881 0.363l0-0c-2.629 2.757-4.31 6.438-4.506 10.509l-0.001 0.038c0.198 4.109 1.879 7.79 4.514 10.553l-0.006-0.006c0.226 0.228 0.54 0.369 0.886 0.369 0.69 0 1.249-0.559 1.249-1.249 0-0.346-0.141-0.659-0.368-0.885l-0-0c-2.173-2.307-3.573-5.363-3.774-8.743l-0.002-0.038zM9.363 16c0.149-2.342 1.109-4.436 2.6-6.026l-0.005 0.005c0.224-0.226 0.363-0.537 0.363-0.88 0-0.69-0.56-1.25-1.25-1.25-0.345 0-0.657 0.139-0.883 0.365l0-0c-1.94 2.035-3.179 4.753-3.323 7.759l-0.001 0.028c0.145 3.032 1.384 5.75 3.329 7.79l-0.005-0.005c0.226 0.228 0.54 0.369 0.886 0.369 0.69 0 1.249-0.559 1.249-1.249 0-0.346-0.141-0.659-0.368-0.885l-0-0c-1.49-1.581-2.451-3.676-2.591-5.993l-0.001-0.027zM26.744 5.453c-0.226-0.227-0.54-0.368-0.886-0.368-0.691 0-1.251 0.56-1.251 1.251 0 0.345 0.139 0.657 0.365 0.883l-0-0c2.168 2.31 3.567 5.365 3.775 8.741l0.002 0.040c-0.21 3.417-1.609 6.471-3.784 8.789l0.007-0.008c-0.224 0.226-0.362 0.537-0.362 0.88 0 0.691 0.56 1.251 1.251 1.251 0.345 0 0.657-0.14 0.883-0.365l-0 0c2.628-2.757 4.308-6.439 4.504-10.509l0.001-0.038c-0.198-4.108-1.878-7.79-4.512-10.553l0.006 0.007zM21.811 8.214c-0.226-0.224-0.537-0.363-0.881-0.363-0.69 0-1.25 0.56-1.25 1.25 0 0.343 0.138 0.653 0.361 0.879l-0-0c1.486 1.585 2.447 3.678 2.594 5.992l0.001 0.028c-0.151 2.343-1.111 4.436-2.601 6.027l0.005-0.005c-0.224 0.226-0.362 0.537-0.362 0.88 0 0.691 0.56 1.251 1.251 1.251 0.345 0 0.657-0.14 0.883-0.365l-0 0c1.939-2.036 3.178-4.754 3.323-7.759l0.001-0.028c-0.145-3.033-1.385-5.751-3.331-7.791l0.005 0.005z"></path> </g></svg>

                            <svg v-else width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="" :class="player.trackList.length > 1 || player.audioType === 'radio' ? 'opacity-100' : 'opacity-50'"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M5.94601 5.59492C3.92853 4.15983 1 5.48359 1 7.83062V16.1694C1 18.5164 3.92853 19.8402 5.94601 18.4051L11 14.81V16.1694C11 18.5164 13.9285 19.8402 15.946 18.4051L21.8074 14.2357C23.3975 13.1046 23.3975 10.8954 21.8074 9.76429L15.946 5.59492C13.9285 4.15983 11 5.48359 11 7.83062V9.18996L5.94601 5.59492ZM3.0462 7.83062C3.0462 7.04828 4.02237 6.60703 4.69487 7.08539L10.5563 11.2548C11.0863 11.6318 11.0863 12.3682 10.5563 12.7452L4.69487 16.9146C4.02237 17.393 3.0462 16.9517 3.0462 16.1694V7.83062ZM13.0462 7.83062C13.0462 7.04828 14.0224 6.60703 14.6949 7.08539L20.5563 11.2548C21.0863 11.6318 21.0863 12.3682 20.5563 12.7452L14.6949 16.9146C14.0224 17.393 13.0462 16.9517 13.0462 16.1694V7.83062Z" fill="#ffffff"></path> </g></svg>
                        </button>
                        <button type="button" class="random-track md:block hidden relative" v-if="player.audioType === 'radio'" @click="share(player.currentTrack.slug)">
                            <div class="description absolute text-[#fff] leading-[40px] text-[14px] capitalize">
                                Share
                            </div>
                            <font-awesome-icon class="text-[20px] text-white opacity-95" :icon="['fas', 'share-nodes']" />
                        </button>
                        <button type="button" class="random-track md:block hidden relative" @click="player.audioType === 'radio' ? '' : player.playRandom = !player.playRandom" :class="{'!opacity-50' : player.audioType === 'radio'}" v-if="player.audioType !== 'radio'">
                            <div class="description absolute !w-auto text-[#fff] leading-[40px] text-[14px] capitalize">
                                Shuffle
                            </div>
                            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.56024 19.24C5.56024 19.24 5.55025 19.24 5.54025 19.24L2.99023 19.23C2.58023 19.23 2.24023 18.89 2.24023 18.48C2.24023 18.07 2.58023 17.73 2.99023 17.73L5.54025 17.74H5.55023C6.20023 17.74 6.81026 17.42 7.17026 16.87L13.5602 7.28998C14.2002 6.32998 15.2702 5.75 16.4302 5.75C16.4302 5.75 16.4403 5.75 16.4503 5.75L21.0002 5.77002C21.4102 5.77002 21.7502 6.11002 21.7502 6.52002C21.7502 6.93002 21.4102 7.27002 21.0002 7.27002L16.4503 7.25H16.4402C15.7902 7.25 15.1803 7.57 14.8203 8.12L8.43024 17.7C7.79024 18.67 6.72024 19.24 5.56024 19.24Z" :fill="player.playRandom ? '#F0CF7B' : 'white'"/>
                            <path d="M18.9999 21.2299C18.8099 21.2299 18.6199 21.1599 18.4699 21.0099C18.1799 20.7199 18.1799 20.2399 18.4699 19.9499L20.4699 17.9499C20.7599 17.6599 21.2399 17.6599 21.5299 17.9499C21.8199 18.2399 21.8199 18.7199 21.5299 19.0099L19.5299 21.0099C19.3799 21.1599 19.1899 21.2299 18.9999 21.2299Z" :fill="player.playRandom ? '#F0CF7B' : 'white'"/>
                            <path d="M8.89001 9.87976C8.66001 9.87976 8.43 9.76976 8.28 9.56976L7.20001 8.06976C6.83001 7.55976 6.21999 7.25977 5.60999 7.25977L3 7.26978C2.54 7.25978 2.25 6.93978 2.25 6.51978C2.25 6.10978 2.58 5.76978 3 5.76978L5.60999 5.75977C5.61999 5.75977 5.62 5.75977 5.63 5.75977C6.74001 5.75977 7.77999 6.29976 8.42999 7.18976L9.51001 8.68976C9.75001 9.02976 9.68 9.48975 9.34 9.73975C9.2 9.82975 9.05001 9.87976 8.89001 9.87976Z" :fill="player.playRandom ? '#F0CF7B' : 'white'"/>
                            <path d="M16.32 19.2499C15.26 19.2499 14.24 18.7499 13.59 17.9099L12.37 16.34C12.12 16.01 12.18 15.5399 12.5 15.2899C12.83 15.0399 13.3 15.0999 13.55 15.4199L14.77 16.9899C15.14 17.4699 15.73 17.7099 16.32 17.7499L20.99 17.7299C21.4 17.7299 21.74 18.0599 21.74 18.4799C21.74 18.8899 21.41 19.2299 20.99 19.2299L16.32 19.2499C16.33 19.2499 16.32 19.2499 16.32 19.2499Z" :fill="player.playRandom ? '#F0CF7B' : 'white'"/>
                            <path d="M20.9999 7.26999C20.8099 7.26999 20.6199 7.19996 20.4699 7.04996L18.4699 5.04996C18.1799 4.75996 18.1799 4.27996 18.4699 3.98996C18.7599 3.69996 19.2399 3.69996 19.5299 3.98996L21.5299 5.98996C21.8199 6.27996 21.8199 6.75996 21.5299 7.04996C21.3799 7.19996 21.1899 7.26999 20.9999 7.26999Z" :fill="player.playRandom ? '#F0CF7B' : 'white'"/>
                        </svg>
                        </button>
                    </div>
                    <div class="md:flex items-center hidden gap-2" :class="{'!opacity-50':player.audioType === 'radio'}">
                        <span class="text-[9px] text-white">{{ player.audioType === 'podcasts' || player.audioType === 'episode' ? playTime : '0:00' }}</span>
                        <input type="range" min="0" max="100" step="0.1" class="seek_slider px-0 lg:w-full w-full h-[3px] border-0 rounded-full" v-model="player.currentDuration" @change="player.audioType === 'radio' ? '' : player.setPlayerDuration()">
                        <span class="text-[9px] text-white">{{ player.audioType === 'podcasts' || player.audioType === 'episode' ? fullTime : '0:00' }}</span>
                    </div>
                </div>
                <div class="volume lg:flex hidden items-center h-full w-[10%] lg:ml-4">
                    <!-- <div class=""> -->
                        <div class="md:flex hidden items-center">
                            <button class="mr-[10px]" @click="player.setMute()">
                                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.55 21.1433C11.76 21.1433 10.89 20.8633 10.02 20.3133L7.1 18.4833C6.9 18.3633 6.67 18.2933 6.44 18.2933H5C2.58 18.2933 1.25 16.9633 1.25 14.5433V10.5433C1.25 8.12333 2.58 6.79333 5 6.79333H6.43C6.66 6.79333 6.89 6.72333 7.09 6.60333L10.01 4.77333C11.47 3.86333 12.89 3.69333 14.01 4.31333C15.13 4.93333 15.74 6.22333 15.74 7.95333V17.1233C15.74 18.8433 15.12 20.1433 14.01 20.7633C13.57 21.0233 13.07 21.1433 12.55 21.1433ZM5 8.30333C3.42 8.30333 2.75 8.97333 2.75 10.5533V14.5533C2.75 16.1333 3.42 16.8033 5 16.8033H6.43C6.95 16.8033 7.45 16.9433 7.89 17.2233L10.81 19.0533C11.77 19.6533 12.68 19.8133 13.29 19.4733C13.9 19.1333 14.25 18.2833 14.25 17.1533V7.96333C14.25 6.82333 13.9 5.97333 13.29 5.64333C12.68 5.30333 11.77 5.45333 10.81 6.06333L7.88 7.88333C7.45 8.16333 6.94 8.30333 6.43 8.30333H5Z" :fill="player.muted ? '#9b9b9b' : 'white'"/>
                                    <path v-if="!player.muted" d="M17.9998 17.304C17.8398 17.304 17.6898 17.254 17.5498 17.154C17.2198 16.904 17.1498 16.434 17.3998 16.104C18.9698 14.014 18.9698 11.094 17.3998 9.00398C17.1498 8.67398 17.2198 8.20398 17.5498 7.95398C17.8798 7.70398 18.3498 7.77398 18.5998 8.10398C20.5598 10.724 20.5598 14.384 18.5998 17.004C18.4498 17.204 18.2298 17.304 17.9998 17.304Z" :fill="player.muted ? '#9b9b9b' : 'white'"/>
                                    <path v-if="!player.muted" d="M19.8299 19.804C19.6699 19.804 19.5199 19.754 19.3799 19.654C19.0499 19.404 18.9799 18.934 19.2299 18.604C21.8999 15.044 21.8999 10.064 19.2299 6.50398C18.9799 6.17398 19.0499 5.70398 19.3799 5.45398C19.7099 5.20398 20.1799 5.27398 20.4299 5.60398C23.4999 9.69398 23.4999 15.414 20.4299 19.504C20.2899 19.704 20.0599 19.804 19.8299 19.804Z" :fill="player.muted ? '#9b9b9b' : 'white'"/>
                                </svg>
                            </button>
                            <div class="flex items-center">
                                <input type="range" min="0" max="100" step="1" class="volume_slider px-0 w-full rounded-full" :class="{'volume_muted_slider' : player.muted }" v-model="player.volume" @change="player.setVolume()"> 
                            </div>
                        </div>
                    <!-- </div> -->
                </div>
                <button class="close flex items-center justify-center absolute right-3 top-0 h-full w-[20px] text-[#ffffff88] text-[30px]" @click="player.closePlayer()">
                    <font-awesome-icon :icon="['fas', 'xmark']" />
                </button>
            </div>
        </div>
    </Transition>
    <Transition name="slide-fade">
        <div v-show="player.mobilePlayer" class="md:hidden">
            <div class="mobile-audio-screen fixed bg-[#0c1223] h-[100vh] w-screen bottom-[0] left-0 px-6 pb-6" :class="{'translate-y-[0]': player.mobilePlayer}" style="z-index: 9999">
                <div class="flex justify-between w-full mt-[40px]">
                    <button class="h-[20px] relative top-0 mb-[20px] text-white" @click="player.mobilePlayer = false">
                        <font-awesome-icon :icon="['fas', 'chevron-left']" />
                    </button>
                    <button class="h-[20px] relative top-0 mb-[20px] text-white" v-if="player.audioType !== 'radio'" @click="player.options = true">
                        <!-- <font-awesome-icon :icon="['fas', 'chevron-left']" /> -->
                        <svg fill="#ffffff" width="25px" height="25px" viewBox="0 0 256 256" id="Flat" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M128,100a28,28,0,1,0,28,28A28.03146,28.03146,0,0,0,128,100Zm0,48a20,20,0,1,1,20-20A20.02229,20.02229,0,0,1,128,148ZM48,100a28,28,0,1,0,28,28A28.03146,28.03146,0,0,0,48,100Zm0,48a20,20,0,1,1,20-20A20.02229,20.02229,0,0,1,48,148Zm160-48a28,28,0,1,0,28,28A28.03146,28.03146,0,0,0,208,100Zm0,48a20,20,0,1,1,20-20A20.02229,20.02229,0,0,1,208,148Z"></path> </g></svg>
                    </button>
                </div>
                <div class="relative flex flex-col h-full">
                    <div class="audio-img audio-img-dsk flex justify-center">
                        <img :src="player.currentTrack.logo > 15 ? player.currentTrack.logo : player.currentTrack.logo" alt="audio image" class=" rounded-md mb-[30px] !w-[100%]">
                    </div>
                    <div class="mb-[30px]">
                        <div class="w-full">
                            <div class="flex">
                                <div class="audio-img audio-img-small hidden flex justify-center w-[47vh] mr-[20px]">
                                    <img :src="player.currentTrack.logo > 15 ? player.currentTrack.logo : player.currentTrack.logo" alt="audio image" class="rounded-md w-full">
                                </div>
                                <div class="audio-details flex flex-col w-full justify-start text-white tracking-2 relative top-[-20px]">
                                <marquee behavior="scroll" scrollamount="1" class="block uppercase !w-full text-white text-[11px]">
                                {{ player.currentTrack.title }}
                                </marquee>
                                <button v-if="player.audioType !== 'radio'" class="text-left text-[12px] text-[#F0CF7B]" @click="$router.push({ name: 'view-podcast', params: {name: player.currentTrack.podcast_id}}), player.mobilePlayer = false">{{ player.currentTrack.podcast }}</button>
                                <button class="text-left text-[12px] text-[#F0CF7B]" v-else>{{ player.currentTrack.frequency+'FM' }}</button>
                                <!-- <div class="items-center">
                                    <button class="text-black items-center mt-[10px] bg-[#F0CF7B] p-2 rounded-full w-[100px] text-[12px]" @click="share(player.currentTrack.slug)">
                                    Share <font-awesome-icon :icon="['fas', 'share-nodes']" />
                                    </button>
                                </div> -->
                                </div>
                                
                            </div>
                            <div class="flex flex-col justify-center space-y-4">
                                <div class="flex flex-col items-center space-x-1" :class="{'!opacity-50':player.audioType === 'radio'}">
                                    <input type="range" min="0" max="100" step="0.1" v-model="player.currentDuration" class="seek_slider px-0 lg:w-[500px] w-full h-[3px] border-0 rounded-full" @change="player.audioType === 'radio'?'':player.setPlayerDuration()">
                                    <div class="flex justify-between w-full mt-2">
                                        <span class="text-[9px] opacity-40 text-white">{{ player.audioType === 'podcasts' || player.audioType === 'episode' ? playTime : '0:00' }}</span>
                                        <span class="text-[9px] opacity-40 text-white">{{ player.audioType === 'podcasts' || player.audioType === 'episode' || fullTime && player.audioType != 'radio' ? fullTime : '0:00' }}</span>
                                    </div>
                                </div>
                                <div class="absolute bottom-[60px] flex transform scale-55 justify-between !w-full">
                                    <button class="md:block relative" @click="player.audioType === 'radio' ? '':toggleRepeat()" :class="{'!opacity-50':player.audioType === 'radio'}" v-if="player.audioType !== 'radio'">
                                        <div class="description w-[110px] absolute text-[#fff] leading-[40px] text-[14px] capitalize" :class="{'!w-[124px]':player.playRepeat==='once'}">
                                            {{ `Repeat: ${player.playRepeat}` }}
                                        </div>

                                        <svg width="28px" height="28px" viewBox="-4 0 28 28" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000" v-if="player.playRepeat == 'once'"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>arrow_repeat [#ffffff]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-380.000000, -7034.000000)" fill="#ffffff"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M333,6892.14355 L335,6892.14355 L335,6884.50215 L333,6884.50215 L333,6892.14355 Z M344,6879.69666 L338.343,6874 L336.929,6875.51204 L340.172,6878.7711 L324,6878.7711 L324,6888.32285 L326,6888.32285 L326,6880.68145 L340.172,6880.68145 L336.929,6883.61479 L338.343,6884.88326 L344,6879.69666 Z M329.657,6902 L331.071,6900.81081 L327.829,6897.8746 L344,6897.8746 L344,6888.32285 L342,6888.32285 L342,6895.96425 L327.829,6895.96425 L331.071,6892.70328 L329.657,6891.27052 L324,6896.61186 L329.657,6902 Z" id="arrow_repeat-[#ffffff]"> </path> </g> </g> </g> </g></svg>
                                        <font-awesome-icon class="text-[24px] text-white/60" :class="{'!text-white': player.playRepeat === 'all'}" :icon="['fas', 'repeat']" v-else />

                                        <!-- <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14.0002 3.5L16.4402 5.84003L8.49023 5.82001C4.92023 5.82001 1.99023 8.75003 1.99023 12.34C1.99023 14.13 2.72022 15.76 3.90022 16.94" :stroke="player.playRepeat != 'off' ? '#F0CF7B' : 'white'" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M10.0001 21.5001L7.56006 19.16L15.5101 19.1801C19.0801 19.1801 22.0101 16.25 22.0101 12.66C22.0101 10.87 21.2801 9.24006 20.1001 8.06006" :stroke="player.playRepeat != 'off' ? '#F0CF7B' : 'white'" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path opacity="0.4" d="M9 12.5H15" :stroke="player.playRepeat != 'off' ? '#F0CF7B' : 'white'" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg> -->
                                    </button>

                                    <button :class="`md:block relative ${player.currentTrack.handles && player.currentTrack.handles.twitter ? 'opacity-100' : 'opacity-30'}`" v-if="player.audioType === 'radio'" @click="player.currentTrack.handles && player.currentTrack.handles.twitter ? gotoExternalRoute(player.currentTrack.handles.twitter) : ''">
                                        <div class="description absolute text-[#fff] leading-[40px] text-[14px] capitalize">
                                            {{ `Twitter` }}
                                        </div>

                                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0,0,256,256">
                                        <g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(5.12,5.12)"><path d="M5.91992,6l14.66211,21.375l-14.35156,16.625h3.17969l12.57617,-14.57812l10,14.57813h12.01367l-15.31836,-22.33008l13.51758,-15.66992h-3.16992l-11.75391,13.61719l-9.3418,-13.61719zM9.7168,8h7.16406l23.32227,34h-7.16406z"></path></g></g>
                                        </svg>
                                    </button>

                                    
                                    <button class="prev-track md:block relative" type="button" @click="player.trackList.length > 1 && player.audioType !== 'radio' ? player.previousTrack() : ''" :class="{'!opacity-40': player.audioType === 'radio'}">
                                    <div class="description absolute text-[#fff] leading-[40px] text-[14px] capitalize">
                                        Previous
                                    </div>
                                    <!-- <img src="@/assets/icons/prev.svg" class="rotate-[360deg]" :class="player.trackList.length > 1 && player.audioType !== 'radio' ? 'opacity-100' : 'opacity-50'"> -->
                                    
                                    <svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="rotate-[180deg] opacity-[.8]" :class="player.trackList.length > 1 && player.audioType !== 'radio' ? 'opacity-100' : 'opacity-50'"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M5.94601 5.59492C3.92853 4.15983 1 5.48359 1 7.83062V16.1694C1 18.5164 3.92853 19.8402 5.94601 18.4051L11 14.81V16.1694C11 18.5164 13.9285 19.8402 15.946 18.4051L21.8074 14.2357C23.3975 13.1046 23.3975 10.8954 21.8074 9.76429L15.946 5.59492C13.9285 4.15983 11 5.48359 11 7.83062V9.18996L5.94601 5.59492ZM3.0462 7.83062C3.0462 7.04828 4.02237 6.60703 4.69487 7.08539L10.5563 11.2548C11.0863 11.6318 11.0863 12.3682 10.5563 12.7452L4.69487 16.9146C4.02237 17.393 3.0462 16.9517 3.0462 16.1694V7.83062ZM13.0462 7.83062C13.0462 7.04828 14.0224 6.60703 14.6949 7.08539L20.5563 11.2548C21.0863 11.6318 21.0863 12.3682 20.5563 12.7452L14.6949 16.9146C14.0224 17.393 13.0462 16.9517 13.0462 16.1694V7.83062Z" fill="#ffffff"></path> </g></svg>
                                    </button>
                                    <button  @click="player.playerIsWaiting ? '' : player.playPauseTrack()" type="button" class="playpause-track relative text-[20px] bg-[#F0CF7B] md:w-[50px] md:h-[50px] w-[50px] h-[50px] rounded-full text-[#030F18] aspect-square" id="playpause-track">
                                    <div class="description absolute text-[#fff] leading-[40px] text-[14px] capitalize" ref="myPlayButton">
                                        Play
                                    </div>
                                    <div v-if="!player.playerIsWaiting">
                                        <font-awesome-icon v-if="!player.isPlaying" :icon="['fas', 'play']" />
                                        <font-awesome-icon v-else :icon="['fas', 'pause']" />
                                    </div>
                                    <div v-else class="contain">
                                        <span class="spinner spinner--quarter"></span>
                                    </div>
                                    </button>
                                    <button type="button" class="next-track relative" @click="player.trackList.length > 1 || player.audioType === 'radio' ? player.nextTrack() : ''">
                                    <div class="description absolute text-[#fff] leading-[40px] text-[14px] capitalize">
                                        {{ player.audioType !== 'radio' ? 'Next' : 'Brodcast' }}
                                    </div>
                                    <!-- <img src="@/assets/icons/next.svg" :class="player.trackList.length > 1 && player.audioType !== 'radio' ? 'opacity-100' : 'opacity-50'"> -->
                                    <svg fill="#ffffff" width="30px" height="64px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" v-if="player.audioType === 'radio'"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>signal-stream</title> <path d="M16 11.75c-2.347 0-4.25 1.903-4.25 4.25s1.903 4.25 4.25 4.25c2.347 0 4.25-1.903 4.25-4.25v0c-0.003-2.346-1.904-4.247-4.25-4.25h-0zM16 17.75c-0.966 0-1.75-0.784-1.75-1.75s0.784-1.75 1.75-1.75c0.966 0 1.75 0.784 1.75 1.75v0c-0.001 0.966-0.784 1.749-1.75 1.75h-0zM3.25 16c0.211-3.416 1.61-6.471 3.784-8.789l-0.007 0.008c0.223-0.226 0.361-0.536 0.361-0.879 0-0.69-0.56-1.25-1.25-1.25-0.344 0-0.655 0.139-0.881 0.363l0-0c-2.629 2.757-4.31 6.438-4.506 10.509l-0.001 0.038c0.198 4.109 1.879 7.79 4.514 10.553l-0.006-0.006c0.226 0.228 0.54 0.369 0.886 0.369 0.69 0 1.249-0.559 1.249-1.249 0-0.346-0.141-0.659-0.368-0.885l-0-0c-2.173-2.307-3.573-5.363-3.774-8.743l-0.002-0.038zM9.363 16c0.149-2.342 1.109-4.436 2.6-6.026l-0.005 0.005c0.224-0.226 0.363-0.537 0.363-0.88 0-0.69-0.56-1.25-1.25-1.25-0.345 0-0.657 0.139-0.883 0.365l0-0c-1.94 2.035-3.179 4.753-3.323 7.759l-0.001 0.028c0.145 3.032 1.384 5.75 3.329 7.79l-0.005-0.005c0.226 0.228 0.54 0.369 0.886 0.369 0.69 0 1.249-0.559 1.249-1.249 0-0.346-0.141-0.659-0.368-0.885l-0-0c-1.49-1.581-2.451-3.676-2.591-5.993l-0.001-0.027zM26.744 5.453c-0.226-0.227-0.54-0.368-0.886-0.368-0.691 0-1.251 0.56-1.251 1.251 0 0.345 0.139 0.657 0.365 0.883l-0-0c2.168 2.31 3.567 5.365 3.775 8.741l0.002 0.040c-0.21 3.417-1.609 6.471-3.784 8.789l0.007-0.008c-0.224 0.226-0.362 0.537-0.362 0.88 0 0.691 0.56 1.251 1.251 1.251 0.345 0 0.657-0.14 0.883-0.365l-0 0c2.628-2.757 4.308-6.439 4.504-10.509l0.001-0.038c-0.198-4.108-1.878-7.79-4.512-10.553l0.006 0.007zM21.811 8.214c-0.226-0.224-0.537-0.363-0.881-0.363-0.69 0-1.25 0.56-1.25 1.25 0 0.343 0.138 0.653 0.361 0.879l-0-0c1.486 1.585 2.447 3.678 2.594 5.992l0.001 0.028c-0.151 2.343-1.111 4.436-2.601 6.027l0.005-0.005c-0.224 0.226-0.362 0.537-0.362 0.88 0 0.691 0.56 1.251 1.251 1.251 0.345 0 0.657-0.14 0.883-0.365l-0 0c1.939-2.036 3.178-4.754 3.323-7.759l0.001-0.028c-0.145-3.033-1.385-5.751-3.331-7.791l0.005 0.005z"></path> </g></svg>

                                    <svg v-else width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="opacity-[.8]" :class="player.trackList.length > 1 || player.audioType === 'radio' ? 'opacity-100' : 'opacity-50'"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M5.94601 5.59492C3.92853 4.15983 1 5.48359 1 7.83062V16.1694C1 18.5164 3.92853 19.8402 5.94601 18.4051L11 14.81V16.1694C11 18.5164 13.9285 19.8402 15.946 18.4051L21.8074 14.2357C23.3975 13.1046 23.3975 10.8954 21.8074 9.76429L15.946 5.59492C13.9285 4.15983 11 5.48359 11 7.83062V9.18996L5.94601 5.59492ZM3.0462 7.83062C3.0462 7.04828 4.02237 6.60703 4.69487 7.08539L10.5563 11.2548C11.0863 11.6318 11.0863 12.3682 10.5563 12.7452L4.69487 16.9146C4.02237 17.393 3.0462 16.9517 3.0462 16.1694V7.83062ZM13.0462 7.83062C13.0462 7.04828 14.0224 6.60703 14.6949 7.08539L20.5563 11.2548C21.0863 11.6318 21.0863 12.3682 20.5563 12.7452L14.6949 16.9146C14.0224 17.393 13.0462 16.9517 13.0462 16.1694V7.83062Z" fill="#ffffff"></path> </g></svg>
                                    </button>
                                    
                                    <button type="button" class="random-track md:block relative" v-if="player.audioType === 'radio'" @click="share(player.currentTrack.slug)">
                                        <div class="description absolute text-[#fff] leading-[40px] text-[14px] capitalize">
                                            Share
                                        </div>
                                        <font-awesome-icon class="text-[20px] text-white opacity-95" :icon="['fas', 'share-nodes']" />
                                    </button>
                                    <button type="button" class="random-track md:block relative" @click="player.audioType === 'radio'?'':player.playRandom = !player.playRandom" :class="{'!opacity-50':player.audioType === 'radio'}" v-else>
                                        <div class="description absolute text-[#fff] leading-[40px] text-[14px] capitalize">
                                            Shuffle
                                        </div>
                                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" :class="player.trackList.length > 1 ? 'opacity-100' : 'opacity-40'">
                                            <path d="M5.56024 19.24C5.56024 19.24 5.55025 19.24 5.54025 19.24L2.99023 19.23C2.58023 19.23 2.24023 18.89 2.24023 18.48C2.24023 18.07 2.58023 17.73 2.99023 17.73L5.54025 17.74H5.55023C6.20023 17.74 6.81026 17.42 7.17026 16.87L13.5602 7.28998C14.2002 6.32998 15.2702 5.75 16.4302 5.75C16.4302 5.75 16.4403 5.75 16.4503 5.75L21.0002 5.77002C21.4102 5.77002 21.7502 6.11002 21.7502 6.52002C21.7502 6.93002 21.4102 7.27002 21.0002 7.27002L16.4503 7.25H16.4402C15.7902 7.25 15.1803 7.57 14.8203 8.12L8.43024 17.7C7.79024 18.67 6.72024 19.24 5.56024 19.24Z" :fill="player.playRandom ? '#fff' : 'white'"/>
                                            <path d="M18.9999 21.2299C18.8099 21.2299 18.6199 21.1599 18.4699 21.0099C18.1799 20.7199 18.1799 20.2399 18.4699 19.9499L20.4699 17.9499C20.7599 17.6599 21.2399 17.6599 21.5299 17.9499C21.8199 18.2399 21.8199 18.7199 21.5299 19.0099L19.5299 21.0099C19.3799 21.1599 19.1899 21.2299 18.9999 21.2299Z" :fill="player.playRandom ? '#fff' : 'white'"/>
                                            <path d="M8.89001 9.87976C8.66001 9.87976 8.43 9.76976 8.28 9.56976L7.20001 8.06976C6.83001 7.55976 6.21999 7.25977 5.60999 7.25977L3 7.26978C2.54 7.25978 2.25 6.93978 2.25 6.51978C2.25 6.10978 2.58 5.76978 3 5.76978L5.60999 5.75977C5.61999 5.75977 5.62 5.75977 5.63 5.75977C6.74001 5.75977 7.77999 6.29976 8.42999 7.18976L9.51001 8.68976C9.75001 9.02976 9.68 9.48975 9.34 9.73975C9.2 9.82975 9.05001 9.87976 8.89001 9.87976Z" :fill="player.playRandom ? '#fff' : 'white'"/>
                                            <path d="M16.32 19.2499C15.26 19.2499 14.24 18.7499 13.59 17.9099L12.37 16.34C12.12 16.01 12.18 15.5399 12.5 15.2899C12.83 15.0399 13.3 15.0999 13.55 15.4199L14.77 16.9899C15.14 17.4699 15.73 17.7099 16.32 17.7499L20.99 17.7299C21.4 17.7299 21.74 18.0599 21.74 18.4799C21.74 18.8899 21.41 19.2299 20.99 19.2299L16.32 19.2499C16.33 19.2499 16.32 19.2499 16.32 19.2499Z" :fill="player.playRandom ? '#fff' : 'white'"/>
                                            <path d="M20.9999 7.26999C20.8099 7.26999 20.6199 7.19996 20.4699 7.04996L18.4699 5.04996C18.1799 4.75996 18.1799 4.27996 18.4699 3.98996C18.7599 3.69996 19.2399 3.69996 19.5299 3.98996L21.5299 5.98996C21.8199 6.27996 21.8199 6.75996 21.5299 7.04996C21.3799 7.19996 21.1899 7.26999 20.9999 7.26999Z" :fill="player.playRandom ? '#fff' : 'white'"/>
                                        </svg>
                                    </button>
                                </div>
                                <Transition name="slide-fade">
                                    <div class="fixed bottom-0 left-0 w-full rounded-t-lg bg-white" v-show="player.options">
                                        <ul ref="optionsZone">
                                            <li><button class="block py-3 px-3" @click="share(player.currentTrack.slug), player.options = false">Share</button></li>
                                        </ul>
                                    </div>
                                </Transition>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
    <ShareModel v-if="showShareModal" :route="showRoute" @close="showShareModal = false" />
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

.audio-bakground{
    transform: background-color 500ms linear
}

@media (max-height: 700px) {
  .audio-img {
    height: 45vh !important
  }
}

@media (max-height: 449px) {
  .audio-img {
    height: 10vh;
    width: 30%;
    margin:0 auto; 
  }
}

@media (min-width: 550px) {
  .audio-img {
    height: 40vh !important;
    width: 40vh !important;
    margin-bottom: 20px;
  }

  
  .audio-img-dsk{
        display: none;
    }

  .audio-img-small{
      display: block;
    }
}

@media (max-width: 1200px) {
    .volume{
        transform: translateX(-16px);
    }
}
.description {
  top: -50px;
  left: 50%;
  opacity: 0;
  display: flex;
  height: 40px;
  border-radius: 5px;
  padding-left: 20px;
  padding-right: 20px;
  background: #051724;
  transform-origin: bottom;
  transition: opacity 200ms ease-in;
  transform: translateX(-50%) translateY(20px) scaleY(0);
}

button:hover .description{
  opacity: 1;
  transform: translateX(-50%) translateY(0) scaleY(1);
}


/*Chrome*/
/* Box Container */
.contain {
	margin: 0 auto;

	/* width: 100%; */
	/* max-width: 720px; */
	/* min-height: 100vh; */

	display: flex;
	justify-content: space-around;
	align-items: center;
}

/* Keyframes Spin */
@keyframes spin {
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
}

/* Spinner */
.spinner {
	/* --spinner-color: red; */

	aspect-ratio: 1/1;
	border-radius: 50%;

	animation-name: spin;
	animation-iteration-count: infinite;
	animation-timing-function: linear;
}

.spinner--quarter {
	width: 28px;
	border: 3px solid black;
	border-top-color: transparent;

	animation-duration: 1s;
}

    .seek_slider, .volume_slider {
        overflow: hidden;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    height: 5px;
    background: #D9D9D924;
    -webkit-transition: .2s;
    transition: opacity .2s;
    }
    
    .seek_slider::-webkit-slider-thumb,
    .volume_slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: 5px;
    height: 5px;
    /* background: white; */
    border: 3px solid #F0CF7B;
    box-shadow: -2000px 0 0 2000px #F0CF7B;
    cursor: pointer;
    border-radius: 100%;
    }
    
    .seek_slider:hover,
    .volume_slider:hover {
    opacity: 1.0;
    }

  .volume_muted_slider::-webkit-slider-thumb{
    border: 3px solid #9b9b9b !important;
    box-shadow: -2000px 0 0 2000px #9b9b9b !important;
   }
</style>