<template>
    <div class="rounded-lg" :class="addAnimation">
        <p class="text-cerise-700 text-xl" >Elemento no encontrado</p>
    </div>
</template>
<script>
export default {
    name: 'NotFound',
    inject: {
        isEmpty:{
            from:'isEmpty'
        } ,
        },
    data (){
        return{
            isFound: this.isEmpty,
            classAdd: ['absolute', 'text-md', 'lg:text-lg', 'right-8', 'bottom-8', 'flex', 'items-center', 'justify-center w-3/4', 'lg:w-2/6', 'h-18', 'p-2',
            'bg-cerise-200', 'border', 'border-cerise-600'],
        }
    },
    methods: {
        agregarClase(value){
            this.classAdd.pop();
            this.classAdd.push(value);
        }
    },
    computed:{
        addAnimation(){
            if (this.isFound) {
                this.agregarClase('animacion');
                return this.classAdd;
            } else {
                this.agregarClase('hidden');
                return this.classAdd;
            }
        },
    },
}
</script>
<style scoped>
.animacion{
    display: flex;
    animation-name: desvanecer;
    animation-duration: 3s;
    animation-fill-mode: forwards;
}
@keyframes desvanecer {
    0% {
        opacity: 100%;
    }
    70%{
        opacity: 100%;
    }
    80%{
        opacity: 60%;
    }
    100% {
        opacity: 0%;
    }
}
</style>