<template>
  <div class="equation-editor">
    <VHeader>Equation</VHeader>
    <VContainer :orientation="Orientation.VERTICAL" stylized>
      <textarea class="equation-edit" v-model="equations"></textarea>
      <div class="button-container">
        <VButton :disabled="isDisabled" class="cancel-button button-success button-sm" @click="onClick">
					Solve
				</VButton>
      </div>
    </VContainer>
  </div>
</template>

<script setup>
import VButton from "./VButton.vue";
import VContainer from "./VContainer.vue";
import VHeader from "./VHeader.vue";
import { Orientation } from "./utils/Orientation.js";
import { UserData } from "./utils/UserData.js";
import { solve } from './utils/serverless/ServerlessAPI.js';
import { defineProps, computed, ref, defineEmits } from "vue";

const props = defineProps({
  collection: {
    type: Array,
    default() {
      return [];
    },
  },
});

const emit = defineEmits(["success", "error"]);

const isDisabled = ref(false);
const equations = ref("");
const collection = computed(() => {
  return props.collection;
});
const userData = computed(() => {
  return new UserData(collection.value, equations.value);
});

// async function solve() {
//   try {
//     const response = await fetch("http://localhost:6969", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Access-Control-Allow-Origin": "*",
//       },
//       body: JSON.stringify(userData.value),
//     });

//     if (!response.ok) {
//       const error = await response.json();
//       emit("error", new ServerResponse(error));
//       return;
//     }

//     const data = await response.json();
//     emit(
//       "success", 
//       new ServerResponse(data)
//     );
//   } catch (error) {
//     emit(
//       "error",
//       new ServerResponse({ success: false, code: 400, message: error.message })
//     );
//     return;
//   }
// }

function onClick() {
  isDisabled.value = true;

  const response = solve(userData.value)
  if (response.success) {
    emit('success', response);
  }
  else {
    emit('error', response);
  }

  isDisabled.value = false;
}

</script>

<style scoped>
.equation-edit {
  flex-grow: 1;
  min-height: 150px;
  resize: none;

	background-color: #343434;
  color: inherit;
	border-color: rgba(255, 255, 255, 0.15);
	border-radius: 0.25rem;
}

.button-container {
  display: flex;
  justify-content: center;
}
</style>
