<script>

export default {
    name: 'Jumbotron',
    components: {
    },
    data() {
        return {
        };
    },
    methods: {
        scrollToRestaurantShow() {
            const element = document.getElementById('restaurant-show');
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offset = 200; // Cambia questo valore in base all'altezza del tuo menu
            window.scrollTo({
                top: elementPosition - offset,
                behavior: 'smooth'
            });
        }
    }
}

</script>

<template>

    <div id="header-container">

        <div id="title-container">

            <p class="white">Affamato?</p>

            <h1 class="yellow">Cibo Direttamente a Casa!</h1>

            <button class="white red-button" @click="scrollToRestaurantShow">
                VISUALIZZA I RISTORANTI 
                <i class="fa-solid fa-circle-right"></i>
            </button>

        </div>

    </div>

</template>


<style lang="scss" scoped>
@use '../styles/general.scss';
@use "../styles/partials/mixins.scss" as *;

#header-container {
    background-image: url(../assets/img/home-background-hero-scaled.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    width: 100%;
    height: 1200px;
    position: relative;

    #title-container {
        padding: 250px 20% 400px;

        p:first-of-type {
            font-size: 45px;
            font-weight: 600;
            margin-bottom: 40px;
        }

        h1 {
            // font-size: 80px;
            // line-height: 100px;
            // margin-bottom: 50px;
            // width: 500px;
        }
    }
}
@media screen and (max-width: 900px) {
    
    #header-container {

        #title-container {
            padding: 180px 20% 400px;
            h1 {
                font-size: 50px;
            }
        } 
    }
}
</style>