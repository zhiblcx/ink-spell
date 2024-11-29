import i18next from 'i18next'
import I18NextVue from 'i18next-vue'
import LanguageDetector from 'i18next-browser-languagedetector'
import { localeTransitions } from "./loadLangsToResources"
import { App } from 'vue';

i18next
  .use(LanguageDetector)
  .init({
    fallbackLng: 'zh-CN',
    resources: localeTransitions
  });

export default function (app: App<Element>) {
  app.use(I18NextVue, { i18next })
  return app
}
