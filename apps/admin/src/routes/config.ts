import { createWebHashHistory, createRouter } from 'vue-router'
import Layout from "@/features/layouts/index.vue"
import {
  PATH_HOME,
  PATH_ROOT,
  PATH_LOGIN,
  PATH_FORBIDDEN,
  PATH_NOT_FOUND,
  PATH_INTERNAL_SERVER_ERROR,
  PATH_USER_MANAGE,
  PATH_BOOKSHELF_MANAGE,
  PATH_BOOK_MANAGE,
} from "@/shared/constants/router-path"

const routes = [
  { path: PATH_HOME, redirect: PATH_ROOT },
  {
    path: PATH_LOGIN,
    component: () => import("@/view/Login.vue")
  },
  {
    path: PATH_ROOT,
    component: Layout,
    children: [{
      path: '',
      component: () => import("@/view/Home.vue")
    }]
  },
  {
    path: PATH_USER_MANAGE,
    component: Layout,
    children: [{
      path: '',
      component: () => import("@/view/UserManage.vue")
    }]
  },
  {
    path: PATH_BOOKSHELF_MANAGE,
    component: Layout,
    children: [{
      path: "",
      component: () => import("@/view/BookShelfManage.vue")
    }]
  },
  {
    path: PATH_BOOK_MANAGE,
    component: Layout,
    children: [{
      path: "",
      component: () => import("@/view/BookManage.vue")
    }]
  },
  {
    path: PATH_FORBIDDEN,
    component: () => import("@/view/result/403.vue")
  },
  {
    path: PATH_NOT_FOUND,
    component: () => import("@/view/result/404.vue")
  },
  {
    path: PATH_INTERNAL_SERVER_ERROR,
    component: () => import("@/view/result/500.vue")
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: PATH_NOT_FOUND
  }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
