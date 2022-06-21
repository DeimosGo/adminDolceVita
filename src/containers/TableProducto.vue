<template>
<div class="w-full flex flex-col overflow-scroll lg:overflow-auto space-y-4 lg:w-10/12 md:mt-7 sm:mt-7">
    <table class="w-full text-center min-w-500">
    <tr class="text-sm lg:text-md bg-azureMarine-800 h-10 text-white-0 font-semibold">
        <td class="w-1/5">Nombre</td>
        <td class="w-1/5">Stock</td>
        <td class="w-1/5">Precio</td>
        <td class="w-1/5">Cantidad de ventas</td>
        <td class="w-1/5">Acciones</td>
    </tr>
    <ProductoRow v-for="(item) in productos" :key="item.idProducto" :product="item" />
</table>
<div class="w-full flex space-x-3 text-lg justify-center place-items-center">
    <button @click="before" class="text-azureMarine-800 border-card"> <img class="w-4 rounded-sm arrow border border-card p-1" src="./../assets/left.svg" alt="Atras"> </button>
    <p class="text-card text-md font-semibold">{{actual}} de {{paginas}}</p>
    <button @click="after" class="text-azureMarine-800"> <img class="w-4 rounded-sm arrow border border-card p-1" src="./../assets/right.svg" alt="Siguente"> </button>
</div>
</div>
</template>
<script>
import ProductoRow from '../components/ProductoRow.vue';
export default {
    name: "CardProducto",
    props:{
        paginas: Number,
        actual: Number,
    },
    components: { ProductoRow },
    inject: {
    productList: {
        from: "productList",
        },
    },
    computed:{
        list(){
            if(this.paginas === 1){
                return this.actual;
            }else{
                return `${this.actual} ... ${this.paginas}`
            }
        }
    },
    data () {
        return {
            productos: this.productList,
        }
    },
    methods:{
        before(){
            this.$emit('before');
        },
        after(){
            this.$emit("after");
        }
    }
}
</script>
<style scoped>
.arrow {
    filter: invert(23%) sepia(13%) saturate(7206%) hue-rotate(336deg) brightness(114%) contrast(83%);
}
table {
    border-collapse: separate;
    border-spacing: 0;
}

td {
    border-style: none solid solid none;
    padding: 10px;
}

tr:first-child td:first-child { border-top-left-radius: 10px; }
tr:first-child td:last-child { border-top-right-radius: 10px; }

tr:last-child td:first-child { border-bottom-left-radius: 10px; }
tr:last-child td:last-child { border-bottom-right-radius: 10px; }

tr:first-child td { border-top-style: solid; }
tr td:first-child { border-left-style: solid; }
</style>
