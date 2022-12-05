<template>
     <v-app>


      <ShoppingCart />

      <EventLog/>

      <StoryHeader />

      <v-main class="less-border">
        <ShopPanel />
      </v-main>


      <v-overlay 
        v-model="overlay" 
        class="align-center justify-center more-overlay"
        persistent
        >
          <v-btn
            color="primary"
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
        <v-card
          class="mx-auto"
          width="350"
          prepend-icon="mdi-cart"
        >
          <template v-slot:title>
            Checked out {{ cartId }}
          </template>

          <v-list lines="one">
            <v-list-item
                v-for="item in cartItems"
                :key="item.itemId"
                :title="itemIdToName(item.itemId)"
                :subtitle="'Count:' +item.amount"
                :prepend-avatar="itemIdToAvatar(item.itemId)"
            >                 
        </v-list-item>
            </v-list>
          <v-card-actions>
            <v-btn variant="outlined" 
            block                 
            color="warning"
            @click="onStartShopping">
              Start over again
            </v-btn>
          </v-card-actions>
        </v-card>
        </v-overlay>
     </v-app>
</template>

<script>
import EventLog from './components/EventLog.vue'
import ShoppingCart from './components/ShoppingCart.vue'
import ShopPanel from './components/ShopPanel.vue'
import StoryHeader from './components/StoryHeader.vue'
import products from "./assets/products"

export default {
  name: 'App',
  components: {
    EventLog,
    ShoppingCart,
    ShopPanel,
    StoryHeader
  },
  data(){
    return {
      overlay: true,
    }
  },
  computed: {
    checkedOut(){
      return this.$store.state.checkedOut
    },
    cartId() {
        return this.$store.state.cartId
    },
    cartItems() {
        return this.$store.state.cartItems
    }
  },
  created: function() {
  },
  methods:{
    onStartShopping(){
      // console.log("Start shopping")
      this.$store.commit('reset')
      this.$store.dispatch('createCart').then(() => {
        // console.log("Started shopping with cart "+ this.$store.state.cartId)
        this.overlay=false
      })
    },
    itemIdToName(id){
        return products[id].name
    },
    itemIdToAvatar(id){
        return products[id].image
    },
  }

}
</script>

<style scoped lang="css">
.less-border {
	--v-layout-left: 256px;
	--v-layout-right: 256px;
	--v-layout-top: 0px !important;
	--v-layout-bottom: 0px;
}
</style>