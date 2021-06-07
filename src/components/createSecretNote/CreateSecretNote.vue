<template>
    <main>
        <div @click="closeForm" class="close">

        </div>
        <form @submit.prevent="createNote" method="post">
            <p v-if="title.length > 20"> 20 Characters only.  </p>
            <input v-model="title" autofocus type="text" placeholder="Note Title" name="title">
            <textarea v-model="content" wrap="soft" placeholder="Write something" name="content" cols="30" rows="10"></textarea>

            <button :disabled="invalid" type="submit"> Create </button>
        </form>
    </main>
</template>

<script lang="ts">
import axios from 'axios'

import {defineComponent} from 'vue'

export default defineComponent({
    data() {
        return {
            title: "" as string,
            content: "" as string,
            isSecret: true
        }
    },
    methods: {
        async createNote() {
            const {data} = await axios.post(`https://ts-lorem-notes-rest.herokuapp.com/createnote/${this.userID}`, {
                note: {
                    title: this.title,
                    content: this.content
                }, isSecret: this.isSecret} , {
                    headers: {
                        'authorization': `Bearer ${this.$store.state.user.token}`
                    }
                })
            console.log(data)
            this.$emit('refetch-data')
            this.closeForm()
        },
        closeForm() {
            this.$emit('close-form')
        }
    },
    computed: {
        userID() {
            return this.$store.state.user.data._id
        },
        invalid() {
            if ((this.title === "" || this.content === "") || this.title.length > 30) {
                return true
            }

            return false
        }
    }
})

</script>

<style scoped>

main {
    display: flex;
    justify-content: center;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    background-color: transparent;
}

main form {
    position: relative;
    display: flex;
    margin: auto;
    justify-content: center;
    flex-direction: column;
    padding: 1rem;
    width: 30%;
    border-radius: 5px;
    /* background-color: rgb(253, 202, 64); */
    background-color: whitesmoke;
    padding-top: 2rem;
    z-index: 3;
    transition-duration: 0.3s;
}

input,
textarea {
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    border: none;
    outline: none;
    background-color: transparent;
    font-family: var(--small);
}

input {
    border-bottom: solid 1px black;
}

button {
    margin-top: 1rem;
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

.close {
    display: flex;
    justify-content: center;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 3;
    background-color: rgba(0, 0, 0, 0.226);
}

form p {
    margin: 0 0.5rem;
    transition-property: all;
    font-family: var(--small);
    color: red;
    transition-duration: 0.3s;
}

.secret label {
    font-family: var(--small);
}

@media screen and (max-width: 950px) {
    
    main form {
        width: 50%;
    }

}

@media screen and (max-width: 550px) {
    
    main form {
        width: 90%;
    }

}

</style>