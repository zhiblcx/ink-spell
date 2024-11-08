import { LANGUAGE } from '@/shared/constants'
import { LanguageEnum } from '@/shared/enums'
import i18n from '@/shared/i18n/config'
import { LanguageUtils } from '@/shared/utils'
import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

type LanguageStore = {
  language: LanguageEnum
  setLanguage: (language: LanguageEnum) => void
}

export const useLanguageStore = create<LanguageStore>()(
  subscribeWithSelector((set) => ({
    language: (LanguageUtils.getLanguage() as LanguageEnum) || LANGUAGE[0].value,
    setLanguage: (language: LanguageEnum) => {
      set({ language })
      i18n.changeLanguage(language)
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
