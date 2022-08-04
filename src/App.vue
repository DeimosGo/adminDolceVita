<template>
        <SideBar @side="side" v-if="sesion" />
        <router-view @side="side"/>
</template>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Hind+Madurai:wght@300;400;500;600;700&display=swap");
@import "./tailwind.css";
</style>
<script>
import SideBar from "./containers/SideBar.vue";
export default {
    data() {
        return {
            clases: [],
            sesion: false,
            user: {},
        };
    },
    methods: {
        side() {
            this.sesion = !this.sesion;
        },
    },
    components: { SideBar },
    async mounted() {
        if (sessionStorage.getItem("sesion")) {
            this.side();
        }
    },
};
</script>
