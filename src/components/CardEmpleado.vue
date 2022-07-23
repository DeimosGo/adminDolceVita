<template>
    <div class="w-100 h-50v absolute left-0 right-0 bottom-0 top-0 m-auto bg-white-0 z-30 shadow-2xl rounded-lg p-4 flex flex-col
    justify-between items-center">
        <transition name="error">
            <div
                v-show="errorShow"
                class="w-52 h-14 border-cerise-800 text-cerise-700 absolute top-5 right-0 left-0 m-auto bg-cerise-200
                rounded-lg flex items-center justify-center border-2 text-sm text-center"
            >
                <p>{{ message }}</p>
            </div>
        </transition>
        <h2 class="w-full items-center justify-center text-center text-2xl font-semibold text-azureMarine-800">Nuevo Empleado</h2>
        <div class="w-full flex justify-between items-center space-x-4">
            <input class="w-1/2 border-b text-gray-600 font-semibold border-azureMarine-800 outline-none h-10 pl-1"
            @input="testNombre()" maxlength="100" v-model="nombres"
            autocomplete="none" name="nombres" placeholder="Nombres" type="text">
            <input v-model="apellidos" @input="testApellido()" maxlength="100"
            class="w-1/2 border-b text-gray-600 font-semibold border-azureMarine-800 outline-none h-10 pl-1"
            autocomplete="none" name="apellidos" placeholder="Apellidos" type="text">
        </div>
        <div class="w-full flex justify-start items-center space-x-4">
            <input class="w-1/2 border-b text-gray-600 font-semibold border-azureMarine-800 outline-none h-10 pl-1"
            onkeypress="return (event.charCode >= 48 && event.charCode <= 57)" maxlength="9" v-model="telefono"
            autocomplete="none" name="telefono" placeholder="Telefono" type="number" pattern = "^[0-9]{4}$">
            <div class="relative w-1/2 h-full">
                <button @click="showRoles = !showRoles"
                class="flex justify-between px-2 w-full h-full items-center border-b font-semibold border-azureMarine-800">
                    <p :class="classRol">{{rolSelected}}</p> <i class="fa-solid fa-caret-down text-xs"></i>
                </button>
                <transition name="rolesList">
                    <ul v-show="showRoles" class="absolute w-full bg-white-0 border-x border-azureMarine-800 h-16">
                    <li v-for="item in roles" :key="item.idRol">
                        <button @click="chooseRol(item.idRol, item.nombreRol)" class="w-full text-center h-8 border-b border-azureMarine-800">
                            {{item.nombreRol}}
                        </button>
                    </li>
                </ul>
                </transition>
            </div>
        </div>
        <div class="w-full flex justify-between items-center space-x-4">
            <input name="email" class="w-1/2 border-b text-gray-600 font-semibold border-azureMarine-800 outline-none h-10 pl-1"
            @input="testEmail()" maxlength="100" v-model="email"
            autocomplete="none" placeholder="email@ejemplo.con" type="email">
            <input name="password" maxlength="50" v-model="password"
            autocomplete="none" placeholder="contraseña" type="password"
            class="w-1/2 border-b text-gray-600 font-semibold border-azureMarine-800 outline-none h-10 pl-1">
        </div>
        <div class="flex items-center justify-between w-full">
            <div class="flex flex-row items-center justify-center space-x-4">
                <span class="ml-3 text-sm text-gray-600 font-semibold dark:text-gray-300">Acceso a la plataforma</span>
                <label for="default-toggle" class="inline-flex relative items-center cursor-pointer">
                <input type="checkbox" :checked="activo" id="default-toggle" class="sr-only peer bg-white-0" >
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full
                peer-checked:after:border-white-0 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white-0
                after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600
                peer-checked:bg-azureMarine-600"></div>
            </label>
            </div>
            <date-picker v-model:value="date" class="w-52" lang="es.es" placeholder="Fecha de nacimiento"
            type="date" format="YYYY-MM-DD"></date-picker>
        </div>
        <div class="w-full flex justify-between">
            <button
                @click="createEmpleado()"
                class="w-40 py-1 border-2 text-azure-600 border-azure-600 rounded-md hover:text-white-0
                hover:bg-azure-600 scale-105 shadow-lg transition-all duration-200 hover:scale-100 hover:shadow-none"
            >
                Guardar cambios
            </button>
            <button
                @click="$emit('showCards')"
                class="w-40 py-1 border-2 text-upBar border-upBar rounded-md hover:text-white-0
                hover:bg-upBar scale-105 shadow-lg transition-all duration-200 hover:scale-100 hover:shadow-none"
            >
                Cerrar
            </button>
        </div>
    </div>
