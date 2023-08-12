<template>
	<button class="button">
		<slot></slot>
	</button>
</template>
<script setup>

</script>
<style scoped>
button {
	display: inline-flex;
	align-items: center;
	justify-content: center;

	font-weight: 400;
	text-align: center;
	white-space: nowrap;
	vertical-align: middle;
	-webkit-user-select: none;
	user-select: none;
	border: 1px solid transparent;
	padding: 0.375rem 0.75rem;
	font-size: 1rem;
	line-height: 1.5;
	border-radius: 0.25rem;
	transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
}

.button.disabled,
.button:disabled {
	opacity: .65;
}

.button:not(:disabled):not(.disabled) {
	cursor: pointer;
}

.button-sm {
	padding: 0.25rem 0.5rem;
	font-size: .875rem;
	line-height: 1.5;
	border-radius: 0.2rem;
}

.button-primary {
	color: #fff;
	background-color: #007bff;
	border-color: #007bff;
}

.button-primary:hover {
	color: #fff;
	background-color: #0069d9;
	border-color: #0062cc;
}

.button-primary:not(:disabled):not(.disabled).active,
.button-primary:not(:disabled):not(.disabled):active,
.show>.button-primary.dropdown-toggle {
	color: #fff;
	background-color: #0062cc;
	border-color: #005cbf;
}

.button-success {
	color: #fff;
	background-color: #28a745;
	border-color: #28a745;
}

.button-success:hover {
	color: #fff;
	background-color: #218838;
	border-color: #1e7e34;
}

.button-success.disabled, .button-success:disabled {
    color: #fff;
    background-color: #28a745;
    border-color: #28a745;
}

.button-danger {
	color: #fff;
	background-color: #dc3545;
	border-color: #dc3545;
}

.button-danger:hover {
	color: #fff;
	background-color: #c82333;
	border-color: #bd2130;
}

.button-danger:not(:disabled):not(.disabled).active,
.button-danger:not(:disabled):not(.disabled):active,
.show>.button-danger.dropdown-toggle {
	color: #fff;
	background-color: #bd2130;
	border-color: #b21f2d;
}


.button-success:not(:disabled):not(.disabled).active,
.button-success:not(:disabled):not(.disabled):active,
.show>.button-success.dropdown-toggle {
	color: #fff;
	background-color: #1e7e34;
	border-color: #1c7430;
}

.button-outline-secondary {
	color: #6c757d;
	background-color: transparent;
	background-image: none;
	border-color: #6c757d;
}

.button-outline-secondary:hover {
	color: #fff;
	background-color: #6c757d;
	border-color: #6c757d;
}

.button-outline-secondary:not(:disabled):not(.disabled).active,
.button-outline-secondary:not(:disabled):not(.disabled):active,
.show>.button-outline-secondary.dropdown-toggle {
	color: #fff;
	background-color: #6c757d;
	border-color: #6c757d;
}

.button-outline-secondary.disabled,
.button-outline-secondary:disabled {
	color: #6c757d;
	background-color: transparent;
}

.button-outline-danger {
	color: #dc3545;
	background-color: transparent;
	background-image: none;
	border-color: #dc3545;
}

.button-outline-danger:hover {
	color: #fff;
	background-color: #dc3545;
	border-color: #dc3545;
}

.button-outline-danger:not(:disabled):not(.disabled).active,
.button-outline-danger:not(:disabled):not(.disabled):active,
.show>.button-outline-danger.dropdown-toggle {
	color: #fff;
	background-color: #dc3545;
	border-color: #dc3545;
}

.button-outline-danger.disabled,
.button-outline-danger:disabled {
	color: #dc3545;
	background-color: transparent;
}
</style>