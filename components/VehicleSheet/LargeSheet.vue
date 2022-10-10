<template>
  <aside
    class="tw-rounded-xl tw-w-96 tw-p-4 tw-absolute tw-top-4 tw-right-4 tw-overflow-y-auto tw-bg-neutral-99 dark:tw-bg-neutral-10 dark:tw-text-neutral-90 tw-text-neutral-10 tw-space-y-4"
  >
    <div class="tw-flex tw-items-center tw-gap-x-6">
      <MapVehicleAvatar />
      <div>
        <h2 class="tw-leading-[2.75rem] tw-text-4xl">
          {{ vehicle.label ?? vehicle.ref }}
        </h2>
        <h3 class="tw-leading-6 tw-text-base tw-font-normal">
          {{ agency.name }} <br />
          <TimestampAgo
            v-if="vehicle.timestamp"
            :timestamp="parseInt(vehicle.timestamp)"
          />
        </h3>
      </div>
    </div>
    <div
      v-if="vehicle.trip.routeShortName"
      :style="{
        color: vehicle.trip.routeTextColor,
        backgroundColor: vehicle.trip.routeColor,
      }"
      class="tw-px-2 tw-py-1 tw-flex tw-rounded-lg"
    >
      <b class="mr-1">{{ vehicle.trip.routeShortName }}</b>
      <span class="tw-font-medium">
        <b>{{ vehicle.trip.routeLongName }}</b>
        <div class="tw-flex tw-items-center" v-if="vehicle.trip.headsign">
          <TwIcon :path="mdiArrowRight" class="tw-w-5 tw-h-5 tw-gap-x-1" />
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
      class="tw-px-2 tw-py-1 tw-rounded-lg tw-font-bold"
    >
      Route
      {{ vehicle.routeId }}
    </div>

    <div class="tw-bg-neutralVariant-80 tw-border-t -tw-mx-4 tw-h-px" />
    <h3 class="tw-leading-5 tw-text-sm tw-font-medium tw-text-neutral10">
      Étiquettes
    </h3>
    <ul class="-tw-ml-6 tw-flex tw-items-center tw-gap-x-2">
      <TwTag v-for="tag in vehicle.tags" :key="tag" :tag-id="tag" />
    </ul>
    <div class="tw-bg-neutralVariant-80 tw-border-t -tw-mx-4 tw-h-px" />
    <details class="tw-group">
      <summary
        class="tw-flex tw-items-center tw-justify-between tw-cursor-pointer"
      >
        <h3 class="tw-leading-5 tw-text-sm tw-font-medium tw-text-neutral10">
          Liens externes
        </h3>
        <TwIcon :path="mdiChevronDown" class="group-open:tw-rotate-180" />
      </summary>
      <div class="tw-mt-4 tw-space-y-2">
        <TwLink v-for="link in vehicle.links" :key="link" :vehicle="vehicle" />
      </div>
    </details>
    <div class="tw-bg-neutralVariant-80 tw-border-t -tw-mx-4 tw-h-px" />
    <h3 class="tw-leading-5 tw-text-sm tw-font-medium tw-text-neutral10">
      Véhicule
    </h3>
    <VehicleSheetPropertiesList :vehicle="vehicle" group="vehicle" />
    <div class="tw-bg-neutralVariant-80 tw-border-t -tw-mx-4 tw-h-px" />
    <h3 class="tw-leading-5 tw-text-sm tw-font-medium tw-text-neutral10">
      Voyage
    </h3>
    <VehicleSheetPropertiesList :vehicle="vehicle" group="trip" />
  </aside>
</template>

<script>
import { mdiArrowRight, mdiChevronDown } from '@mdi/js'

export default {
  props: {
    vehicle: {
      type: Object,
      required: true,
    },
  },
  computed: {
    agency() {
      return this.$store.state.agencies.data[this.vehicle.agency]
    },
  },
  data: () => ({
    mdiArrowRight,
    mdiChevronDown,
  }),
}
</script>
