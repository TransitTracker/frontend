<template>
  <div
    v-if="vehicle.properties.route.shortName"
    :style="{
      color: vehicle.properties.route.textColor,
      backgroundColor: vehicle.properties.route.color,
    }"
    class="tw-flex tw-rounded-lg tw-px-2 tw-py-1"
  >
    <b class="mr-1">{{ vehicle.properties.route.shortName }}</b>
    <span class="tw-font-medium">
      <b>{{ vehicle.properties.route.longName }}</b>
      <div
        v-if="vehicle.properties.trip.headsign"
        class="tw-flex tw-items-center"
      >
        <TwIcon :path="mdiArrowRight" class="tw-h-5 tw-w-5 tw-gap-x-1" />
        {{ vehicle.properties.trip.headsign }}
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
    {{ vehicle.properties.route.id }}
  </div>
</template>

<script>
import { mdiArrowRight } from '@mdi/js'

export default {
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
  data: () => ({ mdiArrowRight }),
}
</script>
