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
          :path="mdiServerNetworkOff"
        />
      </div>

      <div
        v-if="query && query.code"
        class="tw:mb-3 tw:inline-flex tw:items-center tw:rounded-full tw:bg-primary-90/50 tw:px-3 tw:py-1 tw:text-xs tw:font-medium tw:text-primary-30 tw:dark:bg-primary-30/40 tw:dark:text-primary-80"
      >
        {{ $t('errorCode') }}: {{ query.code }}
      </div>

      <h1
        class="tw:font-heading tw:text-2xl tw:font-bold tw:tracking-tight tw:text-neutral-10 tw:dark:text-neutral-90 tw:md:text-3xl"
      >
        {{ $t('title') }}
      </h1>

      <p
        class="tw:mt-3 tw:max-w-md tw:text-sm tw:leading-relaxed tw:text-neutral-variant-30 tw:dark:text-neutral-variant-80 tw:md:text-base"
      >
        {{ $t('description') }}
      </p>

      <div
        class="tw:mt-8 tw:flex tw:w-full tw:flex-col tw:items-center tw:justify-center tw:gap-3 tw:sm:flex-row"
      >
        <TwFilledButton
          with-icon
          class="tw:w-full tw:justify-center tw:sm:w-auto"
          @click="retry"
        >
          <TwIcon :path="mdiRefresh" />
          {{ $t('retry') }}
        </TwFilledButton>

        <TwFilledButton
          color="tonal"
          tag="a"
          with-icon
          href="https://status.transittracker.ca"
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
import { mdiServerNetworkOff, mdiRefresh, mdiOpenInNew } from '@mdi/js'

export default {
  asyncData: ({ query }) => {
    return { query: query || {} }
  },
  data: () => ({
    mdiServerNetworkOff,
    mdiRefresh,
    mdiOpenInNew,
  }),
  head() {
    return {
      title: this.$t('title'),
    }
  },
  methods: {
    retry() {
      window.location.href = '/'
    },
  },
}
</script>

<i18n>
{
  "en": {
    "title": "System Maintenance",
    "description": "Transit Tracker is temporarily unavailable due to an update. Service should be restored shortly.",
    "errorCode": "Status code",
    "retry": "Try again",
    "statusPage": "View Status Page"
  },
  "fr": {
    "title": "Maintenance du système",
    "description": "Transit Tracker est temporairement indisponible en raison d'une mise à jour. Le service devrait être rétabli d'ici quelques instants.",
    "errorCode": "Code d'état",
    "retry": "Réessayer",
    "statusPage": "Voir l'état des services"
  }
}
</i18n>
