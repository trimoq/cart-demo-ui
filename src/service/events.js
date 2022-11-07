
import store from '../store'

var Stomp = require('@stomp/stompjs');


const client  = new Stomp.Client({
    brokerURL: 'ws://localhost:8080/ws/websocket',
    // debug: function (str) {
    //     console.log(str);
    // },
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
});

export default class EventService {

    constructor(){

    }

    connect() {
        // var sub1 = null;
        // var sub2 = null;
        console.log("connect")

        client.onConnect = () =>{
            // Do something, all subscribes must be done is this callback
            // This is needed because this will be executed after a (re)connect
            console.log("Called onConnect")
            client.subscribe('/topic/events', message => {
                var event = JSON.parse(message.body);
                console.log(event)
                store.commit('logEvent', event)
            });

            client.subscribe('/topic/cart', message => {
                var event = JSON.parse(message.body);
                console.log(event)
                if(event.id===store.state.cartId){
                    store.commit('updateCart', event)
                }
                else{
                    console.log("Ignoring cart update")
                }
            });


            // sub2 = client.subscribe('/topic/redeemed', message => {
            //     console.log('rcv redeemed')
            //     console.log(message)
            // });


            // client.subscribe('/app/summary', message => {
            //     console.log('rcv summary')

            //     var summaries = JSON.parse(message.body);
            //     summaries.forEach(e => store.commit('appendTicket', {
            //         "id": e.id,
            //         "value": e.remainingValue
            //     }))
            //     console.log(message)
            // });

            // console.log(sub1)
            // console.log(sub2)
    
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
    }
    send() {
        console.log("send")
    }
  
}
  