<template>
    <div>
        <form method="POST" ref="orderForm"
        @submit.prevent="submitOrder">

            <div class="riepilogo_form">
                <h3>Riepilogo ordine</h3>

                <hr>

                <label for="total_price"></label>
                <input type="text" id="total_price" name="total_price" readonly="readonly" disabled
                    :value="priceTotal.toFixed(2)">
                <br><br>
            </div>

            <div class="container-riepilogo">
                <h3>Riepilogo ordine {{ store.order_code }}</h3>
                <div class="riepilogo">
                    <ul v-for="details in store.cart" :key="details.id">
                        <li>
                            <span class="quantity-style">{{ details.quantity }}</span>
                            <span>{{ details.name }} </span>
                            <span class="price-style">{{ details.price }} &euro;</span>
                        </li>
                    </ul>

                    <hr>
                    <div class="total-price-style">
                        <span>Prezzo Totale: </span>
                        <span class="price-style">{{ priceTotal.toFixed(2) }} &euro;</span>
                    </div>
                </div>
            </div>

            <label for="customers_name">Nome:</label>
            <input type="text" id="customers_name" name="customer_name" required v-model="this.customer_name" ><br><br>

            <label for="customers_adress">Indirizzo di Consegna:</label>
            <textarea id="customers_adress" name="customer_adress"  required v-model="this.customer_adress"></textarea><br><br>

            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required  v-model="this.email"><br><br>

            <label for="phone_number">Numero di Telefono:</label>
            <input type="tel" id="phone_number" name="phone_number" required v-model="this.phone_number"><br><br>
            <h5 v-if="!this.transactionStatus" class=" text-center border border-danger text-danger rounded-3 py-3">
                Inserisci una carta di credito valida!
            </h5>
            <h5 v-if="this.transactionStatus === true" class=" text-center border border-success text-success rounded-3 py-3">
                Transazione completata correttamente
            </h5>

            <Braintree @transaction-complete="handleTransactionComplete" />
    
            <h5 v-if="this.dataError" class=" text-center border border-danger text-danger rounded-3 py-3">
                Errore database
            </h5>

        </form>
    </div>
</template>

  
<script>
import { mapState } from 'vuex';
import { store } from '../store';
import axios from 'axios';

import Braintree from '../components/Braintree.vue';

export default {
    name: 'Payment',
    components: {
        Braintree
    },
    data() {
        return {
            store,
            customer_name: '',
            customer_adress: '',
            email: '',
            phone_number: '',
            errorMessage: '',
            transactionStatus: 'attesa',
            dataError: false,

        };
    },
    methods: {
        handleTransactionComplete(transactionStatus) {

            console.log("Stato della transazione:", transactionStatus);
            this.transactionStatus = transactionStatus;

            if (transactionStatus === "true") {
                this.submitOrder();
            } else {
                this.errorMessage = "Errore durante il pagamento";
            }
        },
        goToPage() {
            // resetto carrello e form
            this.$refs.orderForm.reset();
            this.store.cart = [];
            this.store.order_code = '';
            sessionStorage.removeItem('cart');
            sessionStorage.removeItem('order_code');

            this.$router.push({
                name: 'Confirm',
                // params: { orderData: response.data.order }
            });            
        },
        submitOrder() {
            setTimeout(() => {
                if (this.transactionStatus === true) { 
                    const formData = {
                        order_code: this.store.order_code,
                        customer_name: this.customer_name,
                        customer_adress: this.customer_adress,
                        email: this.email,
                        status: this.transactionStatus,
                        phone_number: this.phone_number, 
                        total_price: this.priceTotal.toFixed(2),
                        dishes: this.store.cart.map((dish) => ({
                            dish_id: dish.id,
                            amount: dish.quantity,
                        })),
                    };
                    console.log(formData);
                    axios.post('http://localhost:8000/api/v1/orders', formData)
                        .then(response => {
                            store.order = response.data.order
                            this.goToPage();
                        })
                        .catch(error => {
                            console.log(error);
                            this.dataError = true;
                        });
                    // this.goToPage();
                }
            }
        , 2000);
        },
    },
    computed: {
        ...mapState(['store']),
        priceTotal() {
            return this.store.cart.reduce((acc, dish) => {
                return acc + (dish.price * dish.quantity);
            }, 0);
        }
    },
    mounted(){
        
    },
    created() {
    
        // Carica il carrello salvato da sessionStorage all'avvio del componente
        const savedCart = sessionStorage.getItem('cart');
        const savedCode = sessionStorage.getItem('order_code');
        if (savedCart) {
            try {
                this.store.cart = JSON.parse(savedCart);
                this.store.order_code = JSON.parse(savedCode);
            } catch (e) {
                console.error('Failed to load cart from sessionStorage:', e);
            }
        }
    }
}

</script>

<style scoped lang="scss">
/* Stile per l'elemento h1 */
h1 {
    font-size: 24px;
    /* Imposta la dimensione desiderata */
    margin-bottom: 20px;
    /* Spazio tra l'h1 e il form */
    font-weight: bold;
}

/* Stile generale del form */
form {
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

/* Stile per le etichette dei campi */
label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

/* Stile per gli input e il textarea */
input[type="text"],
input[type="email"],
input[type="tel"],
textarea {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 3px;
    font-size: 16px;
}

/* Stile per il pulsante di invio */
input[type="submit"] {
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 3px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
}

input[type="submit"]:hover {
    background-color: #0056b3;
}

/* Stile per il campo "Metodo di Pagamento" */
label[for="pagamento"] {
    font-weight: bold;
    display: block;
    margin-bottom: 10px;
}

select#pagamento {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
    font-size: 16px;
}

/* Personalizza lo stile delle opzioni nel select */
select#pagamento option {
    font-size: 16px;
}

/* Aggiungi spaziatura tra il campo "Metodo di Pagamento" e il campo della carta di credito */
select#pagamento+label {
    margin-top: 20px;
}

ul li span {
    margin-right: 10px;
    /* Aggiunge uno spazio di 10px a destra di ciascun <span> */
}

.container-riepilogo {
    margin-top: 30px;
}

.riepilogo_form {
    display: none;
    background-color: #f9f9f9;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    text-align: left;

    ul {
        list-style: none;
        padding: 0;

        li {
            margin-bottom: 5px;
            display: flex;

            span {
                margin-right: 10px;
                font-weight: bold;
            }

            .quantity-style {
                border-radius: 50%;
                width: 30px;
                height: 30px;
                display: inline-block;
                text-align: center;
                background-color: black;
                color: white;
                font-weight: bold;
            }
        }
    }

    .price-style {
        text-align: right;
        flex-grow: 1;
    }

    .total-price-style {
        font-weight: bold;
        display: flex;
    }
}
</style>