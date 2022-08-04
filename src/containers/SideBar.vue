<template>
    <div
        class="flex items-center justify-start absolute z-50 w-full h-14 bg-upBar"
    >
        <div class="pl-4 flex space-x-2">
            <button @click="cargar">
                <i
                    class="fa-solid fa-bars text-xl text-cerise-100 active:text-white-0 hover:text-white-0"
                ></i>
            </button>
            <div class="flex space-x-1">
                <img
                    src="./../assets/logo.png"
                    alt="Dolce Vita Logo"
                    class="w-8"
                />
                <p class="font-semibold text-lg text-white-0 cursor-pointer">
                    Dolce Vita
                </p>
            </div>
        </div>
    </div>
    <div
        @click="cargar"
        v-if="sideIn"
        class="absolute w-screen top-0 right-0 bottom-0 h-100v bg-gray-400 opacity-20 z-20 cursor-pointer"
    ></div>
    <transition name="showSide">
        <aside
            v-if="side"
            class="flex absolute z-50 text-sm text-fontColor shadow-xs shadow-cerise-800 bg-card flex-col w-56
            lg:w-48 h-full pb-2 justify-between items-center"
        >
            <div class="w-full flex flex-col h-60v lg:h-55v justify-center space-y-3 lg:space-y-0 lg:justify-between">
                <div
                    class="w-full hidden lg:flex items-center space-x-2 justify-center h-14 py-1 bg-upBar
                    border-r border-b border-b-cerise-900 border-r-cerise-900"
                >
                    <img
                        src="./../assets/logo.png"
                        alt="Dolce Vita Logo"
                        class="w-11"
                    />
                    <p
                        class="font-semibold text-lg text-white-0 cursor-pointer"
                    >
                        Dolce Vita
                    </p>
                </div>
                <button
                    @click="options"
                    id="userOptions"
                    class="w-full justify-center cursor-pointer flex space-x-1 items-center hover:text-gray-100 pt-2"
                >
                    <div class="border-2 border-fontColor rounded-md px-1.5">
                        <i
                            class="fa-solid fa-user-tie text-fontColor text-xl"
                        ></i>
                    </div>
                    <p class="flex items-center font-bold">
                        {{ nombre[0] + nombre.toLowerCase().substring(1) }}
                        {{ apellido[0] + apellido.toLowerCase().substring(1) }}
                    </p>
                </button>
                <div class="flex w-full flex-col text-sm font-semibold">
                    <router-link
                        v-if="show"
                        @click="cargar"
                        ref="reportes"
                        to="/"
                        class="w-full py-4 pl-3 hover:bg-upBar"
                        :class="claseProds"
                    >
                        <div
                            class="border-2 border-fontColor rounded-md text-fontColor"
                        >
                            <i
                                class="fa-solid fa-chart-column px-1 text-base"
                            ></i>
                        </div>
                        <p>Reportes y Graficas</p>
                    </router-link>
                    <router-link
                        v-if="show"
                        @click="cargar"
                        ref="productos"
                        to="/productos"
                        class="w-full pl-3 hover:bg-upBar py-4"
                        :class="claseProds"
                    >
                        <div
                            class="border-2 border-fontColor rounded-md text-fontColor"
                        >
                            <i
                                class="fa-solid fa-cookie-bite px-1 text-base"
                            ></i>
                        </div>
                        <p>Productos</p>
                    </router-link>
                    <router-link
                        @click="cargar"
                        ref="ventas"
                        to="/ventas"
                        class="w-full pl-3 py-4 hover:bg-upBar"
                        :class="claseProds"
                    >
                        <div
                            class="border-2 border-fontColor rounded-md text-fontColor"
                        >
                            <i
                                class="fa-solid fa-sack-dollar px-1 text-base"
                            ></i>
                        </div>
                        <p>Ventas</p>
                    </router-link>
                    <router-link
                        @click="cargar"
                        v-if="show"
                        ref="categorias"
                        to="/categorias"
                        class="w-full pl-3 py-4 hover:bg-upBar"
                        :class="claseProds"
                    >
                        <div
                            class="border-2 border-fontColor rounded-md text-fontColor"
                        >
                            <i
                                class="fa-solid fa-diagram-project px-1 text-base"
                            ></i>
                        </div>
                        <p>Categorias</p>
                    </router-link>
                    <router-link
                        v-if="show"
                        @click="cargar"
                        ref="empleados"
                        to="/empleados"
                        class="w-full pl-3 py-4 hover:bg-upBar"
                        :class="claseProds"
                    >
                        <div
                            class="border-2 border-fontColor rounded-md text-fontColor"
                        >
                            <i
                                class="fa-solid fa-people-carry-box px-1 text-base"
                            ></i>
                        </div>
                        <p>Empleados</p>
                    </router-link>
                </div>
            </div>
            <div class="flex w-full h-10 pl-4 pb-2 hover:brightness-125">
                <button
                    @click="cerrar"
                    class="flex w-full text-center text-lg font-bold space-x-2"
                >
                    <div class="border-2 border-fontColor rounded-md">
                        <i
                            class="fa-solid fa-arrow-right-from-bracket px-1 text-base"
                        ></i>
                    </div>
                    <p>Cerrar sesion</p>
                </button>
            </div>
        </aside>
    </transition>
</template>
<script>
import router from "@/router";
export default {
    name: "AsideBar",
    data() {
        return {
            nombre: '',
            apellido: '',
            side: true,
            sideIn: false,
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
    emits: ["add", "side"],
    methods: {
        cargar() {
            let body = document.querySelector("body");
            if (body.offsetWidth < 1023) {
                this.side = !this.side;
                this.sideIn = !this.sideIn;
            }
        },
        options() {
            this.$emit("add");
        },
        cerrar() {
            sessionStorage.removeItem("sesion");
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("rol");
            this.$emit("side");
            router.push("login");
        },
        verificar(){
            const id = sessionStorage.getItem('rol');
            if (id == 1) {
                this.show = true
            }else{
                this.show = false;
            }
        },
        observer() {
            let body = document.querySelector("body");
            if (body.offsetWidth > 1023) {
                this.side = true;
                this.sideIn = false;
            } else {
                this.side = false;
            }
        },
        observerResize() {
            this.sideIn = false;
            let body = document.querySelector("body");
            if (body.offsetWidth > 1023) {
                this.side = true;
            } else {
                this.side = false;
            }
        },
    },
    mounted() {
        this.nombre = sessionStorage.getItem('nombre');
        this.apellido = sessionStorage.getItem('apellido');
        this.verificar();
        this.observer();
        window.addEventListener("resize", this.observerResize);
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
.showSide-enter-active {
    animation: mostrar 200ms;
}
@keyframes mostrar {
    0% {
        overflow: hidden;
        width: 22px;
    }
    100% {
        overflow: hidden;
    }
}

.showSide-leave-active {
    animation: quitar 200ms;
}
@keyframes quitar {
    100% {
        width: 0px;
        overflow: hidden;
    }
}
</style>
