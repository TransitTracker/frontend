<template>
  <div
    class="tw-h-14 tw-flex tw-items-center"
    :class="[property.mobileOnly && 'md:tw-hidden']"
  >
    <TwIcon :path="property.icon" />
    <div class="tw-ml-3">
      <dt class="tw-leading-4 tw-text-xs tw-font-medium">
        {{ $t(`mapBottomSheet.properties.${property.label || property.name}`) }}
      </dt>
      <dd class="tw-leading-6 tw-mb-0">
        {{
          property.content
            ? vehicle[property.content]
            : property.parent
            ? vehicle[property.parent][property.name]
            : vehicle[property.name]
        }}
      </dd>
    </div>
    <div class="flex-grow-1"></div>
    <TwOutlinedIconButton v-if="property.help" :icon-path="mdiHelp" />
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
  }),
}
</script>
