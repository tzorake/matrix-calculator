<template>
	<div class="result-editor">
		<UserHeader>Result</UserHeader>
		<div class="content">
			<div class="item-container"></div>
		</div>
	</div>
</template>
<script setup>
import UserHeader from './UserHeader.vue';
</script>
<style scoped>
.result-editor {
	display: flex;
	flex-direction: column;
	flex-grow: 1;
}

.content {
	display: flex;
	flex-direction: column;;
	flex-grow: 1;
	box-sizing: border-box;
	gap: 10px;
	background-color: #fff;
	border: 1px solid #ddd;
	padding: 10px;
}

.item-container {
	display: flex;
	flex-grow: 1;
	border: 1px solid black;
}
</style>