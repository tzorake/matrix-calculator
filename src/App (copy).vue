<template>
  <div class="A">
    <div class="matrix-alias-wrapper">
      <input
        type="text"
        class="matrix-alias"
        v-show="isMatrixAliasVisible"
        v-model="matrixAliasValue"
        ref="matrixAlias"
      />
      <div class="matrix-alias-view" 
      v-show="!isMatrixAliasVisible"
      ref="matrixAliasView"
      @click="toggleMatrixAliasVisiblity" v-text="matrixAliasValue.length !== 0 ? matrixAliasValue : '▮'"></div>
    </div>
    <div>=</div>
    <div class="matrix-wrapper">
      <div class="left-bracket"></div>
      <div class="wrapper">
        <textarea
          class="matrix"
          v-show="isMatrixVisible"
          v-model="matrixValues"
          ref="matrix"
        ></textarea>
        <div class="matrix-view" 
        v-show="!isMatrixVisible" 
        ref="matrixView"
        @click="toggleMatrixVisiblity">

        <div v-if="matrixValues.length === 0">▮</div>
        <div v-else v-for="(row, i) in matrixRepresentation" :key="i" class="row">
          <div v-for="(num, j) in row" :key="`${i}${j}`" class="cell">{{ num }}</div>
        </div>
      </div>
      </div>
      <div class="right-bracket"></div>
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, ref } from "vue";

const matrixAliasValue = ref("");
const matrixValues = ref([]);

const isMatrixAliasVisible = ref(false);
const isMatrixVisible = ref(false);

const matrixAlias = ref();
const matrixAliasView = ref();
const matrix = ref();
const matrixView = ref();

function toggleMatrixAliasVisiblity()
{
  isMatrixAliasVisible.value = !isMatrixAliasVisible.value;
  
  if (isMatrixAliasVisible.value) {
    nextTick(() => matrixAlias.value.focus());
  }
}

function toggleMatrixVisiblity()
{
  isMatrixVisible.value = !isMatrixVisible.value;
  
  if(isMatrixVisible.value) {
    nextTick(() => matrix.value.focus());
  }
}

onMounted(() => {
  matrixAlias.value.onblur = toggleMatrixAliasVisiblity;
  matrix.value.onblur = toggleMatrixVisiblity;
});

const matrixRepresentation = computed(() => {
  // matrix parsing
  const input = matrixValues.value;
  const rows = input.trim().split("\n");

  if (!Array.isArray(rows)) {
    return [];
  }

  const cells = rows.map(row => row.trim().split(" "));
  const n = cells.length;
  const m = cells[0].length;
  if (!cells.every(row => row.length === m)) {
    return [];
  }

  // format to certain format for certain conditions
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

  return cells;
});


</script>

<style scoped>
.A {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 20px;
}

.matrix-alias {
  box-sizing: border-box;
  width: 50px;
}

.matrix-alias-view {
  background-color: white;
  user-select: none;

  display: flex;
  align-items: center;
  justify-content: center;
}

.matrix-alias,
.matrix-alias-view {
  height: 25px;
}

.left-bracket {
  border-left: 2px solid black;
  border-top: 2px solid black;
  border-bottom: 2px solid black;
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;
  width: 5px;
}

.right-bracket {
  border-right: 2px solid black;
  border-top: 2px solid black;
  border-bottom: 2px solid black;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
  width: 5px;
}

.matrix-wrapper {
  display: flex;
  gap: 5px;
}

.matrix {
  resize: none;
  box-sizing: border-box;
  margin: 0px;

  width: 150px;
  height: 150px;
}

.matrix-view {
  background-color: white;
  user-select: none;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;

  min-width: 16px;
  min-height: 30px;
}

.matrix-view .row {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

</style>
