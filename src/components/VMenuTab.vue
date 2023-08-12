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
.tab {
  padding: 10px;
  gap: 10px;
  color: #dee2e6;
}

.hidden {
  display: none;
}
</style>
