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
            <h1 class="w-full text-center text-2xl font-semibold bg-white-0">
                Reporte Administrativo: Dolce Vita
            </h1>
        </div>
        <p class="text-justify text-md w-full">Fecha: {{ dateNow }}</p>
        <p class="text-justify text-md w-full">
            <span class="font-semibold text-xl">1. Ventas</span><br><br>
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
                    :options="chartOptionsVentas"
                    :series="seriesVentas"
                ></apexchart>
            </div>
        </div>
        <br><br><br>
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
            <br><br><br><br><br><br><br><br><br><br><br><br>
            <br><br><br><br><br><br><br><br><br><br><br>
        <p class="text-justify text-md w-full">
            <span class="font-semibold text-xl">2. Productos</span><br><br>
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
                <p class="text-center text-xl font-semibold mt-20">
                    Productos más vendidos
                </p>
                <apexchart
                    type="bar"
                    height="390"
                    width="800"
                    v-if="loaded"
                    :options="chartOptionsProductos"
                    :series="seriesProductos"
                ></apexchart>
            </div>
        </div>
        <!-- Empleados -->
        <br><br><br><br><br><br><br><br><br>
        <p class="text-justify text-md w-full">
            <span class="font-semibold text-xl">3. Empleados</span><br><br>
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
                    :options="chartOptionsEmpleados"
                    :series="seriesEmpleados"
                ></apexchart>
            </div>
        </div>
    </div>
</template>
<script>
import Venta from "@/services/VentasService";
import Producto from "@/services/ProductoService";
import moment from "moment";
export default {
    name: "ReporteVentas",
    data() {
        return {
            moreLess: "Aumento",
            percent: "",
            productos:[],
            dateNow: "",
            loaded: false,
            fechaActual: new Date(),
            ProductosService: new Producto(),
            chartOptionsProductos: {
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
            ingresos: "",
            ingresosMes: "",
            ingresosMesBajo: "",
            ingresosActual: 0,
            mesMore: "",
            mesLess: "",
            VentasService: new Venta(),
            empleados: [],
            mesInicio: '',
            mesFin: '',
            show: false,
            seriesEmpleados: [
                {
                    data: [],
                },
            ],
            chartOptionsEmpleados: {
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
                    palette: 'palette2',
                },
            },
            seriesVentas: [
                {
                    name: "VENTAS",
                    data: [],
                },
            ],
            chartOptionsVentas: {
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
            seriesProductos: [],
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
            let fechaFormat = moment(this.fechaActual).format("YYYY-MM-DD");
            this.chartOptionsProductos.chart.id = `productosMasVendidos_${fechaFormat}`;
            const { data } = await this.ProductosService.getProductosChart();
            this.productos = data;
            let ventas = [];
            for (let i = 0; i < 6; i++) {
                ventas.push({
                    name: data[i].cantidadVentas+' - '+data[i].nombreProducto,
                    data: [data[i].cantidadVentas],
                });
            }
            this.seriesProductos = ventas;
            //
            this.chartOptionsEmpleados.chart.id = `empleadosDestacados_${fechaFormat}`;
            const fecha = new Date();
            var momentObj = moment(fecha).format('YYYY-MM-DD');
            const dateOut = `${momentObj.slice(0,8)}01`;
            const dateIn = moment(`${momentObj.slice(0,8)}01`).subtract(1, 'months').format('YYYY-MM-DD');
            this.mesInicio = dateIn;
            this.mesFin = dateOut;
            const getEmpleados = await this.VentasService.getEmpleadosChart(
                dateIn,
                dateOut
            );
            let ventasEmpleados = [];
            let lab = [];
            getEmpleados.data.forEach((element) => {
                lab.push(
                    `${element.nombres[0]+element.nombres.toLowerCase().substring(1)} ${element.apellidos[0]+element.apellidos.toLowerCase().substring(1)}`
                );
                ventasEmpleados.push({
                    name: ` ${element.cantidad} - ${element.nombres[0]+element.nombres.toLowerCase().substring(1)}
                    ${element.apellidos[0]+element.apellidos.toLowerCase().substring(1)}`,
                    data:[element.cantidad]});
            });
            this.seriesEmpleados = ventasEmpleados;
            this.chartOptionsEmpleados.xaxis.categories = lab;
            this.empleados = getEmpleados.data;
        //
            const result = await this.VentasService.getVentasChart();
            this.dateNow = fechaFormat;
            this.chartOptionsVentas.chart.id = `ventasSemestre_${fechaFormat}`;
            let datos = [];
            let fechas = [];
            moment.locale("es");
            if (result.status == 200) {
                const data = result.data.reverse();
                const orden = data.sort(function (a, b) {
                    return Number(a.total) - Number(b.total);
                });
                const allDatos = data.sort(function (a, b) {
                    return Number(a.mes) - Number(b.mes);
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
                allDatos.forEach((element) => {
                    suma += Number(element.total);
                    datos.push(Number(element.cantidad));
                    let mes = moment(element.mes, "MM").format("MMMM");
                    fechas.push(mes[0].toUpperCase() + mes.substring(1));
                });
                this.ingresos = suma;
                this.seriesVentas[0].data = datos;
                this.chartOptionsVentas.labels = fechas;
                this.loaded = true;
                data.sort(function (a, b) {
                    return Number(a.mes) - Number(b.mes);
                });
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
                this.$emit('setLoad');
            }
        },
    },
    async beforeMount() {
        await this.loadInfo();
    },
};
</script>
