<template>
    <div class="w-screen h-100v flex flex-col space-y-3 place-content-center text-center">
        <h1 class="text-card font-bold text-4xl">Aquí no hay nada</h1>
        <img class="w-64 m-auto" src="./../assets/logo.png" alt="Logo Dolce Vita">
        <div class="flex flex-col space-y-10 justify-center text-card">
            <p class="text-2xl font-bold">pero siempre puedes</p>
        <router-link to="/" class="text-azureMarine-800 text-2xl font-bold">Volver al inicio</router-link>
        </div>
    </div>
</template>
<script>
export default {
    name: 'NotFound',
};
</script>
