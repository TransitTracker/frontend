<template>
  <div
    v-if="content"
    class="tw-flex tw-h-14 tw-items-center"
    :class="[property.mobileOnly && 'md:tw-hidden']"
  >
    <TwIcon
      :path="property.icon"
      class="tw-text-primary-40 dark:tw-text-primary-80"
    />
    <div class="tw-ml-3">
      <dt
        class="tw-text-xs tw-font-medium tw-leading-4 tw-text-neutralVariant-30 dark:tw-text-neutralVariant-80"
      >
        {{ $t(`properties.${property.field}`) }}
      </dt>
      <dd class="tw-mb-0 tw-leading-6">
        {{ property.format ? format(content) : content }}
      </dd>
    </div>
    <div class="flex-grow-1"></div>
    <TwStandardIconButton
      v-if="property.help"
      class="tw-h-10 tw-w-10"
      @click="openHelp"
    >
      <TwIcon :path="mdiHelp" class="tw-h-6 tw-w-6" />
    </TwStandardIconButton>
    <TwBasicDialog v-if="property.help" v-model="helpOpen">
      <template #header>
        {{ $t('about') }}
        {{ $t(`properties.${property.field}`) }}
      </template>
      {{ $t(`help.${property.field}`) }}
    </TwBasicDialog>
  </div>
</template>

<script>
import { mdiHelp } from '@mdi/js'

export default {
  props: {
    property: {
      required: true,
      type: Object,
    },
    vehicle: {
      required: true,
      type: Object,
    },
  },
  data: () => ({
    mdiHelp,
    helpOpen: false,
    dateStyle: 'long',
    timeStyle: 'short',
  }),
  computed: {
    content() {
      const field = this.property.field

      if (field.includes('.')) {
        const nested = field.split('.')
        return this.vehicle[nested[0]][nested[1]]
      }

      if (this.property.condition === 'refDifferent') {
        return this.vehicle.ref === this.vehicle.label
          ? null
          : this.vehicle[field]
      }

      return this.vehicle[field]
    },
  },
  methods: {
    openHelp() {
      this.helpOpen = true
    },
    format() {
      if (this.property.format === 'date') {
        return Intl.DateTimeFormat(this.$i18n.locale, {
          dateStyle: this.dateStyle,
          timeStyle: this.timeStyle,
        }).format(new Date(this.content))
      }

      return this.content
    },
  },
}
</script>

<i18n>
{
   "en":{
      "about":"About ",
      "help":{
         "ref":"This is the internal identifier assigned by the agency for this vehicle. Under normal circumstances, the label represents the number displayed to the public on the vehicle while the ID is not displayed.",
         "tripId":"This is a unique identifier assigned for this trip. A single trip can be seen multiple times throughout the week, for example from Monday to Friday.",
         "scheduleRelationship":{
            "label":"Typically, a trip is planned in advance. But sometimes, when ridership requires it or for other reasons, agencies have to add a trip in between. A vehicle may also have no timetable (a metro system for example) or be cancelled for various reasons."
         },
         "currentStatus":{
            "label":"This is the status of the vehicle in relation to the stops. When a vehicle heads for a stop, it is “In transit to”. When approaching, it becomes “incoming”. Then at the stop, it is “Stopped at”."
         },
         "currentStopSequence":"This field represents the position of the vehicle in relation to the number of stops served by the trip. As the journey progresses and the vehicle approaches its final stop, this number increases."
      }
   },
   "fr":{
      "about":"À propos de ",
      "help":{
         "ref":"Ceci est l'identifiant interne assigné par l'agence pour ce véhicule. Dans des circonstances normales, ce champ n'est pas visible pour les usagers de ce véhicule.",
         "tripId":"Il s'agit d'un identifiant unique attribué à ce voyage. Un même trajet peut être vu plusieurs fois au cours d'une semaine, par exemple du lundi au vendredi.",
         "scheduleRelationship":{
            "label":"En règle générale, un voyage est planifié. Mais parfois, lorsque l'achalandage l'exige ou d'autres raisons, il faut ajouter un voyage entre deux. Un véhicule peut aussi ne pas avoir d'horaire (un système de métro par exemple) ou bien être annulé pour diverses raisons."
         },
         "currentStatus":{
            "label":"Il s'agit du statut du véhicule en relation avec les arrêts. Lorsqu'un véhicule se dirige vers un arrêt, il affiche le statut « En déplacement ». En s'approchant, il devient « Arrive au prochain arrêt ». Puis à l'arrêt, il est « À l'arrêt »."
         },
         "currentStopSequence":"Ce champ représente la position du véhicule en relation au nombre d'arrêts desservis par le voyage. Plus que le voyage avance et que le véhicule s'approche de son arrêt final, ce chiffre augmente."
      }
   }
}
  </i18n>
