<template>
  <v-progress-linear
    v-if="loading"
    active
    indeterminate
    absolute
    top
    height="5px"
    style="z-index: 6"
    color="#5fa2dd"
  />
</template>

<script>
// TODO: fix
export default {
  data: () => ({
    loading: false,
  }),
  methods: {
    start() {
      this.loading = true
    },
    finish() {
      this.loading = false
    },
    fail(error) {
      console.log(error)
    },
    increase(num) {
      console.log(num)
    },
  },
}
</script>
