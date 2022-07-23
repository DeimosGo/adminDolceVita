<template>
    <div
        v-if="loading"
        class="w-full h-100v grid place-content-center z-40 overflow-hidden"
    >
        <LoadingWheel />
    </div>
    <div
        v-show="!loading"
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
            class="lg:w-4/5 justify-between flex flex-col lg:flex-row space-x-3 pt-16 h-fit"
        >
            <h2
                class="w-full lg:w-1/3 lg:text-left text-center lg:pt-0 text-card text-3xl font-bold"
            >
                2 Ventas
            </h2>
            <div class="justify-center flex space-x-3">
                <FIlterVentas @nuevaVenta="nuevaVenta" />
                <ReiniciarFiltros />
            </div>
        </div>
        <section
            id="table"
            class="flex flex-col items-start space-y-3 overflow-scroll lg:overflow-auto justify-center lg:items-end w-full h-5/6"
        >
            <div
                class="flex flex-col items-center space-y-3 min-w-780 justify-start lg:items-end w-full h-5/6"
            >
                <div
                    class="lg:w-4/5 w-11/12 flex justify-center rounded-full bg-azureMarine-600"
                >
                    <ul
                        class="w-full flex justify-between lg:px-8 px-2 py-2 text-white-0"
                    >
                        <li class="w-1/4 text-center">Fecha</li>
                        <li class="w-1/4 text-center">Total</li>
                        <li class="w-1/4 text-center">Vendedor</li>
                        <li class="w-1/4 text-center">Acciones</li>
                    </ul>
                </div>
                <div
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
            </div>
        </section>
    </div>
</template>
<script>
import FIlterVentas from "@/containers/FIlterVentas.vue";
import ReiniciarFiltros from "@/components/ReiniciarFiltros.vue";
import Venta from "@/services/VentasService";
import VentaRow from "@/components/VentaRow.vue";
import CardVentas from "@/components/CardVentas.vue";
import ComprobanteCard from "@/components/ComprobanteCard.vue";
import DetallesVenta from "@/services/DetallesVentaService";
import Comprobante from "@/services/ComprobanteService";
import CardCreateVenta from "@/components/CardCreateVenta.vue";
import CardDeleteElement from "@/components/CardDeleteElement.vue";
import CreatedElement from "@/components/CreatedElement.vue";
export default {
    name: "VentasPage",
    data() {
        return {
            VentasService: new Venta(),
            DetallesService: new DetallesVenta(),
            ComprobanteService: new Comprobante(),
            offset: 0,
            ventas: [],
            venta: {},
            detalles: {},
            card: false,
            cardVentas: false,
            newVenta: false,
            comp: {},
            comprobant: false,
            loading: false,
            created: false,
            mensaje: "",
            showEliminarVenta: false,
            id: 0,
        };
    },
    methods: {
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
        async createdVenta(item) {
            this.quitarTodo();
            await this.loadDatos();
            this.mensaje = "Venta Registrada";
            this.created = true;
            item = {
                ...item,
                precio_total:item.precioTotal,
            }
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
        async loadDatos() {
            this.loading = !this.loading;
            /* const limit = this.offset+=10 */
            const res = await this.VentasService.getVentasRaw(10, 0);
            this.ventas = res.data;
            this.loading = !this.loading;
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
    FIlterVentas,
    ReiniciarFiltros,
    VentaRow,
    CardVentas,
    ComprobanteCard,
    CardCreateVenta,
    CardDeleteElement,
    CreatedElement
},
    async mounted() {
        this.loadDatos();
    },
};
</script>
<style scoped>
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
