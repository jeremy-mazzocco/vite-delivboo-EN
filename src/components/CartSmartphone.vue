<script>
import { store } from '../store';
import { watch } from 'vue';

export default {
  name: 'CartSmartphone',

  data() {
    return {
      store,
      isFormVisible: false,
    }
  },
  computed: {
        cartTotal() {
            return this.store.cart.reduce((acc, dish) => {
                return acc + (dish.price * dish.quantity);
            }, 0);
        }
    },
    watch: {
        'store.cart': {
            handler() {
                this.saveCartToSession();
            },
            deep: true
        }
    },
  methods: {

    toggleFormVisibility() {
      this.isFormVisible = !this.isFormVisible; // Inverti la visibilità del form
    },
    increaseQuantity(item) {
            item.quantity += 1;
        },

    decreaseQuantity(item) {
        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            const index = this.store.cart.indexOf(item);
            if (index !== -1) {
                this.store.cart.splice(index, 1);
            }
        }
    },

    removeDishesById(item) {
        const index = this.store.cart.findIndex(dish => dish.id === item.id);
        if (index !== -1) {
            this.store.cart.splice(index, 1);
        }
    },

    saveCartToSession() {
        sessionStorage.setItem('cart', JSON.stringify(this.store.cart));
        sessionStorage.setItem('order_code', JSON.stringify(this.store.order_code));
    }
  },

  mounted() {
        const savedCart = sessionStorage.getItem('cart');
        const savedCode = sessionStorage.getItem('order_code');
        if (savedCart) {
            try {
                this.store.cart = JSON.parse(savedCart);
                this.store.order_code = JSON.parse(savedCode);
            } catch (e) {
                console.error('Failed to load cart from sessionStorage:', e);
            }
        };

    }
}
</script>

<template>

<!-- smartphone -->
  <div class="button-tipology">
    <button @click="toggleFormVisibility" class="button-tipology btn btn-dark">Carrello</button> <!-- Bottone per mostrare il form -->


    <div class="card" v-if="isFormVisible">
        <div @click="toggleButton" class="card-header">
            <h2 class=" text-center d-none d-md-block">Il tuo carrello</h2>
            <div class="text-center"><small class="text-body-secondary">codice ordine: {{ store.order_code }}</small></div>
        </div>
        <div class="card-body">
            <div v-for="details in store.cart" :key="details.id">
                <div class="container">
                    <div class="row">
                        <div class="col-2 text-start quantita">{{ details.quantity }}x</div>
                        <div class="col-7 text-center dish-name">{{ details.name }}</div>
                        <div class="col-3 text-end prezzo">{{ (details.price * details.quantity).toFixed(2) }} &euro;</div>
                    </div>
                    <div class="row">
                        <div class="col-2 text-start">
                            <div class="add-button plus" @click="decreaseQuantity(details)">-</div>
                        </div>
                        <div class="col-7 text-center mod">Modifica</div>
                        <div class="col-3 d-flex justify-content-end">
                            <div class="deduct-button plus" @click="increaseQuantity(details)">+</div>
                        </div>
                    </div>
                </div>

                <hr>
            </div>
            <div id="empty-cart" v-if="store.cart.length < 1">
                <p class="text-center">IL TUO CARRELLO E' VUOTO</p>
                <div class="text-center"><font-awesome-icon icon="cart-shopping" /></div>
            </div>
        </div>

        <!-- collegamento pagina checkout -->
            <div class="card-footer text-body-secondary text-center">
        <router-link
        :to="{ 
            name: 'Payment',
        }">
    
                <button class="btn btn-success " v-if="store.cart.length > 0">
                    Ordina e Paga {{ cartTotal.toFixed(2) }} &euro;
                </button>
    
        </router-link>
            </div>
        
    </div>



    <!-- <form v-if="isFormVisible" class="container-element-menu">
      <div v-for="singleType in store.typeList" :key="singleType.id" class="border-bottom">
        <TypeCard :type="singleType" @checkboxToggled="handleCheckboxToggle(singleType.id, $event)" />
      </div>
      <hr class="bottom-margin">
    </form> -->
  </div>

</template>

<style lang="scss">
@use '../styles/general.scss';

.button-tipology {
  width: 100%;
  height: 100%;
}
hr {
    margin-right: 15px;
    margin-left: 15px;
    color: black;
    border: 1px solid black;
}

.prezzo{
    font-size: 12px;
}
.dish-name{
    font-size: 14px;
}
.quantita{
    font-weight: bold;
}
.plus {
    text-align: center;
    line-height: 17px;
    vertical-align: middle;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: rgb(155, 211, 72);
    color: rgb(2, 93, 2);
    font-weight: bold;
    font-size: 15px;
    cursor: pointer;
    }
    .mod{
        font-size: 15px;
        color:  rgb(155, 211, 72);
    }

    

@media screen and (max-width: 900px) {
    /* .card-body{
        display: none;
    }
    .card-footer{
        display: none;
    }
    .card-header{
        cursor: pointer;
        h2{
            font-weight: bold;
        }
    } */
}

</style>