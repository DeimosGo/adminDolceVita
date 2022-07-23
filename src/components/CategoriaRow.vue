<template>
    <tr class="w-full odd:bg-azure-50" v-bind="$attrs">
        <td class="w-1/4 py-2 text-sm border-y border-azure-200"> {{category.nombreCategoria}} </td>
        <td class="w-2/4 py-2 text-sm border-y border-azure-200 text-start"> {{category.descripcion}} </td>
        <td class="w-1/4 py-2 text-sm border-y border-azure-200">
            <div class=" w-full flex items-center justify-center space-x-2">
                <button @click="mostrarEdit" class="flex w-20 h-8 p-2 font-semibold text-azureAqua-500 rounded-md border border-azureAqua-500 justify-center
            transition-all duration-200 transform hover:scale-105 items-center space-x-1">
                    <p>Detalles</p> <i class="fa-solid fa-circle-info text-md"></i>
            </button>
            <button @click="deleteProduct" class="p-0 m-0">
                <i class="fa-regular fa-circle-xmark text-cerise-800 text-2xl scale-105 hover:scale-100"></i>
            </button>
            </div>
        </td>
    </tr>
</template>
<script>
export default {
    name: "CategoriaRow",
    props: {
        categoria: Object,
    },
    data () {
        return{
            category: this.categoria,
        }
    },
    methods:{
        deleteProduct(){
            this.$emit('eliminar', this.category.idCategoria);
        },
        mostrarEdit(){
            this.$emit('mostrarEdit', this.category);
        }
    }
}
</script>
<style scoped>
.filter{
    filter: invert(31%) sepia(78%) saturate(2924%) hue-rotate(170deg) brightness(100%) contrast(94%);
}
.fillDelete{
    filter: invert(27%) sepia(32%) saturate(3463%) hue-rotate(337deg) brightness(88%) contrast(83%);
}
</style>
