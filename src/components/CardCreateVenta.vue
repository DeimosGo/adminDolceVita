<template>
    <div
        class="w-full md:w-11/12 lg:w-3/5 absolute h-100v space-y-3 bottom-0 right-0 m-auto"
    >
        <div
            class="relative w-full flex flex-col h-100v justify-start items-center bg-white-0 z-30 pt-16 pb-4 overflow-y-scroll bordes"
        >
            <h2
                class="w-full items-center justify-center text-center text-2xl font-medium text-azureMarine-800"
            >
                Nueva Venta
            </h2>
            <div
                class="w-full flex flex-col justify-center items-center space-y-4"
            >
                <InputBusqueda :phText="'Producto'" @search="search" />
                <p class="w-1/2 text-center text-gray-700 font-medium text-lg">
                    {{ textInfo }}
                </p>
                <div
                    class="w-full flex flex-col justify-start items-center h-64 overflow-y-scroll bordes mb-2"
                >
                    <ul
                        class="w-4/5 flex items-center justify-between rounded-xl font-medium bg-azureMarine-700 px-2 py-1 text-white-0"
                    >
                        <li class="w-1/4 text-center">Producto</li>
                        <li class="w-1/4 text-center">Stock</li>
                        <li class="w-1/4 text-center">Precio</li>
                        <li class="w-1/4 text-center">Accion</li>
                    </ul>
                    <div
                        v-for="(item, i) in productos"
                        :key="i"
                        class="w-4/5 mt-1"
                    >
                        <ul
                            class="w-full flex items-center justify-between font-medium rounded-xl bg-white-0 shadow-gray-200 shadow-md px-2 py-1 text-gray-700 border border-gray-200"
                        >
                            <li class="w-1/4 text-center text-sm">
                                {{ item.nombreProducto.toLowerCase() }}
                            </li>
                            <li class="w-1/4 text-center">{{ item.stock }}</li>
                            <li class="w-1/4 text-center">{{ item.precio }}</li>
                            <li class="w-1/4 text-center">
                                <button
                                    @click="add(item)"
                                    class="text-xl text-azureMarine-700 transition-all duration-100 hover:scale-110"
                                >
                                    <i class="fa-solid fa-circle-plus"></i>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div
                class="w-11/12 flex flex-col shadow-sm shadow-gray-400 rounded-xl border-t border-gray-200 justify-start items-center mt-3 py-2"
            >
                <h3 class="w-1/2 text-center text-gray-700 font-medium text-lg">
                    Informacion de la venta
                </h3>
                <div
                    class="w-4/5 flex flex-col justify-start items-center space-y-4 h-52 overflow-y-scroll bordes"
                >
                    <div
                        class="w-full flex flex-col justify-center items-center"
                    >
                        <ul
                            class="w-full flex items-center justify-between font-medium px-2 py-1 text-azureMarine-700"
                        >
                            <li class="w-1/3 text-center">Producto</li>
                            <li class="w-1/3 text-center">Precio</li>
                            <li class="w-1/3 text-center">Cantidad</li>
                            <li class="w-1/3 text-center">Accion</li>
                        </ul>
                        <div
                            v-for="(item, i) in productosSelected"
                            :key="i"
                            class="w-full"
                        >
                            <ul
                                class="w-full flex items-center justify-between font-medium px-2 py-1 text-gray-700"
                            >
                                <li class="w-1/4 text-center">
                                    {{ item.nombreProducto.toLowerCase() }}
                                </li>
                                <li class="w-1/4 text-center">
                                    {{ item.precio }}
                                </li>
                                <li
                                    class="w-1/4 text-center flex justify-center items-center"
                                >
                                    <input
                                        type="number"
                                        class="w-10 outline-none border-b border-azureMarine-700 text-center"
                                        placeholder="cantidad"
                                        onkeypress="return (event.charCode >= 48 && event.charCode <= 57)"
                                        maxlength="4"
                                        v-model="item.cantidad"
                                        @input="test(item)"
                                        autocomplete="none"
                                        name="telefono"
                                        pattern="^[0-9]{4}$"
                                    />
                                </li>
                                <li class="w-1/4 text-center">
                                    <button
                                        @click="remove(item)"
                                        class="text-xl text-cerise-700 transition-all duration-100 hover:scale-110"
                                    >
                                        <i class="fa-solid fa-delete-left"></i>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <ul
                    class="flex flex-col space-y-2 w-10/12 px-3 pb-4 font-medium text-sm"
                >
                    <li class="flex justify-between">
                        <p>Subtotal</p>
                        <p><span class="text-gray-500 pr-1">S/.</span>{{ subtotal }}</p>
                    </li>
                    <li class="flex justify-between">
                        <p>IGV</p>
                        <p><span class="text-gray-500 pr-1">S/.</span>{{ igv }}</p>
                    </li>
                    <li class="flex justify-between">
                        <p>Total</p>
                        <p><span class="text-gray-500 pr-1">S/.</span>{{ Number(total).toFixed(2) }}</p>
                    </li>
                </ul>
                <div
                    class="w-full flex space-y-2 lg:space-y-0 flex-col md:flex-row justify-center space-x-4 items-center mb-1"
                >
                    <p
                        class="w-1/6 text-center text-gray-700 font-medium text-lg"
                    >
                        Cliente
                    </p>
                    <input
                        type="number"
                        placeholder="DNI"
                        :disabled="disDni"
                        pattern="^[0-9]{4}$"
                        v-model="dni"
                        @input="testDni"
                        class="w-11/12 lg:w-1/6 pl-1 py-1 border-2 border-azure-400 rounded-lg outline-none placeholder:text-gray-400"
                        onkeypress="return (event.charCode >= 48 && event.charCode <= 57)"
                    />
                    <input
                        class="w-11/12 lg:w-2/6 pl-3 py-2 border-2 cursor-not-allowed text-sm border-azure-200 bg-gray-100 rounded-lg outline-none placeholder:text-gray-400"
                        type="text"
                        :placeholder="namePlace"
                        disabled
                        :value="nombre"
                    />
                    <div class="w-11/12 lg:w-1/6 flex justify-center">
                        <button
                            @click="returnAll"
                            class="w-1/6 text-cerise-800 text-lg"
                        >
                            <i
                                class="fa-solid fa-trash p-1 transition-all duration-150 border-2 border-cerise-800 rounded-md hover:scale-110"
                            ></i>
                        </button>
                        <button
                            @click="validate"
                            class="p-1 ml-2 font-medium border-2 border-azure-700 text-azure-700 rounded-md transition-all duration-150 hover:text-white-0 hover:bg-azure-700 hover:scale-110"
                        >
                            validar
                        </button>
                    </div>
                </div>
            </div>
            <div class="w-4/5 flex justify-between pt-4">
                <button
                    @click="$emit('quitarTodo')"
                    class="p-1 w-1/3 border-2 transition-all duration-200 rounded-lg border-card text-card hover:bg-card hover:text-white-0 hover:scale-105"
                >
                    Cancelar
                </button>
                <button
                    @click="nuevaVenta"
                    class="p-1 w-1/3 border-2 transition-all duration-200 rounded-lg border-azure-700 text-azure-700 hover:bg-azure-700 hover:text-white-0 hover:scale-105"
                >
                    Realizar
                </button>
            </div>
            <transition name="advice">
                <p
                    v-if="showAdvice"
                    class="absolute p-1 flex items-center text-center justify-center bg-cerise-200 text-cerise-600 left-0 z-50 bottom-9 right-0 m-auto w-11/12 lg:w-1/3 h-fit text-md lg:text-lg rounded-lg"
                >
                    {{ advice }}
                </p>
            </transition>
        </div>
    </div>
