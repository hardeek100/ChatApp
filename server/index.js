const socket = require('socket.io');
const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = socket(server);

const { addUser, removeUser , getUser} = require('./users');


io.on('connect', (socket) =>{
   console.log('user connected');

   socket.on('loggedin', ({name, room}, callback) =>{
      const { error, user} = addUser({id: socket.id, name, room});

      if(error) return(callback(error));
      socket.join(user.room);
      socket.emit('message', {user: 'admin', text: `${user.name}, welcome to ${user.room}.`});
      socket.broadcast.to(user.room).emit('message', {user: 'admin', text: `${user.name} has joined the chat!`});
      
     
      callback();
   })


   socket.on('sendMessage', (message, callback) => {
      const user = getUser(socket.id);

         io.to(user.room).emit('message', {user: user.name, text: message});
         //console.log(text);

         callback();

   })  
   

   socket.on('disconnect', (message)=>{
       console.log('User has left');
       const user = removeUser(socket.id);
   })

})

server.listen(process.env.PORT || 5000, ()=> console.log('server has started.'))
