<template>
  <div class="v-backdrop" :class="{ 'v-backdrop--active': isActive }">
    <v-sheet
      ref="back"
      v-mutate="measureBack"
      class="v-backdrop__back"
      :style="{ maxHeight: `calc(100vh - ${convertToUnit(subheaderHeight)})` }"
    >
      <slot v-if="active" name="back" />
      <slot v-else name="collapsed" />
    </v-sheet>
    <v-sheet
      class="v-backdrop__front elevation-1"
      :style="{ transform: `translateY(${convertToUnit(frontShift)})` }"
      :click="(isActive = false)"
    >
      <div
        ref="subheader"
        v-mutate="measureSubheader"
        class="v-backdrop__subheader"
      >
        <slot name="subheader" />
      </div>
      <div
        class="v-backdrop__content"
        :style="{
          maxHeight: `calc(100vh - ${convertToUnit(
            frontShift + subheaderHeight
          )})`,
        }"
      >
        <slot />
      </div>
      <div
        class="v-backdrop__overlay"
        :style="{ height: `calc(100vh - ${convertToUnit(frontShift)})` }"
      />
    </v-sheet>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'value',
    event: 'input',
  },
  props: {
    value: { required: false },
  },
  data() {
    return {
      activeHeight: 0,
      collapsedHeight: 0,
      subheaderHeight: 0,
      isActive: !!this.value,
    }
  },
  computed: {
    frontShift() {
      return this.active ? this.activeHeight : this.collapsedHeight
    },
  },
  watch: {
    value(val) {
      this.isActive = !!val
    },
    isActive(val) {
      !!val !== this.value && this.$emit('input', val)
    },
  },
  mounted() {
    this.measureBack()
    this.measureSubheader()

    window.addEventListener('resize', this.measureBack)
  },
  methods: {
    convertToUnit(str, unit = 'px') {
      if (str == null || str === '') {
        return undefined
      } else if (isNaN(+str)) {
        return String(str)
      } else {
        return `${Number(str)}${unit}`
      }
    },
    measureBack() {
      const height = this.$refs.back.$el.getBoundingClientRect().height
      if (this.active) {
        this.activeHeight = height
      } else {
        this.collapsedHeight = height
      }
    },
    measureSubheader() {
      this.subheaderHeight = this.$refs.subheader.getBoundingClientRect().height
    },
  },
}
</script>

<style lang="sass">
// Block
.v-backdrop
  position: relative

  // Element
  &__content, &__front, &__back
    width: 100%
    position: absolute
    transition: all .3s

  &__content, &__back
    overflow: auto

  &__overlay
    width: 100%
    height: 100vh
    position: absolute
    transition: opacity .3s
    background-color: #ffffff
    opacity: 0
    pointer-events: none
    top: 0

  // Modifier
  &--active
    .v-backdrop__overlay
      opacity: .5
      pointer-events: auto

    .v-backdrop__content
      overflow: hidden
</style>
