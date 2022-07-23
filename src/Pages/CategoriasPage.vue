<template>
    <div v-if="loading" class="w-full h-100v grid place-content-center z-40">
        <LoadingWheel />
    </div>
    <div
        @click="closeCard"
        v-if="back"
        class="absolute w-screen top-0 right-0 bottom-0 h-100v bg-gray-900 opacity-20 z-20 cursor-pointer"
    ></div>
    <transition name="fade">
        <CardCategoria
            @created="created"
            @nuevaCategoria="nuevaCategoria"
            @createdElement="createdElement"
            v-if="card"
            class="absolute left-0 right-0 top-0 bottom-0 m-auto"
        />
    </transition>
    <transition name="componentCreated">
        <CreatedElement v-show="created" :message="mensaje" />
    </transition>
    <div
        v-show="!loading"
        class="pt-16 w-full px-2 lg:px-10 h-100v flex place-content-center flex-col lg:items-end justify-center"
    >
        <div
            class="w-full lg:w-4/5 flex flex-col lg:flex-row items-center justify-center lg:justify-between"
        >
            <transition name="nfCard">
                <NotFoundSearch v-if="found" />
            </transition>
            <h2 class="text-card text-3xl font-bold">
                {{ cantidad }} Categorias
            </h2>
            <div
                class="flex items-center justify-center place-content-center space-x-4"
            >
                <NewCategorias @nuevaCategoria="nuevaCategoria" />
                <ReiniciarFiltros @recargar="recargar" />
                <InputBusqueda
                    @showcard="showcard"
                    @search="search"
                    :phText="'Categoria'"
                />
            </div>
        </div>
        <div
            class="flex flex-col items-center justify-center lg:items-end w-full h-5/6"
        >
            <transition name="table">
                <TableCategoria
                v-if="!loading"
                    :categorias="categorias"
                    :paginas="paginas"
                    :actual="actual"
                    @after="after"
                    @before="before"
                    @edited="edited"
                    @deleted="deleted"
                    @ordenarNombre="ordenarNombre"
                >
                    <div
                        v-if="noBuscar"
                        class="w-full flex space-x-3 text-lg justify-center place-items-center"
                    >
                        <button @click="before">
                            <i
                                class="fa-solid fa-caret-left text-xl text-card"
                            ></i>
                        </button>
                        <p class="text-card text-md font-semibold">
                            {{ actual }} de {{ paginas }}
                        </p>
                        <button @click="after" class="text-azureMarine-800">
                            <i
                                class="fa-solid fa-caret-right text-xl text-card"
                            ></i>
                        </button>
                    </div>
                </TableCategoria>
            </transition>
        </div>
    </div>
