<script>

import { store } from '../store';

export default {
    name: 'RestaurantHeader',
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
    <div class="my-container">
   
        <div class="container-img">
            <img :src="store.imageURL + store.restaurantSelected.img" class="card-img"
                :alt="store.restaurantSelected.restaurant_name"
                @error="handleImageError"
                >
            <div class="text-restaurant col-lg-6 ">
                <div class="container">
                    <div class="row mb-2">
                        <div class="col-12">
                            <h5 class="card-title text-dark">{{ store.restaurantSelected.restaurant_name }}</h5>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4 col-12 info-style">
                            <p class="card-text text-bg-success rounded-5 p-2 text-light overflow-wrap-break-word">{{ store.restaurantSelected.email }}</p>
                        </div>
                        <div class="col-md-4 col-12 info-style ">
                            <p class="card-text text-bg-success rounded-5 p-2 text-light overflow-wrap-break-word"><small>{{ store.restaurantSelected.address }}</small></p>
                        </div>
                        <div class="col-md-4 col-12 info-style ">
                            <p class="card-text text-bg-success rounded-5 p-2 text-light overflow-wrap-break-word"><small>{{ store.restaurantSelected.phone_number }}</small></p>
                        </div>
                    </div>
                
                </div>
            
            </div>
        </div>
    </div>  
</template>

<style lang="scss" scoped>
@use '../styles/general.scss';
.my-container{
    margin-bottom: 50px;
    .container-img{
        width: 100vw;
        height: 300px;
        position: relative;
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        .text-restaurant {
            position: absolute;
            bottom: 50px;
            left: 50%;
            transform: translate(-50%, 100%);
            color: gray;
            text-align: center;
            background-color: white;
            border-radius: 2px;
            padding: 20px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
       

            h5{
                font-size: 30px;
                font-weight: bold;
            }
            
        }
        @media (max-width: 767px) { 
            .text-restaurant {
            bottom: 150px;
        
            }
        }
    }
}

p{
    font-size: 15px;
    color: white;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5); 
}






/* Stili per schermi con larghezza minima di 600px */
@media screen and (max-width: 900px) {
    /* Inserisci qui le regole CSS per il font-size desiderato */
    
    p{
        font-size: 15px;
        font-weight: bold;

    }
    .overflow-wrap-break-word {
      overflow-wrap: break-word;
      max-width: 100%; /* Imposta la larghezza massima per la colonna */
    }
    .text-restaurant {
        width: 80%;
        margin-bottom: 50px;
    }

    .info-style{
        margin-bottom: 30px;
    }
}

</style>
