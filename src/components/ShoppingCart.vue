<template>
    <v-navigation-drawer
         permanent
         location="left"
       >
       <h2>
        Shopping Cart
       </h2>
       <h4>
        [{{ cartId }}]
       </h4>
        <v-list lines="one">
            <v-list-item
                v-for="item in cartItems"
                :key="item.itemId"
                :title="itemIdToName(item.itemId)"
                :subtitle="'Count:' +item.amount"
            >
            <template v-slot:append>
                <v-btn color="error"             
                    @click="onItemDelete(item)"
                    icon="mdi-trash-can-outline"
                    variant="outlined"
                    size="small"
                ></v-btn>
            </template>            
        </v-list-item>
            </v-list>
        <template v-slot:append>
          <div class="pa-2">
            <v-btn 
                block 
                color="warning"             
                @click="onCheckoutClick"
            >
              Checkout
            </v-btn>
          </div>
        </template>
     </v-navigation-drawer>
</template>

<script>

import products from "../assets/products"


export default {
 name: 'ShoppingCart',
 components: {
 },
 data(){
   return {
   }
 },
 computed: {
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
    onCheckoutClick(){
        console.log('begin checkout for id: ' + this.$store.state.cartId)
        this.$store.dispatch('checkoutCart')
    },
    itemIdToName(id){
        return products[id].name
    },
    onItemDelete(item){
        console.log('delete item:' + item)
        this.$store.dispatch('deleteItem', item)
    },
 }
}
</script>
