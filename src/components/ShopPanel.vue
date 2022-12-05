<template>
    <v-container>
    <!-- <h2>
        Axoniq Merch Store
    </h2> -->

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
                    <v-chip
                    v-if="showRemovals">
                        {{ getremovalsFor(item.id) }}
                    </v-chip>
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
    },
    showRemovals() {
        return this.$store.state.showRemovals
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
    },
    getremovalsFor(itemId){
        let removalModelEntry = this.$store.state.removalModel[itemId]
        if(removalModelEntry){
            return removalModelEntry.removals
        }
        else{
            return 0
        }
    }
 }

}
</script>
