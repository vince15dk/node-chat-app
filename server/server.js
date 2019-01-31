const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

var {generateMessage ,generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');
const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const users = new Users();

app.use(express.static(publicPath));


io.on('connection',(socket)=>{
    console.log('New user connected');

    socket.on('createEmail', (newEmail)=>{
        console.log('createEmail', newEmail);
    })

    // socket.emit from admin text Welcome to the chat app
    // socket.broadcast.emit from admin text new user joined
   

    socket.on('join',(params, callback)=>{
        if(!isRealString(params.name) || !isRealString(params.room)){
            return callback('Name and room name are required.'); 
        }


        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        // socket.leave() -- leave the room

        // io.emit //emitting to every connected users
        // io.to('the office fans').emit // evenbody connected to the room in 'the office fans'
        // socket.broadcast.emit // send message to every one connected except for the current user
        // socket.broadcast.to('the office fans').emit // every one in the room except for the  current user 
        // socket.emit // emit events to specific one user
        
        socket.emit('newMessage', generateMessage('쮸', '혠쮸의 비밀방'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));
        callback();
    })


    socket.on('createMessage', (message, callback)=>{
        let user = users.getUser(socket.id);

        if(user && isRealString(message.text)){
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }

        callback();
        
    });

    socket.on('createLocationMessage',(coords)=>{
        let user = users.getUser(socket.id);

        if(user){
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name,coords.latitude, coords.longitude));
        }
       
    })

    socket.on('disconnect',()=>{
        let user = users.removeUser(socket.id);

        if(user){
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
        }
    })

});



server.listen(port, ()=>{
    console.log(`Server is up on port ${port}`);
})
