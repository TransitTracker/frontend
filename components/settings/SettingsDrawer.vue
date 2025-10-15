<template>
  <transition
    enter-active-class=""
    enter-class="*:-tw-translate-x-full !tw-bg-opacity-0"
    enter-to-class="*:tw-translate-x-0"
    leave-active-class=""
    leave-class="*:tw-translate-x-0"
    leave-to-class="*:-tw-translate-x-full !tw-bg-opacity-0"
  >
    <div
      class="tw-fixed tw-inset-0 tw-z-20 tw-h-screen tw-w-screen tw-bg-neutralVariant-20 tw-bg-opacity-32 tw-transition-colors tw-duration-300 tw-ease-standard-effects-slow"
      v-if="view"
    >
      <section
        class="tw-fixed tw-inset-x-0 tw-inset-y-0 tw-z-20 tw-h-full tw-overflow-y-auto tw-bg-neutral-96 tw-transition-transform tw-duration-500 tw-ease-standard-spatial dark:tw-bg-neutral-10 md:tw-left-20 md:tw-w-1/2 md:tw-max-w-100 md:tw-rounded-r-2xl md:tw-shadow-lg"
      >
        <div
          class="tw-fixed tw-z-30 tw-flex tw-w-full tw-items-center tw-gap-x-3 tw-bg-neutral-96 tw-p-4 dark:tw-bg-neutral-10 md:tw-max-w-100 md:tw-rounded-tr-2xl"
        >
          <TwStandardIconButton
            v-if="view !== 'allSettings'"
            @click="view = 'allSettings'"
          >
            <TwIcon :path="mdiArrowLeft" />
          </TwStandardIconButton>
          <h2 class="tw-grow tw-font-heading tw-text-[1.375rem] tw-leading-7">
            {{ $t(view) }}
          </h2>
          <TwStandardIconButton @click="view = false">
            <TwIcon :path="mdiClose" />
          </TwStandardIconButton>
        </div>
        <div
          class="tw-flex tw-min-h-full tw-flex-col tw-gap-6 tw-px-4 tw-pt-20"
          v-if="view === 'allSettings'"
          ref="allSettings"
        >
          <SettingsPwa />
          <SettingsGroup :title="$t('language')">
            <SettingsItem value="en" setting="lang"> English </SettingsItem>
            <SettingsItem value="fr" setting="lang"> Français </SettingsItem>
          </SettingsGroup>
          <SettingsGroup
            v-if="dataIsLoaded"
            :title="$t('notifications')"
            :description="
              notificationState !== 'unsupported' && $t('notificationsDesc')
            "
            :new-view="notificationState !== 'unsupported' && 'notifications'"
          >
            <div
              class="tw-col-span-full tw-flex tw-items-center tw-gap-x-2"
              v-if="notificationState === 'unsupported'"
            >
              <TwIcon
                :path="mdiAlertCircle"
                class="tw-text-surfaceVariant-40 dark:tw-text-surfaceVariant-80"
              />
              {{ $t('notificationsUnsupported') }}
            </div>
          </SettingsGroup>
          <SettingsGroup
            v-if="dataIsLoaded"
            :title="$t('hiddenAgencies')"
            :description="$t('hiddenAgenciesDesc')"
            new-view="hiddenAgencies"
          >
            <div class="tw-col-span-full tw-flex tw-items-center tw-gap-x-2">
              <TwIcon
                :path="
                  settings.hiddenAgencies.length === 0
                    ? mdiCheckCircle
                    : mdiAlertCircle
                "
                :class="[
                  settings.hiddenAgencies.length === 0
                    ? 'tw-text-primary-40 dark:tw-text-primary-80'
                    : 'tw-text-error-40 dark:tw-text-error-80',
                ]"
              />
              {{
                $tc('hiddenAgenciesQuantity', settings.hiddenAgencies.length)
              }}
            </div>
          </SettingsGroup>
          <SettingsGroup
            :title="$t('autoRefresh')"
            :description="$t('autoRefreshDesc')"
          >
            <SettingsItem :icon="mdiSync" :value="true" setting="autoRefresh">
              {{ $t('autoRefreshOn') }}
            </SettingsItem>
            <SettingsItem
              :icon="mdiSyncOff"
              :value="false"
              setting="autoRefresh"
            >
              {{ $t('autoRefreshOff') }}
            </SettingsItem>
          </SettingsGroup>
          <SettingsGroup :title="$t('theme')">
            <SettingsItem
              :icon="mdiWhiteBalanceSunny"
              value="light"
              setting="theme"
            >
              {{ $t('themeLight') }}
            </SettingsItem>
            <SettingsItem :icon="mdiWeatherNight" value="dark" setting="theme">
              {{ $t('themeDark') }}
            </SettingsItem>
            <SettingsItem
              :icon="mdiMonitor"
              value="system"
              setting="theme"
              :description="$t('themeSystemDesc')"
            >
              {{ $t('themeSystem') }}
            </SettingsItem>
          </SettingsGroup>
          <SettingsGroup
            :title="$t('grouping')"
            :description="$t('groupingDesc')"
          >
            <SettingsItem :icon="mdiMenu" :value="null" setting="tableGroupBy">
              {{ $t('noGrouping') }}
            </SettingsItem>
            <SettingsItem
              :icon="mdiFormatListGroup"
              value="properties.agencyId"
              setting="tableGroupBy"
            >
              {{ $t('groupByAgency') }}
            </SettingsItem>
          </SettingsGroup>
          <SettingsGroup
            :title="$t('listColumns')"
            new-view="listColumns"
            :description="$t('listColumnsDesc')"
          />
          <SettingsGroup :title="$t('defaultScreen')">
            <SettingsItem
              :icon="mdiCloseCircleOutline"
              value="no"
              setting="launch"
            >
              {{ $t('noRedirect') }}
            </SettingsItem>
            <SettingsItem :icon="mdiViewGrid" value="/" setting="launch">
              {{ $t('app.tabHome') }}
            </SettingsItem>
            <SettingsItem :icon="mdiMap" value="/map" setting="launch">
              {{ $t('app.tabMap') }}
            </SettingsItem>
            <SettingsItem :icon="mdiTable" value="/table" setting="launch">
              {{ $t('app.tabTable') }}
            </SettingsItem>
          </SettingsGroup>
          <div class="tw-grow"></div>
          <button
            class="tw-group tw-relative tw-flex tw-items-center tw-justify-center tw-gap-x-4 tw-rounded-t-xl tw-bg-primary-90 tw-p-4 tw-text-primary-30 dark:tw-bg-primary-30 dark:tw-text-primary-90"
            @click="view = 'about'"
          >
            <div
              class="tw-absolute tw-inset-0 tw-h-full tw-w-full tw-rounded-t-xl tw-bg-primary-30 tw-bg-opacity-0 group-hover:tw-bg-opacity-8 group-focus:tw-bg-opacity-10 dark:tw-bg-primary-90 dark:tw-bg-opacity-0"
            />
            <img src="/img/logo-white.svg" height="40px" />
            <h3 class="tw-font-medium">
              {{ $t('about') }}
              <span class="tw-font-heading">Transit&nbsp;Tracker</span>
            </h3>
          </button>
        </div>
        <div
          v-else-if="view === 'notifications'"
          class="tw-px-4 tw-pb-4 tw-pt-20"
          ref="notifications"
        >
          <SettingsNotifications />
        </div>
        <div
          v-else-if="view === 'hiddenAgencies'"
          class="tw-px-4 tw-pb-4 tw-pt-20"
          ref="hiddenAgencies"
        >
          <SettingsHiddenAgencies />
        </div>
        <div
          v-else-if="view === 'listColumns'"
          class="tw-px-4 tw-pb-4 tw-pt-20"
          ref="listColumns"
        >
          <p class="tw-mb-2 tw-text-sm">{{ $t('listColumnsDesc') }}</p>
          <SettingsTableColumns />
        </div>
        <div
          v-else-if="view === 'about'"
          class="tw-px-4 tw-pb-4 tw-pt-20"
          ref="about"
        >
          <SettingsAbout />
        </div>
        <SettingsAboutDialog v-model="aboutDialog" />
      </section>
    </div>
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
  mdiMenu,
  mdiFormatListGroup,
  mdiArrowLeft,
  mdiCheckCircle,
  mdiAlertCircle,
} from '@mdi/js'

