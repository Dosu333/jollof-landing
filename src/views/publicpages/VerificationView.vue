<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import { gotoExternalRoute, gotoExternalRouteOnTab } from '../../cores/actions'
import { inject } from 'vue'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'

const swal: any = inject('$swal')
const $toast = useToast()

const router = useRouter()
const route = useRoute()
const error = ref('')
const isLoading = ref(true)
const errorLog = ref(false)
const isFailed = ref('')
const mailError = ref(false)

onMounted(() => {
  axios
    .get('services/verify/' + route.params.token)
    .then((res) => {
      isLoading.value = false
      if (res.data.status == 200) {
        // swal.fire({
        //     text: 'You have been verified.',
        //     color: '#ffffff',
        //     background: '#030F18',
        //     confirmButtonColor: '#F0CF7B',
        // })

        $toast.success('Your email has been verified.')
      } else {
        errorLog.value = true
        error.value = res.data.message
        if (res.data.data.email) {
          isFailed.value = res.data.data.email
        } else {
          mailError.value = true
        }
      }
    })
    .catch((e) => {
      if (e) {
        isLoading.value = false
        errorLog.value = true
        error.value = 'Sever Error'
      }
    })
})

const resend = () => {
  isLoading.value = true
  const email = {
    email: isFailed.value
  }

  axios
    .post('services/verify', email)
    .then((res) => {
      isLoading.value = false
      if (res.data.status == 200) {
        swal
          .fire({
            text: 'A verfication link has been sent to your email',
            color: '#ffffff',
            background: '#030F18',
            confirmButtonColor: '#F0CF7B'
          })
          .then((result: any) => {
            isFailed.value = ''
            return gotoExternalRoute('https://app.jollofradio.com')
          })
      }
    })
    .catch((e) => {
      if (e) {
        isLoading.value = false
        errorLog.value = true
        error.value = 'Sever Error'
      }
    })
}

const continueProcess = () => {
  gotoExternalRouteOnTab('https://app.jollofradio.com')
}
</script>

<template>
  <div class="">
    <div class="box relative p-5 md:w-[400px] w-[90%] bg-[#2a9d8f90]">
      <div
        v-if="isLoading"
        class="flex absolute bg-[#207b70] loader-wrapper left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] w-full h-full items-center justify-center"
      >
        <div class="pulse"></div>
      </div>
      <div class="flex justify-center">
        <img class="w-[100px]" src="../../assets/images/bug.png" alt="logo" />
      </div>
      <h2 class="font-bold text-[1.5em] text-[#ffffff] tracking-wide text-center">
        Account Verification{{ errorLog ? ' Failed' : ' Successful' }}.
      </h2>
      <!-- <p class="text-[12px] text-[#ffffff] tracking-wide">Your data security is of high importance to us, please prove that your are who you say you are by clicking on the button below and following the next instruction.</p> -->
      <div class="flex justify-center mt-5 flex-col">
        <button class="text-black p-1 px-4 rounded-full text-sm" v-if="isFailed == '' && isLoading">
          <i class="text-white/40">Hang on, verifying your account...</i>
        </button>
        <!-- <button class="text-black p-1 px-4 rounded-full text-sm" v-else-if="mailError"><i class="text-[#f4a261] text-[11px]">There is an error with this token, please contact the help center.</i></button> -->
        <button class="text-black p-1 px-4 rounded-full text-sm" v-else-if="mailError">
          <i class="text-[#f4a261] text-[11px]">{{ error }}</i>
        </button>
        <button
          @click="resend()"
          class="bg-[#F0CF7B] text-black p-1 px-4 rounded-full text-sm"
          v-else-if="isFailed && !isLoading"
        >
          Resend link
        </button>
        <button
          class="bg-[#F0CF7B] text-black p-1 px-[50px] rounded-full text-sm"
          v-else-if="isFailed && isLoading"
        >
          <div class="container">
            <span class="spinner spinner--quarter"></span>
          </div>
        </button>
        <button
          @click="continueProcess()"
          class="bg-[#F0CF7B] text-black p-1 px-4 rounded-full text-sm"
          v-else
        >
          SIGN IN TO CONTINUE
        </button>
      </div>
    </div>
  </div>
</template>

<style>
.box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
  width: 13px;
  border: 1px solid black;
  border-top-color: transparent;

  animation-duration: 1s;
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
</style>


