import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import components from './components/UI'

import './assets/main.scss'
import VIntersection from "@/directives/Vintersection";

const app = createApp(App)
const pinia = createPinia()

components.forEach(component => {
    app.component(component.name, component);
})


app.use(pinia)
    .use(router)
    .directive('intersection', VIntersection)
    .mount('#app')
