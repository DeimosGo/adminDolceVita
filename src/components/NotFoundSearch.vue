<template>
    <!-- <div class="rounded-lg absolute text-md lg:text-lg right-8 bottom-8 flex items-center justify-center w-3/4 lg:w-2/6 h-18 p-2
            bg-cerise-200 border border-cerise-600" :class="addAnimation">
        <p class="text-cerise-700 text-xl" >Elemento no encontrado</p>
    </div> -->
    <div id="alert-border-2" class="absolute right-8 bottom-8  flex p-4 mb-4 bg-cerise-100 border-t-4 border-cerise-500 dark:bg-cerise-200" role="alert">
    <svg class="flex-shrink-0 w-5 h-5 text-cerise-700" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
    <div class="ml-3 text-sm font-medium text-cerise-700">
        El elemento no se pudo encontrar
    </div>
    <button type="button" class="ml-auto -mx-1.5 -my-1.5 bg-cerise-100 dark:bg-cerise-200 text-cerise-500 rounded-lg focus:ring-2 focus:ring-cerise-400 p-1.5 hover:bg-cerise-200 dark:hover:bg-cerise-300 inline-flex h-8 w-8"  data-dismiss-target="#alert-border-2" aria-label="Close">
        <span class="sr-only">Dismiss</span>
    </button>
</div>
</template>
<script>
export default {
    name: 'NotFound',
}
</script>
