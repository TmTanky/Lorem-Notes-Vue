<template>
    <main>
        <form @submit.prevent="registerSubmit" method="post">
            <h1> Register </h1>

            <transition-group name="error" > 
                <div class="errhandler" v-for="err in registerErrors" :key="err" >
                    <p v-if="registerErrors.length > 0"> {{ err }} </p>
                </div>
            </transition-group>

            <input type="text" v-model="firstName" placeholder="First Name" name="firstName">
            <input type="text" v-model="lastName" placeholder="Last Name" name="lastName">
            <input type="email" v-model="email" placeholder="Email" name="email">
            <input type="password" v-model="password" placeholder="Password" name="password">
            <input type="password" v-model="pin" placeholder="PIN" name="pin">

            <button :disabled="isEmpty" type="submit"> Register </button>
            <router-link to="/login" > I have an account. </router-link>
        </form>
    </main>
</template>

<script lang="ts">
import axios from 'axios'

import { defineComponent } from 'vue'

export default defineComponent({
    data() {
        return {
            firstName: "" as string,
            lastName: "" as string,
            email: "" as string,
            password: "" as string,
            pin: "" as string,
            registerErrors: [] as string[]
        }
    },
    methods: {
        async registerSubmit() {

            this.registerErrors = []

            const {data} = await axios.post('https://ts-lorem-notes-rest.herokuapp.com/register',
                {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    email: this.email,
                    password: this.password,
                    pincode: this.pin
                }
            )

            if (data.msg) {
                console.log(data.msg)
                this.registerErrors.push(data.msg)

                return setTimeout(() => {
                    this.registerErrors = []
                }, 3000)
            }

            this.$store.dispatch('loginUser', data)
            this.$store.dispatch('authUser')
            this.$router.push('/home')
        }
    },
    computed: {
        isEmpty() {

            if (this.firstName === "" ||
                this.lastName === "" ||
                this.email === "" ||
                this.password === "" ||
                this.pin === ""    
            ) {
                return true
            }

            return false

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

main {
    min-height: 90vh;
    display: flex;
    justify-content: center;
}

h1 {
    font-family: var(--big);
    font-size: 2rem;
    margin-bottom: 1rem;
}

input {
    padding: 0.5rem;
    margin-top: -1px;
    font-family: var(--small);
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

button:disabled {
    background-color: gray;
}

main form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 50%;
    transition-duration: 0.3s;
}

p {
    font-family: var(--small);
    color: red;
    margin-bottom: 1rem;
}

@media screen and (max-width: 550px) {

    main form {
        width: 80%;
    }

}

@media screen and (max-width: 400px) {

    main form {
        width: 95%;
    }

}

</style>