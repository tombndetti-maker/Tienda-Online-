
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './style.css'
import App from './App.vue'

// Crear la aplicación Vue
const app = createApp(App)

// Crear la instancia de Pinia
const pinia = createPinia()

// Registrar Pinia en Vue
app.use(pinia)

// Iniciar la aplicación
app.mount('#app')
