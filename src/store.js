import { createStore } from 'vuex'
const axios = require('axios');

const store = createStore({
    state () {
      return {
        cartId: null,
        events: [],
        cartItems: [],
        checkedOut: false,
        showRemovals: false,
        removalModel: {}
      }
    },
    mutations: {
      logEvent(state, event) {
        state.events.push(event)
      },
      createCart(state, cartId){
        state.cartId = cartId
      },
      updateCart(state, cart){
        state.cartItems = cart.items
        state.checkedOut = cart.checkedOut
      },
      reset(state){
        state.cartItems = []
        state.cartId = null
        state.checkedOut = false
      },
      resetEvents(state){
        state.events = []
      },
      setShowremovals(state,value){
        state.showRemovals=value
      },
      replaceRemovalModel(state,value){
        state.removalModel = value
      }
    },
    actions: {
      async createCart ({commit}) {
        try {
          const response = await axios.post('http://127.0.0.1:8080/cart/')
          let id = response.data
          if( id == undefined){
            throw new Error("Wasauchimmer");
          }
          console.log('id: ' + id);
          commit('createCart', id);
          console.log('read id: ' + this.state.cartId)

        } catch (error) {
          console.log(error.response.body);
        } 
      },
      async addItem ({commit}, item) {
        try {
          await axios.post('http://127.0.0.1:8080/cart/'+this.state.cartId+'/items/', item)
          // commit('addItem', item);
        } catch (error) {
          console.log(commit, error.response.body);
        } 
      },
      async deleteItem ({commit}, item) {
        try {
          await axios.delete('http://127.0.0.1:8080/cart/'+this.state.cartId+'/items/'+item.itemId,{ crossdomain: true })
          // commit('addItem', item);
        } catch (error) {
          console.log(commit, error.response.body);
        } 
      },
      async checkoutCart ({commit}) {
        try {
          await axios.post('http://127.0.0.1:8080/cart/'+this.state.cartId+'/checkout/')
          // commit('addItem', item);
        } catch (error) {
          console.log(commit, error.response.body);
        } 
      },
      async resetProjections ({commit}) {
        try {
          await axios.post('http://127.0.0.1:8080/reset/projections')
        } catch (error) {
          console.log(commit, error.response.body);
        } 
      },
      async resetRemovals ({commit}) {
        try {
          await axios.post('http://127.0.0.1:8080/reset/stats')
          commit('setShowremovals', true)
        } catch (error) {
          console.log(commit, error.response.body);
        } 
      }
    }
  })

export default store