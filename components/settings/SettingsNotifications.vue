<template>
  <div class="tw-relative" v-if="notificationsSupported">
    <div
      v-if="!pushSubscriptionUuid"
      class="tw-flex tw-flex-col tw-items-center tw-gap-2 tw-text-center"
    >
      <TwIcon class="!tw-h-12 !tw-w-12" :path="mdiBellRing" />
      <h2>{{ $t('heading') }}</h2>
      <p>{{ $t('description') }}</p>
      <div
        class="tw-rounded-xl tw-bg-error-40 tw-p-4 tw-text-white dark:tw-bg-error-80 dark:tw-text-error-20"
        v-if="permissionState === 'denied'"
      >
        <b>{{ $t('permissionDenied') }}</b>
        <p class="!tw-mb-0">{{ $t('permissionDeniedHelp') }}</p>
      </div>
      <TwFilledButton @click="subscribe" with-icon :disabled="isLoading">
        <TwIcon
          :path="isLoading ? mdiLoading : mdiBellPlus"
          :class="[isLoading && 'tw-animate-spin']"
        />
        {{ $t('subscribe') }}
      </TwFilledButton>
      <small
        class="tw-max-w-60 tw-text-sm tw-text-neutralVariant-30 dark:tw-text-neutralVariant-80"
      >
        {{ $t('unsubscribeAtAnyMoment') }}
      </small>
      <img :src="imageUrl" class="tw-mt-8 tw-w-11/12" :alt="$t('exampleAlt')" />
    </div>
    <div v-if="pushSubscriptionUuid" class="tw-space-y-4">
      <div
        v-if="pushSubscriptionUuid"
        class="tw-space-y-4 tw-rounded-xl tw-bg-secondary-40 tw-p-4 tw-text-white dark:tw-bg-secondary-80 dark:tw-text-secondary-20"
      >
        <div class="tw-flex tw-items-center tw-gap-2">
          <TwIcon :path="mdiCheckCircle" class="tw-shrink-0" />
          <span>{{ $t('activeSubscription') }}</span>
        </div>
        <TwTextButton color="onSecondary" @click="unsubscribe">
          {{ $t('unsubscribe') }}
        </TwTextButton>
      </div>
      <div class="tw-flex tw-items-center tw-gap-2">
        <TwIcon
          :class="[isLoading && 'tw-animate-spin']"
          :path="isLoading ? mdiSync : mdiCloudCheck"
        />
        {{ $t(isLoading ? 'syncinc' : 'synced') }}
      </div>
      <SettingsGroup :title="$t('generalNews')" class="!tw-mt-8">
        <div
          class="tw-col-span-full tw-flex tw-items-center tw-justify-between tw-gap-4"
        >
          <p
            class="!tw-mb-0 tw-text-sm tw-text-neutralVariant-10 dark:tw-text-neutralVariant-90"
          >
            {{ $t('generalNewsDesc') }}
          </p>
          <TwSwitch
            id="generalNews"
            :disabled="isLoading"
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
                <span
                  v-if="
                    region.agencies.filter(({ slug }) =>
                      selectedAgencies.includes(slug)
                    ).length
                  "
                  class="tw-absolute tw-right-0 tw-top-0 tw-h-1.5 tw-w-1.5 tw-rounded-full tw-bg-primary-40 dark:tw-bg-primary-80"
                />
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
  <div v-else class="tw-relative">
    <div
      class="tw-flex tw-gap-4 tw-rounded-xl tw-bg-error-40 tw-p-4 tw-text-white dark:tw-bg-error-80 dark:tw-text-error-20"
    >
      <TwIcon :path="mdiBellCancel" class="!tw-h-12 !tw-w-12" />
      {{ $t('notificationsUnsupported') }}
    </div>
  </div>
</template>

<script>
import {
  mdiBus,
  mdiTram,
  mdiTrain,
  mdiBellRing,
  mdiCloudCheck,
  mdiSync,
  mdiCheckCircle,
  mdiLoading,
  mdiBellPlus,
  mdiBellCancel,
} from '@mdi/js'
import { urlBase64ToUint8Array } from '~/utils/push'

