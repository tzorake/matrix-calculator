<template>
  <div>
    <UserInput @required-create-matrix="onRequiredCreateMatrix" />
    <UserData :collection="collection"/>
  </div>
</template>
<script setup>
import { MatrixStructure } from "./components/MatrixStructure"
import UserInput from "./components/UserInput.vue";
import UserData from "./components/UserData.vue";
import { ref } from "vue";

const matrixStructure = ref(new MatrixStructure()); 
const collection = ref([]);

function onRequiredCreateMatrix(structure) {
  const ms = matrixStructure.value;
  ms.alias = structure.alias;
  ms.data = structure.data.copy();

  collection.value = [ms.copy(), ...collection.value];
}

</script>
<style scoped></style>
