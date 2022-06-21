<template>
    <div v-if="loading" class="w-full h-100v grid place-content-center z-40">
        <LoadingWheel />
    </div>
    <NotFound />
    <transition name="componentCreated">
        <CreatedElement v-show="created" />
    </transition>
    <div
        v-if="!loading"
        class="pt-16 w-full px-2 lg:px-10 h-100v flex place-content-center flex-col lg:items-end justify-center"
    >
        <div class="w-4/5 flex items-center justify-between">
            <h2 class="text-card text-3xl font-bold">
                {{ cantidad }} Productos
            </h2>
            <div
                class="flex space-x-7 items-center justify-center place-content-center"
            >
                <AsideFilter
                    @filtrar="filtro"
                    @quitar="quitar"
                    @advice="advice"
                />
                <InputBusqueda @showcard="showcard" @search="search" />
            </div>
        </div>
        <div
            class="flex flex-col items-center justify-center lg:items-end w-full h-5/6"
        >
            <TableProducto
                :paginas="paginas"
                :actual="actual"
                :class="tableAnimation"
                @after="after"
                @before="before"
            />
        </div>
    </div>
</template>
<script>
import { computed } from "vue";
import AsideFilter from "@/containers/AsideFilter.vue";
import TableProducto from "@/containers/TableProducto.vue";
import LoadingWheel from "@/components/LoadingWheel.vue";
import InputBusqueda from "@/components/InputBusqueda.vue";
import CreatedElement from "@/components/CreatedElement.vue";
import NotFound from "@/components/NotFoundSearch.vue";
import Producto from "./../services/ProductoService";
export default {
    name: "ProductPage",
    components: {
        AsideFilter,
        CreatedElement,
        TableProducto,
        LoadingWheel,
        InputBusqueda,
        NotFound,
    },
    data() {
        return {
            card: false,
            tableAnimation: [],
            created: false,
            loaded: false,
            productName: "",
            loading: true,
            productos: [],
            cantidad: 0,
            found: false,
            ProductoService: new Producto(),
            paginas: 1,
            actual: 1,
            initFilter: false,
            limit: 10,
            offset: 0,
        };
    },
    provide() {
        return {
            productList: computed(() => this.productos),
            isEmpty: computed(() => this.found),
        };
    },
    methods: {
        async before() {
            if (this.offset >= 10) {
                this.offset -= 10;
                await this.load();
                this.actual-=1;
            }
        },
        async after() {
            if (this.offset <= this.paginas) {
                this.offset += 10;
                await this.load();
                this.actual+=1;
            }
        },
        async advice() {
            await this.load();
            this.created = !this.created;
            setTimeout(() => {
                this.created = !this.created;
            }, 4000);
        },
        showcard() {
            this.card = !this.card;
        },
        async search(value) {
            if (value.length <= 0) {
                await this.load();
            } else {
                const response = await this.ProductoService.getProductosSearch(
                    value
                );
                const datos = response.data;
                if (datos.length <= 0) {
                    this.found = true;
                    setTimeout(() => {
                        this.found = false;
                    }, 3200);
                } else {
                    console.log(datos);
                    this.productos = datos;
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
        async filtro(value) {
            console.log(value);
            const response = await this.ProductoService.getProductosCategoria(
                value
            );
            const datos = response.data;
            console.log(datos);
            if (datos.length <= 0) {
                this.found = true;
                setTimeout(() => {
                    this.found = false;
                }, 3200);
            } else {
                console.log(datos);
                if (this.initFilter === false) {
                    this.productos = datos;
                    this.initFilter = !this.initFilter;
                } else {
                    datos.forEach((element) => {
                        this.productos.push(element);
                    });
                }
            }
            setTimeout(() => {
                this.loading = false;
                console.clear();
            }, 500);
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
                this.initFilter = false;
                this.load();
            }
        },
        async countProductos() {
            const respuesta = await this.ProductoService.getProductosCount();
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
            const respuesta = await this.ProductoService.getProductos(
                this.limit,
                this.offset,
            );
            if (respuesta.status == 200) {
                const data = await respuesta.data;
                this.productos = data;
                this.loading = false;
                setTimeout(() => {
                    console.clear();
                }, 50);
            }
            this.loaded = !this.loaded;
            this.animationT();
        },
        async animationT() {
            this.tableAnimation.pop();
            this.tableAnimation.push("table");
            setTimeout(() => {
                this.tableAnimation.pop();
            }, 600);
        },
    },
    mounted() {
        this.load();
        this.countProductos();
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
.table {
    animation-name: animacion;
    animation-duration: 600ms;
}
@keyframes animacion {
    0% {
        opacity: 0.1;
        transform: translateY(-200px) scale(0.8);
    }
}
.image {
    filter: invert(32%) sepia(67%) saturate(2915%) hue-rotate(145deg)
        brightness(94%) contrast(96%);
}
</style>
