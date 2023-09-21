<script>
import { store } from '../store';

export default {
    name: 'RestaurantCard',
    props: {
        dish: {
            type: Object
        }
    },
    data() {
        return {
            store,
            showPlusOne: false, // Variabile per gestire l'effetto "+1"
            restaurantSelected: this.dish.user_id,
        };
    },
    methods: {
        //generate random code
        generateRandomCode() {
            const randomLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            const randomNumbers = '0123456789';
    
            let result = '';

            // Genera 3 caratteri maiuscoli casuali
            for (let i = 0; i < 3; i++) {
                const randomIndex = Math.floor(Math.random() * randomLetters.length);
                result += randomLetters.charAt(randomIndex);
            }

            // Genera 7 cifre casuali
            for (let i = 0; i < 7; i++) {
                const randomIndex = Math.floor(Math.random() * randomNumbers.length);
                result += randomNumbers.charAt(randomIndex);
            }

            return result;
        },

        addToCart() {
        if (store.cart.length === 0 ) {
            store.order_code = this.generateRandomCode();
        }
          const existingDish = store.cart.find(item => item.id === this.dish.id);
          if (existingDish) {

          if (existingDish.user_id !== this.dish.user_id) {
          alert("Non è possibile ordinare da ristoranti diversi in un unico ordine.");
          return; 
          }

          existingDish.quantity += 1;
          } else {
            const dishToAdd = {
                id: this.dish.id,
                name: this.dish.dish_name,
                price: this.dish.price,
                user_id: this.dish.user_id,
                quantity: 1
            };

              if (store.cart.length === 0 || store.cart[0].user_id === this.dish.user_id) {
              store.cart.push(dishToAdd);
              } else {
                alert("Non è possibile ordinare da ristoranti diversi in un unico ordine.");
                return; 
                }
            }

          // Attiva l'effetto "+1"
          this.showPlusOne = true;

          // Imposta un timeout per nascondere l'effetto dopo un breve periodo
          setTimeout(() => {
            this.showPlusOne = false;
          }, 1000); // Nascondi l'effetto dopo 1 secondo (puoi regolare il valore)
        }
    }
};
</script>

<template>
<div
    v-if="dish.visibility && !dish.deleted"
    class="card-container card mb-3"
    style="max-width: 540px;"
    @click="addToCart"
>
    <div class="row g-0">
        <div class="col-md-4 d-flex align-items-center">
            <div class="container-img">
                <img
                    :src="store.imageURL + dish.img"
                    class="img-fluid rounded-start card-image"
                    :alt="dish.dish_name"
                />
            </div>
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">{{ dish.dish_name }}</h5>
                <p class="card-text">{{ dish.description }}</p>
                <p class="card-text">
                    <small class="text-body-secondary">{{ dish.price }} &euro;</small>
                </p>
                <div class="container-add">
                    <span class="plus">+</span>
                </div>
                <!-- Aggiungi il div per l'effetto "+1" -->
                <div v-if="showPlusOne" class="plus-one">
                    +1
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<style lang="scss" scoped>
@use '../styles/general.scss';

.card-container {
    cursor: pointer;
    position: relative;
    transition: box-shadow 0.3s, transform 0.3s;

    &:hover {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        transform: translateY(-5px);

        &:active {
            transform: scale(0.97);
        }
    }

    .container-img {
        height: 80%;
        width: 80%;
        border-radius: 50%;
        vertical-align: middle;
        margin: 10px;

        .card-image {
            height: 100%;
            width: 100%;
            object-fit: cover;
            border-radius: 50%;
        }
    }

    .container-add {
        position: absolute;
        bottom: 8px;
        right: 15px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-bottom: 10px;

        .plus {
            text-align: center;
            line-height: 45px;
            vertical-align: middle;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: rgb(155, 211, 72);
            color: rgb(2, 93, 2);
            font-weight: bold;
            font-size: 30px;
        }
    }
}

.plus-one {
    position: absolute;
    top: -20px;
    right: 10px;
    color: rgb(155, 211, 72);
    font-weight: bold;
    font-size: 18px;
    opacity: 0;
    animation: showPlusOne 0.5s ease-in-out;
}

@keyframes showPlusOne {
    0% {
        opacity: 1;
        transform: translateY(0);
    }
    50% {
        opacity: 1;
        transform: translateY(-20px);
    }
    100% {
        opacity: 0;
        transform: translateY(-40px);
    }
}

.card-cart {
    text-align: end;
    background-color: #333;
    font-size: 14px;
    color: white;
    border: none;
    padding: 7px 14px;
    border-radius: 5px;
    font-weight: bold;
    transition: background-color 0.3s, color 0.3s;

    &:hover {
        background-color: #555;
        color: white;
    }

    &:active {
        transform: scale(0.97);
    }
}
</style>


  addToCart() {
   const existingDish = store.cart.find(item => item.id === this.dish.id);
   const currentRestaurant = store.cart.find(item => item.user_id);

   if(this.restaurantSelected === currentRestaurant) {

       if (existingDish) {
         existingDish.quantity += 1;
       } else {
         const dishToAdd = {
           id: this.dish.id,
           name: this.dish.dish_name,
           price: this.dish.price,
           user_id: this.dish.user_id,
           quantity: 1
         }; 
        store.cart.push(dishToAdd);
       }
   }else{
     alert('Puoi aggiungere piatti solo da un ristorante alla volta.');
   }

   // Attiva l'effetto "+1"
   this.showPlusOne = true;

   // Imposta un timeout per nascondere l'effetto dopo un breve periodo
   setTimeout(() => {
     this.showPlusOne = false;
   }, 1000); // Nascondi l'effetto dopo 1 secondo (puoi regolare il valore)
 } 