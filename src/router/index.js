import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import Details from '@/views/Details/index.vue'

import banner1 from '@/assets/banner1.jpg'
import banner2 from '@/assets/banner2.jpg'
import banner3 from '@/assets/banner3.jpg'
import banner4 from '@/assets/banner4.jpg'
import banner5 from '@/assets/banner5.jpg'
import banner6 from '@/assets/banner6.jpg'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '',
          component: Home,
          props: {
            listBanner: [
              { img: banner1, description: '北京' },
              { img: banner2, description: '上海' },
              { img: banner3, description: '广州' },
              { img: banner4, description: '深圳' },
              { img: banner5, description: '重庆' },
              { img: banner6, description: '天津' },
            ],
          }
        },
        {
          path: 'details',
          name: 'details',
          component: Details
        }
      ]
    }
  ]
})

export default router
