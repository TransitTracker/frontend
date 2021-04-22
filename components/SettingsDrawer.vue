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
        <v-expansion-panels v-if="dataIsLoaded" flat tile>
          <v-expansion-panel class="tt-settings__agencies">
            <v-expansion-panel-header class="pa-0">
              <div class="d-flex align-center">
                <h2 class="text-subtitle-1 font-weight-bold">
                  {{ $t('settings.agenciesTitle') }}
                </h2>
                <v-chip
                  class="ml-2"
                  :color="darkMode ? 'grey darken-3' : 'grey lighten-4'"
                  small
                  label
                >
                  {{
                    activeAgencies.length +
                    Object.entries(availableAgencies).filter((agency) =>
                      agency[1].regions.includes('*')
                    ).length
                  }}
                  /
                  {{ Object.entries(availableAgencies).length }}
                </v-chip>
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content class="">
              <v-text-field
                v-model="agencySearch"
                :label="$t('settings.searchAgency')"
                clearable
                :prepend-inner-icon="mdiMagnify"
                :color="darkMode ? 'white' : 'primary'"
              ></v-text-field>
              <v-list>
                <v-list-item
                  v-for="(agency, slug) in filteredAgencies"
                  :key="slug"
                >
                  <v-list-item-avatar :color="agency.color">
                    <v-icon
                      class="px-0"
                      size="24"
                      :style="{ color: agency.textColor }"
                      dark
                    >
                      {{ mdi[agency.defaultVehicleType] }}
                    </v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ agency.name }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      <p class="mb-2 mt-1 text-truncate">
                        {{ agency.cities && agency.cities.join(', ') }}
                      </p>
                      <v-chip
                        v-for="region in agency.regions"
                        :key="region"
                        :color="
                          region === '*' ? 'secondary-dark white--text' : null
                        "
                        label
                        small
                      >
                        {{
                          region === '*'
                            ? 'Local'
                            : regions[region]
                            ? regions[region].name
                            : region
                        }}
                      </v-chip>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action v-if="!agency.regions.includes('*')">
                    <v-btn icon @click="toggleAgency(agency)">
                      <v-icon v-if="activeAgencies.includes(slug)">
                        {{ mdiMinus }}
                      </v-icon>
                      <v-icon v-else>{{ mdiPlus }}</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <div v-if="dataIsLoaded" class="my-3 mx-n3">
          <v-divider />
        </div>
        <h2 class="text-subtitle-1 font-weight-bold">
          {{ $t('settings.autoRefresh') }}
        </h2>
        <SettingsItemGroup
          :value="settings.autoRefresh"
          @input="setSetting('autoRefresh', $event)"
        >
          <SettingsItem
            :description="$t('settings.autoRefreshOnDesc')"
            :icon="mdiSync"
            :value="true"
          >
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
          <SettingsItem :icon="mdiHome" value="/">
            {{ $t('app.tabHome') }}
          </SettingsItem>
          <SettingsItem :icon="mdiMap" value="/map">
            {{ $t('app.tabMap') }}
          </SettingsItem>
          <SettingsItem :icon="mdiTable" value="/list">
            {{ $t('app.tabTable') }}
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
  mdiFerry,
  mdiHome,
  mdiMagnify,
  mdiMap,
  mdiMinus,
  mdiMonitor,
  mdiPlus,
  mdiSync,
  mdiSyncOff,
  mdiWeatherNight,
  mdiTable,
  mdiTrain,
  mdiTram,
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
    agencySearch: null,
    mdiClose,
    mdiHome,
    mdiMagnify,
    mdiMap,
    mdiMinus,
    mdiMonitor,
    mdiPlus,
    mdiSync,
    mdiSyncOff,
    mdiWeatherNight,
    mdiTable,
    mdiWhiteBalanceSunny,
    mdi: { bus: mdiBus, ferry: mdiFerry, train: mdiTrain, tram: mdiTram },
  }),
  computed: {
    activeAgencies() {
      return this.$store.state.settings.activeAgencies
    },
    availableAgencies() {
      return this.$store.state.agencies.data
    },
    dataIsLoaded() {
      return this.$store.state.app.dataIsLoaded
    },
    darkMode() {
      return this.$vuetify.theme.dark
    },
    filteredAgencies() {
      return Object.fromEntries(
        Object.entries(this.$store.state.agencies.data).filter((value) => {
          if (!this.agencySearch) return true
          return value[1].name
            .toUpperCase()
            .includes(this.agencySearch.toUpperCase())
        })
      )
    },
    pwa() {
      return this.$store.state.app
    },
    regions() {
      return this.$store.state.regions.data
    },
    settings() {
      return this.$store.state.settings
    },
  },
  methods: {
    setSetting(setting, value) {
      this.$store.commit('settings/set', { setting, value })

      if (setting === 'theme') {
        this.$vuetify.theme.dark = this.getTheme(value)
      } else if (setting === 'lang') {
        this.$i18n.setLocale(value)
      }
    },
    getTheme(value) {
      if (value === 'system') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches
      }
      if (value === 'dark') return true
      return false
    },
    toggleAgency(agency) {
      this.$store.dispatch('settings/toggleAgency', agency)
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
    height: calc(100vh - 65px);
  }

  &__about {
    background-color: #1f5784;
  }
}

.theme--dark .tt-settings__agencies {
  background-color: #363636 !important;
}
</style>
