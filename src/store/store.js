import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      username: "",
    };
  },
  mutations: {
    setUsername(state, username) {
      state.username = username;
    },
    logout(state) {
      state.username = "";
    },
  },
});
export default store;
