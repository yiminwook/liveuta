import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';
// import LocizeBackend from 'i18next-locize-backend'
import { initReactI18next } from 'react-i18next/initReactI18next';
import { DEFAULT_NS, FALLBACK_LANG, LANGUAGES, LANG_COOKIE_NAME } from './config';

const runsOnServerSide = typeof window === 'undefined';

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend(
      (language: string, namespace: string) => import(`../../../messages/${language}.json`),
    ),
  )
  // .use(runsOnServerSide ? LocizeBackend : resourcesToBackend((language, namespace) => import(`./locales/${language}/${namespace}.json`))) // locize backend could be used, but prefer to keep it in sync with server side
  .init({
    // debug: true,
    supportedLngs: LANGUAGES,
    fallbackLng: FALLBACK_LANG,
    lng: undefined, // let detect the language on client side
    fallbackNS: DEFAULT_NS,
    defaultNS: DEFAULT_NS,
    detection: {
      order: ['path', 'htmlTag', 'navigator'],
      lookupCookie: LANG_COOKIE_NAME,
      caches: ['cookie'],
    },
    preload: runsOnServerSide ? LANGUAGES : [],
    // backend: {
    //   projectId: '01b2e5e8-6243-47d1-b36f-963dbb8bcae3'
    // }
  });

export { i18next };
