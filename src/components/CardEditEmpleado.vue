<template>
    <div
        class="w-11/12 lg:w-100 h-70v lg:h-50v absolute left-0 right-0 bottom-0 top-0 m-auto bg-white-0 z-30 shadow-2xl
        rounded-lg p-4 flex flex-col justify-between items-center"
    >
        <transition name="error">
            <div
                v-show="errorShow"
                class="w-52 h-14 border-cerise-800 text-cerise-700 absolute top-5 right-0 left-0 m-auto bg-cerise-200 rounded-lg flex items-center justify-center border-2 text-sm text-center"
            >
                <p>{{ message }}</p>
            </div>
        </transition>
        <h2
            class="w-full items-center justify-center text-center text-2xl font-medium text-azureMarine-800"
        >
            Manejo del Empleado
        </h2>
        <div class="w-full flex justify-between items-center space-x-4">
            <input
                class="w-1/2 border-b text-gray-600 font-medium border-azureMarine-800 outline-none h-10 pl-1"
                @input="testNombre()"
                maxlength="100"
                v-model="nombres"
                autocomplete="none"
                name="nombres"
                placeholder="Nombres"
                type="text"
            />
            <input
                v-model="apellidos"
                @input="testApellido()"
                maxlength="100"
                class="w-1/2 border-b text-gray-600 font-medium border-azureMarine-800 outline-none h-10 pl-1"
                autocomplete="none"
                name="apellidos"
                placeholder="Apellidos"
                type="text"
            />
        </div>
        <div class="w-full flex justify-start items-center space-x-4">
            <input
                class="w-1/2 border-b text-gray-600 font-medium border-azureMarine-800 outline-none h-10 pl-1"
                onkeypress="return (event.charCode >= 48 && event.charCode <= 57)"
                maxlength="9"
                v-model="telefono"
                autocomplete="none"
                name="telefono"
                placeholder="Telefono"
                type="number"
                pattern="^[0-9]{4}$"
            />
            <div class="relative w-1/2 h-full">
                <button
                    @click="showRoles = !showRoles"
                    class="flex justify-between px-2 w-full h-full items-center border-b font-medium border-azureMarine-800"
                >
                    <p :class="classRol">{{ rolSelected }}</p>
                    <i class="fa-solid fa-caret-down text-xs"></i>
                </button>
                <transition name="rolesList">
                    <ul
                        v-show="showRoles"
                        class="absolute w-full bg-white-0 border-x border-azureMarine-800 h-16"
                    >
                        <li v-for="item in roles" :key="item.idRol">
                            <button
                                @click="chooseRol(item.idRol, item.nombreRol)"
                                class="w-full text-center h-8 border-b border-azureMarine-800"
                            >
                                {{ item.nombreRol }}
                            </button>
                        </li>
                    </ul>
                </transition>
            </div>
        </div>
        <div class="w-full flex flex-col lg:flex-row justify-between items-center space-y-3 lg:space-y-0 lg:space-x-4 space-x-0">
            <input
                name="email"
                class="w-full lg:w-1/2 border-b text-gray-600 font-medium border-azureMarine-800 outline-none h-10 pl-1"
                @input="testEmail()"
                maxlength="100"
                v-model="email"
                autocomplete="none"
                placeholder="email@ejemplo.con"
                type="email"
            />
            <input
                name="password"
                maxlength="50"
                v-model="password"
                autocomplete="none"
                placeholder="contraseña"
                type="password"
                class="w-full lg:w-1/2 border-b text-gray-600 font-medium border-azureMarine-800 outline-none h-10 pl-1"
            />
        </div>
        <div class="flex items-center justify-between w-full">
            <div class="flex flex-row items-center justify-center space-x-4">
                <span
                    class="ml-3 text-sm text-gray-600 font-medium dark:text-gray-300"
                    >Acceso a la plataforma</span
                >
                <label
                    for="default-toggle"
                    class="inline-flex relative items-center cursor-pointer"
                >
                    <input
                        type="checkbox"
                        v-model="activo"
                        id="default-toggle"
                        class="sr-only peer bg-white-0"
                    />
                    <div
                        class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white-0 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white-0 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-azureMarine-600"
                    ></div>
                </label>
            </div>
            <date-picker
                v-model:value="date"
                class="w-52"
                lang="es.es"
                placeholder="Fecha de nacimiento"
                type="date"
                format="YYYY-MM-DD"
            ></date-picker>
        </div>
        <div class="w-full flex justify-between space-x-4 lg:space-x-0">
            <button
                @click="editEmpleado()"
                class="w-1/3 text-xs lg:text-base lg:w-40 py-1 border-2 text-azure-600 border-azure-600 rounded-md hover:text-white-0 hover:bg-azure-600
                scale-105 shadow-lg transition-all duration-200 hover:scale-100 hover:shadow-none"
            >
                Guardar
            </button>
            <button
                @click="$emit('editEliminar', idEmpleado)"
                class="flex justify-center items-center space-x-2 w-1/3 lg:w-40 py-1 border-2 text-cerise-500 border-cerise-500 rounded-md
                hover:text-white-0 hover:bg-cerise-500 scale-100 shadow-lg transition-all duration-200 hover:scale-95 hover:shadow-none"
            >
                <p class="h-full mt-1">Eliminar</p>
                <i class="fa-regular fa-circle-xmark text-lg h-full"></i>
            </button>
            <button
                @click="$emit('showCardsEdits')"
                class="w-1/3 lg:w-40 py-1 border-2 text-upBar border-upBar rounded-md hover:text-white-0 hover:bg-upBar scale-105
                shadow-lg transition-all duration-200 hover:scale-100 hover:shadow-none"
            >
                Cerrar
            </button>
        </div>
    </div>
