import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { MODE } from '@configs/env'

/**
 * @type { i18n }
 * i18n instance to translate app. It detect language of navigator and select right translate file.
 * Select FR language if languageDetector doesn't match with our files
 */
i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'fr',
        debug: MODE !== 'production',
        interpolation: {}
    })

export default i18n
