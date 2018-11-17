import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

// Modules
import user from './modules/user'
import session from './modules/session'
import viaCobroModifica from './modules/viacobro/modificacion'
import cliente from './modules/cliente'

Vue.use(Vuex)

export default new Vuex.Store({
  /**
   * Assign the modules to the store
   */
  modules: {
    user,
    session,
    viaCobroModifica,
    cliente
  },
  plugins: [createPersistedState({
    key: 'jwt',
    paths: ['user.jwt']
  })]
})
