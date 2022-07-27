<template>
    <div
        class="w-full lg:w-1/2 p-2 flex flex-col rounded-lg shadow-md border border-gray-100 bg-white-0"
    >
        <h3 class="w-full text-center text-lg font-bold text-gray-600">
            VENDEDORES DESTACADOS
        </h3>
        <apexchart
            v-if="show"
            type="bar"
            height="350"
            :options="chartOptions"
            :series="series"
        ></apexchart>
    </div>
</template>
<script>
import VueApexCharts from "vue3-apexcharts";
import Venta from "@/services/VentasService";
import moment from "moment";
export default {
    name: "ChartProductos",
    components: { apexchart: VueApexCharts },
    data() {
        return {
            VentasService: new Venta(),
            fechaActual: new Date(),
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
            },
        };
    },
    methods: {
        async load() {
            let fechaFormat = moment(this.fechaActual).format('YYYY-MM-DD');
            this.chartOptions.chart.id = `empleadosDestacados_${fechaFormat}`;
            const fecha = new Date();
            var momentObj = moment(fecha).format('YYYY-MM-DD');
            const dateOut = `${momentObj.slice(0,8)}01`;
            const dateIn = moment(`${momentObj.slice(0,8)}01`).subtract(1, 'months').format('YYYY-MM-DD');
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
                ventas.push({name: 'ventas',data:[element.cantidad]});
            });
            this.$emit('setSeller', lab[0]);
            this.series = ventas;
            this.chartOptions.xaxis.categories = lab;
            this.show = true;
        },
    },
    async mounted() {
        await this.load();
    },
};
</script>
