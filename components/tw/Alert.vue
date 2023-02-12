<template>
  <figure
    class="tw-flex tw-w-full tw-items-center tw-gap-4 tw-bg-primary-40 tw-py-2 tw-pl-4 tw-pr-6 tw-text-white dark:tw-bg-primary-80 dark:tw-text-primary-20"
    v-if="alert"
  >
    <TwIcon :path="alert.icon" />
    <div class="tw-grow">
      <figcaption class="tw-leading-6 tw-tracking-wide">
        {{ alert.title }}
      </figcaption>
      <p class="!tw-mb-0 tw-text-sm tw-leading-5 tw-tracking-wide">
        {{ alert.subtitle ?? alert.body }}
      </p>
    </div>
    <TwTextButton>
      {{ $t('open') }}
    </TwTextButton>
    <TwStandardIconButton :title="$t('close')">
      <TwIcon :path="mdiClose" />
    </TwStandardIconButton>
  </figure>
</template>

<script>
import { mdiClose } from '@mdi/js'
export default {
  data: () => ({
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
    markAsRead(id) {
      const value = [...this.readAlerts]
      value.push(id)

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
    "close": "Mark as read and close"
  },
  "fr": {
    "ouvrir": "Ouvrir l'alerte",
    "close": "Marquer comme lu et fermer"
  }
}
</i18n>
