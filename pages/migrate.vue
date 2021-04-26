<template>
  <h1>...</h1>
</template>

<script>
export default {
  asyncData({ app, query, redirect, store }) {
    store.commit('settings/set', {
      setting: 'activeAgencies',
      value: query.ag.split(','),
    })

    store.commit('settings/set', {
      setting: 'autoRefresh',
      value: query.ar === 'true',
    })

    store.commit('settings/set', {
      setting: 'theme',
      value: query.dm === 'true' ? 'dark' : 'light',
    })
    app.vuetify.framework.theme.dark = query.dm === 'true'

    store.commit('settings/set', {
      setting: 'launch',
      value: query.dp,
    })

    store.commit('settings/set', {
      setting: 'lang',
      value: query.la,
    })
    app.i18n.setLocale(query.la)

    store.commit('settings/set', {
      setting: 'currentRegion',
      value: query.re,
    })

    return redirect(app.localePath('/'))
  },
  head() {
    return {
      meta: [
        {
          hid: 'robots',
          name: 'robots',
          content: 'noindex',
        },
      ],
    }
  },
}
</script>
