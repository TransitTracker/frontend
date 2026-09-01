<template>
  <div class="tw:relative tw:mt-3 tw:space-y-1">
    <!-- Toggle for showing/hiding Trip ID and Departure Number (hidden by default) -->
    <div
      v-if="visibleTrips.length"
      class="tw:flex tw:items-center tw:justify-end tw:pb-1"
    >
      <button
        type="button"
        class="tw:inline-flex tw:items-center tw:gap-1 tw:rounded tw:px-1.5 tw:py-0.5 tw:text-2xs tw:font-medium tw:text-neutral-variant-40 tw:transition-colors tw:hover:bg-neutral-variant-90 tw:hover:text-primary-40 tw:dark:text-neutral-variant-70 tw:dark:hover:bg-neutral-variant-20 tw:dark:hover:text-primary-80"
        @click="showTripDetails = !showTripDetails"
      >
        <TwIcon
          :path="showTripDetails ? mdiEyeOffOutline : mdiEyeOutline"
          class="tw:h-3.5 tw:w-3.5"
        />
        <span>
          {{ showTripDetails ? $t('hideDetails') : $t('showDetails') }}
        </span>
      </button>
    </div>

    <!-- Spoiler button to expand/collapse earlier trips -->
    <button
      v-if="earlierCount > 0 || (showEarlier && earlierTripsCount > 0)"
      type="button"
      class="tw:flex tw:w-full tw:items-center tw:justify-center tw:gap-1.5 tw:rounded-lg tw:py-1.5 tw:text-xs tw:font-medium tw:text-primary-40 tw:transition-colors tw:hover:bg-primary-40/10 tw:dark:text-primary-80 tw:dark:hover:bg-primary-80/10"
      @click="showEarlier = !showEarlier"
    >
      <TwIcon
        :path="showEarlier ? mdiChevronUp : mdiChevronDown"
        class="tw:h-4 tw:w-4"
      />
      <span>
        {{
          showEarlier
            ? $t('hideEarlierTrips')
            : $tc('showEarlierTrips', earlierCount, { count: earlierCount })
        }}
      </span>
    </button>

    <!-- List of visible related trips -->
    <ol v-if="visibleTrips.length" class="tw:relative tw:list-none tw:pl-0!">
      <VehicleSheetTrip
        v-for="trip in visibleTrips"
        :key="trip.id"
        :trip="trip"
        :is-current-trip="trip.id === currentTripId"
        :show-details="showTripDetails"
      />
    </ol>

    <!-- Skeleton loader while fetching trips for the vehicle -->
    <ol
      v-else-if="isLoading || (!isTripsLoaded && (isOpen || !lazy))"
      class="tw:relative tw:list-none tw:pl-0!"
    >
      <VehicleSheetTripSkeleton />
    </ol>

    <!-- Spoiler button to expand/collapse later trips -->
    <button
      v-if="laterCount > 0 || (showLater && laterTripsCount > 0)"
      type="button"
      class="tw:flex tw:w-full tw:items-center tw:justify-center tw:gap-1.5 tw:rounded-lg tw:py-1.5 tw:text-xs tw:font-medium tw:text-primary-40 tw:transition-colors tw:hover:bg-primary-40/10 tw:dark:text-primary-80 tw:dark:hover:bg-primary-80/10"
      @click="showLater = !showLater"
    >
      <TwIcon
        :path="showLater ? mdiChevronUp : mdiChevronDown"
        class="tw:h-4 tw:w-4"
      />
      <span>
        {{
          showLater
            ? $t('hideLaterTrips')
            : $tc('showLaterTrips', laterCount, { count: laterCount })
        }}
      </span>
    </button>
    <VehicleSheetProperty
      :property="{
        key: 'trip.blockId',
        value: 'properties.trip.blockId',
        icon: mdiIdentifier,
      }"
      :vehicle="vehicle"
    />
  </div>
</template>

<script>
import {
  mdiChevronDown,
  mdiChevronUp,
  mdiEyeOffOutline,
  mdiEyeOutline,
  mdiIdentifier,
} from '@mdi/js'

