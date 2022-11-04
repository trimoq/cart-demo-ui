import { createStore } from 'vuex'

const store = createStore({
    state () {
      return {
        count: 0,
        tickets: []
      }
    },
    mutations: {
      increment (state) {
        state.count++
      },
      appendTicket (state, ticket) {
        state.tickets.push(ticket)
      }
    }
  })

export default store