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
              this.transactionStatus = true;
           
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
</style>
