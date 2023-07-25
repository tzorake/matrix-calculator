<template>
    <div class="equation-editor">
		<UserHeader>Equation</UserHeader>
        <div class="content">
            <textarea class="equation-edit"></textarea>
            <div class="button-container">
                <UserButton class="cancel-button button-success button-sm">Solve</UserButton>
            </div>
        </div>
    </div>
</template>

<script setup>
import UserButton from './UserButton.vue';
import UserHeader from './UserHeader.vue';
</script>

<style scoped>
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

.equation-edit {
    flex-grow: 1;
    min-height: 150px;
    resize: none; 
}

.button-container {
    display: flex;
    justify-content: center;
}
</style>