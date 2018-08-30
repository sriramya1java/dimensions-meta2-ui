import Vue from 'vue'
import Vuex from 'vuex'
import dimensions from './modules/dimensions'
import categories from './modules/categories'
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    dimensions,
    categories
  }
})
