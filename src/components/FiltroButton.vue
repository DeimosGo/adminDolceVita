<template>
    <button
        class="place-self-center text-start"
        :class="clases"
        @click="search"
        :value="item.idCategoria"
        :key="item.idCategoria"
    >
        {{ categoria.nombreCategoria.toLowerCase() }}
    </button>
</template>
<script>
export default {
    name: "FiltroButton",
    data() {
        return {
            categoria: this.item,
            clicked: false,
            clases: ["text-md", "text-gray-900"],
        };
    },
    props: {
        item: Object,
    },
    emits:['quitar', 'filtrar'],
    methods: {
        search(e) {
            if (this.clicked) {
                this.clases = ["text-gray-900 text-md"];
                this.$emit("quitar", e.target.value);
                this.clicked = !this.clicked;
            } else {
                this.clases = ["text-md text- text-azure-900 font-bold"];
                this.$emit("filtrar", e.target.value);
                this.clicked = !this.clicked;
            }
        },
    },
};
</script>
