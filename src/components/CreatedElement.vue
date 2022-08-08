<template>
    <div id="alert-border-3" class="z-50 w-56 overflow-hidden absolute right-8 bottom-8 flex p-4 mb-4 bg-emerald-100 border-t-4 border-emerald-500 " role="alert">
    <i class="fa-solid fa-check text-lg text-emerald-500"></i>
    <div class="ml-3 text-lg font-medium text-emerald-700">
        {{message}}
    </div>
</div>
</template>
<script>
export default {
    name: 'CreatedElement',
    props:{
        message:String,
    }
    }
</script>
