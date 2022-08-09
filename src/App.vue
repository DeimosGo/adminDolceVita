<template>
    <SideBar @side="side" v-if="sesion" />
    <router-view @side="side" />
    <div
            v-if="inicioWarn"
            class="flex justify-center items-center space-x-4 w-fit h-fit absolute z-50 top-16 right-5 p-3
            bg-tangerine-400 text-white-0 rounded-lg shadow-lg border-2 border-tangerine-400"
        >
            <p class="text-base font-medium">{{ datos }}</p>
            <span
                class="relative border-2 border-white-0 p-1 rounded-full w-8 h-8 grid place-content-center justify-center items-center"
            >
                <i class="fa-solid fa-bell text-xl text-white-0"></i>
                <i @click="inicioWarn = !inicioWarn"
                class="fa-solid fa-square-xmark text-cerise-600  text-2xl absolute -top-7 -right-8 cursor-pointer p-0 m-0"></i>
            </span>
        </div>
    <transition name="loginNotify">
        <div
            v-if="inicio"
            class="flex justify-center items-center space-x-4 w-fit h-fit absolute z-50 top-16 right-5 p-3
            bg-submarine-400 text-white-0 rounded-lg shadow-lg border-2 border-submarine-500"
        >
            <p class="text-base font-medium">{{ datos }}</p>
            <span
                class="relative border-2 border-white-0 p-1 rounded-full w-8 h-8 grid place-content-center justify-center items-center"
            >
                <i class="fa-solid fa-bell text-xl text-white-0"></i>
                <i @click="inicio = !inicio"
                class="fa-solid fa-square-xmark text-cerise-600  text-2xl absolute -top-7 -right-8 cursor-pointer p-0 m-0"></i>
            </span>
        </div>

    </transition>
</template>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Hind+Madurai:wght@300;400;500;600;700&display=swap");
@import "./tailwind.css";
</style>
<script>
import SideBar from "./containers/SideBar.vue";
/* import SocketMethods from './services/SocketConnection'; */
export default {
    data() {
        return {
            clases: [],
            sesion: false,
            music: require("./assets/notify.mp3"),
            user: {},
            datos: "El administrador David Castillo ha iniciado sesion",
            inicio: false,
            inicioWarn: false
        };
    },
    methods: {
        side(user) {
            this.sesion = !this.sesion;
            if (this.sesion) {
                this.$socket.emit('logged', user);
                this.messageProducto();
                this.messageEditProducto();
                this.messageDeleteProducto();
                this.messageInterval();
                if (user) {
                    console.log(user);
                    if (user.idRol == 1) {
                        this.messageNewVenta();
                        this.messageLogin();
                    }
                }
                /* this.socket.emit("logged", user); */
            }
        },
        messageLogin(){
            this.sockets.subscribe("loginUser", (datos) => {
            if (sessionStorage.getItem("sesion")) {
                this.datos = `El ${datos.rol} ${datos.nombre[0]}${datos.nombre
                    .toLowerCase()
                    .substring(1)}
            ${datos.apellido[0]}${datos.apellido
                    .toLowerCase()
                    .substring(1)} ha iniciado sesion`;
                this.inicio = true;
                const sound = new Audio(this.music);
                sound.muted = true;
                sound.addEventListener("canplaythrough", () => {
                    sound.muted = false;
                    sound.play();
                    sound.volume = 0.5;
                });
                setTimeout(() => {
                    this.inicio = false;
                }, 8000);
            }
        });
        },
        messageProducto(){
            this.sockets.subscribe("server:adviceProducto", (producto) => {
            if (sessionStorage.getItem("sesion")) {
                this.datos = `Se ha registrado el producto ${producto}`;
                this.inicio = true;
                const sound = new Audio(this.music);
                sound.muted = true;
                sound.addEventListener("canplaythrough", () => {
                    sound.muted = false;
                    sound.play();
                    sound.volume = 0.5;
                });
                setTimeout(() => {
                    this.inicio = false;
                }, 8000);
            }
        });
        },
        messageEditProducto(){
            this.sockets.subscribe("server:adviceEditProducto", (producto) => {
            if (sessionStorage.getItem("sesion")) {
                this.datos = `Se han realizado cambios en el producto ${producto}`;
                this.inicio = true;
                const sound = new Audio(this.music);
                sound.muted = true;
                sound.addEventListener("canplaythrough", () => {
                    sound.muted = false;
                    sound.play();
                    sound.volume = 0.5;
                });
                setTimeout(() => {
                    this.inicio = false;
                }, 8000);
            }
        });
        },
        messageNewVenta(){
            console.log('subscribe');
            this.sockets.subscribe("server:adviceNewVenta", (empleado) => {
            if (sessionStorage.getItem("sesion")) {
                this.datos = `${empleado} ha realizado una nueva venta`;
                this.inicio = true;
                const sound = new Audio(this.music);
                sound.muted = true;
                sound.addEventListener("canplaythrough", () => {
                    sound.muted = false;
                    sound.play();
                    sound.volume = 0.5;
                });
                setTimeout(() => {
                    this.inicio = false;
                }, 8000);
            }
        });
        },
        messageDeleteProducto(){
            this.sockets.subscribe("server:adviceDeleteProducto", (producto) => {
            if (sessionStorage.getItem("sesion")) {
                this.datos = `Se ha eliminado el producto ${producto}`;
                this.inicioWarn = true;
                const sound = new Audio(this.music);
                sound.muted = true;
                sound.addEventListener("canplaythrough", () => {
                    sound.muted = false;
                    sound.play();
                    sound.volume = 0.5;
                });
                setTimeout(() => {
                    this.inicioWarn = false;
                }, 8000);
            }
        });
        },
    },
    sockets: {
        connect: function () {
        },
        customEmit: function (data) {
            data
        }
    },
    components: { SideBar },
    async mounted() {
        console.log();
        if (sessionStorage.getItem("sesion")) {
            this.side();
            this.messageProducto();
            this.messageEditProducto();
            this.messageDeleteProducto();
            sessionStorage.getItem("rol")
            if (sessionStorage.getItem("rol") === '1') {
                this.messageNewVenta();
                this.messageLogin();
            }
        }
    },
};
</script>
<style scoped>
.loginNotify-enter-active {
    animation: logIn 300ms;
}

@keyframes logIn {
    0% {
        top: 40px;
        opacity: 0.1;
    }
}

.loginNotify-leave-active {
    animation: logOut 300ms;
}

@keyframes logOut {
    100% {
        top: 90px;
        opacity: 0;
    }
}
</style>
