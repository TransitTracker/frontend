<template>
  <div class="tw-container tw-mx-auto tw-mt-12">
    <div
      class="tw-flex tw-gap-4 tw-rounded-xl tw-bg-error-40 tw-p-4 tw-text-white dark:tw-bg-error-80 dark:tw-text-error-20"
    >
      <TwIcon :path="mdiAlert" class="tw-shrink-0" />
      <div>
        <b>{{ $t('title') }}</b>
        <p>
          {{ $t('text') }}
        </p>
        <TwFilledButton
          with-icon
          tag="a"
          href="https://public-transport.github.io/gtfs-rt-inspector/"
          class="tw-inline-flex tw-no-underline"
          target="_blank"
          color="errorContainer"
        >
          <TwIcon :path="mdiOpenInNew" />
          gtfs-rt-inspector
        </TwFilledButton>
      </div>
    </div>
  </div>
</template>

<script>
import { mdiOpenInNew, mdiAlert } from '@mdi/js'

export default {
  data: () => ({
    mdiOpenInNew,
    mdiAlert,
  }),
}
</script>

<i18n>
{
  "en": {
    "title": "Deprecation of the BYOD functionality",
    "text": "The Bring Your Own Data feature is now retired. The integration of external data had become too complex. With less than a handful users, it was not possible to keep the feature up to date and in good state. I strongly suggest you use the gtfs-rt-inspector tool, which allows you to view realtime GTFS streams. Otherwise, you can always request to add an agency to Transit Tracker."
  },
  "fr": {
    "title": "Retrait de la fonctionnalité APVD",
    "text": "La fonctionnalité Apportez vos propres données a été retiré. L'intégration de données externes était devenue trop complexe. Avec moins d’une poignée d’utilisateurs, il n’était pas possible de maintenir la fonctionnalité à jour et en bon état. Je vous suggère fortement d'utiliser l'outil gtfs-rt-inspector, qui vous permet de visualiser les flux GTFS en temps réel. Sinon, vous pouvez toujours demander l'ajout d'une agence à Transit Tracker."
  }
}
</i18n>
