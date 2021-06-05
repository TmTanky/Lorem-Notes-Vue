<template>
    <main class="home">

        <transition name="createnoteform" >
            <create-note @refetch-data="getMyNotes" @close-form="toggleForm" v-if="createOpen"/>
        </transition>

        <!-- !loading && myNotes.length === 0 -->
        <transition name="notes" >
            <loading v-if="loading" />
            <div v-else-if="!loading && myNotes.length === 0" class="nonotes">
                <h1> Create one. </h1>
            </div>
            <div v-else class="allnotes">
                <transition-group name="note" mode="out-in" >
                    <div v-for="note in myNotes" :key="note._id" :class="`${note.isDone ? 'notedone onenote ' : note.isFocus ? 'focusnote' : 'onenote' }`" >
                        <!-- <div class="done"> <img src="https://img.icons8.com/material-rounded/24/000000/checkmark--v1.png"/> </div> -->
                        <div class="options">
                            <transition name="togglenote" mode="out-in" >
                                <div v-if="note.isDone" class="done">
                                    <img @click="markAsDone(note._id)" src="https://img.icons8.com/material-sharp/24/000000/delete-sign.png"/>
                                    <img @click="deleteNote(note._id)" src="https://img.icons8.com/material-rounded/24/000000/delete-forever.png"/>
                                </div>
                                <div v-else class="notdone">
                                    <img @click="markAsDone(note._id)" v-if="!note.isFocus" src="https://img.icons8.com/material-rounded/24/000000/checkmark--v1.png"/>
                                    <img @click="toggleEdit(note._id)" src="https://img.icons8.com/material-rounded/24/000000/edit.png"/>
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
                            <p> {{ note.content.substring(0,100) }} </p>
                        </div>

                    </div>
                </transition-group>
            </div>
        </transition>

        <div class="openform">
            <div @click="toggleForm" class="openbtn">
                <p> + </p>
            </div>
        </div>

    </main>
</template>

<script lang="ts">
import axios from 'axios'

// Components
import Loading from '@/components/loading/Loader.vue'
import CreateNote from '@/components/createNote/CreateNote.vue'

import { defineComponent } from 'vue'
import { Inotes } from '@/interfaces/notes'

export default defineComponent({
    components: {
        Loading,
        CreateNote
    },
    data() {
        return {
            myNotes: [] as Inotes[],
            loading: true,
            createOpen: false,
            title: "",
            content: ""
        }
    },
    methods: {
        async getMyNotes() {
            const {data} = await axios.post(`https://ts-lorem-notes-rest.herokuapp.com/getusernotes/${this.userID}`, null, {
                headers: {
                    'authorization': `Bearer ${this.$store.state.user.token}`
                }
            })

            data.data.forEach((element: Inotes) => {
                element.isFocus = false
            });
            
            this.myNotes = data.data
            this.loading = false
        },
        async markAsDone(noteID: string) {
            const {data} = await axios.patch(`https://ts-lorem-notes-rest.herokuapp.com/toggledonenote/${noteID}`, null, {
                headers: {
                    'authorization': `Bearer ${this.$store.state.user.token}`
                }
            })
            console.log(data)
            await this.getMyNotes()
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
        toggleForm() {
            this.createOpen = !this.createOpen
        },
        toggleEdit(noteID: string) {
            const note = this.myNotes.find(item => item._id === noteID) as Inotes
            note.isFocus = !note.isFocus
            // !note?.isFocus = !note?.isFocus
            this.title = note.title
            this.content = note.content
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
    },
    created() {
        this.getMyNotes()
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

.togglenote-enter-active,
.notes-enter-active,
.note-enter-active,
.createnoteform-enter-active {
    animation: fade 0.3s ease-in;
}

.note-leave-active,
.createnoteform-leave-active {
    animation: fade 0.3s ease-out reverse;
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

main.home {
    min-height: 90vh;
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
    min-height: 90vh;
    flex-flow: row wrap;
}

.onenote {
    position: relative;
    margin: 1rem;
    padding: 1rem;
    border-radius: 5px;
    height: max-content;
    width: max-content;
    background-color: whitesmoke;
    border: transparent 3px solid;
    transition-duration: 0.5s;
    text-decoration: none;
    z-index: 1;
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
    width: max-content;
    background-color: white;
    border: transparent 3px solid;
    transition-duration: 0.5s;
    text-decoration: none;
    z-index: 3;
    border: solid black 1px;
}

/* .done {
    position: absolute;
    display: flex;
    background-color: red;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    top: -11px;
    left: -11px;
    cursor: pointer;
}

.done img {
    margin: auto;   
} */

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

.notedone {
    border: solid black 3px;
    transition-duration: 0.5s;
    text-decoration: line-through;
}

.nonotes {
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    margin-top: 5rem;
}

.nonotes h1 {
    text-align: center;
    font-family: var(--big);
    color: rgba(129, 123, 123, 0.616);
}

.openform {
    display: flex;
    justify-content: flex-end;
    margin: 2rem;
}

.openform .openbtn {
    background-color: rgb(253, 202, 64);
    height: 50px;
    width: 50px;
    border-radius: 50%;
    text-align: center;
    display: flex;
    justify-content: flex-end;
    align-content: center;
    align-items: center;
    cursor: pointer;
    transition-property: all;
    transition-duration: 0.3s;
}

.openform .openbtn p {
    margin: auto;
    text-align: center;
    font-size: 2.5rem;
}

.openform .openbtn:hover {
    transform: scale(1.1);
}

/* .openform button {
    height: 50px;
    width: 50px;
    font-size: 3rem;
    margin: auto;
    border-radius: 50%;
} */

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

</style>