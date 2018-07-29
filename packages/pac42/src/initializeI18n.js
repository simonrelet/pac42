import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-xhr-backend'
import moment from 'moment'
import { reactI18nextModule } from 'react-i18next'

// Add supported locales here.
// Don't add `'en'` (English), it is a built-in.
const momentLocalesLoaders = {
  es: () => import('moment/locale/es'),
  fr: () => import('moment/locale/fr'),
}

function initializeTranslations() {
  i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(reactI18nextModule)
    .init({
      fallbackLng: 'en',

      // Have a common namespace used around the full app.
      // This actually the name of the files under /public/locales/<lang>/
      ns: ['translations'],
      defaultNS: 'translations',

      debug: process.env.NODE_ENV !== 'production',

      interpolation: {
        // Not needed for react!!
        escapeValue: false,
      },

      react: {
        // Wait for the translations to be loaded before rendering the content.
        // This avoid having the default language displayed before changing to the current one.
        wait: true,
      },
    })
}

function initializeMoment() {
  // We remove the trailling country (Ex: en-US) for simplification.
  const language = global.navigator.language.replace(/-.*/, '')

  // English is a built-in.
  if (language !== 'en') {
    momentLocalesLoaders[language]().then(() => {
      moment.locale(language)
    })
  }
}

function initializeI18n() {
  initializeTranslations()
  initializeMoment()
}

export default initializeI18n
