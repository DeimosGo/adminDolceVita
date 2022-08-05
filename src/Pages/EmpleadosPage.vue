<template>
    <div v-if="loading" class="w-full h-100v grid place-content-center z-40">
        <LoadingWheel />
    </div>
    <transition name="tableShow">
    <div
        v-if="!loading"
        class="lg:pt-16 w-full px-2 lg:px-10 h-100v flex flex-col justify-center lg:items-end lg:justify-start"
    >
        <div
            class="lg:pt-16 w-full flex lg:flex-row flex-col lg:w-5/6 lg:justify-between items-center lg:items-start"
        >
        <transition name="componentCreated">
            <CreatedElement v-if="createdElement" :message="mensaje"/>
        </transition>
        <div
            @click="quitarTodo"
            v-if="card"
            class="absolute w-screen top-0 right-0 bottom-0 h-100v bg-gray-900 opacity-20 z-20 cursor-pointer"
        ></div>
        <transition name="showEliminar">
            <CardDeleteElement v-if="deleteCard" @eliminar="eliminar" @deleted="deleted" />
        </transition>
        <transition name="fade">
            <CardEmpleado @showCards="showCards" v-if="showCreate" @created="created" />
        </transition>
        <transition name="editCard">
            <CardEditEmpleado v-if="showEdit" @showCardsEdits="showCardsEdits" @editEliminar="editEliminar" @edited="edited" :empleado="empleado" />
        </transition>
            <transition>
                <NotFoundSearch v-if="found" />
            </transition>
            <h2
                class="w-full lg:w-1/3 lg:text-left text-center pt-12 lg:pt-0 text-card text-3xl font-bold"
            >
                {{cantidad}} Empleados
            </h2>
            <div class="w-11/12 lg:w-2/5 flex justify-center items-center space-x-4 lg:mt-0 mt-2">
                <button
                    @click="showCards"
                    class="flex space-x-1 items-center h-10 px-2 rounded-md border-2 text-submarine-600 border-submarine-600 transition-all duration-100 hover:scale-105"
                >
                    <p>Nuevo</p>
                    <i class="fa-solid fa-file-circle-plus w-4"></i>
                </button>
                <ReiniciarFiltros @recargar="loadInfo" />
                <InputBusqueda @search="search" :phText="'Empleado'" class="mt-0" />
            </div>
        </div>
            <div v-if="showLoad"
            class="w-full max-h-70v overflow-y-scroll xl:overflow-y-visible pt-7 place-content-start z-0 lg:justify-start
            justify-center mt-10 place-items-center lg:place-items-start lg:w-5/6 lg:mt-10 grid xl:grid-cols-3
            lg:grid-cols-2 md:grid-cols-2 gap-x-4 gap-y-12">
            <EmpleadoRow
                @showCardsEdits="showCardsEdits"
                v-for="item in empleados"
                :key="item.idEmpleado"
                :empleado="item"
            />
            </div>
    </div>
    </transition>
