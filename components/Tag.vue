<template>
  <v-chip
    label
    :color="darkMode ? tag.dark_color : tag.color"
    :text-color="darkMode ? tag.dark_text_color : tag.text_color"
    :small="small"
    :class="{ 'pr-0': removeRightPadidng }"
    @click="expand = !expand"
  >
    <v-icon v-if="tag.icon" left :small="small">{{ tag.icon }}</v-icon>
    {{ expand ? tag.label : small ? tag.short_label : tag.label }}
  </v-chip>
</template>

<script>
export default {
  props: {
    tagData: {
      type: Object,
      required: false,
      default: null,
    },
    tagId: {
      type: Number,
      required: false,
      default: null,
    },
    small: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    darkMode() {
      return this.$vuetify.theme.dark
    },
    tag() {
      return this.$store.state.tags.data[this.tagId] ?? {}
    },
    removeRightPadidng() {
      return this.small && !this.tag.short_label && !this.expand
    },
  },
  data: () => ({
    expand: false,
  }),
}
</script>
