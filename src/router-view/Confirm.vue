<script>
import { store } from '../store';

export default {
  name: 'Confirm',
  components: {

  },
  data() {
    return {
      store,
      orderData: [],
    };
  },
  methods: {

  },
  mounted() {
    
  }
}
</script>


<template>
  <div class="main-container">
    <div class="container-element d-flex justify-content-center align-items-center">
      <div class="card border-success mb-3" style="max-width: 18rem;">
        <div class="card-header">Your data</div>
        <div class="card-body">
          <h5 class="card-title bg-secondary-subtle rounded">Name</h5>
          <p class="card-text bg-success-subtle rounded"><b>{{ store.order.customer_name }}</b></p>
          <h5 class="card-title bg-secondary-subtle rounded">Address</h5>
          <p class="card-text bg-success-subtle rounded"><b>{{ store.order.customer_address }}</b></p>
          <h5 class="card-title bg-secondary-subtle rounded">Email</h5>
          <p class="card-text bg-success-subtle rounded"><b>{{ store.order.email }}</b></p>
          <h5 class="card-title bg-secondary-subtle rounded">Phone</h5>
          <p class="card-text bg-success-subtle rounded"><b>{{ store.order.phone_number }}</b></p>
          <h5 class="card-title bg-secondary-subtle rounded">Total</h5>
          <p class="card-text bg-success-subtle rounded"><b>{{ store.order.total_price }}</b></p>
          <br>
          <p class="card-text text-success">Thanks for order!</p>

        </div>
        <div class="card-footer">
          <router-link :to="{ name: 'AppHome' }" class="btn btn-primary">
            Go to Home
          </router-link>
        </div>

      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use '../styles/general.scss';

.card-text,
.card-title {
  padding-left: 5px;
}
</style>

