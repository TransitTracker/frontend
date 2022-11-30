<template>
  <aside
    class="tt-large-sheet tw-absolute tw-top-4 tw-left-4 tw-hidden tw-w-96 tw-space-y-4 tw-overflow-y-auto tw-rounded-xl tw-bg-neutral-99 tw-p-4 tw-text-neutral-10 dark:tw-bg-neutral-10 dark:tw-text-neutral-90 md:tw-block md:tw-max-h-max"
  >
    <div class="tw-flex tw-items-center tw-gap-x-6">
      <MapVehicleAvatar />
      <div>
        <h2 class="tw-text-4xl tw-leading-[2.75rem]">
          {{ vehicle.label ?? vehicle.ref }}
        </h2>
        <h3 class="tw-text-base tw-font-normal tw-leading-6">
          {{ agency.name }} <br />
          <TwTimeAgo
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
    <ul class="-tw-ml-6 tw-flex tw-items-center tw-gap-x-2">
      <TwTag v-for="tag in vehicle.tags" :key="tag" :tag-id="tag" />
    </ul>

    <div
      v-if="vehicle.links.length"
      class="-tw-mx-4 tw-h-px tw-border-t tw-bg-neutralVariant-80"
    />
    <details v-if="vehicle.links.length" class="tw-group">
      <summary
        class="tw-flex tw-cursor-pointer tw-items-center tw-justify-between"
      >
        <h3 class="tw-text-neutral10 tw-text-sm tw-font-medium tw-leading-5">
          {{ $t('externalLinks') }}
        </h3>
        <TwIcon :path="mdiChevronDown" class="group-open:tw-rotate-180" />
      </summary>
      <div class="tw-mt-4 tw-space-y-2">
        <TwLink
          v-for="link in vehicle.links"
          :key="link"
          :link-id="link"
          :vehicle="vehicle"
        />
      </div>
    </details>
    <div class="-tw-mx-4 tw-h-px tw-border-t tw-bg-neutralVariant-80" />
    <h3 class="tw-text-neutral10 tw-text-sm tw-font-medium tw-leading-5">
      {{ $t('trip') }}
    </h3>
    <VehicleSheetPropertiesList :vehicle="vehicle" group="trip" />
    <div class="-tw-mx-4 tw-h-px tw-border-t tw-bg-neutralVariant-80" />
    <h3 class="tw-text-neutral10 tw-text-sm tw-font-medium tw-leading-5">
      {{ $t('vehicle') }}
    </h3>
    <VehicleSheetPropertiesList :vehicle="vehicle" group="vehicle" />
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
  data: () => ({
    mdiArrowRight,
    mdiChevronDown,
  }),
  computed: {
    agency() {
      return this.$store.state.agencies.data[this.vehicle.agency]
    },
  },
}
</script>

<style>
.tt-large-sheet {
  /* 64px (toolbar) + 56px (bottom bar) + 41px (Mapbox logo) + 32px vertical padding */
  max-height: calc(100vh - 41px - 32px);
}
</style>

<i18n>
  {
    "en": {
      "externalLinks": "External links",
      "vehicle": "Vehicle",
      "trip": "Trip"
    },
    "fr": {
      "externalLinks": "Liens externes",
      "vehicle": "Véhicule",
      "trip": "Voyage"
    }
  }
</i18n>
