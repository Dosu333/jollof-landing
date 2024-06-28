import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { Vue3ProgressPlugin } from '@marcoschulte/vue3-progress'
import {
  faFacebook,
  faLinkedin,
  faTwitter,
  faInstagram,
  faDiscord,
  faXTwitter
} from '@fortawesome/free-brands-svg-icons'
import {
  faPhone,
  faChevronRight,
  faChevronLeft,
  faChevronDown,
  faPlay,
  faPause,
  faBell,
  faXmark,
  faTrash,
  faPen,
  faCamera,
  faLink,
  faBars,
  faUser,
  faMagnifyingGlass,
  faShareNodes,
  faRepeat
} from '@fortawesome/free-solid-svg-icons'
import { faFacebookF, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import axios from 'axios'
import VueSocialSharing from 'vue-social-sharing'

import { Skeletor } from 'vue-skeletor'
import Copy from 'vue3-copy'
import ToastPlugin from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-bootstrap.css'

import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

import App from './App.vue'
import router from './router'

import './assets/css/main.css'
import 'vue3-carousel/dist/carousel.css'
import 'vue-skeletor/dist/vue-skeletor.css'
import { createHead } from 'unhead'
import { InferSeoMetaPlugin } from '@unhead/addons'

library.add(
  faPhone,
  faChevronRight,
  faChevronLeft,
  faPlay,
  faPause,
  faBell,
  faXmark,
  faTrash,
  faPen,
  faCamera,
  faFacebook,
  faLinkedin,
  faTwitter,
  faInstagram,
  faLink,
  faFacebookF,
  faBars,
  faChevronDown,
  faUser,
  faMagnifyingGlass,
  faShareNodes,
  faRepeat,
  faDiscord,
  faWhatsapp,
  faXTwitter
)

axios.defaults.baseURL = 'http://4.222.185.57:10007/api/v1/'
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

const app = createApp(App)
const head: any = createHead()
head.use(InferSeoMetaPlugin())

app.component(Skeletor.name, Skeletor)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(Copy)
app.use(ToastPlugin)
app.use(VueSweetalert2)
app.use(Vue3ProgressPlugin)
app.use(createPinia())
app.use(head)
app.use(VueSocialSharing)
app.use(router)

app.mount('#app')
