import { createWebHashHistory, createRouter } from 'vue-router'
import Layout from "@/features/layouts/index.vue"
import nprogress from 'nprogress'


const routes = [
  { path: "/home", redirect: '/' },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import("@/view/Home.vue")
      }]
  },
  {
    path: "/login",
    component: () => import("@/view/Login.vue")
  },
  {
    path: "/403",
    component: () => import("@/view/result/403.vue")
  },
  {
    path: "/404",
    component: () => import("@/view/result/404.vue")
  },
  {
    path: "/500",
    component: () => import("@/view/result/500.vue")
  },
  {
    path: '/user',
    component: Layout,
    children: [
      {
        path: 'manage',
        component: () => import("@/view/UserManage.vue")
      },
    ]
  },
  {
    path: '/bookshelf',
    component: Layout,
    children: [{
      path: "manage",
      component: () => import("@/view/BookShelfManage.vue")
    }]
  },
  {
    path: '/book',
    component: Layout,
    children: [{
      path: "manage",
      component: () => import("@/view/BookManage.vue")
    }]
  }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  nprogress.start()
  next()
})

router.afterEach(() => {
  nprogress.done()
})
