// module.exports = (io) => {
module.exports = (io) => {
  //connection is established
  //socket is an object that has socket id
  io.on('connection', (socket) => {
    console.log(
      `BE: A socket connection to the server has been made: ${socket.id}`
    );

    //setting up rooms 
    socket.on('room', room => {
      socket.join(room)
      console.log("ROOM BACKEND", room)
    })

    socket.on('leaveRoom', room => {
      socket.leave(room, () => {
        console.log('Left Chat ', room)
      })
    })

    //step2: taking in msg(this.state.chatmessage from the front end) then it runs line 9
    socket.on('chat message', (msg) => {
      let message = msg[0]
      console.log('in message backend: ', message);
      //send messages to everyone except the one just joined
      // socket].broadcast.emit('messages');

      //step3: emiting the messages event to all the users and passing msg in the same room
      io.to(message.eventId.toString()).emit('messages', message);
      //io.emit('messages', message);
    });

    //user disconnected?
    socket.on("disconnect", () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  });
};

// io.on('connection', socket => {
//   console.log(`A socket connection to the server has been made: ${socket.id}`)

//   socket.on('disconnect', () => {
//     console.log(`Connection ${socket.id} has left the building`)
//   })
// })