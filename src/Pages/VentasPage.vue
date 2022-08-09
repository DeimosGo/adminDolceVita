<template>
    <div
        v-if="loading"
        class="w-full h-100v grid place-content-center z-40 overflow-hidden"
    >
        <LoadingWheel />
    </div>
    <transition name="nfCard">
        <NotFoundSearch v-if="found" />
    </transition>
    <transition name="showElements">
        <div
            v-if="!loading"
            class="absolute pt-16 w-full lg:pr-16 h-100v overflow-hidden flex place-content-center flex-col lg:items-end justify-start"
        >
            <transition name="cardNew">
                <CardCreateVenta
                    v-if="newVenta"
                    @quitarTodo="quitarTodo"
                    @createdVenta="createdVenta"
                />
            </transition>
            <transition name="createdElement">
                <CreatedElement v-if="created" :message="mensaje" />
            </transition>
            <transition name="showEliminar">
                <CardDeleteElement
                    v-if="showEliminarVenta"
                    @eliminar="quitarTodo"
                    @deleted="deleted"
                />
            </transition>
            <div
                @click="quitarTodo"
                v-if="card"
                class="absolute w-screen top-0 right-0 bottom-0 h-100v bg-gray-500 opacity-20 z-20 cursor-pointer"
            ></div>
            <div v-if="comprobant" class="w-0 h-0 overflow-hidden">
                <div
                    class="w-screen h-fit flex flex-col justify-center items-center"
                    id="printContent"
                >
                    <ComprobanteCard
                        :venta="venta"
                        :detalles="detalles"
                        :comprobante="comp"
                    />
                </div>
            </div>
            <transition name="cardDetails">
                <CardVentas
                    v-if="cardVentas"
                    @quitarTodo="quitarTodo"
                    :venta="venta"
                />
            </transition>
            <div
                class="lg:w-4/5 justify-between flex flex-col lg:flex-row space-x-3 pt-2 lg:pt-16 h-fit"
            >
                <h2
                    class="w-full lg:w-1/3 lg:text-left text-center lg:pt-0 text-card text-3xl font-bold"
                >
                    {{ totalVentas }} Ventas
                </h2>
                <div class="justify-center flex space-x-3">
                    <FIlterVentas
                        @nuevaVenta="nuevaVenta"
                        @filtrarPorRango="filtrarPorRango"
                        @quitar="quitar"
                        @filtrar="filtrar"
                    />
                    <ReiniciarFiltros @recargar="loadDatos" />
                </div>
            </div>
            <section
                id="table"
                class="flex flex-col items-start space-y-3 overflow-scroll scrollTable justify-center lg:items-end w-full h-5/6 lg:mt-0 mt-7"
            >
                <div
                    v-if="!loading"
                    class="flex flex-col items-center space-y-3 min-w-780 justify-start lg:items-end w-full h-5/6"
                >
                    <div
                        class="lg:w-4/5 w-11/12 flex justify-center rounded-full bg-azureMarine-600"
                    >
                        <ul
                            class="w-full flex justify-between lg:px-8 px-2 py-2 text-white-0"
                        >
                            <li class="w-1/4 text-center">Fecha</li>
                            <li class="w-1/4 text-center">
                                <button @click="ordenarPrecio">
                                    Total
                                    <i
                                        class="fa-solid fa-arrow-down-short-wide"
                                    ></i>
                                </button>
                            </li>
                            <li class="w-1/4 text-center">
                                <button @click="ordenarNombre">
                                    Vendedor
                                    <i
                                        class="fa-solid fa-arrow-down-short-wide"
                                    ></i>
                                </button>
                            </li>
                            <li class="w-1/4 text-center">Acciones</li>
                        </ul>
                    </div>
                    <div
                        v-if="loadFilter"
                        class="lg:w-4/5 w-11/12 flex justify-center rounded-full flex-col space-y-2"
                    >
                        <VentaRow
                            v-for="item in ventas"
                            @showDetails="showDetails"
                            @printComprobante="printComprobante"
                            @deleteProduct="deleteProduct"
                            :key="item.idVenta"
                            :venta="item"
                        />
                    </div>
                    <div
                        v-if="noBuscar"
                        class="lg:w-4/5 w-11/12 flex space-x-3 text-lg justify-center place-items-center"
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
                </div>
            </section>
        </div>
    </transition>
