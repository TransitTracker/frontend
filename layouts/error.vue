<template>
  <div class="tw-flex tw-min-h-screen tw-w-full tw-flex-col md:tw-flex-row">
    <div
      class="tw-flex tw-min-h-[30%] tw-grow tw-items-center tw-justify-center tw-bg-gradient-to-br tw-from-error-80 tw-to-error-60 dark:tw-from-error-10 dark:tw-to-error-30 md:tw-min-h-full md:tw-min-w-[30%]"
    >
      <TwIcon
        class="!tw-h-10 !tw-w-10 tw-py-8 tw-text-white md:!tw-h-28 md:!tw-w-28"
        :path="mdiBusAlert"
      />
    </div>
    <div
      class="tw-flex tw-flex-col tw-px-8 tw-py-4 md:tw-min-h-full md:tw-justify-center"
    >
      <h1 class="!tw-pb-0 tw-font-heading">{{ $t('error') }}</h1>
      <p class="tw-mt-2 !tw-pb-0">
        <span v-if="statusCode === 404">{{ $t('notFound') }}</span>
        <span v-if="statusCode === 'no-response'">{{ $t('noResponse') }}</span>
        <span v-if="statusCode === 503">{{ $t('serverMaintenance') }}</span>
        <span v-if="statusCode === 429">{{ $t('tooManyRequests') }}</span>
        <span v-if="statusCode === 500">{{ $t('serverError') }}</span>
        <span v-if="statusCode === 'app-failed'">{{ $t('appError') }}</span>
        <span v-if="!error.response">
          {{ $t('') }}
        </span>
        Code de l'erreur :
        <code>
          {{ error.response && error.statusCode }} {{ error.message }}
        </code>
      </p>
      <TwTextButton
        :href="$t('ohDear')"
        tag="a"
        with-icon
        class="tw-mt-2 tw-inline-flex"
      >
        <TwIcon :path="mdiOpenInNew" />
        {{ $t('statusPage') }}
      </TwTextButton>
    </div>
  </div>
</template>

<script>
import { mdiOpenInNew, mdiBusAlert } from '@mdi/js'
export default {
  props: {
    error: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    mdiOpenInNew,
    mdiBusAlert,
  }),
  head() {
    return { title: this.$t('error.title') }
  },
  computed: {
    statusCode() {
      console.log('error', this.error)
      if (
        !this.error.response &&
        this.error.statusCode === 500 &&
        this.error.isAxiosError
      )
        return 'no-response'
      if (!this.error.response && this.error.statusCode === 500)
        return 'app-failed'
      return this.error.statusCode
    },
  },
}
</script>

<i18n>
  {
    "en": {
      "error": "Oh no! An error occured.",
      "notFound": "This page could not be found. Please return to the home screen.",
      "noResponse": "Transit Tracker did not receive a response from the server. It is possible that the server is down, or that your browser could not reach Internet. Please verify your internet settings.",
      "serverMaintenance": "The server is currently in maintenance mode while we perform some upgrades. Normally, the maintenance last less then one minute. If it persists, please visit the status page for more information.",
      "tooManyRequests": "You have made too many requests in a one minute span. Please wait {sec} seconds before continuing.",
      "serverError": "An error was thrown on the Transit Tracker server. We are aware of it and will work soon to resolve it.",
      "appError": "An error occured on the application. Please contact us to let us know how this happen, so we can fix it.",
      "contactUs": "Contact us",
      "statusPage": "View the status page of Transit Tracker",
      "ohDear": "https://status.transittracker.ca"
    },
    "fr": {
      "error": "Oh non! Une erreur s'est produite.",
      "notFound": "Cette page n'a pas pu être trouvée. Veuillez retournez à l'accueil.",
      "noResponse": "Transit Tracker n'a pas reçu de réponse du serveur. Il est possible que le serveur soit temporairement hors ligne, ou qu'il y a un problème avec votre connexion internet. Merci de vérifier votre connexion internet.",
      "serverMaintenance": "Le serveur est présentement en mode maintenance pendant que nous effectons quelques mises à jours. Rassurez-vous, ces mises à jours durent moins d'une minute normalement. Si l'erreur persiste, merci de visiter la page de statut pour plus d'information.",
      "tooManyRequests": "Vous avez fait trop d'erreurs dans l'espace d'une minute. Merci d'attendre {sec} avant de continuer.",
      "serverError": "Une erreur s'est produite sur le serveur de Transit Tracker. L'erreur a été enregistré et elle sera corrigée dès que possible.",
      "appError": "Une erreur s'est produite au niveau de l'application. Merci de nous contacter afin de nous expliquer comment elle s'est produite. Nous pourrons ainsi la régler rapidement.",
      "contact": "Nous contacter",
      "statusPage": "Voir la page sur le statut de Transit Tracker",
      "ohDear": "https://status.transittracker.ca?locale=fr"
    }
  }
</i18n>
