
import store from '../store'

var Stomp = require('@stomp/stompjs');


const client  = new Stomp.Client({
    brokerURL: 'ws://localhost:8080/ws/websocket',
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
});

export default class EventService {

    constructor(){}
    connect() {
        client.onConnect = () =>{
            client.subscribe('/topic/events', message => {
                var event = JSON.parse(message.body);
                store.commit('logEvent', event)
            });

            client.subscribe('/topic/cart', message => {
                var event = JSON.parse(message.body);
                if(event.id===store.state.cartId){
                    store.commit('updateCart', event)
                }
            });   
            client.subscribe('/topic/stats', message => {
                var removals = JSON.parse(message.body);
                store.commit('replaceRemovalModel', removals)
            });   
        };
    
        client.onStompError = function (frame) {
            console.log('Broker reported error: ' + frame.headers['message']);
            console.log('Additional details: ' + frame.body);
        };
    
        client.activate();
    }
    send() {
        console.log("send")
    }
  
}
  