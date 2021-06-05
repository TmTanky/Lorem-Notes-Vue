<template>
    <div class="loading">
        <div class="circle">

        </div>
    </div>
</template>


<style scoped>

.loading {
  display: flex;
  padding: auto;
  margin: auto;
  justify-content: center;
  min-height: 90vh;
}

.circle {
    margin: auto;
    border: 5px solid #f3f3f3;
    border-radius: 50%;
    border-top: 5px solid #3772FF;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

</style>