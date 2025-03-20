<template>
  <div>
    <h3 class="tw-text-xs tw-font-medium tw-leading-4">{{ $t('visible') }}</h3>
    <draggable
      v-model="visibleColumns"
      group="tableColumns"
      draggable=".tableColumns"
      class="tw-mt-2 tw-space-y-2"
    >
      <div
        v-for="column in visibleColumns"
        :key="column"
        class="tableColumns tw-flex tw-h-8 tw-items-center tw-gap-x-2 tw-rounded-lg tw-bg-neutralVariant-90 tw-pl-2 tw-pr-4 tw-text-sm tw-text-neutralVariant-30 dark:tw-bg-neutralVariant-30 dark:tw-text-neutralVariant-80"
      >
        <TwIcon
          :path="mdiReorderHorizontal"
          class="!tw-h-[1.125rem] !tw-w-[1.125rem]"
        />
        <span>{{ getLabel(column) }}</span>
      </div>
      <div
        v-if="!visibleColumns.length"
        class="tw-flex tw-items-center tw-justify-center tw-rounded-xl tw-border tw-border-dashed tw-border-neutralVariant-50 tw-px-4 tw-py-4 dark:tw-border-neutralVariant-60"
      >
        {{ $t('dropHereVisible') }}
      </div>
    </draggable>
    <!-- TODO: Convert chip to component with hover effect -->
    <button
      v-if="visibleColumns.length !== availableColumns.length"
      class="tw-mt-2 tw-flex tw-h-8 tw-items-center tw-gap-x-2 tw-rounded-lg tw-border tw-border-solid tw-border-neutralVariant-50 tw-pl-2 tw-pr-4 tw-text-sm tw-leading-8 dark:tw-border-neutralVariant-60"
      @click="addAll"
    >
      <TwIcon
        :path="mdiTableColumnPlusAfter"
        class="!tw-h-[1.125rem] !tw-w-[1.125rem]"
      />
      <span>{{ $t('addAll') }}</span>
    </button>
    <h3 class="tw-mt-4 tw-text-xs tw-font-medium tw-leading-4">
      {{ $t('hidden') }}
    </h3>
    <draggable
      v-model="hiddenColumns"
      group="tableColumns"
      class="tw-mt-2 tw-space-y-2"
      draggable=".tableColumns"
    >
      <div
        v-for="column in hiddenColumns"
        :key="column"
        class="tableColumns tw-flex tw-h-8 tw-items-center tw-gap-x-2 tw-rounded-lg tw-bg-neutralVariant-90 tw-pl-2 tw-pr-4 tw-text-sm tw-text-neutralVariant-30 dark:tw-bg-neutralVariant-30 dark:tw-text-neutralVariant-80"
      >
        <TwIcon
          :path="mdiReorderHorizontal"
          class="!tw-h-[1.125rem] !tw-w-[1.125rem]"
        />
        <span>{{ getLabel(column) }}</span>
      </div>
      <div
        v-if="!hiddenColumns.length"
        slot="header"
        class="tw-flex tw-items-center tw-justify-center tw-rounded-xl tw-border tw-border-dashed tw-border-neutralVariant-50 tw-px-4 tw-py-4 dark:tw-border-neutralVariant-60"
      >
        {{ $t('dropHereHidden') }}
      </div>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

import { mdiReorderHorizontal, mdiTableColumnPlusAfter } from '@mdi/js'
import { FIELDS_DEFINITIONS } from '~/utils/fields'

export default {
  components: {
    draggable,
  },
  data: () => ({
    mdiReorderHorizontal,
    mdiTableColumnPlusAfter,
  }),
  computed: {
    availableColumns() {
      return this.$store.getters['settings/availableTableColumns']
    },
    visibleColumns: {
      get() {
        return this.$store.getters['settings/visibleTableColumns']
      },
      set(value) {
        this.$store.commit('settings/set', {
          setting: 'selectedTableColumns',
          value,
        })
      },
    },
    hiddenColumns: {
      get() {
        return this.$store.getters['settings/hiddenTableColumns']
      },
      set(value) {
        this.$store.commit('settings/set', {
          setting: 'selectedTableColumns',
          value: this.availableColumns.filter(
            (column) => !value.includes(column)
          ),
        })
      },
    },
  },
  methods: {
    addAll() {
      this.$store.commit('settings/set', {
        setting: 'selectedTableColumns',
        value: [...this.visibleColumns, ...this.hiddenColumns],
      })
    },
    getLabel(column) {
      return this.$t(FIELDS_DEFINITIONS[column]?.value)
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
      "visible": "Visible",
      "addAll": "Make all columns visible",
      "hidden": "Hidden",
      "dropHereVisible": "Grab and drop a column here to make it visible",
      "dropHereHidden": "Grab and drop a column here to hide it"
    },
    "fr": {
      "visible": "Visible",
      "addAll": "Rendre toutes les colonnes visibles",
      "hidden": "Caché",
      "dropHereVisible": "Prenez et déposez une colonne ici pour la rendre visible",
      "dropHereHidden": "Prenez et déposez une colonne ici pour la masquer"
    }
  }
</i18n>
