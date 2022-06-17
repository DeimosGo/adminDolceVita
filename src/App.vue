<template>
<KeepAlive>
    <AsideBar v-if="sesion" />
</KeepAlive>
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
            sesion: false,
        }
    },
    methods:{
        side(){
            this.sesion = !this.sesion;
        }
    },
    components: { AsideBar },
    mounted(){
        if (sessionStorage.getItem("sesion")) {
            this.side();
        }
    }
}
</script>
