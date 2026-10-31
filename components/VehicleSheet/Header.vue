<template>
  <div class="tw:space-y-2">
    <div
      v-if="warning"
      class="tw:-mx-4! tw:-mt-2! tw:mb-2! tw:bg-error-90 tw:px-4 tw:pb-2 tw:pt-2 tw:font-medium tw:text-error-10 tw:dark:bg-error-30 tw:dark:text-error-90 tw:md:-mt-4! tw:md:pt-4"
    >
      {{ $t(warning) }}
    </div>
    <div
      class="tw:flex tw:h-16 tw:items-center tw:gap-x-4 tw:md:h-auto tw:md:gap-x-6"
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
  </div>
</template>

<script>
import { mdiTooltipEdit } from '@mdi/js'

export default {
  props: {
    vehicle: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
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
    "agencyInactive": "You have not activated this agency. No problem, here is the information on this vehicle!",
    "vehicleInactive": "This vehicle is not active at the moment, here is the last information recorded."
  },
  "fr": {
    "agencyInactive": "Vous n'avez pas activé cette agence. Pas de problème, voici les informations sur ce véhicule!",
    "vehicleInactive": "Ce véhicule n'est pas actif en ce moment, voici les dernières informations enregistrés."
  }
}
</i18n>
