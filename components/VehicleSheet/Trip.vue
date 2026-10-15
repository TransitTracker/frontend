<template>
  <li
    class="tw:-mx-4 tw:flex tw:gap-3 tw:px-4 tw:py-1.5 tw:md:gap-4 tw:md:py-2"
    :class="[
      isCurrentTrip &&
        'tw:bg-primary-90 tw:text-primary-10 tw:dark:bg-primary-30 tw:dark:text-primary-90',
    ]"
  >
    <div
      class="tw:relative tw:-my-1.5 tw:border-y-0 tw:border-l tw:border-r-0 tw:border-solid tw:border-neutral-variant-50 tw:dark:border-neutral-variant-60 tw:md:-my-2"
    >
      <div
        class="tw:absolute tw:mt-3.5 tw:rounded-full tw:md:mt-4"
        :class="[
          isCurrentTrip
            ? 'tw:-left-2 tw:h-4 tw:w-4 tw:bg-primary-10 tw:dark:bg-primary-90'
            : 'tw:-left-1.5 tw:h-3 tw:w-3 tw:bg-neutral-variant-50 tw:dark:bg-neutral-variant-60',
        ]"
      ></div>
    </div>
    <div class="tw:min-w-0 tw:w-full">
      <div class="tw:flex tw:items-center tw:gap-1.5 tw:md:gap-2">
        <span
          class="tw:shrink-0 tw:rounded-md tw:px-1.5 tw:py-0.5 tw:text-xs tw:font-bold tw:md:rounded-lg tw:md:px-2 tw:md:py-1 tw:md:text-sm"
          :style="{
            backgroundColor: trip.routeColor,
            color: trip.routeTextColor,
          }"
        >
          {{ trip.routeShortName }}
        </span>
        <TwIcon
          :path="mdiArrowRight"
          class="tw:h-4 tw:w-4 tw:shrink-0 tw:md:h-5 tw:md:w-5"
        />
        <span class="tw:grow tw:text-xs tw:font-medium tw:md:text-sm">
          {{ trip.headsign }}
        </span>
        <small
          class="tw:ml-1 tw:shrink-0 tw:text-xs tw:font-normal tw:md:ml-2 tw:md:text-sm"
        >
          {{ trip.departure }}
        </small>
      </div>
      <div
        v-if="showDetails"
        class="tw:mt-0.5 tw:flex tw:items-center tw:justify-between tw:gap-x-2 tw:text-2xs tw:font-medium tw:leading-4 tw:text-neutral-variant-30 tw:dark:text-neutral-variant-80 tw:md:mt-1 tw:md:text-xs"
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
    showDetails: {
      required: false,
      type: Boolean,
      default: false,
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
