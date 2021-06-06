<template>
    <main>
        <form @submit.prevent method="post">
            <div v-for="err in errors" :key="err" >
                <p> {{ err }} </p>
            </div>
            <input :disabled="errors.length > 0" type="password" placeholder="Enter PIN" v-model="pincode" name="pincode">
            <button :disabled="errors.length > 0" @click="submitPin" class="enter" > Enter </button>
            <button @click="cancel" class="cancel" > Cancel </button>
        </form>
    </main>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

import {Status} from '@/interfaces/status'

export default defineComponent({
    data() {
        return {
            pincode: "" as string,
            attempts: 0 as number,
            errors: [] as string[]
        }
    },
    methods: {
        submitPin() {
            if (this.pincode !== this.usersPin) {
                this.pincode = ""
                this.attempts++
                if (this.attempts >= 5) {
                    this.errors.push('Try again after 5 seconds.')
                    setTimeout(() => {
                        this.attempts = 0
                        this.errors = []
                    }, 5000)
                }
            } 

            if (this.pincode === this.usersPin) {
                this.$store.dispatch('authSecret', Status.authorized)
                return this.$router.push('/secrets')
            }
        },
        cancel() {
            this.$store.dispatch('authSecret', Status.denied)
            this.$router.push('/home')
        }
    },
    computed: {
        usersPin() {
            return this.$store.state.user.data.pincode
        }
    }
})

</script>

<style scoped>

main {
    min-height: 90vh;
    display: flex;
    justify-content: center;
}

form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 30%;
    background-color: whitesmoke;
    margin: auto;
    padding: 2rem;
    border-radius: 5px;
}

input {
    padding: 0.5rem;
    margin-bottom: 1rem;
}

button {
    position: relative;
    z-index: 3;
    height: 35px;
    width: 100%;
    padding: 0.5rem;
    font-family: var(--small);
    font-weight: 500;
    background-color: rgb(253, 202, 64);
    color: black;
    border: none;
    outline: none;
    transition-property: all;
    transition-duration: 0.3s;
    cursor: pointer;
}

button:hover {
    background-color: #DF2935;
    color: white;
  /* background-color: rgba(253, 202, 64, 0.9); */
  /* transform: scale(1.05); */
}

button:disabled {
    background-color: gray;
}

button.cancel {
    position: relative;
    z-index: 3;
    height: 35px;
    width: 100%;
    padding: 0.5rem;
    font-family: var(--small);
    font-weight: 500;
    background-color: gray;
    color: white;
    border: none;
    outline: none;
    transition-property: all;
    transition-duration: 0.3s;
    cursor: pointer;
}

p {
    color: red;
    margin-bottom: 0.2rem;
    font-family: var(--small);
}

</style>