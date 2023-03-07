<template>
  <li
    class="-tw-mx-4 tw-flex tw-gap-4 tw-py-2 tw-px-4"
    :class="[
      isCurrentTrip &&
        ' tw-bg-primary-90 tw-text-primary-10 dark:tw-bg-primary-30 dark:tw-text-primary-90',
    ]"
  >
    <div
      class="tw-relative -tw-my-2 tw-border-y-0 tw-border-l tw-border-r-0 tw-border-solid tw-border-neutralVariant-50 dark:tw-border-neutralVariant-60"
    >
      <div
        class="tw-absolute tw-mt-4 tw-rounded-full"
        :class="[
          isCurrentTrip
            ? '-tw-left-2 tw-h-4 tw-w-4 tw-bg-primary-10 dark:tw-bg-primary-90'
            : '-tw-left-1.5 tw-h-3 tw-w-3 tw-bg-neutralVariant-50 dark:tw-bg-neutralVariant-60',
        ]"
      ></div>
    </div>
    <div class="tw-w-full">
      <div class="tw-flex tw-items-center">
        <span
          class="tw-rounded-lg tw-px-2 tw-py-1 tw-font-bold"
          :style="{
            backgroundColor: trip.routeColor,
            color: trip.routeTextColor,
          }"
        >
          {{ trip.routeShortName }}
        </span>
        <TwIcon :path="mdiArrowRight" class="tw-ml-2 tw-mr-1" />
        <span class="tw-grow">
          {{ trip.headsign }}
        </span>
        <small class="tw-text-sm">{{ trip.departure }}</small>
      </div>
      <div
        class="tw-mt-1 tw-flex tw-items-center tw-justify-between tw-gap-x-2 tw-text-xs tw-font-medium tw-leading-4 tw-text-neutralVariant-30 dark:tw-text-neutralVariant-80"
      >
        <span>{{ $t('trip') }} {{ trip.id }}</span>
        <span v-if="trip.shortName">
          {{ $t('departure') }} #{{ trip.shortName }}
        </span>
      </div>
    </div>
  </li>
</template>

<script>
import { mdiArrowRight } from '@mdi/js'

export default {
  props: {
    trip: {
      required: true,
      type: Object,
    },
    isCurrentTrip: {
      required: true,
      type: Boolean,
    },
  },
  data: () => ({
    mdiArrowRight,
  }),
}
</script>

<i18n>
{
   "en":{
      "trip":"Trip ID:",
      "departure":"Departure"
   },
   "fr":{
      "about":"ID du voyage :",
      "departure":"Départ"
   }
}
</i18n>
