<template>
        <div>
    <!--  <div
            @click="showcard"
            v-if="card"
            class="absolute w-screen top-0 right-0 bottom-0 h-100v bg-gray-900 opacity-20 z-20 cursor-pointer"
        ></div>
        <transition name="fade">
            <CardProducto v-if="card" @showProd="showcard" @created="created" class="absolute top-0 left-0 right-0 bottom-0 m-auto" />
        </transition> -->
        <section
            class="relative flex flex-col text-gray-700 items-center justify-between space-y-3 rounded-md"
        >
            <div class="flex flex-row space-x-3">
                <button @click="$emit('nuevaVenta')"
                    class="flex space-x-1 items-center h-10 px-2 rounded-md border-2 text-submarine-600 border-submarine-600 transition-all duration-100 hover:scale-105"
                >
                    <p>Nuevo</p>
                    <i class="fa-solid fa-file-circle-plus w-4"></i>
                </button>
                <button
                    @click="showFilter"
                    class="h-10 px-1 z-10 rounded-lg text-azureMarine-800 text-lg flex items-center border-2 border-azureMarine-800 space-x-2 transition-all duration-100 hover:scale-105"
                >
                    <p>Filtrar</p>
                    <i class="fa-solid fa-filter"></i>
                </button>
            </div>
            <div
                v-show="showAll"
                :class="animacion"
                class="absolute top-10 right-0 pl-6 w-72 flex flex-col h-fit p-2 items-start border rounded-lg border-gray-300 text-azureMarine-800 bg-white-0 z-10 shadow-gray-300 shadow-sm"
            >
                <h3 class="text-lg pb-1">Categorias</h3>
                <div class="pl-3 flex flex-col space-y-2 items-start">
                    <FiltroButton
                        v-for="item in itemsCategoria"
                        :item="item"
                        :key="item.idCategoria"
                        v-bind="$attrs"
                    />
                </div>
            </div>
        </section>
    </div>
</template>
<script>
export default {
    name: 'FilterVentas',
}
</script>
