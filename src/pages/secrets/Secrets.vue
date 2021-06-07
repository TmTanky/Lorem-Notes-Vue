<template>
    <main>

        <div class="createsecret">
            <button v-if="!formOpen" @click="toggleForm" > Create Secret </button>
        </div>

        <div v-if="!loading" class="title">
            <h1> Secrets </h1>
        </div>

        <transition name="createsecretform" >
            <create-secret-note @refetch-data="getMyNotes" @close-form="toggleForm" v-if="formOpen" />
        </transition>

        <transition name="notes" >
            <loading v-if="loading"/>
            <div v-else-if="!loading && mySecrets.length === 0" class="nonotes">
                <h1> Create one. </h1>
            </div>
            <div v-else class="allnotes">
                <transition-group name="note" >
                    <div v-for="note in mySecrets" :key="note._id" :class="`${note.isDone ? 'notedone onenote ' : note.isFocus ? 'focusnote' : 'onenote' }`" >

                        <div class="options">
                            <transition name="togglenote" mode="out-in" >
                                <div v-if="note.isDone" class="done">
                                    <img @click="markAsDone(note._id)" src="https://img.icons8.com/material-sharp/24/000000/delete-sign.png"/>
                                    <img @click="deleteNote(note._id)" src="https://img.icons8.com/material-rounded/24/000000/delete-forever.png"/>
                                </div>
                                <div v-else class="notdone">
                                    <img @click="toggleEdit(note._id)" src="https://img.icons8.com/material-rounded/24/000000/edit.png"/>
                                    <img @click="deleteNote(note._id)" src="https://img.icons8.com/material-rounded/24/000000/delete-forever.png"/>
                                </div>
                            </transition>
                        </div>

                        <div v-if="note.isFocus" class="details">
                            <div @click="toggleEdit(note._id)" class="close"></div>
                            <input v-model="title" type="text" name="title">
                            <textarea v-model="content" name="content" cols="30" rows="10"></textarea>
                            <button :disabled="invalid" @click="editNote(note._id)" type="submit"> Confirm </button>
                        </div>
                        <div v-else >
                            <h2> {{ note.title }} </h2>
                            <p> {{ note.content }} </p>
                        </div>
                        
                    </div>
                </transition-group>
            </div>
        </transition>

    </main>
</template>

<script lang="ts">
import axios from 'axios'
import {defineComponent} from 'vue'

// Components
import Loading from '@/components/loading/Loader.vue'
import CreateSecretNote from '@/components/createSecretNote/CreateSecretNote.vue'

// Interfaces 
import { Inotes } from '@/interfaces/notes'

export default defineComponent({
    components: {
        Loading,
        CreateSecretNote
    },
    data() {
        return {
            mySecrets: [] as Inotes[],
            loading: true as boolean,
            title: "" as string,
            content: "" as string,
            formOpen: false as boolean
        }
    },
    methods: {
        async getMyNotes() {
            const {data} = await axios.post(`https://ts-lorem-notes-rest.herokuapp.com/getusersecretnotes/${this.userID}`, null, {
                headers: {
                    'authorization': `Bearer ${this.$store.state.user.token}`
                }
            })

            data.data.forEach((element: Inotes) => {
                element.isFocus = false
            });
            
            this.mySecrets = data.data
            this.loading = false
        },
        async deleteNote(noteID: string) {
            const {data} = await axios.delete(`https://ts-lorem-notes-rest.herokuapp.com/deletenote/${this.userID}/${noteID}`, {
                headers: {
                    'authorization': `Bearer ${this.$store.state.user.token}`
                }
            })
            console.log(data)
            await this.getMyNotes()
        },
        async editNote(noteID: string) {
            // console.log(this.title, this.content)
            // console.log(noteID)
            const {data} = await axios.patch(`https://ts-lorem-notes-rest.herokuapp.com/editnote/${noteID}`, {title: this.title, content: this.content} ,{
                headers: {
                    'authorization': `Bearer ${this.$store.state.user.token}`
                }
            })
            console.log(data)
            await this.getMyNotes()
            // this.toggleEdit(noteID)
        },
        toggleEdit(noteID: string) {
            const note = this.mySecrets.find(item => item._id === noteID) as Inotes
            note.isFocus = !note.isFocus
            // !note?.isFocus = !note?.isFocus
            this.title = note.title
            this.content = note.content
        },
        toggleForm() {
            this.formOpen = !this.formOpen
        }
    },
    created() {
        this.getMyNotes()
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

@keyframes fade {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

.note-enter-active,
.notes-enter-active,
.createsecretform-enter-active {
    animation: fade 0.3s ease-in;
}

.note-leave-active,
.createsecretform-leave-active {
    animation: fade 0.3s ease-in reverse;
}

input,
textarea {
    position: relative;
    z-index: 3;
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
    position: relative;
    z-index: 3;
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

main {
    min-height: 90vh;
}

h1 {
    text-align: center;
    font-family: var(--big);
    color: gray;
    margin-top: 2rem;
}

h2 {
    font-family: var(--big);
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    font-weight: 500;
}

p {
    font-family: var(--small);
    font-size: 0.8rem;
    position: relative;
}

.allnotes {
    padding: 2rem;
    display: flex;
    justify-content: center;
    flex-flow: row wrap;
}

.options {
    display: flex;
    justify-content: flex-end;
}

.options img {
    position: relative;
    margin: 0 0.1rem;
    cursor: pointer;
    z-index: 5;
}

.onenote {
    position: relative;
    margin: 0.5rem;
    padding: 1rem;
    border-radius: 5px;
    height: max-content;
    width: 25%;
    background-color: whitesmoke;
    border: transparent 3px solid;
    transition-duration: 0.5s;
    text-decoration: none;
    z-index: 1;
    overflow-wrap: break-word;
    word-wrap: break-word;
}

.focusnote {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    padding: 1rem 2rem;
    border-radius: 5px;
    height: max-content;
    width: 50%;
    background-color: white;
    border: transparent 3px solid;
    transition-duration: 0.5s;
    text-decoration: none;
    z-index: 3;
    border: solid black 1px;
}

.details {
    position: relative;
    z-index: 3;
    display: flex;
    flex-direction: column;
    z-index: 1;
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
    /* background-color: rgba(0, 0, 0, 0.062); */
    z-index: 1;
}

.createsecret {
    margin: 1rem;
    display: flex;
    justify-content: flex-end;
}

.createsecret button {
    width: 120px;
}

@media screen and (max-width: 1000px) {
    .onenote {
        width: 40%;
    }
}

@media screen and (max-width: 650px) {

    .allnotes {
        padding: 2rem 0.5rem;
    }

    .onenote {
        width: 80%;
    }

    .focusnote {
        width: 80%;
    }
}

@media screen and (max-width: 450px) {

    .onenote {
        width: 100%;
    }

    .focusnote {
        width: 90%;
    }
}

</style>
