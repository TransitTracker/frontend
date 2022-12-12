<template>
  <div
    class="text-error-10 tw-rounded-md tw-bg-error-90 tw-p-2 dark:tw-bg-error-30 dark:tw-text-error-90"
  >
    {{ $t('temp') }}
  </div>
  <!--<transition-group name="table-columns" class="tw-list-none !tw-pl-0" tag="ul">
    <li
      class="tw-flex tw-items-center tw-gap-1"
      v-for="(column, index) in columns"
      :key="column.field"
    >
      <TwStandardIconButton
        @click="toggleVisiblity(column.field, !column.visible)"
        :color="column.visible && 'primary'"
      >
        <TwIcon :path="column.visible ? mdiEyeOutline : mdiEyeOffOutline" />
      </TwStandardIconButton>
      <span
        :class="[
          column.visible
            ? 'tw-font-medium'
            : 'tw-text-neutralVariant-30 dark:tw-text-neutral-80',
        ]"
      >
        {{ $t(`properties.${column.field}`) }}
      </span>
      <div class="tw-grow"></div>
      <TwStandardIconButton
        @click="changeOrder(column.field, true)"
        :disabled="index === 0"
      >
        <TwIcon :path="mdiArrowUp" />
      </TwStandardIconButton>
      <TwStandardIconButton
        @click="changeOrder(column.field, false)"
        :disabled="index + 1 === columns.length"
      >
        <TwIcon :path="mdiArrowDown" />
      </TwStandardIconButton>
    </li>
  </transition-group>-->
</template>

<script>
import {
  mdiEyeOutline,
  mdiEyeOffOutline,
  mdiArrowUp,
  mdiArrowDown,
} from '@mdi/js'

export default {
  data: () => ({
    mdiEyeOutline,
    mdiEyeOffOutline,
    mdiArrowUp,
    mdiArrowDown,
  }),
  computed: {
    columns() {
      return this.$store.state.settings.tableColumns
    },
  },
  methods: {
    changeOrder(columnField, up) {
      this.$store.commit('settings/changeColumnOrder', {
        columnField,
        up,
      })
    },
    toggleVisiblity(columnField, visibility) {
      this.$store.commit('settings/changeVisibilityOfColumn', {
        columnField,
        visibility,
      })
    },
  },
}
</script>

<style>
.table-column-move {
  transition: transform 300ms ease-in-out;
}
</style>

<i18n>
  {
    "en": {
      "temp": "This feature has been temporarily disabled. It will return soon once some issues have been resolved."
    },
    "fr": {
      "temp": "Cette fonctionnalité a été temporairement désactivée. Elle reviendra bientôt une fois que certains problèmes auront été résolus."
    }
  }
</i18n>
