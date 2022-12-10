<template>
  <div
    v-if="vehicle.trip.routeShortName"
    :style="{
      color: vehicle.trip.routeTextColor,
      backgroundColor: vehicle.trip.routeColor,
    }"
    class="tw-flex tw-rounded-lg tw-px-2 tw-py-1"
  >
    <b class="mr-1">{{ vehicle.trip.routeShortName }}</b>
    <span class="tw-font-medium">
      <b>{{ vehicle.trip.routeLongName }}</b>
      <div v-if="vehicle.trip.headsign" class="tw-flex tw-items-center">
        <TwIcon :path="mdiArrowRight" class="tw-h-5 tw-w-5 tw-gap-x-1" />
        {{ vehicle.trip.headsign }}
      </div>
    </span>
  </div>
  <div
    v-else
    :style="{
      border: `1px solid ${agency.color}`,
      color: agency.color,
      backgroundColor: agency.textColor,
    }"
    class="tw-rounded-lg tw-px-2 tw-py-1 tw-font-bold"
  >
    Route
    {{ vehicle.routeId }}
  </div>
</template>

<script>
import { mdiArrowRight } from '@mdi/js'

export default {
  data: () => ({ mdiArrowRight }),
  props: {
    agency: {
      type: Object,
      required: true,
    },
    vehicle: {
      type: Object,
      required: true,
    },
  },
}
</script>
