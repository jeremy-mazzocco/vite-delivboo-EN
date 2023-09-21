import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(fas);

import { createApp } from 'vue'
import App from './App.vue'



// import store from './store';

import { router } from './router.js';


createApp(App).use(router).component("font-awesome-icon", FontAwesomeIcon).mount('#app')

