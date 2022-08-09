<template>
    <div
        id="all"
        class="relative w-full h-100v flex flex-col items-center place-content-center"
    >
        <transition name="alertError">
            <div v-if="error" class="absolute right-0 left-0 top-8 m-auto flex justify-center items-center w-11/12 lg:w-80 py-1 alert rounded-xl">
                <p class="text-white-0 text-xl font-semibold">{{ valid }}</p>
            </div>
        </transition>

        <section
            class="w-full lg:w-2/5 md:w-2/5 lg:h- h-70v place-content-start justify-between space-y-8 items-center flex flex-col"
        >
            <img
                class="w-36 h-36 lg:w-56 lg:h-56"
                src="../assets/logo.png"
                alt="Logo Dolce Vita"
            />
            <h1
                class="w-full text-center text-xl lg:text-2xl text-white-0 font-bold"
            >
                Sistema Administrativo
            </h1>
            <form class="text-sm w-4/5 lg:w-3/5 space-y-8 flex flex-col px-3">
                <div>
                    <input
                        id="mail"
                        autocomplete="none"
                        class="w-full px-4 py-1 h-10 text-white-0 rounded-full mt-2 outline-none cardLogin placeholder:font-medium placeholder:text-gray-200 transition-all duration-100 hover:border hover:border-gray-300 focus:border focus:border-gray-300"
                        v-model="email"
                        type="email"
                        placeholder="email@ejemplo.com"
                    />
                </div>
                <div>
                    <input
                        id="password"
                        class="w-full px-4 py-1 h-10 text-white-0 rounded-full mt-2 outline-none cardLogin placeholder:font-medium placeholder:text-gray-200 transition-all duration-100 hover:border hover:border-gray-300 focus:border focus:border-gray-300"
                        v-model="pass"
                        @keyup.enter="access"
                        type="password"
                        placeholder="contraseña"
                    />
                </div>
            </form>
            <div class="w-4/5 lg:w-3/5 flex flex-col px-3">
                <button
                    @click="access"
                    class="w-full font-semibold text-white-0 rounded-full transition-all duration-200 hover:-translate-y-1
                    bg-saffron-500 py-2 px-4 text-md hover:scale-105 hover:shadow-sm shadow-md"
                >
                    Ingresar
                </button>
            </div>
        </section>
    </div>
</template>

<script>
import axios from "axios";
import router from "@/router";

if (sessionStorage.getItem("sesion")) {
    router.push("/");
}
export default {
    name: "FormLogin",
    data() {
        return {
            valid: "",
            email: "",
            pass: "",
            error: false,
        };
    },
    props: {
        statusLog: Boolean,
    },
    emits: ['side'],
    methods: {
        async access() {
            if (this.email.length !== 0 && this.pass.length !== 0) {
                try {
                    const respuesta = await axios({
                        method: "post",
                        url: "https://restdolcevita.herokuapp.com/api/v1/auth/login",
                        data: {
                            email: this.email,
                            password: this.pass,
                        },
                    });
                    console.log(respuesta);
                    if (respuesta.status === 200) {
                        const data = await respuesta.data.token;
                        const rol = await respuesta.data.usuario.idRol;
                        const idEmpleado = await respuesta.data.usuario.idEmpleado;
                        const nombre = respuesta.data.usuario.nombres;
                        const apellido = respuesta.data.usuario.apellidos;
                        this.valid = "";
                        sessionStorage.setItem("sesion", true);
                        sessionStorage.setItem("token", data);
                        sessionStorage.setItem("rol", rol);
                        sessionStorage.setItem("idEmpleado", idEmpleado);
                        sessionStorage.setItem("nombre", nombre);
                        sessionStorage.setItem("apellido", apellido);
                        this.$emit('side', respuesta.data.usuario);
                        router.push("/");
                    }
                } catch (error) {
                    console.log(error.response.data.message);
                    if (error.response.status === 401) {
                        this.valid = "Correo o contraseña invalidos";
                        this.error = true;
                        setTimeout(() =>{this.error = false;},3000)
                    }else if (error.response.status === 403) {
                        this.valid = "Usuario deshabilitado";
                        this.error = true;
                        setTimeout(() =>{this.error = false;},3000)
                    }else if (error.response.data.message==='sesion'){
                        this.valid = "Ya hay una sesion activa";
                        this.error = true;
                        setTimeout(() =>{this.error = false;},3000)
                    }
                    else {
                        this.valid = "Conexion no establecida";
                        this.error = true;
                        setTimeout(() =>{this.error = false;},3000)
                    }
                }
            } else {
                this.valid = "Faltan datos";
                this.error = true;
                setTimeout(() =>{this.error = false;},3000);
            }
        },
    },
};
</script>
<style scoped>
.cardLogin {
    background-color: rgba(255, 255, 255, 0.3);
}
.cardLogin:hover,
.cardLogin:focus {
    background-color: rgba(255, 255, 255, 0);
}
#all {
    /* background-image: url('./../assets/fondoDona.jpg'); */
    background-image: url("./../assets/fondo3.jpg");
    background-position: center center;
    background-size: cover;
}
.alert{
background-color: rgba(225, 0, 0, 0.4);
}
.alertError-enter-active {
    animation: alertIn 200ms;
};

@keyframes alertIn {
    0%{
        opacity: 0.1;
        transform: translateY(-50px);
    }
}
.alertError-leave-active {
    animation: alertOut 200ms;
};

@keyframes alertOut {
    100%{
        opacity: 0.1;
        transform: translateY(-15px);
    }
}
</style>
