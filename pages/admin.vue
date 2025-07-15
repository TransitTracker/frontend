<template>
  <div class="tw-m-4 tw-space-y-8">
    <div>
      <p v-if="adminMode">Admin mode is On</p>
      <p v-else>Admin mode is Off</p>
      <button
        :disabled="adminMode"
        class="tw-bg-primary-40 tw-p-2 tw-text-white disabled:tw-cursor-not-allowed disabled:tw-bg-neutral-30"
        @click="toggleAdmin(true)"
      >
        Turn On
      </button>
      <button
        :disabled="!adminMode"
        class="tw-bg-primary-40 tw-p-2 tw-text-white disabled:tw-cursor-not-allowed disabled:tw-bg-neutral-30"
        @click="toggleAdmin(false)"
      >
        Turn Off
      </button>
    </div>
    <div class="gap-2 tw-flex tw-max-w-lg tw-items-center">
      <TwFilledIconButton class="tw-shrink-0" color="primary">
        <TwIcon :path="mdiTooltipEdit" />
      </TwFilledIconButton>
      <p>
        The previous icon is displayed on the map and table to quickly open a
        vehicle's admin page. The icon is displayed on all vehicles, even if you
        do not have permission to edit all vehicles.
      </p>
    </div>
  </div>
</template>

<script>
import { mdiTooltipEdit } from '@mdi/js'

export default {
  data: () => ({
    mdiTooltipEdit,
  }),
  computed: {
    adminMode() {
      return this.$store.state.settings.adminMode
    },
  },
  methods: {
    toggleAdmin(newState) {
      this.$store.commit('settings/set', {
        setting: 'adminMode',
        value: newState,
      })
    },
  },
}
</script>
