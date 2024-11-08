import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import { MenuEnum } from '@/shared/enums'
import { MenuUtils } from '@/shared/utils'

type MenuStore = {
  menu: MenuEnum
  setMenu: (Menu: MenuEnum) => void
}

export const useMenuStore = create<MenuStore>()(
  subscribeWithSelector((set) => ({
    menu: MenuUtils.getMenu() as MenuEnum,
    setMenu: (menu: MenuEnum) => {
      set({ menu })
      MenuUtils.setMenu(menu)
    }
  }))
)

useMenuStore.subscribe(
  (state) => state.menu,
  (menu) => {
    useMenuStore.getState().setMenu(menu)
  },
  {
    fireImmediately: true
  }
)
