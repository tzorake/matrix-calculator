<template>
  <VMenu :selectedTab="selectedTab" @change-selected-tab="onChangeSelectedTab">
    <template #icons>
      <VMenuIcon>
        <svg
          width="30"
          height="30"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 20"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.4"
            d="M17 4c0 1.657-3.582 3-8 3S1 5.657 1 4m16 0c0-1.657-3.582-3-8-3S1 2.343 1 4m16 0v6M1 4v6m0 0c0 1.657 3.582 3 8 3s8-1.343 8-3M1 10v6c0 1.657 3.582 3 8 3s8-1.343 8-3v-6"
          />
        </svg>
      </VMenuIcon>
      <VMenuIcon>
        <svg
          width="30"
          height="30"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.4"
            d="M6 14H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v1M5 19h5m-9-9h5m4-4h8a1 1 0 0 1 1 1v12H9V7a1 1 0 0 1 1-1Zm6 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
          />
        </svg>
      </VMenuIcon>
    </template>
    <template #content>
      <FirstTab
        :name="name"
        :data="data"
        :mode="mode"
        @update:name="onNameUpdate"
        @update:data="onDataUpdate"
        @create="onCreate"
        @apply="onApply"
        @cancel="onCancel"
        :collection="userData" 
        @edit="onEdit" 
        @remove="onRemove" 
      />
      <SecondTab
        :userData="userData"
        @success="onSuccess"
        @error="onError"
        :resultData="resultData"
        @copy="onCopy" 
      />
    </template>
  </VMenu>
  <VToastStack :notifications="notifications" @shift="onShift" />
</template>

<script setup>
import FirstTab from "./components/FirstTab.vue";
import SecondTab from "./components/SecondTab.vue";
import VMenu from "./components/VMenu.vue";
import VMenuIcon from "./components/VMenuIcon.vue";
import { ref } from 'vue';
import { Matrix } from "./components/utils/Matrix";
import { EditorMode } from "./components/utils/EditorMode";
import { MatrixStructure } from "./components/utils/MatrixStructure";
import VToastStack from "./components/VToastStack.vue";

const selectedTab = ref(0);

const name = ref("F");
const data = ref(new Matrix([1, 2, 3, 4], 2, 2));
const mode = ref(EditorMode.CREATE);
const userData = ref([
  new MatrixStructure(
    "A", 
    new Matrix(
      [1, 2, 3, 4, 5, 6, 7, 8, 9], 
      3, 
      3
    )
  ),
  new MatrixStructure(
    "C",
    new Matrix(
      [52, 22, 13, 54, 12, 23, 22, 1, 5], 
      3, 
      3
    )
  ),
  new MatrixStructure(
    "B",
    new Matrix(
      [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
      4,
      5
    )
  ),
  new MatrixStructure(
    "D", 
    new Matrix(
      [1, 2, 3, 4], 
      1, 
      4
    )
  ),
]);
const resultData = ref([]);
const notifications = ref([]);

function onChangeSelectedTab(index) {
  selectedTab.value = index;
}

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

</style>
