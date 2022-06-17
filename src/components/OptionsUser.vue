<template>
    <div id="userOp"
    class="bg-white-0 top-0 left-0 right-0 bottom-0 m-auto w-60 h-min bg-white xl:p-4 flex-row xl:absolute fixed z-20 xl:right-1 xl:top-14 border lg:text-2xl text-xl px-7 py-9 rounded-xl"
    >
        <ul class="flex flex-col space-y-1 text-red-900 text-md text-center">
            <li class="py-1"><a href="">Cuenta</a></li>
            <li class="py-1"><a href="">Opciones</a></li>
            <li @click="cerrar" class="py-1"><a href="">Cerrar Sesion</a></li>
        </ul>
    </div>
    <div
        class="bg-gray-400 w-full h-100v absolute z-10 brightness-50 opacity-25"
        @click="options"
    ></div>
</template>
<script>
import router from "@/router";
export default {
    name: "OptionsUser",
    methods: {
        options() {
            this.$emit("add");
        },
        cerrar() {
            sessionStorage.removeItem("sesion");
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("rol");
            router.push("login");
        },
    },
    emits: ["add"],
};
</script>
