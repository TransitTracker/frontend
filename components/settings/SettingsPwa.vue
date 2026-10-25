<template>
  <div
    class="tw:rounded-xl tw:bg-neutral-90 tw:p-4 tw:dark:bg-neutral-22"
    v-if="canInstall"
  >
    <h3 class="tw:font-medium">{{ $t('title') }}</h3>
    <p class="tw:mb-0! tw:text-sm">
      {{ $t('description') }}
    </p>
    <TwFilledButton
      class="tw:mt-4"
      with-icon
      :color="
        installOutcome
          ? installOutcome === 'accepted'
            ? 'success'
            : 'danger'
          : null
      "
      @click="promptInstaller"
    >
      <TwIcon
        :path="
          installOutcome
            ? installOutcome === 'accepted'
              ? mdiCheck
              : mdiClose
            : mdiPlusCircleOutline
        "
      />
      {{
        installOutcome
          ? installOutcome === 'accepted'
            ? $t('success')
            : $t('fail')
          : $t('install')
      }}
    </TwFilledButton>
  </div>
</template>

<script>
import { mdiClose, mdiPlusCircleOutline, mdiCheck } from '@mdi/js'

export default {
  data: () => ({
    mdiClose,
    mdiPlusCircleOutline,
    mdiCheck,
  }),
  computed: {
    canInstall() {
      return this.$store.state.app.canInstall
    },
    installOutcome() {
      return this.$store.state.app.installOutcome
    },
  },
  methods: {
    promptInstaller() {
      this.$store.dispatch('app/promptInstaller')
    },
  },
}
</script>

<i18n>
  {
    "en": {
      "title": "Install Transit Tracker",
      "description": "You can install Transit Tracker as a browser app, for quick and easy access.",
      "install": "Install",
      "success": "Success!",
      "error": "Error while installing",
      "updateAvailable": "An update is available",
      "updatePending": "The update is being installed! When ready, the page will refresh.",
      "installUpdate": "Refresh to update now"
    },
    "fr": {
      "title": "Installer Transit Tracker",
      "description": "Vous pouvez installer Transit Tracker en tant qu'application de navigateur, pour un accès rapide et facile.",
      "install": "Installer",
      "success": "Succès!",
      "error": "Erreur lors de l'installation",
      "updateAvailable": "Une mise à jour est disponible",
      "updatePending": "La mise à jour est en cours d'installation! Lorsque prête, la page rafraîchira.",
      "installUpdate": "Rafraîchir maintenant"
    }
  }
</i18n>
