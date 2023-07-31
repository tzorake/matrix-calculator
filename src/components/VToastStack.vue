<template>
  <div class="toast-stack">
    <VToast :header="header(notification)" :body="notification.message" :success="notification.success" v-for="(notification, index) in notifications" :key="`${index}-${Math.random()}`" @shift="onShift"></VToast>
  </div>
</template>

<script setup>
import { computed, defineProps, defineEmits } from 'vue';
import VToast from './VToast.vue';

const props = defineProps({
  'notifications': {
    type: Array,
    default() {
      return [];
    },
  },
});

const emit = defineEmits(['hide', 'shift']);

const notifications = computed(() => {
  return props.notifications;
});

function header(notification) {
  return notification.success ? 'Message' : `Error ${notification.code}`;
}

function onShift() {
  emit('shift');
}

</script>

<style scoped>
.toast-stack {
  display: flex;
  flex-direction: column;
  position: fixed;
  bottom: 0;
  right: 0;
  padding: 1rem;
  gap: 0.75rem;
}
</style>