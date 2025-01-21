const EventEmitter = require('events');
const messageEmitter = new EventEmitter();

messageEmitter.on('message_call', (message)=>{
    console.log('je suis Message emiteur', +message);
})

module.exports = messageEmitter;