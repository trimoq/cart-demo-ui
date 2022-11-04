<template>
  <div>
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <button @click="sendMessage()">send</button>

    <li v-for="item in cards" :key="item.id">
      {{ item.id }}
    </li>
  </div>

</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
// import Stomp from '@stomp/stompjs'

var Stomp = require('@stomp/stompjs');

var client = null
var sub1 = null;
var sub2 = null;

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
  created: function() {

   client  = new Stomp.Client({
      brokerURL: 'ws://localhost:8080/ws/websocket',
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.onConnect = () =>{
      // Do something, all subscribes must be done is this callback
      // This is needed because this will be executed after a (re)connect
      sub1 = console.log("Called onConnect")
      client.subscribe('/topic/messages', message => {
        console.log('rcv!!!')
        var body = JSON.parse(message.body);
        console.log(body)
        console.log(this.cards )
        this.cards.push(body)
      });
      sub1 = client.subscribe('/app/messages', message => {
        console.log('rcv!!!')
        console.log(message)
      });
      console.log(sub1)
      console.log(sub2)

    };

    client.onStompError = function (frame) {
      // Will be invoked in case of error encountered at Broker
      // Bad login/passcode typically will cause an error
      // Complaint brokers will set `message` header with a brief message. Body may contain details.
      // Compliant brokers will terminate the connection after any error
      console.log('Broker reported error: ' + frame.headers['message']);
      console.log('Additional details: ' + frame.body);
    };

    client.activate();


    // var stompClient = null;
    // stompClient = Stomp.client('ws://127.0.0.1:8080/ws');
    // stompClient.connect({}, function (frame) {
    //     console.log('Connected: ' + frame);
    //     stompClient.subscribe('/topic/messages', function (greeting) {
    //       console.log("rcv")
    //       console.log("greeting: " + greeting)
    //     });
    // });

  },
  methods:{
    sendMessage(){
      console.log('sending stuff')
      client.publish({ destination: '/app/hello', body: 'Hello world' });
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
