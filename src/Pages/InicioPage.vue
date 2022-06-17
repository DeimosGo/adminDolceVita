<template>
    <div class="w-full h-100v bg-rose-50">
        <HeadContainer />
        <main class="h-100v w-full font-hindMadurai flex flex-col place-content-center items-center">
            <h1 class="text-center text-2xl font-black border-b border-black mb-10">Panel Administrativo</h1>
            <section class="text-red-800 grid grid-cols-2 lg:gap-x-7 w-full lg:w-3/6 px-2 justify-center items-center gap-5">

                <router-link to="/productos" class="card w-full">
                    <img class="svg" src="./../assets/cookie.svg" />
                    <p>Productos</p>
                </router-link>
                <router-link to="/productos" class="card w-full">
                    <img class="svg" src="./../assets/sack.svg" />
                    <p>Ventas</p>
                </router-link>
                <router-link to="/productos" class="card w-full">
                    <img class="svg" src="./../assets/categories.svg" />
                    <p>Categorias</p>
                </router-link>
                <router-link to="/productos" class="card w-full">
                    <img class="svg" src="./../assets/empleado.svg" />
                    <p>Empleados</p>
                </router-link>
                <router-link to="/productos" class="card col-start-1 col-end-3 w-full">
                    <img class="svg" src="./../assets/reportes.svg"/>
                    <p>Reportes y graficas</p>
                </router-link>
            </section>
        </main>
    </div>
</template>
<style scoped>
.svg {
    width: 45px;
    filter: invert(14%) sepia(67%) saturate(3709%) hue-rotate(350deg) brightness(77%) contrast(88%);
}
</style>
<script>
import HeadContainer from '@/containers/HeadContainer.vue';
export default {
    name: "InicioPage",
    components: {  HeadContainer },
}
</script>