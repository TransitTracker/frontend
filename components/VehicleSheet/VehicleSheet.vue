<template>
  <footer
    class="tw-absolute tw-top-[calc(100vh-14rem)] tw-mb-[4rem] tw-w-full tw-space-y-4 tw-overflow-y-auto tw-rounded-t-[1.75rem] tw-bg-neutral-99 tw-p-4 tw-pb-20 tw-text-neutral-10 dark:tw-bg-neutral-10 dark:tw-text-neutral-90 md:tw-top-4 md:tw-left-4 md:tw-max-h-[calc(100vh-41px-32px)] md:tw-w-96 md:tw-rounded-xl md:tw-pb-4"
  >
    <div class="-tw-mt-4 md:tw-hidden">
      <div
        class="tw-my-1.5 tw-mx-auto tw-h-1 tw-w-8 tw-rounded-full tw-bg-neutralVariant-30/40 dark:tw-bg-neutralVariant-80/40"
      ></div>
    </div>
    <div
      v-if="warning"
      class="!-tw-mx-4 !tw-mb-2 !-tw-mt-4 tw-bg-error-90 tw-px-4 tw-pt-4 tw-pb-2 tw-font-medium tw-text-error-10 dark:tw-bg-error-30 dark:tw-text-error-90"
    >
      {{ $t(warning) }}
    </div>
    <div
      class="!tw-mt-0 tw-flex tw-h-16 tw-items-center tw-gap-x-4 md:tw-h-auto md:tw-gap-x-6"
    >
      <MapVehicleAvatar />
      <div class="tw-ml-2 tw-grow md:tw-ml-0">
        <h2
          class="tw-text-2xl tw-leading-8 md:tw-text-4xl md:tw-leading-[2.75rem]"
        >
          {{ vehicle.label ?? vehicle.ref }}
        </h2>
        <h3
          class="tw-text-xs tw-font-medium tw-leading-4 md:tw-text-base md:tw-font-normal md:tw-leading-6"
        >
          <span class="md:tw-hidden">{{ agency.shortName }}</span>
          <span class="tw-hidden md:tw-inline">{{ agency.name }}<br /></span>
          <span v-if="vehicle.timestamp">
            <span class="md:tw-hidden">&bull;</span>
            <TwTimeAgo :timestamp="parseInt(vehicle.timestamp)" />
          </span>
        </h3>
      </div>
      <div
        :style="{
          border: vehicle.trip.routeShortName
            ? 'none'
            : `1px solid ${agency.color}`,
          color: vehicle.trip.routeTextColor ?? agency.textColor,
          backgroundColor: vehicle.trip.routeColor ?? agency.color,
        }"
        class="tw-rounded-lg tw-px-2 tw-py-1 tw-font-bold md:tw-hidden"
      >
        {{
          vehicle.trip.routeShortName
            ? vehicle.trip.routeShortName
            : vehicle.routeId
        }}
      </div>
    </div>
    <VehicleSheetRouteIndicator
      :vehicle="vehicle"
      :agency="agency"
      class="tw-hidden md:tw-flex"
    />
    <ul
      class="-tw-ml-6 tw-flex tw-items-center tw-gap-x-2"
      v-if="vehicle.tags.length"
    >
      <TwTag v-for="tag in vehicle.tags" :key="tag" :tag-id="tag" />
    </ul>

    <div
      v-if="vehicle.links.length"
      class="-tw-mx-4 tw-h-px tw-border-t tw-bg-neutralVariant-80"
    />
    <TwDetails small-icon v-if="vehicle.links.length">
      <template #summary>
        <h3 class="tw-text-neutral10 tw-text-sm tw-font-medium tw-leading-5">
          {{ $t('externalLinks') }}
        </h3>
      </template>
      <VehicleSheetLinksList />
    </TwDetails>
    <div class="-tw-mx-4 tw-h-px tw-border-t tw-bg-neutralVariant-80" />
    <h3 class="tw-text-neutral10 tw-text-sm tw-font-medium tw-leading-5">
      {{ $t('trip') }}
    </h3>
    <VehicleSheetRouteIndicator
      :vehicle="vehicle"
      :agency="agency"
      class="md:tw-hidden"
      v-if="vehicle.trip.routeShortName"
    />
    <VehicleSheetPropertiesList :vehicle="vehicle" group="trip" />
    <div
      class="-tw-mx-4 tw-h-px tw-border-t tw-bg-neutralVariant-80"
      v-if="vehicle.trip.blockId"
    />
    <TwDetails small-icon v-if="vehicle.trip.blockId">
      <template #summary>
        <h3 class="tw-text-neutral10 tw-text-sm tw-font-medium tw-leading-5">
          {{ $t('relatedTrips') }}
        </h3>
      </template>
      <VehicleSheetTripsList />
      <VehicleSheetProperty
        :property="{
          field: 'trip.blockId',
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
    <TwTextButton
      with-icon
      tag="a"
      :href="reportUrl"
      class="-tw-ml-3"
      target="_blank"
    >
      <TwIcon :path="mdiCommentAlertOutline" />
      {{ $t('report') }}
    </TwTextButton>
  </footer>
</template>

<script>
import {
  mdiArrowRight,
  mdiChevronDown,
  mdiCommentAlertOutline,
  mdiIdentifier,
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
    mdiCommentAlertOutline,
    mdiIdentifier,
  }),
  computed: {
    agency() {
      return this.$store.state.agencies.data[this.vehicle.agency] ?? {}
    },
    reportUrl() {
      const url = new URL(
        this.$i18n.locale === 'fr' ? process.env.reportFr : process.env.reportEn
      )

      url.searchParams.append('agency', this.vehicle.agency)
      url.searchParams.append('id', this.vehicle.id)
      url.searchParams.append('ref', this.vehicle.ref)
      url.searchParams.append('label', this.vehicle.label)

      return url.href
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
