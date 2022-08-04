<template>
    <div id="printContent" class="w-80 h-50v shadow-2xl flex flex-col py-7 px-2 justify-between rounded-lg
    absolute top-0 left-0 right-0 bottom-0 m-auto z-30 bg-white-0">
    <h3 class="w-full items-center justify-center text-center text-2xl font-medium text-azureMarine-700">
        Venta del {{sell.fecha}}
    </h3>
    <p class="w-full items-center justify-center text-center text-lg font-medium text-gray-700">
        Realizada por {{ sell.nombres[0] + sell.nombres.toLowerCase().substring(1) }}
                {{
                    sell.apellidos[0] +
                    sell.apellidos.toLowerCase().substring(1)
                }}
    </p>
    <div class="w-full h-44 overflow-y-scroll flex flex-col scroll space-y-1 items-center">
        <ul class="w-full flex justify-between items-center text-azureMarine-700">
            <li class="w-2/4 text-center font-medium border-b border-azureMarine-700">producto</li>
            <li class="w-1/4 text-center font-medium border-b border-azureMarine-700">cantidad</li>
            <li class="w-1/4 text-center font-medium border-b border-azureMarine-700">precio</li>
        </ul>
        <ul v-for="(item, i) in detalles" :key="i" class="w-full flex justify-between items-center text-sm text-gray-600">
            <p class="w-2/4 h-6 text-center">{{item.nombre_producto}}</p>
            <p class="w-1/4 text-center">{{item.cantidad}}</p>
            <p class="w-1/4 text-center">{{item.precio}}</p>
        </ul>
    </div>
    <div class="w-full flex justify-between font-medium text-lg">
        <p class="text-azureMarine-700">Subtotal</p>
        <p class="text-gray-600">{{sell.subtotal}}</p>
    </div>
    <div class="w-full flex justify-between font-medium text-lg">
        <p class="text-azureMarine-700">IGV</p>
        <p class="text-gray-600">{{igv.toFixed(2)}}</p>
    </div>
    <div class="w-full flex justify-between font-medium text-lg">
        <p class="text-azureMarine-700">Total</p>
        <p class="text-gray-600">{{sell.precio_total}}</p>
    </div>
    <button @click="cerrar"
    class="w-full border-2 border-azureMarine-700 text-azureMarine-700 p-1 rounded-md transition-all duration-200 hover:scale-95
    hover:text-white-0 hover:bg-azureMarine-700">
    Cerrar
    </button>
</div>
</template>
<script>
import DetallesVenta from './../services/DetallesVentaService';
export default {
    name: 'CardVentas',
    props:{
        venta: Object,
    },
    computed:{
        igv() {
            return this.sell.precio_total - this.sell.subtotal;
        }
    },
    data(){
        return {
            detalles: {},
            DetallesService: new DetallesVenta(),
            sell: this.venta,
        }
    },
    emits:['quitarTodo'],
    methods:{
        async cerrar(){
            this.$emit('quitarTodo');
        },
        async loadItems(){
            const result = await this.DetallesService.getDetails(this.sell.id_venta);
            this.detalles = result.data;
        }
    },
    async beforeMount(){
        await this.loadItems();
    }
}
</script>
<style scoped>
/* ===== Scrollbar CSS ===== */
/* Firefox */
.scroll {
    scrollbar-width: auto;
    scrollbar-color: #d4d4d8 #ffffff;
}

/* Chrome, Edge, and Safari */
.scroll::-webkit-scrollbar {
    border-radius: 15px;
    width: 10px;
}

.scroll::-webkit-scrollbar-track {
    border-radius: 15px;
    background: #ffffff;
}

.scroll::-webkit-scrollbar-thumb {
    border-radius: 15px;
    background-color: #d4d4d8;
    border-radius: 10px;
    border: 3px solid #ffffff;
}
</style>
