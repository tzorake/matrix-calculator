<template>
	<div class="matrix-editor">
		<UserHeader>Matrix</UserHeader>
		<div class="content">
			<MatrixView :class="matrix-view" :name="props.name" :data="props.data" @update:name="onNameUpdate"
					@update:data="onDataUpdate" />
			<div class="buttons">
				<UserButton class="create-button button-success button-sm" v-show="mode === MatrixInputMode.CREATE"
					@click="onCreate">
					<svg class="w-6 h-6 text-gray-800 dark:text-white" width="20" height="20" aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
						<path
							d="M9.546.5a9.5 9.5 0 1 0 9.5 9.5 9.51 9.51 0 0 0-9.5-9.5ZM13.788 11h-3.242v3.242a1 1 0 1 1-2 0V11H5.304a1 1 0 0 1 0-2h3.242V5.758a1 1 0 0 1 2 0V9h3.242a1 1 0 1 1 0 2Z" />
					</svg>
				</UserButton>
				<UserButton class="apply-button button-success button-sm" v-show="mode === MatrixInputMode.EDIT" @click="onApply">
					<svg class="w-6 h-6 text-gray-800 dark:text-white" width="20" height="20" aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
						<path
							d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
					</svg>
				</UserButton>
				<UserButton class="cancel-button button-danger button-sm" v-show="mode === MatrixInputMode.EDIT"
					@click="onCancel">
					<svg class="w-6 h-6 text-gray-800 dark:text-white" width="20" height="20" aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
						<path
							d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
					</svg>
				</UserButton>
			</div>
		</div>
	</div>
</template>

<script setup>
import { Matrix } from './utils/Matrix';
import { MatrixStructure } from './utils/MatrixStructure';
import { MatrixInputMode } from './utils/MatrixInputMode'
import { ref, defineProps, defineEmits, watch } from 'vue';
import MatrixView from './MatrixView.vue';
import UserButton from './UserButton.vue';
import UserHeader from './UserHeader.vue';

const props = defineProps({
	name: {
		type: String,
		default: '',
	},
	data: {
		type: Matrix,
		default: Matrix.empty,
	},
	mode: {
		type: Number,
		default: MatrixInputMode.CREATE,
	}
});

const oldName = ref();
const oldData = ref();

watch(() => props.mode, (newValue, oldValue) => {
	if (oldValue === MatrixInputMode.CREATE && newValue === MatrixInputMode.EDIT) {
		oldName.value = props.name;
		oldData.value = props.data.copy();
	}
});

const emit = defineEmits(['update:name', 'update:data', 'create', 'apply', 'cancel']);

function onNameUpdate(newName) {
	console.info('MatrixEditor.onNameUpdate', newName);
	emit('update:name', newName);
}

function onDataUpdate(newData) {
	console.info('MatrixEditor.onDataUpdate', newData);
	emit('update:data', newData);
}

function onCreate() {
	console.info('MatrixEditor.onCreate');
	emit('create', new MatrixStructure(props.name, props.data));
}

function onApply() {
	console.info('MatrixEditor.onApply');
	emit('apply', new MatrixStructure(props.name, props.data));
}

function onCancel() {
	console.info('MatrixEditor.onCancel');
	emit('cancel', new MatrixStructure(oldName.value, oldData.value));
}

</script>

<style scoped>
.matrix-editor {
	display: flex;
	flex-direction: column;
	justify-content: center;
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

.matrix-view {
	flex-grow: 1;
}

.buttons {
	display: flex;
	gap: 5px;

	justify-content: center;
	align-items: center;
}
</style>