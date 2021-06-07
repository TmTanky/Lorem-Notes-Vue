<template>
    <nav>
        <div class="navlogo">
            <h1 @click="$router.push('/')" > {{ navtitle }} </h1>
            <!-- <p v-if="isAuth" @click="logout" > Logout </p> -->
        </div>
            
        <div class="navprofile">
            <p v-if="isAuth" @click="logout" > Logout </p>
            <!-- <div class="navimg">
                
            </div> -->
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
    },
    methods: {
        logout() {
            this.$store.dispatch('logoutUser')
            this.$router.push('/')
        }
    },
    computed: {
        isAuth() {
            return this.$store.state.isAuth
        }
    }
})

</script>

<style scoped>

nav {
    background-color: #3772FF;
    display: flex;
    padding: 1rem 2rem;
    justify-content: center;
    /* position: fixed;
    width: 100%; */
}

h1 {
    font-family: var(--big);
    color: white;
    margin: auto 0;
    cursor: pointer;
}

p {
    font-family: var(--small);
    cursor: pointer;
    margin: auto 0;
    color: white;
}

.navlogo {
    flex: 1;
    display: flex;
    justify-content: flex-start;
}

.navprofile {
    flex: 1;
    display: flex;
    justify-content: flex-end;
}

.navprofile .navimg {
    height: 50px;
    width: 50px;
}

@media screen and (max-width: 450px) {

    nav {
        padding: 1rem;
    }

    .navlogo {
        flex: 3;
        /* padding: 1rem; */
    }

}

</style>