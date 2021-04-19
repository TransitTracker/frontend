<template>
  <div>
    <v-btn
      v-if="canInstall"
      block
      elevation="0"
      height="50"
      :color="
        installOutcome
          ? installOutcome === 'accepted'
            ? 'success'
            : 'danger'
          : null
      "
      @click="promptInstaller"
    >
      <v-icon left>
        {{
          installOutcome
            ? installOutcome === 'accepted'
              ? 'mdi-success'
              : 'mdi-close'
            : 'mdi-plus-circle-outline'
        }}
      </v-icon>
      {{
        installOutcome
          ? installOutcome === 'accepted'
            ? $t('settings.pwa.success')
            : $t('settings.pwa.fail')
          : $t('settings.pwa.install')
      }}
    </v-btn>
    <div v-if="canInstall" class="my-3 mx-n3">
      <v-divider />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    canInstall() {
      return this.$store.state.app.canInstall
    },
    installOutcome() {
      return this.$store.state.app.installOutcome
    },
  },
  promptInstaller() {
    this.$store.dispatch('app/promptInstaller')
  },
}
</script>
