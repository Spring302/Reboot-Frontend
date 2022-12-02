import { createApp } from "vue";

import App from "./App.vue";
import "bootstrap";
import router from "./routes/index.js";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import store from "./store/store.js";

const app = createApp(App);
axios.defaults.baseURL = "http://localhost:8000";
app.config.globalProperties.axios = axios;
app.use(router).use(store).mount("#app");
