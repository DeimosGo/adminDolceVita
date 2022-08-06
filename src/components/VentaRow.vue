<template>
    <div
        class="w-full flex justify-center items-center rounded-full shadow-md bg-gray-50"
    >
        <ul class="w-full flex justify-between lg:px-8 px-2 py-2 text-gray-800">
            <li class="w-1/4 text-center justify-center flex items-center">{{ sold.fecha }}</li>
            <li class="w-1/4 justify-center flex items-center text-left">
                S/. {{ sold.precio_total }}
            </li>
            <li class="w-1/4 text-center justify-center flex items-center">
                {{ sold.nombres[0] + sold.nombres.toLowerCase().substring(1) }}
                {{
                    sold.apellidos[0] +
                    sold.apellidos.toLowerCase().substring(1)
                }}
            </li>
            <li class="w-1/4 justify-center space-x-2 text-center flex">
                <button
                    @click="showDetails"
                    class="flex font-medium text-azureAqua-500 rounded-md border px-1 border-azureAqua-500 justify-center
                    transition-all duration-200 transform hover:scale-105 items-center space-x-1"
                >
                    <p>Detalles</p>
                    <i class="fa-solid fa-circle-info text-md"></i>
                </button>
                <button @click="printComprobante" class="flex text-sm font-medium text-pumpkin-600 rounded-md border px-1 border-pumpkin-600 justify-center
                transition-all duration-200 transform hover:scale-105 items-center">
                    <i class="fa-solid fa-print text-2xl"></i>
                </button>
                <button v-if="admin" @click="deleteProduct" class="p-0 m-0">
                    <i
                        class="fa-regular fa-circle-xmark text-cerise-800 text-2xl scale-105 hover:scale-100"
                    ></i>
                </button>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'VentaRow',
    props:{
        venta: Object,
    },
    data(){
        return {
            sold: this.venta,
            admin: false,
        }
    },
    emits:['showDetails'],
    methods:{
        showDetails(){
            this.$emit('showDetails', this.sold);
        },
        printComprobante(){
            this.$emit('printComprobante', this.sold);
        },
        deleteProduct(){
            this.$emit('deleteProduct', this.sold.id_venta);
        },
        validateDelete(){
            const rol = Number(sessionStorage.getItem("rol"));
            if (rol === 1) {
                this.admin = true;
            }
        }
    },
    beforeMount(){
        this.validateDelete();
    }
};
</script>
