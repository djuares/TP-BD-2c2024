import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/create',
      name: 'create',
      component: () => import('../views/CreateView.vue'),
    },
    {
      path: '/read',
      name: 'read',
      component: () => import('../views/ReadView.vue'),
    },
    {
      path: '/update',
      name: 'update',
      component: () => import('../views/UpdateView.vue'),
    },
    {
      path: '/delete',
      name: 'delete',
      component: () => import('../views/DeleteView.vue'),
    },
    // Send unknown routes to the create view
    {
      path: '/:pathMatch(.*)*',
      redirect: '/read',
    },
  ],
})

export default router
