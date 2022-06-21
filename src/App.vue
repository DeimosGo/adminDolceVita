<template>
    <AsideBar @side="side" class="side" v-if="sesion" />
    <router-view @side="side" />
</template>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Hind+Madurai:wght@300;400;500;600;700&display=swap");
@import "./tailwind.css";
</style>
<script>
import AsideBar from "./components/SideBar.vue";
export default {
    data (){
        return {
            clases:[],
            sesion: false,
        }
    },
    methods:{
        side(){
            this.sesion = !this.sesion;
            this.clases.push("animacion");
            setTimeout(() => this.clases.pop(), 500);
        }
    },
    components: { AsideBar },
    async mounted(){
        if (sessionStorage.getItem("sesion")) {
            this.side();
        }
    }
}
</script>
<style scoped>
animacion{
animation-name: side;
animation-duration: 500ms;
}
@keyframes side {
    0%{
        opacity: 0.1;
        transform: translateY(-200px) scale(0.8);
    }
}
</style>