</template>
<script>
import DatePicker from 'vue-datepicker-next';
import 'vue-datepicker-next/index.css';
import 'vue-datepicker-next/locale/es.es';
import Rol from './../services/RolesServices'
import moment from 'moment';
import Empleado from '@/services/EmpleadosService';
export default {
    name: 'CardEmpleado',
    components:{DatePicker},
    data(){
        return {
            date: null,
            nombres:'',
            apellidos:'',
            email:'',
            password: '',
            telefono:'',
            RolService: new Rol(),
            EmpleadoService: new Empleado(),
            roles:[],
            idRol: 0,
            rolSelected: 'rol',
            showRoles: false,
            classRol: ['text-gray-400'],
            message:'',
            activo: true,
            errorShow: false,
        }
    },
    methods:{
        testNombre() {
            const nombre = this.nombres.replace(/[^a-zA-Z ]/g, "");
            this.nombres = nombre;
        },
        testApellido() {
            const apellidos = this.apellidos.replace(/[^a-zA-Z ]/g, "");
            this.apellidos = apellidos;
        },
        testFecha(fecha){
            let result = moment(fecha, 'YYYY-MM-DD',true).isValid();
            return result;
        },
        async createEmpleado() {
            const fecha = moment(this.date).format('YYYY-MM-DD');
            const data = {
                nombres: this.nombres.toUpperCase(),
                apellidos: this.apellidos.toUpperCase(),
                telefono: this.telefono.toString(),
                fechaNacimiento: fecha,
                email: this.email || 0,
                password: this.password,
                activo: this.activo,
                idRol:this.idRol
            };
            if (
                data.nombres.length <= 0 ||
                data.apellidos.length <= 0 ||
                data.telefono.length <= 0 ||
                data.fechaNacimiento.length <= 0 ||
                data.email.length <= 0 ||
                data.password.length <= 0 ||
                data.idRol.length <= 0
            ) {
                this.message = "LLene todos lo campos";
                this.errorShow = !this.errorShow;
                setTimeout(() => {
                    this.errorShow = !this.errorShow;
                }, 2000);
            } else if (data.idRol === 0) {
                this.errorShow = !this.errorShow;
                this.message = "Escoja un rol para el empleado";
                setTimeout(() => {
                    this.errorShow = !this.errorShow;
                }, 2000);
            }else if(!this.testFecha(fecha)){
                this.errorShow = !this.errorShow;
                this.message = "Indique una fecha valida";
                setTimeout(() => {
                    this.errorShow = !this.errorShow;
                }, 2000);
            }else if(data.password.length < 12){
                this.errorShow = !this.errorShow;
                this.message = "La contraseña debe tener al menos 12 caracteres";
                setTimeout(() => {
                    this.errorShow = !this.errorShow;
                }, 2000);
            }else if(data.telefono.length < 9 || data.telefono.length > 9){
                this.errorShow = !this.errorShow;
                this.message = "Indique un telefono valido";
                setTimeout(() => {
                    this.errorShow = !this.errorShow;
                }, 2000);
            }
            else {
                const returned = await this.EmpleadoService.postEmpleado(data);
                if (returned.status == 409) {
                    const error = returned.response.data.error[0].path
                    if (error.includes("email")) {
                        this.errorShow = !this.errorShow;
                        this.message = "El correo ya está registrado";
                        setTimeout(() => {
                            this.errorShow = !this.errorShow;
                        }, 2000);
                    }else if (error.includes("telefono")) {
                        this.errorShow = !this.errorShow;
                        this.message = "El telefono ya está registrado";
                        setTimeout(() => {
                            this.errorShow = !this.errorShow;
                        }, 2000);
                    }
                }if (returned.data.created) {
                    this.$emit("created");
                }else {
                    this.errorShow = !this.errorShow;
                    this.message = "Problema de conexion";
                    setTimeout(() => {
                        this.errorShow = !this.errorShow;
                    }, 2000);
                }
            }
        },
        async getRoles(){
            const result = await this.RolService.getRoles();
            this.roles = result.data;
        },
        chooseRol(id, nombre){
            this.idRol = id;
            this.rolSelected = nombre;
            this.classRol = ['text-gray-600'];
            this.showRoles = false;
        },
        testEmail(){
            const condicion = this.email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
            if (condicion) {
                return true;
            }else{
                return false;
            }
        },
        create(){
            const validate = this.testEmail();
            console.log(validate);
        }
    },
    mounted(){
        this.getRoles();
    }
}
</script>
<style scoped>
.rolesList-enter-active {
    animation: intro 150ms;
}
@keyframes intro {
    0%{
        overflow: hidden;
        height: 5px;
    }
    100%{
        overflow: hidden;
    }
}
.rolesList-leave-active{
    animation: outro 150ms;
}
@keyframes outro {
    0%{
        height: 64px;
        overflow: hidden;
    }
    100%{
        height: 0;
        overflow: hidden;
    }
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
.error-leave-active {
    animation: outCard 300ms;
}

@keyframes outCard {
    from {
        opacity: 0.8;
    }
    to {
        opacity: 0;
        transform: scale(0.6);
        overflow: hidden;
    }
}

.error-enter-active {
    animation: animacionCard 300ms;
}

@keyframes animacionCard {
    0% {
        transform: scale(0.5);
        overflow: hidden;
        opacity: 0.1;
    }
    100% {
        transform: scale(1);
        overflow: hidden;
        opacity: 1;
    }
}
</style>
