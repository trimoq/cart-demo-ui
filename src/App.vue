<template>
     <v-app>
      <ShoppingCart />

      <v-main>
        <ShopPanel />
      </v-main>

      <EventLog/>

      <v-overlay 
        v-model="overlay" 
        class="align-center justify-center"
        persistent
        >
          <v-btn
            color="success"
            @click="onStartShopping"
          >
            Start shopping
          </v-btn>
        </v-overlay>

        <v-overlay 
        v-model="checkedOut" 
        class="align-center justify-center"
        persistent
        >
        <h1>Checked out!</h1>
          <v-btn
            color="success"
            @click="onStartShopping"
          >
            Start shopping
          </v-btn>
        </v-overlay>
     </v-app>
</template>

<script>
import EventLog from './components/EventLog.vue'
import ShoppingCart from './components/ShoppingCart.vue'
import ShopPanel from './components/ShopPanel.vue'

export default {
  name: 'App',
  components: {
    EventLog,
    ShoppingCart,
    ShopPanel
  },
  data(){
    return {
      overlay: true,
    }
  },
  computed: {
    checkedOut(){
      return this.$store.state.checkedOut
    }
  },
  created: function() {
  },
  methods:{
    onStartShopping(){
      console.log("Start shopping")
      this.$store.dispatch('createCart').then(() => {
        console.log("Started shopping with cart "+ this.$store.state.cartId)
        this.overlay=false
      })
    }
  }

}
</script>

<style lang="css">
  .v-overlay__scrim{
    opacity: 80%;
  }
</style>
