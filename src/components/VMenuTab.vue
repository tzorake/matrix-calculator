<template>
  <VContainer class="tab" :orientation="Orientation.VERTICAL">
    <slot></slot>
  </VContainer>
</template>

<script setup>
import { Orientation } from "./utils/Orientation";
import VContainer from "./VContainer.vue";
</script>

<style scoped>

@media (max-width: 575.98px) {
  .hidden {
    display: none;
  }
}

@media (min-width: 576px) {
  .hidden {

  }
}

.tab {
  gap: 0.625rem;
  color: #dee2e6;
  flex-grow: 1;
}
</style>
