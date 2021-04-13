<template>
  <v-dialog
    v-model="computedValue"
    width="500px"
    @click-outside="toggle"
    @input="toggle($event)"
  >
    <v-card>
      <v-toolbar>
        <v-toolbar-title>{{ $t('regionSwitcher.title') }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon :title="$t('regionSwitcher.close')" @click="toggle">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-window v-model="window" show-arrows>
        <template #prev="{ on, attrs }">
          <v-btn
            fab
            small
            elevation="0"
            color="secondary"
            v-bind="attrs"
            :title="$t('regionSwitcher.previous')"
            v-on="on"
          >
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
        </template>
        <template #next="{ on, attrs }">
          <v-btn
            fab
            small
            elevation="0"
            color="secondary"
            v-bind="attrs"
            :title="$t('regionSwitcher.next')"
            v-on="on"
          >
            <v-icon>mdi-arrow-right</v-icon>
          </v-btn>
        </template>
        <v-window-item v-for="region in regions" :key="region.slug">
          <v-card tile>
            <v-img
              height="250"
              :src="
                region.image ||
                'https://source.unsplash.com/Ms6bSWTcVkg/500x250/'
              "
              gradient="to bottom, transparent 0%, rgba(0,73,123,1) 100%"
            ></v-img>
            <v-card-title>{{ region.name }}</v-card-title>
            <v-card-text>
              <p class="text-subtitle-1 mb-0">
                {{ $tc('regionSwitcher.agency', region.agencies.length) }}
              </p>
              <div>
                {{ region.description }}
              </div>
            </v-card-text>
            <v-card-actions>
              <v-btn v-if="currentRegion === region.slug" text disabled>
                <v-icon left>mdi-check</v-icon>
                {{ $t('regionSwitcher.already') }}
              </v-btn>
              <v-btn
                v-else
                elevation="0"
                color="primary"
                @click="changeTo(region)"
              >
                <v-icon left>mdi-swap-horizontal</v-icon>
                {{ $t('regionSwitcher.changeTo') }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-window-item>
      </v-window>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  data: () => ({
    window: 0,
  }),
  computed: {
    currentRegion() {
      return this.$store.state.settings.currentRegion
    },
    regions() {
      return this.$store.state.regions.data
    },
    computedValue: {
      get() {
        return this.value
      },
      set(value) {
        this.toggle(value)
      },
    },
  },
  mounted() {
    this.window = Object.keys(this.regions).indexOf(this.currentRegion)
  },
  methods: {
    changeTo(region) {
      this.$store.dispatch('settings/changeRegion', region)

      this.$emit('new-region', region)

      const route = this.$route.path
      if (route.includes('regions')) {
        if (route.includes('map')) {
          this.$router.push(this.localePath(`/regions/${region.slug}/map`))
        } else if (route.includes('table')) {
          this.$router.push(this.localePath(`/regions/${region.slug}/table`))
        } else {
          this.$router.push(this.localePath(`/regions/${region.slug}`))
        }
      }
    },
    toggle(value = false) {
      if (typeof value !== 'boolean') {
        value = false
      }
      this.$emit('input', value)
    },
  },
}
</script>
