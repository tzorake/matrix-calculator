<template>
  <div class="user-input">
    <MatrixView
			@update:alias="updateAlias"
			@update:data="updateData"
    />
    <button class="create-button" @click="$emit('requiredCreateMatrix', matrixStructure)">Create</button>
  </div>
</template>
<script setup>
import { Matrix } from "./Matrix";
import { MatrixStructure } from "./MatrixStructure"
import MatrixView from "./MatrixView.vue";
import { computed, defineEmits, ref } from 'vue'

defineEmits([
  'requiredCreateMatrix'
]);

const alias = ref('');
const data = ref(Matrix.empty);

function updateAlias(newAlias) {
	alias.value = newAlias;
}

function updateData(newData) {
	const values = newData.values;
	const rows = newData.rows;
	const columns = newData.columns;

	data.value = new Matrix(
		values,
		rows,
		columns,
	);
}

const matrixStructure = computed(() => new MatrixStructure(alias.value, data.value));

</script>

<style scoped>
.user-input {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  border-bottom: 1px solid black;
}

.create-button {
  margin: 0px auto;

  border: 0px;
  border-radius: 3px;

  padding: 5px 15px;
  background-color: #6c757d;
  color: white;
  cursor: pointer;
  transition: background-color 0.15s ease-in-out;
}

.create-button:hover {
  background-color: #5a6268;
}

.create-button:active {
  background-color: #545b62;
}
</style>
