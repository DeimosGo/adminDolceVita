<template>
    <div v-if="loading" class="w-full h-100v grid place-content-center z-40">
        <LoadingWheel />
    </div>
    <transition name="componentCreated">
        <CreatedElement v-show="created" :message="mensaje" />
    </transition>
    <div
        v-show="!loading"
        class="pt-16 w-full px-2 lg:px-10 h-100v flex place-content-center flex-col lg:items-end justify-center"
    >
            <div class="w-full lg:w-4/5 flex flex-col lg:flex-row items-center
            justify-center lg:justify-between space-y-2 lg:space-y-0">
            <transition name="nfCard">
                <NotFoundSearch v-if="found" />
            </transition>
            <h2 class="text-card text-3xl font-bold">
                {{ cantidad }} Productos
            </h2>
            <div
                class="flex flex-col lg:flex-row lg:space-x-7 items-center justify-center place-content-center"
            >
                <div class="flex">
                    <SideFilter
                    v-if="reiniciar"
                    @filtrar="filtro"
                    @quitar="quitar"
                    @advice="advice"
                />
                <ReiniciarFiltros @recargar="recargar" />
                </div>
                <InputBusqueda
                    @showcard="showcard"
                    @search="search"
                    :phText="'Producto'"
                />
            </div>
        </div>
        <div
            class="flex flex-col items-center justify-center lg:items-end w-full h-5/6"
        >
            <transition name="table">
                <TableProducto
                    v-if="!loading"
                    :productos="productos"
                    :class="tableBar"
                    @ordenarStock="ordenarStock"
                    @ordenarPrecio="ordenarPrecio"
                    @ordenarNombre="ordenarNombre"
                    @ordenarCantidad="ordenarCantidad"
                    @after="after"
                    @before="before"
                    @advice="advice"
                    @edited="edited"
                    @eliminar="eliminar"
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
                </TableProducto>
            </transition>
        </div>
    </div>
