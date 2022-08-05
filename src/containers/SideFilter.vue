<template>
    <div>
        <div
            @click="showcard"
            v-if="card"
            class="absolute w-screen top-0 right-0 bottom-0 h-100v bg-gray-900 opacity-20 z-20 cursor-pointer"
        ></div>
        <transition name="fade">
            <CardProducto v-if="card" @showProd="showcard" @created="created" class="absolute top-0 left-0 right-0 bottom-0 m-auto" />
        </transition>
        <section
            class="relative flex flex-col text-gray-700 items-center justify-between space-y-3 rounded-md"
        >
            <div class="flex flex-row space-x-6">
                <button
                    @click="showcard"
                    class="flex space-x-1 items-center h-10 px-2 rounded-md border-2 text-submarine-600 border-submarine-600 transition-all
                    duration-100 hover:scale-105 bg-white-0"
                >
                    <p>Nuevo</p>
                    <i class="fa-solid fa-file-circle-plus w-4"></i>
                </button>
                <button
                    @click="showFilter"
                    class="h-10 px-1 z-10 rounded-lg text-azureMarine-800 text-lg flex items-center border-2 border-azureMarine-800 space-x-2
                    transition-all duration-100 hover:scale-105 bg-white-0"
                >
                    <p>Filtrar</p>
                    <i class="fa-solid fa-filter"></i>
                </button>
            </div>
            <div
                v-show="showAll"
                :class="animacion"
                class="absolute top-11 right-0 w-56 flex flex-col h-fit p-2 items-center left-0 border rounded-lg
                border-gray-300 text-azureMarine-800 bg-white-0 z-10 shadow-gray-300 shadow-sm"
            >
                <h3 class="w-full text-center text-lg pb-1">Categorias</h3>
                <div class="w-full grid grid-cols-2 items-center gap-2 text-start place-content-center p-1">
                    <FiltroButton
                        v-for="item in itemsCategoria"
                        :item="item"
                        :key="item.idCategoria"
                        v-bind="$attrs"
                    />
                </div>
            </div>
        </section>
    </div>
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
            card: false,
            animacion: [],
            showAll: false,
            checked: false,
            min: 0,
            max: 0,
            categorias: new Categorias(),
            itemsCategoria: [],
            disponible: false,
            agotado: false,
            dBtn: ["text-gray-900"],
            aBtn: ["text-gray-900"],
        };
    },
    emits: ["advice"],
    methods: {
        created() {
            this.card = !this.card;
            this.$emit("advice", "Elemento creado");
        },
        showcard() {
            this.card = !this.card;
            this.showAll = false;
        },
        dispose() {
            if (!this.disponible) {
                this.disponible = !this.disponible;
                this.dBtn = ["font-bold", "text-azureMarine-800"];
                this.$emit('filtroStock', true);
            } else {
                this.disponible = !this.disponible;
                this.dBtn = ["text-gray-900"];
                this.$emit('filtroStock', false);
            }
        },
        non() {
            if (!this.agotado) {
                this.agotado = !this.agotado;
                this.aBtn = ["font-bold", "text-azureMarine-800"];
            } else {
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
            const categorias = await this.categorias.getCategorias(100, 0);
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
.fade-leave-active {
    animation: outCard 300ms;
}

@keyframes outCard {
    from {
        top: 0;
        opacity: 1;
    }
    to {
        top: -800px;
        opacity: 0;
    }
}

.fade-enter-active {
    animation: animacionCard 300ms;
}

@keyframes animacionCard {
    from {
        top: -800px;
        opacity: 0.8;
    }
    to {
        top: 0;
        opacity: 1;
    }
}
.image {
    filter: invert(32%) sepia(67%) saturate(2915%) hue-rotate(145deg)
        brightness(94%) contrast(96%);
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
