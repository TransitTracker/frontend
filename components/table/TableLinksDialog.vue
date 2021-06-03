<template>
  <v-dialog
    v-model="computedValue"
    width="500px"
    @click-outside="toggle"
    @input="toggle($event)"
  >
    <v-card>
      <v-toolbar>
        <v-toolbar-title>
          <span
            :style="{
              backgroundColor: agency.color,
              color: agency.textColor,
            }"
            class="rounded px-2 py-1 text-caption font-weight-medium"
          >
            {{ agency.shortName }}
            {{ vehicle.label || vehicle.ref }}
          </span>
          <div class="mb-1"></div>
          {{ $t('table.linksTitle') }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon :title="$t('regionSwitcher.close')" @click="toggle">
          <v-icon>{{ mdiClose }}</v-icon>
        </v-btn>
      </v-toolbar>
      <v-container>
        <div v-for="(link, index) in links" :key="index">
          <v-skeleton-loader
            v-if="link.loading || !link.url"
            class="mt-4"
            width="100%"
            min-height="62px"
            max-height="62px"
            type="image"
          ></v-skeleton-loader>

          <v-sheet
            v-else
            rounded
            elevation="2"
            :class="[darkMode ? 'grey darken-3' : 'grey lighten-4']"
            class="
              pa-2
              mt-4
              d-flex
              align-center
              justify-space-between
              cursor-pointer
            "
            :light="!darkMode"
            :dark="darkMode"
            :title="$t('mapBottomSheet.openLink')"
            @click="openLink(link.url)"
          >
            <div>
              <p class="subtitle-2 mb-1">
                {{ link.title }}
              </p>
              <p class="body-2 mb-0">
                {{ link.description }}
              </p>
            </div>
            <v-icon class="ml-4" size="20px">
              {{ mdiOpenInNew }}
            </v-icon>
          </v-sheet>
        </div>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import { mdiClose, mdiOpenInNew } from '@mdi/js'
export default {
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  data: () => ({
    mdiClose,
    mdiOpenInNew,
    links: {},
  }),
  computed: {
    agency() {
      if (!this.vehicle.agency) return {}
      return this.$store.state.agencies.data[this.vehicle.agency]
    },
    computedValue: {
      get() {
        return this.value
      },
      set(value) {
        this.toggle(value)
      },
    },
    darkMode() {
      return this.$vuetify.theme.dark
    },
    vehicle() {
      return this.$store.state.vehicles.selection
    },
  },
  watch: {
    vehicle(value) {
      this.getLinks(value)
    },
  },
  mounted() {
    this.getLinks(this.vehicle)
  },
  methods: {
    toggle(value = false) {
      if (typeof value !== 'boolean') {
        value = false
      }
      this.$emit('input', value)
    },
    getLinks(vehicle) {
      if (Object.keys(this.links).length) {
        Object.keys(this.links).forEach((key) => this.$delete(this.links, key))
      }
      if (!vehicle || !vehicle.links) return

      vehicle.links.forEach(async (id) => {
        this.$set(this.links, id, { loading: true })
        const link = await this.$store.dispatch('links/get', id)

        this.$set(this.links, id, link)
      })
    },
    openLink(url) {
      const tab = window.open(
        url
          .replace(':id', this.vehicle.id)
          .replace(':ref', this.vehicle.ref)
          .replace(':trip', this.vehicle.tripId),
        '_blank'
      )
      tab.focus()
    },
  },
}
</script>
