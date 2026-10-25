<template>
  <div
    class="tw:flex tw:min-h-screen tw:w-full tw:items-center tw:justify-center tw:p-4 tw:md:p-8 tw:bg-neutral-99 tw:dark:bg-neutral-10"
  >
    <div
      class="tw:flex tw:w-full tw:max-w-lg tw:flex-col tw:items-center tw:rounded-3xl tw:border tw:border-solid tw:border-neutral-variant-80 tw:bg-neutral-96 tw:p-6 tw:text-center tw:dark:border-neutral-variant-24 tw:dark:bg-neutral-12 tw:md:p-10"
    >
      <div
        class="tw:mb-6 tw:flex tw:h-20 tw:w-20 tw:items-center tw:justify-center tw:rounded-2xl tw:text-primary-40 tw:dark:text-primary-80 tw:md:h-24 tw:md:w-24 tw:md:rounded-3xl"
      >
        <TwIcon
          class="tw:h-10! tw:w-10! tw:md:h-12! tw:md:w-12!"
          :path="mdiBusAlert"
        />
      </div>

      <div
        v-if="statusCode"
        class="tw:mb-3 tw:inline-flex tw:items-center tw:rounded-full tw:bg-primary-90/50 tw:px-3 tw:py-1 tw:text-xs tw:font-medium tw:text-primary-30 tw:dark:bg-primary-30/40 tw:dark:text-primary-80"
      >
        {{ $t('errorCode') }}: {{ statusCode }}
      </div>

      <h1
        class="tw:font-heading tw:text-2xl tw:font-bold tw:tracking-tight tw:text-neutral-10 tw:dark:text-neutral-90 tw:md:text-3xl"
      >
        {{ $t('error') }}
      </h1>

      <p
        class="tw:mt-3 tw:max-w-md tw:text-sm tw:leading-relaxed tw:text-neutral-variant-30 tw:dark:text-neutral-variant-80 tw:md:text-base"
      >
        <span v-if="statusCode === 404">{{ $t('notFound') }}</span>
        <span v-else-if="statusCode === 'no-response'">
          {{ $t('noResponse') }}
        </span>
        <span v-else-if="statusCode === 503">
          {{ $t('serverMaintenance') }}
        </span>
        <span v-else-if="statusCode === 429">{{ $t('tooManyRequests') }}</span>
        <span v-else-if="statusCode === 500">{{ $t('serverError') }}</span>
        <span v-else-if="statusCode === 'app-failed'">
          {{ $t('appError') }}
        </span>
        <span v-else-if="error && error.message">{{ error.message }}</span>
        <span v-else>{{ $t('defaultError') }}</span>
      </p>

      <p
        v-if="
          error &&
          error.message &&
          statusCode !== error.message &&
          statusCode !== 404
        "
        class="tw:mt-2 tw:text-xs tw:text-neutral-variant-50 tw:dark:text-neutral-variant-60"
      >
        <code>{{ error.message }}</code>
      </p>

      <div
        class="tw:mt-8 tw:flex tw:w-full tw:flex-col tw:items-center tw:justify-center tw:gap-3 tw:sm:flex-row"
      >
        <TwFilledButton
          with-icon
          class="tw:w-full tw:justify-center tw:sm:w-auto"
          @click="goHome"
        >
          <TwIcon :path="mdiHome" />
          {{ $t('home') }}
        </TwFilledButton>

        <TwFilledButton
          color="tonal"
          tag="a"
          with-icon
          :href="$t('status')"
          target="_blank"
          rel="noopener noreferrer"
          class="tw:w-full tw:justify-center tw:sm:w-auto"
        >
          <TwIcon :path="mdiOpenInNew" />
          {{ $t('statusPage') }}
        </TwFilledButton>
      </div>
    </div>
  </div>
</template>

<script>
import { mdiOpenInNew, mdiBusAlert, mdiHome } from '@mdi/js'

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
    mdiHome,
  }),
  head() {
    return { title: this.$t('error') }
  },
  computed: {
    statusCode() {
      if (
        !this.error.response &&
        this.error.statusCode === 500 &&
        this.error.isAxiosError
      ) {
        return 'no-response'
      }
      if (!this.error.response && this.error.statusCode === 500) {
        return 'app-failed'
      }
      return this.error.statusCode
    },
  },
  methods: {
    goHome() {
      window.location.href = '/'
    },
  },
}
</script>

<i18n>
{
  "en": {
    "error": "Oh no! An error occurred.",
    "errorCode": "Status code",
    "home": "Return to Home",
    "notFound": "This page could not be found. Please return to the home screen.",
    "noResponse": "Transit Tracker did not receive a response from the server. It is possible that the server is down, or that your browser could not reach Internet. Please verify your internet settings.",
    "serverMaintenance": "The server is currently in maintenance mode while we perform some upgrades. If it persists, please visit the status page for more information.",
    "tooManyRequests": "You have made too many requests in a one minute span. Please wait a few moments before continuing.",
    "serverError": "An error was thrown on the Transit Tracker server. We are aware of it and will work soon to resolve it.",
    "appError": "An error occurred on the application. Please contact us to let us know how this happened, so we can fix it.",
    "defaultError": "An unexpected error occurred. Please return to the home screen.",
    "statusPage": "View Status Page",
    "status": "https://status.transittracker.ca"
  },
  "fr": {
    "error": "Oh non! Une erreur s'est produite.",
    "errorCode": "Code d'état",
    "home": "Retour à l'accueil",
    "notFound": "Cette page n'a pas pu être trouvée. Veuillez retourner à l'accueil.",
    "noResponse": "Transit Tracker n'a pas reçu de réponse du serveur. Il est possible que le serveur soit temporairement hors ligne, ou qu'il y a un problème avec votre connexion internet. Merci de vérifier votre connexion internet.",
    "serverMaintenance": "Le serveur est présentement en mode maintenance pendant que nous effectuons quelques mises à jour. Si l'erreur persiste, merci de visiter la page de statut pour plus d'information.",
    "tooManyRequests": "Vous avez fait trop de requêtes dans un court intervalle. Merci de patienter quelques instants avant de continuer.",
    "serverError": "Une erreur s'est produite sur le serveur de Transit Tracker. L'erreur a été enregistrée et elle sera corrigée dès que possible.",
    "appError": "Une erreur s'est produite au niveau de l'application. Merci de nous contacter afin de nous expliquer comment elle s'est produite. Nous pourrons ainsi la régler rapidement.",
    "defaultError": "Une erreur inattendue s'est produite. Veuillez retourner à l'accueil.",
    "statusPage": "Voir l'état des services",
    "status": "https://status.transittracker.ca/fr"
  }
}
</i18n>
