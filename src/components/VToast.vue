<template>
  <div :class="classNames">
    <div class="toast-header">
      <svg class="icon" width="20" height="20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
        preserveAspectRatio="xMidYMid slice" focusable="false">
        <rect width="100%" height="100%" :fill="fillColor"></rect>
      </svg>
      <div class="wrapper">
        <strong>{{ header }}</strong>
        <button type="button" class="button-close" aria-label="Close"></button>
      </div>
    </div>
    <div class="toast-body">
      {{ body }}
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps, defineEmits, onMounted, ref } from 'vue';

const props = defineProps({
  'header': {
    type: String,
    default: '',
  },
  'body': {
    type: String,
    default: '',
  },
  'success': {
    type: Boolean,
    default: false
  },
});

const emit = defineEmits(['shift']);

const header = computed(() => {
  return props.header;
});
const body = computed(() => {
  return props.body;
});
const success = computed(() => {
  return props.success;
});
const fillColor = computed(() => {
  return success.value ? '#28a745' : '#dc3545'
});
const classNames = ref('toast fade show');

onMounted(() => {
  const timeout = () => new Promise(resolve => {
    setTimeout(() => {
      classNames.value = 'toast fade';
      resolve();
    }, 4000);
  });
  timeout()
    .then(() => new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 200);
    }))
    .then(() => {
      emit('shift');
    });
});

</script>

<style scoped>
.toast {
  width: 350px;
  max-width: 100%;
  font-size: 0.875rem;
  pointer-events: auto;
  background-color: rgba(37, 37, 37, 0.85);
  color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  border-radius: 0.25rem;
}

.toast-header {
  display: flex;
  align-items: center;
  padding: 0.5rem 0.75rem;
  background-color: rgba(5, 5, 5, 0.85);
  background-clip: padding-box;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  border-top-left-radius: calc(0.25rem - 1px);
  border-top-right-radius: calc(0.25rem - 1px);
  gap: 0.5rem;
}

.icon {
  border-radius: 0.25rem;
}

.fade {
  transition: opacity 0.15s linear;
}

.fade:not(.show) {
  opacity: 0;
}

.toast-body {
  padding: 0.75rem;
  word-wrap: break-word;
}

[type=button]:not(:disabled),
[type=reset]:not(:disabled),
[type=submit]:not(:disabled),
button:not(:disabled) {
  cursor: pointer;
}

.button-close {
  box-sizing: content-box;
  width: 1em;
  height: 1em;
  padding: 0.25em 0.25em;
  color: #000;
  background: transparent url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23000'%3e%3cpath d='M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z'/%3e%3c/svg%3e") center/1em auto no-repeat;
  border: 0;
  border-radius: 0.25rem;
  opacity: 0.5;
}

.wrapper {
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
  align-items: center;
}
</style>