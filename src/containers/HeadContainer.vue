<template>
    <AsideBar @add="add()" />
    <OptionsUser @add="add()" v-if="show" />
</template>
<script>
import AsideBar from '@/containers/SideBar.vue';
import OptionsUser from '../components/OptionsUser.vue';
export default {
    name: 'HeadContainer',
    components: { AsideBar, OptionsUser },
    data() {
        return {
            show: false,
        }
    },
    methods : {
        add (){
            this.show = !this.show;
        }
    }
}
</script>
