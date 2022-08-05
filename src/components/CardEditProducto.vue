<template>
    <div
        class="flex flex-col justify-between absolute h-70v m-auto w-11/12 lg:w-100 rounded-lg z-30 top-0 left-0 right-0 bottom-0 bg-white-0 p-7 overflow-hidden"
    >
        <transition name="error">
            <div
                v-show="errorShow"
                class="w-64 h-14 border-cerise-800 text-cerise-700 absolute top-6 right-0 left-0 m-auto bg-cerise-200 rounded-lg flex items-center justify-center border-2"
            >
                <p>{{ message }}</p>
            </div>
        </transition>
        <h2
            class="w-full items-center justify-center text-center text-2xl font-medium text-azureMarine-800"
        >
            Manejo del Producto
        </h2>
        <div
            class="text-gray-600 font-medium flex flex-col items-start space-y-1"
        >
            <label class="text-lg font-medium" for="nombre"
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
        <div class="w-full relative text-gray-600 font-medium flex flex-col space-y-2 lg:space-y-0 lg:flex-row justify-between">
            <button
                @click="showCategories"
                class="flex w-full lg:w-1/2 text-md lg:text-lg font-medium p-1 shadow-md border rounded-xl items-center justify-center space-x-6"
            >
                <p>{{ categorySelected.toLocaleLowerCase() }}</p>
                <i class="fa-solid fa-caret-down text-xs"></i>
            </button>
            <transition name="cat">
                <ul
                    v-show="showCats"
                    class="flex flex-col bg-white-0 bordes justify-start top-8 lg:top-10 absolute max-h-32 w-full lg:w-1/2
                    rounded-lg outline-none overflow-y-scroll shadow-gray-500 shadow-md"
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
            <div class="w-full lg:w-1/2 flex flex-row justify-center">
                <label class="text-md lg:text-lg font-medium w-2/5 lg:w-auto" for="cantidad"
                    >N° ventas:</label
                >
                <input
                    type="number"
                    name="cantidad"
                    v-model="cantidadVentas"
                    v-on:input="cantidadIn()"
                    onkeypress="return (event.charCode >= 48 && event.charCode <= 57)"
                    class="w-3/5 pr-1 lg:w-20 py-1 outline-none border-b border-b-azureMarine-700 appearance-none text-end"
                />
            </div>
        </div>
        <div
            class="text-gray-600 font-medium flex flex-col items-start space-y-1"
        >
            <label class="text-lg font-medium" for="descripcion"
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
            class="text-gray-600 font-medium flex flex-row items-center justify-between space-y-1"
        >
            <div class="flex flex-row space-x-2">
                <label class="text-lg font-medium" for="stock">Stock:</label>
                <input
                    onkeypress="return (event.charCode >= 48 && event.charCode <= 57)"
                    type="number"
                    name="stock"
                    v-model="stock"
                    class="pr-2 w-20 py-1 outline-none border-b border-b-azureMarine-700 appearance-none text-end"
                />
            </div>
            <div class="flex flex-row space-x-2">
                <label class="text-lg font-medium" for="precio"
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
        <div class="w-full flex justify-center space-x-3 lg:space-x-0 lg:justify-between">
            <button
                @click="editProduct()"
                class="w-1/2 lg:w-40 py-1 border-2 text-azure-600 border-azure-600 rounded-md hover:text-white-0 hover:bg-azure-600 scale-105 shadow-lg transition-all duration-200 hover:scale-100 hover:shadow-none"
            >
                Guardar cambios
            </button>
            <button
                @click="$emit('cerrar')"
                class="w-1/2 lg:w-40 py-1 border-2 text-upBar border-upBar rounded-md hover:text-white-0 hover:bg-upBar scale-105 shadow-lg transition-all duration-200 hover:scale-100 hover:shadow-none"
            >
                Cerrar
            </button>
        </div>
    </div>
