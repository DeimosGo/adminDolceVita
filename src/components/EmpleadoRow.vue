<template>
    <button @click="sendEdit" class="w-300 rounded-xl px-3 h-32 flex border-2 cursor-pointer justify-between items-center shadow-md transition-all
    duration-200 hover:scale-105 hover:shadow-sm opacity-95 hover:opacity-100 relative cardEmpleado"
        >
            <div class="w-2/5 h-full relative flex flex-col">
                <div
                    class="left-0 right-0 m-auto absolute -top-6 flex shadow-lg items-center justify-center
                    h-20 w-20 rounded-xl overflow-hidden bg-island-500"
                >
                    <i class="fa-solid fa-user-tie text-white-0 text-3xl"></i>
                </div>
                <p
                    class="absolute w-full text-center bottom-6 text-gray-500 font-medium text-sm"
                >
                    {{rol}}
                </p>
            </div>
            <div
                class="w-3/5 text-gray-500 h-full flex flex-col ml-8 justify-between py-4 text-start"
            >
                <h3 class="w-full text-center text-gray-800 text-sm font-medium">
                    {{employe.nombres}} {{employe.apellidos}}
                </h3>
                <div class="w-full flex justify-center flex-col space-y-1 place-content-end">
                    <div class="w-2/5 text-sm space-x-4 place-self-end mr-1 font-medium flex justify-between">
                        <p>Edad:</p>
                        <p>{{age}}</p>
                    </div>

                    <div class="text-sm pl-3 space-x-4 pr-4 font-medium flex justify-between">
                        <p>Telefono:</p>
                        <p>{{employe.telefono}}</p>
                    </div>
                </div>
            </div>
            <p class="mensaje w-3/5 text-sm absolute p-2 m-auto left-0 right-0 -bottom-5 text-white-0 bg-gray-600 rounded-lg">
                click para ver los detalles
            </p>
        </button>
</template>
<script>
const getAge = require('get-age')

export default{
    name:'EmpleadoRow',
    props: {
        empleado: Object,
    },
    data(){
        return{
            employe: this.empleado,
            age: 0,
            rol: '',
        }
    },
    emits:['showCardsEdits'],
    methods:{
        edad (fecha) {
            const data = getAge(fecha);
            return data;
        },
        getRol(){
            if (this.employe.idRol===1) {
                this.rol = 'administrador';
            }else{
                this.rol = 'vendedor';
            }
        },
        sendEdit(){
            this.$emit('showCardsEdits', this.employe);
        }
    },
    mounted(){
        this.getRol();
        this.age= this.edad(this.employe.fechaNacimiento);
    }
}
</script>
<style scoped>
.mensaje{
    display: none;
    transition: all 300ms;
    animation: animacion 150ms;
}
@keyframes animacion {
    0%{
        transform: scale(0.2);
    }
}
.cardEmpleado:hover .mensaje{
    display: block;
}
</style>
