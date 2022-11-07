<template>
    <v-container>
        <h2>
        placeholder
    </h2>

    <v-row>
        <v-col v-for='item in items' :key='item.name'>
            <v-card
            width='200'
            >
            <v-img
                :src='item.image'
                height='200px'
                cover
                ></v-img>
                <v-card-title>
                {{ item.name }}
                </v-card-title>
                <v-card-actions>
                    <!-- <v-btn
                    variant="outlined"
                    color="primary">
                        Add
                    </v-btn> -->

                    <v-spacer></v-spacer>

                    <v-btn
                    variant="outlined"
                    color="primary"
                    @click="addItemToCart(item)"
                    >
                        Add
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
    </v-container>

</template>

<script>

import products from "../assets/products"

export default {
 name: 'ShopPanel',
 components: {
 },
 data(){
   return {
   }
 },
 computed: {
    items(){
        return products
    }
 },
 created: function() {
 },
 methods:{
    addItemToCart(item) {
        var addItemDto = {
            itemId: item.id,
            amount: 1
        }
        this.$store.dispatch('addItem', addItemDto).then(() => {
        console.log("AddItem "+ this.$store.state.cartId)
      })
        console.log("Adding item to cart:" + item.name)        
    }
 }

}
</script>
