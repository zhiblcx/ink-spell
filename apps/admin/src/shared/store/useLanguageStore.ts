import { defineStore } from "pinia";
import { LanguageEnum } from "../enums/LanguageEnum";
import i18next from "i18next";
import { LanguageUtils } from "../utils/LanguageUtils";


export const useLanguageStore = defineStore("language", () => {
  const language = ref<LanguageEnum>(LanguageUtils.getLanguage() as LanguageEnum ?? LanguageEnum.CHINESE);

  function setLanguage(state: LanguageEnum) {
    language.value = state
    i18next.changeLanguage(state)
    LanguageUtils.setLanguage(state);
  }

  return { language, setLanguage }
})
