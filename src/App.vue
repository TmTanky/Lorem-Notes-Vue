<template>
  <main>
    <the-header/>
      <router-view> </router-view>
    <the-footer/>
  </main>
</template>

<script lang="ts">
import TheHeader from '@/components/header/TheHeader.vue'
import TheFooter from '@/components/footer/TheFooter.vue'

import { defineComponent } from 'vue'

export default defineComponent ({
  components: {
    TheHeader,
    TheFooter
  }
})

</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&family=Work+Sans:wght@100;200;300;400;500;600;700;800;900&display=swap');

:root {
  --big: 'Montserrat', sans-serif;
  --small: 'Work Sans', sans-serif;
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

</style>
