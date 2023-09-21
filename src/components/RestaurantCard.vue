<script>
import { store } from '../store';

export default {
  name: 'RestaurantCard',
  props: {
    restaurant: {
      type: Object
    }
  },
  data() {
    return {
      store,
    }
  },
  methods: {
    handleImageError(event) {
      event.target.src = store.errorImageURL; 
    }
  }
}
</script>

<template>
  <div class="container-card">
    <router-link
      class="btn"
      :to="{ 
        name: 'DishesShow',
        params: { id: restaurant.id }
      }"
    >
      <div class="container-img">
        <div class="zoom-image">
          <img
            :src="store.imageURL + restaurant.img"
            @error="handleImageError"
            :alt="restaurant.restaurant_name"
          />
        </div>
      </div>
      <div class="types">
        <span v-for="item in restaurant.types" :key="item.id" v-html="item.img">
        </span>
      </div>
      <div class="content">
        <h3>{{ restaurant.restaurant_name }}</h3>
      </div>


    </router-link>
  </div>
</template>

<style lang="scss" scoped>
  @use '../styles/general.scss';
.container-card{
  border-radius: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;

  .btn{
    padding: 0;
  }
  :hover .zoom-image img {
      transform: scale(1.2);
    }
  .btn{
    width: 100%;
  }
  .container-img {
    height: 200px;
    width: 100%;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    overflow: hidden;
    margin-bottom: 5px;
    .zoom-image {
      height: 100%;
      width: 100%;
      position: relative;
      overflow: hidden;

      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
        border-top-left-radius: 30px;
        border-top-right-radius: 30px;
        transition: transform 0.3s ease;
      }
    }

  }
  .types{
    text-align: left;
    padding-left: 10px;
    margin: 0 5px;
    font-size: 15px;
    span{
      margin: 0 5px;
    }
  }
  .content{
    h3{
      font-size: 20px;
      text-align: left;
      font-weight: bold;
      padding-left: 20px;
    }
  }
}
</style>
