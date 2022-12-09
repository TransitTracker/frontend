<template>
  <!-- Mining top : 4 (appbar) + 5.25 (nav bar) -->
  <footer
    class="tw-absolute tw-top-[calc(100vh-15.25rem)] tw-w-full tw-space-y-4 tw-rounded-t-[1.75rem] tw-bg-neutral-99 tw-p-4 tw-pb-[5.25rem] tw-text-neutral-10 dark:tw-bg-neutral-10 dark:tw-text-neutral-90 md:tw-hidden"
  >
    <div class="-tw-mt-4">
      <div
        class="tw-my-1.5 tw-mx-auto tw-h-1 tw-w-8 tw-rounded-full tw-bg-neutralVariant-30/40 dark:tw-bg-neutralVariant-80/40"
      ></div>
    </div>
    <div
      v-if="warning"
      class="tw-relative tw-rounded-md tw-bg-error-90 tw-px-2 tw-py-1 tw-text-error-10 dark:tw-bg-error-30 dark:tw-text-error-90"
    >
      {{ $t(warning) }}
    </div>
    <div class="!tw-mt-0 tw-flex tw-h-16 tw-items-center tw-gap-x-4">
      <MapVehicleAvatar />
      <div class="tw-ml-2 tw-grow">
        <h2 class="tw-text-2xl tw-leading-8">
          {{ vehicle.label ?? vehicle.ref }}
        </h2>
        <h3 class="tw-text-xs tw-font-medium tw-leading-4">
          {{ agency.shortName }}
          <span v-if="vehicle.timestamp">
            &bull;
            <TwTimeAgo :timestamp="parseInt(vehicle.timestamp)" />
          </span>
        </h3>
      </div>
      <div
        v-if="vehicle.trip.routeShortName"
        :style="{
          color: vehicle.trip.routeTextColor,
          backgroundColor: vehicle.trip.routeColor,
        }"
        class="tw-rounded-lg tw-px-2 tw-py-1 tw-font-bold"
      >
        {{ vehicle.trip.routeShortName }}
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
    <VehicleSheetPropertiesList :vehicle="vehicle" group="trip" />
    <div class="-tw-mx-4 tw-h-px tw-border-t tw-bg-neutralVariant-80" />
    <h3 class="tw-text-neutral10 tw-text-sm tw-font-medium tw-leading-5">
      {{ $t('vehicle') }}
    </h3>
    <VehicleSheetPropertiesList :vehicle="vehicle" group="vehicle" />
  </footer>
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
      return this.$store.state.agencies.data[this.vehicle.agency] ?? {}
    },
    warning() {
      return this.$store.state.vehicles.warning
    },
  },
}
</script>

<i18n>
  {
    "en": {
      "externalLinks": "External links",
      "vehicle": "Vehicle",
      "trip": "Trip",
      "agencyInactive": "You have not activated this agency. No problem, here is the information on this vehicle!",
      "vehicleInactive": "This vehicle is not active at the moment, here is the last information recorded."
    },
    "fr": {
      "externalLinks": "Liens externes",
      "vehicle": "Véhicule",
      "trip": "Voyage",
      "agencyInactive": "Vous n'avez pas activé cette agence. Pas de problème, voici les informations sur ce véhicule!",
      "vehicleInactive": "Ce véhicule n'est pas actif en ce moment, voici les dernières informations enregistrés."
    }
  }
</i18n>