export default {
  data: () => ({
    mdiBellRing,
    mdiCloudCheck,
    mdiSync,
    mdiCheckCircle,
    mdiLoading,
    mdiBellPlus,
    mdiBellCancel,
    exampleRevealed: false,
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
    permissionState: null,
  }),
  mounted() {
    if (!this.notificationsSupported) {
      // Do not load if notifications are unsupported
      return
    }

    this.checkPermissionState()

    if (this.pushSubscriptionUuid) {
      this.loadProfile()
    }

    this.$axios.get('/push/notifications/agencies').then(({ data }) => {
      this.agenciesStats = data
    })
  },
  computed: {
    currentRegion() {
      return this.$store.state.settings.currentRegion
    },
    pushSubscriptionUuid() {
      return this.$store.state.settings.pushSubscriptionUuid
    },
    regions() {
      return this.$store.state.regions.data
    },
    imageUrl() {
      return `/img/screenshots/push-${this.$i18n.locale}-${
        this.$vuetify.theme.dark ? 'dark' : 'light'
      }.png`
    },
    notificationsSupported() {
      return 'Notification' in window
    },
  },
  methods: {
    checkPermissionState() {
      // Check if push notifications are denied
      navigator.serviceWorker.ready
        .then((navigator) => {
          return navigator.pushManager.permissionState()
        })
        .then((state) => {
          this.permissionState = state
        })
    },
    toggleGeneralNews() {
      this.profile.generalNews = !this.profile.generalNews
      this.updateProfile()
    },
    toggleAgency({ slug }) {
      const positionInArray = this.selectedAgencies.indexOf(slug)

      // Add if not in array, otherwise remove
      if (positionInArray === -1) {
        this.selectedAgencies.push(slug)
      } else {
        this.selectedAgencies.splice(positionInArray, 1)
      }

      this.updateProfile()
    },
    async updateProfile() {
      this.isLoading = true

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
        this.checkPermissionState()

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

        this.checkPermissionState()

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
      "heading": "Subscribe to Transit Tracker push notifications!",
      "description": "Receive notifications when a new vehicle from your favorite agencies is in service, as well as for certain general news from the app. All this, for free, and directly in your browser.",
      "permissionDenied": "Permission denied",
      "permissionDeniedHelp": "Your browser is refusing push notifications, you may have blocked this option. Please check your browser settings.",
      "subscribe": "Subscribe",
      "unsubscribeAtAnyMoment": "You can unsubscribe at any time from this menu.",
      "exampleAlt": "Example of notification for new vehicles. Has a title 'New bus! 4658 | TTC', a description '4658 has appeared for this first time, on route 512' and a link to the track the bus in the bus.",
      "activeSubscription": "Active subscription",
      "unsubscribe": "Unsubscribe",
      "syncinc": "Synchronization in progress",
      "synced": "Synced",
      "generalNews": "General news",
      "generalNewsDesc": "Information on Transit Tracker such as updates and new agencies",
      "newVehicleNotification": "New vehicles",
      "newVehicleNotificationDesc": "Be notified when a new vehicle is activated for your selected agencies",
      "selectedAgenciesCount": " | Subscribed to one agency | Subscribed to {n} agencies",
      "newVehiclesPerWeek": " | One new vehicle this week | {n} new vehicles this week",
      "notificationsUnsupported": "Push notifications are not available in your browser"
    },
    "fr": {
      "heading": "Abonnez-vous aux notifications pousées de Transit Tracker!",
      "description": "Recevez des notifications dès qu'un nouveau véhicule de vos agences préférées est mis en service, ainsi que des actualités générales depuis l'application. Tout cela gratuitement et directement dans votre navigateur.",
      "permissionDenied": "Permission refusée",
      "permissionDeniedHelp": "Votre navigateur refuse les notifications push, vous avez peut-être bloqué cette option. Veuillez vérifier les paramètres de votre navigateur.",
      "subscribe": "S'abonner",
      "unsubscribeAtAnyMoment": "Vous pouvez vous désinscrire à tout moment depuis ce menu.",
      "exampleAlt": "Exemple de notification pour les nouveaux véhicules. Le titre est « Nouveau bus! 4658 | TTC », la description est « 4658 est apparu pour la première fois, sur la ligne 512 » et un lien permet de suivre le bus dans le bus.",
      "activeSubscription": "Abonnement actif",
      "unsubscribe": "Se désabonner",
      "syncinc": "Synchronisation en cours",
      "synced": "Synchronisé",
      "generalNews": "Informations générales",
      "generalNewsDesc": "Informations sur Transit Tracker telles que les mises à jour et les nouvelles agences",
      "newVehicleNotification": "Nouveaux véhicules",
      "newVehicleNotificationDesc": "Soyez averti lorsqu'un nouveau véhicule est activé pour vos agences sélectionnées",
      "selectedAgenciesCount": " | Abonné à une agence | Abonné à {n} agences",
      "newVehiclesPerWeek": " | Un nouveau véhicule cette semaine | {n} nouveaux véhicules cette semaine",
      "notificationsUnsupported": "Les notifications poussées ne sont pas disponibles dans votre navigateur"
    }
  }
</i18n>
