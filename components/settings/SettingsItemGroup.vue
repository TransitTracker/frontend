<template>
  <v-item-group :value="value" @change="$emit('input', $event)">
    <v-row dense>
      <slot />
    </v-row>
  </v-item-group>
</template>

<script>
export default {
  props: {
    value: {
      type: [Boolean, String],
      required: true,
    },
  },
}
</script>
