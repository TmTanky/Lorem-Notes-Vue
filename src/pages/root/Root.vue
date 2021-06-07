<template>
  <main>
    <section class="sec1" >
      <div class="getstarted">
        <h1> Handle all your notes <br> in one place </h1>
        <button @click="toLogin" > Get Started </button>
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
  methods: {
    toLogin() {
      this.$router.push({path: '/login'})
    }
  }
})
</script>

<style scoped>

/* Start Normal */

img {
  width: 50%;
  transition-duration: 0.3s;
}

main section.sec2,
main section.sec3,
main section.sec4 {
  display: flex;
  padding: 4rem 0rem;
  transition-duration: 0.3s;
}

/* End Normal */

main section.sec1 h1 {
  font-family: var(--big);
  font-size: 4rem;
  transition-duration: 0.3s;
} 

main section.sec1 {
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition-duration: 0.3s;
}

main section.sec1 .getstarted {
  margin: auto 5rem;
  transition-duration: 0.3s;
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
  background-color: #DF2935;
  color: white;
  transform: scale(1.1);
}

/* button:hover {
    background-color: #DF2935;
    color: white;
} */

/* Sec 2 */

main section.sec2 {
  background-color: #FDCA40;
  transition-duration: 0.3s;
}

main section.sec2 .addnoteimg,
main section.sec2 .addnoteinfo {
  flex: 1;
  display: flex;
  justify-content: center;
  transition-duration: 0.3s;
}

main section.sec2 .addnoteinfo {
  margin: auto;
  transition-duration: 0.3s;
}

main section.sec2 .addnoteinfo h2 {
  font-family: var(--big);
  font-size: 5vw;
  color: white;
  transition-duration: 0.3s;
}

/* main section.sec2 img {
  width: 25rem;
} */


/* Sec 3 */

main section.sec3 {
  background-color: #DF2935;
  transition-duration: 0.3s;
}

main section.sec3 .writedownimg,
main section.sec3 .writedowninfo {
  flex: 1;
  display: flex;
  justify-content: center;
  transition-duration: 0.3s;
}

main section.sec3 .writedowninfo {
  margin: auto;
  transition-duration: 0.3s;
}

main section.sec3 .writedowninfo h2 {
  font-family: var(--big);
  font-size: 5vw;
  color: white;
  margin-left: 4rem;
  transition-duration: 0.3s;
}

/* main section.sec3 img {
  width: 25rem;
} */

/* Sec 4 */

main section.sec4 {
  background-color: #E6E8E6;
  transition-duration: 0.3s;
}

main section.sec4 .personalimg,
main section.sec4 .personalinfo {
  flex: 1;
  display: flex;
  justify-content: center;
  transition-duration: 0.3s;
}

main section.sec4 .personalinfo {
  margin: auto;
  transition-duration: 0.3s;
}

main section.sec4 .personalinfo h2 {
  font-family: var(--big);
  font-size: 5vw;
  color: black;
  transition-duration: 0.3s;
}

/* main section.sec4 img {
  width: 25rem;
} */

@media screen and (max-width: 650px) {

  main section.sec1 {
    height: 500px;
  }

  main section.sec1 .getstarted {
    margin: auto 2rem;
  }

  main section.sec1 h1 {
    font-size: 12vw;
  }

  main section.sec2,
  main section.sec3,
  main section.sec4 {
    flex-direction: column;
  }

  .addnoteinfo,
  .addnoteimg {
    padding: 1rem 0;
  }

  .writedownimg,
  .writedowninfo {
    padding: 1rem 0;
  }

  main section.sec3 .writedowninfo h2 {
    margin-left: 0;
  }

  .personalimg,
  .personalinfo {
    padding: 1rem 0;
  }

}

@media screen and (max-width: 500px) {

  main section.sec1 {
    height: 400px;
  }

  main section.sec1 .getstarted {
    margin: auto 1rem;
  }

  main section.sec2,
  main section.sec3,
  main section.sec4 {
    flex-direction: column;
  }

  .addnoteinfo,
  .addnoteimg {
    padding: 1rem 0;
  }

  main section.sec2 .addnoteinfo h2 {
    font-size: 8vw;
  }

  .writedownimg,
  .writedowninfo {
    padding: 1rem 0;
  }

  main section.sec3 .writedowninfo h2 {
    font-size: 8vw;
    margin-left: 0;
  }

  .personalimg,
  .personalinfo {
    padding: 1rem 0;
  }

  main section.sec4 .personalinfo h2 {
    font-size: 8vw;
    text-align: center;
  }

}


</style>
