<template>
    <CardProducto v-if="mostrarCard" :producto="producto" />
    <tr class="odd:bg-azureMarine-50" v-bind="$attrs">
        <td class="text-sm w-1/5 py-2 border-y border-azure-200"> {{producto.nombreProducto}} </td>
        <td class="text-sm w-1/5 py-2 border-y border-azure-200"> {{producto.stock}} </td>
        <td class="text-sm w-1/5 py-2 border-y border-azure-200">{{producto.precio}}</td>
        <td class="text-sm w-1/5 py-2 border-y border-azure-200">{{producto.cantidadVentas}}</td>
        <td class="text-sm w-full py-2 border-y border-azure-200 flex justify-center space-x-2">
            <button class="w-20 p-1 font-semibold text-azureAqua-600 rounded-md border border-azureAqua-600 transition-all duration-200 transform
            hover:scale-105" >
                <div class="flex items-center justify-center">
                    Detalles <img class="filter w-4" src="./../assets/details.svg" alt="Detalles del producto" />
                </div>
            </button>
            <button>
                <img class="fillDelete w-5" src="./../assets/delete.svg" alt="Eliminar Producto">
            </button>
        </td>
    </tr>
</template>
<script>
import CardProducto from './CardProducto.vue';
export default {
    name: "ProductoRow",
    props: {
        product: Object,
    },
    data () {
        return{
            mostrarCard:false,
            producto: this.product,
        }
    },
    components: { CardProducto }
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
