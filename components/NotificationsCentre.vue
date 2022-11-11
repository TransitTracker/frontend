<template>
  <v-dialog
    v-model="computedValue"
    width="500px"
    :fullscreen="$vuetify.breakpoint.mdAndDown"
    @click-outside="toggle"
    @input="toggle($event)"
  >
    <v-card :disabled="globalLoading" :loading="globalLoading">
      <v-toolbar color="primary-dark" dark>
        <v-icon left>{{ mdiBell }}</v-icon>
        <v-toolbar-title>{{ $t('notifications.title') }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon :title="$t('regionSwitcher.close')" @click="toggle">
          <v-icon>{{ mdiClose }}</v-icon>
        </v-btn>
      </v-toolbar>

      <!-- Error 429 -->
      <v-banner v-if="globalError429" color="error" dark>
        <b>{{ $t('notifications.warning') }}</b>
        {{ $t('notifications.warning429') }}
      </v-banner>

      <!-- Notifications not available -->
      <v-container v-if="state === 'unavailable'">
        <v-alert type="error">
          {{ $t('notifications.unavailable') }}
        </v-alert>
      </v-container>

      <!-- Beta warning (TODO: to remove) -->
      <v-banner
        v-if="state === 'authorize'"
        color="warning"
        :icon="mdiTestTube"
      >
        <b>{{ $t('notifications.betaTitle') }}</b>
        {{ $t('notifications.betaBody') }}
      </v-banner>

      <!-- Step: authorize -->
      <v-container v-if="state === 'authorize'" class="text-center my-4">
        <v-btn
          class="ml-4"
          depressed
          x-large
          :color="subscribeColor"
          :loading="globalLoading"
          @click="subscribe"
        >
          <v-icon left>{{ mdiBellPlus }}</v-icon>
          {{ $t('notifications.authorize') }}
        </v-btn>
        <p class="text-h6 mt-4 mb-2">
          {{ $t('notifications.authorizeTitle') }}
        </p>
        <p class="text-body-2">
          {{ $t('notifications.authorizeBody') }}
        </p>
        <v-alert v-if="subscribeError" color="error" dark>
          <b>{{ $t('notifications.authorizeError') }}</b> <br />
          {{ subscribeError.message }}
        </v-alert>
      </v-container>

      <!-- Step: choose notifications -->
      <v-container v-if="state === 'notifications'">
        <p class="text-h6 font-weight-medium">
          {{ $t('notifications.selectNotifications') }}
        </p>
        <v-list-item three-line @click="state = 'agencies'">
          <v-list-item-content>
            <v-list-item-title>
              {{ $t('notifications.newVehicles') }}
            </v-list-item-title>
            <v-list-item-subtitle class="text--primary">
              {{ $tc('notifications.newVehiclesCount', profileAgenciesCount) }}
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              {{ $t('notifications.newVehiclesDesc') }}
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-icon>{{ mdiArrowRight }}</v-icon>
          </v-list-item-action>
        </v-list-item>
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title>
              {{ $t('notifications.generalNews') }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ $t('notifications.generalNewsDesc') }}
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-switch
              v-model="profile.generalNews"
              @change="saveProfile"
            ></v-switch>
          </v-list-item-action>
        </v-list-item>
        <v-list-item three-line>
          <v-list-item-avatar color="#dedc1f" class="d-none d-md-flex">
            <v-icon color="#00646c" size="28">{{ mdiBusElectric }}</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              {{ $t('notifications.electricStm') }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ $t('notifications.electricStmDesc') }}
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-switch
              v-model="profile.electricStm"
              @change="saveProfile"
            ></v-switch>
          </v-list-item-action>
        </v-list-item>
      </v-container>

      <!-- Step: choose agencies -->
      <v-container
        v-if="state === 'agencies'"
        class="text-body-1 d-flex flex-column tt-notifications-centre__agencies"
      >
        <p class="text-h6 font-weight-medium flex-grow-0 flex-shrink-0">
          {{ $t('notifications.chooseAgencies') }}
        </p>
        <v-list-item-group>
          <v-list-item @click="selectAllAgencies">
            <v-list-item-action>
              <v-checkbox
                :value="
                  selectedAgencies.length === Object.entries(agencies).length
                "
                :color="$vuetify.theme.dark ? 'white' : 'primary'"
              ></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-subtitle>
                {{ $t('notifications.selectAll') }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
        <v-list-item-group
          v-model="selectedAgencies"
          multiple
          class="flex-shrink-1 flex-grow-1 overflow-y-auto"
        >
          <v-list-item
            v-for="agency in agencies"
            :key="agency.slug"
            dense
            :value="agency.slug"
          >
            <template #default="{ active }">
              <v-list-item-action>
                <v-checkbox
                  :input-value="active"
                  :color="$vuetify.theme.dark ? 'white' : 'primary'"
                ></v-checkbox>
              </v-list-item-action>
              <v-list-item-content style="flex: 0 0 32px" class="mr-2 ml-n2">
                <v-list-item-avatar :color="agency.color" size="32">
                  <v-icon :color="agency.textColor" size="24">
                    {{ mdi[agency.defaultVehicleType] }}
                  </v-icon>
                </v-list-item-avatar>
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-title>
                  {{ agency.name }}
                  <v-chip
                    v-for="region in agency.regions"
                    :key="region"
                    x-small
                    label
                  >
                    {{ regions[region].name }}
                  </v-chip>
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{
                    $tc(
                      'notifications.newVehiclesWeek',
                      agenciesStats[agency.slug] || 0
                    )
                  }}
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-tooltip bottom>
                <template #activator="{ on, attrs }">
                  <v-list-item-avatar
                    v-if="!activeAgencies.includes(agency.slug)"
                    v-bind="attrs"
                    size="32"
                    v-on="on"
                  >
                    <v-icon size="24">
                      {{ mdiEyeOff }}
                    </v-icon>
                  </v-list-item-avatar>
                </template>
                <span>{{ $t('notifications.agencyNotSelected') }}</span>
              </v-tooltip>
            </template>
          </v-list-item>
        </v-list-item-group>
        <v-btn
          color="primary"
          depressed
          class="mt-4 flex-grow-0 flex-shrink-0"
          @click="saveProfile"
        >
          <v-icon left>{{ mdiCheck }}</v-icon>
          {{ $t('notifications.save') }}
        </v-btn>
      </v-container>

      <!-- State: inactive  -->
      <v-banner
        v-if="state === 'notifications' && !profile.isActive"
        :icon="mdiAlert"
        icon-color="error"
        color="warning"
        tile
      >
        {{ $t('notifications.inactive') }} <br />
        <p class="mb-0">
          {{ $t('notifications.inactiveDesc') }}
        </p>
        <p class="text-caption mb-0">
          ID:
          <span v-if="showUuid" @click="showUuid = false">
            {{ pushSubscriptionUuid }}
          </span>
          <a @click="showUuid = !showUuid">
            {{
              showUuid
                ? $t('notifications.hideUuid')
                : $t('notifications.showUuid')
            }}
          </a>
        </p>
        <v-btn depressed color="error" class="mt-2" @click="unsubscribe">
          {{ $t('notifications.unsubscribe') }}
        </v-btn>
      </v-banner>

      <!-- State: active -->
      <v-banner
        v-if="state === 'notifications' && profile.isActive"
        tile
        :icon="mdiCheck"
        two-line
      >
        {{ $t('notifications.active') }} <br />
        <p class="text-caption mb-0">
          ID:
          <span v-if="showUuid" @click="showUuid = false">
            {{ pushSubscriptionUuid }}
          </span>
          <a @click="showUuid = !showUuid">
            {{
              showUuid
                ? $t('notifications.hideUuid')
                : $t('notifications.showUuid')
            }}
          </a>
        </p>
        <template #actions>
          <v-btn text color="error" @click="unsubscribe">
            {{ $t('notifications.unsubscribe') }}
          </v-btn>
        </template>
      </v-banner>
    </v-card>
  </v-dialog>
