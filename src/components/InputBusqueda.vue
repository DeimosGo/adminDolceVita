<template>
<div class="bg-gray-100 w-96 h-10 hover:h-14 flex rounded-l-lg transition-all duration-150
shadow-gray-200 shadow-lg">
    <input v-model="nameProducto" class="text-xl w-full pl-4 py-2 top-32 outline-none rounded-l-lg bg-gray-100" type="text" placeholder="Producto" />
    <button class="w-12 px-2 bg-azureMarine-800 rounded-r-lg" @click="buscar">
        <img class="w-5 m-auto" src="./../assets/busqueda.svg" alt="Icono de busqueda" />
    </button>
</div>
</template>
<script>
export default {
    name: 'InputBusqueda',
    data (){
        return {
            nameProducto: '',
        }
    },
    methods:{
        buscar(){
            this.$emit("search", this.nameProducto);
        }
    }
}
</script>
<style scoped>
img {
    filter: invert(100%) sepia(0%) saturate(2%) hue-rotate(135deg) brightness(108%) contrast(101%);
}
</style>
