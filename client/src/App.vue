<template>
  <div id="app">
    <NavigationBar />
    <Header />
    <router-view />
  </div>
</template>

<script>
import NavigationBar from '@/components/NavigationBar.vue';
import Header from './components/Header.vue';

export default {
  components: {
    Header,
    NavigationBar,
  },
};
</script>
