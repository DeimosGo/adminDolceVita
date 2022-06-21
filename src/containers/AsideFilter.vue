<template>
<transition name="fade">
    <CardProducto v-if="card" @showProd="showcard" @created="created" />
</transition>
<div @click="showcard" v-if="card" class="absolute w-full top-0 right-0 bottom-0 h-100v bg-gray-900 opacity-20 z-20 cursor-pointer"></div>
    <section
        class="relative flex flex-col text-gray-700 items-center justify-between space-y-3 rounded-md"
    >
    <div class="flex flex-row space-x-6">
        <button
        @click="showcard"
        class="flex space-x-1 items-center h-10 px-1 rounded-md border-2 text-submarine-600 border-submarine-600
            transition-all duration-100 hover:scale-105">
                <p>Nuevo</p> <img class="w-4 image" src="./../assets/add.svg" alt="Nuevo Producto"></button>
        <button
            @click="showFilter"
            class="h-10 px-1 z-10 rounded-lg text-azureMarine-800 text-lg flex items-center border-2
            border-azureMarine-800 space-x-2 transition-all duration-100 hover:scale-105">
            Filtros<img class="w-5 filter ml-2" src="./../assets/sort.png" alt="Filtros"/>
        </button>
        </div>
        <div v-show="showAll" :class="animacion" class="absolute top-10 right-0 pl-6 w-72 flex flex-col
            h-fit p-2 items-start border rounded-lg border-gray-300 text-azureMarine-800 bg-white-0
            z-0 shadow-gray-300 shadow-sm">
                <h3 class="text-lg pb-1">Categorias</h3>
                <div class="pl-3 flex flex-col space-y-2 items-start">
                    <FiltroButton
                        v-for="item in itemsCategoria"
                        :item="item"
                        :key="item.idCategoria"
                        v-bind="$attrs"
                    />
                </div>
                <h3 class="text-lg pt-2 pb-1">Precios</h3>
                <div class="py-2 w-full flex flex-col items-start text-gray-900">
                    <ul class="flex flex-row pl-3 space-x-2 items-center justify-center">
                        <li class="flex space-x-2">
                            <label>Min</label>
                            <input
                                class="w-10 pl-1 outline-none rounded-lg border border-azureMarine-800"
                                v-model="min"
                                type="number"
                            />
                        </li>
                        <li class="flex space-x-2">
                            <label>Max</label>
                            <input
                                type="number"
                                v-model="max"
                                class="w-10 pl-1 outline-none rounded-lg border border-azureMarine-800"
                            />
                        </li>
                        <ul>
                            <button class="text-white-0 bg-azureMarine-800 px-2 py-1 rounded-md">
                                aplicar
                            </button>
                        </ul>
                    </ul>
                </div>
                <h3 class="text-lg pt-1 pb-2">Stock</h3>
                <div class="space-y-1 pl-3 w-full flex flex-col items-start text-gray-900">
                        <button @click="dispose" :class="dBtn">disponible</button>
                        <button @click="non" :class="aBtn">agotado</button>
                </div>
            </div>
    </section>
</template>
<script>
import Categorias from "@/services/CategoriasService";
import FiltroButton from "@/components/FiltroButton.vue";
import CardProducto from "@/components/CardProducto.vue";
export default {
    components: { FiltroButton, CardProducto },
    name: "AsideFilter",
    watch: {
        min() {
            if (this.min < 0) {
                this.min = 0;
            }
        },
        max() {
            if (this.max < 0) {
                this.min = 0;
            }
        },
    },
    data() {
        return {
            card:false,
            animacion: [],
            showAll: false,
            checked: false,
            min: 0,
            max: 0,
            categorias: new Categorias(),
            itemsCategoria: [],
            disponible: false,
            agotado: false,
            dBtn:["text-gray-900"],
            aBtn:["text-gray-900"],
        };
    },
    methods: {
        created(){
            this.card = !this.card;
            this.$emit("advice");
        },
        showcard(){
            this.card = !this.card;
            this.showAll = false;
        },
        dispose(){
            if (!this.disponible){
                this.disponible = !this.disponible;
                this.dBtn = ["font-bold", "text-azureMarine-800"];
            }else{
                this.disponible = !this.disponible;
                this.dBtn = ["text-gray-900"];
            }
        },
        non(){
            if (!this.agotado){
                this.agotado = !this.agotado;
                this.aBtn = ["font-bold", "text-azureMarine-800"];
            }else{
                this.agotado = !this.agotado;
                this.aBtn = ["text-gray-900"];
            }
        },
        showFilter() {
            if (!this.showAll) {
                this.showAll = !this.showAll;
                this.animacion.pop();
                this.animacion.push("animacionIn");
            } else {
                this.animacion.pop();
                this.animacion.push("animacionOut");
                setTimeout(() => {
                    this.showAll = !this.showAll;
                    this.animacion.pop();
                }, 100);
            }
        },
        async listCategorias() {
            const categorias = await this.categorias.getCategorias();
            if (categorias.status == 200) {
                const data = await categorias.data;
                this.itemsCategoria = data;
            }
        },
    },
    mounted() {
        this.listCategorias();
    },
};
</script>
<style scoped>
/* .fade-enter-from, */
.fade-leave-active{
    animation: outCard 300ms;
}

@keyframes outCard {
    from{
        top: 0;
        opacity: 1;
    }
    to{
        top: -800px;
        opacity: 0;
    }
}

.fade-enter-active{
    animation: animacionCard 300ms;
}

@keyframes animacionCard {
    from{
        top: -800px;
        opacity: 0.8;
    }
    to{
        top: 0;
        opacity: 1;
    }
}
.image{
    filter: invert(32%) sepia(67%) saturate(2915%) hue-rotate(145deg) brightness(94%) contrast(96%);
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
.animacionIn {
    animation-name: showfilter;
    animation-duration: 200ms;
}
@keyframes showfilter {
    0% {
        top: -10px;
        opacity: 10%;
    }
}
.animacionOut {
    animation-name: hidefilter;
    animation-duration: 200ms;
}
@keyframes hidefilter {
    0% {
        top: 36px;
        opacity: 100%;
    }
    100% {
        top: -10px;
        opacity: 0%;
    }
}
.filter {
    filter: invert(29%) sepia(21%) saturate(3969%) hue-rotate(173deg)
        brightness(84%) contrast(95%);
}
.path {
    clip-path: polygon(
        58% 0,
        62% 12%,
        100% 12%,
        100% 100%,
        0 100%,
        0 12%,
        50% 12%
    );
}
</style>
