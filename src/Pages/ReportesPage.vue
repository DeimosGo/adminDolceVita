<template>
<div v-if="loading" class="w-full h-100v grid place-content-center z-40">
        <LoadingWheel />
    </div>
    <div v-if="!loading"
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
            <div
                class="w-full grid grid-cols-1 items-center justify-items-center gap-y-5 lg:gap-0 lg:flex lg:space-x-2 mb-2"
            >
                <div
                    class="w-11/12 lg:w-1/4 relative p-1 h-24 hover:-translate-y-1 rounded-lg shadow-md transition-all duration-200
                    hover:shadow-xl cursor-pointer bg-white-0 border-2 border-pink-300 space-x-4 text-pink-400 text-lg flex
                    justify-center items-center font-semibold"
                >
                    <i class="fa-regular fa-calendar-plus text-3xl mb-1"></i>
                    <p>Mes con mas ventas:</p>
                    <p>{{ mes }}</p>
                </div>
                <div
                    class="w-11/12 lg:w-1/4 relative p-1 h-24 hover:-translate-y-1 rounded-lg shadow-md transition-all duration-200
                    hover:shadow-xl cursor-pointer bg-white-0 border-2 border-indigo-300 space-x-4 text-indigo-400 text-lg flex
                    text-center justify-center items-center font-semibold"
                >
                    <i
                        class="fa-solid fa-money-bill-trend-up text-3xl mb-1"
                    ></i>
                    <p>Ingresos brutos:</p>
                    <p>{{ ingresos }}</p>
                </div>
                <div
                    class="w-11/12 lg:w-1/4 relative p-1 h-24 hover:-translate-y-1 rounded-lg shadow-md transition-all duration-200
                    hover:shadow-xl space-x-4 cursor-pointer bg-white-0 border-2 border-pinkViolet-300 text-pinkViolet-400 text-lg
                    flex justify-center items-center font-semibold"
                >
                    <i class="fa-solid fa-medal text-3xl mb-1"></i>
                    <p>Producto Top:</p>
                    <p>{{ produtoTop }}</p>
                </div>
                <div
                    class="w-11/12 lg:w-1/4 relative p-1 h-24 hover:-translate-y-1 rounded-lg shadow-md transition-all duration-200
                    hover:shadow-xl space-x-4 cursor-pointer bg-white-0 border-2 border-purple-300 text-purple-400 text-lg flex
                    justify-center items-center font-semibold"
                >
                    <i class="fa-solid fa-user-tag text-3xl mb-1"></i>
                    <p>Mejor vendedor:</p>
                    <p>{{ seller }}</p>
                </div>
            </div>
            <div class="w-full flex flex-col lg:flex-row justify-center space-y-2 lg:space-x-2 lg:space-y-0 my-2">
                <button class="text-center w-full lg:w-1/4 text-lg rounded-lg p-1 border border-azureAqua-600 text-azureAqua-600
                hover:border-azureAqua-500 hover:text-azureAqua-500 hover:-translate-y-1 scale-95 lg:scale-100 shadow-sm
                hover:shadow-lg transition-all duration-200 bg-white-0" @click="print()">
                    <i class="fa-solid fa-file-pdf mr-1 text-xl"></i> Descargar reporte de ventas
                </button>

                <button class="text-center w-full lg:w-1/4 text-lg rounded-lg p-1 border border-azureAqua-600 text-azureAqua-600
                hover:border-azureAqua-500 hover:text-azureAqua-500 hover:-translate-y-1 scale-95 lg:scale-100 shadow-sm
                hover:shadow-lg transition-all duration-200 bg-white-0" @click="print(1)">
                    <i class="fa-solid fa-file-pdf mr-1 text-xl"></i>Descargar reporte de productos
                </button>

                <button class="text-center w-full lg:w-1/4 text-lg rounded-lg p-1 border border-azureAqua-600 text-azureAqua-600
                hover:border-azureAqua-500 hover:text-azureAqua-500 hover:-translate-y-1 scale-95 lg:scale-100 shadow-sm
                hover:shadow-lg transition-all duration-200 bg-white-0" @click="print(2)">
                    <i class="fa-solid fa-file-pdf mr-1 text-xl"></i>Descargar reporte de vendedores
                </button>

                <button class="text-center w-full lg:w-1/4 text-lg rounded-lg p-1 border border-azureAqua-600 text-azureAqua-600
                hover:border-azureAqua-500 hover:text-azureAqua-500 hover:-translate-y-1 scale-95 lg:scale-100 shadow-sm
                hover:shadow-lg transition-all duration-200 bg-white-0" @click="print(3)">
                    <i class="fa-solid fa-file-pdf mr-1 text-xl"></i>Descargar reporte completo
                </button>
            </div>
            <ChartVentas @reloadReports="reloadReports" @setMes="setMes" @setIngresos="setIngresos" />
            <div
                class="w-full flex flex-col lg:flex-row justify-center space-y-4 lg:space-y-0 lg:space-x-4 pb-3"
            >
                <ChartProductos @setProducto="setProducto" />
                <ChartEmpleados @setSeller="setSeller" />
            </div>
        </div>
    </div>
    <section class="w-full h-0 overflow-hidden">
                <div id="reporte" class="w-full">
                    <ReporteVentas />
                </div>
                <div id="reporte1" class="w-full">
                    <ReporteProductos />
                </div>
                <div id="reporte2" class="w-full">
                    <ReporteEmpleados />
                </div>
                <div id="reporte3" class="w-full">
                    <ReporteCompleto @setLoad="setLoad" />
                </div>
    </section>
</template>
<script>
import ChartProductos from "@/containers/ChartProductos.vue";
import ChartEmpleados from "@/containers/ChartEmpleados.vue";
import ChartVentas from "@/containers/ChartVentas.vue";
import ReporteVentas from "@/containers/ReporteVentas.vue";
import ReporteProductos from "@/containers/ReporteProductos.vue";
import ReporteEmpleados from "@/containers/ReporteEmpleados.vue";
import ReporteCompleto from "@/containers/ReporteCompleto.vue";
import LoadingWheel from "@/components/LoadingWheel.vue";
export default {
    name: "ReportesPage",
    components: { ChartProductos, ChartEmpleados, ChartVentas, ReporteVentas, ReporteProductos, ReporteEmpleados, ReporteCompleto, LoadingWheel },
    data() {
        return {
            loading: true,
            mes: "",
            ingresos: "",
            seller: "",
            produtoTop: "",
            loadInfo: false,
            realTime: true,
        };
    },
    methods: {
        setLoad(){
            setTimeout(()=>this.loading = false, 300);
        },
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
        print(value) {
            if (value) {
                this.$htmlToPaper(`reporte${value}`);
            }
            else{
                this.$htmlToPaper(`reporte`);
            }
        },
    },
};
</script>
<style scoped>
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
