import './assets/main.css'

import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import messages_en from './locales/en_us.json'
import messages_hu from './locales/hu.json'

const savedLocale = localStorage.getItem('locale') || 'en_us'

const pinia = createPinia()

const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: 'en_us',
  warnHtmlMessage: false,
  messages: {
    en_us: messages_en,
    hu: messages_hu
  }
})

// tailwind darkmode stuff
if (
  localStorage.theme == 'dark' ||
  (!('theme' in localStorage) &&
    window.matchMedia('(prefers-color-scheme: dark)').matches)
) {
  document.documentElement.classList.add('dark')
} else {
  document.documentElement.classList.remove('dark')
}

// warn user
console.log(
  '%cWARNING: Pasting code into this console might compromise your data, make the application unusable, or create a hacker-topia in your browser!',
  'color: yellow; font-weight: bold;'
)

const app = createApp(App)

app.use(i18n)
app.use(router)
app.use(pinia)
app.mount('#app')
