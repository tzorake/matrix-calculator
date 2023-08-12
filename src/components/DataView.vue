<template>
	<div class="user-data">
		<VHeader>User Data</VHeader>
		<VContainer :orientation="Orientation.VERTICAL" stylized>
			<DataViewItem :name="item.name" :data="item.data" :readonly="item.readonly" :mode="mode" v-for="item in collection"
				:key="item.name" @edit="onEdit" @remove="onRemove" />
		</VContainer>
	</div>
</template>

<script setup>
import DataViewItem from './DataViewItem.vue';
import { defineProps, defineEmits, computed } from 'vue';
import { EditorMode } from './utils/EditorMode';
import VHeader from './VHeader.vue';
import VContainer from './VContainer.vue'
import { Orientation } from './utils/Orientation';

const props = defineProps({
	collection: {
		type: Array,
		default() {
			return [];
		},
	},
	mode: {
		type: Number,
		default: EditorMode.CREATE,
	},
});

const emit = defineEmits(['edit', 'remove']);

const collection = computed(() => {
	return props.collection;
});
const mode = computed(() => {
	return props.mode;
});

function onEdit(structure) {
	console.info('DataView.onEdit');
	emit('edit', structure);
}

function onRemove(structure) {
	console.info('DataView.onRemove');
	emit('remove', structure);
}

</script>

<style scoped>
.user-data {
	display: flex;
	flex-direction: column;
}

</style>