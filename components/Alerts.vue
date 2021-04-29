<template>
  <v-banner
    v-if="alerts.length && showBanner"
    class="tt-banner"
    :color="alerts[0] ? alerts[0].color : null"
    :dark="isDark"
    single-line
  >
    <v-icon class="mr-2">
      {{ alerts[0].icon }}
    </v-icon>
    {{ alerts[0].title }}
    <template #actions>
      <v-btn
        v-if="alerts[0].action === 'openLink'"
        :href="alerts[0].actionParameters.url"
        target="_blank"
        text
        :title="alerts[0].actionParameters.title[lang]"
        :icon="$vuetify.breakpoint.smAndDown"
      >
        <v-icon class="d-md-none">{{ mdiOpenInNew }}</v-icon>
        <span class="d-none d-md-block">{{
          alerts[0].actionParameters.title &&
          alerts[0].actionParameters.title[lang]
        }}</span>
      </v-btn>
      <v-btn v-else text @click="showDialog = true">
        {{ $t('alert.readMore') }}
      </v-btn>
      <v-btn
        v-if="alerts[0].canBeClosed"
        icon
        :title="$t('alert.close')"
        @click="markAsRead(alerts[0].id)"
      >
        <v-icon>{{ mdiClose }}</v-icon>
      </v-btn>
    </template>
    <v-dialog v-model="showDialog" width="500px">
      <v-card>
        <v-toolbar>
          <v-toolbar-title>{{ alerts[0].title }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn
            icon
            :title="$t('regionSwitcher.close')"
            @click="showDialog = false"
          >
            <v-icon>{{ mdiClose }}</v-icon>
          </v-btn>
        </v-toolbar>
        <v-img
          v-if="alerts[0].image"
          :src="`${backendHost}/storage/content/alerts/${alerts[0].image}`"
        ></v-img>
        <!-- eslint-disable-next-line -->
        <v-card-text class="mt-4 text-body-1" v-html="alerts[0].body"></v-card-text>
        <v-card-actions>
          <v-btn
            v-if="alerts[0].canBeClosed"
            text
            color="primary"
            @click="markAsRead(alerts[0].id)"
          >
            <v-icon left>{{ mdiBookmarkCheck }}</v-icon>
            {{ $t('alert.markAsRead') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-banner>
</template>

<script>
import { mdiBookmarkCheck, mdiClose, mdiOpenInNew } from '@mdi/js'

export default {
  data: () => ({
    showBanner: true,
    showDialog: false,
    mdiBookmarkCheck,
    mdiClose,
    mdiOpenInNew,
    backendHost: process.env.backendHost,
    color: 'primary',
  }),
  computed: {
    alerts() {
      const readAlerts = this.$store.state.settings.readAlerts
      const alerts = this.$store.state.alerts.data
      return alerts.filter((alert) => {
        return !readAlerts.includes(alert.id)
      })
    },
    currentRegion() {
      return this.$store.state.settings.currentRegion
    },
    isDark() {
      let dark = false

      switch (this.color) {
        case 'primary':
        case 'primary-dark':
        case 'secondary-dark':
          dark = true
          break
      }

      return dark
    },
    lang() {
      return this.$i18n.locale
    },
    readAlerts() {
      return this.$store.state.settings.readAlerts
    },
  },
  methods: {
    markAsRead(id) {
      const value = [...this.readAlerts]
      value.push(id)

      this.$store.commit('settings/set', {
        setting: 'readAlerts',
        value,
      })
    },
  },
}
</script>

<style>
.tt-banner {
  z-index: 6;
}
</style>