export default {
  props: {
    // Indicates if the parent container (e.g. TwDetails spoiler or dialog) is currently open
    isOpen: {
      type: Boolean,
      required: false,
      default: false,
    },
    // When true, trips are only loaded when isOpen becomes true (1 request per vehicle, cached in memory)
    lazy: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  data: () => ({
    relatedTrips: [], // Full list of related trips for the current block stored in memory
    isTripsLoaded: false, // Stores the vehicle.id for which trips were loaded to avoid redundant network requests
    isLoading: false, // Loading indicator state
    showEarlier: false, // User toggle state for revealing earlier trips hidden before currentIndex - 1
    showLater: false, // User toggle state for revealing later trips hidden after currentIndex + 2
    showTripDetails: false, // User toggle state for showing trip ID and departure number (hidden by default)
    mdiChevronDown,
    mdiChevronUp,
    mdiEyeOffOutline,
    mdiEyeOutline,
    mdiIdentifier,
  }),
  computed: {
    agency() {
      return this.$store.state.agencies.selection
    },
    vehicle() {
      return this.$store.state.vehicles.selection
    },
    currentTripId() {
      return this.vehicle?.properties?.trip?.id
    },
    // Index of the vehicle's current trip within the relatedTrips array
    currentIndex() {
      if (!this.currentTripId) return -1
      return this.relatedTrips.findIndex(
        (trip) => trip.id === this.currentTripId,
      )
    },
    // Number of earlier trips before (currentIndex - 1).
    // If there are less than 4 total trips, all trips are shown so earlier count is 0.
    earlierTripsCount() {
      if (this.relatedTrips.length < 4) return 0
      if (this.currentIndex > 1) {
        return this.currentIndex - 1
      }
      return 0
    },
    // Count displayed on the "Show earlier trips" button (0 if already expanded)
    earlierCount() {
      return !this.showEarlier ? this.earlierTripsCount : 0
    },
    // Number of later trips after (currentIndex + 2).
    // If there are less than 4 total trips, all trips are shown so later count is 0.
    laterTripsCount() {
      if (this.relatedTrips.length < 4) return 0
      if (this.currentIndex !== -1) {
        // We show current trip + 2 future trips (up to index currentIndex + 2, which is currentIndex + 3 in exclusive slice end)
        return Math.max(0, this.relatedTrips.length - (this.currentIndex + 3))
      }
      return Math.max(0, this.relatedTrips.length - 3)
    },
    // Count displayed on the "Show later trips" button (0 if already expanded)
    laterCount() {
      return !this.showLater ? this.laterTripsCount : 0
    },
    // Slices the full relatedTrips array according to pagination rules:
    // 1. If total trips < 4: Show all trips without hiding any behind spoilers.
    // 2. If total trips >= 4 and current trip is found:
    //    - Default window: 1 previous trip (currentIndex - 1), current trip (currentIndex), 2 future trips (currentIndex + 1, currentIndex + 2).
    //    - showEarlier expands the window to start at index 0.
    //    - showLater expands the window to end at the last trip.
    // 3. Fallback if current trip is not matched: show first 3 trips by default, expand on showLater.
    visibleTrips() {
      if (!this.relatedTrips.length) return []

      // If there are less than 4 trips, show all of them directly
      if (this.relatedTrips.length < 4) {
        return this.relatedTrips
      }

      if (this.currentIndex !== -1) {
        const startIndex = this.showEarlier
          ? 0
          : Math.max(0, this.currentIndex - 1)
        // currentIndex + 3 slice end includes: currentIndex (current), currentIndex + 1 (future 1), currentIndex + 2 (future 2)
        const endIndex = this.showLater
          ? this.relatedTrips.length
          : Math.min(this.relatedTrips.length, this.currentIndex + 3)
        return this.relatedTrips.slice(startIndex, endIndex)
      }

      // Fallback when currentIndex is not in relatedTrips
      const endIndex = this.showLater
        ? this.relatedTrips.length
        : Math.min(this.relatedTrips.length, 3)
      return this.relatedTrips.slice(0, endIndex)
    },
  },
  watch: {
    // Reset toggle states and fetch data when vehicle changes
    vehicle(newVehicle, oldVehicle) {
      if (oldVehicle?.id !== newVehicle?.id) {
        this.showEarlier = false
        this.showLater = false
        if (!this.lazy || this.isOpen) {
          this.loadTrips(newVehicle)
        }
      }
    },
    // Trigger lazy loading when the section/dialog is opened
    isOpen(newVal) {
      if (newVal) {
        this.loadTrips(this.vehicle)
      }
    },
  },
  mounted() {
    // Load immediately only if not lazy or if initially open
    if (!this.lazy || this.isOpen) {
      this.loadTrips(this.vehicle)
    }
  },
  methods: {
    // Fetch all trips in the block once per vehicle and cache them in memory
    async loadTrips(vehicle) {
      if (!vehicle?.id || vehicle.id === this.isTripsLoaded) {
        return
      }

      if (!vehicle?.properties?.trip?.blockId) {
        return
      }

      this.isLoading = true
      this.relatedTrips = []

      try {
        const { data } = await this.$axios.get(
          `/agencies/${this.agency.slug}/trips/${vehicle.properties.trip.id}/blocks`,
        )
        this.relatedTrips = data.data
        this.isTripsLoaded = vehicle.id
      } catch (error) {
        this.relatedTrips = []
      } finally {
        this.isLoading = false
      }
    },
  },
}
</script>

<i18n>
{
  "en": {
    "showEarlierTrips": "Show 1 earlier trip | Show {count} earlier trips",
    "showLaterTrips": "Show 1 later trip | Show {count} later trips",
    "hideEarlierTrips": "Hide earlier trips",
    "hideLaterTrips": "Hide later trips",
    "showDetails": "Show trip IDs",
    "hideDetails": "Hide trip IDs"
  },
  "fr": {
    "showEarlierTrips": "Afficher 1 voyage précédent | Afficher {count} voyages précédents",
    "showLaterTrips": "Afficher 1 voyage suivant | Afficher {count} voyages suivants",
    "hideEarlierTrips": "Masquer les voyages précédents",
    "hideLaterTrips": "Masquer les voyages suivants",
    "showDetails": "Afficher les identifiants",
    "hideDetails": "Masquer les identifiants"
  }
}
</i18n>
