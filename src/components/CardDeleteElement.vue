<template>
    <div class="w-11/12 lg:w-600p flex px-4 rounded-2xl flex-col py-8 justify-between items-center top-0 right-0 left-0 bottom-0 h-80 m-auto absolute z-40 bg-white-0">
        <h2 class="w-full text-center text-2xl font-bold text-gray-800">¿Está seguro que desea eliminar este registro?</h2>
        <i class="fa-solid fa-triangle-exclamation text-cerise-700 text-8xl"></i>
        <p class="text-lg text-gray-500 ">Los cambios no se podrán deshacer</p>
        <div class="flex flex-row w-full justify-center space-x-6">
            <button @click="$emit('deleted');"
            class="border-2 rounded-lg scale-105 hover:scale-100 transition-all duration-200 text-white-0 bg-card w-40 p-1">
                Eliminar
            </button>
            <button @click="$emit('eliminar')"
            class="border-2 rounded-lg scale-105 hover:scale-100 transition-all duration-200 text-white-0 bg-azureMarine-700 w-40 p-1">
                Cancelar
            </button>
        </div>
    </div>
</template>
<script>
export default{
    name: 'CardDeleteElement',
}
</script>
