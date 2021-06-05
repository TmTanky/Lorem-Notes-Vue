<template>
    <footer>
        <p> Copyright &copy; Lorem-Notes {{ year }}  </p>
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

footer p {
    font-family: var(--small);
    color: white;
    font-weight: 300;
}

</style>