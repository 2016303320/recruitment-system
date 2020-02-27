import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ResumeSubmit from '../views/ResumeSubmit.vue'
import AdminInf from '../views/AdminInf'
import AdminResume from '../views/AdminResume'
import Admin from '../views/Admin'
import SelectAdmin from '../views/SelectAdmin'
Vue.use(VueRouter)

const routes = [
  {
    path: '/resume',
    name: 'Home',
    component: Home
  },
  {
    path: '/resumeSubmit',
    name: 'ResumeSubmit',
    component: ResumeSubmit
  },
  {
    path: '/adminInf',
    name: 'AdminInf',
    component: AdminInf
  },
  {
    path: '/adminResume',
    name: 'AdminResume',
    component: AdminResume
  },
  {
    path: '/admin',
    component: Admin
  },
  {
    path: '/selectAdmin',
    component: SelectAdmin
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
