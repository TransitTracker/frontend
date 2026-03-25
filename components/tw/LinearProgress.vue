<template>
  <progress
    class="tt-progress tw-h-1 tw-w-full tw-appearance-none tw-border-none"
  />
</template>

<style>
.tt-progress::-webkit-progress-bar {
  background-color: transparent;
}
.tt-progress::-webkit-progress-value {
  background-color: currentColor;
  transition: all 0.2s;
}
.tt-progress::-moz-progress-bar {
  background-color: currentColor;
  transition: all 0.2s;
}
.tt-progress::-ms-fill {
  border: none;
  background-color: currentColor;
  transition: all 0.2s;
}
.tt-progress:indeterminate {
  background-size: 200% 100%;
  background-image: linear-gradient(
    to right,
    transparent 50%,
    currentColor 50%,
    currentColor 60%,
    transparent 60%,
    transparent 71.5%,
    currentColor 71.5%,
    currentColor 84%,
    transparent 84%
  );
  animation: tt-progress 2s infinite linear;
}
.tt-progress:indeterminate::-moz-progress-bar {
  background-color: transparent;
}
.tt-progress:indeterminate::-ms-fill {
  animation-name: none;
}

@keyframes tt-progress {
  0% {
    background-size: 200% 100%;
    background-position: left -31.25% top 0%;
  }
  50% {
    background-size: 800% 100%;
    background-position: left -49% top 0%;
  }
  100% {
    background-size: 400% 100%;
    background-position: left -102% top 0%;
  }
}
</style>
