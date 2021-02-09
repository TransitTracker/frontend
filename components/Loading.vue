<template>
  <v-progress-linear
    v-if="loading"
    active
    :indeterminate="value === 0"
    :value="value"
    absolute
    top
    height="5px"
    style="z-index: 6"
    color="#5fa2dd"
  />
</template>

<script>
// TODO: fix color for dark mode
export default {
  data: () => ({
    loading: false,
    value: 0,
  }),
  methods: {
    start() {
      this.loading = true
    },
    finish() {
      this.loading = false
    },
    // fail(error) {
    //   console.log(error)
    // },
    increase(num) {
      this.value += num
    },
  },
}
</script>
