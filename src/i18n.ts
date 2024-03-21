import { initReactI18next } from "react-i18next"
import i18n from "i18next"
import * as translations from "./translations"

i18n.use(initReactI18next).init({
  //debug: true,
  lng: "en",
  fallbackLng: "en",
  resources: {
    en: {
      translation: translations['en'].Strings
    },
},
  react: {
    bindI18nStore: "added", // refresh after adding to i18n resources
  },
})

export default i18n