</template>
<script>
import Producto from "@/services/ProductoService";
import Dni from "@/services/DniService";
import InputBusqueda from "./InputBusqueda.vue";
import Venta from "@/services/VentasService";
import Comprobante from "@/services/ComprobanteService";
import DetallesVenta from "@/services/DetallesVentaService";
import Empleado from "@/services/EmpleadosService";
export default {
    name: "CardCreateVenta",
    components: { InputBusqueda },
    data() {
        return {
            productos: [],
            disDni: false,
            advice: "",
            namePlace: "Nombre Completo",
            showAdvice: false,
            productosSelected: [],
            ProductosService: new Producto(),
            VentaService: new Venta(),
            DetalleService: new DetallesVenta(),
            ComprobanteService: new Comprobante(),
            EmpleadoService: new Empleado(),
            DniService: new Dni(),
            textInfo: "Productos mas vendidos",
            nombre: "",
            dni: 'null',
        };
    },
    computed: {
        subtotal() {
            let result = this.total;
            if (result ===0) {
                /* result -= (result * 0.18);
                return this.round10(result, -2); */
                return 0;
            }else{
                /* result -= (result * 0.18)+1;
                return this.round10(result, -2); */
                return Number(result - (result*0.18)).toFixed(2);
            }
        },
        igv() {
            let result = this.total
            if (result === 0) {
                return 0;
            } else {
                return Number(result*0.18).toFixed(2);
            }
        },
        total() {
            let result = 0;
            if (this.productosSelected.length > 0) {
                this.productosSelected.forEach((element) => {
                    result += element.precio * element.cantidad;
                });
            }
            return result;
        },
    },
    sockets: {
        connect: function () {
        },
        customEmit: function (data) {
            data
        }
    },
    methods: {
        decimalAdjust(type, value, exp) {
            if (typeof exp === "undefined" || +exp === 0) {
                return Math[type](value);
            }
            value = +value;
            exp = +exp;
            if (isNaN(value) || !(typeof exp === "number" && exp % 1 === 0)) {
                return NaN;
            }
            value = value.toString().split("e");
            value = Math[type](
                +(value[0] + "e" + (value[1] ? +value[1] - exp : -exp))
            );
            value = value.toString().split("e");
            return +(value[0] + "e" + (value[1] ? +value[1] + exp : exp));
        },
        round10(value, exp) {
            return this.decimalAdjust("round", value, exp);
        },
        async adviceMessage(message) {
            this.advice = message;
            this.showAdvice = true;
            setTimeout(() => (this.showAdvice = false), 3000);
        },
        async nuevaVenta() {
            if (this.productosSelected.length <= 0) {
                this.adviceMessage("No se han seleccionado productos");
            } else if (this.nombre.length <= 0 || !this.dni) {
                this.adviceMessage("No se ha validado el DNI");
            } else {
                const idEmpleado = sessionStorage.getItem("idEmpleado");
                const empleado = await this.EmpleadoService.getEmpleadoId(idEmpleado);
                const venta = await this.VentaService.postVentas({
                    precioTotal: this.subtotal,
                    idEmpleado: idEmpleado,
                });
                if (venta.status == 201) {
                    this.$socket.emit('cliente:createVenta', empleado.data);
                    let data = venta.data;
                    await this.ComprobanteService.postComprobante({
                        idComprobante: data.idVenta,
                        dniCliente: `${this.dni}`,
                        nombreCliente: this.nombre,
                        fecha: data.fecha,
                        totalVenta: this.total,
                    });
                    const products = JSON.parse(
                        JSON.stringify(this.productosSelected)
                    );
                    for (let i = 0; i < products.length; i++) {
                        await this.DetalleService.createDetalles({
                            cantidad: products[i].cantidad,
                            idVenta: data.idVenta,
                            idProducto: products[i].idProducto,
                        });
                    }
                    data = {
                        ...data,
                        subtotal:this.subtotal,
                    };
                    console.log(data);
                    await this.loadProductos();
                    this.$emit("createdVenta", data);
                }
            }
        },
        returnAll() {
            this.nombre = "";
            this.dni = null;
            this.disDni = false;
        },
        async validate() {
            if (this.dni) {
                this.namePlace = "Cargando";
                if (this.dni.toString().length < 8) {
                    this.adviceMessage(
                        "El DNI debe contener al menos 8 numeros"
                    );
                } else {
                    const result = await this.DniService.getNombre(
                        this.dni.toString()
                    );
                    if (result.data.success) {
                        this.disDni = true;
                        this.nombre = `${result.data.result.nombres} ${result.data.result.paterno} ${result.data.result.materno}`;
                        this.namePlace = "Nombre Completo";
                    } else {
                        this.adviceMessage("No se encontró el DNI");
                        this.namePlace = "Nombre Completo";
                    }
                }
            } else {
                this.adviceMessage("Ingrese un DNI valido");
            }
        },
        async loadProductos() {
            const data = await this.ProductosService.getProductosVenta();
            this.textInfo = "Productos mas vendidos";
            if (data.status == 200) {
                this.productos = data.data;
            }
        },
        add(item) {
            let valid = [];
            const elemento = {
                idProducto: item.idProducto,
                nombreProducto: item.nombreProducto,
                precio: item.precio,
                stock: item.stock,
                cantidad: 1,
            };
            this.productosSelected.forEach((element) => {
                if (element.idProducto === elemento.idProducto) {
                    valid.push(item);
                }
            });
            if (valid.length <= 0) {
                this.productosSelected.push(elemento);
            }
        },
        testDni() {
            let arr = this.dni.toString();
            if (arr.length > 8) {
                let cut = arr.substring(0, 8);
                this.dni = Number.parseInt(cut);
            }
        },
        test(item) {
            const index = this.productosSelected.indexOf(item);
            const stock = this.productosSelected[index].stock;
            if (item.cantidad <= 0) {
                this.productosSelected[index].cantidad = 1;
            } else if (item.cantidad > stock) {
                let rest = item.cantidad - stock;
                this.productosSelected[index].cantidad -= rest;
            }
        },
        async remove(el) {
            const cut = this.productosSelected.filter((item) => item !== el);
            this.productosSelected = cut;
        },
        async search(name) {
            if (name.length <= 0) {
                this.loadProductos();
            } else {
                const data =
                    await this.ProductosService.getProductosSearchVenta(name);
                if (data.status == 200) {
                    this.textInfo = "Resultados de busqueda";
                    this.productos = data.data;
                } else {
                    await this.adviceMessage(
                        "No hay resultados para la busqueda"
                    );
                }
            }
        },
    },
    async beforeMount() {
        await this.loadProductos();
    },
};
</script>
<style scoped>
/* ===== Scrollbar CSS ===== */
/* Firefox */
.bordes {
    scrollbar-width: auto;
    scrollbar-color: #d4d4d8 #ffffff;
}

/* Chrome, Edge, and Safari */
.bordes::-webkit-scrollbar {
    border-radius: 15px;
    width: 13px;
}

.bordes::-webkit-scrollbar-track {
    border-radius: 15px;
    background: #ffffff;
}

.bordes::-webkit-scrollbar-thumb {
    border-radius: 15px;
    background-color: #d4d4d8;
    border-radius: 10px;
    border: 3px solid #ffffff;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.advice-enter-active {
    animation: adviceIn 300ms;
}

@keyframes adviceIn {
    0% {
        right: 1px;
        opacity: 0.3;
    }
}

.advice-leave-active {
    animation: adviceOut 300ms;
}

@keyframes adviceOut {
    100% {
        right: 1px;
        opacity: 0.1;
    }
}
</style>
