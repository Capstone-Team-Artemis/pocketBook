module.exports = (io) => {
  //connection is established
  //socket is an object that has socket id
  io.on('connection', (socket) => {
    console.log(
      `BE: A socket connection to the server has been made: ${socket.id}`
    );

    //setting up rooms
    socket.on('room', async (room) => {
      console.log('ROOM BACKEND', room);
      await socket.join(room);
    });

    socket.on('leaveRoom', (room) => {
      socket.leave(room, () => {
        console.log('Left Chat ', room);
      });
    });

    //step2: taking in msg(this.state.chatmessage from the front end) then it runs line 9
    socket.on('chat message', (msg) => {
      console.log('in message backend: ', msg[0]);
      // let roomId = msg[0].eventId.toString();
      let eventTitle = msg[0].eventTitle;
      console.log('event title-->', eventTitle);
      //send messages to everyone except the one just joined
      // socket.broadcast.emit('messages');

      //step3: emiting the messages event to all the users and passing msg
      // *******
      io.to(eventTitle).emit('messages', msg[0]);
      // io.emit('messages', msg[0]);
    });

    //user disconnected?
    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`);
    });
  });
};

// io.on('connection', socket => {
//   console.log(`A socket connection to the server has been made: ${socket.id}`)

//   socket.on('disconnect', () => {
//     console.log(`Connection ${socket.id} has left the building`)
//   })
// })
