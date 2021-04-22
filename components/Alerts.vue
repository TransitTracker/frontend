<template>
  <v-banner
    v-if="alerts.length && showBanner"
    class="tt-banner"
    :color="alerts[0] ? alerts[0].color : null"
    dark
    single-line
  >
    <v-icon class="mr-2">
      {{ alerts[0].icon }}
    </v-icon>
    {{ alerts[0].title }}
    <template #actions>
      <v-btn text @click="showDialog = true">Lire plus</v-btn>
      <v-btn icon @click="markAsRead(alerts[0].id)">
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
        <!-- eslint-disable-next-line -->
        <v-card-text class="mt-4 text-body-1" v-html="alerts[0].body"></v-card-text>
        <v-card-actions>
          <v-btn text color="primary" @click="markAsRead(alerts[0].id)">
            <v-icon left>{{ mdiBookmarkCheck }}</v-icon>
            Marquer comme lu
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-banner>
</template>

<script>
import { mdiBookmarkCheck, mdiClose } from '@mdi/js'

export default {
  data: () => ({
    showBanner: true,
    showDialog: false,
    mdiBookmarkCheck,
    mdiClose,
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
    readAlerts() {
      return this.$store.state.settings.readAlerts
    },
  },
  methods: {
    markAsRead(id) {
      const value = this.readAlerts
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
  z-index: 10;
}
</style>