</template>
<script>
import FIlterVentas from "@/containers/FIlterVentas.vue";
import ReiniciarFiltros from "@/components/ReiniciarFiltros.vue";
import LoadingWheel from "@/components/LoadingWheel.vue";
import Venta from "@/services/VentasService";
import VentaRow from "@/components/VentaRow.vue";
import CardVentas from "@/components/CardVentas.vue";
import ComprobanteCard from "@/components/ComprobanteCard.vue";
import DetallesVenta from "@/services/DetallesVentaService";
import Comprobante from "@/services/ComprobanteService";
import CardCreateVenta from "@/components/CardCreateVenta.vue";
import CardDeleteElement from "@/components/CardDeleteElement.vue";
import CreatedElement from "@/components/CreatedElement.vue";
import moment from "moment";
import NotFoundSearch from "@/components/NotFoundSearch.vue";
export default {
    name: "VentasPage",
    data() {
        return {
            VentasService: new Venta(),
            DetallesService: new DetallesVenta(),
            ComprobanteService: new Comprobante(),
            limit: 10,
            offset: 0,
            ventas: [],
            venta: {},
            detalles: {},
            card: false,
            cardVentas: false,
            paginas: 1,
            actual: 1,
            newVenta: false,
            comp: {},
            comprobant: false,
            loading: true,
            created: false,
            mensaje: "",
            showEliminarVenta: false,
            id: 0,
            noBuscar: true,
            totalVentas: 0,
            initFilter: false,
            initOrderTotal: false,
            initOrderNombre: false,
            loadFilter: true,
            found: false,
            counter: 1,
        };
    },
    methods: {
        ordenarNombre() {
            this.loadFilter = false;
            if (!this.initOrderNombre) {
                const ventas = JSON.parse(JSON.stringify(this.ventas));
                const ventasOrder = ventas.sort(function (a, b) {
                    if (a.nombres > b.nombres) {
                        return -1;
                    }
                    if (a.nombres < b.nombres) {
                        return 1;
                    }
                    return 0;
                });
                this.ventas = ventasOrder;
                this.initOrderNombre = !this.initOrderNombre;
                setTimeout(() => (this.loadFilter = true), 50);
            } else {
                const ventas = JSON.parse(JSON.stringify(this.ventas));
                const ventasOrder = ventas.sort(function (a, b) {
                    if (a.nombres < b.nombres) {
                        return -1;
                    }
                    if (a.nombres > b.nombres) {
                        return 1;
                    }
                    return 0;
                });
                this.ventas = ventasOrder;
                this.initOrderNombre = !this.initOrderNombre;
                setTimeout(() => (this.loadFilter = true), 50);
            }
        },
        ordenarPrecio() {
            this.loadFilter = false;
            if (!this.initOrderTotal) {
                const ventas = JSON.parse(JSON.stringify(this.ventas));
                const ventasOrder = ventas.sort(function (a, b) {
                    if (Number(a.precio_total) > Number(b.precio_total)) {
                        return -1;
                    }
                    if (Number(a.precio_total) < Number(b.precio_total)) {
                        return 1;
                    }
                    return 0;
                });
                this.ventas = ventasOrder;
                this.initOrderTotal = !this.initOrderTotal;
                setTimeout(() => (this.loadFilter = true), 50);
            } else {
                this.loadFilter = false;
                const ventas = JSON.parse(JSON.stringify(this.ventas));
                const ventasOrder = ventas.sort(function (a, b) {
                    if (Number(a.precio_total) < Number(b.precio_total)) {
                        return -1;
                    }
                    if (Number(a.precio_total) > Number(b.precio_total)) {
                        return 1;
                    }
                    return 0;
                });
                this.ventas = ventasOrder;
                this.initOrderTotal = !this.initOrderTotal;
                setTimeout(() => (this.loadFilter = true), 50);
            }
        },
        async filtrar(value) {
            this.loadFilter = false;
            const response = await this.VentasService.getEmpleados(value);
            const datos = response.data;
            if (!datos) {
                this.found = true;
                setTimeout(() => {
                    this.found = false;
                }, 3200);
                this.loadFilter = true;
            } else if (datos.length <= 0) {
                this.found = true;
                setTimeout(() => {
                    this.found = false;
                }, 3200);
                this.loadFilter = true;
            } else {
                if (this.initFilter === false) {
                    this.ventas = datos;
                    this.initFilter = !this.initFilter;
                    this.noBuscar = false;
                } else {
                    datos.forEach((element) => {
                        this.ventas.push(element);
                    });
                }
                this.loadFilter = true;
            }
            setTimeout(() => {
                this.loading = false;
            }, 100);
        },
        async quitar(value) {
            this.loadFilter = false;
            const valor = Number.parseInt(value);
            let ventasSinCat = [];
            let data = JSON.parse(JSON.stringify(this.ventas));
            this.ventas = [];
            data.forEach((item) => {
                if (item.id_empleado !== valor) {
                    ventasSinCat.push(item);
                }
            });
            if (ventasSinCat.length <= 0) {
                this.initFilter = false;
                this.noBuscar = true;
                this.loadFilter = true;
                this.loadDatos();
            } else {
                this.ventas = ventasSinCat;
                setTimeout(() => (this.loadFilter = true), 50);
            }
        },
        async deleted() {
            const data = await this.VentasService.deleteVenta(this.id);
            if (data.status == 200) {
                this.quitarTodo();
                this.mensaje = "Registro eliminado";
                this.created = true;
                setTimeout(() => {
                    this.created = false;
                }, 3000);
                this.id = 0;
                await this.loadDatos();
            }
        },
        async countVentas() {
            const respuesta = await this.VentasService.getVentasCount();
            if (respuesta.status == 200) {
                const data = await respuesta.data;
                this.totalVentas = data.cantidad;
                const cantidad = data.cantidad / 10;
                if (cantidad % 2 !== 0) {
                    this.paginas = Math.floor(cantidad) + 1;
                } else {
                    this.paginas = cantidad;
                }
            } else {
                return "error";
            }
        },
        async createdVenta(item) {
            this.quitarTodo();
            await this.loadDatos();
            this.mensaje = "Venta Registrada";
            this.created = true;
            item = {
                ...item,
                precio_total: item.precioTotal,
            };
            await this.printComprobante(item);
            setTimeout(() => {
                this.created = false;
            }, 2000);
        },
        nuevaVenta() {
            this.card = true;
            this.newVenta = true;
        },
        showDetails(item) {
            this.card = !this.card;
            this.cardVentas = !this.cardVentas;
            this.venta = item;
        },
        quitarTodo() {
            this.card = false;
            this.cardVentas = false;
            this.newVenta = false;
            this.showEliminarVenta = false;
        },
        async filtrarPorRango(fechas) {
            const fechaIn = moment(fechas[0]).format("YYYY-MM-DD");
            const fechaOut = moment(fechas[1]).format("YYYY-MM-DD");
            this.loading = !this.loading;
            const res = await this.VentasService.getVentasFecha(
                fechaIn,
                fechaOut
            );
            if (!res.data) {
                this.found = true;
                setTimeout(() => {
                    this.found = false;
                }, 3200);
                this.loadFilter = true;
                this.loading = !this.loading;
            } else if (res.data.length <= 0) {
                this.loading = !this.loading;
                this.found = true;
                setTimeout(() => {
                    this.found = false;
                }, 3200);
                this.loadFilter = true;
            } else {
                if (this.initFilter === false) {
                    this.ventas = res.data;
                    this.initFilter = !this.initFilter;
                    this.noBuscar = false;
                    this.loadFilter = true;
                    this.loading = !this.loading;
                } else {
                    res.data.forEach((element) => {
                        this.ventas.push(element);
                    });
                    this.loadFilter = true;
                    this.loading = !this.loading;
                }
            }
        },
        async loadDatos() {
            this.loading = true;
            this.noBuscar = true;
            this.initFilter = false;
            this.loadFilter = true;
            await this.countVentas();
            const res = await this.VentasService.getVentasRaw(
                this.limit,
                this.offset
            );
            this.ventas = res.data;
            this.loading = !this.loading;
        },
        async before() {
            if (this.offset >= 10) {
                this.counter--;
                this.offset -= 10;
                await this.loadDatos();
                this.actual -= 1;
            }
        },
        async after() {
            if (this.counter < this.paginas) {
                this.counter++;
                this.offset += 10;
                await this.loadDatos();
                this.actual += 1;
            }
        },
        async printComprobante(item) {
            this.venta = item;
            let id = 0;
            if (item.id_venta) {
                id = item.id_venta;
            } else {
                id = item.idVenta;
            }
            this.comprobant = false;
            const response = await this.DetallesService.getDetails(id);
            this.detalles = response.data;
            const result = await this.ComprobanteService.getComprobanteId(id);
            console.log(response);
            console.log(result);
            this.comprobant = true;
            this.comp = result.data;
            if (result.status == 200) {
                setTimeout(() => this.$htmlToPaper("printContent"), 400);
            }
        },
        deleteProduct(id) {
            this.id = id;
            this.showEliminarVenta = true;
            this.card = true;
        },
    },
    components: {
        LoadingWheel,
        FIlterVentas,
        ReiniciarFiltros,
        VentaRow,
        CardVentas,
        ComprobanteCard,
        CardCreateVenta,
        CardDeleteElement,
        CreatedElement,
        NotFoundSearch,
    },
    async beforeMount() {
        this.loadDatos();
    },
};
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