</template>
<script>
import Producto from "@/services/ProductoService";
import Categoria from "@/services/CategoriasService";
import ButtonCategoria from "./ButtonCategoria.vue";
export default {
    name: "CardEditProducto",
    components: { ButtonCategoria },
    props: {
        producto: Object,
        orden: Number,
    },
    data() {
        return {
            ordenCampo: this.orden,
            message: "No se han detectado cambios",
            ProductoService: new Producto(),
            idProducto: this.producto.id,
            stock: this.producto.stock,
            precio: this.producto.precio,
            cantidadVentas: this.producto.cantidadVentas,
            descripcionProducto: this.producto.descripcionProducto,
            nombreProducto: this.producto.nombreProducto,
            showCats: false,
            showImg: true,
            listar: false,
            categories: [],
            CategoriaService: new Categoria(),
            categorySelected: "categorias",
            idCategoria: this.producto.idCategoria,
            errorShow: false,
        };
    },
    emits: ["editar", "edited", "cerrar"],
    methods: {
        async loadCategory() {
            const response = await this.CategoriaService.getCategoriaId(
                this.producto.idCategoria
            );
            this.categorySelected = response.data.nombreCategoria;
            this.idCategoria = response.data.idCategoria;
        },
        closeCard() {
            this.$emit("cerrar");
        },
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
            const datos = await this.CategoriaService.getCategorias(100, 0);
            const cats = datos.data;
            this.categories = cats;
        },
        async showCategories() {
            this.showCats = !this.showCats;
        },
        async editProduct() {
            const modelo = {
                nombreProducto: "",
                descripcionProducto: "",
                precio: 0,
                stock: 0,
                cantidadVentas: 0,
                idCategoria: 0,
            };
            const replace = [
                this.nombreProducto.toUpperCase(),
                this.descripcionProducto.toUpperCase(),
                this.precio,
                this.stock,
                this.cantidadVentas,
                this.idCategoria,
            ];
            let objetoSend = {};
            const claves = Object.keys(modelo);
            const old = [
                this.producto.nombreProducto,
                this.producto.descripcionProducto,
                this.producto.precio,
                this.producto.stock,
                this.producto.cantidadVentas,
                this.producto.idCategoria,
            ];
            for (let i = 0; i < claves.length; i++) {
                let clave = claves[i];
                if (replace[i] !== old[i]) {
                    objetoSend[clave] = replace[i];
                }
            }
            if (Object.keys(objetoSend).length === 0) {
                this.message = "No se han detectado cambios";
                this.errorShow = !this.errorShow;
                setTimeout(() => {
                    this.errorShow = !this.errorShow;
                }, 2000);
            } else if (
                this.nombreProducto.length <= 0 ||
                this.descripcionProducto.length <= 0 ||
                this.precio.length <= 0 ||
                this.stock.length <= 0 ||
                this.cantidadVentas.length <= 0
            ) {
                this.message = "LLene todos lo campos";
                this.errorShow = !this.errorShow;
                setTimeout(() => {
                    this.errorShow = !this.errorShow;
                }, 2000);
            } else {
                const data = await this.ProductoService.patchProductos(
                    this.producto.idProducto,
                    objetoSend
                );
                if (data.status == 500) {
                    this.message = "Error de conexion";
                    this.errorShow = !this.errorShow;
                    setTimeout(() => {
                        this.errorShow = !this.errorShow;
                    }, 2000);
                } else if (data.status == 404) {
                    this.message = "El elemento no existe";
                    this.errorShow = !this.errorShow;
                    setTimeout(() => {
                        this.errorShow = !this.errorShow;
                    }, 2000);
                } else {
                    const reload = await this.ProductoService.getProductosId(
                        this.producto.idProducto
                    );
                    this.$emit("edited", reload.data);
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
    async beforeMount() {
        await this.loadCategory();
        await this.getCategories();
    },
};
</script>
<style scoped>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
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
</style>
