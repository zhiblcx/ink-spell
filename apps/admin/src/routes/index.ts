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
    path: "/register",
    component: () => import("@/view/Register.vue")
  },
  {
    path: '/user',
    component: Layout,
    children: [
      {
        path: 'info',
        component: () => import("@/view/user-manage/UserInfo/index.vue")
      },
      {
        path: 'dynamic',
        component: () => import("@/view/user-manage/UserDynamic/index.vue")
      }
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