export default {
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
    mdiMenu,
    mdiFormatListGroup,
    mdiArrowLeft,
    mdiCheckCircle,
    mdiAlertCircle,
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
    view: {
      get() {
        return this.$store.state.app.settingsView
      },
      set(newView) {
        this.$store.commit('app/set', { key: 'settingsView', value: newView })
      },
    },
    notificationState() {
      if (!('Notification' in window)) {
        return 'unsupported'
      }

      if (this.$store.state.settings.pushSubscriptionUuid) {
        return 'activated'
      }

      return 'available'
    },
  },
  watch: {
    view(oldView, newView) {
      this.$refs[newView]?.scrollIntoView()
    },
  },
}
</script>
<i18n>
{
  "en": {
    "allSettings": "Settings",
    "notifications": "Notifications",
    "notificationsDesc": "Activate browser push notifications for new vehicles in your favorite agencies and/or general news about the app.",
    "notificationsUnsupported": "Not supported",
    "notificationsEnabled": "Activated",
    "hiddenAgencies": "Visible Agencies",
    "hiddenAgenciesDesc": "By default, all agencies are visible. You can hide some of them here to prevent them from appearing in the interface.",
    "hiddenAgenciesQuantity": "All agencies are visible | One hidden agency | {count} hidden agencies",
    "autoRefresh": "Auto refresh",
    "autoRefreshDesc": "Update every 60 or 120 seconds, depending on the agency.",
    "autoRefreshOn": "On",
    "autoRefreshOff": "Off",
    "theme": "Theme",
    "themeLight": "Light theme",
    "themeDark": "Dark theme",
    "themeSystem": "System",
    "themeSystemDesc": "According to your browser settings",
    "defaultScreen": "Default screen",
    "noRedirect": "Do not redirect",
    "listColumns": "Table columns",
    "listColumnsDesc": "You can customize the orders of the columns displayed in the app, and change their visibility.",
    "language": "Language",
    "grouping": "Group table rows",
    "groupingDesc": "If grouping is disabled, you can display the agency column using the setting below.",
    "noGrouping": "Don’t group rows",
    "groupByAgency": "Group rows by agency",
    "about": "About"
  },
  "fr": {
    "allSettings": "Paramètres",
    "notifications": "Notifications",
    "notificationsDesc": "Activez les notifications pousées du navigateur pour les nouveaux véhicules dans vos agences préférées et/ou les actualités générales de l'application.",
    "notificationsUnsupported": "Non pris en charge",
    "notificationsEnabled": "Activé",
    "hiddenAgencies": "Agences visibles",
    "hiddenAgenciesDesc": "Par défaut, toutes les agences sont visibles. Vous pouvez en masquer certaines ici pour les empêcher d'apparaître dans l'interface.",
    "hiddenAgenciesQuantity": "Toutes les agences sont visibles | Une agence masquée | {count} agences masquées",
    "autoRefresh": "Rafraichissement automatique",
    "autoRefreshDesc": "Mise à jour toutes les 60 ou 120 secondes, selon l'agence.",
    "autoRefreshOn": "Activé",
    "autoRefreshOff": "Désactivé",
    "theme": "Thème",
    "themeLight": "Thème clair",
    "themeDark": "Thème foncé",
    "themeSystem": "Système",
    "themeSystemDesc": "Selon les préférences de votre navigateur",
    "defaultScreen": "Écran par défaut",
    "noRedirect": "Ne pas rediriger",
    "listColumns": "Colonnes de la liste",
    "listColumnsDesc": "Vous pouvez personnaliser l'ordre des colonnes affichées dans l'application et modifier leur visibilité.",
    "language": "Langue",
    "grouping": "Regrouper les véhicules dans la liste",
    "groupingDesc": "Si le regroupement est désactivé, vous pouvez afficher la colonne « Agence » en utilisant le paramètre ci-dessous.",
    "noGrouping": "Ne pas regrouper les véhicules",
    "groupByAgency": "Regrouper les véhicules par agence",
    "about": "À propos de"
  }
}
</i18n>
