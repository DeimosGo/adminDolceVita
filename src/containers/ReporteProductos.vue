<template>
    <div v-if="reload"
        class="w-full flex flex-col p-4 space-y-8 text-gray-600 font-medium items-center justify-center"
    >
        <div class="w-full flex flex-col space-y-2 justify-center items-center">
            <img
                style="width: 16.666667%"
                class="p-0 m-0 rounded-full"
                src="./../assets/logo.png"
                alt="Logo Dolce Vita"
            />
            <h1 class="w-full text-center text-3xl font-semibold bg-white-0">
                Reporte de Productos: Dolce Vita
            </h1>
        </div>
        <p class="text-justify text-md w-full">Fecha: {{ dateNow }}</p>
        <p class="text-justify text-md w-full">
            Se han recolectado los datos correspondientes a los seis productos más vendidos
            del mes, luego del analisis correspondientes, se tienen los siguientes datos:
        </p>
        <table class="w-full text-base border border-azureMarine-800">
            <tr class="w-full border border-azureMarine-800">
                <th class="border border-azureMarine-800">N°</th>
                <th class="border border-azureMarine-800">Producto</th>
                <th class="border border-azureMarine-800">Cantidad de ventas</th>
                <th class="border border-azureMarine-800">Precio</th>
                <th class="border border-azureMarine-800">Ingresos brutos</th>
            </tr>
            <tr v-for="(element, i) in productos" :key="element.idProducto" class="w-full border border-azureMarine-800">
                <td class="border border-azureMarine-800 text-center">{{i + 1}}</td>
                <td class="border border-azureMarine-800 text-center">{{element.nombreProducto}}</td>
                <td class="border border-azureMarine-800 text-center">{{element.cantidadVentas}}</td>
                <td class="border border-azureMarine-800 text-center">{{element.precio}}</td>
                <td class="border border-azureMarine-800 text-center">S/.{{element.cantidadVentas * element.precio}}</td>
            </tr>
        </table>
        <p class="text-md text-justify">
            La tabla muestra los datos ordenandolos de manera descendente teniendo en cuenta la cantidad de ventas.
        </p>
        <p class="text-md text-justify">
            A partir de los datos recolectados, se ha realizado el siguiente grafico que representa los productos
            más vendidos en el periodo de funcionamiento del sistema web de gestion y administracion.
        </p>
        <div
            class="w-full flex justify-center items-center place-content-center"
        >
            <div class="w-full">
                <p class="text-center text-xl font-semibold">
                    Productos más vendidos
                </p>
                <apexchart
                    type="bar"
                    height="350"
                    width="800"
                    v-if="loaded"
                    :options="chartOptions"
                    :series="series"
                ></apexchart>
            </div>
        </div>
    </div>
</template>
<script>
import VueApexCharts from "vue3-apexcharts";
import Producto from "@/services/ProductoService";
import moment from "moment";
export default {
    name: "ReporteProductos",
    data() {
        return {
            reload: true,
            moreLess: "Aumento",
            percent: "",
            productos:[],
            dateNow: "",
            loaded: false,
            fechaActual: new Date(),
            ProductosService: new Producto(),
            chartOptions: {
                chart: {
                    id: "productosMasVendidos",
                    toolbar: {
                        show: false,
                    },
                },
                xaxis: {
                    categories: ["Productos"],
                },
            },
        };
    },
    sockets: {
        connect: function () {
        },
        customEmit: function (data) {
            data
        }
    },
    components: { apexchart: VueApexCharts },
    methods: {
        async load() {
            let fechaFormat = moment(this.fechaActual).format("YYYY-MM-DD");
            this.dateNow = fechaFormat;
            this.chartOptions.chart.id = `productosMasVendidos_${fechaFormat}`;
            const { data } = await this.ProductosService.getProductosChart();
            this.productos = data;
            let ventas = [];
            for (let i = 0; i < 6; i++) {
                ventas.push({
                    name: data[i].cantidadVentas+' - '+data[i].nombreProducto,
                    data: [data[i].cantidadVentas],
                });
            }
            this.series = ventas;
            this.loaded = true;
            this.reload = true;
        },
        refreshSubs(){
            this.sockets.subscribe("server:fixChart", async () => {
                this.reload = false;
                await this.load();
            });
        },
    },
    async beforeMount() {
        this.refreshSubs();
        await this.load();
    },
};
</script>
