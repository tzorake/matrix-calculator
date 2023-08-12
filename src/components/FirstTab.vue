<template>
  <VMenuTab>
    <MatrixEditor
      :name="props.name"
      :data="props.data"
      :mode="props.mode"
      @update:name="onNameUpdate"
      @update:data="onDataUpdate"
      @create="onCreate"
      @apply="onApply"
      @cancel="onCancel"
    />
    <DataView
      :collection="props.collection"
      :mode="props.mode"
      @edit="onEdit"
      @remove="onRemove"
    />
  </VMenuTab>
</template>

<script setup>
import { Matrix } from "./utils/Matrix";
import { EditorMode } from "./utils/EditorMode";
import VMenuTab from "./VMenuTab.vue";
import MatrixEditor from "./MatrixEditor.vue";
import DataView from "./DataView.vue";
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  name: {
    type: String,
    default: () => {
      return "";
    },
  },
  data: {
    type: Matrix,
    default: () => {
      return Matrix.empty;
    },
  },
  mode: {
    type: Number,
    default: () => {
      return EditorMode.CREATE;
    },
  },
  collection: {
    type: Array,
    default: () => {
      return [];
    },
  },
});

const emit = defineEmits([
  "update:name",
  "update:data",
  "create",
  "apply",
  "cancel",
  "edit",
  "remove",
]);

function onNameUpdate(newName) {
  emit("update:name", newName);
}

function onDataUpdate(newData) {
  emit("update:data", newData);
}

function onCreate(structure) {
  emit("create", structure);
}

function onApply(structure) {
  emit("apply", structure);
}

function onCancel(structure) {
  emit("cancel", structure);
}

function onEdit(structure) {
  emit("edit", structure);
}

function onRemove(structure) {
  emit("remove", structure);
}

</script>

<style scoped></style>
