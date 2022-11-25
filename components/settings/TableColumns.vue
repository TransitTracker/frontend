<template>
  <transition-group name="table-columns" class="tw-list-none !tw-pl-0" tag="ul">
    <li
      class="tw-flex tw-items-center tw-gap-1"
      v-for="(column, index) in columns"
      :key="column.field"
    >
      <TwStandardIconButton
        @click="toggleVisiblity(column.field, !column.visible)"
        :color="column.visible ? 'primary' : null"
      >
        <TwIcon :path="column.visible ? mdiEyeOutline : mdiEyeOffOutline" />
      </TwStandardIconButton>
      <span>{{ $t(`properties.${column.field}`) }}</span>
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
  </transition-group>
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
