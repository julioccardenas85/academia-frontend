import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MainMenu from '../views/MainMenu.vue'
import ModuleMenu from '@/views/ModuleMenu.vue'
import UsersMenu from '../views/users/UsersMenu.vue'
import UsersSearch from '../views/users/UsersSearch.vue'
import NewUser from '@/views/users/NewUser.vue'
import InstructoresSearch from '@/views/instructores/InstructoresSearch.vue'
import NewInstructor from '@/views/instructores/NewInstructor.vue'
import GruposSearch from '@/views/grupos/GruposSearch.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
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
      path: '/mainMenu',
      name: 'mainMenu',
      component: MainMenu
    },
    {
      path: '/moduleMenu',
      name: 'moduleMenu',
      component: ModuleMenu
    },
    {
      path: '/users/usersMenu',
      name: 'usersMenu',
      component: UsersMenu
    },
    {
      path: '/users/usersSearch',
      name: 'usersSearch',
      component: UsersSearch
    },
    {
      path: '/users/editUser/:alumno',
      name: 'editUser',
      component: NewUser,
      props: true
    },
    {
      path: '/users/newUser',
      name: 'newUser',
      component: NewUser
    },
    {
      path: '/instructores/instructoresSearch',
      name: 'instructoresSearch',
      component: InstructoresSearch
    },
    {
      path: '/instructores/newInstructor',
      name: 'newInstructor',
      component: NewInstructor
    },
    {
      path: '/instructores/editInstructor/:instructor',
      name: 'editInstructor',
      component: NewInstructor,
      props: true
    },
    {
      path: '/grupos/gruposSearch',
      name: 'gruposSearch',
      component: GruposSearch
    },
  ]
})

export default router
