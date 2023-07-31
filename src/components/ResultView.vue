<template>
	<div class="result-view">
		<VHeader>Result</VHeader>
		<VContainer :orientation="Orientation.VERTICAL">
			<ResultViewItem :name="item.name" :data="item.data" :readonly="item.readonly" v-for="item in collection" :key="item.name" @copy="onCopy"/>
		</VContainer>
	</div>
</template>
<script setup>
import VHeader from './VHeader.vue';
import VContainer from './VContainer.vue';
import ResultViewItem from './ResultViewItem.vue';
import { defineProps, defineEmits, computed } from 'vue';
import { Orientation } from './utils/Orientation';

const props = defineProps({
	collection: {
		type: Array,
		default() {
			return [];
		},
	},
});
const emit = defineEmits(['copy']);

const collection = computed(() => {
	return props.collection;
});

function onCopy(structure) {
	emit('copy', structure);
}

</script>
<style scoped>
.result-view {
	display: flex;
	flex-direction: column;
	flex-grow: 1;
}
</style>