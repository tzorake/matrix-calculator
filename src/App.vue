<template>
  <div class="app-container">
    <MatrixEditor :name="name" :data="data" :mode="mode" @update:name="onNameUpdate" @update:data="onDataUpdate"
      @create="onCreate" @apply="onApply" @cancel="onCancel" />
    <EquationEditor :collection="userData" @success="onSuccess" @error="onError" />
    <UserData :collection="userData" :mode="mode" @edit="onEdit" @remove="onRemove" />
    <ResultView :collection="resultData" @copy="onCopy" />
    <VToastStack :notifications="notifications" @shift="onShift" />
  </div>
</template>

<script setup>
import { Matrix } from './components/utils/Matrix';
import { MatrixStructure } from './components/utils/MatrixStructure';
import { EditorMode } from './components/utils/EditorMode';
import { ref } from 'vue';
import MatrixEditor from './components/MatrixEditor.vue';
import EquationEditor from './components/EquationEditor.vue';
import UserData from './components/UserData.vue';
import ResultView from './components/ResultView.vue';
import VToastStack from './components/VToastStack.vue';

const name = ref('F');
const data = ref(new Matrix([1, 2, 3, 4], 2, 2));
const mode = ref(EditorMode.CREATE);
const userData = ref([
  new MatrixStructure('A', new Matrix([1, 2, 3, 4, 5, 6, 7, 8, 9], 3, 3)),
  new MatrixStructure('C', new Matrix([52, 22, 13, 54, 12, 23, 22, 1, 5], 3, 3)),
  new MatrixStructure('B', new Matrix([1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0], 4, 5)),
  new MatrixStructure('D', new Matrix([1, 2, 3, 4], 1, 4)),
]);
const resultData = ref([]);
const notifications = ref([]);

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

  if (userData.value.find(item => item.name === structure.name)) {
    return;
  }

  userData.value = [structure.copy(), ...userData.value.slice()];
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
  mode.value = EditorMode.CREATE;
}

function onCancel(structure) {
  console.info('App.onCancel');
  name.value = structure.name;
  data.value = structure.data;
}

function onEdit(structure) {
  console.info('App.onEdit');
  userData.value = userData.value.filter(item => item.name !== structure.name);
  name.value = structure.name;
  data.value = structure.data.copy();
  mode.value = EditorMode.EDIT;
}

function onRemove(structure) {
  console.info('App.onRemove');
  userData.value = userData.value.filter(item => item.name !== structure.name);
}

function onSuccess(data) {
  console.info('App.onSuccess');
  const collection = data.collection;
  resultData.value = [...collection.map(structure => new MatrixStructure(structure.name, new Matrix(structure.data.values, structure.data.rows, structure.data.columns)))]
}

function onError(error) {
  console.info('App.onError');
  notifications.value = [...notifications.value, error];
}

function onCopy(structure) {
  console.info('App.onCopy');
  name.value = structure.name;
  data.value = structure.data;
}

function onShift() {
  console.info('App.onShift');
  notifications.value = [...notifications.value.slice(1)];
}

</script>

<style scoped>
.app-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}
</style>