<script>
import axios from 'axios';
import { store } from '../store';
import RestaurantCard from '../components/RestaurantCard.vue';

export default {
  name: 'RestaurantShow',
  components: {
    RestaurantCard,
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
  <div class="container" id="restaurant-show">
    <div class="row">
      <div class=" col-md-4 col-sm-12" v-for="singleRestaurant in store.restaurantSearch" :key="singleRestaurant.id">
        <RestaurantCard :restaurant="singleRestaurant" />
      </div>
    </div>
    <hr class="bottom-margin">
  </div>
</template>

<style lang="scss" scoped>
@use '../styles/general.scss';
</style>