<template>
	<div class="item">
		<MatrixView :name="name" :data="data" :readonly="readonly" />
		<div class="buttons">
			<slot name="buttons"></slot>
		</div>
	</div>
</template>

<script setup>
import { Matrix } from './utils/Matrix';
import { EditorMode } from './utils/EditorMode';
import { defineProps, computed } from 'vue';
import MatrixView from './MatrixView.vue';

const props = defineProps({
	name: {
		type: String,
		default: '',
	},
	data: {
		type: Matrix,
		default: () => Matrix.empty,
	},
	readonly: {
		type: Boolean,
		default: true,
	},
	mode: {
		type: Number,
		default: EditorMode.CREATE,
	}
});

const name = computed(() => props.name);
const data = computed(() => props.data);
const readonly = computed(() => props.readonly);

</script>

<style scoped>
.item {
	display: flex;
	flex-direction: column;
	gap: 10px;
}

.buttons {
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 10px;
}
</style>