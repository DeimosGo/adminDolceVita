<template>
    <button @click="choose" class="h-5 flex items-center justify-center cursor-pointer py-4">
        {{nombreCategoria.toLowerCase()}}
    </button>
</template>
<script>
export default {
    name: 'ButtonCategoria',
    props:{
        nombreCategoria:String,
        idCategoria: String,
    },
    emits:['choose'],
    methods:{
        choose(){
            this.$emit("choose")
        }
    }
}
</script>
