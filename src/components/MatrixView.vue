<template>
  <div class="view">
    <div class="alias-container">
      <input
        type="text"
        class="alias-edit"
        v-show="isAliasEditVisible"
        ref="aliasEdit"
        v-model="aliasString"
      />
      <div
        class="alias-view"
        v-show="!isAliasEditVisible"
        @click="toggleAliasEditingMode"
        ref="aliasView"
        v-text="alias.length === 0 ? '▮' : alias"
      ></div>
    </div>
    <div class="equals">=</div>
    <div class="matrix-container">
      <div class="left-bracket"></div>
      <textarea
        class="matrix-edit"
        v-show="isValuesEditVisible"
        ref="matrixEdit"
        v-model="matrixString"
      ></textarea>
      <div
        class="matrix-view"
        v-show="!isValuesEditVisible"
        @click="toggleMatrixEditingMode"
        ref="matrixView"
        :style="{
          'grid-template-rows': 'repeat(' + data.rows + ', 1fr)',
          'grid-template-columns': 'repeat(' + data.columns + ', 1fr)',
        }"
      >
        <div class="cell" v-if="data.values.length === 0">▮</div>
        <div class="cell" v-for="(cell, i) in data.values" :key="i">
          {{ cell }}
        </div>
      </div>
      <div class="right-bracket"></div>
    </div>
  </div>
</template>

<script setup>
import { Matrix } from "./Matrix";
import { isNumeric, isInteger } from "./helper";
import { ref, defineProps, defineEmits, nextTick, onMounted, watch } from "vue";

const props = defineProps({
  readonly: {
    type: Boolean,
  },
  alias: {
    type: String,
    default: "",
  },
  data: {
    type: Matrix,
    default() {
      return Matrix.empty;
    },
  },
});

const emit = defineEmits(["update:alias", "update:data"]);

const aliasEdit = ref();
const aliasView = ref();
const matrixEdit = ref();
const matrixView = ref();

const aliasString = ref('');
const matrixString = ref('');

const isAliasEditVisible = ref(false);
const isValuesEditVisible = ref(false);

const alias = ref(props.alias);
const data = ref(props.data);

function toggleAliasEditingMode() {
  if (props.readonly) {
    return;
  }

  isAliasEditVisible.value = !isAliasEditVisible.value;

  if (isAliasEditVisible.value) {
    nextTick(() => aliasEdit.value.focus());
  }
}

function toggleMatrixEditingMode() {
  if (props.readonly) {
    return;
  }

  isValuesEditVisible.value = !isValuesEditVisible.value;

  if (isValuesEditVisible.value) {
    nextTick(() => matrixEdit.value.focus());
  }
}

watch(() => props.alias, () => {
  alias.value = props.alias;
});

watch(aliasString, () => {
  alias.value = aliasString.value;
  emit("update:alias", alias.value);
});

watch(matrixString, () => {
  // matrix parsing
  const input = matrixString.value;
  const matrixRows = input.trim().split("\n");

  if (!Array.isArray(matrixRows)) {
    data.value = Matrix.empty;
    emit("update:data", data.value);
    return;
  }

  const cells = matrixRows.map((row) => row.trim().split(" "));
  const n = cells.length;
  const m = cells[0].length;
  if (!cells.every((row) => row.length === m)) {
    data.value = Matrix.empty;
    emit("update:data", data.value);
    return;
  }

  // format matrix if conditions are satisfied
  const dots = "···";

  if (n >= 5) {
    cells.splice(1, n - 3);
    for (let j = 0; j < cells[0].length; ++j) {
      cells[1][j] = dots;
    }
  }

  if (m >= 5) {
    for (let i = 0; i < cells.length; ++i) {
      cells[i].splice(1, m - 3);
      cells[i][1] = dots;
    }
  }

  const flatten = cells
    .flat()
    .map((s) => (!isNumeric(s) || isInteger(s) ? s : Number(s).toFixed(2)));

    data.value = new Matrix(flatten, cells.length, cells[0].length);
  emit("update:data", data.value);
});

onMounted(() => {
  aliasEdit.value.onblur = toggleAliasEditingMode;
  matrixEdit.value.onblur = toggleMatrixEditingMode;
});
</script>

<style scoped>
.view {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  gap: 5px;
  user-select: none;
}

.alias-edit {
  width: 50px;
}

.matrix-container {
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
.matrix-edit {
  resize: none;
  box-sizing: border-box;
  margin: 0px;

  width: 150px;
  height: 150px;
}

.matrix-view .cell {
  display: flex;
  align-items: center;
  justify-content: center;
}

.matrix-view {
  min-width: 16px;
  min-height: 20px;

  display: grid;
  gap: 10px;
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
