<template>
<div class="bg-gray-100 w-4/5 mt-2 lg:mt-0 lg:w-96 place-content-center h-10 hover:h-12 flex rounded-l-lg transition-all duration-150
shadow-gray-200 shadow-lg m-auto">
    <input v-model="name" class="text-xl w-full pl-4 py-2 top-32 outline-none rounded-l-lg bg-gray-100" type="text" :placeholder="phText" />
    <button class="w-12 px-2 bg-azureMarine-800 rounded-r-lg" @click="buscar">
        <i class="fa-solid fa-magnifying-glass text-white-0 text-xl"></i>
    </button>
</div>
</template>
<script>
export default {
    props:['phText'],
    name: 'InputBusqueda',
    data (){
        return {
            name: '',
        }
    },
    emits:['search'],
    methods:{
        buscar(){
            this.$emit("search", this.name);
        }
    }
}
</script>
<style scoped>
img {
    filter: invert(100%) sepia(0%) saturate(2%) hue-rotate(135deg) brightness(108%) contrast(101%);
}
</style>
