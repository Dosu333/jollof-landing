<script setup lang="ts">
import { SvgKHorizontalMenu, SvgKLoveIcon, SvgKPlayIcon, SvgKShareIcon, SvgKTwitterYellow, SvgKLoveFilled } from '../../core/icons';
import { useRouter, useRoute } from 'vue-router';
// import moment from "moment";
import axios from 'axios';
import { inject, ref } from 'vue'
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const $toast = useToast();

 const props = defineProps({
    id: Number,
    title: String,
    duration: String,
    date: String,
    tagText: String,
    tagType: String,
    image: String,
    edit: Boolean,
    delete: Boolean,
    loading: Boolean,
    source: String,
    creator: Object,
    slug: String,

    // Card icons
    firstIcon: String,
    secondIcon: String,
 })

const emit = defineEmits(['deleteEpisodeId', 'viewEpisode', 'editEpisode']);

const router = useRouter()
const route = useRoute()
const isPlaying = ref(false);
const playingId = ref(0);
const showOptions = ref(false)
const podcaster_token = JSON.parse(localStorage.getItem('podcaster_response_info') ?? "");

//  const handleDeleteEpisode = () => {
//     swal({
//         title: 'Are you sure?',
//         text: "You are about to delete a Episode?",
//         icon: 'warning',
//         color: '#ffffff',
//         background: '#030F18',
//         confirmButtonColor: '#F0CF7B',
//         showCancelButton: true,
//         cancelButtonColor: '#d33',
//         confirmButtonText: 'Confirm!',
//         onBeforeOpen: () => {
//             swal.showLoading()
//         }
//     }).then((result:any) => {
//         if (result.value) {
//             axios.delete('creator/podcasts/'+route.params.id+'/episode/'+props.id, {
//                 headers: {
//                     "Authorization" : podcaster_token.type+' '+podcaster_token.token,
//                 }
//             })  
//             .then(res => {
//                 swal(
//                     'Deleted!',
//                     res.data.message,
//                     'success'
//                 )
//                 emit('deleteEpisodeId', props.id);
//                 showOptions.value = false;
//                 // router.replace(route.path);
//             })
//             .catch(e => {
//                 if(e){
//                     swal(
//                         'Error!',
//                         e.response.data.message,
//                         'error'
//                     )
//                 }
//             })
//         }
//     });

// }

const viewEpisodes = () =>{
    emit('viewEpisode');
}

const editEpisodes = () =>{
    emit('editEpisode');
}

function breakString (text:string, length:number){
    if(text && text && text.length > length){
        return text.substring(0, length)+'...';
    }else{
        return text;
    }
}

const playMusic = () => {
    const object = {
        id: props.id,
        logo: props.image,
        title: props.title,
        source: props.source,
        liked: false,
        creator: props.creator
    }
    localStorage.removeItem('player_details');
    localStorage.removeItem('liked');
    localStorage.setItem('player_details', JSON.stringify([object]));
    // localStorage.setItem('liked', JSON.stringify({ id: object.id, liked: object.liked})); 
    localStorage.setItem('audio-type', JSON.stringify('episode'));

    
    if(localStorage.getItem('isPlaying') && JSON.parse(localStorage.getItem('isPlaying') ?? '') == true && JSON.parse(localStorage.getItem('playingId') ?? '') === object.id){
        // localStorage.removeItem('playingId');
        // localStorage.setItem('playingId', JSON.stringify(0));
        // localStorage.setItem('isPlaying', JSON.stringify(false))
        isPlaying.value = JSON.parse(localStorage.getItem('isPlaying') ?? '')
        playingId.value = JSON.parse(localStorage.getItem('playingId') ?? '')
    }else{
        // localStorage.removeItem('playingId');
        // localStorage.setItem('playingId', JSON.stringify(object.id));
        localStorage.setItem('isPlaying', JSON.stringify(false));  
    }
}

const copyLink = () => {
    showOptions.value = false;
    $toast.success('Copied!');
}

</script>

