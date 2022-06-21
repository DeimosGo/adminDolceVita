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
                class="w-full flex items-center justify-center h-14 bg-upBar border-r border-b border-b-cerise-900 border-r-cerise-900"
            >
                <p class="font-semibold text-lg text-white-0 cursor-pointer">
                    Dolce Vita
                </p>
            </div>
            <button
                @click="options"
                id="userOptions"
                class="w-full justify-center cursor-pointer flex space-x-1 items-center hover:text-gray-100"
            >
                <div class="border-2 border-fontColor rounded-md">
                    <img
                        src="./../assets/userSide.svg"
                        class="w-4 m-1 iconAside"
                        alt="User button"
                    />
                </div>
                <p class="flex items-center font-bold">David Castillo</p>
            </button>
            <div class="flex w-full flex-col text-sm font-semibold">
                <router-link
                    ref="reportes"
                    to="/reportes"
                    class="w-full py-4 pl-3 hover:bg-upBar"
                    :class="claseProds"
                >
                    <div class="border-2 border-fontColor rounded-md">
                        <img
                            src="./../assets/reportes.svg"
                            class="w-4 m-1 iconAside"
                            alt="User button"
                        />
                    </div>
                    <p>Reportes y Graficas</p>
                </router-link>
                <router-link
                    ref="productos"
                    to="/"
                    class="w-full pl-3 hover:bg-upBar py-4"
                    :class="claseProds"
                >
                    <div class="border-2 border-fontColor rounded-md">
                        <img
                            src="./../assets/cookie.svg"
                            class="w-4 m-1 iconAside"
                            alt="User button"
                        />
                    </div>
                    <p>Productos</p>
                </router-link>
                <router-link
                    ref="ventas"
                    to="/product"
                    class="w-full pl-3 py-4 hover:bg-upBar"
                    :class="claseProds"
                >
                    <div class="border-2 border-fontColor rounded-md">
                        <img
                            src="./../assets/sack.svg"
                            class="w-4 m-1 iconAside"
                            alt="User button"
                        />
                    </div>
                    <p>Ventas</p>
                </router-link>
                <router-link
                    ref="categorias"
                    to="/pros"
                    class="w-full pl-3 py-4 hover:bg-upBar"
                    :class="claseProds"
                >
                    <div class="border-2 border-fontColor rounded-md">
                        <img
                            src="./../assets/categories.svg"
                            class="w-4 m-1 iconAside"
                            alt="User button"
                        />
                    </div>
                    <p>Categorias</p>
                </router-link>
                <router-link
                    ref="empleados"
                    to="/producto"
                    class="w-full pl-3 py-4 hover:bg-upBar"
                    :class="claseProds"
                >
                    <div class="border-2 border-fontColor rounded-md">
                        <img
                            src="./../assets/empleado.svg"
                            class="w-4 m-1 iconAside"
                            alt="User button"
                        />
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
<style scoped>
.svg {
    width: 25px;
    filter: invert(14%) sepia(67%) saturate(3709%) hue-rotate(350deg)
        brightness(77%) contrast(88%);
}
</style>
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
    emits: ["add"],
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
