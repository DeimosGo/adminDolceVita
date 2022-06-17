<template>
    <div id="all"
        class="w-full h-100v flex flex-col items-center place-content-center"
    >
        <section
            class="rounded-xl bg-white-0 shadow-md py-8 w-11/12 lg:w-2/4 md:w-2/4 lg:h- h-90v place-content-center space-y-8 items-center flex flex-col"
        >
            <img
                class="w-36 h-36 lg:w-56 lg:h-56"
                src="../assets/logo.png"
                alt="Logo Dolce Vita"
            />
            <h1 class="w-full text-center text-xl">Sistema Administrativo</h1>
            <form class="text-sm w-4/5 lg:w-3/5 space-y-8 flex flex-col px-3">
                <div>
                    <label for="#mail">Correo:</label>
                    <input
                        id="mail"
                        class="w-full mt-2 outline-none border-b border-cerise-200"
                        v-model="email"
                        type="email"
                    />
                </div>
                <div>
                    <label for="#password">Contraseña:</label>
                    <input
                        id="password"
                        class="w-full mt-2 outline-none border-b border-cerise-200"
                        v-model="pass"
                        type="password"
                    />
                </div>
            </form>
            <p class="text-cerise-600">{{ valid }}</p>
            <button
                @click="access"
                class="bg-teal-500 rounded-md text-white-0 py-2 px-4 text-md"
            >
                Ingresar
            </button>
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
        };
    },
    props: {
        statusLog: Boolean,
    },
    /* http://localhost:3000/api/v1/empleados/ */
    methods: {
        async access() {
            if (this.email.length !== 0 && this.pass.length !== 0) {
                try {
                    const respuesta = await axios({
                        method: "post",
                        url: "http://192.168.1.109:3000/api/v1/auth/login",
                        data: {
                            email: this.email,
                            password: this.pass,
                        },
                    });
                    if (respuesta.status == 200) {
                        console.log(respuesta);
                        const data = await respuesta.data.token;
                        const rol = await respuesta.data.usuario.idRol;
                        this.valid = "";
                        console.log(rol);
                        sessionStorage.setItem("sesion", true);
                        sessionStorage.setItem("token", data);
                        sessionStorage.setItem("rol", rol);
                        this.$emit("side");
                        router.push("/");
                    }
                } catch (error) {
                    if (error.response.status === 401) {
                        this.valid = "Correo o contraseña invalidos";
                        console.clear();
                    }
                    else{
                        this.valid = "Conexion no establecida";
                        console.clear();
                    }
                }
            } else {
                this.valid = "Faltan datos";
                console.clear();
            }
        },
    },
};
</script>
<style scoped>
#all {
    /* background-image: url('./../assets/fondoDona.jpg'); */
    background-image: url('./../assets/fondoMesa.jpg');
    background-size: contain;
}
</style>
