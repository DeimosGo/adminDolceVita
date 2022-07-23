<template>
<div class="w-full flex justify-end">
<div @click="editar" v-if="showEditarProducto" class="absolute w-full top-0 right-0 bottom-0 h-100v bg-gray-900 opacity-20 z-10 cursor-pointer"></div>
<div @click="eliminar" v-if="showEliminarProducto" class="absolute w-full top-0 right-0 bottom-0 h-100v bg-gray-900 opacity-20 z-10 cursor-pointer"></div>
<transition name="showEditar">
    <CardEditProducto v-if="showEditarProducto" :producto="producto" @edited="edited" @cerrar="cerrar" />
</transition>
<transition name="showEliminar">
    <CardDeleteElement v-if="showEliminarProducto" @deleted="deleted" @eliminar="eliminar"/>
</transition>
<div class="w-full flex flex-col overflow-scroll max-h-65v scrollTable lg:overflow-auto space-y-4 lg:w-10/12 lg:mt-0 mt-7">
    <table class="relative w-full text-center min-w-580">
    <tr class="text-sm lg:text-md bg-azureMarine-600 h-10 text-white-0 font-semibold">
        <td class="w-1/5">
            <div class="w-1/2 m-auto cursor-pointer" @click="ordenarNombre">Nombre <i class="fa-solid fa-arrow-down-short-wide"></i></div>
        </td>
        <td class="w-1/5">
            <div class="w-1/2 m-auto cursor-pointer" @click="ordenarStock">Stock <i class="fa-solid fa-arrow-down-short-wide"></i></div>
        </td>
        <td class="w-1/5">
            <div class="w-1/2 m-auto cursor-pointer" @click="ordenarPrecio">Precio <i class="fa-solid fa-arrow-down-short-wide"></i></div>
        </td>
        <td class="w-1/5">
            <div class="w-1/2 m-auto cursor-pointer" @click="ordenarCantidad">Ventas <i class="fa-solid fa-arrow-down-short-wide"></i></div>
        </td>
        <td class="w-1/5">Acciones</td>
    </tr>
    <ProductoRow v-for="item in products" @editar="editar" @eliminar="eliminar" :key="item.idProducto" :product="item" />
</table>
<slot></slot>
</div>
</div>
</template>
<script>
import ProductoRow from '../components/ProductoRow.vue';
import CardEditProducto from '@/components/CardEditProducto.vue';
const CardDeleteElement = defineAsyncComponent(()=> import("@/components/CardDeleteElement.vue"));
import { computed, defineAsyncComponent } from '@vue/runtime-core';
export default {
    name: "TableProducto",
    props:{
        productos: Array,
        paginas: Number,
        actual: Number,
    },
    components: { ProductoRow, CardEditProducto, CardDeleteElement },
    emits:['before','after', 'edited', 'eliminar', 'ordenarStock', 'ordenarNombre', 'ordenarPrecio', 'ordenarCantidad'],
    computed:{
        list(){
            if(this.paginas === 1){
                return this.actual;
            }else{
                return `${this.actual} ... ${this.paginas}`
            }
        }
    },
    setup(props){
        let products = computed(()=>{
            return props.productos
        });
        return {
            products
        }
    },
    data () {
        return {
            showEditarProducto:false,
            showEliminarProducto:false,
            producto:{},
            idDeleted:0
        }
    },
    methods:{
        deleted(){
            this.$emit('eliminar', this.idDeleted);
            this.showEliminarProducto = !this.showEliminarProducto;
            this.idDeleted = 0;
        },
        eliminar(id){
            this.idDeleted = id;
            this.showEliminarProducto = !this.showEliminarProducto;
        },
        edited(item){
            this.$emit('edited', item);
            this.showEditarProducto = !this.showEditarProducto;
        },
        editar(item){
            this.producto = item;
            this.showEditarProducto = !this.showEditarProducto;
        },
        cerrar(){
            this.showBackGray = !this.showBackGray;
            this.showEditarProducto = !this.showEditarProducto;
        },
        before(){
            this.$emit('before');
        },
        after(){
            this.$emit("after");
        },
        ordenarStock(){
            this.$emit('ordenarStock');
        },
        ordenarNombre(){
            this.$emit('ordenarNombre');
        },
        ordenarPrecio(){
            this.$emit('ordenarPrecio');
        },
        ordenarCantidad(){
            this.$emit('ordenarCantidad');
        }
    }
}
</script>
<style scoped>


/* ===== Scrollbar CSS ===== */
/* Firefox */
.scrollTable {
    scrollbar-width: auto;
    scrollbar-color: #d4d4d8 #ffffff;
}

/* Chrome, Edge, and Safari */
.scrollTable::-webkit-scrollbar {
    border-radius: 15px;
    width: 10px;
}

.scrollTable::-webkit-scrollbar-track {
    border-radius: 15px;
    background: #ffffff;
}

.scrollTable::-webkit-scrollbar-thumb {
    border-radius: 15px;
    background-color: #d4d4d8;
    border-radius: 10px;
    border: 3px solid #ffffff;
}

.showEliminar-enter-active{
    animation: enterDelete 250ms;
}

@keyframes enterDelete {
    0%{
        transform: scale(0.1);
    }

    80%{
        transform: scale(1.1);
    }

    100%{
        transform: scale(1);
    }
}

.showEliminar-leave-active{
    animation: leaveDelete 200ms;
}

@keyframes leaveDelete {
    from{
        opacity: 0.5;
        transform: scale(1);
    }
    to{
        opacity: 0;
        transform: scale(0.3);
    }
}

.showEditar-leave-active{
    animation: outCard 250ms;
}

@keyframes outCard {
    from{
        opacity: 1;
    }
    to{
        top: 200px;
        opacity: 0;
    }
}

.showEditar-enter-active{
    animation: animacionCard 250ms;
}

@keyframes animacionCard {
    from{
        opacity: 0.4;
        top: 200px;
    }
}
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
