import Vue from 'vue'
import Vuex from 'vuex'
import courses from './modules/courses'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    courses,
    user
  }
})
