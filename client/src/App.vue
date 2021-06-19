<template>
  <div id="app">
    <NavigationBar />
    <router-view id="body" />
  </div>
</template>

<script>
import NavigationBar from '@/components/NavigationBar.vue';

export default {
  components: {
    NavigationBar,
  },
};
</script>

<style>
@media (max-width: 768px) {
.footer {
  text-align: center;
}
}

html,
body {
  height: 100%;
}

#app {
  min-height: 100%;
  position: relative;
  background: rgb(247, 247, 247);
}
</style>
