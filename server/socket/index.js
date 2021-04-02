// module.exports = (io) => {
const http = require('http');
const express = require('express');
const app = express();
const socketio = require('socket.io');
module.exports = () => {
  const server = http.createServer(app);
  const io = socketio(server);
  //connection is established
  //socket is an object that has socket id
  io.on('connection', (socket) => {
    console.log(
      `A socket connection to the server has been made: ${socket.id}`
    );
    //step2: taking in msg(this.state.chatmessage from the front end) then it runs line 9
    socket.on('chat message', (msg) => {
      console.log('in message backend: ', msg[0]);
      //send messages to everyone except the one just joined
      // socket.broadcast.emit('messages');
      //step3: emiting the messages event to all the users and passing msg
      io.emit('messages', msg[0]);
    });
  });
  // io.on('connection', socket => {
  //   console.log(`A socket connection to the server has been made: ${socket.id}`)

  //   socket.on('disconnect', () => {
  //     console.log(`Connection ${socket.id} has left the building`)
  //   })
  // })
};
