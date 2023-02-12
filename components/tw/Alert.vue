<template>
  <figure
    class="tw-flex tw-w-full tw-items-center tw-gap-4 tw-bg-primary-30 tw-py-2 tw-pl-4 tw-pr-6 tw-text-white dark:tw-bg-primary-80 dark:tw-text-primary-20 md:tw-bg-primary-40"
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
    <TwTextButton color="onPrimary" @click="openDialog = true">
      {{ $t('open') }}
    </TwTextButton>
    <TwStandardIconButton
      v-if="alert.canBeClosed"
      :title="$t('close')"
      color="onPrimary"
      @click="markAsRead"
      class="tw-hidden md:tw-flex"
    >
      <TwIcon :path="mdiClose" />
    </TwStandardIconButton>
    <TwImageDialog
      v-model="openDialog"
      :image="`url(${backendHost}/storage/content/alerts/${alert.image})`"
    >
      <h2
        class="tw-text-2xl tw-leading-8 tw-text-neutral-10 dark:tw-text-neutral-90"
      >
        {{ alert.title }}
      </h2>
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
    mdiClose,
  }),
  computed: {
    alert() {
      return this.$store.getters['alerts/getCurrentAlert']
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
