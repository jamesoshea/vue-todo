import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        userId: undefined,
        todos: [],
        completed: 0,
        message: '',
        name: '',
        shown: false
    },
    getters,
    mutations
});
