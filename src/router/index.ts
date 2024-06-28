import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:catchAll(.*)',
      component: () => import('../views/publicpages/NotFoundPage.vue')
    },
    {
      path: '/verify/:token',
      component: () => import('../views/publicpages/VerificationView.vue')
    },
    {
      path: '/',
      redirect: '/home',
      component: () => import('../views/LayoutView.vue'),
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('../views/publicpages/HomeView.vue'),
          meta: {
            title: 'Home Page',
            metaTags: [
              {
                name: 'description',
                content: 'JollofRadio home Page'
              }
            ]
          }
        },
        {
          path: '/podcast/:name',
          name: 'view-podcast',
          component: () => import('../views/publicpages/PodcastView.vue')
        },
        {
          path: '/view-all/:name',
          name: 'view.all.type',
          component: () => import('../views/publicpages/AllView.vue')
        },
        {
          path: '/station',
          name: 'view.all.station',
          component: () => import('../views/publicpages/AllRadioView.vue')
        },
        {
          path: '/podcasts',
          name: 'view.all.podcasts',
          component: () => import('../views/publicpages/AllPodcastView.vue')
        },
        {
          path: '/categories',
          name: 'view.all.categories',
          component: () => import('../views/publicpages/AllCategories.vue')
        },
        {
          path: '/category/:name',
          name: 'view.single.category',
          component: () => import('../views/publicpages/AllPodcastView.vue')
        },
        {
          path: '/search',
          name: 'view.search',
          component: () => import('../views/publicpages/SearchView.vue')
        }
      ]
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      ;('smooth')
      return savedPosition
    } else {
      ;('smooth')
      return { top: 0 }
    }
  }
})

export default router
