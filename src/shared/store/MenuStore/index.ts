import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

import { Menu } from '@/shared/enums'
import { MenuUtils } from '@/shared/utils'

type MenuStore = {
  menu: Menu
  setMenu: (Menu: Menu) => void
}

export const useMenuStore = create<MenuStore>()(
  subscribeWithSelector((set) => ({
    menu: MenuUtils.getMenu() as Menu,
    setMenu: (menu: Menu) => {
      set({ menu })
      MenuUtils.setMenu(menu)
    }
  }))
)

useMenuStore.subscribe(
  (state) => state.menu,
  (Menu) => {
    useMenuStore.getState().setMenu(Menu)
  },
  {
    fireImmediately: true
  }
)
