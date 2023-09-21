<script>
import axios from 'axios';
import { store } from '../store';
import TypeCard from '../components/TypeCard.vue';

const apiURL = 'http://localhost:8000/api/v1'; // Sostituisci con la tua URL API

export default {
  name: 'TypeMenu',
  components: {
    TypeCard,
  },
  data() {
    return {
      store,
      selectedTypes: [],
    }
  },
  methods: {
    handleCheckboxToggle(typeId, isChecked) {
      if (isChecked) {
        this.selectedTypes.push(typeId);
      } else {
        const index = this.selectedTypes.indexOf(typeId);
        if (index > -1) {
          this.selectedTypes.splice(index, 1);
        }
      }
    }
  },

  mounted() {

  },
}
</script>

<template>
  <form >
    <div v-for="singleType in store.typeList" :key="singleType.id" class="border-bottom card"
      :class="{ 'card-background': selectedTypes.includes(singleType.id) }">
      <TypeCard :type="singleType" @checkboxToggled="handleCheckboxToggle(singleType.id, $event)" />
    </div>
    <hr class="bottom-margin">
  </form>
</template>

<style lang="scss" scoped>
@use '../styles/general.scss';

.card-background {
  background-color: rgba(109, 201, 38, 0.5);
}
.card{
  border: none;
}

@media screen and (max-width: 900px) {
  .card{
    text-align: center;
  }
}
</style>