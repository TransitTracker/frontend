<template>
  <h3
    class="tw:relative tw:rounded tw:bg-white tw:p-3 tw:font-heading tw:text-xl tw:font-bold tw:text-primary-40 tw:shadow-xs tw:dark:bg-primary-20 tw:dark:text-primary-80"
  >
    <span
      v-if="hasPing"
      class="tw:absolute tw:right-0 tw:top-0 tw:-mr-1 tw:-mt-1 tw:flex tw:h-3.5 tw:w-3.5"
    >
      <span
        class="tw:absolute tw:inline-flex tw:h-full tw:w-full tw:animate-ping tw:rounded-full tw:bg-secondary-50/75 tw:dark:bg-secondary-90/75"
      ></span>
      <span
        class="tw:relative tw:inline-flex tw:h-3.5 tw:w-3.5 tw:rounded-full tw:bg-secondary-40 tw:dark:bg-secondary-80"
      ></span>
    </span>
    <span class="tw:tabular-nums">{{ formattedNumber }}</span>
    <br />
    <small
      class="tw:text-lg tw:font-medium tw:text-primary-10 tw:dark:text-primary-90"
    >
      {{ label }}
      <span v-if="labelSr" class="tw:sr-only">{{ labelSr }}</span>
    </small>
  </h3>
</template>

<script>
export default {
  props: {
    number: {
      type: Number,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    labelSr: {
      type: String,
      required: false,
      default: null,
    },
    hasPing: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data: () => ({
    displayNumber: 0,
    animFrame: null,
  }),
  computed: {
    formattedNumber() {
      try {
        const locale = this.$i18n?.locale || 'en'
        return new Intl.NumberFormat(locale).format(this.displayNumber)
      } catch (e) {
        return this.displayNumber
      }
    },
  },
  watch: {
    number(newVal, oldVal) {
      this.animateNumber(oldVal || 0, newVal)
    },
  },
  mounted() {
    if (this.number) {
      this.animateNumber(0, this.number)
    }
  },
  beforeDestroy() {
    if (this.animFrame) {
      cancelAnimationFrame(this.animFrame)
    }
  },
  methods: {
    animateNumber(start, end) {
      if (start === end) {
        this.displayNumber = end
        return
      }

      if (
        typeof window !== 'undefined' &&
        window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        this.displayNumber = end
        return
      }

      if (this.animFrame) {
        cancelAnimationFrame(this.animFrame)
      }

      const duration = 1200
      const startTime = performance.now()

      const step = (currentTime) => {
        if (this._isDestroyed) return
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        // Ease out exponential curve
        const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
        this.displayNumber = Math.round(start + (end - start) * ease)

        if (progress < 1) {
          this.animFrame = requestAnimationFrame(step)
        } else {
          this.displayNumber = end
        }
      }

      this.animFrame = requestAnimationFrame(step)
    },
  },
}
</script>
