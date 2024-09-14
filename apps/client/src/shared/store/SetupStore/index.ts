import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

import { SetUp } from '@/shared/types/setup'
import { BookUtils } from '@/shared/utils'

type MenuStore = {
  setup: SetUp
  setSetUp: (setup: SetUp) => void
}

export const useSetUpStore = create<MenuStore>()(
  subscribeWithSelector((set) => ({
    setup: JSON.parse(BookUtils.getSetup()),
    setSetUp: (setup: SetUp) => {
      set({ setup })
      BookUtils.setSetup(JSON.stringify(setup))
    }
  }))
)

useSetUpStore.subscribe(
  (state) => state.setup,
  (setup) => {
    useSetUpStore.getState().setSetUp(setup as SetUp)
  },
  {
    fireImmediately: true
  }
)
