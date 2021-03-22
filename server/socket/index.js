module.exports = io => {
    io.on('connection', socket => {
      console.log(`A socket connection to the server has been made: ${socket.id}`)
  
      socket.on('disconnect', () => {
        console.log(`Connection ${socket.id} has left the building`)
      })
    })
}

// test branch socket 
 
// const app = require('express')();
// const http = require('http').Server(app);
// const io = require('socket.io')(http);

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });

// io.on('connection', (socket) => {
//   console.log('a user connected');
//   socket.on("chat message", msg => {
//     console.log(msg);
//     io.emit("chat message", msg);
//   })
// });

// http.listen(3000, () => {
//   console.log('listening on *:3000');
// });
