import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import ElementPlus from 'element-plus'


// window.gapi = gapi;

import { useCustomerStore } from '../src/stores/CustomerData.js'
import { useSuppliersDataStore } from '../src/stores/SuppliersData.js'



// Nucleo Icons
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import 'element-plus/dist/index.css';
import materialKit from "./material-kit";

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
  next();
});

const app = createApp(App);
const pinia = createPinia();
const CustomerStore = useCustomerStore(pinia);
const SuppliersStore = useSuppliersDataStore(pinia);

// 從 localStorage 讀取使用者資訊
const user = JSON.parse(localStorage.getItem('user'));
const suser = JSON.parse(localStorage.getItem('SUser'));
if (user) {
  CustomerStore.Name = user.Name;
  CustomerStore.id = user.id;
  CustomerStore.loggedIn = true;
} else if (suser) {
  SuppliersStore.id = suser.id;
  SuppliersStore.name = suser.name;
  SuppliersStore.loggedIn = true;
}
app.use(pinia);
app.use(ElementPlus);
app.use(router);
app.use(materialKit);
app.mount("#app");