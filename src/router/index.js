import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import ResumeSubmit from '../views/ResumeSubmit.vue'
import AdminInf from '../views/AdminInf'
import AdminResume from '../views/AdminResume'
import Admin from '../views/Admin'
import SelectAdmin from '../views/SelectAdmin'
import JobDescription from '../views/JobDescription'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: JobDescription
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
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
