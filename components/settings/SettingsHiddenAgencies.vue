<template>
  <div>
    <p class="tw-mb-2 tw-text-sm">{{ $t('completeDesc') }}</p>
    <TwChip
      :icon="mdiEyeCheck"
      v-if="hiddenAgencies.length"
      @click.native="makeAllVisible"
      class="tw-mb-2"
    >
      {{ $t('makeAllAgenciesVisible') }}
    </TwChip>
    <TwDetails
      class="tw-mt-2"
      v-for="region in regions"
      :key="region.slug"
      :open="region.slug === currentRegion"
    >
      <template #summary>
        <div>
          <p
            class="tw-relative !tw-mb-0 tw-inline tw-text-neutral-10 dark:tw-text-neutral-90"
          >
            {{ region.name }}
            <span
              v-if="
                region.agencies.filter(({ slug }) =>
                  hiddenAgencies.includes(slug)
                ).length
              "
              class="tw-absolute tw-right-0 tw-top-0 tw-h-1.5 tw-w-1.5 tw-rounded-full tw-bg-error-40 dark:tw-bg-error-80"
            />
          </p>
          <br />
          <small
            class="tw-text-sm tw-text-neutralVariant-30 dark:tw-text-neutralVariant-80"
          >
            {{
              $tc(
                'hiddenAgenciesCount',
                region.agencies.filter(({ slug }) =>
                  hiddenAgencies.includes(slug)
                ).length,
                {
                  total: region.agencies.length,
                }
              )
            }}
          </small>
        </div>
      </template>
      <ul
        class="tw-list-none tw-py-2 !tw-pl-0 *:tw-flex *:tw-items-center *:tw-gap-4 *:tw-py-2"
      >
        <li v-for="agency in region.agencies" :key="agency.slug">
          <div
            :style="{ backgroundColor: agency.color, color: agency.textColor }"
            class="tw-flex tw-h-6 tw-w-6 tw-flex-shrink-0 tw-items-center tw-justify-center tw-rounded-full"
          >
            <TwIcon
              :path="icons[agency.defaultVehicleType]"
              class="!tw-h-4 !tw-w-4"
            />
          </div>
          <p class="!tw-mb-0 tw-flex-grow">{{ agency.name }}</p>
          <TwSwitch
            :id="agency.slug"
            :value="!hiddenAgencies.includes(agency.slug)"
            @input="toggleAgency(agency)"
          />
        </li>
      </ul>
    </TwDetails>
  </div>
</template>

<script>
import { mdiBus, mdiTram, mdiTrain, mdiEyeCheck } from '@mdi/js'

export default {
  data: () => ({
    mdiEyeCheck,
    // TODO: Update backend to enum
    icons: {
      tram: mdiTram,
      train: mdiTrain,
      bus: mdiBus,
    },
  }),
  computed: {
    currentRegion() {
      return this.$store.state.settings.currentRegion
    },
    hiddenAgencies() {
      return this.$store.state.settings.hiddenAgencies
    },
    regions() {
      return this.$store.state.regions.data
    },
  },
  methods: {
    toggleAgency(agency) {
      this.$store.dispatch('settings/toggleAgency', agency)
    },
    makeAllVisible() {
      this.hiddenAgencies.forEach((agencySlug) => {
        const agency = this.$store.state.agencies.data[agencySlug]

        // Case when agency doesn't exist anymore
        if (!agency) {
          return
        }

        this.$store.dispatch('settings/toggleAgency', agency)
      })
    },
  },
}
</script>

<i18n>
  {
    "en": {
      "completeDesc": "By default, all agencies are visible. You can hide some of them here to prevent them from appearing in the interface. There can be a small delay between the activation of an agency and it's loading into the app.",
      "makeAllAgenciesVisible": "Make all agencies visible",
      "hiddenAgenciesCount": "Toutes les agences sont visibles ({total}). | Une agence masquée sur {total}. | {count} agences masquées sur {total}."
    },
    "fr": {
      "completeDesc": "Par défaut, toutes les agences sont visibles. Vous pouvez en masquer certaines ici pour les empêcher d'apparaître dans l'interface. Il peut y avoir un léger délai entre l'activation d'une agence et son chargement dans l'application.",
      "makeAllAgenciesVisible": "Rendre toutes les agences visibles",
      "hiddenAgenciesCount": "Toutes les agences sont visibles ({total}). | Une agence masquée sur {total}. | {count} agences masquées sur {total}."
    }
  }
</i18n>
