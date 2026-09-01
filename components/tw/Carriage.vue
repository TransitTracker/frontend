<template>
  <li class="tw:flex tw:items-center tw:gap-4">
    <svg
      class="tw:h-auto tw:w-24"
      width="280"
      height="90"
      viewBox="0 0 280 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      :title="`${carriageType.make} ${carriageType.model} ${
        carriage.label ?? carriage.id
      }`"
    >
      <path
        v-if="carriageCategory === 'CabCar' && !isLast"
        id="BodyCabCarFirst"
        d="M8.84289 8.67835C9.50529 3.71029 13.7431 0 18.7552 0H270C275.523 0 280 4.47715 280 10V65C280 70.5228 275.523 75 270 75H11.4218C5.37395 75 0.71024 69.6732 1.50955 63.6784L8.84289 8.67835Z"
        class="tw:fill-current tw:text-neutral-variant-70 tw:dark:text-neutral-variant-40"
      />
      <path
        v-if="carriageCategory === 'CabCar' && isLast"
        id="BodyCabCarLast"
        d="M271.157 8.67835C270.495 3.71029 266.257 0 261.245 0H9.99999C4.47715 0 0 4.47715 0 10V65C0 70.5228 4.47715 75 10 75H268.578C274.626 75 279.29 69.6732 278.49 63.6784L271.157 8.67835Z"
        class="tw:fill-current tw:text-neutral-variant-70 tw:dark:text-neutral-variant-40"
      />
      <rect
        v-if="carriageCategory === 'Coach' || carriageCategory === undefined"
        id="BodyCoach"
        width="280"
        height="75"
        rx="10"
        class="tw:fill-current tw:text-neutral-variant-70 tw:dark:text-neutral-variant-40"
      />
      <path
        v-if="carriageCategory === 'Locomotive' && !isLast"
        id="BodyLocomotiveFirst"
        d="M17.4856 6.28609C19.0042 2.4895 22.6813 0 26.7703 0H270C275.523 0 280 4.47715 280 10V65C280 70.5228 275.523 75 270 75H10C4.47715 75 0 70.5228 0 65V51.9258C0 50.6536 0.242752 49.3931 0.715233 48.2119L17.4856 6.28609Z"
        class="tw:fill-current tw:text-neutral-variant-30 tw:dark:text-neutral-variant-60"
      />
      <path
        v-if="carriageCategory === 'Locomotive' && isLast"
        id="BodyLocomotiveLast"
        d="M262.514 6.28609C260.996 2.4895 257.319 0 253.23 0H10C4.47716 0 0 4.47715 0 10V65C0 70.5228 4.47715 75 10 75H270C275.523 75 280 70.5228 280 65V51.9258C280 50.6536 279.757 49.3931 279.285 48.2119L262.514 6.28609Z"
        class="tw:fill-current tw:text-neutral-variant-30 tw:dark:text-neutral-variant-60"
      />
      <path
        id="Wheels"
        d="M20 70C25.5228 70 30 74.4772 30 80C30 85.5228 25.5228 90 20 90C14.4772 90 10 85.5228 10 80C10 74.4772 14.4772 70 20 70ZM42 70C47.5228 70 52 74.4772 52 80C52 85.5228 47.5228 90 42 90C36.4772 90 32 85.5228 32 80C32 74.4772 36.4772 70 42 70ZM238 70C243.523 70 248 74.4772 248 80C248 85.5228 243.523 90 238 90C232.477 90 228 85.5228 228 80C228 74.4772 232.477 70 238 70ZM260 70C265.523 70 270 74.4772 270 80C270 85.5228 265.523 90 260 90C254.477 90 250 85.5228 250 80C250 74.4772 254.477 70 260 70Z"
        class="tw:fill-current tw:text-neutral-variant-50 tw:dark:text-neutral-variant-60"
      />
      <path
        v-if="carriageCategory === 'Coach' || carriageCategory === 'CabCar'"
        id="WindowsCenter"
        d="M100 20C102.761 20 105 22.2386 105 25V45C105 47.7614 102.761 50 100 50H70C67.2386 50 65 47.7614 65 45V25C65 22.2386 67.2386 20 70 20H100ZM155 20C157.761 20 160 22.2386 160 25V45C160 47.7614 157.761 50 155 50H125C122.239 50 120 47.7614 120 45V25C120 22.2386 122.239 20 125 20H155ZM210 20C212.761 20 215 22.2386 215 25V45C215 47.7614 212.761 50 210 50H180C177.239 50 175 47.7614 175 45V25C175 22.2386 177.239 20 180 20H210Z"
        class="tw:fill-current tw:text-primary-30 tw:dark:text-primary-80"
      />
      <path
        v-if="carriageCategory === 'Locomotive' && !isLast"
        id="WindowLocomotiveFirst"
        d="M20.245 23.1489C21.0028 21.2475 22.8429 20 24.8897 20H45C47.7614 20 50 22.2386 50 25V45C50 47.7614 47.7614 50 45 50H16.9371C13.5243 50 11.1145 46.6565 12.1937 43.4189L12.3333 43L20.245 23.1489Z"
        class="tw:fill-current tw:text-primary-70 tw:dark:text-primary-80"
      />
      <path
        v-if="carriageCategory === 'Locomotive' && isLast"
        id="WindowLocomotiveLast"
        d="M259.755 23.1489C258.997 21.2475 257.157 20 255.11 20H235C232.239 20 230 22.2386 230 25V45C230 47.7614 232.239 50 235 50H263.063C266.476 50 268.886 46.6565 267.806 43.4189L267.667 43L259.755 23.1489Z"
        class="tw:fill-current tw:text-primary-70 tw:dark:text-primary-80"
      />
      <rect
        v-if="
          carriageCategory === 'Coach' ||
          (carriageCategory === 'CabCar' && isLast)
        "
        id="WindowLeft"
        x="10"
        y="20"
        width="40"
        height="30"
        rx="5"
        class="tw:fill-current tw:text-primary-30 tw:dark:text-primary-80"
      />
      <rect
        v-if="
          carriageCategory === 'Coach' ||
          (carriageCategory === 'CabCar' && !isLast)
        "
        id="WindowRight"
        x="230"
        y="20"
        width="40"
        height="30"
        rx="5"
        class="tw:fill-current tw:text-primary-30 tw:dark:text-primary-80"
      />
      <path
        v-if="carriageCategory === 'CabCar' && !isLast"
        id="WindowCabCarFirst"
        d="M50 25C50 22.2386 47.7614 20 45 20H18.3776C15.8716 20 13.7526 21.8552 13.4214 24.3392L10.7548 44.3392C10.3551 47.3366 12.687 50 15.7109 50H45C47.7614 50 50 47.7614 50 45V25Z"
        class="tw:fill-current tw:text-primary-30 tw:dark:text-primary-80"
      />
      <path
        v-if="carriageCategory === 'CabCar' && isLast"
        id="WindowCabCarLast"
        d="M230 25C230 22.2386 232.239 20 235 20H261.622C264.128 20 266.247 21.8552 266.579 24.3392L269.245 44.3392C269.645 47.3366 267.313 50 264.289 50H235C232.239 50 230 47.7614 230 45V25Z"
        class="tw:fill-current tw:text-primary-30 tw:dark:text-primary-80"
      />
    </svg>
    <p class="tw:text-sm tw:leading-tight tw:xl:text-base tw:xl:leading-tight">
      <b>{{ carriage.label ?? carriage.id }}</b>
      <span v-if="carriage.label && carriage.id !== carriage.label">
        ({{ carriage.id }})
      </span>
      <br />
      <small
        class="tw:text-2xs tw:font-medium tw:leading-4 tw:text-neutral-variant-30 tw:xl:text-xs tw:dark:text-neutral-variant-80"
      >
        {{ carriageType.make }} {{ carriageType.model }}
      </small>
    </p>
  </li>
</template>

<script>
import { carriageCategory } from '~/utils/enums'

export default {
  props: {
    isFirst: {
      type: Boolean,
      required: true,
    },
    isLast: {
      type: Boolean,
      required: true,
    },
    carriage: {
      type: Object,
      required: true,
    },
  },
  computed: {
    carriageCategory() {
      return carriageCategory[this.carriageType?.category]?.key
    },
    carriageType() {
      return this.$store.state.carriageTypes.data[this.carriage.type] ?? {}
    },
  },
}
</script>
