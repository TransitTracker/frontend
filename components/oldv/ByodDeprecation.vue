<template>
  <v-alert type="warning" class="dep-alert" rounded="lg">
    <b>{{ $t('title') }}</b>
    <p class="mb-0">
      {{ $t('text') }}
      <br />
      <TwFilledButton
        with-icon
        tag="a"
        href="https://public-transport.github.io/gtfs-rt-inspector/"
        class="mt-4 tw-inline-flex"
        target="_blank"
      >
        <TwIcon :path="mdiOpenInNew" />
        gtfs-rt-inspector
      </TwFilledButton>
    </p>
  </v-alert>
</template>

<script>
import { mdiOpenInNew } from '@mdi/js'

export default {
  data: () => ({
    mdiOpenInNew,
  }),
}
</script>

<style>
.dep-alert {
  color: black !important;
  svg {
    fill: black;
  }
}

[class~='theme--dark'] .dep-alert {
  color: white !important;
  svg {
    fill: white !important;
  }
}
</style>

<i18n>
{
  "en": {
    "title": "Deprecation of the BYOD functionality",
    "text": "The Bring Your Own Data feature will be retired by november. The integration of external data had become too complex. With less than a handful users, it was not possible to keep the feature up to date and in good state. I strongly suggest you use the gtfs-rt-inspector tool, which allows you to view realtime GTFS streams. Otherwise, you can always request to add an agency to Transit Tracker."
  },
  "fr": {
    "title": "Retrait de la fonctionnalité APVD",
    "text": "La fonctionnalité Apportez vos propres données sera supprimée d’ici novembre. L'intégration de données externes était devenue trop complexe. Avec moins d’une poignée d’utilisateurs, il n’était pas possible de maintenir la fonctionnalité à jour et en bon état. Je vous suggère fortement d'utiliser l'outil gtfs-rt-inspector, qui vous permet de visualiser les flux GTFS en temps réel. Sinon, vous pouvez toujours demander l'ajout d'une agence à Transit Tracker."
  }
}
</i18n>
