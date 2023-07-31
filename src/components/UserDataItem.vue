<template>
	<GenericItem :name="name" :data="data" :readonly="readonly">
		<template v-slot:buttons>
			<VButton class="edit-button button-outline-secondary button-sm" @click="onEdit" :disabled="mode === EditorMode.EDIT">
				<svg class="w-6 h-6 text-gray-800 dark:text-white" width="20" height="20" aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
					<path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
					<path
						d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z" />
					<path
						d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z" />
				</svg>
			</VButton>
			<VButton class="remove-button button-outline-danger button-sm" @click="onRemove">
				<svg class="w-6 h-6 text-gray-800 dark:text-white" width="20" height="20" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
					fill="currentColor" viewBox="0 0 18 20">
					<path
						d="M17 4h-4V2a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2H1a1 1 0 0 0 0 2h1v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1a1 1 0 1 0 0-2ZM7 2h4v2H7V2Zm1 14a1 1 0 1 1-2 0V8a1 1 0 0 1 2 0v8Zm4 0a1 1 0 0 1-2 0V8a1 1 0 0 1 2 0v8Z" />
				</svg>
			</VButton>
		</template>
	</GenericItem>
</template>

<script setup>
import { Matrix } from './utils/Matrix';
import { defineProps, defineEmits, computed } from 'vue';
import VButton from './VButton.vue';
import { MatrixStructure } from './utils/MatrixStructure';
import { EditorMode } from './utils/EditorMode';
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

const emit = defineEmits(['edit', 'remove']);

const name = computed(() => props.name);
const data = computed(() => props.data);
const readonly = computed(() => props.readonly);
const structure = computed(() => new MatrixStructure(name.value, data.value, readonly.value));

function onEdit() {
	console.info('UserDataItem.onEdit');
	emit('edit', structure.value);
}

function onRemove() {
	console.info('UserDataItem.onRemove');
	emit('remove', structure.value);
}

</script>

<style scoped>

</style>