</template>

<script>
import {
  mdiArrowLeft,
  mdiArrowRight,
  mdiAlert,
  mdiBell,
  mdiBellAlert,
  mdiBellPlus,
  mdiBellRemove,
  mdiBus,
  mdiBusElectric,
  mdiCheck,
  mdiEyeOff,
  mdiTestTube,
  mdiTrain,
  mdiTram,
  mdiClose,
  mdiPauseOctagon,
} from '@mdi/js'

import { urlBase64ToUint8Array } from '@/utils/push'

export default {
  data: () => ({
    state: 'authorize',
    mdiArrowLeft,
    mdiArrowRight,
    mdiAlert,
    mdiBell,
    mdiBellAlert,
    mdiBellPlus,
    mdiBellRemove,
    mdiBusElectric,
    mdiCheck,
    mdiClose,
    mdiEyeOff,
    mdiTestTube,
    mdiPauseOctagon,
    mdi: {
      bus: mdiBus,
      tram: mdiTram,
      train: mdiTrain,
    },
    subscribeColor: 'primary',
    globalLoading: false,
    globalError429: false,
    profile: {},
    profileAgenciesCount: 0,
    agenciesStats: [],
    selectedAgencies: [],
    subscribeError: null,
    showUuid: false,
  }),
  computed: {
    computedValue: {
      get() {
        return this.$store.state.app.openNotificationsCentre
      },
      set(value) {
        this.$store.commit('app/set', { key: 'openNotificationsCentre', value })
      },
    },
    activeAgencies() {
      return this.$store.state.settings.activeAgencies
    },
    agencies() {
      return Object.fromEntries(
        Object.entries(this.$store.state.agencies.data)
          .sort(([aSlug, a], [bSlug, b]) => {
            const aIsPart = a.regions.includes(this.currentRegion)
            const bIsPart = b.regions.includes(this.currentRegion)

            return aIsPart === bIsPart ? 0 : aIsPart ? -1 : 1
          })
          .sort(([aSlug], [bSlug]) => {
            const aIsPart = this.activeAgencies.includes(aSlug)
            const bIsPart = this.activeAgencies.includes(bSlug)

            return aIsPart === bIsPart ? 0 : aIsPart ? -1 : 1
          })
      )
    },
    currentRegion() {
      return this.$store.state.settings.currentRegion
    },
    pushSubscriptionUuid() {
      return this.$store.state.settings.pushSubscriptionUuid
    },
    regions() {
      return this.$store.state.regions.data
    },
  },
  mounted() {
    if (!('Notification' in window)) {
      this.state = 'unavailable'
    }

    if (this.pushSubscriptionUuid) {
      this.state = 'notifications'
      this.loadProfile()
    }

    this.$axios.get('/push/notifications/agencies').then(({ data }) => {
      this.agenciesStats = data
    })
  },
  methods: {
    toggle(value = false) {
      if (typeof value !== 'boolean') {
        value = false
      }
      this.$store.commit('app/set', { key: 'openNotificationsCentre', value })
    },
    async loadProfile(data) {
      if (!data) {
        try {
          const response = await this.$axios.get(`/push/profile`, {
            params: {
              uuid: this.pushSubscriptionUuid,
            },
          })
          data = response.data
        } catch (e) {
          if (e.response && e.response.status === 429) {
            this.globalError429 = true
          }
          return false
        }
      }

      this.profile = data.data
      this.$set(this.profile, 'generalNews', data.data.generalNews)
      this.$set(this.profile, 'electricStm', data.data.electricStm)
      this.selectedAgencies = data.data.newVehicle.agencies
      this.profileAgenciesCount = data.data.newVehicle.agencies.length
    },
    async saveProfile() {
      this.globalLoading = true

      try {
        const { data } = await this.$axios.put('/push/profile', {
          uuid: this.pushSubscriptionUuid,
          generalNews: this.profile.generalNews,
          electricStm: this.profile.electricStm,
          agencies: this.selectedAgencies,
          isFrench: this.$i18n.locale === 'fr',
        })

        this.$set(this.profile, 'generalNews', data.data.generalNews)
        this.$set(this.profile, 'electricStm', data.data.electricStm)
        this.profileAgenciesCount = data.data.newVehicle.agencies.length
      } catch (e) {
        if (e.response && e.response.status === 429) {
          this.globalError429 = true
        }
      }

      this.state = 'notifications'
      this.globalLoading = false
    },
    selectAllAgencies() {
      this.selectedAgencies = []

      Object.entries(this.agencies).forEach(([slug]) => {
        this.selectedAgencies.push(slug)
      })
    },
    async unsubscribe() {
      this.globalLoading = true

      try {
        await this.$axios.delete('/push/profile', {
          params: {
            uuid: this.pushSubscriptionUuid,
          },
        })

        this.$store.commit('settings/set', {
          setting: 'pushSubscriptionUuid',
          value: null,
        })

        this.profile = {}
        this.selectedAgencies = []
        this.profileAgenciesCount = 0

        const registration = await navigator.serviceWorker.ready
        const sub = await registration.pushManager.getSubscription()
        await sub.unsubscribe()

        this.state = 'authorize'
      } catch (e) {
        if (e.response && e.response.status === 429) {
          this.globalError429 = true
        }
      }

      this.globalLoading = false
    },
    async subscribe() {
      this.globalLoading = true
      this.subscribeError = null

      try {
        await Notification.requestPermission()

        const registration = await navigator.serviceWorker.ready

        const pushSubscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(process.env.vapidKey),
        })

        const { data } = await this.$axios.post('/push/profile', {
          ...pushSubscription.toJSON(),
          isFrench: this.$i18n.locale === 'fr',
        })
        this.loadProfile(data)

        this.$store.commit('settings/set', {
          setting: 'pushSubscriptionUuid',
          value: this.profile.uuid,
        })

        setTimeout(() => {
          this.state = 'notifications'
          this.globalLoading = false
        }, 500)
      } catch (error) {
        this.globalLoading = false
        this.subscribeError = error

        if (error.message.includes('unsubscribe')) {
          const registration = await navigator.serviceWorker.ready
          const sub = await registration.pushManager.getSubscription()
          await sub.unsubscribe()
        }

        return false
      }
    },
  },
}
</script>

<style lang="scss">
.v-dialog .tt-notifications-centre__agencies {
  height: calc(90vh - 64px);
}

.v-dialog--fullscreen .tt-notifications-centre__agencies {
  height: calc(100vh - 56px);
}

.v-banner__wrapper {
  padding: 16px !important;
}
</style>
