<template>
	<div class="user-data">
		<UserHeader>User Data</UserHeader>
		<div class="content">
			<UserDataItem :name="item.name" :data="item.data" :readonly="item.readonly" :mode="mode" v-for="item in collection"
				:key="item.name" @edit="onEdit" @remove="onRemove" />
		</div>
	</div>
</template>

<script setup>
import UserDataItem from './UserDataItem.vue';
import { defineProps, defineEmits, computed } from 'vue';
import { MatrixInputMode } from './utils/MatrixInputMode';
import UserHeader from './UserHeader.vue';

const props = defineProps({
	collection: {
		type: Array,
		default() {
			return [];
		},
	},
	mode: {
		type: Number,
		default: MatrixInputMode.CREATE,
	}
});

const emit = defineEmits(['edit', 'remove']);

const collection = computed(() => {
	return props.collection;
});
const mode = computed(() => {
	return props.mode;
});

function onEdit(structure) {
	console.info('UserData.onEdit');
	emit('edit', structure);
}

function onRemove(structure) {
	console.info('UserData.onRemove');
	emit('remove', structure);
}

</script>

<style scoped>
.user-data {
	display: flex;
	flex-direction: column;
}

.content {
	display: flex;
	flex-direction: column;;
	flex-grow: 1;
	box-sizing: border-box;
	gap: 10px;
	background-color: #fff;
	border: 1px solid #ddd;
	padding: 10px;
}

</style>