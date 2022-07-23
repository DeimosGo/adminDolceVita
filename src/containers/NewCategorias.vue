<template>
    <button @click="$emit('nuevaCategoria')"
    class="h-10 px-2 flex text-submarine-600 border-2 rounded-md border-submarine-600 space-x-1 justify-center items-center transition-all duration-100 hover:scale-105">
        <p>Nuevo</p>
        <i class="fa-solid fa-file-circle-plus"></i>
    </button>
</template>
