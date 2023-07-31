<template>
	<GenericItem :name="name" :data="data" :readonly="readonly">
		<template v-slot:buttons>
			<VButton class="edit-button button-outline-secondary button-sm" @click="onCopy">
				<svg class="w-6 h-6 text-gray-800 dark:text-white" width="20" height="20" aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
					<path
						d="M5 9V4.13a2.96 2.96 0 0 0-1.293.749L.879 7.707A2.96 2.96 0 0 0 .13 9H5Zm11.066-9H9.829a2.98 2.98 0 0 0-2.122.879L7 1.584A.987.987 0 0 0 6.766 2h4.3A3.972 3.972 0 0 1 15 6v10h1.066A1.97 1.97 0 0 0 18 14V2a1.97 1.97 0 0 0-1.934-2Z" />
					<path
						d="M11.066 4H7v5a2 2 0 0 1-2 2H0v7a1.969 1.969 0 0 0 1.933 2h9.133A1.97 1.97 0 0 0 13 18V6a1.97 1.97 0 0 0-1.934-2Z" />
				</svg>
			</VButton>
		</template>
	</GenericItem>
</template>

<script setup>
import { Matrix } from './utils/Matrix';
import { MatrixStructure } from './utils/MatrixStructure';
import { EditorMode } from './utils/EditorMode';
import { defineProps, defineEmits, computed } from 'vue';
import VButton from './VButton.vue';
import GenericItem from './GenericItem.vue';

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

const emit = defineEmits(['copy']);

const name = computed(() => props.name);
const data = computed(() => props.data);
const readonly = computed(() => props.readonly);
const structure = computed(() => new MatrixStructure(name.value, data.value, readonly.value));

function onCopy() {
	emit('copy', structure.value.copy());
}

</script>

<style scoped></style>