<template>
    <div>
        <div class="relative flex items-center text-white mt-[25px] bg-[#12222D] rounded-md p-1">
            <div class="flex items-center md:w-[70px] md:h-[70px] w-[50px] h-[50px] md:mr-[15px] mr-[5px] rounded-md">
                <img v-if="!props.loading" :src="image+'?id='+Math.floor((Math.random() * 100) + 1)" class="h-[100%] cursor-pointer" alt="image" @click="viewEpisodes()">
                <div v-else class="container">
                    <span class="spinner spinner--quarter"></span>
                </div>
            </div>
            <div class="flex flex-col w-[70%]">
                <div class="flex items-center">
                    <h2 class="md:w-[400px] md:text-lg text-[12px] cursor-pointer leading-[20px]" @click="viewEpisodes()" >{{ props.title }}</h2>
                    <!-- <p class="text-yellow md:text-[15px] text-[10px] md:w-[200px] md:block hidden cursor-pointer">{{ duration }}</p> -->
                    <!-- <p class="text-[#9A9FA3] md:text-[15px] text-[10px] md:block hidden">{{ props.date ? moment(props.date).format('L') : "" }}</p> -->
                </div>
                <div class="text-[13px] text-[#9A9FA3]">
                    <slot class="leading-[20px] mt-[13px]" />
                </div>
            </div>
            <div v-if="!props.loading" class="flex items-center mx-auto md:mr-[30px] md:w-[150px] justify-end space-x-2">
                <button type="button" class="playpause-track text-[12px] bg-yellow min-w-[25px] min-h-[25px] rounded-full text-[#030F18]">
                    <font-awesome-icon :icon="['fas', 'play']" @click="playMusic()" />
                    <!-- <font-awesome-icon v-else :icon="['fas', 'pause']" /> -->
                </button>
                <button >
                    <button v-if="!showOptions" @click="showOptions = !showOptions">
                        <SvgKHorizontalMenu />
                    </button>
                    
                    <button v-else @click="showOptions = !showOptions">
                        <font-awesome-icon class="text-[20px]" :icon="['fas', 'xmark']" />
                    </button>
                    <div class="relative z-50 transition duration-150 ease-in transform origin-center scale-y-0" :class="{'scale-y-100' : showOptions }">
                    <div class="options absolute top-0 right-0 bg-[#051724] text-[14px] py-[10px] rounded-md">
                        <div class="flex flex-col text-[12px]">
                            <button type="button" class="flex w-[200px] px-5 hover:text-yellow py-[10px] text-left" @click="viewEpisodes()">View</button>
                            <button v-if="props.edit" type="button" class="flex w-[200px] px-5 hover:text-yellow py-[10px] text-left" @click="editEpisodes()">Edit</button>
                            <!-- <button type="button" class="border-b border-[#ffffff50] w-[200px] px-2 hover:text-yellow pb-[10px] text-left" @click="''">Share</button> -->
                            <button type="button" class="flex w-[200px] px-5 hover:text-green py-[10px] text-left" v-copy="'https://share.jollofradio.com/episode/'+props.slug" @click="copyLink()">Copy Link</button>
                            
                        </div>
                    </div>
                </div>
                </button>
                <!-- <button @click="handleDeleteEpisode()" v-if="props.delete">
                    <img src="../../../../../assets/images/trash.svg" alt="trash" class="md:w-[20px] w-[15px]">
                </button> -->
            </div>
            <!-- <div v-if="props.tagText && !props.loading" class="tag absolute top-0 right-0 md:text-[14px] text-[10px] md:py-[7px] py-[3px] md:px-[25px] px-[8px] rounded-md" :style="'background-color: green'">{{ props.tagText }}</div> -->
        </div>
    </div>
</template>

<style scoped>
.options button:last-of-type{
    border: 0;
}

.options button:nth-child(even) {
    background-color: rgba(204, 204, 204, 0.083);
}

.container {
	margin: 0 auto;

	display: flex;
	justify-content: space-around;
	align-items: left;
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
	border: 2px solid white;
	border-top-color: transparent;

	animation-duration: 1s;
}
</style>