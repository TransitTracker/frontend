<template>
  <TwSideSheet
    :show-back-button="alertsView !== 'index'"
    :title="$t('alerts')"
    :is-active="alertsView !== false"
    :is-loading="isLoading"
    @back="alertsView = 'index'"
    @close="alertsView = false"
  >
    <div v-if="alertsView === 'index'" ref="index">
      <div class="tw:h-20"></div>
      <p class="tw:mb-2 tw:text-sm">{{ $t('description') }}</p>

      <div class="tw:flex tw:flex-wrap tw:items-center tw:gap-2">
        <TwChip :icon="mdiBellCog" @click.native="openSettings">
          {{ $t('openSettings') }}
        </TwChip>
        <TwChip
          v-if="unreadAlerts.length"
          :icon="mdiCheckAll"
          @click.native="markAllAsRead"
        >
          {{ $t('markAllAsRead') }}
        </TwChip>
      </div>

      <ul class="tw:mt-4 tw:list-none tw:pl-0!">
        <li
          v-for="alert in alerts"
          :key="alert.id"
          role="button"
          tabindex="0"
          class="tw:-mx-4 tw:flex tw:items-start tw:justify-between tw:gap-4 tw:px-4 tw:py-2"
          :class="[
            alert.isUnread &&
              'tw:bg-primary-90 tw:text-primary-30 tw:dark:bg-primary-30 tw:dark:text-primary-90',
          ]"
          @click="viewAlert(alert)"
          @keyup.enter="viewAlert(alert)"
        >
          <div>
            <p class="tw:mb-0!">{{ alert.title }}</p>
            <small>{{ alert.subtitle }}</small
            ><br />
            <small>{{ alert.thirdLine }}</small>
          </div>
          <TwStandardIconButton
            :title="$t('view')"
            class="tw:shrink-0!"
            @click="viewAlert(alert)"
          >
            <TwIcon :path="mdiArrowRight" />
          </TwStandardIconButton>
        </li>
      </ul>
    </div>
    <article v-if="viewIsShow && selectedAlert" ref="show">
      <div class="tw:h-18"></div>
      <img
        v-if="selectedAlert.image"
        :src="`${backendHost}/storage/content/alerts/${selectedAlert.image}`"
        class="tw:-mx-4 tw:-mt-2 tw:max-h-64 tw:w-[calc(100%+2rem)] tw:object-cover"
      />
      <h2
        class="tw:mt-6 tw:font-heading tw:text-2xl tw:leading-8 tw:text-neutral-10 tw:dark:text-neutral-90"
      >
        {{ selectedAlert.title }}
      </h2>
      <div class="tw:flex tw:items-center tw:gap-2 tw:pt-2">
        <TwChip tag="div">{{ selectedAlert.categoryLabel }}</TwChip>
        <small class="tw:text-sm tw:leading-5">
          {{ selectedAlert.date }}
        </small>
      </div>
      <!-- eslint-disable vue/no-v-html -->
      <div
        class="tw:prose tw:mt-4 tw:dark:prose-invert"
        v-html="selectedAlert.body"
      ></div>
      <!-- eslint-enable vue/no-v-html -->
    </article>
  </TwSideSheet>
</template>

<script>
import { mdiArrowRight, mdiBellCog, mdiCheckAll } from '@mdi/js'
import { alertCategory } from '~/utils/enums'

