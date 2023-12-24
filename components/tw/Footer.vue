<template>
  <footer
    class="tw-relative tw-w-full tw-overflow-hidden tw-bg-primary-90 tw-text-primary-10 dark:tw-bg-primary-30 dark:tw-text-primary-90"
  >
    <div class="tw-container tw-mx-auto tw-p-4">
      <div
        class="tw-flex tw-items-center tw-gap-2 tw-font-heading tw-font-bold"
      >
        <svg
          viewBox="0 0 295.01 403.72"
          xmlns="http://www.w3.org/2000/svg"
          class="tw-h-6 tw-fill-current tw-text-primary-40 dark:tw-text-white"
        >
          <path
            d="m147.51 1.875c-80.34 0-145.63 65.291-145.63 145.63 0 84.709 87.863 198.79 126.94 245.63 9.708 11.651 27.428 11.651 37.137 0 39.32-46.845 127.18-160.92 127.18-245.63 0-80.34-65.291-145.63-145.63-145.63zm0 70.631c34.895 0 63.158 3.9481 63.158 31.58v78.945c0 6.948-3.0785 13.185-7.8945 17.527v10.105c0 6.553-5.3678 11.842-11.842 11.842-6.553 0-11.842-5.3678-11.842-11.842v-3.9473h-63.158v3.9473a11.826 11.826 0 0 1-11.842 11.842 11.826 11.826 0 0 1-11.844-11.842v-10.105c-4.816-4.342-7.8945-10.579-7.8945-17.527v-78.945c0-27.632 28.263-31.58 63.158-31.58zm-47.367 31.58v39.473h94.734v-39.473h-94.734zm11.842 63.156a11.826 11.826 0 0 0-11.842 11.844 11.826 11.826 0 0 0 11.842 11.842c6.552 0 11.842-5.2888 11.842-11.842a11.826 11.826 0 0 0-11.842-11.844zm71.051 0c-6.552 0-11.842 5.2908-11.842 11.844a11.826 11.826 0 0 0 11.842 11.842 11.826 11.826 0 0 0 11.842-11.842 11.826 11.826 0 0 0-11.842-11.844z"
          />
        </svg>
        <p class="!tw-mb-0">Transit&nbsp;Tracker</p>
      </div>

      <small class="tw-pl-7">
        {{ $t('footer.brandSlogan') }}
      </small>
      <ul
        class="tw-mt-4 tw-flex tw-list-none tw-flex-col tw-gap-x-2 tw-gap-y-4 !tw-pl-0 md:tw-flex-row"
      >
        <li class="md:after:tw-pl-2 md:after:tw-content-['\2022']">
          <a
            target="_blank"
            href="https://vin.transittracker.ca"
            class="!tw-text-primary-10 !tw-no-underline hover:!tw-underline dark:!tw-text-primary-90"
            >{{ $t('footer.exoVin') }}</a
          >
        </li>
        <li class="md:after:tw-pl-2 md:after:tw-content-['\2022']">
          <a
            target="_blank"
            href="https://vin.transittracker.ca/docs"
            class="!tw-text-primary-10 !tw-no-underline hover:!tw-underline dark:!tw-text-primary-90"
            >{{ $t('footer.forDevelopers') }}</a
          >
        </li>
        <li>
          <a
            target="_blank"
            href="https://github.com/TransitTracker"
            class="!tw-text-primary-10 !tw-no-underline hover:!tw-underline dark:!tw-text-primary-90"
            >{{ $t('footer.github') }}</a
          >
        </li>
        <span class="tw-grow"></span>
        <li class="tw-text-xs md:tw-text-base">Version {{ version }}</li>
        <span class="tw-grow"></span>
        <li>
          <a
            target="_blank"
            href="https://felixinx.me"
            class="!tw-text-primary-10 !tw-no-underline hover:!tw-underline dark:!tw-text-primary-90 md:tw-mr-24"
            >{{ $t('footer.by') }} @felixinx</a
          >
        </li>
      </ul>
    </div>
    <svg
      viewBox="0 0 295.01 403.72"
      xmlns="http://www.w3.org/2000/svg"
      class="tw-absolute -tw-bottom-12 -tw-right-5 tw-h-40 tw-fill-current tw-text-primary-87 dark:tw-text-primary-24"
    >
      <path
        d="m147.51 1.875c-80.34 0-145.63 65.291-145.63 145.63 0 84.709 87.863 198.79 126.94 245.63 9.708 11.651 27.428 11.651 37.137 0 39.32-46.845 127.18-160.92 127.18-245.63 0-80.34-65.291-145.63-145.63-145.63zm0 70.631c34.895 0 63.158 3.9481 63.158 31.58v78.945c0 6.948-3.0785 13.185-7.8945 17.527v10.105c0 6.553-5.3678 11.842-11.842 11.842-6.553 0-11.842-5.3678-11.842-11.842v-3.9473h-63.158v3.9473a11.826 11.826 0 0 1-11.842 11.842 11.826 11.826 0 0 1-11.844-11.842v-10.105c-4.816-4.342-7.8945-10.579-7.8945-17.527v-78.945c0-27.632 28.263-31.58 63.158-31.58zm-47.367 31.58v39.473h94.734v-39.473h-94.734zm11.842 63.156a11.826 11.826 0 0 0-11.842 11.844 11.826 11.826 0 0 0 11.842 11.842c6.552 0 11.842-5.2888 11.842-11.842a11.826 11.826 0 0 0-11.842-11.844zm71.051 0c-6.552 0-11.842 5.2908-11.842 11.844a11.826 11.826 0 0 0 11.842 11.842 11.826 11.826 0 0 0 11.842-11.842 11.826 11.826 0 0 0-11.842-11.844z"
      />
    </svg>
  </footer>
</template>
<script setup>
const version = process.env.version
</script>
