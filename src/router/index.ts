import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/AboutView.vue')
        },
        {
            name: 'innerPage',
            path: '/:type/:id',
            component: () => import('@/views/InnerView.vue'),
        },
        {
            name: 'genrePage',
            path: '/genre/:id-:name/:type',
            component: () => import('@/views/GenreView.vue'),
        },
        {
            name: 'listPage',
            path: '/:type',
            component: () => import('@/views/ListView.vue'),
        },
        {
            name: 'searchPage',
            path: '/search/:searchValue',
            component: () => import('@/views/SearchView.vue'),
        },

    ]
})

export default router
