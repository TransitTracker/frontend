<template>
  <div class="tw:contents">
    <!-- Desktop sheet: floating on the left side of the screen -->
    <aside
      class="tw:absolute tw:left-2 tw:top-2 tw:z-10 tw:hidden tw:max-h-[calc(100vh-41px-32px)] tw:w-96 tw:space-y-2 tw:overflow-y-auto tw:rounded-xl tw:bg-neutral-99 tw:p-4 tw:pb-4 tw:text-neutral-10 tw:shadow-none tw:dark:bg-neutral-10 tw:dark:text-neutral-90 tw:md:block tw:xl:left-4 tw:xl:top-4 tw:xl:space-y-4"
    >
      <VehicleSheetHeader :vehicle="vehicle" />
      <VehicleSheetContent :vehicle="vehicle" />
    </aside>

    <!-- Mobile sheet: bottom sheet -->
    <bottom-sheet
      tabindex="0"
      class="vehicle-sheet-bottom tw:text-neutral-10 tw:dark:text-neutral-90 tw:md:hidden"
    >
      <div slot="snap" style="--snap: 75%"></div>
      <div slot="snap" style="--snap: 40%"></div>
      <div
        slot="snap"
        style="--snap: calc(var(--tw-spacing) * 22)"
        class="initial"
      ></div>

      <div slot="header" class="tw:relative tw:z-10 tw:px-4 tw:pb-2">
        <VehicleSheetHeader :vehicle="vehicle" />
      </div>

      <div class="vehicle-sheet-content tw:space-y-2 tw:px-4 tw:pb-6">
        <VehicleSheetContent :vehicle="vehicle" />
      </div>
    </bottom-sheet>
  </div>
</template>

<script>
export default {
  props: {
    vehicle: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    if (
      typeof customElements !== 'undefined' &&
      !customElements.get('bottom-sheet')
    ) {
      import('pure-web-bottom-sheet').then(({ registerSheetElements }) => {
        registerSheetElements()
      })
    }
  },
}
</script>

<style scoped>
bottom-sheet.vehicle-sheet-bottom {
  --sheet-background: var(--tw-color-neutral-96);
  --sheet-border-radius: 1.75rem;
  --sheet-max-height: calc(100dvh - calc(var(--tw-spacing) * 32));
  bottom: calc(var(--tw-spacing) * 16);
  z-index: 20;
}

:where([data-theme='dark'], [data-theme='dark'] *)
  bottom-sheet.vehicle-sheet-bottom {
  --sheet-background: var(--tw-color-neutral-10);
}

bottom-sheet.vehicle-sheet-bottom::part(sheet) {
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
}

bottom-sheet.vehicle-sheet-bottom::part(header) {
  z-index: 10;
}

bottom-sheet.vehicle-sheet-bottom::part(handle) {
  background-color: var(--tw-color-neutral-variant-30);
  width: calc(var(--tw-spacing) * 8);
  height: calc(var(--tw-spacing) * 1);
  border-radius: 9999px;
  margin: 0.375rem auto;
}

:where([data-theme='dark'], [data-theme='dark'] *)
  bottom-sheet.vehicle-sheet-bottom::part(handle) {
  background-color: rgb(198 198 201 / 0.4);
}

bottom-sheet.vehicle-sheet-bottom::part(content) {
  padding: 0;
}
</style>
