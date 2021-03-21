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
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-divider />
    <div class="d-flex flex-column tt-settings--container">
      <v-container>
        <v-btn
          v-if="pwa.canInstall"
          block
          elevation="0"
          height="50"
          :loading="pwa.loading"
          @click="requestInstall"
        >
          <v-icon left>mdi-plus-circle-outline</v-icon>
          {{ $t('settings.pwa.install') }}
        </v-btn>
        <div v-if="pwa.canInstall" class="my-3 mx-n3">
          <v-divider />
        </div>
        <v-expansion-panels flat tile>
          <v-expansion-panel class="tt-settings--agencies">
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
                prepend-inner-icon="mdi-magnify"
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
                      :style="{ color: agency.textColor }"
                      dark
                    >
                      mdi-bus
                    </v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ agency.name }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      <p class="mb-2 mt-1">
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
                    <v-btn icon @click="toggleAgency(slug)">
                      <v-icon v-if="activeAgencies.includes(slug)">
                        mdi-minus
                      </v-icon>
                      <v-icon v-else>mdi-plus</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <div class="my-3 mx-n3">
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
            icon="sync"
            :value="true"
          >
            {{ $t('settings.autoRefreshOn') }}
          </SettingsItem>
          <SettingsItem icon="sync-off" :value="false">
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
          <SettingsItem icon="white-balance-sunny" value="light">
            {{ $t('settings.themeLight') }}
          </SettingsItem>
          <SettingsItem icon="weather-night" value="dark">
            {{ $t('settings.themeDark') }}
          </SettingsItem>
          <SettingsItem
            icon="monitor"
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
          <SettingsItem icon="home" value="/">
            {{ $t('app.tabHome') }}
          </SettingsItem>
          <SettingsItem icon="map" value="/map">
            {{ $t('app.tabMap') }}
          </SettingsItem>
          <SettingsItem icon="table" value="/list">
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
      <div class="tt-felixinx white--text">
        <v-container class="d-flex align-center">
          <img
            src="https://felixinx.me/favicon.svg"
            width="40px"
            height="40px"
          />
          <div class="ml-4">
            <a
              href="https://felixinx.me"
              class="font-weight-medium text-decoration-none text-body-1 white--text"
            >
              {{ $t('settings.about') }}
            </a>
            <br />
            <span class="text-body-2">
              {{ $t('settings.contact') }}
              <!-- eslint-disable vue/no-v-html -->
              <a
                href="https://felixinx.me/contact"
                class="white--text"
                v-html="$t('settings.contactBtn')"
              ></a>
              <!-- eslint-enable vue/no-v-html -->
            </span>
          </div>
        </v-container>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    value: {
      required: true,
      type: Boolean,
    },
  },
  data: () => ({
    agencySearch: null,
    pwa: {
      canInstall: false,
      success: false,
      prompt: null,
      result: null,
      loading: false,
    },
  }),
  computed: {
    activeAgencies() {
      return this.$store.state.settings.activeAgencies
    },
    availableAgencies() {
      return this.$store.state.agencies.data
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
    regions() {
      return this.$store.state.regions.data
    },
    settings() {
      return this.$store.state.settings
    },
  },
  mounted() {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      this.pwa.prompt = e
      this.pwa.canInstall = true
      console.log('beforeinstallprompt', e)
    })
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
    async requestInstall() {
      this.pwa.loading = true
      this.pwa.prompt.prompt()
      const outcome = await this.pwa.prompt.userChoice
      console.log(outcome.outcome, outcome)
      this.pwa.result = outcome.outcome
    },
    toggleAgency(agency) {
      const setting = this.activeAgencies
      if (setting.includes(agency)) {
        setting.splice(setting.indexOf(agency), 1)
      } else {
        setting.push(agency)
      }

      this.setSetting('activeAgencies', setting)
    },
  },
}
</script>

<style>
.tt-settings .v-expansion-panel-content__wrap {
  padding: 0 !important;
}
.tt-settings--container {
  height: calc(100vh - 65px);
}
.theme--dark .tt-settings--agencies {
  background-color: rgb(54, 54, 54) !important;
}
.tt-felixinx {
  background-color: #1f5784;
}
</style>
