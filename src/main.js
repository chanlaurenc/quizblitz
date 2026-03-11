import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router'
import { useGameStore } from './stores/gameStore'   // for testing

const app = createApp(App)
app.use(createPinia())
app.use(router)

useGameStore()   // for testing

app.mount('#app')