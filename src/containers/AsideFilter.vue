<template>
    <section
        class="relative flex flex-col text-gray-700 items-center justify-between space-y-3 rounded-md"
    >
        <button
            @click="showFilter"
            class="h-10 px-1 z-20 rounded-lg text-azureMarine-800 text-lg flex items-center border-2 border-azureMarine-800 space-x-2"
        >Filtros<img class="w-5 filter ml-2" src="./../assets/sort.png" alt="Filtros" />
        </button>
        <KeepAlive>
            <div v-show="showAll" :class="animacion" class="absolute top-9 right-0 pl-6 w-64 flex flex-col
            h-fit p-2 items-start border rounded-lg border-gray-300 text-azureMarine-800 bg-white-0
            z-10 shadow-gray-300 shadow-sm">
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
                    <ul class="flex flex-row pl-3 space-x-2">
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
                    </ul>
                </div>
                <h3 class="text-lg pt-1 pb-2">Stock</h3>
                <div class="space-y-1 pl-3 w-full flex flex-col items-start text-gray-900">
                        <button for="disponible">disponible</button>
                        <button for="agotado">agotado</button>
                </div>
            </div>
        </KeepAlive>
    </section>
</template>
<script>
import Categorias from "@/services/CategoriasService";
import FiltroButton from "@/components/FiltroButton.vue";
export default {
    components: { FiltroButton },
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
            animacion: [],
            showAll: false,
            checked: false,
            min: 0,
            max: 0,
            categorias: new Categorias(),
            itemsCategoria: [],
        };
    },
    methods: {
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
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
.animacionIn {
    animation-name: showfilter;
    animation-duration: 100ms;
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
