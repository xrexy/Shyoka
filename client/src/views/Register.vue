<template>
  <div>
    <div v-if="error" class="error">{{error}}</div>
    
  </div>
</template>
<script>
export default {};
</script>
<style scoped>

.error {
    color: red;
    font-size: 18px;
}

input {
    width: 400px;
    padding: 30px;
    margin: 20px;
    font-size: 21px;
}

button {
    width: 400px;
    height: 75px;
    font-size: 100%;
}

</style>
