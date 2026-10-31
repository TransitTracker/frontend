<template>
  <li
    v-if="!agency.isArchived && !isLoading"
    class="tw:relative tw:flex tw:flex-col tw:justify-between tw:overflow-hidden tw:rounded-xl tw:border tw:border-neutral-variant-50/20 tw:p-3 tw:text-sm"
    :style="{ backgroundColor: `${agency.color}15` }"
  >
    <div class="tw:flex tw:items-center tw:gap-1">
      <div
        v-for="vehicleType in agency.vehicleTypes"
        :key="vehicleType"
        :style="{ backgroundColor: agency.color, color: agency.textColor }"
        class="tw:flex tw:size-6 tw:shrink-0 tw:items-center tw:justify-center tw:rounded-full"
      >
        <TwIcon :path="vehicleTypesEnum[vehicleType].icon" class="tw:size-4!" />
      </div>
      <div class="tw:min-w-0 tw:ml-1">
        <b
          class="tw:block tw:font-medium tw:text-neutral-10 tw:dark:text-neutral-90"
        >
          {{ agency.name }}
        </b>
      </div>
    </div>
    <p
      class="tw:mb-0! tw:mt-1 tw:text-xs tw:text-neutral-variant-30 tw:dark:text-neutral-variant-80"
    >
      {{ $tc('landing.vehicles', vehicleCounts[agency.slug] || 0) }}
      <span v-if="timestamp">&bull;</span>
      <TwTimeAgo v-if="timestamp" :timestamp="timestamp" />
    </p>
    <div
      v-if="agency.license"
      class="tw:mt-2.5 tw:border-t tw:border-neutral-variant-50/15 tw:pt-2"
    >
      <TwIcon
        v-if="!agency.license.isDownloadable"
        :title="$t('notDownloadable')"
        :path="mdiDownloadOff"
        class="tw:size-4! tw:shrink-0 tw:inline tw:mr-1"
      />
      <a
        v-if="agency.license.url"
        :href="agency.license.url"
        target="_blank"
        rel="noopener noreferrer"
        class="tw:inline-flex tw:max-w-full tw:items-center tw:gap-1 tw:text-xs tw:text-primary-40 tw:hover:underline tw:focus-visible:outline-2 tw:focus-visible:outline-offset-1 tw:focus-visible:outline-primary-40 tw:dark:text-primary-80 tw:dark:focus-visible:outline-primary-80"
      >
        <span class="tw:truncate">{{ agency.license.title }}</span>
        <TwIcon :path="mdiOpenInNew" class="tw:size-4! tw:shrink-0" />
      </a>
      <span
        v-else
        class="tw:inline-flex tw:max-w-full tw:text-xs tw:truncate tw:text-neutral-variant-30 tw:dark:text-neutral-variant-80"
      >
        {{ agency.license.title }}
      </span>
    </div>
  </li>
</template>

<script>
import { mdiOpenInNew, mdiDownloadOff } from '@mdi/js'
import { vehicleTypes as vehicleTypesEnum } from '~/utils/enums'

export default {
  props: {
    agency: {
      type: Object,
      required: true,
    },
    timestamp: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  data: () => ({
    mdiOpenInNew,
    mdiDownloadOff,
    vehicleTypesEnum,
  }),
  computed: {
    vehicleCounts() {
      return this.$store.getters['vehicles/counts']
    },
    isLoading() {
      if (this.agency.slug in this.vehicleCounts) return false

      return true
    },
  },
}
</script>

<i18n>
{
  "en": {
    "notDownloadable": "This agency cannot be downloaded due to its license."
  },
  "fr": {
    "notDownloadable": "Cette agence ne peut pas être téléchargée en raison de sa licence."
  }
}
</i18n>
