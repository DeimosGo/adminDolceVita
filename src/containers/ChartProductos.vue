<template>
    <div
        class="w-full lg:w-1/2 p-2 flex flex-col rounded-xl shadow-md border border-gray-100 bg-white-0"
    >
        <h3 class="w-full text-center text-lg font-bold text-gray-600">
            PRODUCTOS MAS VENDIDOS
        </h3>
        <apexchart
            class="w-full"
            type="bar"
            height="350"
            :options="chartOptions"
            :series="series"
        ></apexchart>
    </div>
</template>
<script>
import VueApexCharts from "vue3-apexcharts";
import Producto from "@/services/ProductoService";
import moment from "moment";
export default {
    name: "ChartProductos",
    components: { apexchart: VueApexCharts },
    data() {
        return {
            fechaActual: new Date(),
            ProductosService: new Producto(),
            chartOptions: {
                chart: {
                    id: "productosMasVendidos",
                    /*  toolbar: {
                        show: false,
                    }, */
                },
                xaxis: {
                    categories: ["Productos"],
                },
            },
            series: [
                {
                    name: "Productos mas vendidos",
                    data: [],
                },
            ],
        };
    },
    methods: {
        async load() {
            let fechaFormat = moment(this.fechaActual).format("YYYY-MM-DD");
            this.chartOptions.chart.id = `productosMasVendidos_${fechaFormat}`;
            const { data } = await this.ProductosService.getProductosChart();
            let ventas = [];
            data.forEach((element) => {
                ventas.push({
                    name: element.nombreProducto,
                    data: [element.cantidadVentas],
                });
            });
            this.series = ventas;
            this.$emit(
                "setProducto",
                `${ventas[0].name[0]}${ventas[0].name
                    .substring(1)
                    .toLowerCase()}`
            );
        },
    },
    async mounted() {
        await this.load();
    },
};
</script>