</template>
<script>
import LoadingWheel from "@/components/LoadingWheel.vue";
import EmpleadoRow from "@/components/EmpleadoRow.vue";
import Empleado from "@/services/EmpleadosService";
import InputBusqueda from "@/components/InputBusqueda.vue";
import CreatedElement from "@/components/CreatedElement.vue";
import NotFoundSearch from "@/components/NotFoundSearch.vue";
import CardEmpleado from "../components/CardEmpleado.vue";
import CardEditEmpleado from "@/components/CardEditEmpleado.vue";
import CardDeleteElement from "@/components/CardDeleteElement.vue";
import ReiniciarFiltros from "@/components/ReiniciarFiltros.vue";
export default {
    name: "EmpleadosPage",
    components: { LoadingWheel, EmpleadoRow, InputBusqueda, NotFoundSearch, CardEmpleado, CreatedElement, CardEditEmpleado, CardDeleteElement, ReiniciarFiltros },
    data() {
        return {
            loading: false,
            EmpleadoService: new Empleado(),
            empleados: [],
            empleado:{},
            cantidad: 0,
            found: false,
            date: null,
            showCreate: false,
            showEdit: false,
            card: false,
            mensaje: '',
            deleteCard: false,
            createdElement: false,
            idEliminar: 0,
            showLoad: false,
        };
    },
    methods: {
        async countEmpleados(){
            const cant = await this.EmpleadoService.getEmpleadosCount();
            if(cant.status == 200){
                this.cantidad = cant.data.cantidad;
            }
        },
        async deleted() {
            const data = await this.EmpleadoService.deleteEmpleado(this.idEliminar);
            if (data.status == 200) {
                let empleados = JSON.parse(JSON.stringify(this.empleados));
                let filtro = [];
                empleados.forEach((element) => {
                    if (element.idEmpleado !== this.idEliminar) {
                        filtro.push(element);
                    }
                });
                this.quitarTodo();
                this.empleados = filtro;
                this.cantidad -= 1;
                await this.advice("Registro eliminado");
                this.idEliminar = 0;
            }
        },
        eliminar(){
            this.idEliminar = 0;
            this.deleteCard = !this.deleteCard;
            this.card = !this.card;
        },
        editEliminar(id){
            this.idEliminar = id;
            this.quitarTodo();
            setTimeout(() => {
                this.deleteCard = !this.deleteCard;
                this.card = !this.card;
            }, 100);
        },
        async advice(mensaje) {
            this.mensaje = mensaje;
            this.createdElement = true;
            setTimeout(() => {
                this.createdElement = false;
            }, 4000);
        },
        async edited(item) {
            this.quitarTodo();
            let empleados = JSON.parse(JSON.stringify(this.empleados));
            for (let i = 0; i < empleados.length; i++) {
                if (empleados[i].idEmpleado == item.idEmpleado) {
                    empleados[i] = item;
                }
            }
            this.empleados = empleados;
            this.loading = !this.loading;
            setTimeout(() => (this.loading = !this.loading), 100);
            await this.advice('Cambios guardados');
        },
        async created(){
            this.quitarTodo();
            this.loading = !this.loading;
            setTimeout(() => (this.loading = !this.loading), 100);
            this.advice('Empleado Creado');
        },
        quitarTodo(){
            this.card = false;
            this.showCreate = false;
            this.showEdit = false;
            this.deleteCard = false;
        },
        showCards(){
            this.card = !this.card;
            this.showCreate = !this.showCreate;
        },
        showCardsEdits(item){
            this.empleado = item;
            this.card = !this.card;
            this.showEdit = !this.showEdit;
        },
        async loadInfo() {
            this.showLoad = false;
            this.loading = true;
            const respuesta = await this.EmpleadoService.getEmpleado(9, 0);
            if (respuesta.status == 200) {
                const data = respuesta.data;
                this.empleados = data;
                this.loading = false;
                this.showLoad = true;
            }
        },
        async search(name) {
            if (name.length <= 0) {
                this.loadInfo();
            } else {
                this.loading = true;
                const respuesta = await this.EmpleadoService.getEmpleadoSearch(name);
                const datos = respuesta.data;
                if (datos.length <= 0) {
                    this.found = true;
                    setTimeout(()=>{
                        this.found = false;
                    },3000);
                    this.loading = false;
                } else {
                    this.loading = false;
                    this.empleados = datos
                }
            }
        },
    },
    async mounted() {
        await this.loadInfo();
        await this.countEmpleados();
    },
};
</script>
<style scoped>

.tableShow-enter-active {
    animation: tableIn 150ms;
}

@keyframes tableIn {
    0%{
        opacity: 0.2;
        transform: scale(0.1);
    }
}

.editCard-leave-active{
    animation: editOut 250ms;
}

@keyframes editOut {
    from{
        opacity: 1;
    }
    to{
        top: 200px;
        opacity: 0;
    }
}


.editCard-enter-active {
    animation: editIn 250ms;
}

@keyframes editIn {
    from{
        opacity: 0.4;
        top: 200px;
    }
}

.fade-enter-active {
    animation: createIn 300ms;
}

@keyframes createIn {
    from {
        top: -800px;
        opacity: 0.8;
    }
    to {
        top: 0;
        opacity: 1;
    }
}

.fade-leave-active {
    animation: createOut 300ms;
}

@keyframes createOut {
    from {
        top: 0;
        opacity: 1;
    }
    to {
        top: -800px;
        opacity: 0;
    }
}


.showEliminar-enter-active{
    animation: enterDelete 250ms;
}

@keyframes enterDelete {
    0%{
        transform: scale(0.1);
    }

    80%{
        transform: scale(1.1);
    }

    100%{
        transform: scale(1);
    }
}

.showEliminar-leave-active{
    animation: leaveDelete 200ms;
}

@keyframes leaveDelete {
    from{
        opacity: 0.5;
        transform: scale(1);
    }
    to{
        opacity: 0;
        transform: scale(0.3);
    }
}

.componentCreated-leave-active {
    animation: outCard 500ms;
}
@keyframes outCard {
    from{
        opacity: 1;
        right: 32px;
    }
    to {
        opacity: 0.1;
        right: 0;
    }
}
.componentCreated-enter-active {
    animation: animacionCard 700ms;
}
@keyframes animacionCard {
    0% {
        opacity: 0.1;
        right: 0;
    }
    100% {
        opacity: 1;
        right: 32px;
    }
}
</style>
