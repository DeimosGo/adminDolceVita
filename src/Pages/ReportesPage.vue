<template>
    <div
        class="w-full h-100v bg-gray-50 flex flex-col items-end place-content-center lg:pr-8 place-self-end"
    >
        <div
            class="w-full p-2 lg:w-10/12 h-90v lg:mt-4 lg:p-0 justify-start flex flex-col items-center lg:pr-8 overflow-y-scroll scrollTable"
        >
            <h2
                class="w-full text-center pt-4 pb-2 text-2xl font-bold text-gray-600"
            >
                REPORTES ESTADISTICOS
            </h2>
            <div class="w-full grid grid-cols-1 items-center justify-items-center gap-y-5 lg:gap-0 lg:flex lg:space-x-2 mb-2">
                <button @click="print"
                    class="cardRep w-11/12 lg:w-1/4 relative p-1 h-24 hover:-translate-y-1 rounded-lg shadow-md transition-all duration-200 hover:shadow-xl cursor-pointer bg-white-0 border-2 border-pink-300 space-x-4 text-pink-400 text-lg flex justify-center items-center font-semibold"
                >
                    <i class="fa-regular fa-calendar-plus text-3xl mb-1"></i>
                    <p>Mes con mas ventas:</p>
                    <p>{{ mes }}</p>
                    <p
                        id="asd"
                        class="mensaje text-center w-4/5 text-xs lg:text-sm absolute m-auto p-2 left-0 right-0 -bottom-5 text-white-0 bg-gray-600 rounded-lg"
                    >
                        click para descargar reporte de ventas
                    </p>
                </button>
                <div
                    class="cardRep w-11/12 lg:w-1/4 relative p-1 h-24 hover:-translate-y-1 rounded-lg shadow-md transition-all duration-200 hover:shadow-xl cursor-pointer bg-white-0 border-2 border-indigo-300 space-x-4 text-indigo-400 text-lg flex text-center justify-center items-center font-semibold"
                >
                    <i
                        class="fa-solid fa-money-bill-trend-up text-3xl mb-1"
                    ></i>
                    <p>Ingresos brutos:</p>
                    <p>{{ ingresos }}</p>
                    <p
                        class="mensaje text-center w-4/5 text-xs lg:text-sm absolute p-2 m-auto left-0 right-0 -bottom-5 text-white-0 bg-gray-600 rounded-lg"
                    >
                        click para descargar reporte
                    </p>
                </div>
                <div
                    class="cardRep w-11/12 lg:w-1/4 relative p-1 h-24 hover:-translate-y-1 rounded-lg shadow-md transition-all duration-200 hover:shadow-xl space-x-4 cursor-pointer bg-white-0 border-2 border-pinkViolet-300 text-pinkViolet-400 text-lg flex justify-center items-center font-semibold"
                >
                    <i class="fa-solid fa-medal text-3xl mb-1"></i>
                    <p>Producto Top:</p>
                    <p>{{ produtoTop }}</p>
                    <p
                        class="mensaje text-center w-4/5 text-xs lg:text-sm absolute p-2 m-auto left-0 right-0 -bottom-5 text-white-0 bg-gray-600 rounded-lg"
                    >
                        click para descargar reporte
                    </p>
                </div>
                <div
                    class="cardRep w-11/12 lg:w-1/4 relative p-1 h-24 hover:-translate-y-1 rounded-lg shadow-md transition-all duration-200 hover:shadow-xl space-x-4 cursor-pointer bg-white-0 border-2 border-purple-300 text-purple-400 text-lg flex justify-center items-center font-semibold"
                >
                    <i class="fa-solid fa-user-tag text-3xl mb-1"></i>
                    <p>Mejor vendedor:</p>
                    <p>{{ seller }}</p>
                    <p
                        class="mensaje text-center w-4/5 text-xs lg:text-sm absolute p-2 m-auto left-0 right-0 -bottom-5 text-white-0 bg-gray-600 rounded-lg"
                    >
                        click para descargar reporte
                    </p>
                </div>
            </div>
            <ChartVentas @setMes="setMes" @setIngresos="setIngresos" />
            <div class="w-full flex flex-col lg:flex-row justify-center space-y-4 lg:space-x-4 pb-3">
                <ChartProductos @setProducto="setProducto" />
                <ChartEmpleados @setSeller="setSeller" />
            </div>
            <section class="w-full h-0 overflow-hidden">
                <div id="reporte" class="w-full">
                    <ReporteVentas />
                </div>
            </section>
        </div>
    </div>
</template>
<script>
import ChartProductos from "@/containers/ChartProductos.vue";
import ChartEmpleados from "@/containers/ChartEmpleados.vue";
import ChartVentas from "@/containers/ChartVentas.vue";
import ReporteVentas from "@/containers/ReporteVentas.vue";
export default {
    name: "ReportesPage",
    components: { ChartProductos, ChartEmpleados, ChartVentas, ReporteVentas },
    data() {
        return {
            mes: "",
            ingresos: "",
            seller: "",
            produtoTop: "",
            loadInfo: false,
        };
    },
    methods: {
        setMes(cadena) {
            this.mes = cadena;
        },
        setIngresos(cadena) {
            this.ingresos = cadena;
        },
        setSeller(cadena) {
            this.seller = cadena;
        },
        setProducto(cadena) {
            this.produtoTop = cadena;
        },
        print() {
            this.$htmlToPaper("reporte");
        },
    },
};
</script>
<style scoped>
.mensaje {
    display: none;
    transition: all 300ms;
    animation: animacion 150ms;
    left: 0;
    right: 0;
    margin: 0 !important;
    margin: auto !important;
}
@keyframes animacion {
    0% {
        transform: scale(0.2);
    }
}
.cardRep:hover .mensaje {
    display: block;
}
/* ===== Scrollbar CSS ===== */
/* Firefox */
.scrollTable {
    scrollbar-width: auto;
    scrollbar-color: #d4d4d8 #ffffff;
}

/* Chrome, Edge, and Safari */
.scrollTable::-webkit-scrollbar {
    border-radius: 15px;
    width: 12px;
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
</style>
