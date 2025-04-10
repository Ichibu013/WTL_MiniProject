const BASE_URL = "http://localhost:8080/core-api";
const LOGIN_URL = BASE_URL + "/api/users/login";
const REGISTER_URL = BASE_URL + "/api/users/register";
const BOOK_URL = BASE_URL + "/api/books/all";
const ADD_BOOK_URL = BASE_URL + "/api/books/add";
const DELETE_BOOK_URL = BASE_URL + "/api/books/delete";
const CHECKOUT_URL = BASE_URL + "/api/carts/checkout";
const ADD_TO_CART_URL = BASE_URL + "/api/carts/add-to-cart";
const GET_CURRENT_CART_URL = BASE_URL + "/api/carts/current";
const CLEAR_CART_URL = BASE_URL + "/api/carts/delete"
export { BASE_URL, LOGIN_URL, REGISTER_URL, BOOK_URL, ADD_BOOK_URL, DELETE_BOOK_URL, CHECKOUT_URL, ADD_TO_CART_URL ,GET_CURRENT_CART_URL, CLEAR_CART_URL};