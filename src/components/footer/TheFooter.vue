<template>
    <footer>
        <h3> Copyright &copy; Lorem-Notes {{ year }}  </h3>
    </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent ({
    computed: {
        year() {
            return new Date().getFullYear()
        }
    }
})

</script>

<style scoped>

footer {
    background-color: #3772FF;
    padding: 0.5rem;
    text-align: center;
}

footer h3 {
    font-family: var(--small);
    color: white;
}

</style>