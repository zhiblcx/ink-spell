import nprogress from 'nprogress'
import {
  PATH_ROOT,
  PATH_LOGIN,
} from "@/shared/constants/router-path"
import { AuthUtils } from '@ink-spell/axios'
import { RouteLocationNormalizedGeneric } from 'vue-router'

export const beforeEach = ((to: RouteLocationNormalizedGeneric) => {
  nprogress.start()
  // 如果没有登录，则跳转到登录页面
  if (to.path !== PATH_LOGIN && AuthUtils.getAccessToken() === null) {
    return { path: PATH_LOGIN }
  }

  // 如果登录了，则不跳转
  if (to.path === PATH_LOGIN && AuthUtils.getAccessToken() !== null) {
    return { path: PATH_ROOT }
  }
})

export const afterEach = (() => {
  nprogress.done()
})
