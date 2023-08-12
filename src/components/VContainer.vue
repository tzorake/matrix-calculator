<template>
  <div class="container" :class="classNames">
    <slot></slot>
  </div>
</template>

<script setup>
import { defineProps, computed } from "vue";
import { Orientation } from "./utils/Orientation";

const props = defineProps({
  orientation: {
    type: Number,
    default: Orientation.HORIZONTAL,
  },
  stylized: {
    type: Boolean,
    default: false,
  },
});

const classNames = computed(() => ({
  'horizontal': props.orientation === Orientation.HORIZONTAL || props.orientation !== Orientation.VERTICAL,
  'vertical': props.orientation === Orientation.VERTICAL,
  'stylized': props.stylized,
}));
</script>

<style scoped>
.stylized {
  flex-grow: 1;
  box-sizing: border-box;
  gap: 0.625rem;
  background-color: #1b1f22;
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 0.625rem;
  min-height: 14rem;
}

.horizontal {
  display: flex;
  flex-direction: row;
}

.vertical {
  display: flex;
  flex-direction: column;
}
</style>
