const socket = io();
            

socket.on('connect', function (){
    console.log('Connected with server');
});

socket.on('disconnect', function(){
    console.log('Disconnected from server');
})

socket.on('newMessage', function(message){
    console.log('newMessage', message);
})

socket.on('newJoin', function(message){
    console.log(message);
})