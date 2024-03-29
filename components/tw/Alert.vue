<template>
  <figure
    class="tw-flex tw-w-full tw-items-center tw-gap-4 tw-py-2 tw-pl-4 tw-pr-6"
    :class="[alertClasses]"
    v-if="alert"
  >
    <TwIcon :path="alert.icon" class="tw-shrink-0" />
    <div class="tw-grow">
      <figcaption class="tw-leading-6 tw-tracking-wide">
        {{ alert.title }}
      </figcaption>
      <p
        class="!tw-mb-0 tw-overflow-hidden tw-text-ellipsis tw-text-sm tw-leading-5 tw-tracking-wide"
      >
        {{ alert.subtitle }}
      </p>
    </div>
    <TwTextButton :color="buttonColor" @click="openDialog = true">
      {{ $t('open') }}
    </TwTextButton>
    <TwStandardIconButton
      v-if="alert.canBeClosed"
      :title="$t('close')"
      :color="buttonColor"
      @click="markAsRead"
      class="tw-hidden md:tw-flex"
    >
      <TwIcon :path="mdiClose" />
    </TwStandardIconButton>
    <TwImageDialog
      v-model="openDialog"
      :image="`url(${backendHost}/storage/content/alerts/${alert.image})`"
    >
      <template #header>
        {{ alert.title }}
      </template>
      <div v-html="alert.body" class="tw-mt-2"></div>
      <div v-if="alert.action === 'newAgencies'" class="tw-space-y-4 tw-pb-2">
        <TwAlertAgency
          v-for="slug in alert.actionParameters.agencies.split(',')"
          :key="slug"
          :agency-slug="slug"
        />
      </div>

      <template #footer>
        <div class="tw-flex tw-justify-between">
          <TwTextButton @click="markAsRead" type="submit">
            {{ $t('close') }}
          </TwTextButton>
          <form method="dialog">
            <TwTextButton value="cancel">
              {{ $t('onlyClose') }}
            </TwTextButton>
          </form>
        </div>
      </template>
    </TwImageDialog>
  </figure>
</template>

<script>
import { mdiClose } from '@mdi/js'
export default {
  data: () => ({
    openDialog: false,
    backendHost: process.env.backendHost,
    mdiClose,
  }),
  computed: {
    alert() {
      return this.$store.getters['alerts/getCurrentAlert']
    },
    alertClasses() {
      if (this.alert.color === 'error') {
        return 'tw-bg-error-40 dark:tw-bg-error-80 tw-text-white dark:tw-text-error-20'
      }

      if (this.alert.color === 'error-container') {
        return 'tw-bg-error-90 dark:tw-bg-error-30 tw-text-error-10 dark:tw-text-error-90'
      }

      return 'tw-bg-primary-30 dark:tw-bg-primary-80 tw-text-white dark:tw-text-primary-20 md:tw-bg-primary-40'
    },
    buttonColor() {
      if (this.alert.color === 'error') {
        return 'onError'
      }
      if (this.alert.color === 'error-container') {
        return 'onErrorContainer'
      }

      return 'onPrimary'
    },
    subtitle() {
      if (!this.$refs.body) return ''

      return this.$refs.body.textContent
    },
  },
  methods: {
    markAsRead() {
      const value = [...this.$store.state.settings.readAlerts]
      value.push(this.alert.id)

      this.$store.commit('settings/set', {
        setting: 'readAlerts',
        value,
      })
    },
  },
}
</script>

<i18n>
{
  "en": {
    "open": "Open alert",
    "close": "Mark as read and close",
    "onlyClose": "Close"
  },
  "fr": {
    "open": "Ouvrir l'alerte",
    "close": "Marquer comme lu et fermer",
    "onlyClose": "Fermer"
  }
}
</i18n>
