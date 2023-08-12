<template>
  <div class="icon">
    <slot></slot>
  </div>
</template>

<script setup>
</script>

<style scoped>
.icon {
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0.75rem 0;
}

.icon:hover {
  color: rgba(255, 255, 255, 0.75);
  cursor: pointer;
}

.active {
  content: "";
  position: relative;
  color: rgba(255, 255, 255, 0.75);
}

.active::before {
  content: "";
  position: absolute;

  width: 100%;
  height: 100%;

  border-right: 3px solid rgb(0, 123, 255);
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  right: 3.75rem;
}
</style>
