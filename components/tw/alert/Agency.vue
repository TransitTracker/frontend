<template>
  <li
    class="tw-relative tw-flex tw-justify-between tw-overflow-hidden tw-rounded-lg tw-py-1 tw-px-2 tw-text-sm tw-leading-5 md:tw-p-2"
    :style="{ backgroundColor: `${agency.color}26` }"
  >
    <div>
      <b class="tw-font-medium">
        {{ agency.name }}
      </b>
      <p class="!tw-mb-0">
        {{ regions }}
      </p>
    </div>
    <div
      class="tw-absolute tw-inset-y-0 -tw-right-4 tw-h-full tw-w-20 tw-skew-x-[18deg]"
      :style="{ backgroundColor: agency.color }"
    ></div>
    <TwStandardIconButton
      @click="addAgency()"
      :style="{ color: agency.textColor }"
    >
      <TwIcon
        :path="activeAgencies.includes(agency.slug) ? mdiCheck : mdiPlusCircle"
      />
    </TwStandardIconButton>
  </li>
</template>

<script>
import { mdiPlusCircle, mdiCheck } from '@mdi/js'
export default {
  data: () => ({
    mdiPlusCircle,
    mdiCheck,
  }),
  props: {
    agencySlug: {
      type: String,
      required: true,
    },
  },
  computed: {
    activeAgencies() {
      return this.$store.state.settings.activeAgencies
    },
    agency() {
      return this.$store.state.agencies.data[this.agencySlug]
    },
    regions() {
      return this.agency.regions
        .map((regionSlug) => this.$store.state.regions.data[regionSlug].name)
        .join(' • ')
    },
  },
  methods: {
    addAgency() {
      this.$store.dispatch('settings/toggleAgency', this.agency)
    },
  },
}
</script>
