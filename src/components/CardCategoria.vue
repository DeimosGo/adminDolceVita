<template>
    <div
        class="flex flex-col justify-between h-60v w-100 rounded-lg z-30 bg-white-0 p-7 overflow-hidden"
    >
        <transition name="error">
            <div
                v-show="errorShow"
                class="w-48 h-14 border-cerise-800 text-cerise-700 absolute top-6 right-0 left-0 m-auto bg-cerise-200 rounded-lg flex items-center justify-center border-2"
            >
                <p>{{ message }}</p>
            </div>
        </transition>

        <h2
            class="w-full items-center justify-center text-center text-2xl font-semibold text-azureMarine-800"
        >
            Nueva Categoria
        </h2>
        <div
            class="text-gray-600 font-semibold flex flex-col items-start space-y-1"
        >
            <label class="text-lg font-semibold" for="nombre"
                >Nombre de la categoria</label
            >
            <input
                autocomplete="off"
                name="nombre"
                @input="testNombre()"
                type="text"
                maxlength="100"
                v-model="nombreCategoria"
                class="pl-1 w-full py-1 outline-none border-b border-b-azureMarine-700"
            />
        </div>
        <div
            class="text-gray-600 font-semibold flex flex-col items-start space-y-1"
        >
            <label class="text-lg font-semibold" for="descripcion"
                >Descripcion de la categoria</label
            >
            <textarea
                autocomplete="off"
                @input="testDescripcion()"
                maxlength="180"
                name="descripcion"
                type="text"
                v-model="descripcion"
                class="p-1 w-full py-1 outline-none rounded-md border border-azureMarine-700 h-24"
            ></textarea>
        </div>
        <div class="w-full flex justify-between">
            <button
                @click="createdElement()"
                class="w-40 py-1 border-2 text-azure-600 border-azure-600 rounded-md hover:text-white-0 hover:bg-azure-600 scale-105 shadow-lg transition-all duration-200 hover:scale-100 hover:shadow-none"
            >
                Guardar cambios
            </button>
            <button
                @click="$emit('nuevaCategoria')"
                class="w-40 py-1 border-2 text-upBar border-upBar rounded-md hover:text-white-0 hover:bg-upBar scale-105 shadow-lg transition-all duration-200 hover:scale-100 hover:shadow-none"
            >
                Cerrar
            </button>
        </div>
    </div>
</template>
<script>
import Categoria from "./../services/CategoriasService";
export default {
    name: "CardCategoria",
    data() {
        return {
            message: "",
            cantidadVentas: 0,
            descripcion: "",
            nombreCategoria: "",
            showCats: false,
            showImg: true,
            listar: false,
            CategoriaService: new Categoria(),
            categorySelected: "categorias",
            idCategoria: 0,
            errorShow: false,
        };
    },
    emits: ["nuevaCategoria", "created"],
    methods: {
        testNombre() {
            const nombre = this.nombreCategoria.replace(/[^a-zA-Z ]/g, "");
            this.nombreCategoria = nombre;
        },
        testDescripcion() {
            const descripcion = this.descripcion.replace(
                /[^a-zA-Z., ]/g,
                ""
            );
            this.descripcionProducto = descripcion;
        },
        async createdElement() {
            const data = {
                nombreCategoria: this.nombreCategoria.toUpperCase(),
                descripcion: this.descripcion.toUpperCase(),
            };
            if (
                data.nombreCategoria.length <= 0 ||
                data.descripcion.length <= 0
            ) {
                this.message = "LLene todos lo campos";
                this.errorShow = !this.errorShow;
                setTimeout(() => {
                    this.errorShow = !this.errorShow;
                }, 2000);
            }else {
                const returned = await this.CategoriaService.postCategorias(data);
                if (returned.data.created) {
                    this.$emit("createdElement");
                } else {
                    this.errorShow = !this.errorShow;
                    this.message = "Problema de conexion";
                    setTimeout(() => {
                        this.errorShow = !this.errorShow;
                    }, 2000);
                }
            }
        },
        cantidadIn() {
            if (this.cantidad > 9999) {
                this.cantidad = 9999;
            } else if (this.cantidad < 0) {
                this.cantidad = 0;
            }
        },
    },
};
</script>
<style scoped>
.error-leave-active {
    animation: outCard 1000ms;
}

@keyframes outCard {
    from {
        top: 0;
        opacity: 1;
    }
    to {
        opacity: 0;
        top: -400px;
        transform: scale(0);
        overflow: hidden;
    }
}

.error-enter-active {
    animation: animacionCard 300ms;
}

@keyframes animacionCard {
    0% {
        top: -400px;
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

.cat-enter-active {
    animation: listShow 200ms;
}

@keyframes listShow {
    0% {
        overflow: auto;
        height: 0px;
    }
    100% {
        height: 128px;
        overflow: auto;
    }
}

.cat-leave-active {
    animation: listHide 200ms;
}

@keyframes listHide {
    0% {
        height: 128px;
        overflow: auto;
    }
    100% {
        height: 0;
        overflow: auto;
    }
}

.bordes :nth-child(even) {
    border-top: solid 1px #d4d4d8;
    border-bottom: solid 1px #d4d4d8;
}

.bordes :last-child {
    border-bottom: none;
}
/* ===== Scrollbar CSS ===== */
/* Firefox */
.bordes {
    scrollbar-width: auto;
    scrollbar-color: #d4d4d8 #ffffff;
}

/* Chrome, Edge, and Safari */
.bordes::-webkit-scrollbar {
    border-radius: 15px;
    width: 10px;
}

.bordes::-webkit-scrollbar-track {
    border-radius: 15px;
    background: #ffffff;
}

.bordes::-webkit-scrollbar-thumb {
    border-radius: 15px;
    background-color: #d4d4d8;
    border-radius: 10px;
    border: 3px solid #ffffff;
}

textarea {
    resize: none;
}
.animationCard {
    animation: card 500ms;
}
@keyframes card {
    0% {
        transform: scale(0.1);
        opacity: 10%;
    }
}

div::-webkit-scrollbar {
    -webkit-appearance: none;
}

div::-webkit-scrollbar:vertical {
    width: 10px;
}

div::-webkit-scrollbar-button:increment,
div::-webkit-scrollbar-button {
    display: none;
}

div::-webkit-scrollbar:horizontal {
    height: 10px;
}

div::-webkit-scrollbar-thumb {
    background-color: #797979;
    border-radius: 20px;
    border: 2px solid #f1f2f3;
}

div::-webkit-scrollbar-track {
    border-radius: 10px;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>
