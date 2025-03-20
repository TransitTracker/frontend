<template>
  <dl>
    <VehicleSheetProperty
      v-for="(property, index) in properties"
      :key="index"
      :property="{ key: index, ...property }"
      :vehicle="vehicle"
    />
  </dl>
</template>

<script>
import { FIELDS_DEFINITIONS } from '~/utils/fields'

export default {
  props: {
    vehicle: {
      type: Object,
      required: true,
    },
    group: {
      type: String,
      required: false,
      default: 'vehicle',
    },
  },
  computed: {
    properties() {
      return Object.entries(FIELDS_DEFINITIONS)
        .filter(([key, value]) => value.group === this.group)
        .reduce((acc, [key, value]) => {
          acc[key] = value
          return acc
        }, {})
    },
  },
}
</script>
