<template>
    <div class="header">
        <slot></slot>
    </div>
</template>

<script setup>

</script>

<style scoped>
.header {
    color: #fff;
    background-color: #337ab7;
    border-color: #337ab7;

    padding: 10px 15px;

    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
}
</style>