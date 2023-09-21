<script>

import { store } from '../store';
import DishCard from '../components/DishCard.vue';

export default {
  name: 'DishShow',
  components: {
    DishCard,
  },
  data() {
    return {
      store,
    }
  },
  methods: {

  },

  mounted() {
  },
}
</script>

<template>

  <div class="container">
    <div class="row">
      <div class="col-lg-6 col-sm-12" v-for="singleDish in store.dishesList" :key="singleDish.id" >
        <DishCard :dish="singleDish" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../styles/general.scss';

</style>