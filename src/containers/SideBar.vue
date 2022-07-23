<template>
    <div
        class="flex items-center justify-start absolute z-50 w-full h-14 bg-upBar"
    >
        <p
            to="/"
            class="font-semibold text-lg text-white-0 cursor-pointer pl-4"
        >
            Dolce Vita
        </p>
    </div>
    <aside
        class="lg:flex hidden absolute z-50 text-sm text-fontColor shadow-xs shadow-cerise-800 bg-card flex-col w-48 h-full pb-2 justify-between items-center"
    >
        <div class="w-full flex flex-col h-50v justify-between">
            <div
                class="w-full flex items-center space-x-2 justify-center h-14 bg-upBar border-r border-b border-b-cerise-900 border-r-cerise-900"
            >
            <img src="./../assets/logo.png" alt="Dolce Vita Logo" class="w-11">
                <p class="font-semibold text-lg text-white-0 cursor-pointer">
                    Dolce Vita
                </p>
            </div>
            <button
                @click="options"
                id="userOptions"
                class="w-full justify-center cursor-pointer flex space-x-1 items-center hover:text-gray-100"
            >
                <div class="border-2 border-fontColor rounded-md px-1.5">
                <i class="fa-solid fa-user-tie text-fontColor text-xl"></i>
                </div>
                <p class="flex items-center font-bold">David Castillo</p>
            </button>
            <div class="flex w-full flex-col text-sm font-semibold">
                <router-link
                    ref="reportes"
                    to="/"
                    class="w-full py-4 pl-3 hover:bg-upBar"
                    :class="claseProds"
                >
                    <div class="border-2 border-fontColor rounded-md text-fontColor">
                        <i class="fa-solid fa-chart-column px-1 text-base"></i>
                    </div>
                    <p>Reportes y Graficas</p>
                </router-link>
                <router-link
                    ref="productos"
                    to="/productos"
                    class="w-full pl-3 hover:bg-upBar py-4"
                    :class="claseProds"
                >
                    <div class="border-2 border-fontColor rounded-md text-fontColor">
                        <i class="fa-solid fa-cookie-bite px-1 text-base"></i>
                    </div>
                    <p>Productos</p>
                </router-link>
                <router-link
                    ref="ventas"
                    to="/ventas"
                    class="w-full pl-3 py-4 hover:bg-upBar"
                    :class="claseProds"
                >
                    <div class="border-2 border-fontColor rounded-md text-fontColor">
                        <i class="fa-solid fa-sack-dollar px-1 text-base"></i>
                    </div>
                    <p>Ventas</p>
                </router-link>
                <router-link
                    ref="categorias"
                    to="/categorias"
                    class="w-full pl-3 py-4 hover:bg-upBar"
                    :class="claseProds"
                >
                    <div class="border-2 border-fontColor rounded-md text-fontColor">
                        <i class="fa-solid fa-diagram-project px-1 text-base"></i>
                    </div>
                    <p>Categorias</p>
                </router-link>
                <router-link
                    ref="empleados"
                    to="/empleados"
                    class="w-full pl-3 py-4 hover:bg-upBar"
                    :class="claseProds"
                >
                    <div class="border-2 border-fontColor rounded-md text-fontColor">
                        <i class="fa-solid fa-people-carry-box px-1 text-base"></i>
                    </div>
                    <p>Empleados</p>
                </router-link>
            </div>
        </div>
        <div class="flex w-full flex-col pl-4 pb-2">
            <button
                @click="cerrar"
                class="flex w-full text-center text-lg font-bold space-x-2"
            >
                <div class="border-2 border-fontColor rounded-md">
                    <img
                        class="w-5 m-1 iconAside"
                        src="./../assets/logout.png"
                        alt="Cerrar sesion"
                    />
                </div>
                <p>Cerrar sesion</p>
            </button>
        </div>
    </aside>
</template>
<script>
import router from "@/router";
export default {
    name: "AsideBar",
    data() {
        return {
            claseProds: [
                "w-full",
                "hover:text-gray-200",
                "items-center",
                "space-x-2",
                "flex",
                "text-fontColor",
            ],
            show: false,
        };
    },
    emits: ['add','side'],
    methods: {
        options() {
            this.$emit("add");
            console.log(this.links[0]);
        },
        cerrar() {
            sessionStorage.removeItem("sesion");
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("rol");
            this.$emit("side");
            router.push("login");
        },
    },
};
</script>
<style scoped>
.iconAside {
    filter: invert(95%) sepia(5%) saturate(3549%) hue-rotate(298deg)
        brightness(96%) contrast(82%);
}
.router-link-active {
    color: #ffffff;
    border-left: 4px solid #ffffff;
    padding-left: 8px;
    background-color: #be5555;
}
</style>
