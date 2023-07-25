<template>
  <div class="app-container">
    <MatrixEditor :name="name" :data="data" :mode="mode" @update:name="onNameUpdate" @update:data="onDataUpdate"
      @create="onCreate" @apply="onApply" @cancel="onCancel" />
    <EquationEditor />
    <UserData :collection="collection" :mode="mode" @edit="onEdit" @remove="onRemove" />
    <ResultEditor />
  </div>
</template>

<script setup>
import { Matrix } from './components/utils/Matrix';
import { MatrixStructure } from './components/utils/MatrixStructure';
import { MatrixInputMode } from './components/utils/MatrixInputMode';
import { ref } from 'vue';
import MatrixEditor from './components/MatrixEditor.vue';
import UserData from './components/UserData.vue';
import ResultEditor from './components/ResultEditor.vue';
import EquationEditor from './components/EquationEditor.vue';

const name = ref('foobar');
const data = ref(new Matrix([1, 2, 3, 4], 2, 2));
const mode = ref(MatrixInputMode.CREATE);
const collection = ref([
  new MatrixStructure('A', new Matrix([1, 2, 3, 4], 2, 2)),
  new MatrixStructure('C', new Matrix([52, 22, 13, 54, 12, 23, 22, 1, 5], 3, 3)),
  new MatrixStructure('B', new Matrix([1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0], 4, 5)),
  new MatrixStructure('D', new Matrix([1, 2, 3, 4], 1, 4)),
]);

function onNameUpdate(newName) {
  console.info('App.onNameUpdate');
  name.value = newName;
}

function onDataUpdate(newData) {
  console.info('App.onDataUpdate');
  data.value = newData;
}

function create(structure) {
  if (structure.name.length === 0) {
    return;
  }

  if (structure.data.rows === 0 && structure.data.columns === 0) {
    return;
  }

  if (collection.value.find(item => item.name === structure.name)) {
    return;
  }

  collection.value = [structure.copy(), ...collection.value.slice()];
  name.value = '';
  data.value = Matrix.empty;
}

function onCreate(structure) {
  console.info('App.onCreate');
  create(structure);
}

function onApply(structure) {
  console.info('App.onApply');
  create(structure);
  mode.value = MatrixInputMode.CREATE;
}

function onCancel(structure) {
  console.info('App.onCancel');
  name.value = structure.name;
  data.value = structure.data;
}

function onEdit(structure) {
  console.info('App.onEdit');
  collection.value = collection.value.filter(item => item.name !== structure.name);
  name.value = structure.name;
  data.value = structure.data.copy();
  mode.value = MatrixInputMode.EDIT;
}

function onRemove(structure) {
  console.info('App.onRemove');
  collection.value = collection.value.filter(item => item.name !== structure.name);
}
</script>

<style scoped>
.app-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}
</style>