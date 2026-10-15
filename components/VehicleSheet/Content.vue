<template>
  <div class="tw:space-y-2">
    <VehicleSheetRouteIndicator
      :vehicle="vehicle"
      :agency="agency"
      class="tw:hidden tw:md:flex"
    />
    <ul
      v-if="vehicle.properties.tags.length"
      class="tw:flex tw:items-center tw:gap-x-2"
    >
      <TwTag v-for="tag in vehicle.properties.tags" :key="tag" :tag-id="tag" />
    </ul>

    <hr
      class="tw:-mx-4 tw:border-0 tw:border-t tw:border-neutral-variant-50/20 tw:dark:border-neutral-variant-60/20"
    />
    <h3
      class="tw:text-sm tw:font-medium tw:leading-5 tw:text-neutral-10 tw:dark:text-neutral-90"
    >
      {{ $t('trip') }}
    </h3>
    <VehicleSheetRouteIndicator
      v-if="vehicle.properties.route.shortName"
      :vehicle="vehicle"
      :agency="agency"
      class="tw:md:hidden"
    />
    <VehicleSheetPropertiesList :vehicle="vehicle" group="trip" />

    <hr
      v-if="vehicle.properties.trip.blockId"
      class="tw:-mx-4 tw:border-0 tw:border-t tw:border-neutral-variant-50/20 tw:dark:border-neutral-variant-60/20"
    />
    <TwDetails
      v-if="vehicle.properties.trip.blockId"
      :icon="mdiTimelineTextOutline"
      small-icon
      @toggle="isTripsOpen = $event"
    >
      <template #summary>
        <h3
          class="tw:text-sm tw:font-medium tw:leading-5 tw:text-neutral-10 tw:dark:text-neutral-90"
        >
          {{ $t('relatedTrips') }}
        </h3>
      </template>
      <VehicleSheetTripsList :is-open="isTripsOpen" />
    </TwDetails>

    <hr
      class="tw:-mx-4 tw:border-0 tw:border-t tw:border-neutral-variant-50/20 tw:dark:border-neutral-variant-60/20"
    />
    <h3
      class="tw:text-sm tw:font-medium tw:leading-5 tw:text-neutral-10 tw:dark:text-neutral-90"
    >
      {{ $t('vehicle') }}
    </h3>
    <VehicleSheetPropertiesList :vehicle="vehicle" group="vehicle" />

    <hr
      v-if="vehicle.properties.carriageDetails.length"
      class="tw:-mx-4 tw:border-0 tw:border-t tw:border-neutral-variant-50/20 tw:dark:border-neutral-variant-60/20"
    />
    <TwDetails
      v-if="vehicle.properties.carriageDetails.length"
      :icon="mdiTrainCarPassenger"
      small-icon
    >
      <template #summary>
        <h3
          class="tw:text-sm tw:font-medium tw:leading-5 tw:text-neutral-10 tw:dark:text-neutral-90"
        >
          {{ $t('carriageDetails') }}
          <br />
          <small>
            {{
              $tc('carriageQuantity', vehicle.properties.carriageDetails.length)
            }}
          </small>
        </h3>
      </template>
      <ol class="tw:mt-2 tw:space-y-4">
        <TwCarriage
          v-for="(carriage, index) in vehicle.properties.carriageDetails"
          :key="carriage.id"
          :carriage="carriage"
          :is-first="index === 0"
          :is-last="index === vehicle.properties.carriageDetails.length - 1"
        />
      </ol>
    </TwDetails>

    <hr
      v-if="vehicle.properties.links.length"
      class="tw:-mx-4 tw:border-0 tw:border-t tw:border-neutral-variant-50/20 tw:dark:border-neutral-variant-60/20"
    />
    <TwDetails
      v-if="vehicle.properties.links.length"
      :icon="mdiLinkVariant"
      small-icon
    >
      <template #summary>
        <h3
          class="tw:text-sm tw:font-medium tw:leading-5 tw:text-neutral-10 tw:dark:text-neutral-90"
        >
          {{ $t('externalLinks') }}
        </h3>
      </template>
      <VehicleSheetLinksList class="tw:mt-4" />
    </TwDetails>

    <VehicleSheetReportButton :vehicle="vehicle" />
  </div>
</template>

<script>
import {
  mdiLinkVariant,
  mdiTimelineTextOutline,
  mdiTrainCarPassenger,
} from '@mdi/js'

export default {
  props: {
    vehicle: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    isTripsOpen: false,
    mdiLinkVariant,
    mdiTimelineTextOutline,
    mdiTrainCarPassenger,
  }),
  computed: {
    agency() {
      return this.$store.state.agencies.selection ?? {}
    },
  },
}
</script>

<i18n>
{
  "en": {
    "externalLinks": "External Links",
    "trip": "Trip",
    "relatedTrips": "Related Trips",
    "vehicle": "Vehicle",
    "report": "An error with this vehicle?",
    "carriageDetails": "Train Composition",
    "carriageQuantity": "None | One carriage | {count} carriages"
  },
  "fr": {
    "externalLinks": "Liens externes",
    "trip": "Voyage",
    "relatedTrips": "Voyages reliés",
    "vehicle": "Véhicule",
    "report": "Une erreur avec ce véhicule?",
    "carriageDetails": "Composition du train",
    "carriageQuantity": "None | Un wagon | {count} wagons"
  }
}
</i18n>
