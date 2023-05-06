<template>
  <TwTextButton with-icon tag="a" :href="url" class="-tw-ml-3" target="_blank">
    <TwIcon :path="mdiCommentAlertOutline" />
    {{ $t('report') }}
  </TwTextButton>
</template>

<script>
import { mdiCommentAlertOutline } from '@mdi/js'

export default {
  props: {
    vehicle: {
      type: Object,
      required: false,
      default: null,
    },
  },
  data: () => ({
    mdiCommentAlertOutline,
  }),
  computed: {
    cVehicle() {
      if (this.vehicle) return this.vehicle
      return this.$store.state.vehicles.selection
    },
    url() {
      const url = new URL(
        this.$i18n.locale === 'fr' ? process.env.reportFr : process.env.reportEn
      )

      url.searchParams.append('agency', this.cVehicle.agency)
      url.searchParams.append('id', this.cVehicle.id)
      url.searchParams.append('ref', this.cVehicle.ref)
      url.searchParams.append('label', this.cVehicle.label)

      return url.href
    },
  },
}
</script>

<i18n>
  {
    "en": {
      "report": "An error with this vehicle?"
    },
    "fr": {
      "report": "Une erreur avec ce véhicule?"
    }
  }
</i18n>
