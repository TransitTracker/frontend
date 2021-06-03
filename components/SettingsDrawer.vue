<template>
  <v-navigation-drawer
    :value="value"
    fixed
    hide-overlay
    temporary
    right
    width="33%"
    mobile-breakpoint="md"
    class="tt-settings"
    style="min-width: 350px"
    @input="$emit('input', $event)"
  >
    <v-toolbar
      flat
      class="v-bar--underline text-h6 font-weight-medium text--primary"
    >
      {{ $t('settings.title') }}
      <v-spacer></v-spacer>
      <v-btn icon @click="$emit('input', false)">
        <v-icon>{{ mdiClose }}</v-icon>
      </v-btn>
    </v-toolbar>
    <v-divider />
    <div class="d-flex flex-column tt-settings__container">
      <v-container>
        <SettingsPwa />
        <SettingsAgencies v-if="dataIsLoaded" />
        <div v-if="dataIsLoaded" class="my-3 mx-n3">
          <v-divider />
        </div>
        <h2 class="text-subtitle-1 font-weight-bold">
          {{ $t('settings.autoRefresh') }}
        </h2>
        <p class="text-body-2 mb-2">
          {{ $t('settings.autoRefreshDesc') }}
        </p>
        <SettingsItemGroup
          :value="settings.autoRefresh"
          @input="setSetting('autoRefresh', $event)"
        >
          <SettingsItem :icon="mdiSync" :value="true">
            {{ $t('settings.autoRefreshOn') }}
          </SettingsItem>
          <SettingsItem :icon="mdiSyncOff" :value="false">
            {{ $t('settings.autoRefreshOff') }}
          </SettingsItem>
        </SettingsItemGroup>
        <div class="my-3 mx-n3">
          <v-divider />
        </div>
        <h2 class="text-subtitle-1 font-weight-bold">
          {{ $t('settings.theme') }}
        </h2>
        <SettingsItemGroup
          :value="settings.theme"
          @input="setSetting('theme', $event)"
        >
          <SettingsItem :icon="mdiWhiteBalanceSunny" value="light">
            {{ $t('settings.themeLight') }}
          </SettingsItem>
          <SettingsItem :icon="mdiWeatherNight" value="dark">
            {{ $t('settings.themeDark') }}
          </SettingsItem>
          <SettingsItem
            :icon="mdiMonitor"
            value="system"
            :description="$t('settings.themeSystemDesc')"
          >
            {{ $t('settings.themeSystem') }}
          </SettingsItem>
        </SettingsItemGroup>
        <div class="my-3 mx-n3">
          <v-divider />
        </div>
        <h2 class="text-subtitle-1 font-weight-bold">
          {{ $t('settings.defaultScreen') }}
        </h2>
        <SettingsItemGroup
          :value="settings.launch"
          @input="setSetting('launch', $event)"
        >
          <SettingsItem :icon="mdiCloseCircleOutline" value="no">
            {{ $t('settings.noRedirect') }}
          </SettingsItem>
          <SettingsItem :icon="mdiViewGrid" value="/">
            {{ $t('app.tabHome') }}
          </SettingsItem>
          <SettingsItem :icon="mdiMap" value="/map">
            {{ $t('app.tabMap') }}
          </SettingsItem>
          <SettingsItem :icon="mdiTable" value="/table">
            {{ $t('app.tabTable') }}
          </SettingsItem>
        </SettingsItemGroup>
        <div class="my-3 mx-n3">
          <v-divider />
        </div>
        <h2 class="text-subtitle-1 font-weight-bold">
          {{ $t('settings.mobileTable') }}
        </h2>
        <p class="text-body-2 mb-2">{{ $t('settings.mobileTableDesc') }}</p>
        <SettingsItemGroup
          :value="settings.preferDesktopView"
          @input="setSetting('preferDesktopView', $event)"
        >
          <SettingsItem :icon="mdiViewList" :value="false">
            {{ $t('settings.mobileTableSimple') }}
          </SettingsItem>
          <SettingsItem
            :icon="mdiTable"
            :value="true"
            :description="$t('settings.mobileTablePrefrerDesktopDesc')"
          >
            {{ $t('settings.mobileTablePrefrerDesktop') }}
          </SettingsItem>
        </SettingsItemGroup>
        <div class="my-3 mx-n3">
          <v-divider />
        </div>
        <h2 class="text-subtitle-1 font-weight-bold">
          {{ $t('settings.language') }}
        </h2>
        <SettingsItemGroup
          :value="settings.lang"
          @input="setSetting('lang', $event)"
        >
          <SettingsItem value="en"> English </SettingsItem>
          <SettingsItem value="fr"> Français </SettingsItem>
        </SettingsItemGroup>
      </v-container>
      <v-spacer />
      <div class="primary white--text">
        <v-container
          class="d-flex align-center cursor-pointer"
          @click="aboutDialog = true"
        >
          <img src="/img/logo-white.svg" height="40px" />
          <div class="ml-4 font-weight-bold">
            {{ $t('aboutDialog.title') }}
          </div>
        </v-container>
      </div>
    </div>
    <SettingsAboutDialog v-model="aboutDialog" />
  </v-navigation-drawer>
</template>

<script>
import {
  mdiBus,
  mdiClose,
  mdiCloseCircleOutline,
  mdiFerry,
  mdiMagnify,
  mdiMap,
  mdiMinus,
  mdiMonitor,
  mdiPlus,
  mdiSync,
  mdiSyncOff,
  mdiTable,
  mdiTrain,
  mdiTram,
  mdiViewGrid,
  mdiViewList,
  mdiWeatherNight,
  mdiWhiteBalanceSunny,
} from '@mdi/js'

export default {
  props: {
    value: {
      required: true,
      type: Boolean,
    },
  },
  data: () => ({
    aboutDialog: false,
    mdiClose,
    mdiCloseCircleOutline,
    mdiMagnify,
    mdiMap,
    mdiMinus,
    mdiMonitor,
    mdiPlus,
    mdiSync,
    mdiSyncOff,
    mdiTable,
    mdiViewGrid,
    mdiViewList,
    mdiWeatherNight,
    mdiWhiteBalanceSunny,
    mdi: { bus: mdiBus, ferry: mdiFerry, train: mdiTrain, tram: mdiTram },
  }),
  computed: {
    dataIsLoaded() {
      return this.$store.state.app.dataIsLoaded
    },
    darkMode() {
      return this.$vuetify.theme.dark
    },
    pwa() {
      return this.$store.state.app
    },
    settings() {
      return this.$store.state.settings
    },
  },
  methods: {
    setSetting(setting, value) {
      if (setting === 'theme') {
        this.$vuetify.theme.dark = this.getTheme(value)
      } else if (setting === 'lang') {
        return this.$i18n.setLocale(value)
      }

      this.$store.commit('settings/set', { setting, value })
    },
    getTheme(value) {
      if (value === 'system') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches
      }
      if (value === 'dark') return true
      return false
    },
  },
}
</script>

<style lang="scss">
.tt-settings {
  .v-expansion-panel-content__wrap {
    padding: 0 !important;
  }

  &__container {
    height: calc(100vh - 56px);
  }

  &__about {
    background-color: #1f5784;
  }
}

@media (min-width: 960px) {
  .tt-settings__container {
    height: calc(100vh - 65px);
  }
}

.theme--dark .tt-settings__agencies {
  background-color: #363636 !important;
}
</style>
