<script>

export default {
    name: 'Footer',
    components: {
    },
    data() {
        return {
            thxMsg: false
        };
    },
    methods: {
        showThanksMessage() {
            var email = document.getElementById('sign-up-mailbox').value;
            if (!!email) {
                this.thxMsg = true;
                document.getElementById('subscribe-button').disabled = true;
            }

        }
    }
}

</script>

<template>
    <div id="footer-container">
        <img id="wave" src="../assets/img/svg-0.svg" alt="wave" class="d-none d-md-block">
        <!-- Upper Footer -->
        <section id="upper-footer">

            <!-- voucher column -->
            <ul id="voucher-column">
                <h4>VOUCHER</h4>
                <img id="footer-coupon" src="../assets/img/Logo-Bianco-DeliveBoo.png" alt="footer-coupon">
                <p>Basta usare il codice</p>
                <p class="yellow" id="coupon-code">FIRSTORDER</p>
                <p>Al pagamento</p>
            </ul>

            <!-- navigate column -->
            <ul id="navigate-column">
                <h4>NAVIGA</h4>
                <li><router-link to="/">Home</router-link></li>
                <li><a href="#">Carrello</a></li>
            </ul>

            <!-- opening column -->
            <ul id="opening-column">
                <h4>ORARI LAVORATIVI</h4>
                <li>Tutti i giorni <span class="yellow">24h su 24</span></li>
            </ul>

            <!-- information column -->
            <ul id="information-column">
                <h4>INFORMAZIONI</h4>
                <li><a href="javascript:void(0)">Account</a></li>
                <li><a href="javascript:void(0)">Termini Di Servizio</a></li>
                <li><a href="javascript:void(0)">Privacy Policy</a></li>
                <img class="download-badge" src="../assets/img/app-store-badge.png" alt="app-store-badge">
                <img class="download-badge" src="../assets/img/play-store-badge.png" alt="play-store-badge">
            </ul>

        </section>

        <!-- Bottom Footer -->
        <section id="bottom-footer">
            <!-- <div class="img_container">

                <img id="logo-footer" src="../assets/img/Logo-Bianco-DeliveBoo.png" alt="logo-footer">
            </div> -->
            <h3 class="yellow">Rimani aggiornato</h3>
            <form id="subscribe-form">
                <p>Iscriviti per ricevere novità e offerte aggiornate direttamente nella tua casella di posta:</p>
                <div>
                    <input type="email" id="sign-up-mailbox" placeholder="account@email.com" required>
                </div>
                <div>
                    <button type="submit" class="red-button" id="subscribe-button"
                        @click="showThanksMessage()">ISCRIVITI</button>
                </div>
                <p v-if="thxMsg" class="gold-msg">Grazie per esserti registrato!</p>
            </form>
            <div id="socials-container">
                <a href="javascript:void(0)"><i class="fa-brands fa-facebook"></i></a>
                <a href="javascript:void(0)"><i class="fa-brands fa-twitter"></i></a>
                <a href="javascript:void(0)"><i class="fa-brands fa-instagram"></i></a>
                <a href="javascript:void(0)"><i class="fa-brands fa-linkedin-in"></i></a>
                <a href="javascript:void(0)"><i class="fa-solid fa-rss"></i></a>
                <a href="javascript:void(0)"><i class="fa-regular fa-envelope"></i></a>
            </div>
            <p id="copyright"><span class="yellow"><i class="fa-regular fa-copyright"></i> Copyright 2023 | DeliveBoo by
                </span>TEAM 1<span class="yellow">| All Right Reserved | Powered by </span>Laravel + Vue</p>
        </section>
    </div>
</template>


<style lang="scss" scoped>
@use '../styles/general.scss';
@use "../styles/partials/mixins.scss" as *;

#footer-container {
    background-image: url(../assets/img/footer-background-scaled.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    width: 100%;
    padding: 150px 12% 250px;
    position: relative;

    #wave {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
    }


    /* Upper Footer */

    #upper-footer {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-top: 150px;

        ul {
            list-style: none;
            color: white;
            @include my-flex-column;
            gap: 20px;
            font-size: 18px;
            font-weight: bold;

            h4 {
                margin-bottom: 20px;
                font-size: 25px;

            }

            a {
                text-decoration: none;
                color: white;
            }

            a:hover {
                color: rgba(252, 220, 49, 255);
            }

            router-link:hover {
                color: rgba(252, 220, 49, 255);
            }

            a.yellow {
                color: rgba(252, 220, 49, 255);
            }

            a.yellow:hover {
                color: white;
            }

            .download-badge {
                width: 150px;
                border: 2px solid white;
                border-radius: 8px;
                margin-bottom: -10px;
            }
        }

        #voucher-column {
            @include my-flex-column;
            align-items: center;

            #footer-coupon {
                width: 200px;
            }

            p {
                font-size: 18px;
                margin-bottom: -20px;
            }

            #coupon-code {
                font-size: 22px;
            }
        }

        #navigate-column {
            @include my-flex-column;
            align-items: center;
        }

        #opening-column {
            @include my-flex-column;
            align-items: center;
            gap: 12px;
        }

        #information-column {
            @include my-flex-column;
            align-items: center;

            img:hover {
                cursor: pointer;
            }
        }
    }

    /* Bottom Footer */
    #bottom-footer {
        @include my-flex-column;
        align-items: center;
        margin-top: 100px;


            #logo-footer {
                margin-bottom: 50px;
                max-width: 100%;
                width: 400px;
            }
        


        h3 {
            font-size: 45px;
        }

        p:first-of-type {
            margin: 20px 0;
            color: white;
            text-align: center;
        }

        #subscribe-form {
            text-align: center;
        }

        
        
        #subscribe-button {
            width: 40%;
            margin: 20px 0 30px;
            color: white;
        }
        
        .gold-msg {
            color: gold;
            font-size: xx-large;
        }

        
        #socials-container {
            @include my-flex-row;
            gap: 30px;
            font-size: 20px;
            color: white;
            margin-bottom: 20px;
            
            a {
                color: white;
            }
        }
        
        #copyright {
            font-size: 13px;
            color: white;
        }
    }
    
}
#sign-up-mailbox {
    width: 40%;
    padding: 11px 30px;
    border-radius: 20px;
    text-decoration: none;
    font-size: 16px;
}


@media screen and (max-width: 900px) {
    #copyright {
        text-align: center;
    }
    #sign-up-mailbox{
        width: 70%;
        text-align: center;
    }

    #logo-footer{
        width: 380px;
    }
    #footer-container {
        #upper-footer{
        display: block;

            #voucher-column{
                margin-bottom: 100px;
            }
            #navigate-column{
                margin-bottom: 100px;
            }
            #opening-column{
                margin-bottom: 100px;
            }
            #information-column{
                margin-bottom: 100px;
            }

            ul{
                h4{
                    border: 1px solid red;
                    border-radius: 20px;
                    padding: 15px;
                }
            }
        }
    }
    h3{
        text-align: center;
    }
    .img_container{
        width: 100%;

            #logo-footer {
                margin-bottom: 50px;
                width: 100%;
            }
        }
}
</style>