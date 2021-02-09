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
      Paramètres
      <v-spacer></v-spacer>
      <v-btn icon @click="$emit('input', false)">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-divider />
    <v-container class="d-flex flex-column tt-settings--container">
      <div>
        <v-btn block elevation="0" height="50">
          <v-icon left>mdi-plus-circle-outline</v-icon>
          Installer Transit Tracker
        </v-btn>
        <div class="my-3 mx-n3">
          <v-divider />
        </div>
        <v-expansion-panels flat tile>
          <v-expansion-panel>
            <v-expansion-panel-header class="pa-0">
              <div class="d-flex align-center">
                <h2 class="text-subtitle-1 font-weight-bold">Agences</h2>
                <v-chip class="ml-2" color="grey lighten-4" small label>
                  {{ activeAgencies.length }} /
                  {{ Object.entries(availableAgencies).length }}
                </v-chip>
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content class="">
              <v-text-field
                label="Rechercher une agence"
                clearable
                prepend-inner-icon="mdi-magnify"
              ></v-text-field>
              <v-list>
                <v-list-item
                  v-for="(agency, slug) in availableAgencies"
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
                        Montréal, Montréal-Ouest, Dollard-des-Ormeaux,
                        Sainte-Anne-de-Bellevue
                      </p>
                      <v-chip
                        v-for="region in agency.regions"
                        :key="region.slug"
                        label
                        small
                      >
                        {{ region.name }}
                      </v-chip>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn icon>
                      <v-icon v-if="activeAgencies.includes(slug)"
                        >mdi-minus</v-icon
                      >
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
          Actualisation automatique
        </h2>
        <SettingsItemGroup
          :value="settings.autoRefresh"
          @input="setSetting('autoRefresh', $event)"
        >
          <SettingsItem
            description="Mise à jour à chaque minute"
            icon="sync"
            :value="true"
          >
            Activé
          </SettingsItem>
          <SettingsItem icon="sync-off" :value="false">
            Désactivé
          </SettingsItem>
        </SettingsItemGroup>
        <div class="my-3 mx-n3">
          <v-divider />
        </div>
        <h2 class="text-subtitle-1 font-weight-bold">Thème</h2>
        <SettingsItemGroup
          :value="settings.theme"
          @input="setSetting('theme', $event)"
        >
          <SettingsItem icon="white-balance-sunny" value="light">
            Thème clair
          </SettingsItem>
          <SettingsItem icon="weather-night" value="dark">
            Thème foncé
          </SettingsItem>
          <SettingsItem
            icon="monitor"
            value="system"
            description="Selon la préférence de votre navigateur"
          >
            Système
          </SettingsItem>
        </SettingsItemGroup>
        <div class="my-3 mx-n3">
          <v-divider />
        </div>
        <h2 class="text-subtitle-1 font-weight-bold">Écran par défaut</h2>
        <SettingsItemGroup
          :value="settings.launch"
          @input="setSetting('launch', $event)"
        >
          <SettingsItem icon="home" value="/"> Accueil </SettingsItem>
          <SettingsItem icon="map" value="/map"> Carte </SettingsItem>
          <SettingsItem icon="table" value="/list"> Liste </SettingsItem>
        </SettingsItemGroup>
        <div class="my-3 mx-n3">
          <v-divider />
        </div>
        <h2 class="text-subtitle-1 font-weight-bold">Langue</h2>
        <SettingsItemGroup
          :value="settings.lang"
          @input="setSetting('lang', $event)"
        >
          <SettingsItem value="fr"> Français </SettingsItem>
          <SettingsItem value="en"> English </SettingsItem>
        </SettingsItemGroup>
      </div>
      <v-spacer />
      <div class="d-flex align-center">
        <img src="https://felixinx.me/favicon.svg" width="40px" height="40px" />
        <div class="ml-2">
          <a
            href="https://felixinx.me"
            class="font-weight-medium text-decoration-none text-body-1"
          >
            Par @felixinx </a
          ><br />
          <i class="text-body-2">
            Données fournies par les agences respectives
          </i>
        </div>
      </div>
    </v-container>
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
  computed: {
    activeAgencies() {
      return this.$store.state.settings.activeAgencies
    },
    availableAgencies() {
      return this.$store.state.agencies.data
    },
    settings() {
      return this.$store.state.settings
    },
  },
  methods: {
    setSetting(setting, value) {
      this.$store.commit('settings/set', { setting, value })
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
</style>
