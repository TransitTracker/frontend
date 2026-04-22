<template>
  <div>
    <div
      class="tw-bg-error-40 tw-p-4 tw-text-white md:tw-py-8 dark:tw-bg-error-80 dark:tw-text-error-20"
    >
      <div class="tw-container tw-mx-auto tw-w-full tw-space-y-4">
        <TwIcon class="!tw-h-20 !tw-w-20" :path="mdiServerNetworkOff" />
        <h1>{{ $t('error') }} {{ query.code }}</h1>
      </div>
    </div>
    <div class="tw-container tw-mx-auto tw-mt-4 tw-px-4">
      <b>{{ $t('title') }}</b>
      <p>{{ $t('description') }}</p>
      <a href="https://status.transittracker.ca" target="_blank">
        {{ $t('statusPage') }} : status.transittracker.ca
      </a>
    </div>
  </div>
</template>

<script>
import { mdiServerNetworkOff } from '@mdi/js'
export default {
  asyncData: ({ query }) => {
    return { mdiServerNetworkOff, query }
  },
  head: {
    title: 'Maintenance',
  },
}
</script>
<i18n>
{
  "en": {
    "error": "Error",
    "title": "Maintenance",
    "description": "The server is currently in maintenance mode. Please try again in a few minutes.",
    "statusPage": "Open the Status page"
  },
  "fr": {
    "error": "Erreur",
    "title": "Maintenance",
    "description": "Le serveur est présentement en mode de maintenance. Veuillez réessayer dans quelques minutes.",
    "statusPage": "Voir l'état de l'application"
  }
}
</i18n>