</template>
<script>
import { defineAsyncComponent } from "vue";
import TableCategoria from "@/containers/TableCategoria.vue";
import LoadingWheel from "@/components/LoadingWheel.vue";
import InputBusqueda from "@/components/InputBusqueda.vue";
const CreatedElement = defineAsyncComponent(() =>
    import("@/components/CreatedElement.vue")
);
const NotFoundSearch = defineAsyncComponent(() =>
    import("@/components/NotFoundSearch.vue")
);
import Categoria from "@/services/CategoriasService";
import NewCategorias from "../containers/NewCategorias.vue";
import CardCategoria from "../components/CardCategoria.vue";
import ReiniciarFiltros from "@/components/ReiniciarFiltros.vue";
export default {
    name: "ProductPage",
    components: {
        CreatedElement,
        TableCategoria,
        LoadingWheel,
        InputBusqueda,
        NotFoundSearch,
        NewCategorias,
        CardCategoria,
        ReiniciarFiltros,
    },
    emits: ["side"],
    data() {
        return {
            back: false,
            initOrderNombre: false,
            card: false,
            mensaje: "",
            tableAnimation: [],
            noBuscar: true,
            created: false,
            loaded: false,
            productName: "",
            loading: true,
            categorias: [],
            cantidad: 0,
            found: false,
            CategoriaService: new Categoria(),
            paginas: 1,
            actual: 1,
            initFilter: false,
            limit: 10,
            offset: 0,
        };
    },
    methods: {
        async edited(item) {
            console.log(item);
            let categorias = JSON.parse(JSON.stringify(this.categorias));
            for (let i = 0; i < categorias.length; i++) {
                if (categorias[i].idCategoria == item.idCategoria) {
                    categorias[i] = item;
                }
            }
            this.categorias = categorias;
            this.loading = !this.loading;
            setTimeout(() => (this.loading = !this.loading), 100);
            await this.advice("Cambios guardados");
        },
        closeCard() {
            this.back = !this.back;
            this.card = false;
        },
        async deleted(id){
            const data = await this.CategoriaService.deleteCategoria(id);
            if (data.status == 200) {
                let categorias = JSON.parse(JSON.stringify(this.categorias));
                let filtro = [];
                categorias.forEach((element) => {
                    if (element.idCategoria !== id) {
                        filtro.push(element);
                    }
                });
                this.categorias = filtro;
                this.cantidad -= 1;
                await this.advice("Registro eliminado");
            }
        },
        async recargar() {
            this.initFilter = false;
            this.noBuscar = true;
            await this.load();
        },
        createdElement() {
            this.card = false;
            this.back = false;
            this.advice("Elemento creado");
            this.countCategorias();
            this.load();
        },
        nuevaCategoria() {
            this.back = !this.back;
            this.card = !this.card;
        },
        ordenarNombre() {
            if (this.initOrderNombre) {
                const categorias = JSON.parse(JSON.stringify(this.categorias));
                const categoriasOrder = categorias.sort(function (a, b) {
                    if (a.nombreCategoria > b.nombreCategoria) {
                        return -1;
                    }
                    if (a.nombreCategoria < b.nombreCategoria) {
                        return 1;
                    }
                    return 0;
                });
                this.categorias = categoriasOrder;
                this.initOrderNombre = !this.initOrderNombre;
            } else {
                const categorias = JSON.parse(JSON.stringify(this.categorias));
                const categoriasOrder = categorias.sort(function (a, b) {
                    if (a.nombreCategoria < b.nombreCategoria) {
                        return -1;
                    }
                    if (a.nombreCategoria > b.nombreCategoria) {
                        return 1;
                    }
                    return 0;
                });
                this.categorias = categoriasOrder;
                this.initOrderNombre = !this.initOrderNombre;
            }
        },
        async before() {
            if (this.offset >= 10) {
                this.offset -= 10;
                await this.load();
                this.actual -= 1;
            }
        },
        async after() {
            if (this.offset < this.paginas) {
                this.offset += 10;
                await this.load();
                this.actual += 1;
            }
        },
        async advice(mensaje) {
            this.mensaje = mensaje;
            this.created = !this.created;
            setTimeout(() => {
                this.created = !this.created;
            }, 3000);
        },
        showcard() {
            this.card = !this.card;
        },
        async search(value) {
            if (value.length <= 0) {
                this.noBuscar = true;
                await this.load();
            } else {
                const response = await this.CategoriaService.getCategoriasName(
                    value
                );
                const datos = response.data;
                if (datos.length <= 0) {
                    this.found = true;
                    setTimeout(() => {
                        this.found = false;
                    }, 3200);
                } else {
                    this.noBuscar = false;
                    this.categorias = datos;
                }
                setTimeout(() => {
                    this.loading = false;
                    console.clear();
                }, 500);
            }
        },
        filtroStock() {
            this.initFilter = !this.initFilter;
            /* datos.forEach((element) => {
                this.productos.push(element);
                }); */
        },
        async quitar(value) {
            const valor = Number.parseInt(value);
            let productosSinCat = [];
            let data = JSON.parse(JSON.stringify(this.productos));
            data.forEach((item) => {
                console.log(typeof item.idCategoria);
                console.log(typeof valor);
                if (item.idCategoria !== valor) {
                    productosSinCat.push(item);
                }
            });
            this.productos = productosSinCat;
            if (productosSinCat.length <= 0) {
                this.noBuscar = true;
                this.initFilter = false;
                this.load();
            }
        },
        async countCategorias() {
            const respuesta = await this.CategoriaService.getCategoriasCount();
            if (respuesta.status == 200) {
                const data = await respuesta.data;
                this.cantidad = data.cantidad;
                const cantidad = data.cantidad / 10;
                if (cantidad % 2 !== 0) {
                    this.paginas = Math.floor(cantidad) + 1;
                }
            } else {
                return "error";
            }
        },

        async load() {
            this.loading = true;
            const respuesta = await this.CategoriaService.getCategorias(
                this.limit,
                this.offset
            );
            if (respuesta.status == 200) {
                const data = respuesta.data;
                this.categorias = data;
                this.loading = false;
            }
        },
    },
    mounted() {
        this.load();
        this.countCategorias();
    },
};
</script>
<style scoped>
.componentCreated-leave-active {
    animation: outCard 1000ms;
}

@keyframes outCard {
    from {
        transform: scale(1);
        opacity: 1;
    }
    to {
        opacity: 0;
        transform: scale(0);
    }
}

.componentCreated-enter-active {
    animation: animacionCard 300ms;
}

@keyframes animacionCard {
    0% {
        transform: scale(0.2);
        opacity: 0.1;
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
}
.table-enter-active {
    animation-name: animacion;
    animation-duration: 600ms;
    place-self: end;
}
@keyframes animacion {
    0% {
        opacity: 0.1;
        transform: translateY(-150px) scale(0.8);
    }
}
.image {
    filter: invert(32%) sepia(67%) saturate(2915%) hue-rotate(145deg)
        brightness(94%) contrast(96%);
}
</style>
