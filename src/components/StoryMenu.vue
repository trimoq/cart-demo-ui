<template>
    <v-menu 
        :close-on-content-click=false
    >
    <template v-slot:activator="{ props }">
        <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
    </template>

    <v-card min-width="200">
        <v-list>
            <v-list-item>
                <v-checkbox 
                    v-model="checkboxModel"
                    @change="updateShowRemovals"
                    label="Show removals"
                />
            </v-list-item>
        </v-list>
                <v-divider></v-divider>

        Reset:
        <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
                color="error"
                variant="text"
                @click="onResetRemovalsClick"
            >
                Removals
            </v-btn>
            <v-btn
                color="error"
                variant="text"
                @click="onResetProjectionClick"
            >
                Projection
            </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
</template>

<script>
export default {
 name: 'StoryMenu',
 computed:{
    showRemovals () {
      return this.$store.state.showRemovals
    }
 },
 data(){
    return {
        checkboxModel: false
    }
 },
 watch:{
    checkboxModel(value){
        console.log("Switched showRemovals to "+JSON.stringify(value))
        this.$store.commit('setShowremovals', value)
    },
    showRemovals(){
        console.log("showRemovals is "+this.showRemovals)
        this.checkboxModel = this.$store.state.showRemovals
    }
 },
  methods:{

    onResetRemovalsClick(){
        console.log("onResetRemovalsClick")
        this.$store.dispatch('resetRemovals')

    },
    onResetProjectionClick(){
        console.log("onResetProjectionClick")
        this.$store.dispatch('resetProjections')    }
 }
}
</script>
