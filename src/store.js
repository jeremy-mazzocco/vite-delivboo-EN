import { VueElement, reactive } from "vue"

export const store = reactive({
    apiURL: 'http://localhost:8000/api/v1',
    imageURL: 'http://127.0.0.1:8000/storage/',
    errorImageURL: 'http://127.0.0.1:8000/storage/images/Pippo-Baudo.jpg',
    typeList: [],
    typeSearch: [],
    restaurantList: [],
    restaurantSearch: [],
    dishesList: [],
    restaurantSelected: {},
    cart: [],
    order_code: '',
    order: []
    // loading: true //per disattivare loading
});