</template>
<script>
import DatePicker from "vue-datepicker-next";
import "vue-datepicker-next/index.css";
import "vue-datepicker-next/locale/es.es";
import Rol from "./../services/RolesServices";
import moment from "moment";
import Empleado from "@/services/EmpleadosService";
export default {
    name: "CardEditEmpleado",
    components: { DatePicker },
    props: {
        empleado: Object,
    },
    data() {
        return {
            date: null,
            idEmpleado: this.empleado.idEmpleado,
            nombres: this.empleado.nombres,
            apellidos: this.empleado.apellidos,
            email: this.empleado.email,
            password: "",
            telefono: this.empleado.telefono,
            RolService: new Rol(),
            EmpleadoService: new Empleado(),
            roles: [],
            idRol: this.empleado.idRol,
            rolSelected: "rol",
            showRoles: false,
            classRol: ["text-gray-600"],
            message: "",
            activo: this.empleado.activo,
            errorShow: false,
        };
    },
    methods: {
        loadData() {
            this.date = moment(
                this.empleado.fechaNacimiento,
                "YYYY-MM-DD"
            ).toDate();
            this.idRol = this.empleado.idRol;
            const index = this.roles.findIndex(
                (item) => (item.idRol === this.idRol)
            );
            this.rolSelected = this.roles[index].nombreRol;
        },
        testNombre() {
            const nombre = this.nombres.replace(/[^a-zA-Z ]/g, "");
            this.nombres = nombre;
        },
        testApellido() {
            const apellidos = this.apellidos.replace(/[^a-zA-Z ]/g, "");
            this.apellidos = apellidos;
        },
        testFecha(fecha) {
            let result = moment(fecha, "YYYY-MM-DD", true).isValid();
            return result;
        },
        async editEmpleado() {
            const fecha = moment(this.date).format("YYYY-MM-DD");
            const modelo = {
                nombres: "",
                apellidos: "",
                telefono: "",
                fechaNacimiento: "",
                email: "",
                activo: false,
                idRol: 0,
            };
            const replace = [
                this.nombres.toUpperCase(),
                this.apellidos.toUpperCase(),
                this.telefono.toString(),
                fecha,
                this.email,
                this.activo,
                this.idRol,
            ];
            let objetoSend = {};
            let claves = Object.keys(modelo);
            const old = [
                this.empleado.nombres,
                this.empleado.apellidos,
                this.empleado.telefono,
                this.empleado.fechaNacimiento,
                this.empleado.email,
                this.empleado.activo,
                this.empleado.idRol,
            ];
            if (this.password.length > 0) {
                modelo.password = "";
                old.push(this.empleado.password);
                replace.push(this.password);
                claves = Object.keys(modelo);
            }
            for (let i = 0; i < claves.length; i++) {
                let clave = claves[i];
                if (replace[i] !== old[i]) {
                    objetoSend[clave] = replace[i];
                }
            }
            if (objetoSend.password && this.password.length > 0 && this.password.length < 12) {
                    this.errorShow = !this.errorShow;
                    this.message = "La contraseña debe tener al menos 12 caracteres";
                    setTimeout(() => {
                        this.errorShow = !this.errorShow;
                    }, 2000);
            }
            else if (Object.keys(objetoSend).length <= 0) {
                this.message = "No se han detectado cambios";
                this.errorShow = !this.errorShow;
                setTimeout(() => {
                    this.errorShow = !this.errorShow;
                }, 2000);
            } else if (
                this.nombres.length <= 0 ||
                this.apellidos.length <= 0 ||
                this.telefono.length <= 0 ||
                fecha.length <= 0 ||
                this.email.length <= 0 ||
                this.idRol.length <= 0
            ) {
                this.message = "LLene todos lo campos";
                this.errorShow = !this.errorShow;
                setTimeout(() => {
                    this.errorShow = !this.errorShow;
                }, 2000);
            } else if (this.idRol === 0) {
                this.errorShow = !this.errorShow;
                this.message = "Escoja un rol para el empleado";
                setTimeout(() => {
                    this.errorShow = !this.errorShow;
                }, 2000);
            } else if (!this.testFecha(fecha)) {
                this.errorShow = !this.errorShow;
                this.message = "Indique una fecha valida";
                setTimeout(() => {
                    this.errorShow = !this.errorShow;
                }, 2000);
            }else if(objetoSend.email && !this.testEmail()){
                        this.errorShow = !this.errorShow;
                        this.message = "Indique un email valido";
                        setTimeout(() => {
                            this.errorShow = !this.errorShow;
                        }, 2000);
            }else if(objetoSend.telefono) {
                    if (objetoSend.telefono.length < 9 || objetoSend.telefono.length > 9) {
                        this.errorShow = !this.errorShow;
                        this.message = "Indique un telefono valido";
                        setTimeout(() => {
                            this.errorShow = !this.errorShow;
                        }, 2000);
                        }
            } else {
                let validate = true;
                if(validate) {
                    const returned = await this.EmpleadoService.patchEmpleado(
                        this.idEmpleado,
                        objetoSend
                    );
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
                    }
                    else if (returned.data.updated) {
                        const nuevo = await this.EmpleadoService.getEmpleadoId(this.idEmpleado);
                        this.$emit("edited", nuevo.data);
                    } else {
                        this.errorShow = !this.errorShow;
                        this.message = "Problema de conexion";
                        setTimeout(() => {
                            this.errorShow = !this.errorShow;
                        }, 2000);
                    }
                }
            }
        },
        async getRoles() {
            const result = await this.RolService.getRoles();
            this.roles = result.data;
        },
        chooseRol(id, nombre) {
            this.idRol = id;
            this.rolSelected = nombre;
            this.classRol = ["text-gray-600"];
            this.showRoles = false;
        },
        testEmail() {
            const condicion = this.email
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
            if (condicion) {
                return true;
            } else {
                return false;
            }
        },
    },
    async mounted() {
        await this.getRoles();
        this.loadData();
    },
};
</script>
<style scoped>
.rolesList-enter-active {
    animation: intro 150ms;
}
@keyframes intro {
    0% {
        overflow: hidden;
        height: 5px;
    }
    100% {
        overflow: hidden;
    }
}
.rolesList-leave-active {
    animation: outro 150ms;
}
@keyframes outro {
    0% {
        height: 64px;
        overflow: hidden;
    }
    100% {
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
