<template>
  <v-banner
    v-if="alert && showBanner"
    class="tt-banner"
    :color="alert ? alert.color : null"
    :dark="isDark"
    single-line
  >
    <v-icon class="mr-2">
      {{ alert.icon }}
    </v-icon>
    {{ alert.title }}
    <template #actions>
      <v-btn
        v-if="alert.action === 'openLink'"
        :href="actionUrl"
        target="_blank"
        text
        :title="alert.actionParameters.title[lang]"
        :icon="$vuetify.breakpoint.smAndDown"
      >
        <v-icon class="d-md-none">{{ mdiOpenInNew }}</v-icon>
        <span class="d-none d-md-block">{{
          alert.actionParameters.title && alert.actionParameters.title[lang]
        }}</span>
      </v-btn>
      <v-btn v-else text @click="showDialog = true">
        {{ $t('alert.readMore') }}
      </v-btn>
      <v-btn
        v-if="alert.canBeClosed"
        icon
        :title="$t('alert.close')"
        @click="markAsRead(alert.id)"
      >
        <v-icon>{{ mdiClose }}</v-icon>
      </v-btn>
    </template>
    <v-dialog v-model="showDialog" width="500px">
      <v-card>
        <v-toolbar>
          <v-toolbar-title>{{ alert.title }}</v-toolbar-title>
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
          v-if="alert.image"
          :src="`${backendHost}/storage/content/alerts/${alert.image}`"
        ></v-img>
        <!-- eslint-disable-next-line -->
        <v-card-text class="mt-4 text-body-1" v-html="alert.body"></v-card-text>
        <div
          v-if="alert.action === 'newAgencies'"
          class="tw-space-y-4 tw-px-4 tw-pb-2"
        >
          <TwAlertAgency
            v-for="slug in alert.actionParameters.agencies.split(',')"
            :key="slug"
            :agency-slug="slug"
          />
        </div>
        <v-card-actions>
          <v-btn
            v-if="alert.canBeClosed"
            text
            color="primary"
            @click="markAsRead(alert.id)"
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
    actionUrl() {
      if (!this.alert.actionParameters.url) return
      if (typeof this.alert.actionParameters.url !== 'object') {
        return this.alert.actionParameters.url
      }

      return this.alert.actionParameters.url[this.lang]
        .replace(':version', encodeURIComponent(process.env.version))
        .replace(':commit', encodeURIComponent(process.env.commitHash))
        .replace(':region', encodeURIComponent(this.currentRegion))
    },
    alert() {
      return this.$store.getters['alerts/getCurrentAlert']
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
  z-index: 4;
}
</style>