.showElements-enter-active {
    animation: showVentas 300ms;
}

@keyframes showVentas {
    0% {
        transform: scale(0.1);
        opacity: 0.1;
    }
}

.showEliminar-enter-active {
    animation: enterDelete 250ms;
}

@keyframes enterDelete {
    0% {
        transform: scale(0.1);
    }

    80% {
        transform: scale(1.1);
    }

    100% {
        transform: scale(1);
    }
}

.showEliminar-leave-active {
    animation: leaveDelete 200ms;
}

@keyframes leaveDelete {
    from {
        opacity: 0.5;
        transform: scale(1);
    }
    to {
        opacity: 0;
        transform: scale(0.3);
    }
}

.cardDetails-enter-active {
    animation: cardIn 312ms;
}
@keyframes cardIn {
    0% {
        opacity: 0.1;
        top: -200px;
    }
}
.cardDetails-leave-active {
    animation: cardOut 152ms;
}
@keyframes cardOut {
    100% {
        opacity: 0.1;
        top: -200px;
    }
}
.cardNew-enter-active {
    animation: cardNewIn 300ms;
}
@keyframes cardNewIn {
    0% {
        right: -100vw;
    }
}
.cardNew-leave-active {
    animation: cardNewOut 700ms;
}
@keyframes cardNewOut {
    100% {
        right: -100vw;
    }
}

.createdElement-leave-active {
    animation: outCard 500ms;
}
@keyframes outCard {
    from {
        opacity: 1;
        right: 32px;
    }
    to {
        opacity: 0.1;
        right: 0;
    }
}
.createdElement-enter-active {
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
</style>
