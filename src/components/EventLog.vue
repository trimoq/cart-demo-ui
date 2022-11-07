<template>


    <v-navigation-drawer
        permanent
        location="right"
    >
        <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
        <!-- <v-btn @click="sendMessage()">send</v-btn>
        <v-btn @click="increment()">increment</v-btn> -->
        <!-- <v-btn
            @click="snackbar = true"
        >
            Open Snackbar
        </v-btn> -->
        <v-snackbar
            v-model="snackbar"
            :timeout="1000"
        >
            {{ snackbarText }}

            <template v-slot:actions>
            <!-- <v-btn
                color="pink"
                variant="text"
                @click="snackbar = false"
            >
                Close
            </v-btn> -->
            </template>
        </v-snackbar>

        <!-- <h2> {{ count }} </h2>
        <li v-for="item in tickets" :key="item.id">
            {{ item.id }}
        </li> -->
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
                        <span v-else class="text-secondary"> {{ item.eventType }} </span>
                    </td>
                </tr>
            </tbody>
            </v-table>
        </div>
    </v-navigation-drawer>
</template>


<script>
// import HelloWorld from './components/HelloWorld.vue'
import EventService from '../service/events'
// import Stomp from '@stomp/stompjs'

// var Stomp = require('@stomp/stompjs');

// var client = null
// var sub1 = null;
// var sub2 = null;
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

    this.$store.subscribe((mutation) => {
    //   console.log(mutation.type)
      console.log(mutation.payload)
      this.snackbarText=mutation.payload
      this.snackbar=true
    })
  },
  methods:{
    sendMessage(){
      console.log('sending stuff')
      // client.publish({ destination: '/app/hello', body: 'Hello world' });
    },
    increment() {
      this.$store.commit('increment')
      console.log(this.$store.state.count)
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
