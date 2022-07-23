<template>
    <tr class="odd:bg-azure-50" v-bind="$attrs">
        <td class="text-sm w-1/5 py-2 border-y border-azure-200">
            <p class="w-44 m-auto text-start">{{producto.nombreProducto}}</p>
        </td>
        <td class="text-sm w-1/5 py-2 border-y border-azure-200">
            <p class="w-11 m-auto text-end">{{producto.stock}}</p>
        </td>
        <td class="text-sm w-1/5 py-2 border-y border-azure-200 items-center">
                <p class="w-16 m-auto text-start">S/. {{producto.precio}}</p>
        </td>
        <td class="text-sm w-1/5 py-2 border-y border-azure-200">
            <p class="w-fit m-auto text-end">{{producto.cantidadVentas}}</p>
        </td>
        <td class="text-sm w-full py-2 border-y border-azure-200 flex justify-center space-x-2">
            <button @click="editProduct" class="flex w-20 h-8 p-2 font-semibold text-azureAqua-500 rounded-md border border-azureAqua-500 justify-center
            transition-all duration-200 transform hover:scale-105 items-center space-x-1">
                    <p>Detalles</p> <i class="fa-solid fa-circle-info text-md"></i>
            </button>
            <button @click="deleteProduct" class="p-0 m-0">
                <i class="fa-regular fa-circle-xmark text-cerise-800 text-2xl scale-105 hover:scale-100"></i>
            </button>
        </td>
    </tr>
</template>
<script>
export default {
    name: "ProductoRow",
    props: {
        product: Object,
        orden:Number,
    },
    data () {
        return{
            producto: this.product,
            ordenCampo: this.orden,
        }
    },
    emits:['editar', 'eliminar'],
    methods:{
        deleteProduct(){
            this.$emit('eliminar', this.producto.idProducto);
        },
        editProduct(){
            this.$emit('editar', this.producto);
        }
    },
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
