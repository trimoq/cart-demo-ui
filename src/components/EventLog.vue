<template>


    <v-navigation-drawer
        permanent
        location="right"
    >
        <v-snackbar
            v-model="snackbar"
            :timeout="1000"
        >
            {{ snackbarText }}

            <template v-slot:actions>
            </template>
        </v-snackbar>
        <div class="d-flex justify-space-around">
            <v-table
            class="d-flex"
            >
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Event</th>
                </tr>
            </thead>
            <tbody>
                <tr
                v-for="item in events"
                :key="item.cartId"
                >
                    <td>{{ item.cartId }}</td>
                    <td>
                        <span v-if="item.eventType === 'CartCreatedEvent'" class="text-primary"> {{ item.eventType }}</span>
                        <span v-else-if="item.eventType === 'ItemAddedEvent'" class="text-success"> {{ item.eventType }} </span>
                        <span v-else-if="item.eventType === 'ItemRemovedEvent'" class="text-error"> {{ item.eventType }} </span>
                        <span v-else class="text-warning"> {{ item.eventType }} </span>
                    </td>
                </tr>
            </tbody>
            </v-table>
        </div>
        <template v-slot:append>
          <div class="pa-2">
            <v-btn 
                block 
                color="error"             
                @click="onClickClear"
            >
              Clear UI
            </v-btn>
          </div>
        </template>
    </v-navigation-drawer>
</template>


<script>
import EventService from '../service/events'
var es = null;

export default {
  name: 'EventLog',
  components: {
  },
  data(){
    return {
      cards: [],
      snackbar: false,
      snackbarText: `Hello, I'm a snackbar`,
    }
  },
  computed: {
    count () {
      return this.$store.state.count
    },
    tickets () {
      return this.$store.state.tickets
    },
    events () {
      return this.$store.state.events
    },
  },
  created: function() {
    es = new EventService();
    es.connect()
    // this.$store.subscribe((mutation) => {
    //   console.log(mutation.payload)
    //   this.snackbarText=mutation.payload
    //   this.snackbar=true
    // })
  },
  methods:{
    onClickClear(){
        this.$store.commit('resetEvents')
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
