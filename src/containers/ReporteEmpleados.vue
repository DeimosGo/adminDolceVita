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
                Reporte de empleados: Dolce Vita
            </h1>
        </div>
        <p class="text-justify text-md w-full">Fecha: {{ dateNow }}</p>
        <p class="text-justify text-md w-full">
            Se han recolectado los datos correspondientes a los empleados y las ventas que han realizado en el periodo de un mes,
            tomando el tiempo trancurrido desde {{mesInicio}} hasta {{mesFin}}. Luego del analisis se tiene lo siguiente
        </p>
        <table class="w-full text-base border border-azureMarine-800">
            <tr class="w-full border border-azureMarine-800">
                <th class="border border-azureMarine-800">N°</th>
                <th class="border border-azureMarine-800">Nombres</th>
                <th class="border border-azureMarine-800">Apellidos</th>
                <th class="border border-azureMarine-800">Cantidad de ventas</th>
            </tr>
            <tr
                v-for="(element, i) in empleados"
                :key="i"
                class="w-full border border-azureMarine-800"
            >
                <td class="border border-azureMarine-800 text-center">
                    {{ i + 1 }}
                </td>
                <td class="border border-azureMarine-800 text-center">
                    {{ element.nombres }}
                </td>
                <td class="border border-azureMarine-800 text-center">
                    {{ element.apellidos }}
                </td>
                <td class="border border-azureMarine-800 text-center">
                    {{ element.cantidad }}
                </td>
            </tr>
        </table>
        <p class="text-md text-justify">
            La tabla muestra los datos ordenandolos de manera descendente
            teniendo en cuenta la cantidad de ventas.
        </p>
        <p class="text-md text-justify">
            A partir de los datos recolectados, se ha realizado el siguiente
            grafico que muestra a los vendedores y su cantidad de ventas respectivas.
        </p>
        <div
            class="w-full flex justify-center items-center place-content-center"
        >
            <div class="w-full">
                <p class="text-center text-xl font-semibold">
                    Vendedores Destacados
                </p>
                <apexchart
                    type="bar"
                    height="400"
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
import Venta from "@/services/VentasService";
export default {
    name: "ReporteEmpleados",
    data() {
        return {
            percent: "",
            reload: true,
            empleados: [],
            dateNow: "",
            loaded: false,
            fechaActual: new Date(),
            ProductosService: new Producto(),
            VentasService: new Venta(),
            mesInicio: '',
            mesFin: '',
            show: false,
            series: [
                {
                    data: [],
                },
            ],
            chartOptions: {
                chart: {
                    type: "bar",
                    height: 350,
                    id: "empleadosDestacados",
                    toolbar: {
                        show: false,
                    },
                },
                plotOptions: {
                    bar: {
                        borderRadius: 4,
                        horizontal: true,
                    },
                },
                dataLabels: {
                    enabled: false,
                },
                xaxis: {
                    categories: [],
                },
                theme: {
                    palette: 'palette1',
                },
            },
    }
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
            let fechaFormat = moment(this.fechaActual).format('YYYY-MM-DD');
            this.dateNow = fechaFormat;
            this.chartOptions.chart.id = `empleadosDestacados_${fechaFormat}`;
            const fecha = new Date();
            var momentObj = moment(fecha).format('YYYY-MM-DD');
            const dateOut = `${momentObj.slice(0,8)}01`;
            const dateIn = moment(`${momentObj.slice(0,8)}01`).subtract(1, 'months').format('YYYY-MM-DD');
            this.mesInicio = dateIn;
            this.mesFin = dateOut;
            const { data } = await this.VentasService.getEmpleadosChart(
                dateIn,
                dateOut
            );
            let ventas = [];
            let lab = [];
            data.forEach((element) => {
                lab.push(
                    `${element.nombres[0]+element.nombres.toLowerCase().substring(1)} ${element.apellidos[0]+element.apellidos.toLowerCase().substring(1)}`
                );
                ventas.push({
                    name: ` ${element.cantidad} - ${element.nombres[0]+element.nombres.toLowerCase().substring(1)}
                    ${element.apellidos[0]+element.apellidos.toLowerCase().substring(1)}`,
                    data:[element.cantidad]});
            });
            this.series = ventas;
            this.chartOptions.xaxis.categories = lab;
            this.loaded = true;
            this.empleados = data;
            this.reload = true;
    },
    refreshSubs(){
            this.sockets.subscribe("server:fixChart",async () => {
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
