<template>
    <nav>
        <div class="navlogo">
            <h1> {{ navtitle }} </h1>
        </div>
    </nav>
</template>

<script lang="ts">

import {defineComponent} from 'vue'

export default defineComponent({
    data() {
        return {
            navtitle: 'Lorem-Notes' as string
        }
    }
})

</script>

<style scoped>

nav {
    background-color: #3772FF;
    padding: 1rem 2rem;
}

nav .navlogo h1 {
    font-family: var(--big);
    color: white;
}

</style>