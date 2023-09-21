<script>
import Cart from './Cart.vue';
import { store } from '../store';

export default {
    name: 'AppHeader',
    components: {
        Cart
    },
    data() {
        return {
            isCartVisible: false,
            headerOpacity: 0
        };
    },
    computed: {
        totalDishesInCart() {
            return store.cart.reduce((acc, dish) => acc + dish.quantity, 0);
        },
    },
    methods: {
        openCart() {
            this.isCartVisible = !this.isCartVisible;
        },
        updateHeaderOpacity() {
            window.addEventListener('DOMContentLoaded', () => {
                const containerHeight = document.getElementById('header-container').offsetHeight;
                const scrollY = window.scrollY;
                const opacity = Math.min(scrollY / containerHeight, 1);
                this.headerOpacity = opacity;

            });
        },
    },
    mounted() {
        window.addEventListener('scroll', this.updateHeaderOpacity);
        this.updateHeaderOpacity(); // Imposta l'opacità iniziale
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.updateHeaderOpacity);
    },
}
</script>

<template>
    <div id="header-container">
        <div class="d-flex justify-content-between me-3 header-style">

            <router-link :to="{ name: 'AppHome' }">
                <img id="logo" src="../assets/img/Logo-Bianco-DeliveBoo.png" alt="logo">
                <img src="../assets/img/Panino-DeliveBoo-bianco.png" alt="logo" id="logo-responsive">
            </router-link>

            <a href="http://localhost:8000/" class="text-light d-none d-md-block">
                Restaurant Owner Area
            </a>
        </div>
    </div>
</template>


<style lang="scss" scoped>
@use '../styles/general.scss';

a.text-light {
    
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
}


#header-container {
    width: 100%;
    position: relative;
    background-color: black;
    height: 100px;
}

.header-style {
    padding: 20px;
    width: 100%;
    height: 100px;
    position: fixed;
    z-index: 10;
    align-items: center;
    background-color: black;
}


#logo {
    cursor: pointer;
    height: 60px;
}

#cart-logo {
    font-size: 50px;
    color: white;
}

#logo-responsive {
    display: none;
}


@media screen and (max-width: 900px) {

    #logo {
        display: none;
    }

    #logo-responsive {
        display: block;
        height: 60px;
    }

}
</style>