export default {
  data: () => ({
    mdiArrowRight,
    mdiBellCog,
    mdiCheckAll,
    backendHost: process.env.backendHost,
    isLoading: false,
  }),
  computed: {
    alerts() {
      const SECONDS_IN = {
        minute: 60,
        hour: 3600,
        day: 86400,
        month: 2629800, // average month ≈ 30.44 days
        year: 31557600, // average year ≈ 365.25 days
      }

      const calculateTimeAgo = (timestamp) => {
        const diffSeconds = timestamp - Math.floor(Date.now() / 1000)
        const absDiff = Math.abs(diffSeconds)

        if (absDiff < SECONDS_IN.minute) {
          return this.rtf.format(Math.round(diffSeconds), 'seconds')
        } else if (absDiff < SECONDS_IN.hour) {
          return this.rtf.format(
            Math.round(diffSeconds / SECONDS_IN.minute),
            'minutes'
          )
        } else if (absDiff < SECONDS_IN.day) {
          return this.rtf.format(
            Math.round(diffSeconds / SECONDS_IN.hour),
            'hours'
          )
        } else if (absDiff < SECONDS_IN.month) {
          return this.rtf.format(
            Math.round(diffSeconds / SECONDS_IN.day),
            'days'
          )
        } else if (absDiff < SECONDS_IN.year) {
          return this.rtf.format(
            Math.round(diffSeconds / SECONDS_IN.month),
            'months'
          )
        } else {
          return this.rtf.format(
            Math.round(diffSeconds / SECONDS_IN.year),
            'years'
          )
        }
      }

      return Object.values(this.$store.state.alerts.allAlerts)
        .map((alert) => {
          const thirdLineSegments = [
            this.$t(`categories.${alertCategory[alert.category].key}`),
            calculateTimeAgo(alert.createdAt),
          ]

          if (alert.regions?.length) {
            thirdLineSegments.unshift(
              alert.regions
                ?.map(
                  (slug) => this.$store.state.regions.data?.[slug]?.name || ''
                )
                .join(', ')
            )
          }

          return {
            thirdLine: thirdLineSegments.join(' • '),
            isUnread: !this.readAlerts.includes(alert.id) && alert.status !== 3,
            ...alert,
          }
        })
        .sort((a, b) => b.createdAt - a.createdAt)
    },
    alertsView: {
      get() {
        return this.$store.state.app.alertsView
      },
      set(newView) {
        this.$store.commit('app/set', { key: 'alertsView', value: newView })
      },
    },
    viewIsShow() {
      return this.alertsView !== false && this.alertsView.startsWith('show/')
    },
    readAlerts() {
      return this.$store.state.settings.readAlerts
    },
    rtf() {
      return new Intl.RelativeTimeFormat(this.lang)
    },
    unreadAlerts() {
      return this.alerts.filter(({ isUnread }) => isUnread)
    },
    selectedAlert() {
      const alert =
        this.$store.state.alerts.allAlerts[
          parseInt(this.alertsView.replace('show/', ''))
        ]
      const dtf = new Intl.DateTimeFormat(this.lang, { dateStyle: 'long' })

      if (!alert) {
        return null
      }

      return {
        ...alert,
        date: dtf.format(alert.createdAt * 1000),
        categoryLabel: this.$t(
          `categories.${alertCategory[alert.category].key}`
        ),
      }
    },
    lang() {
      if (this.$i18n) {
        return this.$i18n.locale
      }

      return 'en'
    },
  },
  watch: {
    viewAlert(old, newView) {
      const ref = newView === 'index' ? 'index' : 'show'
      this.$refs[ref].scrollIntoView()
    },
  },
  mounted() {
    this.isLoading = true
    this.$store.dispatch('alerts/loadAll').then(() => (this.isLoading = false))
  },
  methods: {
    viewAlert(alert) {
      this.alertsView = `show/${alert.id}`
      this.markAsRead(alert)
    },
    markAllAsRead() {
      this.unreadAlerts.forEach((alert) => this.markAsRead(alert))
    },
    markAsRead(alert) {
      const value = [...this.readAlerts]
      value.push(alert.id)

      this.$store.commit('settings/set', { setting: 'readAlerts', value })
    },
    openSettings() {
      this.$store.commit('app/set', {
        key: 'settingsView',
        value: 'notifications',
      })
    },
  },
}
</script>

<i18n>
  {
    "en": {
      "alerts": "Alerts",
      "description": "This is the history of Transit Tracker alerts, including app updates, new agencies, and important announcements. Major alerts or general news are also sent via push notifications, which you can enable in the app's settings.",
      "openSettings": "Push Notifications",
      "markAllAsRead": "Mark all as read",
      "view": "View this alert",
      "categories": {
        "Update": "App Update",
        "NewAgency": "New Agency",
        "Maintenance": "Maintenance",
        "StatusUpdate": "Status Update"
      }
    },
    "fr": {
      "alerts": "Alertes",
      "description": "Voici l'historique des alertes de Transit Tracker, comprenant les mises à jour de l'application, les nouvelles agences et les annonces importantes. Les alertes majeures ou les nouvelles générales sont également envoyées par notifications push, que vous pouvez activer dans les paramètres de l'application.",
      "openSettings": "Notifications poussées",
      "markAllAsRead": "Tout marquer comme lu",
      "view": "Voir cette alerte",
      "categories": {
        "Update": "Mise à jour de l'application",
        "NewAgency": "Nouvelle agence",
        "Maintenance": "Maintenance",
        "StatusUpdate": "Mise à jour de statut"
      }
    }
  }
</i18n>
