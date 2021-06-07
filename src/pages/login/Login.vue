<template>
    <main>
        <div class="loginform">
            <form @submit.prevent="loginSubmit" method="post">
                <h1> Login </h1>

                <transition-group name="error" > 
                    <div class="errhandler" v-for="err in loginErrors" :key="err" >
                        <p v-if="loginErrors.length > 0"> {{ err }} </p>
                    </div>
                </transition-group>

                <label for="email"> Email </label>
                <input type="text" name="email" v-model="email" >
                <label for="password"> Password </label>
                <input type="password" name="password" v-model="password" >

                <button type="submit"> Login </button>
                <router-link to="/register" > Create an account. </router-link>
            </form>
        </div>

        <div class="loginformdetails">
            <img src="./takenotes.svg" alt="">
        </div>
    </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'

export default defineComponent ({
    data() {
        return {
            email: "" as string,
            password: "" as string,
            loginErrors: [] as string[]
        }
    },
    methods: {
        async loginSubmit() {

            this.loginErrors = []

            const {data} = await axios.post('https://ts-lorem-notes-rest.herokuapp.com/login', {email: this.email, password: this.password})
            
            if (data.msg) {
                console.log(data.msg)
                this.loginErrors.push(data.msg)

                return setTimeout(() => {
                    this.loginErrors = []
                }, 3000)
            }

            this.$store.dispatch('loginUser', data)
            this.$store.dispatch('authUser')
            this.$router.push('/home')
        }
    }
})
 
</script>

<style scoped>

@keyframes fade {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

.error-enter-active {
    animation: fade 0.3s ease-in;
}

.error-leave-active {
    animation: fade 0.3s ease-out reverse;
}

a {
    color: black;
}

main {
    min-height: 90vh;
    display: flex;
}

label {
    margin: 0.5rem 0rem;
    font-family: var(--small);
}

input {
    padding: 0.5rem;
    font-family: var(--small);
}

p {
    font-family: var(--small);
    color: red;
}

img {
    width: 70%;
    transition-duration: 0.3s;
}

button {
    margin-top: 1rem;
    height: 35px;
    width: 100%;
    padding: 0.5rem;
    font-family: var(--small);
    font-weight: 500;
    background-color: #DF2935;
    color: white;
    border: none;
    outline: none;
    transition-property: all;
    transition-duration: 0.3s;
    cursor: pointer;
}

button:hover {
  background-color: rgba(253, 202, 64, 0.9);
  transform: scale(1.05);
}

.loginform, .loginformdetails {
    flex: 1;
}

/* Loginform */

.loginform {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.loginform form {
    display: flex;
    flex-direction: column;
    padding: 0rem 2rem;
    background-color: white;
    border-radius: 5px;
    width: 50%;
    justify-content: center;
    height: 400px;
    margin: auto;
    box-shadow: 0 8px 6px -8px black;
    transition-duration: 0.3s;
}

.loginform form h1 {
    font-family: var(--big);
    font-size: 2rem;
    margin-bottom: 0.5rem;
}

/* Loginform Details */

.loginformdetails {
    display: flex;
    justify-content: center;
}

@media screen and (max-width: 1100px) {

    .loginform form {
        width: 80%;
    }

}

@media screen and (max-width: 700px) {

    main {
        flex-direction: column;
    }

    .loginformdetails {
        order: 1;
        padding: 3rem 0;
    }

    .loginform {
        order: 2;
    }

    .loginform form {
        box-shadow: none;
    }

}

@media screen and (max-width: 500px) {

    img {
        width: 80%;
    }

    .loginform form {
        width: 100%;
        padding: 1rem;
    }

}

</style>