import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Services from '../views/Services.vue'
import Catalog from '../views/Catalog.vue'
import About from '../views/About.vue'
import Contact from '../views/Contact.vue'
import Terms from '../views/Terms.vue'
import Admin from '../views/Admin.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dienstleistungen',
    name: 'Services',
    component: Services
  },
  {
    path: '/katalog',
    name: 'Catalog',
    component: Catalog
  },
  {
    path: '/ueber-uns',
    name: 'About',
    component: About
  },
  {
    path: '/kontakt',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/agb',
    name: 'Terms',
    component: Terms
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router