<template>
    <div
        class="w-full flex-col lg:flex-row flex justify-center space-y-3 lg:space-y-0 lg:space-x-4 pb-4"
    >
        <div
            class="w-full lg:w-4/6 p-2 flex flex-col rounded-lg justify-center shadow-md border border-gray-100 bg-white-0"
        >
            <h3 class="w-full text-center text-lg font-bold text-gray-600">
                VENTAS DE LOS ULTIMOS SEIS MESES
            </h3>
            <apexchart
                v-if="loaded"
                type="area"
                height="400"
                :options="chartOptions"
                :series="series"
            ></apexchart>
        </div>
        <div
            class="w-full lg:w-2/6 p-2 flex flex-col rounded-lg justify-center shadow-md border border-gray-100 bg-white-0"
        >
            <h3 class="w-full text-center text-lg font-bold text-gray-600">
                CRECIMIENTO MENSUAL DE INGRESOS
            </h3>
            <apexchart
                v-if="loadedRadial"
                type="radialBar"
                height="400"
                :options="chartOptionsRadial"
                :series="seriesRadial"
            ></apexchart>
        </div>
    </div>
</template>
<script>
import Venta from "@/services/VentasService";
import moment from "moment";
export default {
    name: "ChartVentas",
    data() {
        return {
            ingresos: "",
            loadedRadial: true,
            fechaActual: new Date(),
            loaded: false,
            VentasService: new Venta(),
            series: [
                {
                    name: "VENTAS",
                    data: [],
                },
            ],
            chartOptions: {
                chart: {
                    toolbar: {
                        show: true,
                    },
                    type: "area",
                    height: 350,
                    zoom: {
                        enabled: false,
                    },
                    id: "ventasSemestre",
                },
                dataLabels: {
                    enabled: false,
                },
                stroke: {
                    curve: "straight",
                },
                labels: [],
                xaxis: {
                    type: "text",
                },
                yaxis: {
                    opposite: true,
                },
                legend: {
                    horizontalAlign: "left",
                },
                theme: {
                    palette: 'palette1',
                },
            },
            seriesRadial: [0],
            chartOptionsRadial: {
                chart: {
                    height: 350,
                    type: "radialBar",
                    offsetY: -10,
                    toolbar: {
                        show: true,
                    },
                },
                plotOptions: {
                    radialBar: {
                        startAngle: -135,
                        endAngle: 135,
                        dataLabels: {
                            name: {
                                fontSize: "16px",
                                color: "#636363",
                                offsetY: 120,
                            },
                            value: {
                                offsetY: 76,
                                fontSize: "22px",
                                color: "#2D2D2D",
                                formatter: function (val) {
                                    return val + "%";
                                },
                            },
                        },
                    },
                },
                fill: {
                    type: "solid",
                    colors: ["#74EC84"],
                },
                stroke: {
                    dashArray: 4,
                },
                labels: ["Respecto al mes anterior"],
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
    methods: {
        async loadInfo() {
            const result = await this.VentasService.getVentasChart();
            const fechaFormat = moment(this.fechaActual).format("YYYY-MM-DD");
            this.chartOptions.chart.id = `ventasSemestre_${fechaFormat}`;
            let datos = [];
            let fechas = [];
            moment.locale("es");
            if (result.status == 200) {
                const data = result.data.reverse();
                data.forEach((element) => {
                    datos.push(Number(element.cantidad));
                    let mes = moment(element.mes, "MM").format("MMMM");
                    fechas.push(mes[0].toUpperCase() + mes.substring(1));
                });
                this.$emit("setMes", fechas[fechas.length - 1]);
                this.series[0].data = datos;
                this.chartOptions.labels = fechas;
                this.loaded = true;
                const ingresosAnterior = Number(data[data.length - 2].total);
                const ingresosDelMes = Number(data[data.length - 1].total);
                this.$emit("setIngresos", `S/.${ingresosDelMes.toFixed(2)}`);
                const cantidad = ingresosDelMes - ingresosAnterior;
                this.seriesRadial = [
                    ((cantidad / ingresosAnterior) * 100).toFixed(0),
                ];
                this.ingresos = `S/.${ingresosDelMes}`;
            }
        },
        async refresh(){
            const result = await this.VentasService.getVentasChart();
            const fechaFormat = moment(this.fechaActual).format("YYYY-MM-DD");
            this.chartOptions.chart.id = `ventasSemestre_${fechaFormat}`;
            let datos = [];
            let fechas = [];
            moment.locale("es");
            if (result.status == 200) {
                const data = result.data.reverse();
                data.forEach((element) => {
                    datos.push(Number(element.cantidad));
                    let mes = moment(element.mes, "MM").format("MMMM");
                    fechas.push(mes[0].toUpperCase() + mes.substring(1));
                });
                this.$emit("setMes", fechas[fechas.length - 1]);
                this.series[0].data = datos;
                this.chartOptions.labels = fechas;
                const ingresosAnterior = Number(data[data.length - 2].total);
                const ingresosDelMes = Number(data[data.length - 1].total);
                this.$emit("setIngresos", `S/.${ingresosDelMes.toFixed(2)}`);
                const cantidad = ingresosDelMes - ingresosAnterior;
                this.seriesRadial = [
                    ((cantidad / ingresosAnterior) * 100).toFixed(0),
                ];
                this.ingresos = `S/.${ingresosDelMes}`;
                this.loadedRadial = true;
            /* this.loaded = true; */
        }},
        refreshSubs(){
            this.sockets.subscribe("server:fixChart", async () => {
                this.loadedRadial = false;
                await this.refresh();
        });
        },
    },
    async mounted(){
        this.refreshSubs();
        await this.loadInfo();
}
}
</script>
