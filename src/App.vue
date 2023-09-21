<script>
import { store } from '../src/store';
import AppHeader from './components/AppHeader.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    Footer

  },
  data() {
    return {
      store,
    }
  },
  computed: {
    isPaymentRoute() {
      // Verifica se la route corrente è "Payment"
      return this.$route.name === 'Payment';
    }
  }
}
</script>

<template>
  <AppHeader v-if="!isPaymentRoute"/>
  <router-view></router-view>
  <Footer v-if="!isPaymentRoute"/>
</template>

<style  lang="scss">
  @use './styles/general.scss';
body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  
}

</style>
