<template>
    <div
        class="w-full h-fit  flex flex-col py-7 px-2 justify-between rounded-lg z-30 bg-white-0"
    >
        <div class="w-full flex justify-center items-center grayscale mt-1">
            <img
                src="./../assets/logo.png"
                alt="Logo Dolce Vita"
                style="width: 33.333333%;"
            />
        </div>
        <div class="w-full flex flex-col justify-center space-y-2 mb-8">
            <h3
                class="w-full items-center justify-center text-center text-xl font-semibold text-gray-700"
            >
                Dolce Vita E.I.R.L
            </h3>
            <p
                class="w-full items-center justify-center text-center text-base font-medium text-gray-700"
            >
                RUC: 12345678910
            </p>
            <p
                class="w-full items-center justify-center text-center text-sm font-medium text-gray-700"
            >
                TICKET O CINTA ELECTRONICA
            </p>
        </div>
        <div class="w-full flex flex-col justify-center space-y-2 text-sm">
            <div class="w-11/12 flex justify-between">
                <p>Fecha:</p>
                <p>{{comprobant.fecha}}</p>
            </div>
            <div class="w-11/12 flex justify-between">
                <p>DNI:</p>
                <p>{{comprobant.dniCliente}}</p>
            </div>
            <div class="w-11/12 flex justify-between">
                <p>Cliente:</p>
                <p>{{comprobant.nombreCliente}}</p>
            </div>
            <div class="w-11/12 flex justify-between">
                <p>Codigo de venta:</p>
                <p>V000{{comprobant.idComprobante}}</p>
            </div>
        </div>
        <div
            class="w-full h-fit flex flex-col scroll space-y-1 items-center my-6"
        >
            <ul class="w-full flex justify-between items-center text-gray-700">
                <li
                    class="w-2/4 text-center font-medium border-b border-gray-700"
                >
                    producto
                </li>
                <li
                    class="w-1/4 text-center font-medium border-b border-gray-700"
                >
                    cantidad
                </li>
                <li
                    class="w-1/4 text-center font-medium border-b border-gray-700"
                >
                    precio
                </li>
            </ul>
            <ul
                v-for="(item, i) in details"
                :key="i"
                class="w-full flex justify-between items-center text-gray-600"
            >
                <li class="text-center">{{item.nombre_producto.toLowerCase()}}</li>
                <li class="text-center">{{item.cantidad}}</li>
                <li class="text-center">{{item.precio}}</li>
            </ul>
        </div>
        <div class="w-full flex justify-center flex-col space-y-2">
            <div class="w-full flex justify-between font-normal text-base px-4">
                <p class="text-gray-700">Subtotal</p>
                <p class="text-gray-600">{{sold.precio_total}}</p>
            </div>
            <div class="w-full flex justify-between font-normal text-base px-4">
                <p class="text-gray-700">IGV 18%</p>
                <p class="text-gray-600">{{Number(igv)}}</p>
            </div>
            <div class="w-full flex justify-between font-normal text-base px-4">
                <p class="text-gray-700">Total</p>
                <p class="text-gray-600">S/.{{comprobant.totalVenta}}</p>
            </div>
        </div>
        <p
            class="w-full flex justify-center font-light text-justify text-sm px-4 mt-6"
        >
            Representacion impresa del ticket o cinta de venta electronica,
            Autorizado mediante resolucion de intendencia 074005000147/SUNAT
        </p>
        <p
            class="w-full flex justify-center font-medium text-center text-sm px-4 mt-6"
        >
            ¡Gracias por su compra, vuelva pronto!
        </p>
    </div>
</template>
<script>
export default {
    name: "ComprobanteCard",
    props: {
        venta: Object,
        detalles: Object,
        comprobante: Object,
    },
    data() {
        return {
            sold: this.venta,
            details: this.detalles,
            comprobant: this.comprobante,
            igv: 0,
        };
    },
    mounted(){
        this.sold.precio_total
        this.igv = Number((this.sold.precio_total * 0.18)).toFixed(2);
    }
};
</script>
