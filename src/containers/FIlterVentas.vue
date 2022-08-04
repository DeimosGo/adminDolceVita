<template>
    <div>
        <section
            class="relative flex flex-col text-gray-700 items-center justify-between space-y-3 rounded-md"
        >
            <div class="flex flex-row space-x-3">
                <button
                    @click="$emit('nuevaVenta')"
                    class="flex space-x-1 items-center h-10 px-2 rounded-md border-2 text-submarine-600
                    border-submarine-600 transition-all duration-100 hover:scale-105"
                >
                    <p>Nuevo</p>
                    <i class="fa-solid fa-file-circle-plus w-4"></i>
                </button>
                <button
                    @click="mostrar"
                    class="h-10 px-1 z-10 rounded-lg text-azureMarine-800 text-lg flex items-center border-2 border-azureMarine-800 space-x-2 transition-all duration-100 hover:scale-105"
                >
                    <p>Filtrar</p>
                    <i class="fa-solid fa-filter"></i>
                </button>
            </div>
            <transition name="flitros">
                <div v-show="showFilters"
                class="absolute w-56 lg:w-80 top-8 shadow-md shadow-gray-300 flex flex-col bg-white-0 p-2 justify-center
                space-y-4 z-40 border border-gray-200 rounded-lg"
            >
                <div class="flex space-x-2">
                    <date-picker
                        v-model:value="date"
                        lang="es.es"
                        type="date"
                        range
                        placeholder="Rango de fecha"
                        format="YYYY-MM-DD"
                    ></date-picker>
                    <button @click="filtroFecha"
                        class="shadow-gray-300 ml-1 p-1 border-2 border-azure-500 rounded-md text-azure-500 font-medium transition-all
                        duration-200 hover:bg-azure-500 hover:text-white-0 shadow-md hover:shadow-xl hover:scale-110"
                    >
                        Aplicar
                    </button>
                </div>
                <div>
                    <p
                        class="w-fit border-b border-gray-500 text-gray-500 font-medium"
                    >
                        Empleados
                    </p>
                    <ul class="pt-2 grid grid-cols-2 place-content-center justify-center items-center">
                        <li v-for="item in empleados" :key="item.idEmpleado" class="cursor-pointer w-fit place-self-center">
                        <FiltroVentaButton v-bind="$attrs" :key="item.idEmpleado" :item="item" />
                        </li>
                    </ul>
                </div>
            </div>
            </transition>
        </section>
    </div>
</template>
<script>
import DatePicker from "vue-datepicker-next";
import "vue-datepicker-next/index.css";
import "vue-datepicker-next/locale/es.es";
import Empleado from "@/services/EmpleadosService";
import FiltroVentaButton from "@/components/FiltroVentaButton.vue";
export default {
    name: "FilterVentas",
    components: { DatePicker, FiltroVentaButton },
    data() {
        return {
            date: [],
            empleados: [],
            showFilters: false,
            EmpleadoService: new Empleado(),
        };
    },
    methods:{
        filtroFecha(){
            console.log(this.date);
            if (this.date.length === 2) {
                this.$emit('filtrarPorRango', this.date);
            }
        },
        mostrar(){
            this.showFilters = !this.showFilters;
        },
        async cargarEmpleados(){
            const { data } = await this.EmpleadoService.getEmpleado(12, 0);
            this.empleados = data;
        }
    },
    async mounted(){
        await this.cargarEmpleados();
    }
};
</script>
<style scoped>
.flitros-enter-active{
    animation: filterIn 150ms;
}

@keyframes filterIn {
    0%{
        top: 8px;
        opacity: 0.2;
        z-index: 0;
    }
    100%{
        z-index: 0;
    }
}

.flitros-leave-active{
    animation: filterOut 150ms;
}

@keyframes filterOut {
    0%{
        z-index: 0;
    }
    100%{
        z-index: 0;
        top: 8px;
        opacity: 0.2;
    }
}
</style>
