const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');


const publicPath = path.join(__dirname,'../public')
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));


io.on('connection',(socket)=>{
    console.log('New user connected');

    socket.emit('newEmail', {
        from: 'SJ@gmail.com',
        text: 'what is going on ?',
        createAt: 123
    });

    socket.emit('newMessage', {
        from: 'John',
        text: 'see you then',
        createdAt: 123123
    })

    socket.on('createEmail', (newEmail)=>{
        console.log('createEmail', newEmail);
    })

    socket.on('createMessage', (message)=>{
        console.log('createMessage', message);
    })

    socket.on('disconnect',()=>{
        console.log('Disconnected from client')
    })

});



server.listen(port, ()=>{
    console.log(`Server is up on port ${port}`);
})
