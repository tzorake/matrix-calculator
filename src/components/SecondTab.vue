<template>
  <VMenuTab>
    <EquationEditor
      :collection="props.userData"
      @success="onSuccess"
      @error="onError"
    />
    <ResultView 
      :collection="props.resultData" 
      @copy="onCopy" 
    />
  </VMenuTab>
</template>

<script setup>
import EquationEditor from "./EquationEditor.vue";
import ResultView from "./ResultView.vue";
import VMenuTab from "./VMenuTab.vue";
import { defineEmits, defineProps } from "vue";

const props = defineProps({
  userData: {
    type: Array,
    default: () => {
      return [];
    },
  },
  resultData: {
    type: Array,
    default: () => {
      return [];
    },
  },
});

const emit = defineEmits([
  'success',
  'error',
  'copy',
]);

function onSuccess(response) {
  emit('success', response);
}

function onError(response) {
  emit('error', response);
}

function onCopy(structure) {
  emit('copy', structure);
}
</script>

<style scoped></style>
