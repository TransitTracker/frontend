<template>
  <footer
    class="tw:absolute tw:top-[calc(100vh-14rem)] tw:mb-16 tw:w-full tw:space-y-2 tw:overflow-y-auto tw:rounded-t-[1.75rem] tw:bg-neutral-99 tw:p-4 tw:pb-20 tw:text-neutral-10 tw:md:left-2 tw:md:top-2 tw:md:max-h-[calc(100vh-41px-32px)] tw:md:w-96 tw:md:rounded-xl tw:md:pb-4 tw:xl:left-4 tw:xl:top-4 tw:xl:space-y-4 tw:dark:bg-neutral-10 tw:dark:text-neutral-90"
  >
    <div class="tw:-mt-4 tw:md:hidden">
      <div
        class="tw:mx-auto tw:my-1.5 tw:h-1 tw:w-8 tw:rounded-full tw:bg-neutral-variant-30/40 tw:dark:bg-neutral-variant-80/40"
      ></div>
    </div>
    <div
      v-if="warning"
      class="tw:-mx-4! tw:-mt-4! tw:mb-2! tw:bg-error-90 tw:px-4 tw:pb-2 tw:pt-4 tw:font-medium tw:text-error-10 tw:dark:bg-error-30 tw:dark:text-error-90"
    >
      {{ $t(warning) }}
    </div>
    <div
      class="tw:mt-0! tw:flex tw:h-16 tw:items-center tw:gap-x-4 tw:md:h-auto tw:md:gap-x-6"
    >
      <VehicleAvatar />
      <div class="tw:ml-2 tw:grow tw:md:ml-0">
        <h2
          class="tw:break-all tw:text-2xl tw:leading-8 tw:xl:text-4xl tw:xl:leading-11"
        >
          {{
            vehicle.properties.vehicle.label ?? vehicle.properties.vehicle.id
          }}
          <TwFilledIconButton
            v-if="adminMode"
            tag="a"
            :href="`https://admin.transittracker.ca/vehicles/${vehicle.id}/edit`"
            target="_blank"
            class="tw:inline-flex"
          >
            <TwIcon :path="mdiTooltipEdit" />
          </TwFilledIconButton>
        </h2>
        <h3
          class="tw:text-xs tw:font-medium tw:leading-4 tw:xl:text-base tw:xl:font-normal tw:xl:leading-6"
        >
          <span class="tw:md:hidden">{{ agency.shortName }}</span>
          <span class="tw:hidden tw:md:inline">
            {{ agency.name }}
            <br />
          </span>
          <span v-if="vehicle.properties.lastSeenAt">
            <span class="tw:md:hidden">&bull;</span>
            <TwTimeAgo :timestamp="vehicle.properties.lastSeenAt" />
          </span>
        </h3>
      </div>
      <div
        :style="{
          border: vehicle.properties.route.shortName
            ? 'none'
            : `1px solid ${agency.color}`,
          color: vehicle.properties.route.textColor ?? agency.textColor,
          backgroundColor: vehicle.properties.route.color ?? agency.color,
        }"
        class="tw:rounded-lg tw:px-2 tw:py-1 tw:font-bold tw:md:hidden"
      >
        {{ vehicle.properties.route.shortName ?? vehicle.properties.route.id }}
      </div>
    </div>
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

    <div
      v-if="vehicle.properties.carriageDetails.length"
      class="tw:-mx-4 tw:h-px tw:border-t tw:bg-neutral-variant-80"
    />
    <TwDetails v-if="vehicle.properties.carriageDetails.length" small-icon>
      <template #summary>
        <h3
          class="tw:text-neutral-10 tw:dark:text-neutral-90 tw:text-sm tw:font-medium tw:leading-5"
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

    <div
      v-if="vehicle.properties.links.length"
      class="tw:-mx-4 tw:h-px tw:border-t tw:bg-neutral-variant-80"
    />
    <TwDetails v-if="vehicle.properties.links.length" small-icon>
      <template #summary>
        <h3
          class="tw:text-neutral-10 tw:dark:text-neutral-90 tw:text-sm tw:font-medium tw:leading-5"
        >
          {{ $t('externalLinks') }}
        </h3>
      </template>
      <VehicleSheetLinksList class="tw:mt-4" />
    </TwDetails>
    <div class="tw:-mx-4 tw:h-px tw:border-t tw:bg-neutral-variant-80" />
    <h3
      class="tw:text-neutral-10 tw:dark:text-neutral-90 tw:text-sm tw:font-medium tw:leading-5"
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
    <div
      v-if="vehicle.properties.trip.blockId"
      class="tw:-mx-4 tw:h-px tw:border-t tw:bg-neutral-variant-80"
    />
    <TwDetails v-if="vehicle.properties.trip.blockId" small-icon>
      <template #summary>
        <h3
          class="tw:text-neutral-10 tw:dark:text-neutral-90 tw:text-sm tw:font-medium tw:leading-5"
        >
          {{ $t('relatedTrips') }}
        </h3>
      </template>
      <!--      TODO: Load trips only if details is open -->
      <VehicleSheetTripsList />
      <VehicleSheetProperty
        :property="{
          key: 'trip.blockId',
          value: 'properties.trip.blockId',
          icon: mdiIdentifier,
        }"
        :vehicle="vehicle"
      />
    </TwDetails>
    <div class="tw:-mx-4 tw:h-px tw:border-t tw:bg-neutral-variant-80" />
    <h3
      class="tw:text-neutral-10 tw:dark:text-neutral-90 tw:text-sm tw:font-medium tw:leading-5"
    >
      {{ $t('vehicle') }}
    </h3>
    <VehicleSheetPropertiesList :vehicle="vehicle" group="vehicle" />
    <VehicleSheetReportButton :vehicle="vehicle" />
  </footer>
</template>

<script>
import {
  mdiArrowRight,
  mdiChevronDown,
  mdiIdentifier,
  mdiTooltipEdit,
} from '@mdi/js'

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
    mdiIdentifier,
    mdiTooltipEdit,
  }),
  computed: {
    adminMode() {
      return this.$store.state.settings.adminMode
    },
    agency() {
      return this.$store.state.agencies.selection ?? {}
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
      "externalLinks": "External Links",
      "trip": "Trip",
      "relatedTrips": "Related Trips",
      "vehicle": "Vehicle",
      "agencyInactive": "You have not activated this agency. No problem, here is the information on this vehicle!",
      "vehicleInactive": "This vehicle is not active at the moment, here is the last information recorded.",
      "report": "An error with this vehicle?",
      "carriageDetails": "Train Composition",
      "carriageQuantity": "None | One carriage | {count} carriages"
    },
    "fr": {
      "externalLinks": "Liens externes",
      "trip": "Voyage",
      "relatedTrips": "Voyages reliés",
      "vehicle": "Véhicule",
      "agencyInactive": "Vous n'avez pas activé cette agence. Pas de problème, voici les informations sur ce véhicule!",
      "vehicleInactive": "Ce véhicule n'est pas actif en ce moment, voici les dernières informations enregistrés.",
      "report": "Une erreur avec ce véhicule?",
      "carriageDetails": "Composition du train",
      "carriageQuantity": "None | Un wagon | {count} wagons"
    }
  }
</i18n>
