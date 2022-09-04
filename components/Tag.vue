<template>
  <div>
    <v-chip
      label
      :color="darkMode ? tag.dark_color : tag.color"
      :text-color="darkMode ? tag.dark_text_color : tag.text_color"
      :small="small"
      :class="{ 'pr-0': removeRightPadidng }"
      @click="expand = !expand"
      :id="`tag-${uuid}`"
    >
      <v-icon v-if="tag.icon" left :small="small">{{ tag.icon }}</v-icon>
      {{ expand ? tag.label : small ? tag.short_label : tag.label }}
    </v-chip>
    <v-tooltip
      v-if="tag.description"
      top
      :activator="`#tag-${uuid}`"
      color="black"
    >
      {{ tag.description }}
    </v-tooltip>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'

export default {
  props: {
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
  data: () => ({
    expand: false,
    uuid: null,
  }),
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
  mounted() {
    this.uuid = uuidv4()
  },
}
</script>
