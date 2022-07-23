<template>
    <button @click="$emit('recargar')"
    class="flex h-fit w-fit items-center rounded-lg text-azureMarine-800 justify-center space-x-2 border-2 border-azureMarine-800
    text-lg p-1 transition-all hover:scale-105 duration-100">
        <p>Recargar</p>
        <i class="fa-solid fa-arrows-rotate"></i>
    </button>
</template>
<script>
export default {
    name: 'ReiniciarFiltros',
}
</script>
