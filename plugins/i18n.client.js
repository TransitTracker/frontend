export default function ({ app, store }) {
  app.i18n.onBeforeLanguageSwitch = (oldLocale, newLocale, initialSetup) => {
    // If first load and language is defined, continue (the middleware will set the correct language)
    if (initialSetup && store.state.settings.lang) return

    store.commit('settings/set', { setting: 'lang', value: newLocale })
  }
}
