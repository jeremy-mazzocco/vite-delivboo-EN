<script>
import axios from 'axios';
import { store } from '../store';
import DishShow from '../components/DishShow.vue';
import Cart from '../components/Cart.vue';
import CartSmartphone from '../components/CartSmartphone.vue';
import RestaurantHeader from '../components/RestaurantHeader.vue';
import Footer from '../components/Footer.vue';

export default {
  name: 'DishesShow',
  components: {
    DishShow,
    RestaurantHeader,
    Cart,
    CartSmartphone,
    Footer,
  },

  data() {
    return {
      store,
    }
  },

  mounted() {
    // Ottieni l'ID del ristorante dalla route attuale
    const restaurantId = this.$route.params.id;

    // Effettua una richiesta Axios per ottenere la lista dei piatti del ristorante
    axios.get(store.apiURL + '/restaurant/' + restaurantId + '/dishes')
      .then(response => {
        // Salva la lista dei piatti nello store
        store.dishesList = response.data.dishes;

        // Salva i dati del ristorante selezionato nello store
        store.restaurantSelected = response.data.restaurantSelected;

        console.log('risposta ristorante: ', response.data.restaurantSelected);
        console.log('lista piatti: ', store.dishesList);
        console.log('ristorante: ', store.restaurantSelected);
      })
      .catch(error => {
        console.log(error);
      });
  },
}
</script>

<template>
  <RestaurantHeader />
    <!-- smartphone -->
    <div class="button-menu d-md-none d-sm-block d-flex justify-content-center dropdown-menu">
        <CartSmartphone />
    </div>
  <div class="main-container">
    <div class="container">

      <div class="row">

        <div class="col-lg-9 col-sm-12">

          <div class="container-element margin-smartphone">
            <DishShow />
          </div>

        </div>
        <div class="col-lg-3  d-none d-md-block">
          <div class="container-element">

            <Cart />
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<style lang="scss" scoped>
@use '../styles/general.scss';

.dishcard-container {
  margin-bottom: 100px;
}
.dropdown-menu {
  padding: 0;
  border-radius: 20px;
}
  .button-menu {
    position: fixed;
    top: 105px;
  }
  @media (max-width: 767px) { 
    // .margin-smartphone {
    //   margin-top: 150px;
  
    // }
  }
</style>
