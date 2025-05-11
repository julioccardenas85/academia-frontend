import { createRouter, createWebHistory } from 'vue-router'
import ModuleMenu from '@/views/ModuleMenu.vue'
import UsersMenu from '../views/users/UsersMenu.vue'
import UsersSearch from '../views/users/UsersSearch.vue'
import NewUser from '@/views/users/NewUser.vue'
import InstructoresSearch from '@/views/instructores/InstructoresSearch.vue'
import NewInstructor from '@/views/instructores/NewInstructor.vue'
import GruposSearch from '@/views/grupos/GruposSearch.vue'
import NewGrupo from '@/views/grupos/NewGrupo.vue'
import GestionarAlumnos from '@/views/grupos/GestionarAlumnos.vue'
import Agenda from '../views/agenda/Agenda.vue'
import Login from '../views/auth/Login.vue'
import Payments from '../views/payments/Payments.vue'
import Success from '../views/payments/Success.vue'
import PaymentsTable from '../views/payments/PaymentsTable.vue'
import ManualPayment from '../views/payments/ManualPayment.vue'
import Failure from '../views/payments/Failure.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/moduleMenu',
      name: 'moduleMenu',
      component: ModuleMenu,
      meta: { requiresAuth: true }
    },
    {
      path: '/users/usersMenu',
      name: 'usersMenu',
      component: UsersMenu,
      meta: { requiresAuth: true }
    },
    {
      path: '/users/usersSearch',
      name: 'usersSearch',
      component: UsersSearch,
      meta: { requiresAuth: true }
    },
    {
      path: '/users/editUser/:usuario',
      name: 'editUser',
      component: NewUser,
      props: true,
      meta: { requiresAuth: true }
    },
    {
      path: '/users/newUser',
      name: 'newUser',
      component: NewUser,
      meta: { requiresAuth: true }
    },
    {
      path: '/instructores/instructoresSearch',
      name: 'instructoresSearch',
      component: InstructoresSearch,
      meta: { requiresAuth: true }
    },
    {
      path: '/instructores/newInstructor',
      name: 'newInstructor',
      component: NewInstructor,
      meta: { requiresAuth: true }
    },
    {
      path: '/instructores/editInstructor/:instructor',
      name: 'editInstructor',
      component: NewInstructor,
      props: true,
      meta: { requiresAuth: true }
    },
    {
      path: '/grupos/gruposSearch',
      name: 'gruposSearch',
      component: GruposSearch,
      meta: { requiresAuth: true }
    },
    {
      path: '/grupos/newGrupo',
      name: 'newGrupo',
      component: NewGrupo,
      meta: { requiresAuth: true }
    },
    {
      path: '/grupos/editGrupo/:grupo',
      name: 'editGrupo',
      component: NewGrupo,
      props: true,
      meta: { requiresAuth: true }
    },
    {
      path: '/grupos/gestionarAlumnos/',
      name: 'gestionarAlumnos',
      component: GestionarAlumnos,
      meta: { requiresAuth: true }
    },
    {
      path: '/grupos/gestionarAlumnos/:grupo',
      name: 'gestionarAlumnosGrupo',
      component: GestionarAlumnos,
      props: true,
      meta: { requiresAuth: true }
    },
    {
      path: '/agenda/agenda',
      name: 'agenda',
      component: Agenda,
      meta: { requiresAuth: true }
    },
    {
      path: '/pagos/tablaPagos',
      name: 'tablaPagos',
      component: PaymentsTable,
      meta: { requiresAuth: true }
    },
    {
      path: '/pagos/nuevoPago',
      name: 'nuevoPago',
      component: Payments,
      meta: { requiresAuth: true }
    },
    {
      path: '/pagos/pagoExitoso',
      name: 'pagoExitoso',
      component: Success,
      meta: { requiresAuth: true }
    },
    {
      path: '/pagos/pagoRechazado',
      name: 'pagoRechazado',
      component: Failure,
      meta: { requiresAuth: true }
    },
    {
      path: '/pagos/pagoManual',
      name: 'pagoManual',
      component: ManualPayment,
      meta: { requiresAuth: true }
    },
    {
      path: '/users/editarPagoManual/:pago',
      name: 'editarPagoManual',
      component: ManualPayment,
      props: true,
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token")

  if (to.meta.requiresAuth && !token) {
    next({ name: "login" })
  } else {
    next() 
  }
})

export default router
