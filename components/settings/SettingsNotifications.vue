<template>
  <div class="tw-relative">
    <TwIcon class="tw-text-center" :path="mdiBell" />
    <TwFilledButton @click="subscribe">{{ $t('subscribe') }}</TwFilledButton>
    <TwTextButton @click="unsubscribe">{{ $t('unsubscribe') }}</TwTextButton>
    <div v-show="pushSubscriptionUuid" class="tw-space-y-4">
      <div class="tw-flex tw-items-center tw-gap-2">
        <TwIcon
          :class="[isLoading && 'tw-animate-spin']"
          :path="isLoading ? mdiSync : mdiCloudCheck"
        />
        {{ $t(isLoading ? 'syncinc' : 'synced') }}
      </div>
      <SettingsGroup :title="$t('generalNews')">
        <div
          class="tw-col-span-full tw-flex tw-items-center tw-justify-between tw-gap-4"
        >
          <p class="!tw-pb-0">{{ $t('generalNewsDesc') }}</p>
          <TwSwitch
            id="generalNews"
            :value="profile.generalNews"
            @input="toggleGeneralNews"
          />
        </div>
      </SettingsGroup>
      <SettingsGroup
        :title="$t('newVehicleNotification')"
        :description="$t('newVehicleNotificationDesc')"
      >
        <TwDetails
          class="tw-col-span-full tw-mt-2"
          v-for="region in regions"
          :key="region.slug"
          :open="region.slug === currentRegion"
        >
          <template #summary>
            <div>
              <p
                class="tw-relative !tw-mb-0 tw-inline tw-text-neutral-10 dark:tw-text-neutral-90"
              >
                {{ region.name }}
              </p>
              <br />
              <small
                class="tw-text-sm tw-text-neutralVariant-30 dark:tw-text-neutralVariant-80"
              >
                {{
                  $tc(
                    'selectedAgenciesCount',
                    region.agencies.filter(({ slug }) =>
                      selectedAgencies.includes(slug)
                    ).length,
                    {
                      total: region.agencies.length,
                    }
                  )
                }}
              </small>
            </div>
          </template>
          <ul
            class="tw-list-none tw-py-2 !tw-pl-0 *:tw-flex *:tw-items-center *:tw-gap-4 *:tw-py-2"
          >
            <li v-for="agency in region.agencies" :key="agency.slug">
              <div
                :style="{
                  backgroundColor: agency.color,
                  color: agency.textColor,
                }"
                class="tw-flex tw-h-6 tw-w-6 tw-flex-shrink-0 tw-items-center tw-justify-center tw-rounded-full"
              >
                <TwIcon
                  :path="icons[agency.defaultVehicleType]"
                  class="!tw-h-4 !tw-w-4"
                />
              </div>
              <p class="!tw-mb-0 tw-flex-grow">
                {{ agency.name }}
                <small
                  class="tw-block tw-text-sm tw-text-neutralVariant-30 dark:tw-text-neutralVariant-80"
                  v-if="agenciesStats[agency.slug]"
                >
                  {{ $tc('newVehiclesPerWeek', agenciesStats[agency.slug]) }}
                </small>
              </p>
              <TwSwitch
                :disabled="isLoading"
                :id="agency.slug"
                :value="selectedAgencies.includes(agency.slug)"
                @input="toggleAgency(agency)"
              />
            </li>
          </ul>
        </TwDetails>
      </SettingsGroup>
    </div>
  </div>
</template>

<script>
import {
  mdiBus,
  mdiTram,
  mdiTrain,
  mdiBell,
  mdiCloudCheck,
  mdiSync,
} from '@mdi/js'
import { urlBase64ToUint8Array } from '~/utils/push'

export default {
  data: () => ({
    mdiBell,
    mdiCloudCheck,
    mdiSync,
    isLoading: false,
    hasError429: false,
    subscribeError: null,
    profile: {},
    selectedAgencies: [],
    icons: {
      tram: mdiTram,
      train: mdiTrain,
      bus: mdiBus,
    },
    agenciesStats: [],
  }),
  mounted() {
    if (!('Notification' in window)) {
      // TODO: Display unsupported message
    }

    if (this.pushSubscriptionUuid) {
      this.loadProfile()
    }

    this.$axios.get('/push/notifications/agencies').then(({ data }) => {
      this.agenciesStats = data
    })
  },
  computed: {
    pushSubscriptionUuid() {
      return this.$store.state.settings.pushSubscriptionUuid
    },
    regions() {
      return this.$store.state.regions.data
    },
  },
  methods: {
    toggleGeneralNews() {
      this.profile.generalNews = !this.profile.generalNews
    },
    async toggleAgency({ slug }) {
      this.isLoading = true

      const positionInArray = this.selectedAgencies.indexOf(slug)

      if (positionInArray === -1) {
        this.selectedAgencies.push(slug)
      } else {
        this.selectedAgencies.slice(positionInArray, 1)
      }

      try {
        const { data } = await this.$axios.put('/push/profile', {
          uuid: this.pushSubscriptionUuid,
          generalNews: this.profile.generalNews,
          agencies: this.selectedAgencies,
          isFrench: this.$i18n.locale === 'fr',
        })

        this.$set(this.profile, 'generalNews', data.data.generalNews)
        this.profileAgenciesCount = data.data.newVehicle.agencies.length
      } catch (error) {
        if (error.response?.status === 429) {
          this.hasError429 = true
        }
      }

      this.isLoading = false
    },
    async loadProfile(data) {
      this.isLoading = true

      if (!data) {
        try {
          const response = await this.$axios.get('/push/profile', {
            params: {
              uuid: this.pushSubscriptionUuid,
            },
          })
          data = response.data
        } catch (error) {
          if (error.response?.status === 429) {
            this.hasError429 = true
          }
          return false
        }
      }

      this.profile = data.data
      this.$set(this.profile, 'generalNews', data.data.generalNews)
      this.selectedAgencies = data.data.newVehicle.agencies
      this.isLoading = false
    },
    async subscribe() {
      this.isLoading = true
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
          this.isLoading = false
        }, 250)
      } catch (error) {
        this.isLoading = false
        this.subscribeError = error

        if (error.message.includes('unsubscribe')) {
          const registration = await navigator.serviceWorker.ready
          const sub = await registration.pushManager.getSubscription()
          await sub.unsubscribe()
        }

        return false
      }
    },
    async unsubscribe() {
      this.isLoading = true

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
      } catch (error) {
        if (error.response?.status === 429) {
          this.hasError429 = true
        }
      }

      this.isLoading = false
    },
  },
}
</script>

<i18n>
  {
    "en": {
      "selectedAgenciesCount": " | Subscribed to one agency | Subscribed to {n} agencies",
      "newVehiclesPerWeek": " | One new vehicle this week | {n} new vehicles this week"
    },
    "fr": {
      "selectedAgenciesCount": " | Abonné à une agence | Abonné à {n} agences",
      "newVehiclesPerWeek": " | Un nouveau véhicule cette semaine | {n} nouveaux véhicules cette semaine"
    }
  }
</i18n>
