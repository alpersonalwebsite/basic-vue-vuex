import Vuex from "vuex";
import Vue from "vue";
import users from "./modules/users";

Vue.use(Vuex);

//new store
export default new Vuex.Store({
  modules: {
    users
    // more modules
  }
});