</template>
<script>
import { defineAsyncComponent } from "vue";
const SideFilter = defineAsyncComponent(() =>
    import("@/containers/SideFilter.vue")
);
const TableProducto = defineAsyncComponent(() =>
    import("@/containers/TableProducto.vue")
);
import LoadingWheel from "@/components/LoadingWheel.vue";
const InputBusqueda = defineAsyncComponent(() =>
    import("@/components/InputBusqueda.vue")
);
const ReiniciarFiltros = defineAsyncComponent(() =>
    import("@/components/ReiniciarFiltros.vue")
);
import CreatedElement from "@/components/CreatedElement.vue";
import NotFoundSearch from "@/components/NotFoundSearch.vue";
import Producto from "./../services/ProductoService";
export default {
    name: "ProductPage",
    components: {
        SideFilter,
        CreatedElement,
        TableProducto,
        LoadingWheel,
        InputBusqueda,
        NotFoundSearch,
        ReiniciarFiltros,
    },
    data() {
        return {
            initOrderStock: false,
            initOrderPrecio: false,
            initOrderNombre: false,
            initOrdenarCantidad: false,
            created: false,
            loaded: false,
            tableBar: [],
            productName: "",
            loading: true,
            productos: [],
            cantidad: 0,
            found: false,
            ProductoService: new Producto(),
            paginas: 1,
            actual: 1,
            initFilter: false,
            noBuscar: true,
            limit: 10,
            offset: 0,
            mensaje: "",
            reiniciar: true,
            counter: 1,
        };
    },
    sockets: {
        connect: function () {
        },
        customEmit: function (data) {
            data
        }
    },
    emits: ["side"],
    methods: {
        ordenarStock() {
            if (this.initOrderStock) {
                const productos = JSON.parse(JSON.stringify(this.productos));
                const productosOrder = productos.sort(function (a, b) {
                    if (a.stock > b.stock) {
                        return -1;
                    }
                    if (a.stock < b.stock) {
                        return 1;
                    }
                    return 0;
                });
                this.productos = productosOrder;
                this.initOrderStock = !this.initOrderStock;
            } else {
                const productos = JSON.parse(JSON.stringify(this.productos));
                const productosOrder = productos.sort(function (a, b) {
                    if (a.stock < b.stock) {
                        return -1;
                    }
                    if (a.stock > b.stock) {
                        return 1;
                    }
                    return 0;
                });
                this.productos = productosOrder;
                this.initOrderStock = !this.initOrderStock;
            }
        },
        async eliminar(id) {
            const data = await this.ProductoService.deleteProducto(id);
            if (data.status == 200) {
                let productos = JSON.parse(JSON.stringify(this.productos));
                let filtro = [];
                let product = {};
                productos.forEach((element) => {
                    if (element.idProducto !== id) {
                        filtro.push(element);
                    }else{
                        product = element;
                    }
                });
                this.productos = filtro;
                this.cantidad -= 1;
                await this.advice("Registro eliminado");
                console.log(product);
                this.$socket.emit('cliente:deleteProduct', product);
            }
        },
        async edited(item) {
            this.$socket.emit('cliente:editProduct', item);
            let productos = JSON.parse(JSON.stringify(this.productos));
            for (let i = 0; i < productos.length; i++) {
                if (productos[i].idProducto == item.idProducto) {
                    productos[i] = item;
                }
            }
            this.productos = productos;
            this.loading = !this.loading;
            setTimeout(() => (this.loading = !this.loading), 100);
            await this.advice("Cambios guardados");
        },
        async before() {
            if (this.offset >= 10) {
                this.counter--
                this.offset -= 10;
                await this.load();
                this.actual -= 1;
            }
        },
        async after() {
            if (this.counter < this.paginas) {
                this.counter++
                this.offset += 10;
                await this.load();
                this.actual += 1;
            }
        },
        async advice(mensaje) {
            await this.countProductos();
            this.mensaje = mensaje;
            this.created = !this.created;
            setTimeout(() => {
                this.created = !this.created;
            }, 4000);
        },
        showcard() {
            this.card = !this.card;
        },
        async recargar() {
            this.initFilter = false;
            this.noBuscar = true;
            this.reiniciar = false;
            setTimeout(() => {
                this.reiniciar = !this.reiniciar;
            }, 25);
            await this.load();
        },
        async search(value) {
            if (value.length <= 0) {
                this.initFilter = false;
                this.noBuscar = true;
                this.reiniciar = false;
                setTimeout(() => {
                    this.reiniciar = !this.reiniciar;
                }, 25);
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
                    }, 3000);
                } else {
                    this.noBuscar = false;
                    this.productos = datos;
                }
                setTimeout(() => {
                    this.loading = false;
                }, 500);
            }
        },
        ordenarNombre() {
            if (this.initOrderNombre) {
                const productos = JSON.parse(JSON.stringify(this.productos));
                const productosOrder = productos.sort(function (a, b) {
                    if (a.nombreProducto > b.nombreProducto) {
                        return -1;
                    }
                    if (a.nombreProducto < b.nombreProducto) {
                        return 1;
                    }
                    return 0;
                });
                this.productos = productosOrder;
                this.initOrderNombre = !this.initOrderNombre;
            } else {
                const productos = JSON.parse(JSON.stringify(this.productos));
                const productosOrder = productos.sort(function (a, b) {
                    if (a.nombreProducto < b.nombreProducto) {
                        return -1;
                    }
                    if (a.nombreProducto > b.nombreProducto) {
                        return 1;
                    }
                    return 0;
                });
                this.productos = productosOrder;
                this.initOrderNombre = !this.initOrderNombre;
            }
        },
        ordenarPrecio() {
            if (this.initOrderPrecio) {
                const productos = JSON.parse(JSON.stringify(this.productos));
                const productosOrder = productos.sort(function (a, b) {
                    if (a.precio > b.precio) {
                        return -1;
                    }
                    if (a.precio < b.precio) {
                        return 1;
                    }
                    return 0;
                });
                this.productos = productosOrder;
                this.initOrderPrecio = !this.initOrderPrecio;
            } else {
                const productos = JSON.parse(JSON.stringify(this.productos));
                const productosOrder = productos.sort(function (a, b) {
                    if (a.precio < b.precio) {
                        return -1;
                    }
                    if (a.precio > b.precio) {
                        return 1;
                    }
                    return 0;
                });
                this.productos = productosOrder;
                this.initOrderPrecio = !this.initOrderPrecio;
            }
        },
        ordenarCantidad(){
            if (this.initOrdenarCantidad) {
                const productos = JSON.parse(JSON.stringify(this.productos));
                const productosOrder = productos.sort(function (a, b) {
                    if (a.cantidadVentas > b.cantidadVentas) {
                        return -1;
                    }
                    if (a.cantidadVentas < b.cantidadVentas) {
                        return 1;
                    }
                    return 0;
                });
                this.productos = productosOrder;
                this.initOrdenarCantidad = !this.initOrdenarCantidad;
            } else {
                const productos = JSON.parse(JSON.stringify(this.productos));
                const productosOrder = productos.sort(function (a, b) {
                    if (a.cantidadVentas < b.cantidadVentas) {
                        return -1;
                    }
                    if (a.cantidadVentas > b.cantidadVentas) {
                        return 1;
                    }
                    return 0;
                });
                this.productos = productosOrder;
                this.initOrdenarCantidad = !this.initOrdenarCantidad;
            }
        },
        async filtro(value) {
            const response = await this.ProductoService.getProductosCategoria(
                value
            );
            const datos = response.data;
            if (datos.length <= 0) {
                this.found = true;
                setTimeout(() => {
                    this.found = false;
                }, 3200);
            } else {
                if (this.initFilter === false) {
                    this.productos = datos;
                    this.initFilter = !this.initFilter;
                    this.noBuscar = false;
                } else {
                    datos.forEach((element) => {
                        this.productos.push(element);
                    });
                }
            }
            setTimeout(() => {
                this.loading = false;
            }, 500);
        },
        async quitar(value) {
            const valor = Number.parseInt(value);
            let productosSinCat = [];
            let data = JSON.parse(JSON.stringify(this.productos));
            data.forEach((item) => {
                if (item.idCategoria !== valor) {
                    productosSinCat.push(item);
                }
            });
            this.productos = productosSinCat;
            if (productosSinCat.length <= 0) {
                this.initFilter = false;
                this.noBuscar = true;
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
                }else{
                    this.paginas = cantidad;
                }
            } else {
                return "error";
            }
        },
        async load() {
            this.loading = true;
            const respuesta = await this.ProductoService.getProductos(
                this.limit,
                this.offset
            );
            if (respuesta.status == 200) {
                const data = respuesta.data;
                await this.countProductos();
                this.productos = data;
                this.loading = false;
            }
        },
    },
    mounted() {
        this.load();
    },
};
</script>
<style scoped>
.nfCard-enter-active {
    animation-name: aparecer;
    animation-duration: 400ms;
}
@keyframes aparecer {
    0% {
        transform: scale(0.1);
    }
    75% {
        transform: scale(1.1);
    }
    100% {
        transform: scale(1);
    }
}

.nfCard-leave-active {
    animation-name: desvanecer;
    animation-duration: 300ms;
}
@keyframes desvanecer {
    0% {
        transform: scale(1);
    }
    100% {
        transform: scale(0);
    }
}

.componentCreated-leave-active {
    animation: outCard 500ms;
}
@keyframes outCard {
    from{
        opacity: 1;
        right: 32px;
    }
    to {
        opacity: 0.1;
        right: 0;
    }
}
.componentCreated-enter-active {
    animation: animacionCard 700ms;
}
@keyframes animacionCard {
    0% {
        opacity: 0.1;
        right: 0;
    }
    100% {
        opacity: 1;
        right: 32px;
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
