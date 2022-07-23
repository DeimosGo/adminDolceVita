<template>
    <div
        class="w-full flex flex-col p-4 space-y-8 text-gray-600 items-center justify-center"
    >
        <div class="w-full flex flex-col space-y-2 justify-center items-center">
            <img
            style="width: 16.666667%;"
                class="p-0 m-0 rounded-full"
                src="./../assets/logo.png"
                alt="Logo Dolce Vita"
            />
            <h1 class="w-full text-center text-3xl font-semibold bg-white-0">
                Reporte de Ventas: Dolce Vita
            </h1>
        </div>
        <p class="text-justify text-md w-full">Fecha: {{ dateNow }}</p>
        <p class="text-justify text-md w-full">
            Durante el semestre transcurrido hasta la fecha actual se han
            registrado, manejado y evaluado los datos del area de ventas dentro
            de la empresa Dolce Vita, luego de realizar los analisis
            estadisticos correspondientes se obtuvieron los siguientes
            resultados:
        </p>
        <ul class="flex flex-col w-full text-md space-y-2 ml-6">
            <li class="text-justify justify-between w-full pl-2 flex space-x-2">
                <p>1. Mes con mayor cantidad de ventas:</p>
                <p class="pr-4">{{ mesMore }}</p>
            </li>
            <li class="text-justify justify-between w-full pl-2 flex space-x-2">
                <p>2. Mes con menor cantidad de ventas:</p>
                <p class="pr-4">{{ mesLess }}</p>
            </li>
            <li class="text-justify justify-between w-full pl-2 flex space-x-2">
                <p>3. Ingresos brutos durante el mes mas alto:</p>
                <p class="pr-4">S/.{{ Number(ingresosMes).toFixed(2) }}</p>
            </li>
            <li class="text-justify justify-between w-full pl-2 flex space-x-2">
                <p>4. Ingresos brutos durante el mes mas bajo:</p>
                <p class="pr-4">S/.{{ Number(ingresosMesBajo).toFixed(2) }}</p>
            </li>
            <li class="text-justify justify-between w-full pl-2 flex space-x-2">
                <p>5. Ingresos brutos durante el semestre:</p>
                <p class="pr-4">S/.{{ Number(ingresos).toFixed(2) }}</p>
            </li>
        </ul>
        <p class="text-md text-justify">
            A partir de los datos recolectados, algunos de los cuales fueron
            mencionados anteriormente, se generó un grafico lineal que
            representa las cifras de ventas de acuerdo al mes dentro del periodo
            de un semestre (seis meses).
        </p>
        <div
            class="w-full flex justify-center items-center place-content-center"
        >
            <div class="w-full">
                <p class="text-center text-xl font-semibold">
                    Ventas Semestrales
                </p>
                <apexchart
                    type="area"
                    height="350"
                    width="700"
                    v-if="loaded"
                    :options="chartOptions"
                    :series="series"
                ></apexchart>
            </div>
        </div>
        <p class="text-justify text-md w-full">
            Respecto al crecimiento mensual de ventas y de ingresos
            correspondientes a los dos ultimos meses (mes anterior y actual) se
            tienen los siguientes datos:
        </p>
        <ul class="flex flex-col w-full text-md space-y-2 ml-6">
            <li class="text-justify justify-between w-full pl-2 flex space-x-2">
                <p>
                    1.{{ moreLess }} porcentual respecto al mes
                    anterior:
                </p>
                <p class="pr-4">{{ percent }}</p>
            </li>
            <li class="text-justify justify-between w-full pl-2 flex space-x-2">
                <p>2. Diferencia de ingresos brutos respecto al mes
                    anterior:</p>
                <p class="pr-4">S/.{{ Number(ingresosActual).toFixed(2) }}</p>
            </li>
        </ul>
            <p class="text-center text-xl font-semibold">Crecimiento Mensual de ventas</p>
        <apexchart
        class="border-t-0"
                type="radialBar"
                height="400"
                width="400"
                v-if="loaded"
                :options="chartOptionsRadial"
                :series="seriesRadial"
            ></apexchart>
    </div>
