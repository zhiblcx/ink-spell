import { LANGUAGE } from '@/shared/constants'
import { LanguageEnums } from '@/shared/enums'
import { LanguageUtils } from '@/shared/utils'
import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

type LanguageStore = {
  language: LanguageEnums
  setLanguage: (language: LanguageEnums) => void
}

export const useLanguageStore = create<LanguageStore>()(
  subscribeWithSelector((set) => ({
    language: (LanguageUtils.getLanguage() as LanguageEnums) || LANGUAGE[0].value,
    setLanguage: (language: LanguageEnums) => {
      set({ language })
      LanguageUtils.setLanguage(language)
    }
  }))
)

useLanguageStore.subscribe(
  (state) => state.language,
  (language) => {
    useLanguageStore.getState().setLanguage(language)
  },
  {
    fireImmediately: true
  }
)
