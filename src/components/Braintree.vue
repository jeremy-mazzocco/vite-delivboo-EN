<template>
  <div id="dropin-wrapper braintree_style">
    <div id="checkout-message"></div>
    <div id="dropin-container"></div>
    <button id="submit-button" @click="$emit('transaction-complete', false)">Paga</button>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  emit: ['transaction-complete'],
  data() {
    return {
      transactionStatus: null,
    };
  },
  mounted() {
    var button = document.querySelector("#submit-button");

    braintree.dropin.create(
      {
        // Insert your tokenization key here
        authorization: "sandbox_q7bs2b93_jtpysxtcf7n3hz8d",
        container: "#dropin-container",
      },
      (createErr, instance) => {
        button.addEventListener("click", () => {
          instance.requestPaymentMethod((requestPaymentMethodErr, payload) => {
            if (requestPaymentMethodErr) {
              this.transactionStatus = false;
              // this.$emit('transaction-complete', this.transactionStatus);
              console.error("Errore nella richiesta del metodo di pagamento:", requestPaymentMethodErr);
              return;
            }

            if (payload && payload.nonce) {
              // Emetti l'evento con lo stato della transazione
              this.transactionStatus = true;
              // this.$emit('transaction-complete', this.transactionStatus);
              // $.ajax({
              //   type: "POST",
              //   url: "/checkout",
              //   data: { paymentMethodNonce: payload.nonce },
              // }).done((result) => {
              //   // Rimuovi il Drop-in UI
              //   instance.teardown((teardownErr) => {
              //     if (teardownErr) {
              //       console.error("Impossibile smontare il Drop-in UI!");
              //    }
              // else {
              //       console.info("Il Drop-in UI è stato smontato!");
              //       // Rimuovi il pulsante 'Invia pagamento'
              //       $("#submit-button").remove();
              //     }
              //   });

              //   if (result.success) {
              //     this.transactionStatus = true;
              //     $("#checkout-message").html(
              //       "<h1>Successo</h1><p>Il tuo Drop-in UI funziona! Controlla il tuo pannello di controllo sandbox</a> per le tue transazioni di test.</p><p>Aggiorna la pagina per provare un'altra transazione.</p>"
              //     );
              //   } else {
              //     console.log(result);
              //     this.transactionStatus = false;
              //     $("#checkout-message").html(
              //       "<h1>Errore</h1><p>Controlla la console.</p>"
              //     );
              //   }

              //   // Emetti l'evento con lo stato della transazione
              //   this.$emit('transaction-complete', this.transactionStatus);
              // });
            } else {
              console.error("Payload o nonce mancante o non valido");
            }
            this.$emit('transaction-complete', this.transactionStatus);
          });
        });
      }
    );
  },
};
</script>

<style scoped lang="scss">
/* Stili CSS se necessario */
</style>
