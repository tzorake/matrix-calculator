<template>
    <div class="user-data">
        <div class="item" v-for="(item, i) in collection" :key="`${item.alias}-${i}`">
            <MatrixView readonly :alias="item.alias" :data="item.data"/>
        </div>
    </div>
</template>
<script setup>
import MatrixView from './MatrixView.vue';
import { defineProps } from 'vue';

defineProps({
    collection: {
        type: Array,
        default() {
            return [];
        },
    }
});
</script>

<style scoped>
    .user-data {
        display: flex;
        flex-direction: column;;
        justify-content: center;
        align-items: center;

        gap: 10px;
        padding: 10px;
    }
</style>