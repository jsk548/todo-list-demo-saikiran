import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuestic } from "vuestic-ui";
import UUID from "vue-uuid";
import "vuestic-ui/css";
import App from './App.vue'

const app = createApp(App)

app.use(createPinia())
app.use(createVuestic())
app.use(UUID)
app.mount('#app')
