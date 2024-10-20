import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import { localeTransitions } from './loadLangsToResources'

i18next.use(initReactI18next).init({
  lng: 'Chinese',
  ns: Object.keys(localeTransitions),
  resources: localeTransitions
})

export default i18next
