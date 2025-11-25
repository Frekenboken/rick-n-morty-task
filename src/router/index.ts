import { createRouter, createWebHistory } from 'vue-router'

import CharactersPage from '../pages/characters/CharactersPage.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/characters'
    },
    {
      path: '/characters',
      name: 'characters',
      component: CharactersPage
    }
  ]
})