</template>
<script>
import Venta from "@/services/VentasService";
import moment from "moment";
export default {
    name: "ReporteVentas",
    data() {
        return {
            moreLess: "Aumento",
            percent: "",
            ingresos: "",
            ingresosMes: "",
            ingresosMesBajo: "",
            ingresosActual: 0,
            dateNow: "",
            fechaActual: new Date(),
            loaded: false,
            mesMore: "",
            mesLess: "",
            VentasService: new Venta(),
            series: [
                {
                    name: "VENTAS",
                    data: [],
                },
            ],
            chartOptions: {
                chart: {
                    type: "area",
                    toolbar: {
                        show: false,
                    },
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
            },
            seriesRadial: [],
            chartOptionsRadial: {
                chart: {
                    type: "radialBar",
                    offsetY: -10,
                    toolbar: {
                        show: false,
                    },
                },
                plotOptions: {
                    radialBar: {
                        startAngle: -135,
                        endAngle: 135,
                        dataLabels: {
                            name: {
                                fontSize: "16px",
                                color: undefined,
                                offsetY: 120,
                            },
                            value: {
                                offsetY: 76,
                                fontSize: "22px",
                                color: undefined,
                                formatter: function (val) {
                                    return val + "%";
                                },
                            },
                        },
                    },
                },
                fill: {
                    type: "gradient",
                    gradient: {
                        shade: "dark",
                        shadeIntensity: 0.15,
                        inverseColors: false,
                        opacityFrom: 1,
                        opacityTo: 1,
                        stops: [0, 50, 65, 91],
                    },
                },
                stroke: {
                    dashArray: 4,
                },
                labels: ["Crecimiento respecto al mes anterior"],
            },
        };
    },
    methods: {
        async loadInfo() {
            const result = await this.VentasService.getVentasChart();
            let fechaFormat = moment(this.fechaActual).format("YYYY-MM-DD");
            this.dateNow = fechaFormat;
            this.chartOptions.chart.id = `ventasSemestre_${fechaFormat}`;
            let datos = [];
            let fechas = [];
            moment.locale("es");
            if (result.status == 200) {
                const data = result.data.reverse();
                const orden = data.sort(function (a, b) {
                    return Number(a.total) - Number(b.total);
                });
                this.ingresosMes = orden[orden.length - 1].total;
                this.ingresosMesBajo = orden[0].total;
                let monthMore = moment(
                    orden[orden.length - 1].mes,
                    "MM"
                ).format("MMMM");
                this.mesMore =
                    monthMore[0].toUpperCase() + monthMore.substring(1);
                let monthLess = moment(orden[0].mes, "MM").format("MMMM");
                this.mesLess =
                    monthLess[0].toUpperCase() + monthLess.substring(1);
                let suma = 0;
                data.forEach((element) => {
                    suma += Number(element.total);
                    datos.push(Number(element.cantidad));
                    let mes = moment(element.mes, "MM").format("MMMM");
                    fechas.push(mes[0].toUpperCase() + mes.substring(1));
                });
                this.ingresos = suma;
                this.series[0].data = datos;
                this.chartOptions.labels = fechas;
                this.loaded = true;
                const ingresosAnterior = Number(
                    data[data.length - 2].total
                );
                const ingresosDelMes = Number(
                    data[data.length - 1].total
                );
                const cantidad = ingresosDelMes - ingresosAnterior;
                this.ingresosActual = cantidad;
                this.seriesRadial = [
                    ((cantidad / ingresosAnterior) * 100).toFixed(2),
                ];
                if (((cantidad / ingresosAnterior) * 100).toFixed(2) < 1) {
                    this.moreLess = "Descenso";
                }
                this.percent = `${((cantidad / ingresosAnterior) * 100).toFixed(
                    2
                )}%`;
            }
        },
    },
    async mounted() {
        await this.loadInfo();
    },
};
</script>
