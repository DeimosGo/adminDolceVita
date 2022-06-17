<template>
    <div v-if="loading" class="w-full h-100v grid place-content-center">
        <LoadingWheel />
    </div>
    <CardProducto />
    <NotFound />
    <div
        v-if="!loading"
        class="pt-16 w-full px-2 lg:px-10 h-100v flex place-content-center flex-col lg:items-end justify-center"
    >
        <div class="w-4/5 flex items-center justify-between">
            <h2 class="text-card text-3xl font-bold">Productos</h2>
            <div
                class="flex space-x-7 items-center justify-center place-content-center"
            >
                <AsideFilter @filtrar="filtro" @quitar="quitar" />
                <InputBusqueda v-on:search="search" />
            </div>
        </div>
        <div
            class="flex flex-col items-center justify-center lg:items-end w-full h-5/6"
        >
            <TableProducto :paginas="paginas" :actual="actual" />
        </div>
    </div>
</template>
<script>
import { computed } from "vue";
import AsideFilter from "@/containers/AsideFilter.vue";
import TableProducto from "@/containers/TableProducto.vue";
import LoadingWheel from "@/components/LoadingWheel.vue";
import InputBusqueda from "@/components/InputBusqueda.vue";
import NotFound from "@/components/NotFoundSearch.vue";
import CardProducto from "@/components/CardProducto.vue";
import Producto from "./../services/ProductoService";
export default {
    name: "ProductPage",
    components: {
        AsideFilter,
        TableProducto,
        LoadingWheel,
        InputBusqueda,
        NotFound,
        CardProducto,
    },
    data() {
        return {
            loaded: false,
            productName: "",
            loading: true,
            productos: [],
            found: false,
            ProductoService: new Producto(),
            paginas: 1,
            actual: 1,
            initFilter: false,
        };
    },
    provide() {
        return {
            productList: computed(() => this.productos),
            isEmpty: computed(() => this.found),
        };
    },
    methods: {
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
            if (productosSinCat.length >= 0) {
                this.load()
            }
        },
        async countProductos() {
            const respuesta = await this.ProductoService.getProductosCount();
            if (respuesta.status == 200) {
                const data = await respuesta.data;
                const cantidad = data.cantidad / 10;
                if (cantidad % 2 !== 0) {
                    let mod = 1 - (cantidad % 2);
                    this.paginas = mod + cantidad;
                }
            } else {
                return "error";
            }
        },
        async load() {
            this.loading = true;
            const respuesta = await this.ProductoService.getProductos();
            if (respuesta.status == 200) {
                const data = await respuesta.data;
                this.productos = data;
                this.loading = false;
                setTimeout(() => {
                    console.clear();
                }, 50);
            }
            this.loaded = !this.loaded;
        },
    },
    mounted() {
        this.load();
        this.countProductos();
    },
};
</script>
