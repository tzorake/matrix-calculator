<template>
  <div class="matrix-view">
    <div class="name-container">
      <input type="text" class="name-edit" v-show="isNameEditVisible" ref="nameEdit" :value="name"
        @change="$emit('update:name', $event.target.value)" />
      <div class="name-view" v-show="!isNameEditVisible" @click="toggleNameEditingMode" ref="nameView"
        v-text="name.length > 0 ? name : '▮'"></div>
    </div>
    <div class="equals">=</div>
    <div class="data-container" @click="toggleDataEditingMode">
      <div class="left-bracket"></div>
      <textarea class="data-edit" v-show="isDataEditVisible" ref="dataEdit" :value="data"
        @change="$emit('update:data', convertData($event.target.value))"></textarea>
      <div class="data-view" v-show="!isDataEditVisible" ref="dataView" :style="style">
        <div class="value" v-if="values.length === 0">▮</div>
        <div class="value" v-else v-for="(value, i) in values" :key="i">
          {{ value }}
        </div>
      </div>
      <div class="right-bracket"></div>
    </div>
  </div>
</template>

<script setup>
import { nextTick, onMounted, ref, defineProps, defineEmits, computed } from 'vue'
import { Matrix } from './utils/Matrix';

const props = defineProps({
  name: {
    type: String,
    default: '',
  },
  data: {
    type: Matrix,
    default: Matrix.empty,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
});

const name = computed(() => props.name);
const data = computed(() => props.data);
const rows = computed(() => data.value.rows);
const columns = computed(() => data.value.columns);
const values = computed(() => data.value.values);
const style = computed(() => ({
  // the case repeat(0, 1fr) is not valid css code so the case should be handle by hands
  'grid-template-rows': 'repeat(' + (rows.value !== 0 ? rows.value : 1) + ', 1fr)',
  'grid-template-columns': 'repeat(' + (columns.value !== 0 ? columns.value : 1) + ', 1fr)',
}));

defineEmits(['update:name', 'update:data']);

const nameView = ref();
const nameEdit = ref();
const dataView = ref();
const dataEdit = ref();

const isNameEditVisible = ref(false);
const isDataEditVisible = ref(false);

function convertData(string) {
  return Matrix.fromString(string);
}

function toggleNameEditingMode() {
  if (props.readonly) {
    return;
  }

  isNameEditVisible.value = !isNameEditVisible.value;

  if (isNameEditVisible.value) {
    nextTick(() => nameEdit.value.focus());
  }
}

function toggleDataEditingMode() {
  if (props.readonly) {
    return;
  }

  isDataEditVisible.value = !isDataEditVisible.value;

  if (isDataEditVisible.value) {
    nextTick(() => dataEdit.value.focus());
  }
}

onMounted(() => {
  nameEdit.value.onclick = event => event.stopPropagation();
  dataEdit.value.onclick = event => event.stopPropagation();

  nameEdit.value.onblur = toggleNameEditingMode;
  dataEdit.value.onblur = toggleDataEditingMode;
});

</script>

<style scoped>
.matrix-view {
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 5px;
  user-select: none;
  box-sizing: border-box;
}

.name-edit {
  width: 50px;
}

.data-container {
  display: flex;
  gap: 5px;
}

.left-bracket {
  border-left: 2px solid black;
  border-top: 2px solid black;
  border-bottom: 2px solid black;
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;
  width: 5px;
}

.data-edit {
  resize: none;
  box-sizing: border-box;
  margin: 0px;

  width: 150px;
  height: 150px;
}

.data-view {
  min-width: 16px;
  min-height: 20px;

  display: grid;
  gap: 10px;
}

.data-view .value {
  display: flex;
  align-items: center;
  justify-content: center;
}

.right-bracket {
  border-right: 2px solid black;
  border-top: 2px solid black;
  border-bottom: 2px solid black;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
  width: 5px;
}
</style>