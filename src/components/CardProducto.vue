<template>
    <div
        class="flex flex-col justify-between absolute h-70v m-auto w-100 rounded-lg z-30 top-0 left-0 right-0 bottom-0 bg-white-0 p-7 overflow-hidden"
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
            Nuevo producto
        </h2>
        <div
            class="text-gray-600 font-semibold flex flex-col items-start space-y-1"
        >
            <label class="text-lg font-semibold" for="nombre"
                >Nombre del producto</label
            >
            <input
                name="nombre"
                @input="testNombre()"
                type="text"
                maxlength="100"
                v-model="nombreProducto"
                class="pl-1 w-full py-1 outline-none border-b border-b-azureMarine-700"
            />
        </div>
        <div class="relative text-gray-600 font-semibold flex justify-between">
            <button
                @click="showCategories"
                class="flex w-1/2 text-lg font-semibold p-1 shadow-md border rounded-xl items-center justify-center space-x-6"
            >
                <p>{{ categorySelected.toLocaleLowerCase() }}</p>
                <img
                    v-show="showImg"
                    class="w-2"
                    src="./../assets/arrow.svg"
                    alt="Mostrar categorias"
                />
            </button>
            <transition name="cat">
                <ul
                    v-show="showCats"
                    class="flex flex-col bg-white-0 bordes justify-start top-11 absolute max-h-32 w-1/2 rounded-lg outline-none overflow-y-scroll shadow-gray-500 shadow-md"
                >
                    <ButtonCategoria
                        v-for="item in categories"
                        @choose="choose(item.nombreCategoria, item.idCategoria)"
                        :key="item.idCategoria"
                        :id="item.idCategoria"
                        :nombreCategoria="item.nombreCategoria"
                    />
                </ul>
            </transition>
            <div class="flex flex-row space-x-2">
                <label class="text-lg font-semibold" for="cantidad"
                    >N° ventas:</label
                >
                <input
                    type="number"
                    name="cantidad"
                    v-model="cantidadVentas"
                    v-on:input="cantidadIn()"
                    onkeypress="return (event.charCode >= 48 && event.charCode <= 57)"
                    class="pr-1 w-20 py-1 outline-none border-b border-b-azureMarine-700 appearance-none text-end"
                />
            </div>
        </div>
        <div
            class="text-gray-600 font-semibold flex flex-col items-start space-y-1"
        >
            <label class="text-lg font-semibold" for="descripcion"
                >Descripcion del producto</label
            >
            <textarea
                @input="testDescripcion()"
                maxlength="180"
                name="descripcion"
                type="text"
                v-model="descripcionProducto"
                class="p-1 w-full py-1 outline-none rounded-md border border-azureMarine-700 h-24"
            ></textarea>
        </div>
        <div
            class="text-gray-600 font-semibold flex flex-row items-center justify-between space-y-1"
        >
            <div class="flex flex-row space-x-2">
                <label class="text-lg font-semibold" for="stock">Stock:</label>
                <input
                    onkeypress="return (event.charCode >= 48 && event.charCode <= 57)"
                    type="number"
                    name="stock"
                    v-model="stock"
                    class="pr-2 w-20 py-1 outline-none border-b border-b-azureMarine-700 appearance-none text-end"
                />
            </div>
            <div class="flex flex-row space-x-2">
                <label class="text-lg font-semibold" for="precio"
                    >Precio:</label
                >
                <input
                    type="number"
                    name="precio"
                    onkeypress="return (event.charCode !== 45 && event.charCode !== 43)"
                    v-model="precio"
                    class="pr-2 w-20 py-1 outline-none border-b border-b-azureMarine-700 appearance-none text-end"
                />
            </div>
        </div>
        <div class="w-full flex justify-between">
            <button
                @click="createProduct()"
                class="w-40 py-1 border-2 text-azure-600 border-azure-600 rounded-md hover:text-white-0 hover:bg-azure-600 scale-105 shadow-lg transition-all duration-200 hover:scale-100 hover:shadow-none"
            >
                Guardar cambios
            </button>
            <button
                @click="$emit('showProd')"
                class="w-40 py-1 border-2 text-upBar border-upBar rounded-md hover:text-white-0 hover:bg-upBar scale-105 shadow-lg transition-all duration-200 hover:scale-100 hover:shadow-none"
            >
                Cerrar
            </button>
        </div>
    </div>
</template>
<script>
import Producto from "@/services/ProductoService";
import Categoria from "./../services/CategoriasService";
import ButtonCategoria from "./ButtonCategoria.vue";
export default {
    name: "CardProducto",
    components: { ButtonCategoria },
    data() {
        return {
            message: "",
            ProductoService: new Producto(),
            stock: 0,
            precio: 0,
            cantidadVentas: 0,
            descripcionProducto: "",
            nombreProducto: "",
            showCats: false,
            showImg: true,
            listar: false,
            categories: [],
            CategoriaService: new Categoria(),
            categorySelected: "categorias",
            idCategoria: 0,
            errorShow: false,
        };
    },
    methods: {
        choose(nombre, idCategoria) {
            this.categorySelected = nombre;
            this.showCats = !this.showCats;
            this.showImg = false;
            this.idCategoria = idCategoria;
        },
        testNombre() {
            const nombre = this.nombreProducto.replace(/[^a-zA-Z ]/g, "");
            this.nombreProducto = nombre;
        },
        testDescripcion() {
            const descripcion = this.descripcionProducto.replace(
                /[^a-zA-Z., ]/g,
                ""
            );
            this.descripcionProducto = descripcion;
        },
        async getCategories() {
            const datos = await this.CategoriaService.getCategorias();
            const cats = datos.data;
            this.categories = cats;
        },
        async showCategories() {
            this.showCats = !this.showCats;
            if (this.listar === false) {
                await this.getCategories();
                this.listar = true;
            }
        },
        async createProduct() {
            console.log(this.descripcionProducto);
            const data = {
                nombreProducto: this.nombreProducto.toUpperCase(),
                descripcionProducto: this.descripcionProducto.toUpperCase(),
                precio: this.precio,
                stock: this.stock || 0,
                cantidadVentas: this.cantidadVentas || 0,
                idCategoria: this.idCategoria,
            };
            if (
                data.nombreProducto.length <= 0 ||
                data.descripcionProducto.length <= 0 ||
                data.precio <= 0
            ) {
                this.message = "LLene todos lo campos";
                this.errorShow = !this.errorShow;
                setTimeout(() => {
                    this.errorShow = !this.errorShow;
                }, 2000);
            } else if (data.idCategoria === 0) {
                this.errorShow = !this.errorShow;
                this.message = "Escoja una categoria";
                setTimeout(() => {
                    this.errorShow = !this.errorShow;
                }, 2000);
            } else {
                const returned = await this.ProductoService.postProductos(data);
                if (returned.data.created) {
                    this.$emit("created", data);
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
