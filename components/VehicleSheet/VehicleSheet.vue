<template>
  <footer
    class="tw-absolute tw-top-[calc(100vh-14rem)] tw-mb-[4rem] tw-w-full tw-space-y-2 tw-overflow-y-auto tw-rounded-t-[1.75rem] tw-bg-neutral-99 tw-p-4 tw-pb-20 tw-text-neutral-10 dark:tw-bg-neutral-10 dark:tw-text-neutral-90 md:tw-left-4 md:tw-top-4 md:tw-max-h-[calc(100vh-41px-32px)] md:tw-w-96 md:tw-rounded-xl md:tw-pb-4 xl:tw-space-y-4"
  >
    <div class="-tw-mt-4 md:tw-hidden">
      <div
        class="tw-mx-auto tw-my-1.5 tw-h-1 tw-w-8 tw-rounded-full tw-bg-neutralVariant-30/40 dark:tw-bg-neutralVariant-80/40"
      ></div>
    </div>
    <div
      v-if="warning"
      class="!-tw-mx-4 !-tw-mt-4 !tw-mb-2 tw-bg-error-90 tw-px-4 tw-pb-2 tw-pt-4 tw-font-medium tw-text-error-10 dark:tw-bg-error-30 dark:tw-text-error-90"
    >
      {{ $t(warning) }}
    </div>
    <div
      class="!tw-mt-0 tw-flex tw-h-16 tw-items-center tw-gap-x-4 md:tw-h-auto md:tw-gap-x-6"
    >
      <MapVehicleAvatar />
      <div class="tw-ml-2 tw-grow md:tw-ml-0">
        <h2
          class="tw-break-all tw-text-2xl tw-leading-8 xl:tw-text-4xl xl:tw-leading-[2.75rem]"
        >
          {{
            vehicle.properties.vehicle.label ?? vehicle.properties.vehicle.id
          }}
          <TwFilledIconButton
            v-if="adminMode"
            tag="a"
            :href="`https://admin.transittracker.ca/vehicles/${vehicle.id}/edit`"
            target="_blank"
            class="tw-inline-flex"
          >
            <TwIcon :path="mdiTooltipEdit" />
          </TwFilledIconButton>
        </h2>
        <h3
          class="tw-text-xs tw-font-medium tw-leading-4 xl:tw-text-base xl:tw-font-normal xl:tw-leading-6"
        >
          <span class="md:tw-hidden">{{ agency.shortName }}</span>
          <span class="tw-hidden md:tw-inline">{{ agency.name }}<br /></span>
          <span v-if="vehicle.properties.lastSeenAt">
            <span class="md:tw-hidden">&bull;</span>
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
        class="tw-rounded-lg tw-px-2 tw-py-1 tw-font-bold md:tw-hidden"
      >
        {{ vehicle.properties.route.shortName ?? vehicle.properties.route.id }}
      </div>
    </div>
    <VehicleSheetRouteIndicator
      :vehicle="vehicle"
      :agency="agency"
      class="tw-hidden md:tw-flex"
    />
    <ul
      v-if="vehicle.properties.tags.length"
      class="-tw-ml-6 tw-flex tw-items-center tw-gap-x-2"
    >
      <TwTag v-for="tag in vehicle.properties.tags" :key="tag" :tag-id="tag" />
    </ul>

    <div
      v-if="vehicle.properties.links.length"
      class="-tw-mx-4 tw-h-px tw-border-t tw-bg-neutralVariant-80"
    />
    <TwDetails v-if="vehicle.properties.links.length" small-icon>
      <template #summary>
        <h3 class="tw-text-neutral10 tw-text-sm tw-font-medium tw-leading-5">
          {{ $t('externalLinks') }}
        </h3>
      </template>
      <VehicleSheetLinksList class="tw-mt-4" />
    </TwDetails>
    <div class="-tw-mx-4 tw-h-px tw-border-t tw-bg-neutralVariant-80" />
    <h3 class="tw-text-neutral10 tw-text-sm tw-font-medium tw-leading-5">
      {{ $t('trip') }}
    </h3>
    <VehicleSheetRouteIndicator
      v-if="vehicle.properties.route.shortName"
      :vehicle="vehicle"
      :agency="agency"
      class="md:tw-hidden"
    />
    <VehicleSheetPropertiesList :vehicle="vehicle" group="trip" />
    <div
      v-if="vehicle.properties.trip.blockId"
      class="-tw-mx-4 tw-h-px tw-border-t tw-bg-neutralVariant-80"
    />
    <TwDetails v-if="vehicle.properties.trip.blockId" small-icon>
      <template #summary>
        <h3 class="tw-text-neutral10 tw-text-sm tw-font-medium tw-leading-5">
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
    <div class="-tw-mx-4 tw-h-px tw-border-t tw-bg-neutralVariant-80" />
    <h3 class="tw-text-neutral10 tw-text-sm tw-font-medium tw-leading-5">
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
      "report": "An error with this vehicle?"
    },
    "fr": {
      "externalLinks": "Liens externes",
      "trip": "Voyage",
      "relatedTrips": "Voyages reliés",
      "vehicle": "Véhicule",
      "agencyInactive": "Vous n'avez pas activé cette agence. Pas de problème, voici les informations sur ce véhicule!",
      "vehicleInactive": "Ce véhicule n'est pas actif en ce moment, voici les dernières informations enregistrés.",
      "report": "Une erreur avec ce véhicule?"
    }
  }
</i18n>
