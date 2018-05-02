import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        status: [],
      
    },
    mutations: {
        'status': (state, data) => {//状态器
            state.status = data;
        }
       
    }
})