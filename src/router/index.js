import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BooksView from '../views/BooksView.vue'
import NasaPOD from '@/components/NasaPOD.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
  {
    path: '/books',
    name: 'books',
    component: BooksView,
  },
  {
    path: '/nasapod',
    name: 'pod',
    component: NasaPOD,
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
