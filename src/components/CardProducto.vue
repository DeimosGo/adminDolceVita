<template>
<div class="hidden w-full h-100v bg-gray-600 opacity-10 absolute z-10"></div>
<div class="hidden absolute h-80 m-auto w-72 rounded-md z-20 top-0 left-0 right-0 bottom-0 bg-white-0 shadow-md shadow-gray-400">
        <input disabled="true" class="rounded-t-md text-center w-full text-white-0 h-1/6 bg-azureMarine-700" value="Pastel de chocolate" type="text" />
        <textarea disabled="true" class="w-full h-2/6 resize-none">Descripcion del pastel de vainilla recubierto de chocolate con frutos secos o frescos segun los gustos del cliente</textarea>
        <div>
            <p>stock:</p>
            <input disabled="true" value="52" type="text" />
            <p>precio:</p>
            <input disabled="true" value="40.5" type="text" />
            <p>ventas:</p>
            <p>17</p>
        </div>
        <div class="flex w-full justify-end">
            <button>
            <img
                class="w-2"
                src="./../assets/close.svg"
                alt="Boton cerrar Close Button"
            />
            </button>
        </div>
    </div>
</template>
<script>
export default {
    name: "CardProducto",
};
</script>
