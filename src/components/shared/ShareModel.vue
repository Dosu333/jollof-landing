<script setup lang="ts">
import { ref } from "vue";
import { inject } from 'vue'; 
import {useToast} from 'vue-toast-notification'; 


const $toast = useToast();
const navigate = navigator.share;

const props = defineProps({
    showModel: Boolean,
    route: String,
})

const emit = defineEmits(['close'])

const social = ref([
    {
        name: "facebook",
        icon: "facebook-f",
        url: "facebook",
        api: "https://www.facebook.com/sharer/sharer.php?u=",
    },
    {
        name: "twitter",
        icon: "x-twitter",
        url: "twitter",
        api: "https://twitter.com/intent/tweet?url=",
    },
    {
        name: "whatsapp",
        icon: "whatsapp",
        url: "whatsapp",
        api: "https://api.whatsapp.com/send?text=",
    },
])

const shareTo = (social:any, url:string) => {
    window.open(`${social}${url}`);
}

const close = () => {
    emit('close', false);
}

const copyLink = (url:string) => {
    var tempInput = document.createElement("input");
    tempInput.value = url;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    $toast.success('Copied Link!');
    close();
}

const shareLink = (url:any) => {
    let shareData = {
        url: "",
    };

    shareData.url = url;

    navigator.share(shareData);
}

</script>

<template>
    <div class="fixed grid place-items-center h-screen w-screen top-0 left-0 bg-black/20 z-[9999]" @click.self="close()">
        <div class="share-wrapper w-[400px] bg-white rounded-lg py-2 px-3">
            <h2 class="text-[20px] mb-1 font-bold text-black">Share</h2>
            <hr>
            <p class="mt-3 text-black">Share this via</p>
            <div class="mt-4 flex gap-4">
                <button
                    :class="`grid border place-content-center text-[20px] w-[50px] h-[50px] rounded-full ${item.name}`"
                    v-for="(item, index) in social" :key="index"
                    @click="shareTo(item.api, props.route ?? '')"
                >
                    <font-awesome-icon :icon="['fab', item.icon]" />
                </button>
                <button
                    v-if="false"
                    :class="`grid border place-content-center text-[20px] w-[50px] h-[50px] rounded-full text-black`"
                    @click="shareLink(props.route ?? '')"
                >
                    <font-awesome-icon :icon="['fas', 'share-nodes']" />
                </button>
            </div>
            <p class="mt-3 text-black">Or copy link</p>
            <div class="mt-4 flex gap-4 relative mb-6">
                <input type="text" placeholder="Link" :value="props.route" class="w-full border py-2 px-3 pr-[70px] text-black" disabled>
                <button class="absolute block right-2 top-1.5 text-sm bg-[#00000015] text-black py-1 px-3 rounded-full" @click="copyLink(props.route ?? '')">Copy</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.facebook{
    transition: background 200ms linear, color 200ms linear;
    @apply border-blue-700 text-blue-700 hover:text-white hover:bg-blue-700
}

.instagram{
    transition: background 200ms linear, color 200ms linear;
    @apply border-pink-700 text-pink-700 hover:text-white hover:bg-pink-700
}

.whatsapp{
    transition: background 200ms linear, color 200ms linear;
    @apply border-green-700 text-green-700 hover:text-white hover:bg-green-700
}

.discord{
    transition: background 200ms linear, color 200ms linear;
    @apply border-[#7289D7] text-[#7289D7] hover:text-white hover:bg-[#7289D7]
}

.twitter{
    transition: background 200ms linear, color 200ms linear;
    @apply border-[#1d1d1d] text-[#1d1d1d] hover:text-white hover:bg-[#1d1d1d]
}

@media (max-width: 412px) {
    .share-wrapper{
        @apply w-full;
    }
}
</style>