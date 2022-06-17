<template>
    <CardProducto :producto="producto" />
    <tr class="odd:bg-azureMarine-50" v-bind="$attrs">
        <td class="text-sm w-1/5 py-2 border-y border-azure-200"> {{producto.nombreProducto}} </td>
        <td class="text-sm w-1/5 py-2 border-y border-azure-200"> {{producto.stock}} </td>
        <td class="text-sm w-1/5 py-2 border-y border-azure-200">{{producto.precio}}</td>
        <td class="text-sm w-1/5 py-2 border-y border-azure-200">{{producto.cantidadVentas}}</td>
        <td class="text-sm w-1/5 py-2 border-y border-azure-200">
            <button class="w-20 p-1 text-submarine-600 rounded-md border border-submarine-600" >
                <div class="flex items-center justify-center">
                    Detalles <img class="filter w-4 ml-1" src="./../assets/details.svg" alt="Detalles del producto" />
                </div>
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
            producto: this.product,
        }
    },
    components: { CardProducto }
}
</script>
<style scoped>
.filter{
    filter: invert(36%) sepia(85%) saturate(956%) hue-rotate(127deg) brightness(93%) contrast(96%);
}
</style>
