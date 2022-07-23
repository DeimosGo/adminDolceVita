<template>
<div class="w-full flex justify-end">
    <div @click="editar" v-if="showEditar" class="absolute w-full top-0 right-0 bottom-0 h-100v bg-gray-900 opacity-20 z-10 cursor-pointer"></div>
    <div @click="eliminar" v-if="showEliminar" class="absolute w-full top-0 right-0 bottom-0 h-100v bg-gray-900 opacity-20 z-10 cursor-pointer"></div>
    <CardEditCategoria v-if="showEditar" :categoria="categoria" @editar="editar" @edited="edited" />
    <CardDeleteElement @deleted="deleted" @eliminar="eliminar" v-if="showEliminar" />
    <div class="w-full flex flex-col overflow-scroll max-h-65v scrollTable lg:overflow-auto space-y-4 lg:w-10/12 lg:mt-0 mt-7">
        <table class="w-full text-center min-w-580">
            <tr
                class="text-sm lg:text-md bg-azureMarine-600 h-10 text-white-0 font-semibold"
            >
                <td class="w-1/4">
                    <div class="w-1/2 m-auto cursor-pointer" @click="ordenarNombre">Nombre <i class="fa-solid fa-arrow-down-short-wide"></i></div>
                </td>
                <td class="w-2/4">Descripcion</td>
                <td class="w-1/4">Acciones</td>
            </tr>
            <CategoriaRow
            @eliminar="eliminar"
            @mostrarEdit="mostrarEdit"
                v-for="item in categories"
                :key="item.idCategoria"
                :categoria="item"
            />
        </table>
        <slot></slot>
    </div>
    </div>
</template>
<script>
import { computed, defineAsyncComponent } from '@vue/runtime-core';
import CategoriaRow from "../components/CategoriaRow.vue";
const CardEditCategoria = defineAsyncComponent(()=>import('@/components/CardEditCategoria.vue'));
const CardDeleteElement = defineAsyncComponent(()=>import('@/components/CardDeleteElement.vue'));
export default {
    name: "CardProducto",
    props: {
        categorias: Array,
        paginas: Number,
        actual: Number,
    },
    components: { CategoriaRow, CardEditCategoria, CardDeleteElement },
    setup(props){
        let categories = computed(()=>{
            return props.categorias
        });
        return {
            categories
        }
    },
    data() {
        return {
            showEditar: false,
            showEliminar: false,
            categoria: {},
            idCategoria:0,
        };
    },
    emits:['before', 'after', 'ordenarNombre', 'edited'],
    methods: {
        deleted(){
            this.showEliminar = !this.showEliminar;
            this.$emit('deleted', this.idCategoria);
            this.idCategoria = 0;
        },
        edited(item){
            this.editar();
            this.$emit('edited', item);
        },
        eliminar(id){
            this.idCategoria = id;
            this.showEliminar = !this.showEliminar;
        },
        editar(){
            this.showEditar = !this.showEditar;
        },
        mostrarEdit(item){
            this.categoria = item;
            this.showEditar = !this.showEditar;
        },
        ordenarNombre() {
            this.$emit('ordenarNombre');
        },
        before() {
            this.$emit("before");
        },
        after() {
            this.$emit("after");
        },
    },
};
</script>
<style scoped>

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
.arrow {
    filter: invert(23%) sepia(13%) saturate(7206%) hue-rotate(336deg)
        brightness(114%) contrast(83%);
}
table {
    border-collapse: separate;
    border-spacing: 0;
}

td {
    border-style: none solid solid none;
    padding: 10px;
}

tr:first-child td:first-child {
    border-top-left-radius: 10px;
}
tr:first-child td:last-child {
    border-top-right-radius: 10px;
}

tr:last-child td:first-child {
    border-bottom-left-radius: 10px;
}
tr:last-child td:last-child {
    border-bottom-right-radius: 10px;
}

tr:first-child td {
    border-top-style: solid;
}
tr td:first-child {
    border-left-style: solid;
}
</style>
