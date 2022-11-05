<template>
  <v-app>
    <v-main>
      <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
      <HelloWorld msg="Welcome to Your Vue.js App"/>
      <v-btn @click="sendMessage()">send</v-btn>
      <v-btn @click="increment()">increment</v-btn>
      <v-btn
        @click="snackbar = true"
      >
        Open Snackbar
      </v-btn>
      <v-snackbar
        v-model="snackbar"
        :timeout="1000"
      >
        {{ text }}

        <template v-slot:actions>
          <v-btn
            color="pink"
            variant="text"
            @click="snackbar = false"
          >
            Close
          </v-btn>
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
              <th>
                Id
              </th>
              <th>
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in tickets"
              :key="item.id"
            >
              <td>{{ item.id }}</td>
              <td>{{ item.value }}</td>
            </tr>
          </tbody>
        </v-table>
      </div>
      
    </v-main>

  </v-app>

</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import EventService from './service/events'
// import Stomp from '@stomp/stompjs'

// var Stomp = require('@stomp/stompjs');

// var client = null
// var sub1 = null;
// var sub2 = null;
var es = null;

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data(){
    return {
      cards: [],
      snackbar: false,
      text: `Hello, I'm a snackbar`,
    }
  },
  computed: {
    count () {
      return this.$store.state.count
    },
    tickets () {
      return this.$store.state.tickets
    },
  },
  created: function() {
    es = new EventService();
    es.connect()

    this.$store.subscribe((mutation) => {
      console.log(mutation.type)
      console.log(mutation.payload)
      this.text=mutation.payload
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
