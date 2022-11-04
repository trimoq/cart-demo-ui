<template>
  <div>
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <button @click="sendMessage()">send</button>
    <button @click="increment()">increment</button>
    <h2> {{ count }} </h2>
    <li v-for="item in tickets" :key="item.id">
      {{ item.id }}
    </li>
  </div>

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
      cards: []
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
