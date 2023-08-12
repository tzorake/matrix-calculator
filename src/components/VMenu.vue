<template>
  <div class="container">
    <div class="menu-bar"></div>
    <div class="menu-panel">
      <div class="icons" ref="icons">
        <slot name="icons"></slot>
      </div>
    </div>
    <div class="content" ref="content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, watch, ref, defineProps, defineEmits } from 'vue';

const emit = defineEmits(['changeSelectedTab']);
const props = defineProps({
  'selectedTab': {
    type: Number,
    default: 0,
  },
});
const icons = ref();
const content = ref();

function updateIcons() {
  const iconsChildren = Array.from(icons.value.children);
  
  iconsChildren.forEach((child, index) => {
    const classList = child.className
      .split(' ')
      .filter(item => item && item !== 'active');
    const classes = classList.join(' ');
    child.className = index === props.selectedTab 
      ? [classes, 'active'].join(' ') 
      : classes;
  });
}

function updateContent() {
  const contentChildren = Array.from(content.value.children);
  
  contentChildren.forEach((child, index) => {
    const classList = child.className
      .split(' ')
      .filter(item => item && item !== 'hidden');
    const classes = classList.join(' ');
    child.className = index === props.selectedTab 
      ? classes 
      : [classes, 'hidden'].join(' ');
  });
}

watch(() => props.selectedTab, (oldValue, newValue) => {
  if (oldValue !== newValue) {
    updateIcons();
    updateContent();
  }
});

function onClick(index) {
  emit('changeSelectedTab', index);
}

onMounted(() => {
  const iconsChildren = Array.from(icons.value.children);

  iconsChildren.forEach((child, index) => {
    child.addEventListener('click', () => {
      onClick(index);
    });
  });

  updateIcons();
  updateContent();
});

onBeforeUnmount(() => {
  const iconsChildren = Array.from(icons.value.children);
  
  iconsChildren.forEach((child, index) => {
    child.removeEventListener('click', () => {
      onClick(index);
    });
  });

  updateIcons();
  updateContent();
});

</script>

<style scoped>
@media (max-width: 575.98px) {
  .menu-panel {
    display: flex;
    flex-direction: column;
    grid-area: panel;

    background-color: rgb(24, 24, 24, 1.0);
    box-sizing: border-box;
    border-right: 2px solid rgb(31, 31, 31, 1.0);

    color: rgba(255, 255, 255, 0.3);

    position: fixed;
    top: 3rem;
    bottom: 0;
    left: 0;
    z-index: 1030;
    min-width: 4rem;
  }

  .container {
    display: grid;
    grid-template-columns: 4rem calc(100% - 4rem); 
    grid-template-rows: 3rem calc(100% - 3rem);
    grid-template-areas: 
    "bar bar"
    "panel content";
    min-height: 100vh;
    background-color: rgb(31, 31, 31, 1.0);
  }
}

@media (min-width: 576px) {
  .menu-panel {
    display: none;

    position: fixed;
    top: 3rem;
    bottom: 0;
    left: 0;
    z-index: 1030;
    min-width: 0;
  }

  .container {
    display: grid;
    grid-template-columns: 4rem calc(100% - 4rem); 
    grid-template-rows: 3rem calc(100% - 3rem);
    grid-template-areas: 
    "bar bar"
    "content content";
    min-height: 100vh;
    background-color: rgb(31, 31, 31, 1.0);
  }
}

.menu-bar {
  grid-area: bar;
  background-color: rgb(24, 24, 24, 1.0);
  box-sizing: border-box;
  border-bottom: 2px solid rgb(31, 31, 31, 1.0);

  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  z-index: 1030;
  min-height: 3rem;
}

.content {
  grid-area: content;
  display: flex;
  gap: 0.625rem;
  padding: 0.625rem;
}
</style>
