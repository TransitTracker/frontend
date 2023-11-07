<template>
  <transition
    enter-from-class="tw-translate-x-[150%]"
    leave-to-class="tw-translate-x-[150%]"
    enter-active-class="tw-transition tw-duration-400 tw-ease-emphasized-decelerate"
    leave-active-class="tw-transition tw-duration-200 tw-ease-emphasized-accelerate"
  >
    <aside
      v-show="value"
      class="tw-fixed tw-inset-y-0 tw-left-auto tw-right-0 tw-z-10 tw-flex tw-h-full tw-w-1/3 tw-flex-col tw-gap-6 tw-overflow-hidden tw-rounded-l-2xl tw-bg-neutral-98 tw-p-6 tw-text-neutralVariant-30 dark:tw-bg-neutral-6 dark:tw-text-neutralVariant-80"
      style="min-width: 350px"
    >
      <div
        class="tw-flex tw-items-center tw-justify-between tw-text-[1.375rem] tw-leading-7"
      >
        {{ $t('settings.title') }}
        <StandardIconButton @click="closeSheet">
          <TwIcon :path="mdiClose" />
        </StandardIconButton>
      </div>
      <!--    TODO: Rework notifications settings-->
      <!--    <div v-if="dataIsLoaded" class="primary-dark white&#45;&#45;text">-->
      <!--      <v-container-->
      <!--        class="d-flex align-center cursor-pointer"-->
      <!--        @click="openNotificationsCentre()"-->
      <!--      >-->
      <!--        <v-icon dark>{{ mdiBell }}</v-icon>-->
      <!--        <div class="ml-4 text-subtitle-1 font-weight-bold">-->
      <!--          {{ $t('notifications.title') }}-->
      <!--        </div>-->
      <!--        <v-spacer />-->
      <!--        <v-icon dark>{{ mdiArrowRight }}</v-icon>-->
      <!--      </v-container>-->
      <!--    </div>-->
      <SettingsPwa />
      <TwDetails>
        <template #summary>
          <h2 class="tw-text-sm tw-font-medium">
            {{ $t('settings.agenciesTitle') }}
          </h2>
        </template>
        <p class="text-body-2 mb-2">
          <!--            TODO: Translate-->
          Les agences qui ne sont pas activés ne seront pas chargés dans
          l'application. Ceci permet d'économiser des données.
        </p>
        <SettingsAgencies v-if="dataIsLoaded" />
      </TwDetails>
      <div>
        <h2 class="tw-text-sm tw-font-medium">
          {{ $t('settings.autoRefresh') }}
        </h2>
        <p class="text-body-2 mb-2">
          {{ $t('settings.autoRefreshDesc') }}
        </p>
        <SettingsItemGroup
          :value="settings.autoRefresh"
          :options="[
            {
              label: $t('settings.autoRefreshOn'),
              value: true,
              icon: mdiSync,
            },
            {
              label: $t('settings.autoRefreshOff'),
              value: false,
              icon: mdiSyncOff,
            },
          ]"
          @input="setSetting('autoRefresh', $event)"
        />
      </div>
      <div>
        <h2 class="tw-text-sm tw-font-medium">
          {{ $t('settings.theme') }}
        </h2>
        <SettingsItemGroup
          :value="settings.theme"
          :options="[
            {
              label: $t('settings.themeLight'),
              value: 'light',
              icon: mdiWhiteBalanceSunny,
            },
            {
              label: $t('settings.themeDark'),
              value: 'dark',
              icon: mdiWeatherNight,
            },
            {
              label: $t('settings.themeSystem'),
              description: $t('settings.themeSystemDesc'),
              value: 'system',
              icon: mdiMonitor,
            },
          ]"
          @input="setSetting('theme', $event)"
        />
      </div>
      <div>
        <h2 class="tw-text-sm tw-font-medium">
          <!--        TODO: Translate -->
          {{ $t('settings.mapTheme') }}
        </h2>
        <SettingsItemGroup
          :value="settings.mapTheme"
          :options="[
            {
              label: 'Default',
              value: 'default',
            },
            {
              label: 'Satellite',
              value: 'satellite',
              icon: mdiEarth,
            },
          ]"
          @input="setSetting('mapTheme', $event)"
        />
      </div>
      <div>
        <h2 class="tw-text-sm tw-font-medium">
          {{ $t('settings.defaultScreen') }}
        </h2>
        <SettingsItemGroup
          :value="settings.launch"
          :options="[
            {
              label: $t('settings.noRedirect'),
              value: 'no',
              icon: mdiCloseCircleOutline,
            },
            {
              label: $t('app.tabHome'),
              value: '/',
              icon: mdiViewGrid,
            },
            {
              label: $t('app.tabMap'),
              value: '/map',
              icon: mdiMap,
            },
            {
              label: $t('app.tabTable'),
              value: '/table',
              icon: mdiTable,
            },
          ]"
          @input="setSetting('launch', $event)"
        />
      </div>
      <TwDetails>
        <template #summary>
          <h2 class="tw-text-sm tw-font-medium">
            {{ $t('settings.table') }}
          </h2>
        </template>
        <p class="text-body-2 mb-2">{{ $t('settings.tableDesc') }}</p>
        <SettingsTableColumns />
      </TwDetails>
      <div>
        <h2 class="tw-text-sm tw-font-medium">
          {{ $t('settings.language') }}
        </h2>
        <SettingsItemGroup
          :value="settings.lang"
          :options="[
            {
              label: 'English',
              value: 'en',
            },
            {
              label: 'Français',
              value: 'fr',
            },
          ]"
          @input="setSetting('lang', $event)"
        />
      </div>
      <div class="tw-grow" />
      <button
        class="-tw-mx-6 -tw-mb-6 tw-flex tw-items-center tw-gap-4 tw-bg-primary-90 tw-p-6 tw-text-primary-10 dark:tw-bg-primary-30 dark:tw-text-primary-90"
        @click="aboutDialog = true"
      >
        <img src="/img/logo-white.svg" height="40px" />
        <div class="tw-text-left">
          <p class="!tw-mb-0">
            {{ $t('aboutDialog.title') }} <b>Transit&nbsp;Tracker</b>
          </p>
          <small class="!tw-mb-0">Version {{ version }}</small>
        </div>
      </button>
      <SettingsAboutDialog v-model="aboutDialog" />
    </aside>
  </transition>
</template>

<script>
import {
  mdiArrowRight,
  mdiBell,
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
  mdiEarth,
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
    mdiArrowRight,
    mdiBell,
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
    mdiEarth,
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
    version() {
      return process.env.version
    },
  },
  methods: {
    closeSheet() {
      this.$emit('input', false)
    },
    openNotificationsCentre() {
      this.$store.commit('app/set', {
        key: 'openNotificationsCentre',
        value: true,
      })
    },
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
  z-index: 11;

  .v-expansion-panel-content__wrap {
    padding: 0 !important;
  }

  &__container {
    height: calc(100vh - 56px);
  }

  &__about {
    background-color: #cfe5ff;
    color: #001d36;
    a {
      color: #001d36;
    }
  }
}

@media (min-width: 960px) {
  .tt-settings__container {
    height: calc(100vh - 65px);
  }
}

.theme--dark .tt-settings {
  &__agencies {
    background-color: #363636 !important;
  }

  &__about {
    background-color: #00497a;
    color: #cfe5ff !important;

    &-by {
      color: #cfe5ff !important;
    }

    .text-body-2,
    .black--text {
      color: white !important;
    }
  }
}
</style>
