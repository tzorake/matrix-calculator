<template>
  <div class="container" :style="orientation">
      <slot></slot>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';
import { Orientation } from './utils/Orientation';

const props = defineProps({
  orientation: {
    type: Number,
    default: Orientation.HORIZONTAL,
  },
});

const mapping = new Map([
  [Orientation.HORIZONTAL, 'row'],
  [Orientation.VERTICAL, 'column'],
]);
const orientation = computed(() => ({ 'flex-direction': mapping.get(props.orientation, 'row') }));

</script>

<style scoped>
.container {
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	box-sizing: border-box;
	gap: 10px;
	background-color: #fff;
	border: 1px solid #ddd;
	padding: 10px;
}
</style>