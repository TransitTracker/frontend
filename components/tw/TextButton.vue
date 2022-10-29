<template>
  <button
    class="overflow-hiddenfull group relative h-10 px-6 text-sm font-medium leading-5 tw-text-primary-40 dark:tw-text-primary-80"
  >
    <div
      class="absolute inset-0 h-full w-full rounded-full bg-opacity-0 transition-colors duration-200 group-hover:bg-opacity-[0.08] group-focus:bg-opacity-[0.12] tw-bg-primary-40 dark:tw-bg-primary-80"
    ></div>
    <slot />
  </button>
</template>
