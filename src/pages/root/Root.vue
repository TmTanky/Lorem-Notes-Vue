<template>
  <main>
    <section class="sec1" >
      <div class="getstarted">
        <h1> Handle all your notes <br> in one place </h1>
        <button> Get Started </button>
      </div>
    </section>

    <section class="sec2">
      <div class="addnoteimg">
        <img src="./addnotes.svg" alt="asdasda">
      </div>

      <div class="addnoteinfo">
        <h2> Create Notes, <br> Track Notes & <br> Delete Notes. </h2>
      </div>
    </section>

    <section class="sec3">
      <div class="writedowninfo">
        <h2> Random thoughts? <br> Write that down. </h2>
      </div>

      <div class="writedownimg">
        <img src="./writedown.svg" alt="">
      </div>
    </section>

    <section class="sec4">
      <div class="personalimg">
        <img src="./personal.svg" alt="">
      </div>

      <div class="personalinfo">
        <h2> Create your own secrets. </h2>
      </div>
    </section>

  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({

})
</script>

<style scoped>

main section.sec1 h1 {
  font-family: var(--big);
  font-size: 4rem;
} 

main section.sec1 {
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

main section.sec1 .getstarted {
  margin: auto 5rem;
}

main section.sec1 button {
  height: 35px;
  width: 100px;
  padding: 0.5rem;
  font-family: var(--small);
  font-weight: 500;
  background-color: #FDCA40;
  color: black;
  border: none;
  transition-property: all;
  transition-duration: 0.3s;
  cursor: pointer;
}

main section.sec1 button:hover {
  background-color: rgba(253, 202, 64, 0.9);
  transform: scale(1.1);
}

/* Sec 2 */

main section.sec2 {
  height: 600px;
  display: flex;
  background-color: #FDCA40;
}

main section.sec2 .addnoteimg,
main section.sec2 .addnoteinfo {
  flex: 1;
  display: flex;
  justify-content: center;
}

main section.sec2 .addnoteinfo {
  margin: auto;
}

main section.sec2 .addnoteinfo h2 {
  font-family: var(--big);
  font-size: 3.5rem;
  color: white;
}

main section.sec2 img {
  width: 25rem;
}


/* Sec 3 */

main section.sec3 {
  height: 600px;
  display: flex;
  background-color: #DF2935;
}

main section.sec3 .writedownimg,
main section.sec3 .writedowninfo {
  flex: 1;
  display: flex;
  justify-content: center;
}

main section.sec3 .writedowninfo {
  margin: auto;
}

main section.sec3 .writedowninfo h2 {
  font-family: var(--big);
  font-size: 3.5rem;
  color: white;
}

main section.sec3 img {
  width: 25rem;
}

/* Sec 4 */

main section.sec4 {
  height: 600px;
  display: flex;
  background-color: #E6E8E6;
}

main section.sec4 .personalimg,
main section.sec4 .personalinfo {
  flex: 1;
  display: flex;
  justify-content: center;
}

main section.sec4 .personalinfo {
  margin: auto;
}

main section.sec4 .personalinfo h2 {
  font-family: var(--big);
  font-size: 3.5rem;
  color: black;
}

main section.sec4 img {
  width: 25rem;
}


</style>
