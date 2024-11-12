import { createWebHashHistory, createRouter } from 'vue-router'
import Layout from "@/features/layouts/index.vue"


const routes = [
  { path: "/home", redirect: '/' },
  {
    path: '/',
    component: Layout,
    children: [{
      path: '',
      component: () => import("@/view/Home.vue"),
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
    children: [{
      path: 'manage',
      component: () => import("@/view/UserManage.vue")
    }]
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

