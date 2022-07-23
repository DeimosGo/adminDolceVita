<template>
<nav class="hidden rounded-2xl lg:hover:w-full lg:top-0 lg:w-full lg:rounded-none left-0 right-0 fixed top-3 mx-auto flex-row w-95pct h-16 items-center justify-between
font-hindMadurai text-xl text-white-0 bg-card transform transition-all duration-300 hover:w-98pct">
        <div class="flex items-center space-x-4 cursor-pointer">
            <img class="w-14 pl-2" src="../assets/logo.png" alt="Dolve Vita Logo">
            <router-link to="/" class="font-semibold">Dolce Vita</router-link>
            </div>
            <button @click="options" id="userOptions" class="pr-4 cursor-pointer flex space-x-2 justify-center items-center">
                <p class="text-sm h-full lg:inline" >David Castillo</p>
                <img class="w-8 filtro pb-1" src="./../assets/userOptions.svg" />
            </button>
        </nav>
</template>
<style scoped>
.filtro {
filter: invert(94%) sepia(94%) saturate(0%) hue-rotate(233deg) brightness(107%) contrast(105%);
}
</style>
<script>
export default {
    data() {
        return {
            show: false,
        }
    },
    emits: ["add"],
    methods: {
        options(){
            this.$emit("add");
        }
    },
    name: "NavBar",
}
</script>
